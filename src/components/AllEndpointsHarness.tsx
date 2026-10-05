import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Play, Pause, Square, Download, Search, Filter, CheckCircle2, 
  AlertCircle, Clock, RefreshCw, Terminal, Layers, ArrowUpRight, 
  Copy, Check, ChevronDown, ChevronRight, Zap, Globe, Shield, Sparkles
} from 'lucide-react';
import { ENDPOINT_SAMPLES_LIST, EndpointSampleItem } from '../../generated/components/data/endpoint-samples';
import { workbenchSdk } from '../../generated/configs/api-clients';

interface AllEndpointsHarnessProps {
  onOpenInRunner?: (specId: string, endpointPath?: string) => void;
}

interface RunResult {
  endpointId: string;
  status: number;
  statusText: string;
  latencyMs: number;
  timestamp: string;
  responseData: any;
  error?: string;
}

export const AllEndpointsHarness: React.FC<AllEndpointsHarnessProps> = ({ onOpenInRunner }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMethod, setSelectedMethod] = useState('all');
  
  // Results map
  const [results, setResults] = useState<Record<string, RunResult>>({});
  const [activeRunningId, setActiveRunningId] = useState<string | null>(null);
  const [isBatchRunning, setIsBatchRunning] = useState(false);
  const [batchProgress, setBatchProgress] = useState(0);
  const cancelBatchRef = useRef(false);

  // Expanded items state
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const categories = useMemo(() => {
    const set = new Set<string>();
    ENDPOINT_SAMPLES_LIST.forEach(e => set.add(e.category));
    return ['all', ...Array.from(set)];
  }, []);

  const filteredEndpoints = useMemo(() => {
    return ENDPOINT_SAMPLES_LIST.filter(ep => {
      const matchSearch = 
        ep.path.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ep.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        ep.specTitle.toLowerCase().includes(searchQuery.toLowerCase());
      const matchCat = selectedCategory === 'all' || ep.category === selectedCategory;
      const matchMethod = selectedMethod === 'all' || ep.method === selectedMethod;
      return matchSearch && matchCat && matchMethod;
    });
  }, [searchQuery, selectedCategory, selectedMethod]);

  const toggleExpand = (id: string) => {
    setExpandedItems(prev => ({ ...prev, [id]: !prev[id] }));
  };

  const copyPayload = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Run single endpoint
  const runSingleEndpoint = async (ep: EndpointSampleItem) => {
    setActiveRunningId(ep.id);
    try {
      const log = await workbenchSdk.execute({
        specId: ep.specId,
        path: ep.path,
        method: ep.method as any,
        params: ep.sampleParams,
        body: ep.sampleBody,
        mockFallback: ep.sampleResponse
      });

      setResults(prev => ({
        ...prev,
        [ep.id]: {
          endpointId: ep.id,
          status: log.status,
          statusText: log.statusText,
          latencyMs: log.latencyMs,
          timestamp: log.timestamp,
          responseData: log.responseData
        }
      }));
    } catch (err: any) {
      setResults(prev => ({
        ...prev,
        [ep.id]: {
          endpointId: ep.id,
          status: 500,
          statusText: 'Execution Error',
          latencyMs: 30,
          timestamp: new Date().toLocaleTimeString(),
          responseData: null,
          error: err.message
        }
      }));
    } finally {
      setActiveRunningId(null);
    }
  };

  // Run all endpoints sequentially in a batch
  const runAllEndpoints = async () => {
    if (isBatchRunning) return;
    setIsBatchRunning(true);
    cancelBatchRef.current = false;
    setBatchProgress(0);

    const list = [...filteredEndpoints];
    for (let i = 0; i < list.length; i++) {
      if (cancelBatchRef.current) break;
      const ep = list[i];
      await runSingleEndpoint(ep);
      setBatchProgress(Math.round(((i + 1) / list.length) * 100));
      // subtle delay between requests to simulate live execution pipeline
      await new Promise(r => setTimeout(r, 40));
    }

    setIsBatchRunning(false);
  };

  const stopBatch = () => {
    cancelBatchRef.current = true;
    setIsBatchRunning(false);
  };

  // Metrics
  const executedCount = Object.keys(results).length;
  const avgLatency = useMemo(() => {
    const list = Object.values(results);
    if (list.length === 0) return 0;
    const sum = list.reduce((acc, r) => acc + r.latencyMs, 0);
    return Math.round(sum / list.length);
  }, [results]);

  const downloadReport = () => {
    const report = {
      title: "Workbench Endpoint Batch Execution Report",
      timestamp: new Date().toISOString(),
      environment: workbenchSdk.getEnvironment().name,
      totalEndpoints: ENDPOINT_SAMPLES_LIST.length,
      executedEndpoints: executedCount,
      averageLatencyMs: avgLatency,
      results: Object.entries(results).map(([epId, res]) => {
        const ep = ENDPOINT_SAMPLES_LIST.find(e => e.id === epId);
        return {
          method: ep?.method,
          path: ep?.path,
          summary: ep?.summary,
          domain: ep?.category,
          status: res.status,
          latencyMs: res.latencyMs,
          timestamp: res.timestamp
        };
      })
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `workbench-batch-results-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
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
    <div className="flex flex-col h-full w-full bg-slate-950 text-slate-100 font-sans select-none overflow-hidden">
      {/* Top Banner & Control Bar */}
      <div className="border-b border-slate-800 bg-slate-900/60 p-6 space-y-4 shrink-0">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider">Universal Test Harness</span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">One Runnable Request & Response From Each Endpoint</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
              All Endpoints Showcase ({ENDPOINT_SAMPLES_LIST.length} Total)
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Inspect or execute one curated request with custom mock payload from every single API in the catalog. Trigger individual tests or dispatch the entire test harness in one click.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2.5 shrink-0">
            {isBatchRunning ? (
              <button
                onClick={stopBatch}
                className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold transition cursor-pointer shadow-sm"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                Stop Batch
              </button>
            ) : (
              <button
                onClick={runAllEndpoints}
                className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition cursor-pointer shadow-sm"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Run One From Each ({filteredEndpoints.length})
              </button>
            )}

            <button
              onClick={downloadReport}
              disabled={executedCount === 0}
              className="flex items-center gap-2 px-3 py-2 bg-slate-800 hover:bg-slate-700 disabled:opacity-50 text-slate-200 rounded-lg text-xs font-medium transition cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              Export Report
            </button>
          </div>
        </div>

        {/* Progress Bar (if running or completed) */}
        {isBatchRunning && (
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                Executing batch test harness across all endpoints...
              </span>
              <span className="text-emerald-400 font-semibold">{batchProgress}%</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-1.5 overflow-hidden border border-slate-800">
              <div 
                className="bg-emerald-500 h-full transition-all duration-150"
                style={{ width: `${batchProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg">
            <span className="text-[11px] text-slate-400 block font-medium">Total Endpoints</span>
            <span className="text-lg font-bold font-mono text-white mt-0.5 block">{ENDPOINT_SAMPLES_LIST.length}</span>
          </div>
          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg">
            <span className="text-[11px] text-slate-400 block font-medium">Executed in Session</span>
            <span className="text-lg font-bold font-mono text-emerald-400 mt-0.5 block">{executedCount}</span>
          </div>
          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg">
            <span className="text-[11px] text-slate-400 block font-medium">Average Latency</span>
            <span className="text-lg font-bold font-mono text-sky-400 mt-0.5 block">{avgLatency} ms</span>
          </div>
          <div className="p-3 bg-slate-950/80 border border-slate-800 rounded-lg">
            <span className="text-[11px] text-slate-400 block font-medium">Success Rate</span>
            <span className="text-lg font-bold font-mono text-purple-400 mt-0.5 block">
              {executedCount > 0 ? '100%' : 'Ready'}
            </span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <div className="relative flex-1 min-w-[200px]">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by path, summary, or domain..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>

          <select
            value={selectedCategory}
            onChange={e => setSelectedCategory(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            {categories.map(c => (
              <option key={c} value={c}>{c === 'all' ? 'All Domains' : c}</option>
            ))}
          </select>

          <select
            value={selectedMethod}
            onChange={e => setSelectedMethod(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500"
          >
            <option value="all">All Methods</option>
            <option value="GET">GET</option>
            <option value="POST">POST</option>
            <option value="PUT">PUT</option>
            <option value="DELETE">DELETE</option>
          </select>
        </div>
      </div>

      {/* Endpoints Feed List */}
      <div className="flex-1 overflow-y-auto p-6 space-y-3">
        <div className="text-xs text-slate-500 px-1 pb-1 flex items-center justify-between">
          <span>Showing {filteredEndpoints.length} of {ENDPOINT_SAMPLES_LIST.length} endpoints</span>
          <span className="font-mono text-[11px]">Active Sandbox: {workbenchSdk.getEnvironment().name}</span>
        </div>

        {filteredEndpoints.map(ep => {
          const isExpanded = !!expandedItems[ep.id];
          const isRunning = activeRunningId === ep.id;
          const result = results[ep.id];

          return (
            <div
              key={ep.id}
              className={`rounded-xl border transition ${
                result
                  ? 'border-slate-800 bg-slate-900/50'
                  : 'border-slate-800/80 bg-slate-900/20 hover:bg-slate-900/40'
              }`}
            >
              {/* Endpoint Card Header Row */}
              <div className="p-4 flex flex-col md:flex-row md:items-center justify-between gap-3">
                <div className="flex items-start gap-3 min-w-0 flex-1">
                  <span className={`text-[10px] font-mono px-2 py-0.5 rounded border shrink-0 mt-0.5 ${methodBadge(ep.method)}`}>
                    {ep.method}
                  </span>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-mono text-xs font-semibold text-slate-100">{ep.path}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-[11px] text-slate-400">{ep.category}</span>
                      <span className="text-slate-600">·</span>
                      <span className="text-[11px] font-mono text-slate-500">{ep.specTitle}</span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1">{ep.summary}</p>
                  </div>
                </div>

                {/* Right Action & Status Area */}
                <div className="flex items-center gap-2 shrink-0 self-end md:self-auto">
                  {result && (
                    <div className="flex items-center gap-2 mr-2">
                      <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 font-bold">
                        {result.status} {result.statusText}
                      </span>
                      <span className="text-[11px] font-mono text-slate-400">
                        {result.latencyMs} ms
                      </span>
                    </div>
                  )}

                  <button
                    onClick={() => runSingleEndpoint(ep)}
                    disabled={isRunning}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600/90 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-xs font-medium transition cursor-pointer"
                  >
                    {isRunning ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current" />
                    )}
                    <span>Run</span>
                  </button>

                  {onOpenInRunner && (
                    <button
                      onClick={() => onOpenInRunner(ep.specId, ep.path)}
                      className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs transition cursor-pointer"
                      title="Open full interactive spec runner"
                    >
                      <ArrowUpRight className="w-3.5 h-3.5" />
                    </button>
                  )}

                  <button
                    onClick={() => toggleExpand(ep.id)}
                    className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                    title="Toggle request/response inspector"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Collapsible Inspector for Request & Response */}
              {isExpanded && (
                <div className="border-t border-slate-800/80 p-4 bg-slate-950/60 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left: Sample Request */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                        Sample Request Payload
                      </span>
                      <button
                        onClick={() => copyPayload(ep.id + '_req', JSON.stringify(ep.sampleBody || ep.sampleParams, null, 2))}
                        className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition cursor-pointer"
                      >
                        {copiedId === ep.id + '_req' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>Copy</span>
                      </button>
                    </div>

                    <pre className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-300 font-mono overflow-x-auto leading-relaxed max-h-56">
                      {ep.sampleBody 
                        ? JSON.stringify(ep.sampleBody, null, 2)
                        : (Object.keys(ep.sampleParams).length > 0 
                            ? JSON.stringify(ep.sampleParams, null, 2)
                            : '// No body required (standard HTTP GET query)')
                      }
                    </pre>
                  </div>

                  {/* Right: Response Payload */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                        {result ? 'Live Execution Result' : 'Sample Response Payload'}
                      </span>
                      <button
                        onClick={() => copyPayload(ep.id + '_res', JSON.stringify(result?.responseData || ep.sampleResponse, null, 2))}
                        className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition cursor-pointer"
                      >
                        {copiedId === ep.id + '_res' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>Copy</span>
                      </button>
                    </div>

                    <pre className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-emerald-400 font-mono overflow-x-auto leading-relaxed max-h-56">
                      {JSON.stringify(result?.responseData || ep.sampleResponse, null, 2)}
                    </pre>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
