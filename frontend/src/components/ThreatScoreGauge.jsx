import React from 'react';
import { Shield, ShieldAlert, ShieldCheck, AlertTriangle, CheckCircle2 } from 'lucide-react';

export default function ThreatScoreGauge({ 
  score = 0, 
  riskLevel = "LOW RISK", 
  confidence = "High", 
  threatType = "Benign Communication",
  size = "md" 
}) {
  // Determine color theme
  let color = "#10B981"; // green
  let glowColor = "rgba(16, 185, 129, 0.4)";
  let badgeClass = "border-emerald-500/30 bg-emerald-500/10 text-emerald-400";
  let Icon = ShieldCheck;

  if (score >= 80) {
    color = "#FF3366"; // red
    glowColor = "rgba(255, 51, 102, 0.4)";
    badgeClass = "border-rose-500/30 bg-rose-500/10 text-rose-400";
    Icon = ShieldAlert;
  } else if (score >= 60) {
    color = "#F97316"; // orange
    glowColor = "rgba(249, 115, 22, 0.4)";
    badgeClass = "border-orange-500/30 bg-orange-500/10 text-orange-400";
    Icon = AlertTriangle;
  } else if (score >= 30) {
    color = "#F59E0B"; // amber
    glowColor = "rgba(245, 158, 11, 0.4)";
    badgeClass = "border-amber-500/30 bg-amber-500/10 text-amber-400";
    Icon = AlertTriangle;
  }

  // SVG Gauge calculations
  const radius = 64;
  const strokeWidth = 10;
  const circumference = 2 * Math.PI * radius;
  // Use a 270 degree arc (3/4 of circle)
  const arcLength = circumference * 0.75;
  const progressOffset = arcLength - (arcLength * Math.min(score, 100)) / 100;

  return (
    <div className="flex flex-col items-center justify-center p-6 rounded-2xl bg-gradient-to-b from-slate-900/90 to-slate-950/90 border border-slate-800 shadow-2xl relative overflow-hidden">
      
      {/* Background ambient radial glow */}
      <div 
        className="absolute w-44 h-44 rounded-full blur-3xl opacity-20 pointer-events-none transition-all duration-700"
        style={{ backgroundColor: color }}
      />

      {/* SVG Arc Gauge */}
      <div className="relative w-44 h-44 flex items-center justify-center">
        <svg className="w-full h-full transform -rotate-135" viewBox="0 0 160 160">
          {/* Background Track */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke="#1E293B"
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeLinecap="round"
          />
          {/* Active Risk Meter Arc */}
          <circle
            cx="80"
            cy="80"
            r={radius}
            fill="none"
            stroke={color}
            strokeWidth={strokeWidth}
            strokeDasharray={`${arcLength} ${circumference}`}
            strokeDashoffset={progressOffset}
            strokeLinecap="round"
            style={{
              transition: "stroke-dashoffset 1s ease-in-out, stroke 0.5s ease",
              filter: `drop-shadow(0 0 8px ${glowColor})`
            }}
          />
        </svg>

        {/* Center Readout */}
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <div className="text-3xl sm:text-4xl font-black tracking-tight text-white font-['Outfit']">
            {score}
            <span className="text-base text-slate-500 font-normal">/100</span>
          </div>
          <span className="text-[10px] font-mono tracking-widest uppercase text-slate-400 mt-0.5">
            FRAUD RISK SCORE
          </span>
        </div>
      </div>

      {/* Threat Level & Confidence Badge */}
      <div className="mt-2 flex flex-col items-center gap-2 text-center w-full">
        <div className="flex items-center gap-2">
          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wide uppercase border font-mono ${badgeClass}`}>
            <Icon className="w-3.5 h-3.5" />
            <span>{riskLevel}</span>
          </span>
          <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-800/80 text-slate-300 border border-slate-700/60 font-mono">
            Confidence: <strong className="text-white">{confidence}</strong>
          </span>
        </div>

        <div className="text-sm font-semibold text-slate-200 mt-1">
          {threatType}
        </div>

        <p className="text-[11px] text-slate-500 max-w-xs text-center font-mono mt-1">
          Score reflects algorithmic heuristic signal assessment. Not a legal or guaranteed probability.
        </p>
      </div>

    </div>
  );
}
