import React, { useState, useMemo } from 'react';
import { 
  BookOpen, Search, Shield, Key, Terminal, Code2, Copy, Check, 
  ExternalLink, ChevronRight, ChevronDown, Play, FileCode, Layers, 
  AlertTriangle, Info, CheckCircle2, Globe, ArrowUpRight, Cpu, Lock, 
  Zap, Database, Sparkles, Hash, ArrowRight
} from 'lucide-react';
import { SPEC_REGISTRY_LIST } from '../../generated/components/specs/SpecComponentRegistry';
import catalogData from '../../generated/components/data/workbench-catalog.json';
import { workbenchSdk } from '../../generated/configs/api-clients';
import { ENDPOINT_SAMPLES_MAP } from '../../generated/components/data/endpoint-samples';

interface ApiDocumentationPortalProps {
  onOpenInRunner?: (specId: string, endpointId?: string) => void;
}

type CodeLang = 'curl' | 'typescript' | 'python' | 'go' | 'java';

export const ApiDocumentationPortal: React.FC<ApiDocumentationPortalProps> = ({ onOpenInRunner }) => {
  // Navigation: either a guide id or a specId::endpointPath
  const [selectedDocId, setSelectedDocId] = useState<string>('guide-overview');
  const [selectedLang, setSelectedLang] = useState<CodeLang>('curl');
  const [searchQuery, setSearchQuery] = useState('');
  const [copied, setCopied] = useState(false);
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    'getting-started': true,
    'security': true,
    'transactions': true,
    'card-account': true,
    'issuing': true,
    'digital': true,
    'risk': true,
    'virtual-cards': true,
    'broker': true,
    'open-banking': true,
    'corporate': true,
    'rewards': true,
    'schemas': true
  });

  const toggleSection = (sec: string) => {
    setExpandedSections(prev => ({ ...prev, [sec]: !prev[sec] }));
  };

  const copyCode = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  // Build flattened endpoint list for reference docs
  const allEndpoints = useMemo(() => {
    const list: any[] = [];
    (catalogData.specs || []).forEach(spec => {
      if (spec.endpoints) {
        spec.endpoints.forEach((ep: any) => {
          list.push({
            id: `${spec.id}::${ep.path}::${ep.method}`,
            specId: spec.id,
            specTitle: spec.title,
            category: spec.category,
            method: ep.method,
            path: ep.path,
            summary: ep.summary,
            componentName: spec.componentName
          });
        });
      }
    });
    return list;
  }, []);

  const filteredEndpoints = useMemo(() => {
    if (!searchQuery.trim()) return allEndpoints;
    const q = searchQuery.toLowerCase();
    return allEndpoints.filter(ep => 
      ep.path.toLowerCase().includes(q) ||
      ep.summary.toLowerCase().includes(q) ||
      ep.specTitle.toLowerCase().includes(q) ||
      ep.category.toLowerCase().includes(q)
    );
  }, [allEndpoints, searchQuery]);

  // Determine current active doc
  const currentEndpoint = allEndpoints.find(e => e.id === selectedDocId);
  const currentSpec = catalogData.specs.find(s => s.id === selectedDocId);

  // Generate multi-language code snippets
  const generateSnippet = (ep: any, lang: CodeLang): string => {
    const env = workbenchSdk.getEnvironment();
    let url = `${env.baseUrl}${ep.path}`;
    const sample = ENDPOINT_SAMPLES_MAP[ep.id] || ENDPOINT_SAMPLES_MAP[ep.path + '::' + ep.method] || ENDPOINT_SAMPLES_MAP[ep.path];
    
    // Interpolate path params if any
    if (sample?.sampleParams) {
      Object.entries(sample.sampleParams).forEach(([k, v]) => {
        url = url.replace(`{${k}}`, String(v));
      });
    }

    const payloadObj = sample?.sampleBody || {
      requestTimestamp: new Date().toISOString(),
      channel: 'API_CLIENT_VDP'
    };
    const payloadStr = JSON.stringify(payloadObj, null, 2);

    if (lang === 'curl') {
      let cmd = `curl -X ${ep.method} "${url}" \\\n  -H "Accept: application/json" \\\n  -H "X-Api-Key: ${env.apiKey || 'YOUR_API_KEY'}"`;
      if (['POST', 'PUT', 'PATCH'].includes(ep.method)) {
        cmd += ` \\\n  -H "Content-Type: application/json" \\\n  -d '${JSON.stringify(payloadObj)}'`;
      }
      return cmd;
    }

    if (lang === 'typescript') {
      return `import axios from 'axios';

async function execute${ep.method.toLowerCase().replace(/^\w/, (c: string) => c.toUpperCase())}Endpoint() {
  const url = '${url}';
  const headers = {
    'Accept': 'application/json',
    'X-Api-Key': process.env.VDP_API_KEY || '${env.apiKey}',
    'X-Origin-Workbench': 'v2.4'
  };

  try {
    const response = await axios({
      method: '${ep.method}',
      url,
      headers,
      ${['POST', 'PUT', 'PATCH'].includes(ep.method) ? `data: ${payloadStr}` : ''}
    });
    console.log('Status:', response.status);
    console.log('Payload:', response.data);
  } catch (error: any) {
    console.error('API Error:', error.response?.data || error.message);
  }
}

execute${ep.method.toLowerCase().replace(/^\w/, (c: string) => c.toUpperCase())}Endpoint();`;
    }

    if (lang === 'python') {
      return `import requests
import os
import json

url = "${url}"
headers = {
    "Accept": "application/json",
    "X-Api-Key": os.getenv("VDP_API_KEY", "${env.apiKey}"),
    "Content-Type": "application/json"
}

${['POST', 'PUT', 'PATCH'].includes(ep.method) ? `payload = ${payloadStr}

response = requests.${ep.method.toLowerCase()}(url, headers=headers, json=payload)` : `response = requests.${ep.method.toLowerCase()}(url, headers=headers)`}

print(f"Status: {response.status_code}")
print(json.dumps(response.json(), indent=2))`;
    }

    if (lang === 'go') {
      return `package main

import (
    "bytes"
    "fmt"
    "io"
    "net/http"
    "time"
)

func main() {
    url := "${url}"
    ${['POST', 'PUT', 'PATCH'].includes(ep.method) ? `payload := []byte(\`${JSON.stringify(payloadObj)}\`)
    req, err := http.NewRequest("${ep.method}", url, bytes.NewBuffer(payload))` : `req, err := http.NewRequest("${ep.method}", url, nil)`}
    if err != nil {
        panic(err)
    }

    req.Header.Set("Accept", "application/json")
    req.Header.Set("X-Api-Key", "${env.apiKey}")
    req.Header.Set("Content-Type", "application/json")

    client := &http.Client{Timeout: 10 * time.Second}
    resp, err := client.Do(req)
    if err != nil {
        panic(err)
    }
    defer resp.Body.Close()

    body, _ := io.ReadAll(resp.Body)
    fmt.Printf("Status: %d\\nResponse: %s\\n", resp.StatusCode, string(body))
}`;
    }

    if (lang === 'java') {
      return `import java.net.URI;
import java.net.http.HttpClient;
import java.net.http.HttpRequest;
import java.net.http.HttpResponse;
import java.time.Duration;

public class VdpApiExample {
    public static void main(String[] args) throws Exception {
        HttpClient client = HttpClient.newBuilder()
            .connectTimeout(Duration.ofSeconds(10))
            .build();

        HttpRequest request = HttpRequest.newBuilder()
            .uri(URI.create("${url}"))
            .header("Accept", "application/json")
            .header("X-Api-Key", "${env.apiKey}")
            ${['POST', 'PUT', 'PATCH'].includes(ep.method) ? `.header("Content-Type", "application/json")
            .method("${ep.method}", HttpRequest.BodyPublishers.ofString(${JSON.stringify(JSON.stringify(payloadObj))}))` : `.method("${ep.method}", HttpRequest.BodyPublishers.noBody())`}
            .build();

        HttpResponse<String> response = client.send(request, HttpResponse.BodyHandlers.ofString());
        System.out.println("Status: " + response.statusCode());
        System.out.println("Response: " + response.body());
    }
}`;
    }

    return '';
  };

  const methodBadge = (method: string) => {
    switch (method) {
      case 'GET': return 'bg-sky-500/10 text-sky-400 border-sky-500/20';
      case 'POST': return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'PUT': return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      case 'DELETE': return 'bg-rose-500/10 text-rose-400 border-rose-500/20';
      default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
  };

  return (
    <div className="flex h-full w-full bg-slate-950 text-slate-100 font-sans select-none overflow-hidden">
      {/* Sidebar Navigation */}
      <aside className="w-72 border-r border-slate-800 bg-slate-950 flex flex-col min-h-0 shrink-0">
        {/* Search Input */}
        <div className="p-3 border-b border-slate-800">
          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-2.5 top-2.5 text-slate-400" />
            <input
              type="text"
              placeholder="Search documentation & APIs..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 rounded-lg pl-8 pr-3 py-1.5 text-xs text-slate-100 focus:outline-none focus:border-emerald-500"
            />
          </div>
        </div>

        {/* Tree of guides and specs */}
        <div className="flex-1 overflow-y-auto p-3 space-y-4 text-xs">
          {/* Architecture & Guides */}
          <div className="space-y-1">
            <button
              onClick={() => toggleSection('getting-started')}
              className="w-full flex items-center justify-between text-slate-400 uppercase tracking-wider font-semibold text-[11px] py-1 px-1 cursor-pointer hover:text-slate-200"
            >
              <span>Getting Started</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedSections['getting-started'] ? '' : '-rotate-90'}`} />
            </button>

            {expandedSections['getting-started'] && (
              <div className="space-y-0.5 pl-2">
                {[
                  { id: 'guide-overview', label: 'Platform Architecture' },
                  { id: 'guide-quickstart', label: '10-Minute Quickstart' },
                  { id: 'guide-environments', label: 'Environments & Gateways' },
                  { id: 'guide-errors', label: 'Error Codes & ISO 8583' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedDocId(item.id)}
                    className={`w-full text-left px-2 py-1.5 rounded transition cursor-pointer flex items-center gap-2 ${
                      selectedDocId === item.id
                        ? 'bg-slate-800 text-emerald-400 font-medium'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    <BookOpen className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Security & Authentication */}
          <div className="space-y-1">
            <button
              onClick={() => toggleSection('security')}
              className="w-full flex items-center justify-between text-slate-400 uppercase tracking-wider font-semibold text-[11px] py-1 px-1 cursor-pointer hover:text-slate-200"
            >
              <span>Security & Auth</span>
              <ChevronDown className={`w-3.5 h-3.5 transition-transform ${expandedSections['security'] ? '' : '-rotate-90'}`} />
            </button>

            {expandedSections['security'] && (
              <div className="space-y-0.5 pl-2">
                {[
                  { id: 'guide-mtls', label: 'Mutual TLS (Two-Way SSL)' },
                  { id: 'guide-xpaytoken', label: 'X-Pay-Token HMAC-SHA256' },
                  { id: 'guide-oauth2', label: 'OAuth 2.0 PKCE Flow' },
                  { id: 'guide-webhooks', label: 'Webhook Signature Verify' }
                ].map(item => (
                  <button
                    key={item.id}
                    onClick={() => setSelectedDocId(item.id)}
                    className={`w-full text-left px-2 py-1.5 rounded transition cursor-pointer flex items-center gap-2 ${
                      selectedDocId === item.id
                        ? 'bg-slate-800 text-emerald-400 font-medium'
                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                    }`}
                  >
                    <Shield className="w-3.5 h-3.5 shrink-0 opacity-70" />
                    <span className="truncate">{item.label}</span>
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* API Endpoints Categorized */}
          <div className="space-y-2">
            <div className="text-slate-400 uppercase tracking-wider font-semibold text-[11px] px-1 pt-2 border-t border-slate-800">
              API Reference ({filteredEndpoints.length})
            </div>

            {catalogData.categories.map((cat: string) => {
              const catEndpoints = filteredEndpoints.filter(e => e.category === cat);
              if (catEndpoints.length === 0) return null;
              const isExpanded = expandedSections[cat] ?? true;

              return (
                <div key={cat} className="space-y-1">
                  <button
                    onClick={() => toggleSection(cat)}
                    className="w-full flex items-center justify-between text-slate-300 font-medium text-xs py-1 px-1 cursor-pointer hover:text-white"
                  >
                    <span className="truncate">{cat}</span>
                    <ChevronDown className={`w-3 h-3 text-slate-500 transition-transform ${isExpanded ? '' : '-rotate-90'}`} />
                  </button>

                  {isExpanded && (
                    <div className="space-y-0.5 pl-1.5 border-l border-slate-800">
                      {catEndpoints.map(ep => {
                        const isSelected = selectedDocId === ep.id;
                        return (
                          <button
                            key={ep.id}
                            onClick={() => setSelectedDocId(ep.id)}
                            className={`w-full text-left px-2 py-1.5 rounded transition cursor-pointer flex items-center gap-1.5 ${
                              isSelected
                                ? 'bg-slate-800 text-white font-medium shadow-sm ring-1 ring-slate-700'
                                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/50'
                            }`}
                          >
                            <span className={`text-[9px] font-mono px-1 py-0.2 rounded border shrink-0 ${methodBadge(ep.method)}`}>
                              {ep.method}
                            </span>
                            <span className="font-mono text-[11px] truncate flex-1">{ep.path}</span>
                          </button>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </aside>

      {/* Main Documentation Center Pane */}
      <main className="flex-1 flex min-h-0 overflow-hidden bg-slate-950">
        {/* Left Column: Documentation Content */}
        <div className="flex-1 overflow-y-auto p-8 max-w-3xl min-h-0">
          {/* Documentation Guides */}
          {selectedDocId === 'guide-overview' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Architecture Overview</span>
                <h1 className="text-3xl font-bold text-white tracking-tight mt-1">Visa Developer Platform Workbench</h1>
                <p className="text-sm text-slate-300 mt-2 leading-relaxed">
                  The Developer Workbench provides programmatic access to VisaNet clearing rails, tokenization infrastructure, dispute management, debit processing services, and open banking aggregations.
                </p>
              </div>

              <div className="p-4 bg-slate-900/80 border border-slate-800 rounded-xl space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-semibold text-xs">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Production SLA & Reliability</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  All REST endpoints are deployed across multi-region active-active clusters with dual-datacenter synchronization, sub-45ms execution latency, and automated ISO 8583 dual-message clearing reconciliation.
                </p>
              </div>

              <div className="space-y-3">
                <h2 className="text-lg font-semibold text-white">Catalog Capabilities</h2>
                <div className="grid grid-cols-2 gap-3 text-xs">
                  <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-lg">
                    <span className="font-semibold text-slate-200 block mb-1">Direct VisaNet Connectivity</span>
                    <span className="text-slate-400">Low-latency dual-message transaction routing (0100 auth, 0200 clearing, 0400 reversal).</span>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-lg">
                    <span className="font-semibold text-slate-200 block mb-1">Visa Token Service (VTS)</span>
                    <span className="text-slate-400">Card tokenization, cryptographic TAVV payload verification, and device-bound passkeys.</span>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-lg">
                    <span className="font-semibold text-slate-200 block mb-1">Open Banking & Aggregation</span>
                    <span className="text-slate-400">Finicity direct bank verification of assets (VOA), income (VOI), and continuous data feeds.</span>
                  </div>
                  <div className="p-3 bg-slate-900/40 border border-slate-800 rounded-lg">
                    <span className="font-semibold text-slate-200 block mb-1">ISO 20022 XML Schemas</span>
                    <span className="text-slate-400">Enterprise XML complex types and groups standardized across cross-border financial systems.</span>
                  </div>
                </div>
              </div>

              <div className="pt-4 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-slate-500">Next Step</span>
                <button
                  onClick={() => setSelectedDocId('guide-quickstart')}
                  className="flex items-center gap-1.5 text-emerald-400 hover:text-emerald-300 font-medium cursor-pointer"
                >
                  Read 10-Minute Quickstart
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          )}

          {selectedDocId === 'guide-quickstart' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Quickstart</span>
                <h1 className="text-3xl font-bold text-white tracking-tight mt-1">10-Minute Integration Guide</h1>
                <p className="text-sm text-slate-300 mt-2">
                  Follow these steps to authenticate, issue your first sandbox request, and handle the response payload.
                </p>
              </div>

              <div className="space-y-4 text-xs text-slate-300">
                <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-slate-100">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-xs">1</span>
                    Select your Target Environment
                  </div>
                  <p className="text-slate-400 pl-7">
                    Use the sandbox environment at <code className="text-emerald-400 bg-slate-950 px-1 py-0.5 rounded font-mono">https://sandbox.api.visa.com</code> with standard test card credentials and zero financial liability.
                  </p>
                </div>

                <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-slate-100">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-xs">2</span>
                    Provide Authentication Headers
                  </div>
                  <p className="text-slate-400 pl-7">
                    Each request requires an <code className="text-emerald-400 font-mono">X-Api-Key</code> or an HMAC-SHA256 signature in the <code className="text-emerald-400 font-mono">X-PAY-TOKEN</code> header.
                  </p>
                </div>

                <div className="p-4 bg-slate-900/60 border border-slate-800 rounded-lg space-y-2">
                  <div className="flex items-center gap-2 font-semibold text-slate-100">
                    <span className="w-5 h-5 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-mono text-xs">3</span>
                    Inspect Response & Audit Logs
                  </div>
                  <p className="text-slate-400 pl-7">
                    Responses return standard HTTP status codes with an ISO 8583 response code inside the JSON payload (<code className="text-emerald-400 font-mono">00</code> indicates transaction approval).
                  </p>
                </div>
              </div>
            </div>
          )}

          {selectedDocId === 'guide-environments' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Infrastructure</span>
                <h1 className="text-3xl font-bold text-white tracking-tight mt-1">Environments & Gateways</h1>
                <p className="text-sm text-slate-300 mt-2">
                  The workbench connects to four distinct tiers depending on your stage of development and certification.
                </p>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: 'Sandbox (Default)',
                    url: 'https://sandbox.api.visa.com',
                    desc: 'Isolated testing environment with simulated ledger balances, synthetic cards, and automated approval mocks.',
                    auth: 'API Key or Two-Way SSL Certificate',
                    latency: '< 30ms'
                  },
                  {
                    name: 'Certification (CTE / VTS)',
                    url: 'https://cert.api.visa.com',
                    desc: 'Formal client testing environment for end-to-end issuer certification and network brand approvals.',
                    auth: 'Two-Way SSL / Mutual TLS + Client IP Allowlist',
                    latency: '< 45ms'
                  },
                  {
                    name: 'Production (Live)',
                    url: 'https://api.visa.com',
                    desc: 'High-availability global edge network routing real transactions across VisaNet banking members.',
                    auth: 'Two-Way SSL (mTLS) + HSM Key Attestation',
                    latency: '< 25ms'
                  }
                ].map((env, i) => (
                  <div key={i} className="p-4 bg-slate-900/70 border border-slate-800 rounded-xl space-y-2 text-xs">
                    <div className="flex items-center justify-between">
                      <span className="font-semibold text-white text-sm">{env.name}</span>
                      <span className="font-mono text-slate-500">{env.latency} SLA</span>
                    </div>
                    <div className="font-mono text-emerald-400 bg-slate-950 p-2 rounded border border-slate-800">
                      {env.url}
                    </div>
                    <p className="text-slate-400">{env.desc}</p>
                    <div className="text-[11px] text-slate-500 pt-1 border-t border-slate-800/60">
                      Auth Requirement: <span className="text-slate-300">{env.auth}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {selectedDocId === 'guide-mtls' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Security Architecture</span>
                <h1 className="text-3xl font-bold text-white tracking-tight mt-1">Mutual TLS (Two-Way SSL)</h1>
                <p className="text-sm text-slate-300 mt-2">
                  Production and Certification gateways enforce Mutual TLS 1.3 to guarantee cryptographic identity and non-repudiation.
                </p>
              </div>

              <div className="p-4 bg-amber-500/10 border border-amber-500/20 rounded-xl flex items-start gap-3 text-xs text-amber-200">
                <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
                <div>
                  <span className="font-semibold block mb-0.5">Certificate Security Notice</span>
                  Private keys must be 2048-bit or 4096-bit RSA or ECDSA-P256 and never committed to client-side bundles.
                </div>
              </div>

              <div className="space-y-3 text-xs">
                <h3 className="font-semibold text-white">Handshake Sequence</h3>
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono space-y-2 text-slate-300">
                  <div>1. Client initiates TLS 1.3 handshake to api.visa.com:443</div>
                  <div>2. Visa Edge Gateway presents X.509 server certificate (DigiCert CA)</div>
                  <div>3. Gateway sends <code className="text-amber-400">CertificateRequest</code> with permitted DNs</div>
                  <div>4. Client transmits client certificate and signs <code className="text-amber-400">CertificateVerify</code></div>
                  <div>5. TLS session key established with forward secrecy</div>
                </div>
              </div>
            </div>
          )}

          {selectedDocId === 'guide-xpaytoken' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Authentication Protocol</span>
                <h1 className="text-3xl font-bold text-white tracking-tight mt-1">X-Pay-Token HMAC-SHA256</h1>
                <p className="text-sm text-slate-300 mt-2">
                  X-Pay-Token provides stateless message integrity verification without requiring client certificates in environments like lightweight containers or serverless runtimes.
                </p>
              </div>

              <div className="space-y-3 text-xs">
                <h3 className="font-semibold text-white">Signature Computation Formula</h3>
                <pre className="bg-slate-950 p-4 rounded-xl border border-slate-800 font-mono text-emerald-300 text-xs overflow-x-auto leading-relaxed">
{`token = "xv2:" + timestamp + ":" + SHA256_HMAC(
  secret: sharedSecret,
  data: timestamp + resourcePath + queryString + requestBody
)`}
                </pre>
              </div>

              <div className="space-y-2 text-xs text-slate-400">
                <p>• <span className="text-slate-200 font-mono">timestamp</span>: UTC Unix epoch in seconds (must be within ±300s clock skew window).</p>
                <p>• <span className="text-slate-200 font-mono">resourcePath</span>: Path starting with slash, e.g. <code className="text-emerald-400 font-mono">/visadirect/v3/push-funds</code>.</p>
                <p>• <span className="text-slate-200 font-mono">queryString</span>: URL parameters sorted alphabetically, or empty string if none.</p>
              </div>
            </div>
          )}

          {selectedDocId === 'guide-errors' && (
            <div className="space-y-6">
              <div>
                <span className="text-xs font-mono text-emerald-400 uppercase tracking-wider">Error Reference</span>
                <h1 className="text-3xl font-bold text-white tracking-tight mt-1">Status Codes & ISO 8583 Response Codes</h1>
                <p className="text-sm text-slate-300 mt-2">
                  Standard response codes returned by Visa gateways, transaction acquirers, and issuer authorization processors.
                </p>
              </div>

              <div className="border border-slate-800 rounded-xl overflow-hidden text-xs">
                <table className="w-full text-left">
                  <thead className="bg-slate-900 border-b border-slate-800 text-slate-400 uppercase font-mono text-[10px]">
                    <tr>
                      <th className="p-3">ISO Code</th>
                      <th className="p-3">HTTP Status</th>
                      <th className="p-3">Description</th>
                      <th className="p-3">Remediation Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-800/80">
                    {[
                      { code: '00', http: 200, desc: 'Approved / Completed Successfully', action: 'Proceed with order fulfillment.' },
                      { code: '05', http: 200, desc: 'Do Not Honor / General Decline', action: 'Prompt cardholder for alternate payment method.' },
                      { code: '14', http: 200, desc: 'Invalid Card / Account Number', action: 'Validate PAN length and Luhn checksum.' },
                      { code: '51', http: 200, desc: 'Insufficient Funds', action: 'Advise customer to top up funds or select other card.' },
                      { code: '54', http: 200, desc: 'Expired Card', action: 'Request updated expiration date or update Card on File.' },
                      { code: '91', http: 504, desc: 'Issuer System Unavailable', action: 'Retry with exponential backoff or activate STIP.' },
                      { code: 'N/A', http: 401, desc: 'Unauthorized Gateway Access', action: 'Check API Key, Shared Secret, or client certificate.' },
                      { code: 'N/A', http: 429, desc: 'Rate Limit Exceeded', action: 'Throttle requests according to assigned tier TPS limit.' }
                    ].map((row, idx) => (
                      <tr key={idx} className="hover:bg-slate-900/40 font-mono text-xs">
                        <td className="p-3 font-semibold text-emerald-400">{row.code}</td>
                        <td className="p-3 text-slate-300">{row.http}</td>
                        <td className="p-3 text-slate-200 font-sans">{row.desc}</td>
                        <td className="p-3 text-slate-400 font-sans">{row.action}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}

          {/* Specific Endpoint Reference Documentation */}
          {currentEndpoint && (
            <div className="space-y-6">
              {/* Breadcrumb */}
              <div className="flex items-center gap-2 text-xs text-slate-500 font-mono">
                <span>API Reference</span>
                <span>/</span>
                <span>{currentEndpoint.category}</span>
                <span>/</span>
                <span className="text-slate-300 truncate">{currentEndpoint.specTitle}</span>
              </div>

              {/* Endpoint Header */}
              <div>
                <div className="flex items-center gap-3">
                  <span className={`text-xs font-mono font-bold px-2 py-0.5 rounded border ${methodBadge(currentEndpoint.method)}`}>
                    {currentEndpoint.method}
                  </span>
                  <span className="font-mono text-base font-semibold text-white">{currentEndpoint.path}</span>
                </div>
                <h1 className="text-2xl font-bold text-white tracking-tight mt-2">{currentEndpoint.summary}</h1>
                <p className="text-xs text-slate-400 mt-2 leading-relaxed">
                  Specification source: <span className="font-mono text-slate-300">{currentEndpoint.componentName}.tsx</span> within domain <span className="text-emerald-400">{currentEndpoint.category}</span>.
                </p>
              </div>

              {/* Action Toolbar */}
              <div className="flex items-center gap-3 pt-2">
                {onOpenInRunner && (
                  <button
                    onClick={() => onOpenInRunner(currentEndpoint.specId, currentEndpoint.path)}
                    className="flex items-center gap-2 px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-semibold transition cursor-pointer shadow-sm"
                  >
                    <Play className="w-3.5 h-3.5 fill-current" />
                    Try in Spec Runner
                  </button>
                )}
                <span className="text-xs text-slate-500">Live sandbox execution with telemetry logging</span>
              </div>

              {/* Request Parameters Section */}
              <div className="space-y-4 pt-4 border-t border-slate-800">
                <h3 className="text-sm font-semibold text-white">Request Headers</h3>
                <div className="border border-slate-800 rounded-lg overflow-hidden text-xs">
                  <table className="w-full text-left">
                    <thead className="bg-slate-900 border-b border-slate-800 text-[10px] text-slate-400 font-mono uppercase">
                      <tr>
                        <th className="p-2.5">Header Name</th>
                        <th className="p-2.5">Type</th>
                        <th className="p-2.5">Required</th>
                        <th className="p-2.5">Description</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-800 font-mono text-xs">
                      <tr>
                        <td className="p-2.5 text-slate-200">Accept</td>
                        <td className="p-2.5 text-slate-400">string</td>
                        <td className="p-2.5 text-rose-400 font-sans">Yes</td>
                        <td className="p-2.5 text-slate-300 font-sans">application/json</td>
                      </tr>
                      <tr>
                        <td className="p-2.5 text-slate-200">X-Api-Key</td>
                        <td className="p-2.5 text-slate-400">string</td>
                        <td className="p-2.5 text-rose-400 font-sans">Yes</td>
                        <td className="p-2.5 text-slate-300 font-sans">Provisioned developer portal project API key.</td>
                      </tr>
                      {['POST', 'PUT', 'PATCH'].includes(currentEndpoint.method) && (
                        <tr>
                          <td className="p-2.5 text-slate-200">Content-Type</td>
                          <td className="p-2.5 text-slate-400">string</td>
                          <td className="p-2.5 text-rose-400 font-sans">Yes</td>
                          <td className="p-2.5 text-slate-300 font-sans">application/json; charset=UTF-8</td>
                        </tr>
                      )}
                      <tr>
                        <td className="p-2.5 text-slate-200">X-Correlation-Id</td>
                        <td className="p-2.5 text-slate-400">UUID</td>
                        <td className="p-2.5 text-slate-500 font-sans">Optional</td>
                        <td className="p-2.5 text-slate-300 font-sans">End-to-end tracing identifier for multi-hop payment routing.</td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* Path Parameters if present */}
                {currentEndpoint.path.includes('{') && (
                  <div className="space-y-2 pt-2">
                    <h3 className="text-sm font-semibold text-white">Path Parameters</h3>
                    <div className="border border-slate-800 rounded-lg overflow-hidden text-xs">
                      <table className="w-full text-left">
                        <thead className="bg-slate-900 border-b border-slate-800 text-[10px] text-slate-400 font-mono uppercase">
                          <tr>
                            <th className="p-2.5">Parameter</th>
                            <th className="p-2.5">Type</th>
                            <th className="p-2.5">Description</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800 font-mono text-xs">
                          {currentEndpoint.path.match(/\{([^}]+)\}/g)?.map((p: string, idx: number) => {
                            const name = p.replace(/[{}]/g, '');
                            return (
                              <tr key={idx}>
                                <td className="p-2.5 text-emerald-400 font-semibold">{name}</td>
                                <td className="p-2.5 text-slate-400">string</td>
                                <td className="p-2.5 text-slate-300 font-sans">Target unique {name} identifier</td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  </div>
                )}

                {/* Response Code Section */}
                <div className="space-y-2 pt-2">
                  <h3 className="text-sm font-semibold text-white">Response Status Codes</h3>
                  <div className="grid grid-cols-2 gap-2 text-xs font-mono">
                    <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg flex items-center justify-between">
                      <span className="text-emerald-400 font-semibold">200 OK</span>
                      <span className="text-slate-400 font-sans">Request processed successfully</span>
                    </div>
                    <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg flex items-center justify-between">
                      <span className="text-amber-400 font-semibold">400 Bad Request</span>
                      <span className="text-slate-400 font-sans">Validation schema violation</span>
                    </div>
                    <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg flex items-center justify-between">
                      <span className="text-rose-400 font-semibold">401 Unauthorized</span>
                      <span className="text-slate-400 font-sans">Invalid credentials or expired signature</span>
                    </div>
                    <div className="p-2.5 bg-slate-900/60 border border-slate-800 rounded-lg flex items-center justify-between">
                      <span className="text-purple-400 font-semibold">429 Rate Limited</span>
                      <span className="text-slate-400 font-sans">Quota exceeded</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Right Column: Interactive ReadMe-Style Code Sandbox Pane */}
        {currentEndpoint && (
          <div className="w-[440px] border-l border-slate-800 bg-slate-900/40 flex flex-col min-h-0 shrink-0">
            {/* Language Switcher Bar */}
            <div className="p-3 border-b border-slate-800 bg-slate-900/80 flex items-center justify-between">
              <div className="flex items-center gap-1 bg-slate-950 p-1 rounded-lg border border-slate-800 text-[11px] font-mono">
                {(['curl', 'typescript', 'python', 'go', 'java'] as const).map(lang => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLang(lang)}
                    className={`px-2 py-0.5 rounded transition uppercase cursor-pointer ${
                      selectedLang === lang
                        ? 'bg-emerald-500/20 text-emerald-400 font-semibold'
                        : 'text-slate-400 hover:text-slate-200'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>

              <button
                onClick={() => copyCode(generateSnippet(currentEndpoint, selectedLang))}
                className="flex items-center gap-1 text-xs text-slate-400 hover:text-slate-200 transition cursor-pointer"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied' : 'Copy'}</span>
              </button>
            </div>

            {/* Code Body */}
            <div className="flex-1 p-3 overflow-y-auto font-mono text-xs">
              <pre className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-300 leading-relaxed overflow-x-auto whitespace-pre">
                {generateSnippet(currentEndpoint, selectedLang)}
              </pre>

              {/* Sample Response Box */}
              <div className="mt-4 space-y-2">
                <div className="flex items-center justify-between text-xs">
                  <span className="font-sans font-semibold text-slate-400">Sample Response (200 OK)</span>
                  <span className="font-mono text-[11px] text-emerald-400">28ms</span>
                </div>
                <pre className="bg-slate-950 border border-slate-800 rounded-lg p-3 text-emerald-400 text-xs overflow-x-auto leading-relaxed">
{JSON.stringify(
  ENDPOINT_SAMPLES_MAP[currentEndpoint.id]?.sampleResponse ||
  ENDPOINT_SAMPLES_MAP[currentEndpoint.path + '::' + currentEndpoint.method]?.sampleResponse ||
  ENDPOINT_SAMPLES_MAP[currentEndpoint.path]?.sampleResponse || {
    status: "SUCCESS",
    responseCode: "00",
    approvalCode: "APPR_883192",
    timestamp: new Date().toISOString(),
    data: {
      service: currentEndpoint.specTitle,
      endpoint: `${currentEndpoint.method} ${currentEndpoint.path}`,
      transactionReference: "REF_" + Math.random().toString(36).substring(2, 9).toUpperCase()
    }
  }, null, 2)}
                </pre>
              </div>
            </div>

            {/* Direct Jump Footer */}
            {onOpenInRunner && (
              <div className="p-3 border-t border-slate-800 bg-slate-950 flex items-center justify-between">
                <span className="text-[11px] text-slate-500 font-sans">Ready to test live?</span>
                <button
                  onClick={() => onOpenInRunner(currentEndpoint.specId, currentEndpoint.path)}
                  className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded text-xs font-medium transition cursor-pointer"
                >
                  <Play className="w-3 h-3 fill-current" />
                  Open in Runner
                </button>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
};
