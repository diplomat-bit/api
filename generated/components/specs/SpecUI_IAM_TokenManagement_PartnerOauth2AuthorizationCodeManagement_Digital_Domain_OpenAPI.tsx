import React, { useState, useEffect } from 'react';
import { 
  Play, Copy, Check, RefreshCw, Layers, Terminal, Globe, 
  Code2, ChevronRight, Send, AlertCircle, Sparkles, Shield, Key
} from 'lucide-react';
import { workbenchSdk } from '../../configs/api-clients';

export interface SpecUI_IAM_TokenManagement_PartnerOauth2AuthorizationCodeManagement_Digital_Domain_OpenAPIProps {
  onExecute?: (endpoint: any, params: any) => void;
  selectedEndpointId?: string;
}

const ENDPOINTS = [
  {
    "method": "POST",
    "path": "/oauth2/v2/token",
    "summary": "Mint partner OAuth2 Bearer token"
  },
  {
    "method": "POST",
    "path": "/oauth2/v2/authorize/code",
    "summary": "PKCE authorization code redemption"
  },
  {
    "method": "POST",
    "path": "/oauth2/v2/revoke",
    "summary": "Revoke active token pair"
  },
  {
    "method": "POST",
    "path": "/oauth2/v2/introspect",
    "summary": "RFC 7662 token introspection"
  },
  {
    "method": "GET",
    "path": "/oauth2/v2/certs",
    "summary": "JSON Web Key Set (JWKS) public keys"
  }
];

