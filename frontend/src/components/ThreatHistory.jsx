import React, { useState } from 'react';
import { 
  History, 
  Search, 
  Filter, 
  Download, 
  Trash2, 
  ChevronRight, 
  ShieldAlert, 
  ShieldCheck, 
  ExternalLink,
  MessageSquare,
  Globe,
  Image as ImageIcon,
  Check
} from 'lucide-react';

export default function ThreatHistory({ 
  threats = [], 
  onSelectThreat, 
  onClearHistory 
}) {
  const [filterSeverity, setFilterSeverity] = useState('all');
  const [filterType, setFilterType] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [clearing, setClearing] = useState(false);

  const filtered = threats.filter((item) => {
    // Severity filter
    if (filterSeverity === 'high' && item.risk_score < 80) return false;
    if (filterSeverity === 'suspicious' && (item.risk_score < 60 || item.risk_score >= 80)) return false;
    if (filterSeverity === 'safe' && item.risk_score >= 30) return false;

    // Type filter
    if (filterType !== 'all') {
      const it = (item.input_type || '').toLowerCase();
      if (filterType === 'url' && it !== 'url') return false;
      if (filterType === 'text' && it !== 'text') return false;
      if (filterType === 'screenshot' && it !== 'screenshot') return false;
    }

    // Search query
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      const matchTitle = (item.title || '').toLowerCase().includes(q);
      const matchSnippet = (item.snippet || '').toLowerCase().includes(q);
      const matchType = (item.threat_type || '').toLowerCase().includes(q);
      if (!matchTitle && !matchSnippet && !matchType) return false;
    }

    return true;
  });

  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(threats, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute("href", dataStr);
    downloadAnchor.setAttribute("download", `galax_threat_audit_${new Date().toISOString().slice(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const handleClear = async () => {
    if (window.confirm("Are you sure you want to purge all threat history records?")) {
      setClearing(true);
      await onClearHistory();
      setClearing(false);
    }
  };

  const getTypeIcon = (type) => {
    switch ((type || '').toLowerCase()) {
      case 'url': return Globe;
      case 'screenshot': return ImageIcon;
      default: return MessageSquare;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <History className="w-3.5 h-3.5" />
            <span>AUDIT TRAIL & LOGS</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit'] mt-1">
            Threat History
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Chronological audit log of evaluated interactions, heuristic risk scores, and remediation outcomes.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleExportJSON}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-700 text-xs font-semibold text-slate-300 hover:text-white hover:border-slate-600 transition"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export JSON</span>
          </button>
          <button
            onClick={handleClear}
            disabled={clearing || threats.length === 0}
            className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-slate-900 border border-rose-500/30 text-xs font-semibold text-rose-400 hover:bg-rose-500/10 transition disabled:opacity-40"
          >
            <Trash2 className="w-3.5 h-3.5" />
            <span>Clear History</span>
          </button>
        </div>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col lg:flex-row items-center justify-between gap-4">
        
        {/* Search */}
        <div className="relative w-full lg:w-96">
          <Search className="w-4 h-4 text-slate-500 absolute left-3.5 top-3 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search keywords, domains, threat types..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950/80 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50"
          />
        </div>

        {/* Severity Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <span className="text-[11px] font-mono text-slate-500">Severity:</span>
          {['all', 'high', 'suspicious', 'safe'].map((s) => (
            <button
              key={s}
              onClick={() => setFilterSeverity(s)}
              className={`px-3 py-1 rounded-lg text-xs font-mono uppercase font-semibold transition ${
                filterSeverity === s
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/40'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {s}
            </button>
          ))}
        </div>

        {/* Type Filters */}
        <div className="flex flex-wrap items-center gap-2 w-full lg:w-auto">
          <span className="text-[11px] font-mono text-slate-500">Type:</span>
          {['all', 'text', 'url', 'screenshot'].map((t) => (
            <button
              key={t}
              onClick={() => setFilterType(t)}
              className={`px-3 py-1 rounded-lg text-xs font-mono uppercase font-semibold transition ${
                filterType === t
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/40'
                  : 'bg-slate-950 text-slate-400 hover:text-slate-200 border border-slate-800'
              }`}
            >
              {t}
            </button>
          ))}
        </div>

      </div>

      {/* Threats Table / List */}
      <div className="rounded-3xl border border-slate-800 bg-slate-900/60 overflow-hidden divide-y divide-slate-800">
        {filtered.length === 0 ? (
          <div className="p-12 text-center text-slate-500 text-xs font-mono">
            No threat records match current filter criteria.
          </div>
        ) : (
          filtered.map((item) => {
            const isHigh = item.risk_score >= 80;
            const isSuspicious = item.risk_score >= 60 && item.risk_score < 80;
            const Icon = getTypeIcon(item.input_type);

            return (
              <div
                key={item.id}
                onClick={() => onSelectThreat(item.id)}
                className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-slate-850/60 transition cursor-pointer group"
              >
                <div className="flex items-start gap-4 min-w-0">
                  <div className={`p-2.5 rounded-xl shrink-0 mt-0.5 ${
                    isHigh ? 'bg-rose-500/20 text-rose-400' : isSuspicious ? 'bg-amber-500/20 text-amber-400' : 'bg-emerald-500/20 text-emerald-400'
                  }`}>
                    <Icon className="w-5 h-5" />
                  </div>

                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-bold text-slate-100 group-hover:text-cyan-300 transition">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-slate-800 text-slate-400 uppercase">
                        {item.threat_type}
                      </span>
                      <span className="text-[10px] font-mono text-slate-500">
                        {item.date}
                      </span>
                    </div>

                    <p className="text-xs text-slate-400 font-mono line-clamp-1">
                      {item.short_explanation || item.snippet}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 self-end sm:self-center shrink-0">
                  <div className="text-right">
                    <div className={`text-base font-mono font-black ${
                      isHigh ? 'text-rose-400' : isSuspicious ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {item.risk_score}/100
                    </div>
                    <span className="text-[10px] font-mono uppercase text-slate-400">
                      {item.risk_level}
                    </span>
                  </div>

                  <ChevronRight className="w-5 h-5 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-1 transition" />
                </div>
              </div>
            );
          })
        )}
      </div>

    </div>
  );
}
