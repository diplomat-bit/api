import React from 'react';
import { Play, CheckCircle2, AlertCircle, Clock, Download, RefreshCw, Layers } from 'lucide-react';
import { WorkbenchCatalog, ExecutionResult } from '../types/catalog';

interface BatchSuiteProps {
  catalog: WorkbenchCatalog;
  results: Record<string, ExecutionResult>;
  isBatchRunning: boolean;
  onRunBatch: () => void;
  onSelectItem: (id: string) => void;
}

export const BatchSuite: React.FC<BatchSuiteProps> = ({
  catalog,
  results,
  isBatchRunning,
  onRunBatch,
  onSelectItem
}) => {
  const totalItems = catalog.items.length;
  const completedCount = Object.keys(results).length;
  const successCount = Object.values(results).filter((r) => r.status === 'SUCCESS').length;
  const errorCount = Object.values(results).filter((r) => r.status === 'ERROR').length;
  const progressPct = totalItems > 0 ? Math.round((completedCount / totalItems) * 100) : 0;

  const totalDuration = Object.values(results).reduce((acc, r) => acc + (r.durationMs || 0), 0);
  const avgLatency = completedCount > 0 ? Math.round(totalDuration / completedCount) : 0;

  const exportReport = () => {
    const report = {
      catalogId: catalog.id,
      catalogName: catalog.name,
      timestamp: new Date().toISOString(),
      summary: {
        total: totalItems,
        completed: completedCount,
        passed: successCount,
        failed: errorCount,
        totalDurationMs: totalDuration,
        avgLatencyMs: avgLatency
      },
      results
    };

    const blob = new Blob([JSON.stringify(report, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `workbench-run-results-${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-neutral-950 p-6 overflow-y-auto select-none">
      {/* Header Summary */}
      <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
        <div>
          <h2 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
            <Layers className="w-5 h-5 text-blue-500" />
            Catalog Batch Test Suite
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Execute all endpoints, transformation scripts, and analytical pipelines in {catalog.name}.
          </p>
        </div>

        <div className="flex items-center gap-3">
          {completedCount > 0 && (
            <button
              onClick={exportReport}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-neutral-900 hover:bg-neutral-800 border border-neutral-800 rounded-md text-xs text-neutral-200 transition-colors"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Export Run Report</span>
            </button>
          )}

          <button
            onClick={onRunBatch}
            disabled={isBatchRunning}
            className={`flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-md text-white shadow-sm transition-all ${
              isBatchRunning
                ? 'bg-blue-600/50 cursor-not-allowed'
                : 'bg-blue-600 hover:bg-blue-500 active:scale-[0.98]'
            }`}
          >
            {isBatchRunning ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <Play className="w-4 h-4 fill-current" />
            )}
            <span>{isBatchRunning ? 'Executing Catalog Suite...' : 'Execute Entire Catalog'}</span>
          </button>
        </div>
      </div>

      {/* Progress & Metrics Strip */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 my-6">
        <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800">
          <div className="text-[11px] text-neutral-500 uppercase font-sans">Coverage</div>
          <div className="text-xl font-bold font-mono text-neutral-100 tabular-nums mt-1">
            {completedCount} / {totalItems}
            <span className="text-xs text-neutral-500 font-sans ml-2">({progressPct}%)</span>
          </div>
          <div className="w-full bg-neutral-800 h-1.5 rounded-full overflow-hidden mt-3">
            <div
              style={{ width: `${progressPct}%` }}
              className="bg-blue-500 h-full rounded-full transition-all duration-300"
            />
          </div>
        </div>

        <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800">
          <div className="text-[11px] text-neutral-500 uppercase font-sans">Passed Tasks</div>
          <div className="text-xl font-bold font-mono text-emerald-400 tabular-nums mt-1 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>{successCount}</span>
          </div>
          <div className="text-[11px] text-neutral-500 mt-2 font-mono">
            Nominal execution
          </div>
        </div>

        <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800">
          <div className="text-[11px] text-neutral-500 uppercase font-sans">Failed Tasks</div>
          <div className="text-xl font-bold font-mono text-rose-400 tabular-nums mt-1 flex items-center gap-2">
            <AlertCircle className="w-5 h-5" />
            <span>{errorCount}</span>
          </div>
          <div className="text-[11px] text-neutral-500 mt-2 font-mono">
            {errorCount === 0 ? 'Zero failures' : 'Requires inspection'}
          </div>
        </div>

        <div className="p-4 rounded-lg bg-neutral-900/60 border border-neutral-800">
          <div className="text-[11px] text-neutral-500 uppercase font-sans">Execution Timing</div>
          <div className="text-xl font-bold font-mono text-neutral-100 tabular-nums mt-1 flex items-center gap-2">
            <Clock className="w-5 h-5 text-neutral-400" />
            <span>{totalDuration} ms</span>
          </div>
          <div className="text-[11px] text-neutral-500 mt-2 font-mono tabular-nums">
            Mean latency: {avgLatency} ms
          </div>
        </div>
      </div>

      {/* Task Execution Matrix */}
      <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-800 bg-neutral-900/80 flex items-center justify-between text-xs font-semibold text-neutral-300">
          <span>Catalog Task Matrix ({catalog.items.length})</span>
          <span className="text-neutral-500 font-normal">Click any task to inspect details</span>
        </div>

        <div className="divide-y divide-neutral-900">
          {catalog.items.map((item, idx) => {
            const res = results[item.id];
            const isSuccess = res?.status === 'SUCCESS';
            const isError = res?.status === 'ERROR';
            const isRunning = res?.status === 'RUNNING';

            return (
              <div
                key={item.id}
                onClick={() => onSelectItem(item.id)}
                className="p-3.5 hover:bg-neutral-900/80 transition-colors flex items-center justify-between cursor-pointer group"
              >
                <div className="flex items-center gap-3 min-w-0 flex-1 pr-4">
                  <div className="w-6 text-center text-xs font-mono text-neutral-600">
                    {idx + 1}
                  </div>

                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-medium text-neutral-200 group-hover:text-blue-400 transition-colors truncate">
                        {item.name}
                      </span>
                      <span className="text-[10px] text-neutral-500 font-mono">
                        {item.id}
                      </span>
                    </div>
                    <div className="text-[11px] text-neutral-400 flex items-center gap-2 mt-0.5">
                      <span>{item.category}</span>
                      <span aria-hidden="true">·</span>
                      <span className="capitalize">{item.type.replace('_', ' ')}</span>
                      {res?.error && (
                        <>
                          <span aria-hidden="true">·</span>
                          <span className="text-rose-400 font-mono text-[10px] truncate max-w-md">
                            {res.error}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Status Column */}
                <div className="flex items-center gap-4 shrink-0 font-mono text-xs">
                  {res?.durationMs !== undefined && (
                    <span className="text-neutral-400 tabular-nums">
                      {res.durationMs}ms
                    </span>
                  )}

                  {isSuccess && (
                    <span className="flex items-center gap-1.5 text-emerald-400 text-xs">
                      <CheckCircle2 className="w-4 h-4" />
                      <span>PASS</span>
                    </span>
                  )}

                  {isError && (
                    <span className="flex items-center gap-1.5 text-rose-400 text-xs">
                      <AlertCircle className="w-4 h-4" />
                      <span>FAIL</span>
                    </span>
                  )}

                  {isRunning && (
                    <span className="flex items-center gap-1.5 text-blue-400 text-xs">
                      <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                      <span>RUNNING</span>
                    </span>
                  )}

                  {!res && (
                    <span className="text-neutral-600 text-xs">PENDING</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
