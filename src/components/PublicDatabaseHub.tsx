import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { 
  Database, Server, Globe, Search, RefreshCw, Plus, Trash2, 
  Download, Upload, Copy, Check, ExternalLink, Play, Code2, 
  Terminal, Layers, ArrowUpDown, ChevronLeft, ChevronRight, 
  Sliders, Shield, Zap, Activity, CheckCircle2, AlertCircle, 
  FileText, CornerDownRight, Sparkles, Filter, X, Edit3
} from 'lucide-react';

interface CollectionStats {
  name: string;
  count: number;
  url: string;
}

interface DatabaseStats {
  totalRecords: number;
  collections: Record<string, number>;
  fileSizeBytes: number;
  lastUpdated: string;
  uptimeSeconds: number;
  accessMode: string;
  cors: string;
}

export function PublicDatabaseHub() {
  const [activeSubTab, setActiveSubTab] = useState<'browser' | 'caller' | 'reference' | 'stream'>('browser');
  const [selectedCollection, setSelectedCollection] = useState<string>('transactions');
  
  // Data state
  const [items, setItems] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [stats, setStats] = useState<DatabaseStats | null>(null);
  
  // Table filters & pagination
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(15);
  const [sortField, setSortField] = useState<string>('date');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  
  // Stretch status
  const [stretching, setStretching] = useState<boolean>(false);
  const [stretchMessage, setStretchMessage] = useState<string | null>(null);
  
  // Selection & Inspector
  const [inspectedRecord, setInspectedRecord] = useState<any | null>(null);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  
  // New Record Modal
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newRecordJson, setNewRecordJson] = useState<string>('{\n  "merchant": "Custom Vendor LLC",\n  "amount": 289.50,\n  "currency": "USD",\n  "status": "APPROVED",\n  "cardLast4": "4242",\n  "channel": "API_DIRECT"\n}');
  
  // Live API Tester
  const [reqMethod, setReqMethod] = useState<'GET' | 'POST' | 'PUT' | 'DELETE'>('GET');
  const [reqUrl, setReqUrl] = useState<string>('/api/db/transactions?limit=5');
  const [reqBody, setReqBody] = useState<string>('{\n  "amount": 199.95,\n  "currency": "USD",\n  "merchant": "Cloud Server Hosting",\n  "status": "APPROVED"\n}');
  const [apiResponse, setApiResponse] = useState<any | null>(null);
  const [apiRespStatus, setApiRespStatus] = useState<number | null>(null);
  const [apiRespTime, setApiRespTime] = useState<number | null>(null);
  const [apiLoading, setApiLoading] = useState<boolean>(false);

  // Host URL for external callers
  const originUrl = typeof window !== 'undefined' ? window.location.origin : 'https://api.yourdomain.com';

  // Fetch Database Stats
  const fetchStats = useCallback(async () => {
    try {
      const res = await fetch('/api/db/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch (e) {
      console.error('Failed to fetch DB stats:', e);
    }
  }, []);

  // Fetch Collection Data
  const fetchData = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const params = new URLSearchParams();
      if (searchQuery) params.set('search', searchQuery);
      if (statusFilter !== 'all') params.set('status', statusFilter);
      params.set('limit', String(pageSize));
      params.set('offset', String((currentPage - 1) * pageSize));
      params.set('sort', sortField);
      params.set('order', sortOrder);

      const res = await fetch(`/api/db/${selectedCollection}?${params.toString()}`);
      if (!res.ok) throw new Error(`HTTP ${res.status}: Failed to load collection '${selectedCollection}'`);
      
      const json = await res.json();
      setItems(json.items || []);
      setTotalCount(json.total || 0);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, [selectedCollection, searchQuery, statusFilter, currentPage, pageSize, sortField, sortOrder]);

  useEffect(() => {
    fetchStats();
    fetchData();
  }, [fetchStats, fetchData]);

  // Handle Stretch Database
  const handleStretch = async (count: number = 100, targetCollection: string = selectedCollection) => {
    setStretching(true);
    setStretchMessage(null);
    try {
      const res = await fetch('/api/db/stretch', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ count, collection: targetCollection })
      });
      const data = await res.json();
      if (data.success) {
        setStretchMessage(data.message);
        fetchStats();
        fetchData();
        setTimeout(() => setStretchMessage(null), 6000);
      }
    } catch (e: any) {
      alert('Failed to stretch database: ' + e.message);
    } finally {
      setStretching(false);
    }
  };

  // Handle Reset Database
  const handleReset = async () => {
    if (!confirm('Reset database to default seed data? All custom additions will revert to standard state.')) return;
    try {
      const res = await fetch('/api/db/reset', { method: 'POST' });
      const data = await res.json();
      setStretchMessage(data.message);
      fetchStats();
      fetchData();
      setTimeout(() => setStretchMessage(null), 5000);
    } catch (e: any) {
      alert('Reset failed: ' + e.message);
    }
  };

  // Handle Delete Item
  const handleDeleteItem = async (id: string) => {
    if (!confirm(`Delete record '${id}' from '${selectedCollection}'?`)) return;
    try {
      const res = await fetch(`/api/db/${selectedCollection}/${id}`, { method: 'DELETE' });
      if (res.ok) {
        if (inspectedRecord?.id === id) setInspectedRecord(null);
        fetchStats();
        fetchData();
      }
    } catch (e: any) {
      alert('Delete failed: ' + e.message);
    }
  };

  // Handle Add Item
  const handleCreateRecord = async () => {
    try {
      const parsed = JSON.parse(newRecordJson);
      const res = await fetch(`/api/db/${selectedCollection}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(parsed)
      });
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      setShowAddModal(false);
      fetchStats();
      fetchData();
    } catch (err: any) {
      alert('Invalid JSON or creation error: ' + err.message);
    }
  };

  // Execute Live API Call
  const handleSendApiCall = async () => {
    setApiLoading(true);
    setApiResponse(null);
    setApiRespStatus(null);
    const start = performance.now();
    try {
      const fetchOpts: RequestInit = {
        method: reqMethod,
        headers: { 'Content-Type': 'application/json' }
      };
      if (['POST', 'PUT'].includes(reqMethod) && reqBody) {
        fetchOpts.body = reqBody;
      }
      const res = await fetch(reqUrl, fetchOpts);
      const duration = Math.round(performance.now() - start);
      setApiRespStatus(res.status);
      setApiRespTime(duration);
      
      const contentType = res.headers.get('content-type') || '';
      if (contentType.includes('application/json')) {
        const data = await res.json();
        setApiResponse(data);
      } else {
        const text = await res.text();
        setApiResponse(text);
      }
      fetchStats();
    } catch (e: any) {
      setApiRespStatus(500);
      setApiResponse({ error: e.message });
      setApiRespTime(Math.round(performance.now() - start));
    } finally {
      setApiLoading(false);
    }
  };

  const copyToClipboard = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  const totalPages = Math.max(1, Math.ceil(totalCount / pageSize));

  const collectionsList = [
    { id: 'transactions', label: 'Transactions', icon: Activity, desc: 'Visa payments, card authorizations & settlements' },
    { id: 'cards', label: 'Cards & Tokens', icon: Shield, desc: 'Virtual cards, commercial tokens & accounts on file' },
    { id: 'accounts', label: 'Corporate Accounts', icon: Database, desc: 'Multi-currency settlement pools & balances' },
    { id: 'executions', label: 'API Execution Logs', icon: Terminal, desc: 'Every endpoint invocation across the system' },
    { id: 'webhooks', label: 'Webhooks & Events', icon: Zap, desc: 'Inbound notification events & webhook history' },
    { id: 'records', label: 'Custom Records', icon: Layers, desc: 'Open dynamic store for arbitrary JSON documents' },
  ];

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 overflow-y-auto">
      {/* Top Banner: Public API & Stretched DB Status */}
      <div className="bg-gradient-to-r from-blue-950/80 via-slate-900 to-indigo-950/80 border-b border-blue-900/40 p-4 md:px-8">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
          <div>
            <div className="flex items-center gap-2.5 mb-1.5">
              <span className="flex h-2.5 w-2.5 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
              </span>
              <h1 className="text-xl md:text-2xl font-bold tracking-tight text-white flex items-center gap-2">
                Public Database & Live API Hub
                <span className="text-xs font-semibold px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 border border-emerald-500/30">
                  DB Stretched & Live
                </span>
              </h1>
            </div>
            <p className="text-xs md:text-sm text-slate-400 max-w-3xl">
              Real persistent backend storage with open access. Anyone can call the API via REST/cURL, execute endpoints, stretch collections, or retrieve live records.
            </p>
          </div>

          {/* Quick Metrics & Actions */}
          <div className="flex flex-wrap items-center gap-2">
            <div className="bg-slate-900/90 border border-slate-800 rounded-lg px-3 py-1.5 flex items-center gap-3 text-xs">
              <div>
                <span className="text-slate-400 text-[10px] block">TOTAL RECORDS</span>
                <span className="text-white font-mono font-bold text-sm">
                  {stats?.totalRecords ? stats.totalRecords.toLocaleString() : '100+'}
                </span>
              </div>
              <div className="h-6 w-px bg-slate-800" />
              <div>
                <span className="text-slate-400 text-[10px] block">CORS ACCESS</span>
                <span className="text-emerald-400 font-mono font-semibold text-xs">ALLOW_ALL (*)</span>
              </div>
              <div className="h-6 w-px bg-slate-800" />
              <div>
                <span className="text-slate-400 text-[10px] block">AUTH</span>
                <span className="text-sky-400 font-mono font-semibold text-xs">NONE (Open)</span>
              </div>
            </div>

            {/* Stretch Buttons */}
            <button
              onClick={() => handleStretch(100, selectedCollection)}
              disabled={stretching}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg text-xs font-semibold shadow-md transition disabled:opacity-50 cursor-pointer"
              title="Add 100 realistic records to current collection"
            >
              <Zap className={`w-3.5 h-3.5 fill-current ${stretching ? 'animate-spin' : ''}`} />
              {stretching ? 'Stretching...' : 'Stretch DB (+100)'}
            </button>

            <button
              onClick={() => handleStretch(500, 'all')}
              disabled={stretching}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 rounded-lg text-xs font-medium transition disabled:opacity-50 cursor-pointer"
              title="Mass stretch 500 records across all collections"
            >
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Stretch All (+500)
            </button>
          </div>
        </div>

        {/* Stretch Alert Toast */}
        {stretchMessage && (
          <div className="max-w-7xl mx-auto mt-3 p-2.5 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
              <span>{stretchMessage}</span>
            </div>
            <button onClick={() => setStretchMessage(null)} className="text-emerald-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Sub-Navigation Tabs */}
        <div className="max-w-7xl mx-auto mt-4 flex items-center gap-2 border-b border-slate-800 pb-px">
          {[
            { id: 'browser', label: 'Data Retrieval & Table Browser', icon: Database },
            { id: 'caller', label: 'Live API Caller & Tester', icon: Play },
            { id: 'reference', label: 'Public API Documentation & cURL', icon: Terminal },
            { id: 'stream', label: 'Live Audit & Execution Stream', icon: Activity },
          ].map(tab => {
            const Icon = tab.icon;
            const active = activeSubTab === tab.id;
            return (
              <button
                key={tab.id}
                onClick={() => setActiveSubTab(tab.id as any)}
                className={`flex items-center gap-2 px-3.5 py-2 text-xs font-semibold rounded-t-lg transition border-b-2 cursor-pointer ${
                  active 
                    ? 'border-blue-500 text-white bg-slate-900/90' 
                    : 'border-transparent text-slate-400 hover:text-slate-200 hover:bg-slate-900/40'
                }`}
              >
                <Icon className={`w-3.5 h-3.5 ${active ? 'text-blue-400' : 'text-slate-500'}`} />
                {tab.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 max-w-7xl w-full mx-auto p-4 md:p-6">
        
        {/* SUB-TAB 1: DATA RETRIEVAL & TABLE BROWSER */}
        {activeSubTab === 'browser' && (
          <div className="space-y-4">
            
            {/* Collection Selector Pills */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
              {collectionsList.map(col => {
                const Icon = col.icon;
                const isSelected = selectedCollection === col.id;
                const count = stats?.collections?.[col.id] || 0;
                return (
                  <button
                    key={col.id}
                    onClick={() => {
                      setSelectedCollection(col.id);
                      setCurrentPage(1);
                      setSearchQuery('');
                      setInspectedRecord(null);
                    }}
                    className={`flex flex-col p-2.5 rounded-lg border text-left transition cursor-pointer ${
                      isSelected
                        ? 'bg-blue-950/60 border-blue-500 ring-1 ring-blue-500/50 text-white'
                        : 'bg-slate-900/60 border-slate-800 text-slate-400 hover:bg-slate-900 hover:text-slate-200'
                    }`}
                  >
                    <div className="flex items-center justify-between mb-1">
                      <Icon className={`w-4 h-4 ${isSelected ? 'text-blue-400' : 'text-slate-500'}`} />
                      <span className={`text-[10px] font-mono font-bold px-1.5 py-0.5 rounded ${
                        isSelected ? 'bg-blue-600 text-white' : 'bg-slate-800 text-slate-400'
                      }`}>
                        {count.toLocaleString()}
                      </span>
                    </div>
                    <span className="font-semibold text-xs text-white">{col.label}</span>
                    <span className="text-[10px] text-slate-500 truncate mt-0.5">{col.desc}</span>
                  </button>
                );
              })}
            </div>

            {/* Filter Bar & Action Buttons */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3 flex flex-wrap items-center justify-between gap-3">
              <div className="flex flex-wrap items-center gap-2 flex-1 min-w-[280px]">
                {/* Search */}
                <div className="relative flex-1 min-w-[200px]">
                  <Search className="w-3.5 h-3.5 absolute left-3 top-2.5 text-slate-500" />
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => {
                      setSearchQuery(e.target.value);
                      setCurrentPage(1);
                    }}
                    placeholder={`Search in ${selectedCollection} (ID, merchant, card, amount, text)...`}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-blue-500 font-mono"
                  />
                  {searchQuery && (
                    <button onClick={() => setSearchQuery('')} className="absolute right-2.5 top-2 text-slate-500 hover:text-white">
                      <X className="w-3 h-3" />
                    </button>
                  )}
                </div>

                {/* Status Filter */}
                <select
                  value={statusFilter}
                  onChange={(e) => {
                    setStatusFilter(e.target.value);
                    setCurrentPage(1);
                  }}
                  className="bg-slate-950 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
                >
                  <option value="all">All Statuses</option>
                  <option value="APPROVED">APPROVED</option>
                  <option value="SETTLED">SETTLED</option>
                  <option value="PENDING">PENDING</option>
                  <option value="ACTIVE">ACTIVE</option>
                  <option value="REFUNDED">REFUNDED</option>
                  <option value="FROZEN">FROZEN</option>
                </select>

                {/* Sort Order */}
                <button
                  onClick={() => setSortOrder(o => o === 'desc' ? 'asc' : 'desc')}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-950 border border-slate-800 rounded-lg text-xs text-slate-300 hover:bg-slate-800 cursor-pointer"
                  title="Toggle Ascending / Descending"
                >
                  <ArrowUpDown className="w-3 h-3 text-slate-400" />
                  <span>{sortOrder.toUpperCase()}</span>
                </button>
              </div>

              {/* Data Table Actions */}
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setShowAddModal(true)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold cursor-pointer shadow-sm"
                >
                  <Plus className="w-3.5 h-3.5" />
                  Insert Record
                </button>

                <a
                  href={`/api/db/export?collection=${selectedCollection}&format=csv`}
                  download={`${selectedCollection}.csv`}
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-lg text-xs cursor-pointer"
                  title="Export this collection to CSV"
                >
                  <Download className="w-3 h-3 text-slate-400" />
                  CSV
                </a>

                <a
                  href={`/api/db/export?collection=${selectedCollection}&format=json`}
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-1 px-2.5 py-1.5 bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-300 rounded-lg text-xs cursor-pointer"
                  title="Export raw JSON"
                >
                  <Code2 className="w-3 h-3 text-slate-400" />
                  JSON
                </a>

                <button
                  onClick={fetchData}
                  className="p-1.5 bg-slate-950 border border-slate-800 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg cursor-pointer"
                  title="Refresh Table"
                >
                  <RefreshCw className={`w-3.5 h-3.5 ${loading ? 'animate-spin text-blue-400' : ''}`} />
                </button>
              </div>
            </div>

            {/* Live API Endpoint Tip for this collection */}
            <div className="bg-slate-900/60 border border-slate-800/80 rounded-lg px-3.5 py-2 flex flex-wrap items-center justify-between gap-2 text-xs">
              <div className="flex items-center gap-2 font-mono text-[11px] text-slate-300 truncate">
                <span className="text-emerald-400 font-bold">GET</span>
                <span className="text-slate-400">{originUrl}</span>
                <span className="text-sky-300">/api/db/{selectedCollection}?limit=50</span>
              </div>
              <button
                onClick={() => copyToClipboard(`curl -X GET '${originUrl}/api/db/${selectedCollection}?limit=50'`, 'curl-col')}
                className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-0.5 rounded bg-slate-800 cursor-pointer"
              >
                {copiedId === 'curl-col' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                Copy cURL
              </button>
            </div>

            {/* Data Table */}
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl overflow-hidden shadow-lg">
              {loading && items.length === 0 ? (
                <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
                  <RefreshCw className="w-6 h-6 animate-spin text-blue-400" />
                  <span className="text-xs">Querying persistent database store...</span>
                </div>
              ) : items.length === 0 ? (
                <div className="p-12 text-center text-slate-400 flex flex-col items-center justify-center gap-3">
                  <AlertCircle className="w-8 h-8 text-amber-400/80" />
                  <div className="text-sm font-semibold text-slate-200">No records found</div>
                  <p className="text-xs text-slate-500 max-w-sm">
                    No items match the current search or filters. Click Stretch DB to add realistic records!
                  </p>
                  <button
                    onClick={() => handleStretch(100, selectedCollection)}
                    className="mt-2 px-3.5 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold cursor-pointer"
                  >
                    Stretch DB with 100 Records
                  </button>
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-slate-950/80 border-b border-slate-800 text-[11px] text-slate-400 font-mono uppercase tracking-wider">
                      <tr>
                        <th className="py-2.5 px-3">ID</th>
                        {selectedCollection === 'transactions' && (
                          <>
                            <th className="py-2.5 px-3">Merchant / Party</th>
                            <th className="py-2.5 px-3">Amount</th>
                            <th className="py-2.5 px-3">Card / Account</th>
                            <th className="py-2.5 px-3">Status</th>
                            <th className="py-2.5 px-3">Date</th>
                          </>
                        )}
                        {selectedCollection === 'cards' && (
                          <>
                            <th className="py-2.5 px-3">Cardholder</th>
                            <th className="py-2.5 px-3">Card Details</th>
                            <th className="py-2.5 px-3">Limit / Spent</th>
                            <th className="py-2.5 px-3">Type</th>
                            <th className="py-2.5 px-3">Status</th>
                          </>
                        )}
                        {selectedCollection === 'accounts' && (
                          <>
                            <th className="py-2.5 px-3">Account Name</th>
                            <th className="py-2.5 px-3">Account Number</th>
                            <th className="py-2.5 px-3">Balance</th>
                            <th className="py-2.5 px-3">Currency</th>
                            <th className="py-2.5 px-3">Status</th>
                          </>
                        )}
                        {selectedCollection === 'executions' && (
                          <>
                            <th className="py-2.5 px-3">Method & Path</th>
                            <th className="py-2.5 px-3">Status</th>
                            <th className="py-2.5 px-3">Latency</th>
                            <th className="py-2.5 px-3">Source</th>
                            <th className="py-2.5 px-3">Time</th>
                          </>
                        )}
                        {selectedCollection === 'webhooks' && (
                          <>
                            <th className="py-2.5 px-3">Event Topic</th>
                            <th className="py-2.5 px-3">Destination</th>
                            <th className="py-2.5 px-3">Status</th>
                            <th className="py-2.5 px-3">Time</th>
                          </>
                        )}
                        {selectedCollection === 'records' && (
                          <>
                            <th className="py-2.5 px-3">Title / Key</th>
                            <th className="py-2.5 px-3">Data Preview</th>
                            <th className="py-2.5 px-3">Created</th>
                          </>
                        )}
                        <th className="py-2.5 px-3 text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800/60 font-sans">
                      {items.map((row, idx) => {
                        const isInspected = inspectedRecord?.id === row.id;
                        return (
                          <tr 
                            key={row.id || idx}
                            className={`hover:bg-slate-800/40 transition ${
                              isInspected ? 'bg-blue-950/40' : ''
                            }`}
                          >
                            {/* ID */}
                            <td className="py-2.5 px-3 font-mono text-[11px] text-slate-400">
                              <div className="flex items-center gap-1.5">
                                <span>{String(row.id).slice(0, 14)}</span>
                                <button
                                  onClick={() => copyToClipboard(String(row.id), `id-${row.id}`)}
                                  className="text-slate-600 hover:text-slate-300"
                                  title="Copy ID"
                                >
                                  {copiedId === `id-${row.id}` ? <Check className="w-2.5 h-2.5 text-emerald-400" /> : <Copy className="w-2.5 h-2.5" />}
                                </button>
                              </div>
                            </td>

                            {/* Transactions Columns */}
                            {selectedCollection === 'transactions' && (
                              <>
                                <td className="py-2.5 px-3">
                                  <div className="font-medium text-slate-200">{row.merchant || 'Generic'}</div>
                                  <div className="text-[10px] text-slate-500 font-mono">{row.merchantCategory || 'Interchange'}</div>
                                </td>
                                <td className="py-2.5 px-3 font-mono font-semibold">
                                  <span className={row.amount > 200 ? 'text-emerald-400' : 'text-slate-200'}>
                                    {row.currency || 'USD'} {Number(row.amount).toFixed(2)}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3 font-mono text-[11px]">
                                  <span className="text-slate-300">•••• {row.cardLast4 || '4242'}</span>
                                  <span className="text-[10px] text-slate-500 block truncate max-w-[120px]">{row.cardType}</span>
                                </td>
                                <td className="py-2.5 px-3">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold uppercase tracking-wider ${
                                    row.status === 'APPROVED' || row.status === 'SETTLED'
                                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                      : row.status === 'PENDING'
                                      ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20'
                                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                  }`}>
                                    {row.status}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3 text-slate-400 text-[11px]">
                                  {row.date ? new Date(row.date).toLocaleDateString() : '—'}
                                </td>
                              </>
                            )}

                            {/* Cards Columns */}
                            {selectedCollection === 'cards' && (
                              <>
                                <td className="py-2.5 px-3">
                                  <div className="font-medium text-slate-200">{row.cardholder}</div>
                                  <div className="text-[10px] text-slate-500">{row.department || 'Commercial'}</div>
                                </td>
                                <td className="py-2.5 px-3 font-mono text-[11px]">
                                  <span>Visa •••• {row.last4}</span>
                                  <span className="text-slate-500 text-[10px] block">Exp: {row.expMonth}/{row.expYear}</span>
                                </td>
                                <td className="py-2.5 px-3 font-mono">
                                  <div className="text-slate-200">${Number(row.spendingLimit).toLocaleString()}</div>
                                  <div className="text-[10px] text-slate-500">Spent: ${Number(row.spentMonth || 0).toLocaleString()}</div>
                                </td>
                                <td className="py-2.5 px-3">
                                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                    {row.type}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3">
                                  <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-semibold ${
                                    row.status === 'ACTIVE' 
                                      ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                                      : 'bg-rose-500/10 text-rose-400 border border-rose-500/20'
                                  }`}>
                                    {row.status}
                                  </span>
                                </td>
                              </>
                            )}

                            {/* Accounts Columns */}
                            {selectedCollection === 'accounts' && (
                              <>
                                <td className="py-2.5 px-3 font-medium text-slate-200">{row.name}</td>
                                <td className="py-2.5 px-3 font-mono text-[11px] text-slate-400">{row.accountNumber}</td>
                                <td className="py-2.5 px-3 font-mono font-bold text-emerald-400">
                                  ${Number(row.balance).toLocaleString()}
                                </td>
                                <td className="py-2.5 px-3 font-mono text-slate-300">{row.currency}</td>
                                <td className="py-2.5 px-3">
                                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                                    {row.status}
                                  </span>
                                </td>
                              </>
                            )}

                            {/* Executions Columns */}
                            {selectedCollection === 'executions' && (
                              <>
                                <td className="py-2.5 px-3 font-mono text-[11px]">
                                  <span className="font-bold text-sky-400 mr-1.5">{row.method}</span>
                                  <span className="text-slate-300 truncate max-w-[200px] inline-block">{row.path}</span>
                                </td>
                                <td className="py-2.5 px-3 font-mono">
                                  <span className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                                    row.status >= 200 && row.status < 300 ? 'bg-emerald-500/20 text-emerald-300' : 'bg-rose-500/20 text-rose-300'
                                  }`}>
                                    {row.status}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3 font-mono text-slate-400 text-[11px]">{row.latencyMs}ms</td>
                                <td className="py-2.5 px-3 font-mono text-[10px] text-slate-500">{row.source || 'REST'}</td>
                                <td className="py-2.5 px-3 text-slate-400 text-[10px] font-mono">
                                  {row.timestamp ? new Date(row.timestamp).toLocaleTimeString() : '—'}
                                </td>
                              </>
                            )}

                            {/* Webhooks Columns */}
                            {selectedCollection === 'webhooks' && (
                              <>
                                <td className="py-2.5 px-3 font-mono text-amber-300 font-semibold">{row.event}</td>
                                <td className="py-2.5 px-3 font-mono text-[10px] text-slate-400 truncate max-w-[200px]">{row.destinationUrl}</td>
                                <td className="py-2.5 px-3">
                                  <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-emerald-500/10 text-emerald-400">
                                    {row.status}
                                  </span>
                                </td>
                                <td className="py-2.5 px-3 text-slate-400 text-[10px] font-mono">
                                  {row.timestamp ? new Date(row.timestamp).toLocaleTimeString() : '—'}
                                </td>
                              </>
                            )}

                            {/* Records Columns */}
                            {selectedCollection === 'records' && (
                              <>
                                <td className="py-2.5 px-3 font-medium text-slate-200">{row.title || row.name || 'Untitled'}</td>
                                <td className="py-2.5 px-3 font-mono text-[10px] text-slate-500 truncate max-w-[300px]">
                                  {JSON.stringify(row.data || row)}
                                </td>
                                <td className="py-2.5 px-3 text-slate-400 text-[10px] font-mono">
                                  {row.createdAt ? new Date(row.createdAt).toLocaleDateString() : '—'}
                                </td>
                              </>
                            )}

                            {/* Action Buttons */}
                            <td className="py-2.5 px-3 text-right">
                              <div className="flex items-center justify-end gap-1.5">
                                <button
                                  onClick={() => setInspectedRecord(isInspected ? null : row)}
                                  className="px-2 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-300 text-[11px] font-medium cursor-pointer"
                                >
                                  {isInspected ? 'Close' : 'Inspect'}
                                </button>
                                <button
                                  onClick={() => handleDeleteItem(row.id)}
                                  className="p-1 rounded hover:bg-rose-950/60 text-slate-600 hover:text-rose-400 cursor-pointer"
                                  title="Delete record"
                                >
                                  <Trash2 className="w-3 h-3" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              )}

              {/* Table Footer with Pagination */}
              <div className="bg-slate-950 px-4 py-2.5 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
                <div className="font-mono text-[11px]">
                  Showing <span className="text-white font-semibold">{items.length}</span> of{' '}
                  <span className="text-white font-semibold">{totalCount.toLocaleString()}</span> records in{' '}
                  <span className="text-blue-400 font-semibold">{selectedCollection}</span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-[11px]">Rows per page:</span>
                  <select
                    value={pageSize}
                    onChange={(e) => {
                      setPageSize(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="bg-slate-900 border border-slate-800 rounded px-2 py-0.5 text-xs text-slate-300"
                  >
                    <option value={15}>15</option>
                    <option value={30}>30</option>
                    <option value={50}>50</option>
                    <option value={100}>100</option>
                  </select>

                  <div className="h-4 w-px bg-slate-800 mx-1" />

                  <button
                    onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                    disabled={currentPage === 1}
                    className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                  </button>

                  <span className="font-mono text-[11px] px-1">
                    Page <span className="text-white font-semibold">{currentPage}</span> / {totalPages}
                  </span>

                  <button
                    onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                    disabled={currentPage === totalPages}
                    className="p-1 rounded bg-slate-900 border border-slate-800 text-slate-300 hover:bg-slate-800 disabled:opacity-40 cursor-pointer"
                  >
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Expandable JSON Inspector Drawer */}
            {inspectedRecord && (
              <div className="bg-slate-900 border border-blue-500/40 rounded-xl p-4 shadow-xl relative animate-in fade-in">
                <div className="flex items-center justify-between mb-3 border-b border-slate-800 pb-2.5">
                  <div className="flex items-center gap-2">
                    <Code2 className="w-4 h-4 text-blue-400" />
                    <span className="font-bold text-xs text-white">Record Inspector:</span>
                    <span className="font-mono text-xs text-blue-300 bg-blue-950/60 px-2 py-0.5 rounded border border-blue-500/30">
                      {inspectedRecord.id}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => copyToClipboard(JSON.stringify(inspectedRecord, null, 2), 'inspect-json')}
                      className="flex items-center gap-1 px-2.5 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-xs cursor-pointer"
                    >
                      {copiedId === 'inspect-json' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      Copy JSON
                    </button>
                    <button
                      onClick={() => setInspectedRecord(null)}
                      className="p-1 text-slate-400 hover:text-white"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <pre className="bg-slate-950 p-3 rounded-lg text-xs font-mono text-emerald-300 overflow-x-auto max-h-80 border border-slate-800">
                  {JSON.stringify(inspectedRecord, null, 2)}
                </pre>
              </div>
            )}

          </div>
        )}

        {/* SUB-TAB 2: LIVE API CALLER & TESTER */}
        {activeSubTab === 'caller' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            
            {/* Request Builder */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Play className="w-4 h-4 text-emerald-400" />
                  <h3 className="font-bold text-sm text-white">Live API Request Builder</h3>
                </div>
                <span className="text-[10px] font-mono bg-emerald-500/10 text-emerald-300 border border-emerald-500/20 px-2 py-0.5 rounded">
                  Connected to Real Server
                </span>
              </div>

              {/* Endpoint Preset Selector */}
              <div>
                <label className="text-[11px] font-semibold text-slate-400 block mb-1.5">Preset Endpoints:</label>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    { label: 'Get Transactions', method: 'GET', url: '/api/db/transactions?limit=10' },
                    { label: 'Insert Transaction', method: 'POST', url: '/api/db/transactions', body: '{\n  "amount": 250.00,\n  "currency": "USD",\n  "merchant": "Global Logistics Corp",\n  "status": "APPROVED",\n  "channel": "API_DIRECT"\n}' },
                    { label: 'Get Cards', method: 'GET', url: '/api/db/cards?limit=5' },
                    { label: 'Stretch DB', method: 'POST', url: '/api/db/stretch', body: '{\n  "count": 50,\n  "collection": "transactions"\n}' },
                    { label: 'Execute Payment', method: 'POST', url: '/api/execute', body: '{\n  "method": "POST",\n  "path": "/v1/payments",\n  "body": {\n    "amount": 149.99,\n    "merchant": "Terminal Invocation",\n    "currency": "USD"\n  }\n}' },
                    { label: 'Collections Stats', method: 'GET', url: '/api/db/collections' }
                  ].map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        setReqMethod(p.method as any);
                        setReqUrl(p.url);
                        if (p.body) setReqBody(p.body);
                      }}
                      className="px-2.5 py-1 bg-slate-950 border border-slate-800 hover:border-slate-700 hover:bg-slate-800 text-slate-300 rounded text-xs font-mono transition cursor-pointer"
                    >
                      {p.label}
                    </button>
                  ))}
                </div>
              </div>

              {/* Method and URL Input */}
              <div className="flex items-center gap-2">
                <select
                  value={reqMethod}
                  onChange={(e) => setReqMethod(e.target.value as any)}
                  className={`px-3 py-2 rounded-lg font-mono font-bold text-xs border focus:outline-none ${
                    reqMethod === 'GET' ? 'bg-sky-950/80 text-sky-400 border-sky-800' :
                    reqMethod === 'POST' ? 'bg-emerald-950/80 text-emerald-400 border-emerald-800' :
                    reqMethod === 'PUT' ? 'bg-amber-950/80 text-amber-400 border-amber-800' :
                    'bg-rose-950/80 text-rose-400 border-rose-800'
                  }`}
                >
                  <option value="GET">GET</option>
                  <option value="POST">POST</option>
                  <option value="PUT">PUT</option>
                  <option value="DELETE">DELETE</option>
                </select>

                <input
                  type="text"
                  value={reqUrl}
                  onChange={(e) => setReqUrl(e.target.value)}
                  placeholder="/api/db/transactions"
                  className="flex-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs font-mono text-slate-200 focus:outline-none focus:border-blue-500"
                />
              </div>

              {/* Request Body (for POST/PUT) */}
              {['POST', 'PUT'].includes(reqMethod) && (
                <div>
                  <div className="flex items-center justify-between mb-1.5">
                    <label className="text-[11px] font-semibold text-slate-400">JSON Request Body:</label>
                    <span className="text-[10px] text-slate-500 font-mono">application/json</span>
                  </div>
                  <textarea
                    value={reqBody}
                    onChange={(e) => setReqBody(e.target.value)}
                    rows={8}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none focus:border-blue-500"
                  />
                </div>
              )}

              {/* Action Button */}
              <div className="pt-2 flex items-center justify-between">
                <button
                  onClick={handleSendApiCall}
                  disabled={apiLoading}
                  className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white rounded-lg text-xs font-bold shadow-lg transition cursor-pointer disabled:opacity-50"
                >
                  {apiLoading ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
                  <span>{apiLoading ? 'Calling API...' : 'Send Live Request'}</span>
                </button>

                <button
                  onClick={() => {
                    const curlCmd = ['POST', 'PUT'].includes(reqMethod)
                      ? `curl -X ${reqMethod} '${originUrl}${reqUrl}' -H 'Content-Type: application/json' -d '${reqBody.replace(/\n/g, '').replace(/'/g, "\\'")}'`
                      : `curl -X ${reqMethod} '${originUrl}${reqUrl}'`;
                    copyToClipboard(curlCmd, 'curl-builder');
                  }}
                  className="flex items-center gap-1 text-xs text-slate-400 hover:text-white px-2.5 py-1.5 rounded bg-slate-950 border border-slate-800 cursor-pointer"
                >
                  {copiedId === 'curl-builder' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                  Copy as cURL
                </button>
              </div>
            </div>

            {/* Live Response Box */}
            <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-5 shadow-lg flex flex-col space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div className="flex items-center gap-2">
                  <Terminal className="w-4 h-4 text-sky-400" />
                  <h3 className="font-bold text-sm text-white">Live HTTP Response</h3>
                </div>

                {apiRespStatus !== null && (
                  <div className="flex items-center gap-2">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-mono font-bold ${
                      apiRespStatus >= 200 && apiRespStatus < 300 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }`}>
                      {apiRespStatus} {apiRespStatus === 200 ? 'OK' : apiRespStatus === 201 ? 'CREATED' : ''}
                    </span>
                    {apiRespTime !== null && (
                      <span className="text-[10px] font-mono text-slate-400">
                        {apiRespTime}ms
                      </span>
                    )}
                  </div>
                )}
              </div>

              {apiResponse === null && !apiLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center py-20 text-slate-500 text-xs">
                  <Terminal className="w-10 h-10 mb-2 opacity-30" />
                  <span>Click "Send Live Request" to trigger this API endpoint</span>
                </div>
              ) : apiLoading ? (
                <div className="flex-1 flex flex-col items-center justify-center py-20 text-slate-400 text-xs">
                  <RefreshCw className="w-8 h-8 animate-spin text-blue-400 mb-2" />
                  <span>Awaiting response from backend database...</span>
                </div>
              ) : (
                <div className="flex-1 flex flex-col space-y-2">
                  <div className="flex items-center justify-between text-[11px] text-slate-400">
                    <span>Response Payload:</span>
                    <button
                      onClick={() => copyToClipboard(typeof apiResponse === 'object' ? JSON.stringify(apiResponse, null, 2) : String(apiResponse), 'copy-resp')}
                      className="flex items-center gap-1 text-slate-400 hover:text-white"
                    >
                      {copiedId === 'copy-resp' ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      Copy Response
                    </button>
                  </div>
                  <pre className="flex-1 bg-slate-950 p-4 rounded-lg text-xs font-mono text-emerald-300 overflow-auto max-h-[460px] border border-slate-800">
                    {typeof apiResponse === 'object' ? JSON.stringify(apiResponse, null, 2) : String(apiResponse)}
                  </pre>
                </div>
              )}
            </div>

          </div>
        )}

        {/* SUB-TAB 3: PUBLIC API DOCUMENTATION & CURL REFERENCE */}
        {activeSubTab === 'reference' && (
          <div className="space-y-6">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-6">
              <h2 className="text-lg font-bold text-white mb-2 flex items-center gap-2">
                <Globe className="w-5 h-5 text-blue-400" />
                Public API Calling Guide (Anyone Can Call)
              </h2>
              <p className="text-xs text-slate-400 max-w-3xl mb-4">
                This backend API is openly accessible to any external client, developer terminal, Python script, or third-party web app. CORS is enabled with <code className="text-emerald-400">Access-Control-Allow-Origin: *</code>. No authentication keys are required for database retrieval or endpoint execution.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs">
                  <span className="text-slate-400 font-semibold block mb-1">API Base URL:</span>
                  <div className="flex items-center justify-between bg-slate-900 p-2 rounded font-mono text-sky-400">
                    <span>{originUrl}/api</span>
                    <button onClick={() => copyToClipboard(`${originUrl}/api`, 'base-url')} className="hover:text-white">
                      {copiedId === 'base-url' ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                    </button>
                  </div>
                </div>

                <div className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs">
                  <span className="text-slate-400 font-semibold block mb-1">Supported Methods:</span>
                  <div className="bg-slate-900 p-2 rounded font-mono text-emerald-400">
                    GET, POST, PUT, PATCH, DELETE, OPTIONS, HEAD
                  </div>
                </div>
              </div>
            </div>

            {/* REST Endpoints Reference Grid */}
            <div className="space-y-4">
              <h3 className="text-sm font-bold text-slate-200">Publicly Callable REST Endpoints:</h3>

              {[
                {
                  method: 'GET',
                  path: '/api/db/transactions',
                  desc: 'Retrieve paginated and filtered transactions with fuzzy search.',
                  curl: `curl -X GET '${originUrl}/api/db/transactions?limit=10&status=APPROVED'`
                },
                {
                  method: 'POST',
                  path: '/api/db/transactions',
                  desc: 'Create and persist a new payment transaction directly in the database.',
                  curl: `curl -X POST '${originUrl}/api/db/transactions' \\\n  -H 'Content-Type: application/json' \\\n  -d '{"amount": 185.50, "currency": "USD", "merchant": "Acme Corp", "status": "APPROVED"}'`
                },
                {
                  method: 'GET',
                  path: '/api/db/cards',
                  desc: 'Retrieve virtual cards, spending limits, and tokenized accounts.',
                  curl: `curl -X GET '${originUrl}/api/db/cards?status=ACTIVE'`
                },
                {
                  method: 'POST',
                  path: '/api/db/stretch',
                  desc: 'Stretch database by generating 100 or more realistic records on the fly.',
                  curl: `curl -X POST '${originUrl}/api/db/stretch' \\\n  -H 'Content-Type: application/json' \\\n  -d '{"count": 100, "collection": "transactions"}'`
                },
                {
                  method: 'POST',
                  path: '/api/execute',
                  desc: 'Universal API Execution Gateway: Call any catalog endpoint; results are logged to database.',
                  curl: `curl -X POST '${originUrl}/api/execute' \\\n  -H 'Content-Type: application/json' \\\n  -d '{"method": "POST", "path": "/v1/payments", "body": {"amount": 500}}'`
                },
                {
                  method: 'GET',
                  path: '/api/db/collections',
                  desc: 'List all collections, table names, and record counts.',
                  curl: `curl -X GET '${originUrl}/api/db/collections'`
                },
                {
                  method: 'GET',
                  path: '/api/db/export',
                  desc: 'Download a full database backup dump (JSON or CSV).',
                  curl: `curl -X GET '${originUrl}/api/db/export?format=json' -o database-backup.json`
                }
              ].map((ep, idx) => (
                <div key={idx} className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-2">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2 font-mono text-xs">
                      <span className={`px-2 py-0.5 rounded font-bold ${
                        ep.method === 'GET' ? 'bg-sky-500/20 text-sky-400' : 'bg-emerald-500/20 text-emerald-400'
                      }`}>
                        {ep.method}
                      </span>
                      <span className="text-white font-semibold">{ep.path}</span>
                    </div>
                    <button
                      onClick={() => copyToClipboard(ep.curl, `curl-ref-${idx}`)}
                      className="flex items-center gap-1 text-[11px] text-slate-400 hover:text-white px-2 py-1 bg-slate-950 rounded border border-slate-800 cursor-pointer"
                    >
                      {copiedId === `curl-ref-${idx}` ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                      Copy cURL
                    </button>
                  </div>
                  <p className="text-xs text-slate-400">{ep.desc}</p>
                  <pre className="bg-slate-950 p-2.5 rounded text-[11px] font-mono text-emerald-400 overflow-x-auto border border-slate-800">
                    {ep.curl}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SUB-TAB 4: LIVE AUDIT & EXECUTION STREAM */}
        {activeSubTab === 'stream' && (
          <div className="space-y-4">
            <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-5 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-sm text-white flex items-center gap-2">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  Live API Executions Stored in Database
                </h3>
                <p className="text-xs text-slate-400">
                  Every request made by any caller to <code className="text-sky-300">/api/execute</code> or <code className="text-sky-300">/api/db/*</code> is saved here permanently.
                </p>
              </div>
              <button
                onClick={fetchData}
                className="flex items-center gap-1.5 px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs rounded-lg cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                Refresh Feed
              </button>
            </div>

            <div className="bg-slate-900/90 border border-slate-800 rounded-xl overflow-hidden">
              <table className="w-full text-left text-xs">
                <thead className="bg-slate-950 border-b border-slate-800 font-mono text-[11px] text-slate-400 uppercase">
                  <tr>
                    <th className="py-2.5 px-3">Execution ID</th>
                    <th className="py-2.5 px-3">Method & Path</th>
                    <th className="py-2.5 px-3">Status</th>
                    <th className="py-2.5 px-3">Latency</th>
                    <th className="py-2.5 px-3">Source / Caller</th>
                    <th className="py-2.5 px-3">Timestamp</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-800/60 font-sans">
                  {(stats?.collections?.executions ? items : []).map((ex, idx) => (
                    <tr key={ex.id || idx} className="hover:bg-slate-800/30 font-mono text-[11px]">
                      <td className="py-2.5 px-3 text-slate-400">{ex.id}</td>
                      <td className="py-2.5 px-3 text-white">
                        <span className="text-sky-400 font-bold mr-1">{ex.method}</span>
                        {ex.path}
                      </td>
                      <td className="py-2.5 px-3">
                        <span className="px-1.5 py-0.5 rounded text-[10px] bg-emerald-500/20 text-emerald-300">
                          {ex.status || 200}
                        </span>
                      </td>
                      <td className="py-2.5 px-3 text-slate-400">{ex.latencyMs || 25}ms</td>
                      <td className="py-2.5 px-3 text-slate-400 text-[10px]">{ex.source || 'PUBLIC_API'}</td>
                      <td className="py-2.5 px-3 text-slate-500 text-[10px]">
                        {ex.timestamp ? new Date(ex.timestamp).toLocaleTimeString() : '—'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

      </div>

      {/* Insert Record Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/70 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 rounded-xl max-w-lg w-full p-5 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Plus className="w-4 h-4 text-blue-400" />
                <h3 className="font-bold text-sm text-white">Insert Record into '{selectedCollection}'</h3>
              </div>
              <button onClick={() => setShowAddModal(false)} className="text-slate-400 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div>
              <label className="text-xs text-slate-400 block mb-1.5">JSON Document to Insert:</label>
              <textarea
                value={newRecordJson}
                onChange={(e) => setNewRecordJson(e.target.value)}
                rows={8}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-xs font-mono text-emerald-400 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div className="flex items-center justify-end gap-2 pt-2">
              <button
                onClick={() => setShowAddModal(false)}
                className="px-3 py-1.5 text-xs text-slate-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                onClick={handleCreateRecord}
                className="px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-semibold"
              >
                Insert Record
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
