import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  MessageSquare, 
  Globe, 
  AlertTriangle, 
  Flame, 
  Activity, 
  ArrowUpRight, 
  CheckCircle2, 
  Clock, 
  X, 
  ChevronRight,
  Sparkles,
  Zap,
  Lock
} from 'lucide-react';

export default function Dashboard({ 
  dashboardData, 
  onNavigate, 
  onDismissAlert, 
  onSelectThreat,
  onOpenQuickScan 
}) {
  const user = dashboardData?.user || { name: "Alex Mercer" };
  const stats = dashboardData?.stats || {
    messages_analyzed: 47,
    urls_scanned: 12,
    suspicious_items: 3,
    high_risk_threats: 1,
    protection_status: "PROTECTED"
  };
  const recentThreats = dashboardData?.recent_threats || [];
  const alerts = dashboardData?.alerts || [];

  const isProtected = stats.protection_status === "PROTECTED";

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 animate-in fade-in">
      
      {/* Dashboard Greeting Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
            <Activity className="w-3.5 h-3.5" />
            <span>GALAX SECURITY CENTER • LIVE MONITORING</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight font-['Outfit'] mt-1">
            Good evening, {user.name}
          </h1>
          <p className="text-sm text-slate-400 mt-1">
            Active digital perimeter protection across local scanning and connected inbox channels.
          </p>
        </div>

        {/* Quick Scan Action */}
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenQuickScan}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(0,240,255,0.3)] transition active:scale-95"
          >
            <Zap className="w-4 h-4" />
            <span>Launch Local Scanner</span>
          </button>
        </div>
      </div>

      {/* Main Security Status Banner */}
      <div className={`p-6 sm:p-8 rounded-3xl border relative overflow-hidden transition-all ${
        isProtected 
          ? 'bg-gradient-to-r from-emerald-950/40 via-slate-900/90 to-slate-900/90 border-emerald-500/30 shadow-[0_0_30px_rgba(16,185,129,0.1)]' 
          : 'bg-gradient-to-r from-rose-950/40 via-slate-900/90 to-slate-900/90 border-rose-500/30 shadow-[0_0_30px_rgba(255,51,102,0.15)]'
      }`}>
        {/* Glow effect */}
        <div className={`absolute top-0 right-0 w-80 h-80 rounded-full blur-3xl opacity-20 pointer-events-none ${
          isProtected ? 'bg-emerald-500' : 'bg-rose-500'
        }`} />

        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4 sm:gap-5">
            <div className={`p-3.5 sm:p-4 rounded-2xl ${
              isProtected ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/40' : 'bg-rose-500/20 text-rose-400 border border-rose-500/40'
            }`}>
              {isProtected ? <ShieldCheck className="w-8 h-8 sm:w-10 sm:h-10" /> : <ShieldAlert className="w-8 h-8 sm:w-10 sm:h-10" />}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className={`w-2.5 h-2.5 rounded-full ${isProtected ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500 animate-ping'}`} />
                <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white font-['Outfit'] uppercase">
                  {isProtected ? 'YOU ARE PROTECTED' : 'ACTION REQUIRED: ACTIVE THREAT'}
                </h2>
              </div>
              <p className="text-xs sm:text-sm text-slate-300 mt-1 font-mono">
                {isProtected 
                  ? 'Zero active critical breaches detected. Shield status: Optimal defense posture.'
                  : 'High-risk interaction flagged recently. Review evidence before replying or clicking.'}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <span className="text-xs font-mono text-slate-400">Risk Level:</span>
            <span className={`px-3 py-1 rounded-full text-xs font-extrabold uppercase font-mono border ${
              isProtected ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30' : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            }`}>
              {isProtected ? 'LOW RISK' : 'HIGH RISK'}
            </span>
          </div>
        </div>
      </div>

      {/* 4 Statistics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5">
        
        {/* Messages Analyzed */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Messages</span>
            <MessageSquare className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-3xl font-black text-white font-['Outfit']">
            {stats.messages_analyzed}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Analyzed & Verified
          </div>
        </div>

        {/* URLs Scanned */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">URLs</span>
            <Globe className="w-4 h-4 text-blue-400" />
          </div>
          <div className="text-3xl font-black text-white font-['Outfit']">
            {stats.urls_scanned}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Domains Inspected
          </div>
        </div>

        {/* Suspicious Items */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">Suspicious</span>
            <AlertTriangle className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-3xl font-black text-white font-['Outfit']">
            {stats.suspicious_items}
          </div>
          <div className="text-[11px] text-slate-400 font-mono">
            Flagged for Caution
          </div>
        </div>

        {/* High-Risk Threats */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2 hover:border-slate-700 transition">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-xs font-mono uppercase tracking-wider">High Risk</span>
            <Flame className="w-4 h-4 text-rose-400" />
          </div>
          <div className="text-3xl font-black text-rose-400 font-['Outfit']">
            {stats.high_risk_threats}
          </div>
          <div className="text-[11px] text-rose-300/80 font-mono">
            Threats Deflected
          </div>
        </div>

      </div>

      {/* Active Security Alerts (Non-destructive) */}
      {alerts && alerts.length > 0 && (
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <span>Active Security Notifications ({alerts.length})</span>
            </h2>
            <span className="text-xs text-slate-500 font-mono">Non-destructive warnings</span>
          </div>

          <div className="grid grid-cols-1 gap-3">
            {alerts.map((alert) => (
              <div 
                key={alert.id}
                className="p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 animate-in fade-in"
              >
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-xl bg-rose-500/20 text-rose-400 mt-0.5">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-white font-['Outfit']">
                        {alert.title}
                      </span>
                      <span className="text-[10px] font-mono px-2 py-0.2 rounded bg-rose-500/20 text-rose-300 uppercase font-bold">
                        {alert.severity}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 mt-1 font-mono">
                      {alert.message}
                    </p>
                    <span className="text-[10px] text-slate-500 font-mono mt-1 block">
                      Detected: {alert.timestamp}
                    </span>
                  </div>
                </div>

                <div className="flex items-center gap-2 self-end sm:self-center">
                  <button
                    onClick={() => onSelectThreat(alert.threat_id)}
                    className="px-3 py-1.5 rounded-lg bg-rose-500 hover:bg-rose-600 text-white font-bold text-xs transition"
                  >
                    Review Threat
                  </button>
                  <button
                    onClick={() => onDismissAlert(alert.id)}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
                    title="Dismiss alert"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent Threat Stream */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
            <Clock className="w-4 h-4 text-cyan-400" />
            <span>Recent Threat Stream</span>
          </h2>
          <button
            onClick={() => onNavigate('threat-history')}
            className="text-xs font-mono text-cyan-400 hover:text-cyan-300 flex items-center gap-1 transition"
          >
            <span>View Full Audit Log</span>
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="rounded-2xl border border-slate-800 bg-slate-900/60 overflow-hidden divide-y divide-slate-800/80">
          {recentThreats.map((item) => {
            const isHigh = item.risk_score >= 80;
            const isSuspicious = item.risk_score >= 60 && item.risk_score < 80;
            return (
              <div
                key={item.id}
                onClick={() => onSelectThreat(item.id)}
                className="p-4 flex items-center justify-between hover:bg-slate-850/70 transition cursor-pointer group"
              >
                <div className="flex items-center gap-3.5 min-w-0">
                  <div className={`w-3 h-3 rounded-full shrink-0 ${
                    isHigh ? 'bg-rose-500 shadow-[0_0_10px_rgba(255,51,102,0.8)]' : isSuspicious ? 'bg-amber-400' : 'bg-emerald-400'
                  }`} />
                  <div className="min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-slate-100 group-hover:text-cyan-300 transition truncate">
                        {item.title}
                      </span>
                      <span className="text-[10px] font-mono px-1.5 py-0.2 rounded bg-slate-800 text-slate-400 uppercase">
                        {item.input_type}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-400 truncate mt-0.5 font-mono">
                      {item.short_explanation || item.snippet}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 pl-3">
                  <div className="text-right">
                    <div className={`text-xs font-mono font-black ${
                      isHigh ? 'text-rose-400' : isSuspicious ? 'text-amber-400' : 'text-emerald-400'
                    }`}>
                      {item.risk_score}/100
                    </div>
                    <span className="text-[10px] text-slate-500 font-mono">
                      {item.date}
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-600 group-hover:text-cyan-400 group-hover:translate-x-0.5 transition" />
                </div>
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
}
