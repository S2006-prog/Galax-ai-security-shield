import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldAlert, 
  ShieldCheck, 
  KeyRound, 
  Building2, 
  Coins, 
  ExternalLink, 
  Bot, 
  ArrowRight, 
  Copy, 
  Check, 
  RotateCcw,
  Sparkles,
  Lock,
  Globe,
  HelpCircle,
  FileCheck
} from 'lucide-react';
import ThreatScoreGauge from './ThreatScoreGauge';

export default function AnalysisResult({ 
  result, 
  onReset, 
  onOpenAssistant 
}) {
  const [copied, setCopied] = useState(false);

  if (!result) return null;

  const score = result.risk_score || 0;
  const riskLevel = result.risk_level || "LOW RISK";
  const confidence = result.confidence || "High";
  const threatType = result.threat_type || "Digital Content Evaluation";
  const evidenceCards = result.evidence_cards || [];
  const explanation = result.explanation || "";
  const actions = result.recommended_actions || [];

  const handleCopyReport = () => {
    const reportText = `GALAX Threat Report\nScore: ${score}/100 (${riskLevel})\nType: ${threatType}\nEvidence:\n${evidenceCards.map(e => `- ${e.title}: ${e.description}`).join('\n')}\nRecommended Actions:\n${actions.join('\n')}`;
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const getIcon = (iconName) => {
    switch (iconName) {
      case 'AlertTriangle': return AlertTriangle;
      case 'KeyRound': return KeyRound;
      case 'Building2': return Building2;
      case 'Coins': return Coins;
      case 'ExternalLink': return ExternalLink;
      case 'Globe': return Globe;
      default: return AlertTriangle;
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Top Banner Navigation & Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 pb-2 border-b border-slate-800">
        <div>
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
            Forensic Security Analysis Completed
          </span>
          <h2 className="text-2xl font-bold text-white font-['Outfit']">
            Threat Evaluation & Defense Protocol
          </h2>
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <button
            onClick={handleCopyReport}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-600 transition"
          >
            {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
            <span>{copied ? 'Report Copied' : 'Copy Report'}</span>
          </button>
          <button
            onClick={onReset}
            className="flex-1 sm:flex-initial flex items-center justify-center gap-1.5 px-3 py-2 rounded-lg bg-slate-900 border border-slate-700 text-xs font-medium text-slate-300 hover:text-white hover:border-slate-600 transition"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Scan Another</span>
          </button>
        </div>
      </div>

      {/* Main Grid: Left Score Gauge, Right Key Summary */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
        
        {/* Left Column: Risk Gauge (4 cols) */}
        <div className="md:col-span-5 lg:col-span-4">
          <ThreatScoreGauge 
            score={score} 
            riskLevel={riskLevel} 
            confidence={confidence} 
            threatType={threatType}
          />

          {/* Quick Assistant Callout Card */}
          <div className="mt-4 p-4 rounded-xl bg-cyan-950/20 border border-cyan-500/20 text-slate-300 space-y-2">
            <div className="flex items-center gap-2 text-cyan-400 text-xs font-semibold">
              <Bot className="w-4 h-4" />
              <span>Unsure how to respond?</span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              Consult GALAX Intelligence for live conversational guidance tailored to this specific threat.
            </p>
            <button
              onClick={() => onOpenAssistant({ threat_type: threatType, risk_score: score, risk_level: riskLevel, evidence_cards: evidenceCards })}
              className="w-full mt-2 flex items-center justify-center gap-2 px-3 py-2 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 text-xs font-semibold transition group"
            >
              <span>Ask GALAX Intelligence</span>
              <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>

        {/* Right Column: Evidence & AI Analysis (7/8 cols) */}
        <div className="md:col-span-7 lg:col-span-8 space-y-5">
          
          {/* AI Explanation Card */}
          <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-cyan-400" />
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-mono">
                AI Threat Assessment
              </h3>
            </div>
            <div className="text-sm text-slate-300 leading-relaxed whitespace-pre-line bg-slate-950/50 p-4 rounded-xl border border-slate-800/80 font-mono text-xs">
              {explanation}
            </div>
          </div>

          {/* Evidence Cards ("Why GALAX flagged this") */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold uppercase tracking-wider text-slate-300 font-mono flex items-center gap-2">
                <ShieldAlert className="w-4 h-4 text-amber-400" />
                <span>Forensic Signals & Evidence ({evidenceCards.length})</span>
              </h3>
              <span className="text-[11px] text-slate-500 font-mono">Multi-vector heuristics</span>
            </div>

            {evidenceCards.length === 0 ? (
              <div className="p-4 rounded-xl bg-slate-900/50 border border-slate-800 text-xs text-slate-400 flex items-center gap-2">
                <FileCheck className="w-4 h-4 text-emerald-400" />
                <span>No high-risk adversarial indicators detected in submitted input.</span>
              </div>
            ) : (
              <div className="grid grid-cols-1 gap-2.5">
                {evidenceCards.map((item, idx) => {
                  const IconCmp = getIcon(item.icon);
                  const isHigh = item.severity === 'high';
                  return (
                    <div 
                      key={idx}
                      className={`p-3.5 rounded-xl border transition-all ${
                        isHigh 
                          ? 'bg-rose-950/20 border-rose-500/30' 
                          : 'bg-slate-900/80 border-slate-800'
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div className={`p-2 rounded-lg mt-0.5 ${
                          isHigh ? 'bg-rose-500/20 text-rose-400' : 'bg-amber-500/20 text-amber-400'
                        }`}>
                          <IconCmp className="w-4 h-4" />
                        </div>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-slate-200">
                              {item.title}
                            </span>
                            <span className={`text-[9px] px-1.5 py-0.2 rounded uppercase font-mono font-bold ${
                              isHigh ? 'bg-rose-500/20 text-rose-300' : 'bg-amber-500/20 text-amber-300'
                            }`}>
                              {item.severity}
                            </span>
                          </div>
                          <p className="text-xs text-slate-400 leading-normal">
                            {item.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Prescriptive Recommended Actions */}
          <div className="p-5 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-200 font-mono flex items-center gap-2">
              <Lock className="w-4 h-4 text-emerald-400" />
              <span>Recommended Action Protocol</span>
            </h3>

            <div className="space-y-2">
              {actions.map((act, idx) => (
                <div 
                  key={idx}
                  className="flex items-start gap-3 p-3 rounded-xl bg-slate-950/60 border border-slate-800/80"
                >
                  <div className="w-5 h-5 rounded-full bg-slate-800 text-cyan-400 flex items-center justify-center text-[10px] font-mono font-bold shrink-0 mt-0.5">
                    {idx + 1}
                  </div>
                  <span className="text-xs text-slate-300 leading-relaxed font-medium">
                    {act}
                  </span>
                </div>
              ))}
            </div>
          </div>

        </div>

      </div>

    </div>
  );
}
