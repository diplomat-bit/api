import React, { useState } from 'react';
import { WorkflowItem, WorkbenchCatalog, ExecutionResult } from '../types/catalog';
import { Play, CheckCircle2, AlertCircle, ArrowRight, Clock, RefreshCw } from 'lucide-react';
import { executeWorkflow, executeCatalogItem } from '../services/catalogEngine';

interface WorkflowVisualizerProps {
  item: WorkflowItem;
  catalog: WorkbenchCatalog;
  variables: Record<string, string>;
  onExecutionComplete: (result: ExecutionResult) => void;
}

export const WorkflowVisualizer: React.FC<WorkflowVisualizerProps> = ({
  item,
  catalog,
  variables,
  onExecutionComplete
}) => {
  const [isRunning, setIsRunning] = useState(false);
  const [activeStep, setActiveStep] = useState<number | null>(null);
  const [stepStatuses, setStepStatuses] = useState<Record<number, { status: string; duration?: number; error?: string }>>({});
  const [expandedStep, setExpandedStep] = useState<number | null>(null);

  const handleRunPipeline = async () => {
    setIsRunning(true);
    setStepStatuses({});

    const initialStatuses: Record<number, { status: string }> = {};
    item.steps.forEach((s) => (initialStatuses[s.step] = { status: 'PENDING' }));
    setStepStatuses(initialStatuses);

    const result = await executeWorkflow(item, catalog, variables, (stepNum, stepResult) => {
      setActiveStep(stepNum);
      setStepStatuses((prev) => ({
        ...prev,
        [stepNum]: {
          status: stepResult.status,
          duration: stepResult.durationMs,
          error: stepResult.error
        }
      }));
    });

    setIsRunning(false);
    setActiveStep(null);
    onExecutionComplete(result);
  };

  const handleRunSingleStep = async (stepNumber: number, targetId: string) => {
    const targetItem = catalog.items.find((i) => i.id === targetId);
    if (!targetItem) return;

    setActiveStep(stepNumber);
    setStepStatuses((prev) => ({
      ...prev,
      [stepNumber]: { status: 'RUNNING' }
    }));

    const result = await executeCatalogItem(targetItem, catalog, variables);

    setStepStatuses((prev) => ({
      ...prev,
      [stepNumber]: {
        status: result.status,
        duration: result.durationMs,
        error: result.error
      }
    }));
    setActiveStep(null);
  };

  return (
    <div className="flex flex-col h-full bg-neutral-950 rounded-lg border border-neutral-800 overflow-hidden">
      {/* Top Banner */}
      <div className="p-4 border-b border-neutral-800 bg-neutral-900/60 flex items-center justify-between">
        <div>
          <h3 className="text-sm font-semibold text-neutral-100">{item.name}</h3>
          <p className="text-xs text-neutral-400 mt-0.5">{item.description}</p>
        </div>

        <button
          onClick={handleRunPipeline}
          disabled={isRunning}
          className={`flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium rounded-md text-white transition-all shadow-sm ${
            isRunning
              ? 'bg-blue-600/50 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-500 active:scale-[0.98]'
          }`}
        >
          {isRunning ? (
            <RefreshCw className="w-3.5 h-3.5 animate-spin" />
          ) : (
            <Play className="w-3.5 h-3.5 fill-current" />
          )}
          <span>{isRunning ? 'Running Sequence...' : 'Execute Entire Pipeline'}</span>
        </button>
      </div>

      {/* Step Sequence Container */}
      <div className="flex-1 p-6 overflow-y-auto space-y-4">
        {item.steps.map((s, idx) => {
          const target = catalog.items.find((i) => i.id === s.targetId);
          const state = stepStatuses[s.step] || { status: 'IDLE' };
          const isCurrentActive = activeStep === s.step;
          const isExpanded = expandedStep === s.step;

          return (
            <div key={s.step} className="relative">
              {/* Vertical connector line */}
              {idx < item.steps.length - 1 && (
                <div
                  className={`absolute left-4 top-10 bottom-0 w-0.5 -mb-4 transition-colors ${
                    state.status === 'SUCCESS' ? 'bg-emerald-500/60' : 'bg-neutral-800'
                  }`}
                />
              )}

              <div
                className={`p-3.5 rounded-lg border transition-all ${
                  isCurrentActive
                    ? 'border-blue-500/70 bg-blue-950/20 shadow-[0_0_12px_rgba(59,130,246,0.2)]'
                    : state.status === 'SUCCESS'
                    ? 'border-emerald-500/30 bg-neutral-900/40'
                    : state.status === 'ERROR'
                    ? 'border-rose-500/30 bg-rose-950/20'
                    : 'border-neutral-800 bg-neutral-900/20 hover:border-neutral-700'
                }`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Step Number or Status Icon */}
                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold shrink-0 transition-colors ${
                        state.status === 'SUCCESS'
                          ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40'
                          : state.status === 'ERROR'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
                          : isCurrentActive
                          ? 'bg-blue-500 text-white animate-pulse'
                          : 'bg-neutral-800 text-neutral-400 border border-neutral-700'
                      }`}
                    >
                      {state.status === 'SUCCESS' ? (
                        <CheckCircle2 className="w-4 h-4" />
                      ) : state.status === 'ERROR' ? (
                        <AlertCircle className="w-4 h-4" />
                      ) : (
                        s.step
                      )}
                    </div>

                    <div>
                      <div className="text-xs font-semibold text-neutral-200">
                        {s.action}
                      </div>
                      <div className="text-[11px] text-neutral-400 flex items-center gap-1.5 mt-0.5">
                        <span className="font-mono text-neutral-500">Ref: {s.targetId}</span>
                        {target && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="capitalize">{target.type.replace('_', ' ')}</span>
                          </>
                        )}
                        {state.duration !== undefined && (
                          <>
                            <span aria-hidden="true">·</span>
                            <span className="font-mono text-neutral-400">
                              {state.duration}ms
                            </span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleRunSingleStep(s.step, s.targetId)}
                      disabled={isRunning}
                      className="px-2 py-1 text-[11px] bg-neutral-800 hover:bg-neutral-700 text-neutral-300 rounded border border-neutral-700 transition-colors flex items-center gap-1"
                    >
                      <Play className="w-2.5 h-2.5 fill-current" />
                      <span>Step Run</span>
                    </button>
                    <button
                      onClick={() => setExpandedStep(isExpanded ? null : s.step)}
                      className="px-2 py-1 text-[11px] text-neutral-400 hover:text-white transition-colors"
                    >
                      {isExpanded ? 'Hide' : 'Details'}
                    </button>
                  </div>
                </div>

                {/* Expanded Details */}
                {isExpanded && target && (
                  <div className="mt-3 pt-3 border-t border-neutral-800/80 text-xs space-y-2">
                    <div className="text-neutral-300">
                      <span className="text-neutral-500">Target Name:</span> {target.name}
                    </div>
                    <div className="text-neutral-400 text-[11px]">
                      {target.description}
                    </div>
                    {state.error && (
                      <div className="p-2 bg-rose-950/40 border border-rose-900/50 rounded text-rose-300 text-xs font-mono">
                        Error: {state.error}
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