export const SpecUI_IAM_TokenManagement_PartnerOauth2AuthorizationCodeManagement_Digital_Domain_OpenAPI: React.FC<SpecUI_IAM_TokenManagement_PartnerOauth2AuthorizationCodeManagement_Digital_Domain_OpenAPIProps> = ({ onExecute, selectedEndpointId }) => {
  const [selectedEndpoint, setSelectedEndpoint] = useState(ENDPOINTS[0]);
  const [activeTab, setActiveTab] = useState<'params' | 'headers' | 'body' | 'curl'>('params');
  const [params, setParams] = useState<Record<string, string>>({});
  const [headers, setHeaders] = useState<Record<string, string>>({
    'Accept': 'application/json',
    'X-Client-Id': 'workbench-vdp-client-01'
  });
  const [bodyText, setBodyText] = useState('{\n  "requestId": "req_' + Math.random().toString(36).substring(2, 8) + '",\n  "timestamp": "' + new Date().toISOString() + '"\n}');
  const [executing, setExecuting] = useState(false);
  const [responseLog, setResponseLog] = useState<any>(null);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (selectedEndpointId) {
      const ep = ENDPOINTS.find(e => e.path === selectedEndpointId || e.summary === selectedEndpointId);
      if (ep) setSelectedEndpoint(ep);
    }
  }, [selectedEndpointId]);

  const handleExecute = async () => {
    setExecuting(true);
    try {
      let parsedBody: any = null;
      if (['POST', 'PUT', 'PATCH'].includes(selectedEndpoint.method)) {
        try {
          parsedBody = JSON.parse(bodyText);
        } catch {
          parsedBody = bodyText;
        }
      }

      const log = await workbenchSdk.execute({
        specId: 'iam-token-management-partner-oauth2',
        path: selectedEndpoint.path,
        method: selectedEndpoint.method as any,
        headers,
        params,
        body: parsedBody,
        mockFallback: {
          spec: 'IAM TokenManagement Partner OAuth2',
          status: 'SUCCESS',
          endpoint: selectedEndpoint.method + ' ' + selectedEndpoint.path,
          timestamp: new Date().toISOString(),
          referenceId: 'VDP_' + Math.random().toString(36).substring(2, 9).toUpperCase(),
          data: {
            service: 'IAM TokenManagement Partner OAuth2',
            category: 'Risk & Identity',
            message: 'Endpoint invocation processed successfully by Workbench runtime.',
            appliedParameters: params,
            metrics: {
              validationCode: '00',
              approvalIndicator: 'A',
              networkLatencyMs: Math.floor(Math.random() * 35) + 20
            }
          }
        }
      });
      setResponseLog(log);
      if (onExecute) onExecute(selectedEndpoint, { params, headers, body: parsedBody });
    } catch (err: any) {
      console.error(err);
    } finally {
      setExecuting(false);
    }
  };

  const getCurlSnippet = () => {
    const env = workbenchSdk.getEnvironment();
    let url = env.baseUrl.replace(/\/$/, '') + selectedEndpoint.path;
    Object.entries(params).forEach(([k, v]) => {
      url = url.replace('{' + k + '}', encodeURIComponent(v));
    });
    let cmd = `curl -X ${selectedEndpoint.method} "${url}"`;
    cmd += ` \\\n  -H "Accept: application/json"`;
    if (env.apiKey) cmd += ` \\\n  -H "X-Api-Key: ${env.apiKey}"`;
    if (['POST', 'PUT', 'PATCH'].includes(selectedEndpoint.method)) {
      cmd += ` \\\n  -H "Content-Type: application/json"`;
      cmd += ` \\\n  -d '${bodyText.replace(/\n/g, '')}'`;
    }
    return cmd;
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const methodColor = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      case 'POST': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'PUT': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'DELETE': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="flex flex-col h-full bg-slate-950 text-slate-100 font-sans select-none">
      {/* Spec Header */}
      <div className="border-b border-slate-800 bg-slate-900/60 px-6 py-4 flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2">
            <span className="text-xs font-mono font-medium text-emerald-400 uppercase tracking-wider">Risk & Identity</span>
            <span className="text-slate-600">·</span>
            <span className="text-xs font-mono text-slate-400">OPENAPI</span>
            <span className="text-slate-600">·</span>
            <span className="text-xs text-slate-400">5 Endpoints</span>
          </div>
          <h2 className="text-xl font-semibold text-white tracking-tight mt-0.5">IAM TokenManagement Partner OAuth2</h2>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">Interactive API execution interface.</p>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleExecute}
            disabled={executing}
            className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-xs font-medium transition shadow-sm cursor-pointer"
          >
            {executing ? (
              <>
                <RefreshCw className="w-3.5 h-3.5 animate-spin" />
                Executing...
              </>
            ) : (
              <>
                <Play className="w-3.5 h-3.5 fill-current" />
                Run Endpoint
              </>
            )}
          </button>
        </div>
      </div>

      {/* Main Split Grid */}
      <div className="flex-1 grid grid-cols-12 min-h-0 overflow-hidden">
        {/* Left: Endpoint Navigation */}
        <div className="col-span-4 border-r border-slate-800 overflow-y-auto bg-slate-950/70 p-3 space-y-1">
          <div className="px-2 py-1 text-[11px] font-semibold text-slate-400 uppercase tracking-wider">
            Endpoints
          </div>
          {ENDPOINTS.map((ep, idx) => {
            const isSelected = selectedEndpoint.path === ep.path && selectedEndpoint.method === ep.method;
            return (
              <button
                key={idx}
                onClick={() => setSelectedEndpoint(ep)}
                className={`w-full text-left p-2.5 rounded-lg border transition flex flex-col gap-1 cursor-pointer ${
                  isSelected 
                    ? 'bg-slate-800/90 border-slate-700 shadow-sm' 
                    : 'bg-slate-900/30 border-transparent hover:bg-slate-900/70 hover:border-slate-800'
                }`}
              >
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded border ${methodColor(ep.method)}`}>
                    {ep.method}
                  </span>
                  <span className="font-mono text-xs text-slate-200 truncate flex-1">{ep.path}</span>
                </div>
                <div className="text-[11px] text-slate-400 truncate pl-1">{ep.summary}</div>
              </button>
            );
          })}
        </div>

        {/* Center: Request Config & Payload */}
        <div className="col-span-4 border-r border-slate-800 flex flex-col min-h-0 bg-slate-900/20">
          {/* Endpoint Summary Bar */}
          <div className="p-3 border-b border-slate-800 bg-slate-900/40 flex items-center gap-2">
            <span className={`text-xs font-mono font-semibold px-2 py-0.5 rounded border ${methodColor(selectedEndpoint.method)}`}>
              {selectedEndpoint.method}
            </span>
            <span className="font-mono text-xs text-slate-200 truncate flex-1">{selectedEndpoint.path}</span>
          </div>

          {/* Request Tabs */}
          <div className="flex border-b border-slate-800 bg-slate-950 px-3 text-xs">
            {(['params', 'headers', 'body', 'curl'] as const).map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-3 py-2 border-b-2 font-medium capitalize transition cursor-pointer ${
                  activeTab === tab
                    ? 'border-emerald-500 text-white'
                    : 'border-transparent text-slate-400 hover:text-slate-200'
                }`}
              >
                {tab === 'curl' ? 'cURL' : tab}
              </button>
            ))}
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-4 overflow-y-auto font-mono text-xs">
            {activeTab === 'params' && (
              <div className="space-y-3 font-sans">
                <div className="text-xs text-slate-400">Path & Query Parameters</div>
                {selectedEndpoint.path.includes('{') ? (
                  <div className="space-y-2">
                    {selectedEndpoint.path.match(/\{([^}]+)\}/g)?.map((p, i) => {
                      const paramName = p.replace(/[{}]/g, '');
                      return (
                        <div key={i} className="flex flex-col gap-1">
                          <label className="text-xs font-mono text-slate-300">{paramName}</label>
                          <input
                            type="text"
                            placeholder={"Enter " + paramName}
                            value={params[paramName] || ''}
                            onChange={e => setParams({ ...params, [paramName]: e.target.value })}
                            className="bg-slate-950 border border-slate-800 rounded px-2.5 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
                          />
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div className="text-xs text-slate-500 italic py-2">No path parameters required for this endpoint.</div>
                )}
                
                <div className="pt-2 border-t border-slate-800 space-y-2">
                  <div className="text-xs text-slate-400">Query Parameters</div>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="text"
                      placeholder="limit"
                      className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-100"
                      onChange={e => setParams({ ...params, limit: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="page"
                      className="bg-slate-950 border border-slate-800 rounded px-2 py-1 text-xs text-slate-100"
                      onChange={e => setParams({ ...params, page: e.target.value })}
                    />
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'headers' && (
              <div className="space-y-2 font-mono">
                {Object.entries(headers).map(([k, v], idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-950 p-2 rounded border border-slate-800">
                    <span className="text-slate-400 text-xs w-28 truncate">{k}:</span>
                    <span className="text-slate-200 text-xs flex-1 truncate">{v}</span>
                  </div>
                ))}
                <div className="text-[11px] text-slate-500 pt-2 font-sans">
                  Environment headers (API Key, Mutual TLS certificates) are injected automatically at execution time.
                </div>
              </div>
            )}

            {activeTab === 'body' && (
              <div className="h-full flex flex-col">
                <textarea
                  value={bodyText}
                  onChange={e => setBodyText(e.target.value)}
                  disabled={selectedEndpoint.method === 'GET'}
                  className="flex-1 w-full bg-slate-950 border border-slate-800 rounded p-2.5 text-xs text-emerald-400 font-mono resize-none focus:outline-none focus:border-emerald-500"
                  placeholder={selectedEndpoint.method === 'GET' ? 'Body not applicable for GET requests' : 'Enter JSON payload'}
                />
              </div>
            )}

            {activeTab === 'curl' && (
              <div className="h-full flex flex-col">
                <div className="flex justify-end mb-2">
                  <button
                    onClick={() => copyToClipboard(getCurlSnippet())}
                    className="flex items-center gap-1.5 px-2 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-xs transition cursor-pointer"
                  >
                    {copied ? <Check className="w-3 h-3 text-emerald-400" /> : <Copy className="w-3 h-3" />}
                    {copied ? 'Copied!' : 'Copy cURL'}
                  </button>
                </div>
                <pre className="flex-1 bg-slate-950 border border-slate-800 rounded p-3 text-xs text-slate-300 font-mono overflow-auto whitespace-pre-wrap">
                  {getCurlSnippet()}
                </pre>
              </div>
            )}
          </div>
        </div>

        {/* Right: Response Inspector */}
        <div className="col-span-4 flex flex-col min-h-0 bg-slate-950">
          <div className="p-3 border-b border-slate-800 bg-slate-900/40 flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-300">Live Response</span>
            {responseLog && (
              <div className="flex items-center gap-2">
                <span className="text-[11px] font-mono px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
                  {responseLog.status} {responseLog.statusText.split(' ')[0]}
                </span>
                <span className="text-[11px] font-mono text-slate-400">
                  {responseLog.latencyMs}ms
                </span>
              </div>
            )}
          </div>

          <div className="flex-1 p-4 overflow-y-auto font-mono text-xs">
            {responseLog ? (
              <div className="space-y-3">
                <div className="flex items-center justify-between text-slate-500 text-[11px]">
                  <span>Executed at {responseLog.timestamp}</span>
                  <button
                    onClick={() => copyToClipboard(JSON.stringify(responseLog.responseData, null, 2))}
                    className="flex items-center gap-1 hover:text-slate-300 transition cursor-pointer"
                  >
                    <Copy className="w-3 h-3" />
                    Copy Payload
                  </button>
                </div>
                <pre className="bg-slate-900/80 border border-slate-800 rounded-lg p-3 text-emerald-300 overflow-x-auto whitespace-pre leading-relaxed">
                  {JSON.stringify(responseLog.responseData, null, 2)}
                </pre>
              </div>
            ) : (
              <div className="h-full flex flex-col items-center justify-center text-center text-slate-500 p-6 space-y-2">
                <Terminal className="w-8 h-8 stroke-1 text-slate-600" />
                <p className="text-xs font-sans">Ready to execute.</p>
                <p className="text-[11px] text-slate-600 font-sans max-w-xs">
                  Click <span className="text-slate-400 font-mono">Run Endpoint</span> to trigger request dispatch through the workbench client.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
