import React, { useState, useMemo, useRef, useEffect } from 'react';
import { 
  Play, Pause, Square, Download, Search, Filter, CheckCircle2, 
  AlertCircle, Clock, RefreshCw, Terminal, Layers, ArrowUpRight, 
  Copy, Check, ChevronDown, ChevronRight, Zap, Globe, Shield, Sparkles, Edit3, Code2, X
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
  requestPayload?: any;
  error?: string;
}

export const AllEndpointsHarness: React.FC<AllEndpointsHarnessProps> = ({ onOpenInRunner }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedMethod, setSelectedMethod] = useState('all');
  
  // Results & Edited Payloads
  const [results, setResults] = useState<Record<string, RunResult>>({});
  const [editedPayloads, setEditedPayloads] = useState<Record<string, string>>({});
  const [editingCardId, setEditingCardId] = useState<string | null>(null);

  // Batch execution state
  const [activeRunningId, setActiveRunningId] = useState<string | null>(null);
  const [isBatchRunning, setIsBatchRunning] = useState(false);
  const [batchProgress, setBatchProgress] = useState(0);
  const cancelBatchRef = useRef(false);

  // Expanded items & modals
  const [expandedItems, setExpandedItems] = useState<Record<string, boolean>>({});
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [showUnifiedModal, setShowUnifiedModal] = useState<boolean>(false);

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

  const copyToClipboard = (id: string, text: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Run single endpoint with optional edited payload
  const runSingleEndpoint = async (ep: EndpointSampleItem, overridePayload?: any) => {
    setActiveRunningId(ep.id);
    try {
      let body = ep.sampleBody;
      let params = ep.sampleParams;

      if (overridePayload !== undefined) {
        body = overridePayload;
      } else if (editedPayloads[ep.id]) {
        try {
          body = JSON.parse(editedPayloads[ep.id]);
        } catch {
          body = editedPayloads[ep.id];
        }
      }

      const log = await workbenchSdk.execute({
        specId: ep.specId,
        endpointId: ep.id,
        path: ep.path,
        method: ep.method as any,
        params,
        body,
        mockFallback: ep.sampleResponse
      });

      const resultItem: RunResult = {
        endpointId: ep.id,
        status: log.status,
        statusText: log.statusText,
        latencyMs: log.latencyMs,
        timestamp: log.timestamp,
        responseData: log.responseData,
        requestPayload: body || params
      };

      setResults(prev => ({
        ...prev,
        [ep.id]: resultItem
      }));

      return resultItem;
    } catch (err: any) {
      const errItem: RunResult = {
        endpointId: ep.id,
        status: 500,
        statusText: 'Execution Error',
        latencyMs: 25,
        timestamp: new Date().toLocaleTimeString(),
        responseData: null,
        error: err.message
      };
      setResults(prev => ({ ...prev, [ep.id]: errItem }));
      return errItem;
    } finally {
      setActiveRunningId(null);
    }
  };

  // Run ALL endpoints at once in batch
  const runAllEndpointsAtOnce = async () => {
    if (isBatchRunning) return;
    setIsBatchRunning(true);
    cancelBatchRef.current = false;
    setBatchProgress(0);

    const list = [...ENDPOINT_SAMPLES_LIST];
    for (let i = 0; i < list.length; i++) {
      if (cancelBatchRef.current) break;
      const ep = list[i];
      await runSingleEndpoint(ep);
      setBatchProgress(Math.round(((i + 1) / list.length) * 100));
      // brief pause to ensure smooth animation
      await new Promise(r => setTimeout(r, 20));
    }

    setIsBatchRunning(false);
    setShowUnifiedModal(true);
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

  // Generate unified master response JSON
  const getUnifiedResponseJson = () => {
    const masterObj = {
      harnessTitle: "Unified All-Endpoints Batch Execution Response",
      timestamp: new Date().toISOString(),
      environment: workbenchSdk.getEnvironment().name,
      totalEndpointsCatalog: ENDPOINT_SAMPLES_LIST.length,
      executedEndpointsCount: executedCount,
      averageLatencyMs: avgLatency,
      allResponses: results
    };
    return JSON.stringify(masterObj, null, 2);
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
      
      {/* Top Banner & Batch Control Bar */}
      <div className="border-b border-slate-800 bg-slate-900/80 p-6 space-y-4 shrink-0 shadow-md">
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <span className="text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider">Universal Test Harness</span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">Run All 176 Endpoints At Once & Collect Unified Response</span>
            </div>
            <h1 className="text-2xl font-bold text-white tracking-tight mt-0.5">
              All Endpoints Batch Runner ({ENDPOINT_SAMPLES_LIST.length} Endpoints)
            </h1>
            <p className="text-xs text-slate-400 mt-1 max-w-3xl">
              Execute every single endpoint simultaneously, edit request payloads on the fly to get new responses, and collect all outputs into one single master JSON response with 1-click copy.
            </p>
          </div>

          {/* Master Action Buttons */}
          <div className="flex flex-wrap items-center gap-2.5 shrink-0">
            {isBatchRunning ? (
              <button
                onClick={stopBatch}
                className="flex items-center gap-2 px-4 py-2 bg-rose-600 hover:bg-rose-500 text-white rounded-lg text-xs font-semibold transition cursor-pointer shadow-sm"
              >
                <Square className="w-3.5 h-3.5 fill-current" />
                Stop Batch ({batchProgress}%)
              </button>
            ) : (
              <button
                onClick={runAllEndpointsAtOnce}
                className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white rounded-lg text-xs font-bold transition cursor-pointer shadow-lg"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Run All {ENDPOINT_SAMPLES_LIST.length} Endpoints At Once
              </button>
            )}

            <button
              onClick={() => setShowUnifiedModal(true)}
              disabled={executedCount === 0}
              className="flex items-center gap-2 px-3.5 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition cursor-pointer shadow-sm"
            >
              <Code2 className="w-3.5 h-3.5" />
              Collect Unified Response ({executedCount})
            </button>
          </div>
        </div>

        {/* Progress Bar (if running) */}
        {isBatchRunning && (
          <div className="space-y-1.5 pt-1">
            <div className="flex items-center justify-between text-xs text-slate-400 font-mono">
              <span className="flex items-center gap-2">
                <RefreshCw className="w-3.5 h-3.5 text-emerald-400 animate-spin" />
                Executing batch test harness across all 176 endpoints simultaneously...
              </span>
              <span className="text-emerald-400 font-semibold">{batchProgress}%</span>
            </div>
            <div className="w-full bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
              <div 
                className="bg-gradient-to-r from-emerald-500 to-teal-400 h-full transition-all duration-150"
                style={{ width: `${batchProgress}%` }}
              />
            </div>
          </div>
        )}

        {/* Metric Cards Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-1">
          <div className="p-3 bg-slate-950/90 border border-slate-800 rounded-lg">
            <span className="text-[11px] text-slate-400 block font-medium">Total Catalog Endpoints</span>
            <span className="text-lg font-bold font-mono text-white mt-0.5 block">{ENDPOINT_SAMPLES_LIST.length}</span>
          </div>
          <div className="p-3 bg-slate-950/90 border border-slate-800 rounded-lg">
            <span className="text-[11px] text-slate-400 block font-medium">Executed & Collected</span>
            <span className="text-lg font-bold font-mono text-emerald-400 mt-0.5 block">{executedCount} / {ENDPOINT_SAMPLES_LIST.length}</span>
          </div>
          <div className="p-3 bg-slate-950/90 border border-slate-800 rounded-lg">
            <span className="text-[11px] text-slate-400 block font-medium">Average Execution Latency</span>
            <span className="text-lg font-bold font-mono text-sky-400 mt-0.5 block">{avgLatency} ms</span>
          </div>
          <div className="p-3 bg-slate-950/90 border border-slate-800 rounded-lg">
            <span className="text-[11px] text-slate-400 block font-medium">Unified Payload Status</span>
            <span className="text-lg font-bold font-mono text-purple-400 mt-0.5 block">
              {executedCount > 0 ? 'Ready to Copy' : 'Awaiting Run'}
            </span>
          </div>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center gap-3 pt-1">
          <div className="relative flex-1 min-w-[220px]">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search by path, summary, or domain..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500 font-mono"
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
          const isEditing = editingCardId === ep.id;
          const isRunning = activeRunningId === ep.id;
          const result = results[ep.id];

          const currentPayloadStr = editedPayloads[ep.id] !== undefined 
            ? editedPayloads[ep.id] 
            : JSON.stringify(ep.sampleBody || ep.sampleParams || {}, null, 2);

          return (
            <div
              key={ep.id}
              className={`rounded-xl border transition ${
                result
                  ? 'border-emerald-500/30 bg-slate-900/60 shadow-sm'
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
                    onClick={() => setEditingCardId(isEditing ? null : ep.id)}
                    className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg text-xs transition cursor-pointer ${
                      isEditing ? 'bg-blue-600 text-white' : 'bg-slate-800 hover:bg-slate-700 text-slate-300'
                    }`}
                    title="Edit request payload to test new response"
                  >
                    <Edit3 className="w-3.5 h-3.5" />
                    <span>{isEditing ? 'Close Editor' : 'Edit & Re-Run'}</span>
                  </button>

                  <button
                    onClick={() => runSingleEndpoint(ep)}
                    disabled={isRunning}
                    className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold transition cursor-pointer shadow-sm"
                  >
                    {isRunning ? (
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                    ) : (
                      <Play className="w-3.5 h-3.5 fill-current" />
                    )}
                    <span>{result ? 'Re-Run' : 'Run Endpoint'}</span>
                  </button>

                  <button
                    onClick={() => toggleExpand(ep.id)}
                    className="p-1.5 text-slate-400 hover:text-slate-200 rounded-lg hover:bg-slate-800 transition cursor-pointer"
                    title="Toggle inspector"
                  >
                    <ChevronDown className={`w-4 h-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
                  </button>
                </div>
              </div>

              {/* Inline Edit Payload Box */}
              {isEditing && (
                <div className="border-t border-blue-500/30 p-4 bg-blue-950/20 space-y-3 animate-in fade-in">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-blue-300 flex items-center gap-1.5">
                      <Edit3 className="w-3.5 h-3.5" />
                      Edit Request Payload & Parameters (Prove it can be edited and get new response)
                    </span>
                    <span className="text-[10px] text-slate-400 font-mono">JSON Format</span>
                  </div>

                  <textarea
                    value={currentPayloadStr}
                    onChange={(e) => {
                      const val = e.target.value;
                      setEditedPayloads(prev => ({ ...prev, [ep.id]: val }));
                    }}
                    rows={6}
                    className="w-full bg-slate-950 border border-blue-500/40 rounded-lg p-3 text-xs font-mono text-emerald-300 focus:outline-none focus:border-blue-400"
                  />

                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => {
                        try {
                          const parsed = JSON.parse(currentPayloadStr);
                          runSingleEndpoint(ep, parsed);
                          setEditingCardId(null);
                        } catch (err: any) {
                          alert('Invalid JSON in editor: ' + err.message);
                        }
                      }}
                      className="flex items-center gap-1.5 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-sm"
                    >
                      <Play className="w-3 h-3 fill-current" />
                      Save & Get New Response
                    </button>
                  </div>
                </div>
              )}

              {/* Collapsible Inspector for Request & Response */}
              {isExpanded && !isEditing && (
                <div className="border-t border-slate-800/80 p-4 bg-slate-950/60 grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* Left: Request */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                        Request Payload sent to API
                      </span>
                      <button
                        onClick={() => copyToClipboard(ep.id + '_req', JSON.stringify(result?.requestPayload || ep.sampleBody || ep.sampleParams, null, 2))}
                        className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-slate-200 transition cursor-pointer"
                      >
                        {copiedId === ep.id + '_req' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>Copy</span>
                      </button>
                    </div>

                    <pre className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs text-slate-300 font-mono overflow-x-auto leading-relaxed max-h-56">
                      {JSON.stringify(result?.requestPayload || ep.sampleBody || ep.sampleParams || {}, null, 2)}
                    </pre>
                  </div>

                  {/* Right: Response */}
                  <div className="space-y-2">
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-semibold text-slate-400 uppercase tracking-wider text-[10px]">
                        {result ? 'Live Execution Response Received' : 'Sample Response Payload'}
                      </span>
                      <button
                        onClick={() => copyToClipboard(ep.id + '_res', JSON.stringify(result?.responseData || ep.sampleResponse, null, 2))}
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

      {/* Unified Response Modal (Collect Entire Unified Response as One Response) */}
      {showUnifiedModal && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 md:p-8 animate-in fade-in">
          <div className="bg-slate-900 border border-slate-700 rounded-2xl max-w-4xl w-full max-h-[90vh] flex flex-col shadow-2xl overflow-hidden">
            
            {/* Modal Header */}
            <div className="p-5 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <Code2 className="w-5 h-5 text-emerald-400" />
                <div>
                  <h3 className="font-bold text-sm text-white">Unified Master Response (All Endpoints Combined)</h3>
                  <p className="text-xs text-slate-400">Collected responses from {executedCount} executed endpoints as a single aggregated JSON payload</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => copyToClipboard('unified-master', getUnifiedResponseJson())}
                  className="flex items-center gap-1.5 px-3.5 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-sm"
                >
                  {copiedId === 'unified-master' ? <Check className="w-4 h-4 text-white" /> : <Copy className="w-4 h-4" />}
                  <span>{copiedId === 'unified-master' ? 'Copied Entire Response!' : 'Copy Entire Master Response'}</span>
                </button>
                <button
                  onClick={() => setShowUnifiedModal(false)}
                  className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 cursor-pointer"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Modal Body: Master JSON */}
            <div className="flex-1 p-5 overflow-auto bg-slate-950">
              <pre className="text-xs font-mono text-emerald-300 leading-relaxed whitespace-pre-wrap">
                {getUnifiedResponseJson()}
              </pre>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-950 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
              <span>Total Endpoints Included: <strong className="text-white font-mono">{executedCount}</strong></span>
              <button
                onClick={() => setShowUnifiedModal(false)}
                className="px-4 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg font-medium cursor-pointer"
              >
                Close
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
