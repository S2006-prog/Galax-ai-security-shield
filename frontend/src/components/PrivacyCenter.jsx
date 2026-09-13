import React, { useState } from 'react';
import { 
  Lock, 
  ShieldCheck, 
  Trash2, 
  Check, 
  X, 
  RefreshCw, 
  Download, 
  ShieldAlert, 
  Sliders, 
  ExternalLink,
  History
} from 'lucide-react';

export default function PrivacyCenter({ 
  integrations = [], 
  onToggleIntegration, 
  onPurgeData,
  privacyData = null 
}) {
  const [purging, setPurging] = useState(false);
  const [purgeSuccess, setPurgeSuccess] = useState(false);

  const principles = privacyData?.principles || [
    {
      title: "Strict Least Privilege",
      badge: "Enforced",
      description: "GALAX only requests minimal scoped read access required to identify scam signatures. No write, send, delete, or management permissions are ever sought."
    },
    {
      title: "Zero Content Retention",
      badge: "Active",
      description: "Text, URLs, and image tokens evaluated in Local Shield are tokenized in volatile RAM and discarded post-analysis."
    },
    {
      title: "Granular User Control",
      badge: "1-Click Revoke",
      description: "Revoke OAuth access to any connected provider at any instant. Scoped access tokens are wiped immediately from memory."
    },
    {
      title: "Probabilistic Honesty",
      badge: "No False Claims",
      description: "GALAX evaluates multiple weighted forensic signals and provides confidence tiers. We never claim '100% scam proof'."
    }
  ];

  const accessLogs = privacyData?.access_logs || [
    {
      id: "priv-1",
      action: "Threat Signature Match (Local Shield)",
      details: "Heuristic tokenization executed purely in volatile memory. No text stored.",
      timestamp: "Just now",
      status: "Zero Data Retained"
    },
    {
      id: "priv-2",
      action: "Gmail Read-Only Threat Evaluation",
      details: "Scoped snippet scan inspected message #4912. No personal body content copied.",
      timestamp: "10 mins ago",
      status: "Least-Privilege Compliant"
    },
    {
      id: "priv-3",
      action: "Browser Sentinel URL Hash Check",
      details: "Queried local bloom filter for suspicious domain structure.",
      timestamp: "Yesterday",
      status: "Privacy Preserved"
    }
  ];

  const handlePurge = async () => {
    setPurging(true);
    await onPurgeData();
    setPurging(false);
    setPurgeSuccess(true);
    setTimeout(() => setPurgeSuccess(false), 3000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Lock className="w-3.5 h-3.5" />
            <span>TRUST & PRIVACY ARCHITECTURE</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit'] mt-1">
            Privacy Center
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            You control what GALAX can access. Full transparency into permissions, zero-retention policies, and scoped data access.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handlePurge}
            disabled={purging}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-rose-500/30 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>{purging ? 'Purging Telemetry...' : 'Purge All Ephemeral Data'}</span>
          </button>
        </div>
      </div>

      {/* Confirmation message */}
      {purgeSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/40 text-emerald-300 text-xs flex items-center gap-2 animate-in fade-in font-mono">
          <Check className="w-4 h-4" />
          <span>Success: Volatile session memory cleared and cached tokens wiped.</span>
        </div>
      )}

      {/* Core Privacy Principles Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {principles.map((p, idx) => (
          <div key={idx} className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white font-['Outfit']">
                {p.title}
              </span>
              <span className="text-[9px] font-mono px-2 py-0.5 rounded bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 uppercase">
                {p.badge}
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              {p.description}
            </p>
          </div>
        ))}
      </div>

      {/* Connected Services Permission Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-bold text-white font-['Outfit']">
          Connected Services & Least-Privilege Scopes
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {integrations.map((item) => {
            const isConnected = item.status === 'connected';
            return (
              <div 
                key={item.id}
                className="p-6 rounded-3xl bg-slate-900/70 border border-slate-800 space-y-5"
              >
                <div className="flex items-center justify-between pb-4 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2.5 rounded-xl bg-slate-800 text-cyan-400">
                      <Lock className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="text-base font-bold text-white font-['Outfit']">
                        {item.name}
                      </h3>
                      <span className="text-xs text-slate-400 font-mono">
                        Scope: {item.scope_level}
                      </span>
                    </div>
                  </div>

                  <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                    isConnected ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'
                  }`}>
                    {isConnected ? 'CONNECTED' : 'NOT CONNECTED'}
                  </span>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
                  {/* Access Granted */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold font-mono text-emerald-400 flex items-center gap-1.5 uppercase">
                      <Check className="w-3.5 h-3.5" />
                      <span>Access Granted</span>
                    </span>
                    <ul className="space-y-1.5 text-slate-300">
                      {item.allowed_permissions?.slice(0, 2).map((perm, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 text-[11px] leading-relaxed">
                          <span className="w-1 h-1 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                          <span>{perm}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Access Not Granted */}
                  <div className="space-y-2">
                    <span className="text-[11px] font-bold font-mono text-rose-400 flex items-center gap-1.5 uppercase">
                      <X className="w-3.5 h-3.5" />
                      <span>Access NOT Granted</span>
                    </span>
                    <ul className="space-y-1.5 text-slate-400">
                      {item.prohibited_permissions?.slice(0, 2).map((perm, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2 text-[11px] leading-relaxed">
                          <span className="w-1 h-1 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                          <span>{perm}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                  <span className="text-[11px] text-slate-500 font-mono">
                    {isConnected ? `Connected: ${item.connected_at || 'Active'}` : 'Requires explicit authorization'}
                  </span>
                  <button
                    onClick={() => onToggleIntegration(item.id, isConnected ? 'disconnected' : 'connected')}
                    className={`px-3 py-1.5 rounded-lg text-xs font-semibold font-mono transition ${
                      isConnected 
                        ? 'bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/30' 
                        : 'bg-cyan-500/10 text-cyan-400 hover:bg-cyan-500/20 border border-cyan-500/30'
                    }`}
                  >
                    {isConnected ? 'Disconnect' : 'Connect Service'}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Transparent Access Audit Log */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
            <History className="w-4 h-4 text-cyan-400" />
            <span>Transparent Access Log</span>
          </h2>
          <span className="text-xs text-slate-500 font-mono">Audit record</span>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 divide-y divide-slate-800/80 overflow-hidden text-xs">
          {accessLogs.map((log) => (
            <div key={log.id} className="p-3.5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
              <div className="space-y-0.5">
                <span className="font-bold text-slate-200 block">
                  {log.action}
                </span>
                <span className="text-slate-400 font-mono text-[11px]">
                  {log.details}
                </span>
              </div>
              <div className="flex items-center gap-3 self-end sm:self-center">
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-300 font-mono text-[10px] border border-emerald-500/30">
                  {log.status}
                </span>
                <span className="text-slate-500 font-mono text-[11px]">
                  {log.timestamp}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
}
