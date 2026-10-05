import React, { useState, useMemo } from 'react';
import {
  Search,
  Globe,
  Code2,
  Database,
  MapPin,
  BarChart3,
  GitBranch,
  Play,
  Layers,
  ChevronDown,
  ChevronRight
} from 'lucide-react';
import { CatalogItem, ExecutionResult, WorkbenchCatalog } from '../types/catalog';
import { PRESET_CATALOGS } from '../services/catalogPresets';

interface SidebarProps {
  catalog: WorkbenchCatalog;
  selectedItemId: string | null;
  onSelectItem: (id: string) => void;
  results: Record<string, ExecutionResult>;
  onRunItem: (item: CatalogItem) => void;
  onLoadPreset: (name: string) => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  catalog,
  selectedItemId,
  onSelectItem,
  results,
  onRunItem,
  onLoadPreset
}) => {
  const [search, setSearch] = useState('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [collapsedCategories, setCollapsedCategories] = useState<Record<string, boolean>>({});

  // Filter items
  const filteredItems = useMemo(() => {
    return catalog.items.filter((item) => {
      const matchesSearch =
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.id.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase()) ||
        item.category.toLowerCase().includes(search.toLowerCase());

      const matchesType = typeFilter === 'all' || item.type === typeFilter;
      return matchesSearch && matchesType;
    });
  }, [catalog.items, search, typeFilter]);

  // Group by category
  const categories = useMemo(() => {
    const map: Record<string, CatalogItem[]> = {};
    filteredItems.forEach((item) => {
      const cat = item.category || 'Uncategorized';
      if (!map[cat]) map[cat] = [];
      map[cat].push(item);
    });
    return map;
  }, [filteredItems]);

  const toggleCategory = (cat: string) => {
    setCollapsedCategories((prev) => ({
      ...prev,
      [cat]: !prev[cat]
    }));
  };

  const getItemIcon = (type: string) => {
    switch (type) {
      case 'http_request':
        return <Globe className="w-3.5 h-3.5 text-sky-400 shrink-0" />;
      case 'script_runner':
        return <Code2 className="w-3.5 h-3.5 text-amber-400 shrink-0" />;
      case 'dataset':
        return <Database className="w-3.5 h-3.5 text-emerald-400 shrink-0" />;
      case 'geo_layer':
        return <MapPin className="w-3.5 h-3.5 text-rose-400 shrink-0" />;
      case 'chart_model':
        return <BarChart3 className="w-3.5 h-3.5 text-indigo-400 shrink-0" />;
      case 'workflow':
        return <GitBranch className="w-3.5 h-3.5 text-purple-400 shrink-0" />;
      default:
        return <Layers className="w-3.5 h-3.5 text-neutral-400 shrink-0" />;
    }
  };

  return (
    <aside className="w-72 bg-neutral-900/70 border-r border-neutral-800 flex flex-col shrink-0 select-none">
      {/* Catalog Profile & Presets Bar */}
      <div className="p-3 border-b border-neutral-800 bg-neutral-900/90">
        <div className="flex items-center justify-between mb-2">
          <div className="min-w-0 pr-2">
            <h2 className="text-xs font-semibold text-neutral-200 truncate" title={catalog.name}>
              {catalog.name}
            </h2>
            <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 mt-0.5">
              <span>v{catalog.version}</span>
              <span aria-hidden="true">·</span>
              <span>{catalog.items.length} tasks</span>
            </div>
          </div>

          {/* Quick preset selector */}
          <select
            aria-label="Preset Catalog Selector"
            onChange={(e) => {
              if (e.target.value) onLoadPreset(e.target.value);
            }}
            defaultValue=""
            className="text-[11px] bg-neutral-950 border border-neutral-800 text-neutral-300 rounded px-1.5 py-1 focus:outline-none cursor-pointer max-w-[100px] truncate"
          >
            <option value="" disabled>Presets...</option>
            {Object.keys(PRESET_CATALOGS).map((presetName) => (
              <option key={presetName} value={presetName} className="bg-neutral-900 text-white">
                {presetName}
              </option>
            ))}
          </select>
        </div>

        {/* Search Input */}
        <div className="relative">
          <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
          <input
            type="text"
            placeholder="Search items, endpoints, tables..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-neutral-950/80 border border-neutral-800 rounded-md pl-8 pr-3 py-1.5 text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-blue-500/60"
          />
        </div>

        {/* Type Filter Buttons */}
        <div className="flex items-center gap-1 mt-2 overflow-x-auto pb-0.5 scrollbar-none">
          {[
            { id: 'all', label: 'All' },
            { id: 'http_request', label: 'APIs' },
            { id: 'script_runner', label: 'Scripts' },
            { id: 'dataset', label: 'Datasets' },
            { id: 'geo_layer', label: 'Geo' },
            { id: 'workflow', label: 'Flows' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setTypeFilter(tab.id)}
              className={`px-2 py-0.5 text-[11px] font-medium rounded transition-colors whitespace-nowrap ${
                typeFilter === tab.id
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-neutral-200 hover:bg-neutral-800/40'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Catalog Tree */}
      <div className="flex-1 overflow-y-auto p-2 space-y-4">
        {Object.keys(categories).length === 0 ? (
          <div className="p-4 text-center text-xs text-neutral-500">
            No catalog items match your search.
          </div>
        ) : (
          Object.entries(categories).map(([categoryName, items]) => {
            const isCollapsed = collapsedCategories[categoryName];

            return (
              <div key={categoryName} className="space-y-1">
                {/* Category Header */}
                <button
                  onClick={() => toggleCategory(categoryName)}
                  className="w-full flex items-center justify-between px-2 py-1 text-[11px] font-medium text-neutral-400 hover:text-neutral-200 tracking-wider text-left uppercase transition-colors"
                >
                  <span className="flex items-center gap-1.5">
                    {isCollapsed ? (
                      <ChevronRight className="w-3 h-3 text-neutral-500" />
                    ) : (
                      <ChevronDown className="w-3 h-3 text-neutral-500" />
                    )}
                    {categoryName}
                  </span>
                  <span className="text-[10px] text-neutral-600 font-mono">
                    {items.length}
                  </span>
                </button>

                {/* Items in Category */}
                {!isCollapsed && (
                  <div className="space-y-0.5 pl-1">
                    {items.map((item) => {
                      const isSelected = selectedItemId === item.id;
                      const res = results[item.id];
                      const isRunning = res?.status === 'RUNNING';

                      return (
                        <div
                          key={item.id}
                          onClick={() => onSelectItem(item.id)}
                          className={`group flex items-center justify-between px-2.5 py-1.5 rounded-md cursor-pointer text-xs transition-colors ${
                            isSelected
                              ? 'bg-blue-600/15 border border-blue-500/30 text-white'
                              : 'text-neutral-300 hover:bg-neutral-800/60 border border-transparent'
                          }`}
                        >
                          <div className="flex items-center gap-2 min-w-0 flex-1 pr-2">
                            {getItemIcon(item.type)}
                            <div className="min-w-0 flex-1">
                              <div className="truncate font-medium text-[12px] text-neutral-200 group-hover:text-white">
                                {item.name}
                              </div>
                              <div className="text-[10px] text-neutral-400 flex items-center gap-1.5 truncate">
                                <span>{item.type.replace('_', ' ')}</span>
                                {item.type === 'http_request' && (
                                  <>
                                    <span aria-hidden="true">·</span>
                                    <span className="font-mono text-[9px] text-neutral-400 uppercase">
                                      {item.method}
                                    </span>
                                  </>
                                )}
                                {res?.durationMs !== undefined && (
                                  <>
                                    <span aria-hidden="true">·</span>
                                    <span className="font-mono text-[10px] text-neutral-400">
                                      {res.durationMs}ms
                                    </span>
                                  </>
                                )}
                              </div>
                            </div>
                          </div>

                          {/* Status and Quick Action */}
                          <div className="flex items-center gap-1.5 shrink-0">
                            {res?.status === 'SUCCESS' && (
                              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" title="Success" />
                            )}
                            {res?.status === 'ERROR' && (
                              <span className="w-1.5 h-1.5 rounded-full bg-rose-500" title="Error" />
                            )}
                            {isRunning && (
                              <span className="w-2 h-2 rounded-full border-2 border-blue-400 border-t-transparent animate-spin" />
                            )}

                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                onRunItem(item);
                              }}
                              title="Run task"
                              className="p-1 rounded opacity-0 group-hover:opacity-100 hover:bg-neutral-700/80 text-neutral-400 hover:text-white transition-opacity"
                            >
                              <Play className="w-3 h-3 fill-current" />
                            </button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            );
          })
        )}
      </div>

      {/* Catalog Source Info Footer */}
      <div className="p-2.5 border-t border-neutral-800 bg-neutral-900/60 text-[11px] text-neutral-400 flex items-center justify-between">
        <span className="truncate">file: workbench-catalog.json</span>
        <span className="text-[10px] text-emerald-400 font-mono">ACTIVE</span>
      </div>
    </aside>
  );
};
