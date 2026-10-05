import React, { useState } from 'react';
import { History, CheckCircle2, AlertCircle, Trash2, Download, Play, Search } from 'lucide-react';
import { ExecutionResult, WorkbenchCatalog } from '../types/catalog';

interface AuditLogsProps {
  history: ExecutionResult[];
  catalog: WorkbenchCatalog;
  onClearHistory: () => void;
  onSelectItem: (id: string) => void;
}

export const AuditLogs: React.FC<AuditLogsProps> = ({
  history,
  catalog,
  onClearHistory,
  onSelectItem
}) => {
  const [search, setSearch] = useState('');
  const [selectedEntry, setSelectedEntry] = useState<ExecutionResult | null>(history[0] || null);

  const getItemName = (id: string) => {
    const item = catalog.items.find((i) => i.id === id);
    return item ? item.name : id;
  };

  const filteredHistory = history.filter((entry) => {
    const name = getItemName(entry.itemId).toLowerCase();
    const id = entry.itemId.toLowerCase();
    const q = search.toLowerCase();
    return name.includes(q) || id.includes(q) || (entry.error && entry.error.toLowerCase().includes(q));
  });

  const exportHistory = () => {
    const blob = new Blob([JSON.stringify(history, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `workbench-audit-logs-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-neutral-950 p-6 overflow-hidden select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-neutral-800 shrink-0">
        <div>
          <h2 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
            <History className="w-5 h-5 text-blue-500" />
            Execution Audit History
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Chronological audit trail of all manual and batch catalog task runs.
          </p>
        </div>

        <div className="flex items-center gap-2">
          {history.length > 0 && (
            <>
              <button
                onClick={exportHistory}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-md text-xs text-neutral-300 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                <span>Export Logs</span>
              </button>
              <button
                onClick={onClearHistory}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-rose-950/40 border border-neutral-800 hover:border-rose-900/50 rounded-md text-xs text-neutral-400 hover:text-rose-300 transition-colors"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Clear</span>
              </button>
            </>
          )}
        </div>
      </div>

      {/* Main Container */}
      <div className="flex-1 flex flex-col lg:flex-row mt-6 overflow-hidden rounded-lg border border-neutral-800 divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">
        {/* Left List */}
        <div className="w-full lg:w-96 flex flex-col bg-neutral-900/40 overflow-hidden">
          <div className="p-3 border-b border-neutral-800">
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-neutral-500 absolute left-2.5 top-1/2 -translate-y-1/2 pointer-events-none" />
              <input
                type="text"
                placeholder="Search audit trail..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded pl-8 pr-3 py-1 text-xs text-neutral-200 placeholder:text-neutral-500 focus:outline-none focus:border-blue-500/60"
              />
            </div>
          </div>

          <div className="flex-1 overflow-y-auto divide-y divide-neutral-900">
            {filteredHistory.length === 0 ? (
              <div className="p-8 text-center text-xs text-neutral-500">
                No execution records found.
              </div>
            ) : (
              filteredHistory.map((entry, idx) => {
                const isSelected = selectedEntry === entry;
                const isSuccess = entry.status === 'SUCCESS';

                return (
                  <div
                    key={idx}
                    onClick={() => setSelectedEntry(entry)}
                    className={`p-3 cursor-pointer transition-colors ${
                      isSelected
                        ? 'bg-neutral-800/80 text-white'
                        : 'hover:bg-neutral-900/60 text-neutral-300'
                    }`}
                  >
                    <div className="flex items-center justify-between text-xs">
                      <span className="font-medium truncate flex-1 pr-2">
                        {getItemName(entry.itemId)}
                      </span>
                      <span className="font-mono text-[11px] tabular-nums text-neutral-400">
                        {entry.durationMs}ms
                      </span>
                    </div>

                    <div className="flex items-center justify-between text-[11px] text-neutral-500 mt-1">
                      <span className="font-mono text-[10px]">
                        {new Date(entry.timestamp).toLocaleTimeString()}
                      </span>
                      <span
                        className={`font-mono text-[10px] ${
                          isSuccess ? 'text-emerald-400' : 'text-rose-400'
                        }`}
                      >
                        {entry.statusCode ? `${entry.statusCode} ` : ''}
                        {entry.status}
                      </span>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Right Details Inspector */}
        <div className="flex-1 flex flex-col bg-neutral-950 p-4 overflow-y-auto font-mono text-xs">
          {selectedEntry ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between pb-3 border-b border-neutral-800 font-sans">
                <div>
                  <h3 className="text-sm font-semibold text-neutral-100">
                    {getItemName(selectedEntry.itemId)}
                  </h3>
                  <div className="text-xs text-neutral-500 font-mono mt-0.5">
                    Target ID: {selectedEntry.itemId} · Recorded at {selectedEntry.timestamp}
                  </div>
                </div>

                <button
                  onClick={() => onSelectItem(selectedEntry.itemId)}
                  className="px-2.5 py-1 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded text-xs text-neutral-200 transition-colors flex items-center gap-1"
                >
                  <Play className="w-3 h-3 fill-current" />
                  <span>Open in Runner</span>
                </button>
              </div>

              {/* Logs */}
              {selectedEntry.logs && selectedEntry.logs.length > 0 && (
                <div>
                  <div className="text-[11px] text-neutral-500 font-sans uppercase mb-1">
                    Trace Logs:
                  </div>
                  <div className="bg-neutral-900/60 p-3 rounded border border-neutral-800 text-[11px] space-y-1">
                    {selectedEntry.logs.map((log, lIdx) => (
                      <div key={lIdx} className="text-neutral-400">
                        {log}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Data / Error Output */}
              <div>
                <div className="text-[11px] text-neutral-500 font-sans uppercase mb-1">
                  Payload Snapshot:
                </div>
                <pre className="bg-neutral-900/80 p-3 rounded border border-neutral-800 text-[11px] text-neutral-300 overflow-x-auto leading-relaxed">
                  {JSON.stringify(
                    selectedEntry.data !== undefined
                      ? selectedEntry.data
                      : { error: selectedEntry.error },
                    null,
                    2
                  )}
                </pre>
              </div>
            </div>
          ) : (
            <div className="h-full flex items-center justify-center text-neutral-600 text-xs font-sans">
              Select an execution log from the list to inspect snapshot.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
