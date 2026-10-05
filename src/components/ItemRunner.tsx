import React, { useState, useEffect } from 'react';
import {
  Play,
  RotateCcw,
  Copy,
  Check,
  Code,
  FileText,
  Activity,
  Globe,
  Sliders,
  Terminal,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import {
  CatalogItem,
  HttpRequestItem,
  ScriptRunnerItem,
  DatasetItem,
  GeoLayerItem,
  ChartModelItem,
  WorkflowItem,
  ExecutionResult,
  WorkbenchCatalog
} from '../types/catalog';
import { DataGrid } from './DataGrid';
import { GeoVisualizer } from './GeoVisualizer';
import { ChartVisualizer } from './ChartVisualizer';
import { WorkflowVisualizer } from './WorkflowVisualizer';
import { resolveVariables } from '../services/catalogEngine';

interface ItemRunnerProps {
  item: CatalogItem;
  catalog: WorkbenchCatalog;
  variables: Record<string, string>;
  result?: ExecutionResult;
  onRun: (item: CatalogItem, customInputs?: any) => Promise<void>;
  isRunning: boolean;
  onExecutionComplete: (result: ExecutionResult) => void;
}

export const ItemRunner: React.FC<ItemRunnerProps> = ({
  item,
  catalog,
  variables,
  result,
  onRun,
  isRunning,
  onExecutionComplete
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'config' | 'body' | 'headers' | 'preview'>('config');
  const [outputTab, setOutputTab] = useState<'payload' | 'logs' | 'request'>('payload');
  const [copied, setCopied] = useState(false);

  // Local state for editable inputs
  const [editableCode, setEditableCode] = useState('');
  const [editableInputs, setEditableInputs] = useState('');
  const [editableBody, setEditableBody] = useState('');
  const [datasetQuery, setDatasetQuery] = useState('');

  // Sync state on item change
  useEffect(() => {
    if (item.type === 'script_runner') {
      setEditableCode(item.code || '');
      setEditableInputs(JSON.stringify(item.inputs || {}, null, 2));
    } else if (item.type === 'http_request') {
      setEditableBody(item.body || '');
    } else if (item.type === 'dataset') {
      setDatasetQuery(item.query || '');
    }
  }, [item]);

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleExecute = () => {
    if (item.type === 'script_runner') {
      try {
        const parsedInputs = editableInputs.trim() ? JSON.parse(editableInputs) : {};
        const modifiedItem: ScriptRunnerItem = {
          ...item,
          code: editableCode,
          inputs: parsedInputs
        };
        onRun(modifiedItem, parsedInputs);
      } catch (err: any) {
        alert('Invalid JSON in inputs: ' + err.message);
      }
    } else if (item.type === 'http_request') {
      const modifiedItem: HttpRequestItem = {
        ...item,
        body: editableBody
      };
      onRun(modifiedItem);
    } else if (item.type === 'dataset') {
      const modifiedItem: DatasetItem = {
        ...item,
        query: datasetQuery
      };
      onRun(modifiedItem);
    } else {
      onRun(item);
    }
  };

  const resolvedUrl = item.type === 'http_request'
    ? resolveVariables(item.url, variables)
    : '';

  return (
    <div className="flex-1 flex flex-col h-full bg-neutral-950 overflow-hidden select-none">
      {/* Top Breadcrumb Bar */}
      <div className="h-12 border-b border-neutral-800 px-6 flex items-center justify-between shrink-0 bg-neutral-900/50">
        <div className="flex items-center gap-2 text-xs text-neutral-400">
          <span>Catalog</span>
          <ChevronRight className="w-3 h-3 text-neutral-600" />
          <span className="text-neutral-300">{item.category}</span>
          <ChevronRight className="w-3 h-3 text-neutral-600" />
          <span className="text-neutral-100 font-medium">{item.name}</span>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleExecute}
            disabled={isRunning}
            className={`px-3 py-1.5 text-xs font-medium rounded-md flex items-center gap-1.5 text-white shadow-sm transition-all ${
              isRunning
                ? 'bg-blue-600/50 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 active:scale-[0.98]'
            }`}
          >
            <Play className={`w-3.5 h-3.5 fill-current ${isRunning ? 'animate-spin' : ''}`} />
            <span>{isRunning ? 'Executing...' : 'Run Task'}</span>
          </button>
        </div>
      </div>

      {/* Main Split Body */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">
        {/* Left / Top Panel: Item Parameters & Execution Builder */}
        <div className="flex-1 flex flex-col min-w-0 bg-neutral-950 overflow-hidden">
          {/* Item Meta Description */}
          <div className="p-4 border-b border-neutral-800 bg-neutral-900/30">
            <div className="flex items-center gap-3">
              <span className="text-base font-semibold text-neutral-100">{item.name}</span>
              <span className="text-xs text-neutral-500 font-mono">[{item.id}]</span>
            </div>
            <p className="text-xs text-neutral-400 mt-1">{item.description}</p>
          </div>

          {/* HTTP Request Specific Viewer/Editor */}
          {item.type === 'http_request' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              {/* URL Address Bar */}
              <div className="p-3 border-b border-neutral-800 bg-neutral-900/60 flex items-center gap-2">
                <span className="px-2 py-1 rounded bg-neutral-800 text-sky-400 font-mono font-bold text-xs">
                  {item.method}
                </span>
                <div className="flex-1 bg-neutral-950 border border-neutral-800 rounded px-3 py-1 text-xs font-mono text-neutral-200 truncate">
                  {resolvedUrl}
                </div>
              </div>

              {/* Subtabs: Headers, Body, Params */}
              <div className="flex items-center gap-1 px-4 pt-2 border-b border-neutral-800 bg-neutral-900/40">
                <button
                  onClick={() => setActiveSubTab('config')}
                  className={`px-3 py-1.5 text-xs font-medium border-b-2 transition-colors ${
                    activeSubTab === 'config'
                      ? 'border-blue-500 text-white'
                      : 'border-transparent text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Query Params ({Object.keys(item.params || {}).length})
                </button>
                <button
                  onClick={() => setActiveSubTab('headers')}
                  className={`px-3 py-1.5 text-xs font-medium border-b-2 transition-colors ${
                    activeSubTab === 'headers'
                      ? 'border-blue-500 text-white'
                      : 'border-transparent text-neutral-400 hover:text-neutral-200'
                  }`}
                >
                  Headers ({Object.keys(item.headers || {}).length})
                </button>
                {['POST', 'PUT', 'PATCH'].includes(item.method) && (
                  <button
                    onClick={() => setActiveSubTab('body')}
                    className={`px-3 py-1.5 text-xs font-medium border-b-2 transition-colors ${
                      activeSubTab === 'body'
                        ? 'border-blue-500 text-white'
                        : 'border-transparent text-neutral-400 hover:text-neutral-200'
                    }`}
                  >
                    Payload Body
                  </button>
                )}
              </div>

              {/* Tab Contents */}
              <div className="flex-1 p-4 overflow-y-auto">
                {activeSubTab === 'config' && (
                  <div className="space-y-2">
                    <div className="text-[11px] text-neutral-500 font-sans">
                      Resolved Query Parameters:
                    </div>
                    {item.params && Object.keys(item.params).length > 0 ? (
                      <table className="w-full text-xs font-mono border-collapse">
                        <thead>
                          <tr className="border-b border-neutral-800 text-neutral-500 text-left">
                            <th className="py-1 px-2 font-normal">Key</th>
                            <th className="py-1 px-2 font-normal">Value</th>
                            <th className="py-1 px-2 font-normal">Resolved</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-900">
                          {Object.entries(item.params).map(([k, v]) => (
                            <tr key={k} className="hover:bg-neutral-900/40">
                              <td className="py-1.5 px-2 text-neutral-300">{k}</td>
                              <td className="py-1.5 px-2 text-neutral-500">{v}</td>
                              <td className="py-1.5 px-2 text-emerald-400">
                                {resolveVariables(v, variables)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-xs text-neutral-500 py-4">No query parameters defined.</div>
                    )}
                  </div>
                )}

                {activeSubTab === 'headers' && (
                  <div className="space-y-2">
                    <div className="text-[11px] text-neutral-500 font-sans">
                      Request Headers:
                    </div>
                    {item.headers && Object.keys(item.headers).length > 0 ? (
                      <table className="w-full text-xs font-mono border-collapse">
                        <thead>
                          <tr className="border-b border-neutral-800 text-neutral-500 text-left">
                            <th className="py-1 px-2 font-normal">Header Name</th>
                            <th className="py-1 px-2 font-normal">Template</th>
                            <th className="py-1 px-2 font-normal">Resolved Value</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-neutral-900">
                          {Object.entries(item.headers).map(([k, v]) => (
                            <tr key={k} className="hover:bg-neutral-900/40">
                              <td className="py-1.5 px-2 text-neutral-300">{k}</td>
                              <td className="py-1.5 px-2 text-neutral-500">{v}</td>
                              <td className="py-1.5 px-2 text-blue-400">
                                {resolveVariables(v, variables)}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    ) : (
                      <div className="text-xs text-neutral-500 py-4">No headers configured.</div>
                    )}
                  </div>
                )}

                {activeSubTab === 'body' && (
                  <div className="h-full flex flex-col space-y-2">
                    <div className="text-[11px] text-neutral-500 flex items-center justify-between">
                      <span>Request Payload (JSON):</span>
                      <button
                        onClick={() => {
                          try {
                            setEditableBody(JSON.stringify(JSON.parse(editableBody), null, 2));
                          } catch (_) {}
                        }}
                        className="text-xs text-blue-400 hover:text-blue-300"
                      >
                        Format JSON
                      </button>
                    </div>
                    <textarea
                      value={editableBody}
                      onChange={(e) => setEditableBody(e.target.value)}
                      className="flex-1 w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-xs font-mono text-neutral-200 focus:outline-none focus:border-blue-500/60 resize-none min-h-[200px]"
                    />
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Script Runner Specific Viewer/Editor */}
          {item.type === 'script_runner' && (
            <div className="flex-1 flex flex-col overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800 bg-neutral-900/40">
                <span className="text-xs text-neutral-400 font-mono">
                  Runtime: {item.language} (Isolated Browser Sandbox)
                </span>
                <span className="text-[11px] text-neutral-500">
                  Signature: (inputs, console, env) =&gt; any
                </span>
              </div>

              <div className="flex-1 p-4 grid grid-rows-2 gap-3 overflow-hidden">
                {/* Code editor */}
                <div className="flex flex-col overflow-hidden">
                  <div className="text-[11px] text-neutral-500 mb-1 flex items-center justify-between">
                    <span>Executable Function Code:</span>
                  </div>
                  <textarea
                    value={editableCode}
                    onChange={(e) => setEditableCode(e.target.value)}
                    className="flex-1 w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-xs font-mono text-neutral-200 focus:outline-none focus:border-blue-500/60 resize-none"
                  />
                </div>

                {/* Inputs editor */}
                <div className="flex flex-col overflow-hidden">
                  <div className="text-[11px] text-neutral-500 mb-1 flex items-center justify-between">
                    <span>Input Arguments (JSON):</span>
                    <button
                      onClick={() => {
                        try {
                          setEditableInputs(JSON.stringify(JSON.parse(editableInputs), null, 2));
                        } catch (_) {}
                      }}
                      className="text-xs text-blue-400 hover:text-blue-300"
                    >
                      Format Inputs
                    </button>
                  </div>
                  <textarea
                    value={editableInputs}
                    onChange={(e) => setEditableInputs(e.target.value)}
                    className="flex-1 w-full bg-neutral-950 border border-neutral-800 rounded-md p-3 text-xs font-mono text-neutral-200 focus:outline-none focus:border-blue-500/60 resize-none"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Dataset Interactive Viewer */}
          {item.type === 'dataset' && (
            <div className="flex-1 p-4 overflow-hidden">
              <DataGrid
                columns={item.columns}
                records={item.records}
                initialQuery={datasetQuery}
                onFilterChange={setDatasetQuery}
              />
            </div>
          )}

          {/* Geospatial Map Visualizer */}
          {item.type === 'geo_layer' && (
            <div className="flex-1 p-4 overflow-hidden">
              <GeoVisualizer
                points={item.points}
                title={item.name}
                description={item.description}
              />
            </div>
          )}

          {/* Chart Model Visualizer */}
          {item.type === 'chart_model' && (
            <div className="flex-1 p-4 overflow-hidden">
              <ChartVisualizer
                series={item.series}
                chartType={item.chartType}
                title={item.name}
                description={item.description}
              />
            </div>
          )}

          {/* Workflow Pipeline Visualizer */}
          {item.type === 'workflow' && (
            <div className="flex-1 p-4 overflow-hidden">
              <WorkflowVisualizer
                item={item}
                catalog={catalog}
                variables={variables}
                onExecutionComplete={onExecutionComplete}
              />
            </div>
          )}
        </div>

        {/* Right / Bottom Panel: Live Execution Output & Inspection Console */}
        <div className="w-full lg:w-96 flex flex-col bg-neutral-950 overflow-hidden shrink-0">
          {/* Header of Inspector */}
          <div className="p-3 border-b border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Terminal className="w-4 h-4 text-neutral-400" />
              <span className="text-xs font-semibold text-neutral-200">Execution Output</span>
            </div>

            {/* Status indicator badge */}
            {result ? (
              <div className="flex items-center gap-2">
                <span
                  className={`text-[11px] font-mono font-medium ${
                    result.status === 'SUCCESS' ? 'text-emerald-400' : 'text-rose-400'
                  }`}
                >
                  {result.statusCode ? `${result.statusCode} ` : ''}
                  {result.status}
                </span>
                <span aria-hidden="true" className="text-neutral-600">·</span>
                <span className="text-[11px] font-mono tabular-nums text-neutral-400">
                  {result.durationMs}ms
                </span>
              </div>
            ) : (
              <span className="text-[11px] text-neutral-500 font-mono">IDLE</span>
            )}
          </div>

          {/* Output Selector Tabs */}
          <div className="flex items-center gap-1 px-3 py-1.5 border-b border-neutral-800 bg-neutral-900/30">
            <button
              onClick={() => setOutputTab('payload')}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                outputTab === 'payload'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Payload
            </button>
            <button
              onClick={() => setOutputTab('logs')}
              className={`px-2.5 py-1 text-xs rounded transition-colors ${
                outputTab === 'logs'
                  ? 'bg-neutral-800 text-white'
                  : 'text-neutral-400 hover:text-neutral-200'
              }`}
            >
              Logs ({result?.logs?.length || 0})
            </button>
            {result?.resolvedRequest && (
              <button
                onClick={() => setOutputTab('request')}
                className={`px-2.5 py-1 text-xs rounded transition-colors ${
                  outputTab === 'request'
                    ? 'bg-neutral-800 text-white'
                    : 'text-neutral-400 hover:text-neutral-200'
                }`}
              >
                Dispatched
              </button>
            )}
          </div>

          {/* Output Body Container */}
          <div className="flex-1 p-3 overflow-auto font-mono text-xs text-neutral-300">
            {outputTab === 'payload' && (
              <div>
                {result ? (
                  <div className="space-y-2">
                    <div className="flex justify-end">
                      <button
                        onClick={() =>
                          handleCopy(JSON.stringify(result.data || result.error, null, 2))
                        }
                        className="text-[11px] text-neutral-400 hover:text-white flex items-center gap-1"
                      >
                        {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                        <span>{copied ? 'Copied' : 'Copy'}</span>
                      </button>
                    </div>
                    <pre className="bg-neutral-900/80 p-3 rounded border border-neutral-800/80 overflow-x-auto text-[11px] leading-relaxed">
                      {JSON.stringify(result.data !== undefined ? result.data : { error: result.error }, null, 2)}
                    </pre>
                  </div>
                ) : (
                  <div className="h-48 flex items-center justify-center text-neutral-600 text-xs font-sans">
                    Click "Run Task" to execute and inspect the response.
                  </div>
                )}
              </div>
            )}

            {outputTab === 'logs' && (
              <div className="space-y-1">
                {result?.logs && result.logs.length > 0 ? (
                  result.logs.map((log, idx) => (
                    <div
                      key={idx}
                      className={`text-[11px] py-0.5 ${
                        log.includes('[Error]') || log.includes('[Runtime Exception]')
                          ? 'text-rose-400'
                          : log.includes('[Warn]')
                          ? 'text-amber-400'
                          : 'text-neutral-400'
                      }`}
                    >
                      {log}
                    </div>
                  ))
                ) : (
                  <div className="text-neutral-600 text-xs py-8 text-center font-sans">
                    No execution logs available.
                  </div>
                )}
              </div>
            )}

            {outputTab === 'request' && result?.resolvedRequest && (
              <div className="space-y-2">
                <div className="text-neutral-400 text-[11px]">URL Dispatched:</div>
                <div className="text-blue-400 text-xs break-all bg-neutral-900/60 p-2 rounded border border-neutral-800">
                  {result.resolvedRequest.url}
                </div>

                <div className="text-neutral-400 text-[11px] mt-3">Resolved Headers:</div>
                <pre className="bg-neutral-900/60 p-2 rounded border border-neutral-800 text-[11px]">
                  {JSON.stringify(result.resolvedRequest.headers, null, 2)}
                </pre>

                {result.resolvedRequest.body && (
                  <>
                    <div className="text-neutral-400 text-[11px] mt-3">Body Dispatched:</div>
                    <pre className="bg-neutral-900/60 p-2 rounded border border-neutral-800 text-[11px]">
                      {result.resolvedRequest.body}
                    </pre>
                  </>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
