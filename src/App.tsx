import React, { useState, useEffect, useMemo } from 'react';
import { 
  Globe, Terminal, Layers, Search, Shield, Play, FileCode, 
  Activity, Sliders, RefreshCw, Upload, Download, Copy, Check,
  ChevronRight, ExternalLink, Sparkles, Filter, Code2, CheckCircle2,
  BookOpen, Zap
} from 'lucide-react';
import { workbenchSdk } from '../generated/configs/api-clients';
import { DEFAULT_ENVIRONMENTS, getEnvironment } from '../generated/configs/environments';
import { 
  SPEC_REGISTRY_LIST, 
  getSpecComponent, 
  SpecRegistryEntry 
} from '../generated/components/specs/SpecComponentRegistry';
import { GeneratedApiExplorer } from '../generated/components/GeneratedApiExplorer';
import { GeneratedXsdViewer } from '../generated/components/GeneratedXsdViewer';
import { ApiDocumentationPortal } from './components/ApiDocumentationPortal';
import { AllEndpointsHarness } from './components/AllEndpointsHarness';
import { UntitledWorkbench } from '../untitled';

export default function App() {
  const [catalogJson, setCatalogJson] = useState<any>(null);
  const [catalogLoading, setCatalogLoading] = useState(true);
  const [catalogError, setCatalogError] = useState<string | null>(null);

  // Active view: 'docs' | 'one-from-each' | 'specs' | 'dashboard' | 'explorer' | 'schemas' | 'json' | 'logs'
  const [activeTab, setActiveTab] = useState<'docs' | 'one-from-each' | 'specs' | 'dashboard' | 'explorer' | 'schemas' | 'json' | 'logs'>('one-from-each');
  
  // Selected Spec
  const [selectedSpecId, setSelectedSpecId] = useState<string>('access-online-transactions-and-orders');
  const [selectedEndpointPath, setSelectedEndpointPath] = useState<string | undefined>(undefined);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  
  // Environment
  const [selectedEnvKey, setSelectedEnvKey] = useState<string>('sandbox');
  
  // Logs
  const [logs, setLogs] = useState(workbenchSdk.getHistory());
  const [copiedJson, setCopiedJson] = useState(false);

  // Load /workbench-catalog.json on mount
  useEffect(() => {
    fetch('/workbench-catalog.json')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to load /workbench-catalog.json`);
        return res.json();
      })
      .then((data) => {
        setCatalogJson(data);
        if (data.defaultEnvironment && DEFAULT_ENVIRONMENTS[data.defaultEnvironment]) {
          setSelectedEnvKey(data.defaultEnvironment);
          workbenchSdk.setEnvironment(data.defaultEnvironment);
        }
        if (data.specs && data.specs.length > 0) {
          setSelectedSpecId(data.specs[0].id);
        }
        setCatalogLoading(false);
      })
      .catch((err) => {
        console.error('Error loading workbench-catalog.json:', err);
        setCatalogError(err.message);
        setCatalogLoading(false);
      });
  }, []);

  // Subscribe to workbench SDK logs
  useEffect(() => {
    return workbenchSdk.subscribe(() => {
      setLogs(workbenchSdk.getHistory());
    });
  }, []);

  const handleEnvChange = (envKey: string) => {
    setSelectedEnvKey(envKey);
    workbenchSdk.setEnvironment(envKey);
  };

  const handleOpenInRunner = (specId: string, endpointPath?: string) => {
    setSelectedSpecId(specId);
    setSelectedEndpointPath(endpointPath);
    setActiveTab('specs');
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const text = event.target?.result as string;
        const parsed = JSON.parse(text);
        setCatalogJson(parsed);
        if (parsed.specs?.[0]?.id) {
          setSelectedSpecId(parsed.specs[0].id);
        }
      } catch (err: any) {
        alert('Invalid JSON file: ' + err.message);
      }
    };
    reader.readAsText(file);
  };

  const categories = useMemo(() => {
    if (catalogJson?.categories) {
      return ['all', ...catalogJson.categories];
    }
    const set = new Set<string>();
    SPEC_REGISTRY_LIST.forEach(s => {
      const found = catalogJson?.specs?.find((cs: any) => cs.id === s.id);
      if (found?.category) set.add(found.category);
    });
    return ['all', ...Array.from(set)];
  }, [catalogJson]);

  const filteredSpecs = useMemo(() => {
    return SPEC_REGISTRY_LIST.filter(spec => {
      const catalogSpec = catalogJson?.specs?.find((s: any) => s.id === spec.id);
      const category = catalogSpec?.category || 'General';
      const matchesCategory = selectedCategory === 'all' || category === selectedCategory;
      const matchesSearch = 
        spec.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spec.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        spec.fileName.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [catalogJson, selectedCategory, searchQuery]);

  const activeSpec = SPEC_REGISTRY_LIST.find(s => s.id === selectedSpecId) || SPEC_REGISTRY_LIST[0];
  const ActiveSpecComponent = activeSpec ? getSpecComponent(activeSpec.id) : null;

  return (
    <div className="flex flex-col h-screen w-screen overflow-hidden bg-slate-950 text-slate-100 font-sans antialiased">
      {/* Universal Enterprise Header */}
      <header className="h-14 border-b border-slate-800 bg-slate-900/90 px-5 flex items-center justify-between shrink-0 z-20">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Globe className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-bold text-white tracking-tight">Workbench Developer Hub</span>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/15 text-emerald-400 border border-emerald-500/30">
                  {catalogJson?.version ? `v${catalogJson.version}` : 'v2.4.0'}
                </span>
                <span className="text-[11px] font-mono text-slate-400 hidden sm:inline">
                  workbench-catalog.json
                </span>
              </div>
            </div>
          </div>

          <div className="h-4 w-px bg-slate-800 hidden md:block" />

          {/* Navigation Bar */}
          <nav className="flex items-center gap-1">
            <button
              onClick={() => setActiveTab('one-from-each')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold transition cursor-pointer ${
                activeTab === 'one-from-each'
                  ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Zap className="w-3.5 h-3.5 text-amber-400 fill-current" />
              One From Each
            </button>

            <button
              onClick={() => setActiveTab('docs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                activeTab === 'docs'
                  ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <BookOpen className="w-3.5 h-3.5 text-emerald-400" />
              API Documentation
            </button>

            <button
              onClick={() => setActiveTab('specs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                activeTab === 'specs'
                  ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Play className="w-3.5 h-3.5 text-emerald-400" />
              Spec Runner
            </button>

            <button
              onClick={() => setActiveTab('dashboard')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                activeTab === 'dashboard'
                  ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Layers className="w-3.5 h-3.5 text-sky-400" />
              Catalog Dashboard
            </button>

            <button
              onClick={() => setActiveTab('explorer')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                activeTab === 'explorer'
                  ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Search className="w-3.5 h-3.5 text-indigo-400" />
              API Explorer
            </button>

            <button
              onClick={() => setActiveTab('schemas')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                activeTab === 'schemas'
                  ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <FileCode className="w-3.5 h-3.5 text-amber-400" />
              XML Schemas
            </button>

            <button
              onClick={() => setActiveTab('json')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                activeTab === 'json'
                  ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Code2 className="w-3.5 h-3.5 text-purple-400" />
              Raw Catalog JSON
            </button>

            <button
              onClick={() => setActiveTab('logs')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                activeTab === 'logs'
                  ? 'bg-slate-800 text-white shadow-sm ring-1 ring-slate-700'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
              }`}
            >
              <Activity className="w-3.5 h-3.5 text-emerald-400" />
              Logs ({logs.length})
            </button>
          </nav>
        </div>

        {/* Environment & JSON Actions */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-xs">
            <Shield className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
            <span className="text-slate-400 text-[11px] hidden sm:inline">Environment:</span>
            <select
              value={selectedEnvKey}
              onChange={(e) => handleEnvChange(e.target.value)}
              className="bg-transparent font-medium text-slate-100 text-xs focus:outline-none cursor-pointer"
            >
              <option value="sandbox" className="bg-slate-900 text-slate-100">Sandbox (sandbox.api.visa.com)</option>
              <option value="certification" className="bg-slate-900 text-slate-100">Certification (cert.api.visa.com)</option>
              <option value="production" className="bg-slate-900 text-slate-100">Production (api.visa.com)</option>
              <option value="mock" className="bg-slate-900 text-slate-100">Local Mock Sandbox</option>
            </select>
          </div>

          <label className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-medium transition cursor-pointer">
            <Upload className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Load JSON</span>
            <input
              type="file"
              accept=".json"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
        </div>
      </header>

      {/* Main Workspace Area */}
      <main className="flex-1 min-h-0 flex overflow-hidden">
        {/* One From Each Endpoint Showcase & Batch Runner */}
        {activeTab === 'one-from-each' && (
          <div className="flex-1 min-h-0">
            <AllEndpointsHarness onOpenInRunner={handleOpenInRunner} />
          </div>
        )}

        {/* API Documentation Portal View */}
        {activeTab === 'docs' && (
          <div className="flex-1 min-h-0">
            <ApiDocumentationPortal onOpenInRunner={handleOpenInRunner} />
          </div>
        )}

        {/* Spec Runner Mode: Sidebar + Selected Spec Component */}
        {activeTab === 'specs' && (
          <div className="flex-1 flex min-h-0">
            {/* Left Specifications Directory */}
            <aside className="w-80 border-r border-slate-800 bg-slate-950/90 flex flex-col min-h-0 shrink-0">
              <div className="p-3 border-b border-slate-800 space-y-2">
                <div className="relative">
                  <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search 39 specifications..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="flex items-center gap-2">
                  <Filter className="w-3 h-3 text-slate-400 shrink-0" />
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1 text-[11px] text-slate-300 focus:outline-none focus:border-emerald-500"
                  >
                    {categories.map((c) => (
                      <option key={c} value={c}>
                        {c === 'all' ? 'All Categories' : c}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Spec Items List */}
              <div className="flex-1 overflow-y-auto p-2 space-y-1">
                <div className="px-2 py-1 text-[10px] font-semibold text-slate-500 uppercase tracking-wider flex items-center justify-between">
                  <span>Specifications ({filteredSpecs.length})</span>
                  <span>{SPEC_REGISTRY_LIST.length} Total</span>
                </div>

                {filteredSpecs.map((spec) => {
                  const isSelected = selectedSpecId === spec.id;
                  const catSpec = catalogJson?.specs?.find((s: any) => s.id === spec.id);
                  return (
                    <button
                      key={spec.id}
                      onClick={() => {
                        setSelectedSpecId(spec.id);
                        setSelectedEndpointPath(undefined);
                      }}
                      className={`w-full text-left p-2.5 rounded-lg border transition flex flex-col gap-1 cursor-pointer ${
                        isSelected
                          ? 'bg-slate-800/90 border-slate-700 shadow-sm ring-1 ring-emerald-500/20'
                          : 'bg-slate-900/30 border-transparent hover:bg-slate-900/70 hover:border-slate-800'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${
                          spec.format === 'xsd'
                            ? 'bg-amber-500/10 text-amber-400 border-amber-500/20'
                            : 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        }`}>
                          {spec.format.toUpperCase()}
                        </span>
                        <span className="text-[10px] font-mono text-slate-500">
                          {spec.format === 'xsd' ? `${spec.xsdTypesCount} Types` : `${spec.endpointsCount} Endpoints`}
                        </span>
                      </div>
                      <div className="font-medium text-xs text-slate-200 truncate">{spec.title}</div>
                      <div className="text-[10px] text-slate-400 truncate">{catSpec?.category || 'Finance'}</div>
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Spec Interactive Execution Interface */}
            <section className="flex-1 min-h-0 bg-slate-950 overflow-hidden">
              {ActiveSpecComponent ? (
                <ActiveSpecComponent selectedEndpointId={selectedEndpointPath} />
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                  Specification not loaded. Select an item from the left.
                </div>
              )}
            </section>
          </div>
        )}

        {/* Dashboard Mode (UntitledWorkbench component) */}
        {activeTab === 'dashboard' && (
          <div className="flex-1 min-h-0">
            <UntitledWorkbench onOpenSpec={handleOpenInRunner} />
          </div>
        )}

        {/* API Explorer Mode */}
        {activeTab === 'explorer' && (
          <div className="flex-1 min-h-0">
            <GeneratedApiExplorer onSelectSpec={handleOpenInRunner} />
          </div>
        )}

        {/* XML Schemas Mode */}
        {activeTab === 'schemas' && (
          <div className="flex-1 min-h-0">
            <GeneratedXsdViewer />
          </div>
        )}

        {/* Raw Catalog JSON Mode */}
        {activeTab === 'json' && (
          <div className="flex-1 flex flex-col min-h-0 p-6 bg-slate-950">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-semibold text-white">Active workbench-catalog.json</h3>
                <p className="text-xs text-slate-400">Direct inspect of served catalog configuration (Unmodified exact user specification)</p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(JSON.stringify(catalogJson, null, 2));
                    setCopiedJson(true);
                    setTimeout(() => setCopiedJson(false), 2000);
                  }}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition cursor-pointer"
                >
                  {copiedJson ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  {copiedJson ? 'Copied' : 'Copy JSON'}
                </button>
                <a
                  href="/workbench-catalog.json"
                  download="workbench-catalog.json"
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs transition font-medium"
                >
                  <Download className="w-3.5 h-3.5" />
                  Download File
                </a>
              </div>
            </div>

            <div className="flex-1 mt-4 overflow-hidden rounded-lg border border-slate-800 bg-slate-900/60 p-4">
              <pre className="h-full overflow-auto text-xs font-mono text-emerald-300 leading-relaxed">
                {catalogJson ? JSON.stringify(catalogJson, null, 2) : 'Loading catalog...'}
              </pre>
            </div>
          </div>
        )}

        {/* Telemetry & Audit Logs Mode */}
        {activeTab === 'logs' && (
          <div className="flex-1 overflow-y-auto p-6 space-y-4 bg-slate-950">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div>
                <h3 className="text-base font-semibold text-white">Execution Telemetry</h3>
                <p className="text-xs text-slate-400">Captured request & response traces across all specifications</p>
              </div>
              <button
                onClick={() => workbenchSdk.clearHistory()}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition cursor-pointer"
              >
                Clear Logs
              </button>
            </div>

            {logs.length > 0 ? (
              <div className="space-y-3">
                {logs.map((log) => (
                  <div key={log.id} className="p-4 bg-slate-900/70 border border-slate-800 rounded-lg flex flex-col gap-2 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                          {log.method}
                        </span>
                        <span className="text-slate-100">{log.url}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                        <span className="text-emerald-400 font-semibold">{log.status} {log.statusText}</span>
                        <span>{log.latencyMs} ms</span>
                        <span>{log.timestamp}</span>
                      </div>
                    </div>
                    {log.responseData && (
                      <pre className="bg-slate-950 p-3 rounded border border-slate-800 text-emerald-300 text-[11px] overflow-x-auto max-h-48 leading-relaxed">
                        {JSON.stringify(log.responseData, null, 2)}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-slate-800 rounded-lg p-12 text-center text-slate-500 text-xs">
                No endpoint logs recorded yet. Execute any endpoint from the Spec Runner or API Explorer to track execution traces.
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}
