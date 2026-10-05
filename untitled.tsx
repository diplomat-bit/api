import React, { useState, useEffect } from 'react';
import { 
  Terminal, Layers, Globe, Play, CheckCircle2, AlertCircle, Clock, 
  Search, Shield, Key, FileCode, Sliders, RefreshCw, Download, ArrowUpRight
} from 'lucide-react';
import { workbenchSdk } from './generated/configs/api-clients';
import { DEFAULT_ENVIRONMENTS, getEnvironment } from './generated/configs/environments';
import { SPEC_REGISTRY_LIST, getSpecComponent } from './generated/components/specs/SpecComponentRegistry';
import { GeneratedApiExplorer } from './generated/components/GeneratedApiExplorer';
import { GeneratedXsdViewer } from './generated/components/GeneratedXsdViewer';
import { ApiDocumentationPortal } from './src/components/ApiDocumentationPortal';
import { AllEndpointsHarness } from './src/components/AllEndpointsHarness';
import { PublicDatabaseHub } from './src/components/PublicDatabaseHub';
import catalogData from './generated/components/data/workbench-catalog.json';

export interface UntitledWorkbenchProps {
  onOpenSpec?: (specId: string, endpointPath?: string) => void;
}

export const UntitledWorkbench: React.FC<UntitledWorkbenchProps> = ({ onOpenSpec }) => {
  const [activeTab, setActiveTab] = useState<'live-db' | 'overview' | 'one-from-each' | 'docs' | 'explorer' | 'specs' | 'schemas' | 'logs'>('live-db');
  const [activeSpecId, setActiveSpecId] = useState<string>('access-online-transactions-and-orders');
  const [selectedEnvKey, setSelectedEnvKey] = useState<string>('sandbox');
  const [history, setHistory] = useState(workbenchSdk.getHistory());
  const [searchFilter, setSearchFilter] = useState('');

  useEffect(() => {
    return workbenchSdk.subscribe(() => {
      setHistory(workbenchSdk.getHistory());
    });
  }, []);

  const handleEnvChange = (envKey: string) => {
    setSelectedEnvKey(envKey);
    workbenchSdk.setEnvironment(envKey);
  };

  const filteredSpecs = SPEC_REGISTRY_LIST.filter(s => 
    s.title.toLowerCase().includes(searchFilter.toLowerCase()) ||
    s.id.toLowerCase().includes(searchFilter.toLowerCase())
  );

  const ActiveSpecComponent = getSpecComponent(activeSpecId);

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 font-sans">
      {/* Universal Top Nav */}
      <header className="h-14 border-b border-slate-800 bg-slate-900/90 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center">
              <Globe className="w-4 h-4 text-emerald-400" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-sm font-bold tracking-tight text-white">Workbench Runner</h1>
                <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  v2.4.0
                </span>
              </div>
              <p className="text-[11px] text-slate-400">Visa & Financial Services Developer Workbench</p>
            </div>
          </div>

          <div className="h-4 w-px bg-slate-800" />

          {/* Navigation Tabs */}
          <nav className="flex items-center gap-1">
            {[
              { id: 'live-db', label: 'Live DB & API 🟢' },
              { id: 'overview', label: 'Catalog Overview' },
              { id: 'one-from-each', label: 'One From Each' },
              { id: 'docs', label: 'API Documentation' },
              { id: 'specs', label: 'Active Spec Runner' },
              { id: 'explorer', label: 'API Explorer' },
              { id: 'schemas', label: 'XML Schemas' },
              { id: 'logs', label: `Logs (${history.length})` }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition cursor-pointer ${
                  activeTab === tab.id
                    ? 'bg-slate-800 text-white shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Right Environment Selector */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 bg-slate-950 px-2.5 py-1 rounded-lg border border-slate-800 text-xs">
            <Shield className="w-3.5 h-3.5 text-emerald-400" />
            <span className="text-slate-400">Target Env:</span>
            <select
              value={selectedEnvKey}
              onChange={e => handleEnvChange(e.target.value)}
              className="bg-transparent font-medium text-slate-100 focus:outline-none cursor-pointer"
            >
              <option value="sandbox" className="bg-slate-900 text-slate-100">Sandbox (sandbox.api.visa.com)</option>
              <option value="certification" className="bg-slate-900 text-slate-100">Certification (cert.api.visa.com)</option>
              <option value="production" className="bg-slate-900 text-slate-100">Production (api.visa.com)</option>
              <option value="mock" className="bg-slate-900 text-slate-100">Local Sandbox Mock</option>
            </select>
          </div>
        </div>
      </header>

      {/* Main Body */}
      <div className="flex-1 min-h-0 overflow-hidden">
        {activeTab === 'live-db' && (
          <div className="h-full min-h-0 flex flex-col overflow-hidden">
            <PublicDatabaseHub />
          </div>
        )}

        {activeTab === 'overview' && (
          <div className="h-full overflow-y-auto p-8 space-y-6">
            {/* Hero Card */}
            <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-slate-800/80 border border-slate-800 rounded-xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-sm">
              <div className="space-y-1.5 max-w-2xl">
                <span className="text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider">Loaded Specification Catalog</span>
                <h2 className="text-2xl font-bold text-white tracking-tight">Visa & Financial Services Developer Workbench</h2>
                <p className="text-xs text-slate-400 leading-relaxed">
                  Interactive runtime executing 39 enterprise financial service specifications, payment rails, token services, and ISO XML schemas without modification to the raw catalog configuration.
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setActiveTab('explorer')}
                  className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition cursor-pointer flex items-center gap-1.5"
                >
                  <Search className="w-3.5 h-3.5" />
                  Explore Endpoints
                </button>
                <button
                  onClick={() => setActiveTab('specs')}
                  className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-medium transition cursor-pointer flex items-center gap-1.5"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Launch Spec Runner
                </button>
              </div>
            </div>

            {/* Spec Matrix Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-sm font-semibold text-white">Integrated Specifications ({SPEC_REGISTRY_LIST.length})</h3>
                  <p className="text-xs text-slate-400">Click any specification to launch its interactive testing console</p>
                </div>
                <div className="w-64">
                  <input
                    type="text"
                    placeholder="Search specifications..."
                    value={searchFilter}
                    onChange={e => setSearchFilter(e.target.value)}
                    className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {filteredSpecs.map((spec) => (
                  <div
                    key={spec.id}
                    onClick={() => {
                      setActiveSpecId(spec.id);
                      setActiveTab('specs');
                    }}
                    className="p-4 rounded-xl border border-slate-800 bg-slate-900/40 hover:bg-slate-900/80 hover:border-slate-700 transition cursor-pointer flex flex-col justify-between group shadow-sm"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 uppercase tracking-wider">
                          {spec.format}
                        </span>
                        <span className="text-xs font-mono text-slate-500">
                          {spec.format === 'xsd' ? `${spec.xsdTypesCount} Types` : `${spec.endpointsCount} Endpoints`}
                        </span>
                      </div>
                      <h4 className="text-sm font-semibold text-slate-100 group-hover:text-emerald-400 transition">
                        {spec.title}
                      </h4>
                      <p className="text-xs text-slate-400 font-mono mt-1 truncate">
                        {spec.fileName}
                      </p>
                    </div>

                    <div className="mt-4 pt-3 border-t border-slate-800/60 flex items-center justify-between text-xs text-slate-500">
                      <span>Launch Interface</span>
                      <ArrowUpRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition text-emerald-400" />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'one-from-each' && (
          <div className="flex-1 min-h-0">
            <AllEndpointsHarness onOpenInRunner={onOpenSpec} />
          </div>
        )}

        {activeTab === 'docs' && (
          <div className="flex-1 min-h-0">
            <ApiDocumentationPortal onOpenInRunner={onOpenSpec} />
          </div>
        )}

        {activeTab === 'specs' && (
          <div className="flex h-full min-h-0">
            {/* Sidebar list of specs */}
            <div className="w-72 border-r border-slate-800 bg-slate-950 overflow-y-auto p-3 space-y-1 shrink-0">
              <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
                Select Specification
              </div>
              {SPEC_REGISTRY_LIST.map((spec) => {
                const isSelected = activeSpecId === spec.id;
                return (
                  <button
                    key={spec.id}
                    onClick={() => setActiveSpecId(spec.id)}
                    className={`w-full text-left p-2.5 rounded-lg border transition flex flex-col gap-0.5 cursor-pointer ${
                      isSelected
                        ? 'bg-slate-800/90 border-slate-700 shadow-sm'
                        : 'bg-slate-900/30 border-transparent hover:bg-slate-900/70 hover:border-slate-800'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-xs text-slate-200 truncate">{spec.title}</span>
                      <span className="text-[10px] font-mono text-slate-500 uppercase">{spec.format}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 truncate">{spec.fileName}</span>
                  </button>
                );
              })}
            </div>

            {/* Spec Render Window */}
            <div className="flex-1 min-h-0 overflow-hidden">
              {ActiveSpecComponent ? (
                <ActiveSpecComponent />
              ) : (
                <div className="h-full flex items-center justify-center text-slate-500 text-xs">
                  Specification component not found.
                </div>
              )}
            </div>
          </div>
        )}

        {activeTab === 'explorer' && (
          <GeneratedApiExplorer onSelectSpec={(specId) => {
            setActiveSpecId(specId);
            setActiveTab('specs');
          }} />
        )}

        {activeTab === 'schemas' && (
          <GeneratedXsdViewer />
        )}

        {activeTab === 'logs' && (
          <div className="h-full overflow-y-auto p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-semibold text-white">Execution Audit Logs</h3>
                <p className="text-xs text-slate-400">Captured HTTP request & response telemetry through Workbench client</p>
              </div>
              <button
                onClick={() => workbenchSdk.clearHistory()}
                className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs transition cursor-pointer"
              >
                Clear History
              </button>
            </div>

            {history.length > 0 ? (
              <div className="space-y-2">
                {history.map(log => (
                  <div key={log.id} className="p-3 bg-slate-900/70 border border-slate-800 rounded-lg flex flex-col gap-2 font-mono text-xs">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                          {log.method}
                        </span>
                        <span className="text-slate-200">{log.url}</span>
                      </div>
                      <div className="flex items-center gap-3 text-slate-400 text-[11px]">
                        <span>{log.status} {log.statusText}</span>
                        <span>{log.latencyMs}ms</span>
                        <span>{log.timestamp}</span>
                      </div>
                    </div>
                    {log.responseData && (
                      <pre className="bg-slate-950 p-2.5 rounded border border-slate-800/80 text-emerald-300 text-[11px] overflow-x-auto max-h-40">
                        {JSON.stringify(log.responseData, null, 2)}
                      </pre>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="border border-dashed border-slate-800 rounded-lg p-12 text-center text-slate-500 text-xs">
                No requests executed yet. Run an endpoint from Active Spec Runner or API Explorer to generate audit entries.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default UntitledWorkbench;
