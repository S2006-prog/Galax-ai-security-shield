import React, { useState } from 'react';
import { 
  Mail, 
  ShieldCheck, 
  ShieldAlert, 
  Check, 
  X, 
  Lock, 
  RefreshCw, 
  ExternalLink, 
  AlertTriangle, 
  Eye, 
  EyeOff, 
  Sparkles,
  Info
} from 'lucide-react';

export default function DefaultShield({ 
  integrations = [], 
  onToggleIntegration, 
  inboxMessages = [],
  onSelectThreat 
}) {
  const [oauthModalOpen, setOauthModalOpen] = useState(false);
  const [activeProvider, setActiveProvider] = useState('gmail');
  const [scanning, setScanning] = useState(false);

  const gmailIntegration = integrations.find(i => i.id === 'gmail') || {
    status: 'connected',
    account: 'user.alex@gmail.com',
    allowed_permissions: [
      "Inspect incoming message headers and text snippets for threat patterns",
      "Calculate risk scores on suspicious sender addresses and links",
      "Dispatch real-time warning alerts to GALAX Security Center"
    ],
    prohibited_permissions: [
      "Send emails on your behalf",
      "Delete, archive, or modify your emails",
      "Access your personal contact list or Google Drive",
      "Share your email contents with third-party advertisers"
    ]
  };

  const isGmailConnected = gmailIntegration.status === 'connected';

  const handleSimulateScan = () => {
    setScanning(true);
    setTimeout(() => {
      setScanning(false);
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Lock className="w-3.5 h-3.5" />
            <span>MODE B • DEFAULT SHIELD INTEGRATIONS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit'] mt-1">
            Autonomous Digital Perimeter
          </h1>
          <p className="text-sm text-slate-400 mt-1 max-w-2xl">
            Connect supported communication services under strict least-privilege OAuth scopes. 
            GALAX inspects incoming payloads for threats without storing personal content.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleSimulateScan}
            disabled={scanning || !isGmailConnected}
            className="flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-600 transition disabled:opacity-40"
          >
            <RefreshCw className={`w-3.5 h-3.5 ${scanning ? 'animate-spin text-cyan-400' : ''}`} />
            <span>{scanning ? 'Scanning Inbox...' : 'Scan Connected Inbox'}</span>
          </button>
        </div>
      </div>

      {/* Core Principle Banner */}
      <div className="p-4 rounded-2xl bg-gradient-to-r from-cyan-950/30 via-slate-900/60 to-slate-900/60 border border-cyan-500/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
            <ShieldCheck className="w-5 h-5" />
          </div>
          <div>
            <span className="font-bold text-white block">
              Your Data. Your Permission. Your Control.
            </span>
            <span className="text-slate-400">
              Official OAuth 2.0 least-privilege scopes. We never request blanket inbox access.
            </span>
          </div>
        </div>
        <span className="px-2.5 py-1 rounded-full bg-slate-800 text-slate-400 font-mono text-[10px]">
          Least Privilege Architecture
        </span>
      </div>

      {/* Flagship Integration Card: Gmail */}
      <div className="p-6 sm:p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
        
        {/* Service Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="flex items-center gap-4">
            <div className="p-3.5 rounded-2xl bg-rose-500/10 border border-rose-500/30 text-rose-400">
              <Mail className="w-8 h-8" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h2 className="text-xl font-bold text-white font-['Outfit']">
                  Google Gmail Threat Sentinel
                </h2>
                <span className={`px-2.5 py-0.5 rounded-full text-[10px] font-mono font-bold uppercase border ${
                  isGmailConnected ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' : 'bg-slate-800 text-slate-400 border-slate-700'
                }`}>
                  {isGmailConnected ? 'CONNECTED' : 'DISCONNECTED'}
                </span>
              </div>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {isGmailConnected ? `Active account: ${gmailIntegration.account}` : 'No active mailbox connection'}
              </p>
            </div>
          </div>

          <div>
            {isGmailConnected ? (
              <button
                onClick={() => onToggleIntegration('gmail', 'disconnected')}
                className="px-4 py-2 rounded-xl bg-slate-900 border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-xs font-semibold font-mono transition"
              >
                Disconnect Gmail
              </button>
            ) : (
              <button
                onClick={() => setOauthModalOpen(true)}
                className="px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(0,240,255,0.25)] transition active:scale-95"
              >
                Connect with OAuth 2.0
              </button>
            )}
          </div>
        </div>

        {/* Permissions Breakdown Matrix */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          
          {/* Allowed Scopes */}
          <div className="p-4 rounded-2xl bg-emerald-950/10 border border-emerald-500/20 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold font-mono text-emerald-400 uppercase tracking-wider">
              <Check className="w-4 h-4" />
              <span>Explicitly Allowed Access</span>
            </div>
            <ul className="space-y-2">
              {gmailIntegration.allowed_permissions.map((perm, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-300 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-1.5 shrink-0" />
                  <span>{perm}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Prohibited Scopes */}
          <div className="p-4 rounded-2xl bg-rose-950/10 border border-rose-500/20 space-y-3">
            <div className="flex items-center gap-2 text-xs font-bold font-mono text-rose-400 uppercase tracking-wider">
              <X className="w-4 h-4" />
              <span>Strictly Prohibited & Blocked</span>
            </div>
            <ul className="space-y-2">
              {gmailIntegration.prohibited_permissions.map((perm, idx) => (
                <li key={idx} className="flex items-start gap-2.5 text-xs text-slate-400 leading-relaxed">
                  <span className="w-1.5 h-1.5 rounded-full bg-rose-400 mt-1.5 shrink-0" />
                  <span>{perm}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

      </div>

      {/* Simulated Live Inbox Threat Stream */}
      {isGmailConnected && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-cyan-400" />
                <span>Live Inbox Threat Feed (Autonomous Scan)</span>
              </h2>
              <p className="text-xs text-slate-400 font-mono">
                Recent messages evaluated against scam signatures
              </p>
            </div>
            <span className="text-[11px] font-mono text-slate-500">
              Auto-sync: Every 5 mins
            </span>
          </div>

          <div className="rounded-2xl border border-slate-800 bg-slate-900/60 divide-y divide-slate-800/80 overflow-hidden">
            {inboxMessages.map((msg) => {
              const isHigh = msg.severity === 'HIGH';
              return (
                <div 
                  key={msg.id}
                  className="p-4 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 hover:bg-slate-850/60 transition"
                >
                  <div className="flex items-start gap-3 min-w-0">
                    <div className={`p-2 rounded-xl mt-1 shrink-0 ${
                      isHigh ? 'bg-rose-500/20 text-rose-400' : 'bg-emerald-500/20 text-emerald-400'
                    }`}>
                      {isHigh ? <ShieldAlert className="w-4 h-4" /> : <ShieldCheck className="w-4 h-4" />}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-bold text-white truncate">
                          {msg.sender}
                        </span>
                        <span className={`text-[9px] font-mono px-1.5 py-0.2 rounded uppercase font-bold ${
                          isHigh ? 'bg-rose-500/20 text-rose-300' : 'bg-emerald-500/20 text-emerald-300'
                        }`}>
                          {msg.threat_type}
                        </span>
                        <span className="text-[10px] text-slate-500 font-mono">
                          {msg.date}
                        </span>
                      </div>
                      <div className="text-xs font-semibold text-slate-200 mt-1">
                        {msg.subject}
                      </div>
                      <p className="text-[11px] text-slate-400 font-mono mt-0.5 line-clamp-2">
                        {msg.snippet}
                      </p>
                      <div className="mt-2 text-xs font-semibold text-rose-300 flex items-center gap-1">
                        <AlertTriangle className="w-3.5 h-3.5" />
                        <span>Action: {msg.action_recommended}</span>
                      </div>
                    </div>
                  </div>

                  <div className="self-end md:self-center shrink-0">
                    <div className="text-right">
                      <span className={`text-xs font-mono font-black ${
                        isHigh ? 'text-rose-400' : 'text-emerald-400'
                      }`}>
                        Score: {msg.risk_score}/100
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* OAuth Confirmation Modal */}
      {oauthModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl p-6 space-y-5">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="p-2 rounded-xl bg-cyan-500/10 text-cyan-400">
                  <Mail className="w-5 h-5" />
                </div>
                <h3 className="text-base font-bold text-white font-['Outfit']">
                  Connect Google Gmail
                </h3>
              </div>
              <button
                onClick={() => setOauthModalOpen(false)}
                className="text-slate-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-xs text-slate-300">
              <p className="leading-relaxed">
                GALAX requests least-privilege OAuth access to scan incoming email snippets for scam and phishing indicators.
              </p>

              <div className="p-3.5 rounded-xl bg-slate-950/60 border border-slate-800 space-y-2">
                <span className="text-emerald-400 font-bold block font-mono uppercase text-[10px]">
                  ✓ Permitted Scope:
                </span>
                <p className="text-slate-400 text-[11px]">
                  https://www.googleapis.com/auth/gmail.readonly (Scoped to header and threat text extraction)
                </p>
                <span className="text-rose-400 font-bold block font-mono uppercase text-[10px] mt-2">
                  ✕ Strictly Excluded:
                </span>
                <p className="text-slate-400 text-[11px]">
                  Sending emails, deleting messages, account password modifications.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 pt-2">
              <button
                onClick={() => setOauthModalOpen(false)}
                className="flex-1 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-slate-300 transition"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  onToggleIntegration('gmail', 'connected');
                  setOauthModalOpen(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg transition"
              >
                Grant Permission
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
