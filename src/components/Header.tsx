import React from 'react';
import { Play, Download, Upload, CheckCircle2, AlertCircle } from 'lucide-react';
import { WorkbenchCatalog } from '../types/catalog';

interface HeaderProps {
  catalog: WorkbenchCatalog;
  activeTab: 'workspace' | 'batch' | 'editor' | 'variables' | 'history';
  setActiveTab: (tab: 'workspace' | 'batch' | 'editor' | 'variables' | 'history') => void;
  selectedEnvironment: string;
  setSelectedEnvironment: (env: string) => void;
  onRunEntireCatalog: () => void;
  isBatchRunning: boolean;
  onExportCatalog: () => void;
  onImportClick: () => void;
  validationIssueCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  catalog,
  activeTab,
  setActiveTab,
  selectedEnvironment,
  setSelectedEnvironment,
  onRunEntireCatalog,
  isBatchRunning,
  onExportCatalog,
  onImportClick,
  validationIssueCount
}) => {
  const envKeys = Object.keys(catalog.environments || {});

  return (
    <header className="h-14 border-b border-neutral-800 bg-neutral-900/90 backdrop-blur-md px-6 flex items-center justify-between shrink-0 select-none z-30">
      {/* Zone 1: Single Wordmark */}
      <div className="flex items-center gap-3">
        <span className="text-base font-semibold tracking-tight text-white flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 inline-block shadow-[0_0_8px_rgba(59,130,246,0.6)]" />
          Workbench Catalog Runner
        </span>
      </div>

      {/* Zone 2: Navigation Links / Segmented View */}
      <nav className="flex items-center gap-1 bg-neutral-950/70 p-1 rounded-lg border border-neutral-800/80">
        <button
          onClick={() => setActiveTab('workspace')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            activeTab === 'workspace'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Catalog Runner
        </button>
        <button
          onClick={() => setActiveTab('batch')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            activeTab === 'batch'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Batch Suite
        </button>
        <button
          onClick={() => setActiveTab('editor')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap flex items-center gap-1.5 ${
            activeTab === 'editor'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Catalog JSON
          {validationIssueCount > 0 ? (
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
          ) : (
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          )}
        </button>
        <button
          onClick={() => setActiveTab('variables')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            activeTab === 'variables'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Variables
        </button>
        <button
          onClick={() => setActiveTab('history')}
          className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
            activeTab === 'history'
              ? 'bg-neutral-800 text-white shadow-sm'
              : 'text-neutral-400 hover:text-neutral-200'
          }`}
        >
          Audit History
        </button>
      </nav>

      {/* Zone 3: Primary Actions */}
      <div className="flex items-center gap-2.5">
        {/* Environment selector */}
        {envKeys.length > 0 && (
          <div className="flex items-center gap-1.5 bg-neutral-950/60 border border-neutral-800 rounded-md px-2.5 py-1 text-xs">
            <span className="text-neutral-400 text-[11px]">Env:</span>
            <select
              value={selectedEnvironment}
              onChange={(e) => setSelectedEnvironment(e.target.value)}
              className="bg-transparent text-neutral-200 text-xs font-medium focus:outline-none cursor-pointer"
            >
              {envKeys.map((env) => (
                <option key={env} value={env} className="bg-neutral-900 text-white">
                  {env}
                </option>
              ))}
            </select>
          </div>
        )}

        {/* Load / Import catalog button */}
        <button
          onClick={onImportClick}
          title="Import or upload workbench-catalog.json"
          className="p-1.5 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 bg-neutral-900 rounded-md transition-colors text-xs flex items-center gap-1 px-2.5"
        >
          <Upload className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Import</span>
        </button>

        {/* Export catalog button */}
        <button
          onClick={onExportCatalog}
          title="Export workbench-catalog.json"
          className="p-1.5 text-neutral-400 hover:text-white border border-neutral-800 hover:border-neutral-700 bg-neutral-900 rounded-md transition-colors text-xs flex items-center gap-1 px-2.5"
        >
          <Download className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Export</span>
        </button>

        {/* Primary Action Button: Run Suite */}
        <button
          onClick={onRunEntireCatalog}
          disabled={isBatchRunning}
          className={`px-3 py-1.5 text-xs font-medium rounded-md flex items-center gap-1.5 text-white transition-all shadow-sm ${
            isBatchRunning
              ? 'bg-blue-600/50 cursor-not-allowed'
              : 'bg-blue-600 hover:bg-blue-500 active:scale-[0.98]'
          }`}
        >
          <Play className={`w-3.5 h-3.5 fill-current ${isBatchRunning ? 'animate-spin' : ''}`} />
          <span>{isBatchRunning ? 'Running...' : 'Run All Tasks'}</span>
        </button>
      </div>
    </header>
  );
};
