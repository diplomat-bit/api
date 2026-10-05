import React, { useState, useEffect } from 'react';
import { Download, Upload, Check, AlertCircle, FileCode, Copy, RefreshCw } from 'lucide-react';
import { WorkbenchCatalog, ValidationIssue } from '../types/catalog';
import { validateCatalog } from '../services/catalogEngine';

interface JsonEditorProps {
  catalog: WorkbenchCatalog;
  onUpdateCatalog: (newCatalog: WorkbenchCatalog) => void;
  onExport: () => void;
  onImportClick: () => void;
}

export const JsonEditor: React.FC<JsonEditorProps> = ({
  catalog,
  onUpdateCatalog,
  onExport,
  onImportClick
}) => {
  const [jsonText, setJsonText] = useState('');
  const [issues, setIssues] = useState<ValidationIssue[]>([]);
  const [isSaved, setIsSaved] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const formatted = JSON.stringify(catalog, null, 2);
    setJsonText(formatted);
    setIssues(validateCatalog(catalog));
  }, [catalog]);

  const handleFormat = () => {
    try {
      const parsed = JSON.parse(jsonText);
      setJsonText(JSON.stringify(parsed, null, 2));
      setIssues(validateCatalog(parsed));
    } catch (err: any) {
      setIssues([{ type: 'error', path: 'syntax', message: err.message }]);
    }
  };

  const handleApply = () => {
    try {
      const parsed = JSON.parse(jsonText);
      const validation = validateCatalog(parsed);
      setIssues(validation);

      const hasFatalErrors = validation.some((v) => v.type === 'error');
      if (!hasFatalErrors) {
        onUpdateCatalog(parsed);
        setIsSaved(true);
        setTimeout(() => setIsSaved(false), 2500);
      }
    } catch (err: any) {
      setIssues([{ type: 'error', path: 'syntax', message: err.message }]);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(jsonText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const errorCount = issues.filter((i) => i.type === 'error').length;
  const warningCount = issues.filter((i) => i.type === 'warning').length;

  return (
    <div className="flex-1 flex flex-col h-full bg-neutral-950 overflow-hidden select-none">
      {/* Action Bar */}
      <div className="h-12 border-b border-neutral-800 bg-neutral-900/60 px-6 flex items-center justify-between shrink-0">
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2">
            <FileCode className="w-4 h-4 text-blue-400" />
            <span className="text-xs font-semibold text-neutral-100">
              workbench-catalog.json Editor
            </span>
          </div>

          <div className="flex items-center gap-2 text-[11px] text-neutral-400 font-mono">
            {errorCount > 0 ? (
              <span className="text-rose-400 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {errorCount} errors
              </span>
            ) : (
              <span className="text-emerald-400 flex items-center gap-1">
                <Check className="w-3 h-3" />
                Valid Schema
              </span>
            )}
            {warningCount > 0 && (
              <span className="text-amber-400">· {warningCount} warnings</span>
            )}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={handleCopy}
            className="px-2.5 py-1 text-xs text-neutral-400 hover:text-white bg-neutral-900 border border-neutral-800 rounded transition-colors flex items-center gap-1"
          >
            {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
            <span>{copied ? 'Copied' : 'Copy'}</span>
          </button>

          <button
            onClick={handleFormat}
            className="px-2.5 py-1 text-xs text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded transition-colors"
          >
            Format
          </button>

          <button
            onClick={onImportClick}
            className="px-2.5 py-1 text-xs text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded transition-colors flex items-center gap-1"
          >
            <Upload className="w-3 h-3" />
            <span>Upload</span>
          </button>

          <button
            onClick={onExport}
            className="px-2.5 py-1 text-xs text-neutral-300 hover:text-white bg-neutral-900 border border-neutral-800 rounded transition-colors flex items-center gap-1"
          >
            <Download className="w-3 h-3" />
            <span>Download</span>
          </button>

          <button
            onClick={handleApply}
            className="px-3.5 py-1 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-500 rounded shadow-sm transition-all flex items-center gap-1"
          >
            {isSaved ? <Check className="w-3.5 h-3.5" /> : null}
            <span>{isSaved ? 'Applied!' : 'Apply to Runner'}</span>
          </button>
        </div>
      </div>

      {/* Editor Body & Validation Panel */}
      <div className="flex-1 flex flex-col lg:flex-row overflow-hidden divide-y lg:divide-y-0 lg:divide-x divide-neutral-800">
        {/* Code Editor */}
        <div className="flex-1 flex flex-col p-4 bg-neutral-950 overflow-hidden">
          <textarea
            value={jsonText}
            onChange={(e) => {
              setJsonText(e.target.value);
              try {
                const parsed = JSON.parse(e.target.value);
                setIssues(validateCatalog(parsed));
              } catch (err: any) {
                setIssues([{ type: 'error', path: 'syntax', message: err.message }]);
              }
            }}
            spellCheck={false}
            className="flex-1 w-full bg-neutral-900/60 border border-neutral-800 rounded-lg p-4 font-mono text-xs text-neutral-200 leading-relaxed focus:outline-none focus:border-blue-500/60 resize-none selection:bg-blue-600"
          />
        </div>

        {/* Validation Issues & Metadata Inspector */}
        <div className="w-full lg:w-80 flex flex-col bg-neutral-900/40 overflow-y-auto p-4 shrink-0 space-y-4">
          <div>
            <h3 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider mb-2">
              Catalog Metadata
            </h3>
            <div className="space-y-1.5 text-xs">
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-500">ID:</span>
                <span className="font-mono text-neutral-300">{catalog.id}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-500">Version:</span>
                <span className="font-mono text-neutral-300">{catalog.version}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-500">Total Items:</span>
                <span className="font-mono text-neutral-300">{catalog.items.length}</span>
              </div>
              <div className="flex justify-between py-1 border-b border-neutral-800">
                <span className="text-neutral-500">Author:</span>
                <span className="text-neutral-300">{catalog.author || 'Unspecified'}</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xs font-semibold text-neutral-200 uppercase tracking-wider mb-2">
              Validation Diagnostics
            </h3>
            {issues.length === 0 ? (
              <div className="p-3 rounded bg-emerald-950/30 border border-emerald-900/50 text-emerald-400 text-xs flex items-center gap-2">
                <Check className="w-4 h-4 shrink-0" />
                <span>Catalog is 100% compliant with Workbench specification.</span>
              </div>
            ) : (
              <div className="space-y-2">
                {issues.map((issue, idx) => (
                  <div
                    key={idx}
                    className={`p-2.5 rounded text-xs border ${
                      issue.type === 'error'
                        ? 'bg-rose-950/30 border-rose-900/50 text-rose-300'
                        : 'bg-amber-950/30 border-amber-900/50 text-amber-300'
                    }`}
                  >
                    <div className="font-mono text-[10px] uppercase font-bold tracking-wider">
                      [{issue.type}] {issue.path}
                    </div>
                    <div className="mt-0.5 text-[11px]">{issue.message}</div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
