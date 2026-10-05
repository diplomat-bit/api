import React, { useState } from 'react';
import { X, Upload, FileText, Check, AlertCircle } from 'lucide-react';
import { WorkbenchCatalog } from '../types/catalog';
import { validateCatalog } from '../services/catalogEngine';

interface ImportModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoadCatalog: (catalog: WorkbenchCatalog) => void;
}

export const ImportModal: React.FC<ImportModalProps> = ({
  isOpen,
  onClose,
  onLoadCatalog
}) => {
  const [pasteText, setPasteText] = useState('');
  const [error, setError] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      try {
        const content = event.target?.result as string;
        const parsed = JSON.parse(content);
        const issues = validateCatalog(parsed);
        const fatal = issues.find((i) => i.type === 'error');
        if (fatal) {
          setError(`Invalid catalog format: ${fatal.message} at ${fatal.path}`);
          return;
        }
        onLoadCatalog(parsed);
        onClose();
      } catch (err: any) {
        setError(`JSON parsing failed: ${err.message}`);
      }
    };
    reader.readAsText(file);
  };

  const handleApplyPasted = () => {
    try {
      if (!pasteText.trim()) {
        setError('Please paste JSON content.');
        return;
      }
      const parsed = JSON.parse(pasteText);
      const issues = validateCatalog(parsed);
      const fatal = issues.find((i) => i.type === 'error');
      if (fatal) {
        setError(`Invalid catalog format: ${fatal.message} at ${fatal.path}`);
        return;
      }
      onLoadCatalog(parsed);
      onClose();
    } catch (err: any) {
      setError(`JSON parsing failed: ${err.message}`);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-xl w-full max-w-lg overflow-hidden shadow-2xl flex flex-col">
        {/* Modal Header */}
        <div className="px-5 py-4 border-b border-neutral-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Upload className="w-4 h-4 text-blue-400" />
            <span className="text-sm font-semibold text-neutral-100">
              Load workbench-catalog.json
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-neutral-500 hover:text-neutral-300 p-1 rounded"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-5 space-y-4">
          {/* File Picker Zone */}
          <div>
            <label className="text-xs text-neutral-400 block mb-2 font-medium">
              Option 1: Upload from local file (.json)
            </label>
            <label className="border-2 border-dashed border-neutral-800 hover:border-neutral-700 bg-neutral-950/60 rounded-lg p-6 flex flex-col items-center justify-center cursor-pointer transition-colors text-center group">
              <Upload className="w-6 h-6 text-neutral-500 group-hover:text-blue-400 transition-colors mb-2" />
              <span className="text-xs text-neutral-300 font-medium">
                Choose a workbench-catalog.json file
              </span>
              <span className="text-[11px] text-neutral-500 mt-0.5">
                or drag and drop it here
              </span>
              <input
                type="file"
                accept=".json"
                onChange={handleFileUpload}
                className="hidden"
              />
            </label>
          </div>

          <div className="relative flex items-center justify-center">
            <div className="border-t border-neutral-800 w-full" />
            <span className="bg-neutral-900 px-3 text-[11px] text-neutral-500 absolute font-medium uppercase">
              Or paste JSON
            </span>
          </div>

          {/* Paste JSON Zone */}
          <div>
            <label className="text-xs text-neutral-400 block mb-2 font-medium">
              Option 2: Raw workbench-catalog.json text
            </label>
            <textarea
              value={pasteText}
              onChange={(e) => {
                setPasteText(e.target.value);
                setError(null);
              }}
              placeholder='{ "id": "my-catalog", "name": "...", "items": [ ... ] }'
              className="w-full h-32 bg-neutral-950 border border-neutral-800 rounded-lg p-3 text-xs font-mono text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-blue-500/60 resize-none"
            />
          </div>

          {error && (
            <div className="p-3 bg-rose-950/40 border border-rose-900/60 rounded-md text-xs text-rose-300 flex items-start gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
              <span>{error}</span>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-5 py-3 border-t border-neutral-800 bg-neutral-950/60 flex items-center justify-end gap-2">
          <button
            onClick={onClose}
            className="px-3 py-1.5 text-xs text-neutral-400 hover:text-neutral-200 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={handleApplyPasted}
            disabled={!pasteText.trim()}
            className="px-4 py-1.5 text-xs font-semibold bg-blue-600 hover:bg-blue-500 disabled:opacity-40 text-white rounded-md transition-colors"
          >
            Load into Workbench
          </button>
        </div>
      </div>
    </div>
  );
};
