import React, { useState, useMemo } from 'react';
import { 
  Search, Filter, Globe, Terminal, Play, Check, Copy, RefreshCw, 
  ExternalLink, Layers, ArrowUpRight, Shield, Zap
} from 'lucide-react';
import { workbenchSdk } from '../configs/api-clients';
import { getEnvironment } from '../configs/environments';
import { SPEC_REGISTRY_LIST } from './specs/SpecComponentRegistry';
import catalogData from './data/workbench-catalog.json';

interface GeneratedApiExplorerProps {
  onSelectSpec?: (specId: string, endpointId?: string) => void;
}

export const GeneratedApiExplorer: React.FC<GeneratedApiExplorerProps> = ({ onSelectSpec }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedMethod, setSelectedMethod] = useState<string>('all');
  const [selectedEndpoint, setSelectedEndpoint] = useState<any>(null);
  const [executing, setExecuting] = useState(false);
  const [responseLog, setResponseLog] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  // Flatten all endpoints
  const allEndpoints = useMemo(() => {
    const list: any[] = [];
    (catalogData.specs || []).forEach(spec => {
      if (spec.endpoints) {
        spec.endpoints.forEach((ep: any) => {
          list.push({
            ...ep,
            specId: spec.id,
            specTitle: spec.title,
            category: spec.category,
            format: spec.format,
            componentName: spec.componentName
          });
        });
      }
    });
    return list;
  }, []);

  const categories = useMemo(() => {
    return ['all', ...(catalogData.categories || [])];
  }, []);

  const filteredEndpoints = useMemo(() => {
    return allEndpoints.filter(ep => {
      const matchSearch = 
        ep.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ep.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ep.specTitle.toLowerCase().includes(searchQuery.toLowerCase());
      
      const matchCat = selectedCategory === 'all' || ep.category === selectedCategory;
      const matchMethod = selectedMethod === 'all' || ep.method === selectedMethod;

      return matchSearch && matchCat && matchMethod;
    });
  }, [allEndpoints, searchQuery, selectedCategory, selectedMethod]);

  const activeEndpoint = selectedEndpoint || filteredEndpoints[0] || allEndpoints[0];

  const handleExecute = async (ep: any) => {
    setExecuting(true);
    try {
      const log = await workbenchSdk.execute({
        specId: ep.specId,
        path: ep.path,
        method: ep.method,
        mockFallback: {
          service: ep.specTitle,
          status: 'SUCCESS',
          endpoint: `${ep.method} ${ep.path}`,
          summary: ep.summary,
          timestamp: new Date().toISOString(),
          responseCode: '00',
          approvalCode: 'OK_' + Math.floor(Math.random() * 899999 + 100000),
          clientEnvironment: workbenchSdk.getEnvironment().name
        }
      });
      setResponseLog(log);
    } catch (err) {
      console.error(err);
    } finally {
      setExecuting(false);
    }
  };

  const methodBadge = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      case 'POST': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'PUT': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'DELETE': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 font-sans select-none">
      {/* Top Filter Bar */}
      <div className="border-b border-slate-800 bg-slate-900/60 px-6 py-4 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider">Universal Catalog</span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400">{allEndpoints.length} Live Endpoints Across {catalogData.specs.length} Specs</span>
          </div>
          <h2 className="text-xl font-semibold text-white tracking-tight mt-0.5">API Specification Explorer</h2>
        </div>

        <div className="flex items-center gap-3">
          <div className="relative w-64">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search methods, paths, keywords..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c === 'all' ? 'All Categories' : c}</option>
            ))}
          </select>

          <select
            value={selectedMethod}
            onChange={e => setSelectedMethod(e.target.value)}
            className="bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Methods</option>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
      </div>

      {/* Main Split Body */}
      <div className="flex-1 grid grid-cols-12 min-h-0 overflow-hidden">
        {/* Endpoint Directory */}
        <div className="col-span-5 border-r border-slate-800 overflow-y-auto p-4 space-y-2 bg-slate-950/70">
          <div className="flex items-center justify-between text-xs text-slate-400 px-1 pb-1">
            <span>Showing {filteredEndpoints.length} of {allEndpoints.length} endpoints</span>
            <span className="font-mono text-[11px] text-slate-500">Active Env: {workbenchSdk.getEnvironment().name}</span>
          </div>

          {filteredEndpoints.map((ep, idx) => {
            const isSelected = activeEndpoint && activeEndpoint.path === ep.path && activeEndpoint.method === ep.method;
            return (
              <div
                key={idx}
                onClick={() => setSelectedEndpoint(ep)}
                className={`p-3 rounded-lg border transition cursor-pointer flex flex-col gap-1.5 ${
                  isSelected
                    ? 'bg-slate-800/90 border-slate-700 shadow-md ring-1 ring-emerald-500/30'
                    : 'bg-slate-900/30 border-slate-800/60 hover:bg-slate-900/70 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 min-w-0">
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded border ${methodBadge(ep.method)}`}>
                      {ep.method}
                    </span>
                    <span className="font-mono text-xs text-slate-200 truncate">{ep.path}</span>
                  </div>
                  <span className="text-[10px] font-mono text-slate-500 shrink-0">{ep.category}</span>
                </div>
                <div className="text-xs text-slate-300 font-sans">{ep.summary}</div>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-800/50">
                  <span className="truncate">{ep.specTitle}</span>
                  {onSelectSpec && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onSelectSpec(ep.specId, ep.path);
                      }}
                      className="flex items-center gap-1 text-emerald-400 hover:text-emerald-300 transition text-[11px]"
                    >
                      Open Spec
                      <ArrowUpRight className="w-3 h-3" />
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Selected Endpoint Live Runner */}
        <div className="col-span-7 flex flex-col min-h-0 bg-slate-900/30">
          {activeEndpoint ? (
            <div className="flex flex-col h-full">
              {/* Endpoint Header Bar */}
              <div className="p-4 border-b border-slate-800 bg-slate-900/60 flex items-center justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded border ${methodBadge(activeEndpoint.method)}`}>
                      {activeEndpoint.method}
                    </span>
                    <span className="font-mono text-sm font-semibold text-slate-100">{activeEndpoint.path}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-1">{activeEndpoint.summary}</p>
                </div>
                <div className="flex items-center gap-2">
                  {onSelectSpec && (
                    <button
                      onClick={() => onSelectSpec(activeEndpoint.specId, activeEndpoint.path)}
                      className="flex items-center gap-1 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition cursor-pointer"
                    >
                      <Layers className="w-3.5 h-3.5" />
                      Full Spec View
                    </button>
                  )}
                  <button
                    onClick={() => handleExecute(activeEndpoint)}
                    disabled={executing}
                    className="flex items-center gap-1.5 px-4 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-medium transition cursor-pointer"
                  >
                    {executing ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current" />
                    )}
                    Send Request
                  </button>
                </div>
              </div>

              {/* Endpoint Details and Response Inspector */}
              <div className="flex-1 p-6 overflow-y-auto space-y-4">
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-2">
                  <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    Target Execution URL
                  </div>
                  <div className="font-mono text-xs text-slate-200 bg-slate-900 p-2.5 rounded border border-slate-800 truncate">
                    {workbenchSdk.getEnvironment().baseUrl}{activeEndpoint.path}
                  </div>
                </div>

                {responseLog ? (
                  <div className="bg-slate-950 border border-slate-800 rounded-lg p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-semibold text-slate-300">Execution Result</span>
                        <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                          {responseLog.status} {responseLog.statusText}
                        </span>
                        <span className="text-[11px] font-mono text-slate-400">
                          {responseLog.latencyMs} ms
                        </span>
                      </div>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(JSON.stringify(responseLog.responseData, null, 2));
                          setCopied(true);
                          setTimeout(() => setCopied(false), 2000);
                        }}
                        className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition cursor-pointer"
                      >
                        {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                        {copied ? 'Copied' : 'Copy Response'}
                      </button>
                    </div>

                    <pre className="bg-slate-900/90 border border-slate-800 rounded p-3 text-xs text-emerald-300 font-mono overflow-x-auto whitespace-pre leading-relaxed">
                      {JSON.stringify(responseLog.responseData, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className="border border-dashed border-slate-800 rounded-lg p-8 flex flex-col items-center justify-center text-center space-y-2 text-slate-500">
                    <Terminal className="w-8 h-8 text-slate-600" />
                    <span className="text-xs">No active response payload yet.</span>
                    <span className="text-[11px] text-slate-600 max-w-sm">
                      Click "Send Request" to dispatch an API test call against the selected environment sandbox.
                    </span>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-slate-500 text-xs">
              Select an endpoint to inspect.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
