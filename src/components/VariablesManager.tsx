import React, { useState } from 'react';
import { Plus, Trash2, Check, RefreshCw, Key, Globe, Shield } from 'lucide-react';
import { WorkbenchCatalog } from '../types/catalog';

interface VariablesManagerProps {
  catalog: WorkbenchCatalog;
  selectedEnvironment: string;
  setSelectedEnvironment: (env: string) => void;
  onUpdateVariables: (env: string, vars: Record<string, string>) => void;
}

export const VariablesManager: React.FC<VariablesManagerProps> = ({
  catalog,
  selectedEnvironment,
  setSelectedEnvironment,
  onUpdateVariables
}) => {
  const currentEnvVars = catalog.environments[selectedEnvironment] || catalog.variables || {};
  const [localVars, setLocalVars] = useState<Record<string, string>>(currentEnvVars);
  const [newKey, setNewKey] = useState('');
  const [newVal, setNewVal] = useState('');
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    onUpdateVariables(selectedEnvironment, localVars);
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleAdd = () => {
    if (!newKey.trim()) return;
    setLocalVars((prev) => ({
      ...prev,
      [newKey.trim()]: newVal
    }));
    setNewKey('');
    setNewVal('');
  };

  const handleDelete = (key: string) => {
    const updated = { ...localVars };
    delete updated[key];
    setLocalVars(updated);
  };

  const handleUpdate = (key: string, value: string) => {
    setLocalVars((prev) => ({
      ...prev,
      [key]: value
    }));
  };

  return (
    <div className="flex-1 flex flex-col h-full bg-neutral-950 p-6 overflow-y-auto select-none">
      {/* Header */}
      <div className="flex items-center justify-between pb-6 border-b border-neutral-800">
        <div>
          <h2 className="text-lg font-bold text-neutral-100 flex items-center gap-2">
            <Key className="w-5 h-5 text-blue-500" />
            Environment & Variables Registry
          </h2>
          <p className="text-xs text-neutral-400 mt-1">
            Dynamic substitution variables resolved during API and script execution ({'{{variableName}}'}).
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-md text-xs font-semibold shadow-sm transition-all"
          >
            {saved ? <Check className="w-4 h-4" /> : null}
            <span>{saved ? 'Saved!' : 'Save Variables'}</span>
          </button>
        </div>
      </div>

      {/* Environment Selector Bar */}
      <div className="flex items-center gap-2 my-6">
        <span className="text-xs text-neutral-400 font-medium mr-2">Active Environment:</span>
        {Object.keys(catalog.environments || {}).map((env) => (
          <button
            key={env}
            onClick={() => {
              setSelectedEnvironment(env);
              setLocalVars(catalog.environments[env] || {});
            }}
            className={`px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              selectedEnvironment === env
                ? 'bg-neutral-800 text-white shadow-sm border border-neutral-700'
                : 'text-neutral-400 hover:text-neutral-200 bg-neutral-900/60'
            }`}
          >
            {env}
          </button>
        ))}
      </div>

      {/* Variables Table */}
      <div className="rounded-lg border border-neutral-800 bg-neutral-900/40 overflow-hidden">
        <div className="px-4 py-3 border-b border-neutral-800 bg-neutral-900/80 flex items-center justify-between text-xs font-semibold text-neutral-300">
          <span>Variable Key & Value Mapping ({Object.keys(localVars).length})</span>
          <span className="text-[11px] text-neutral-500 font-mono">Scope: {selectedEnvironment}</span>
        </div>

        <div className="divide-y divide-neutral-900">
          {Object.entries(localVars).map(([k, v]) => (
            <div key={k} className="p-3 flex items-center gap-3">
              <div className="w-1/3 flex items-center gap-2">
                <span className="text-blue-400 font-mono text-xs font-medium">
                  {`{{${k}}}`}
                </span>
              </div>
              <div className="flex-1">
                <input
                  type="text"
                  value={v}
                  onChange={(e) => handleUpdate(k, e.target.value)}
                  className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-1.5 text-xs font-mono text-neutral-200 focus:outline-none focus:border-blue-500/60"
                />
              </div>
              <button
                onClick={() => handleDelete(k)}
                className="p-1.5 text-neutral-500 hover:text-rose-400 transition-colors"
                title="Delete variable"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>
          ))}

          {/* Add New Variable Row */}
          <div className="p-3 bg-neutral-900/20 flex items-center gap-3">
            <div className="w-1/3">
              <input
                type="text"
                placeholder="New key (e.g. secretToken)"
                value={newKey}
                onChange={(e) => setNewKey(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-1.5 text-xs font-mono text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-blue-500/60"
              />
            </div>
            <div className="flex-1">
              <input
                type="text"
                placeholder="Value"
                value={newVal}
                onChange={(e) => setNewVal(e.target.value)}
                className="w-full bg-neutral-950 border border-neutral-800 rounded px-3 py-1.5 text-xs font-mono text-neutral-200 placeholder:text-neutral-600 focus:outline-none focus:border-blue-500/60"
              />
            </div>
            <button
              onClick={handleAdd}
              disabled={!newKey.trim()}
              className="px-3 py-1.5 text-xs bg-neutral-800 hover:bg-neutral-700 disabled:opacity-40 text-white rounded transition-colors flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
