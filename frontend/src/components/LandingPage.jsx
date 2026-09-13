import React from 'react';
import { 
  ShieldCheck, 
  ShieldAlert, 
  Lock, 
  Cpu, 
  Zap, 
  Search, 
  Mail, 
  CheckCircle2, 
  ArrowRight, 
  Sparkles, 
  Globe, 
  AlertTriangle, 
  Eye, 
  KeyRound,
  Coins,
  Building2,
  FileCheck
} from 'lucide-react';
import Logo from './Logo';

export default function LandingPage({ 
  onGetStarted, 
  onTryLocalShield 
}) {
  const threatCards = [
    {
      title: "Phishing & Fake Banking",
      desc: "Detects spoofed login portals, urgency traps, and artificial account freeze ultimatums.",
      icon: Building2,
      risk: "94/100"
    },
    {
      title: "Payment & Wire Fraud",
      desc: "Catches advance-fee demands, fake escrow routing, and crypto doubling schemes.",
      icon: Coins,
      risk: "91/100"
    },
    {
      title: "Typosquatting & Fake Domains",
      desc: "Screens subtle misspellings, high-abuse disposable TLDs, and punycode disguises.",
      icon: Globe,
      risk: "88/100"
    },
    {
      title: "Credential & KYC Harvesting",
      desc: "Flags unsolicited OTP requests, password resets, and identity extortion vectors.",
      icon: KeyRound,
      risk: "85/100"
    },
    {
      title: "Social Engineering Cues",
      desc: "Dissects artificial authority pressure, legal threats, and manufactured FOMO.",
      icon: AlertTriangle,
      risk: "79/100"
    },
    {
      title: "Fake Job & Recruiter Scams",
      desc: "Identifies upfront equipment deposits, task fraud, and fake enterprise recruiters.",
      icon: FileCheck,
      risk: "74/100"
    }
  ];

  return (
    <div className="w-full space-y-24 pb-20 animate-in fade-in">
      
      {/* Hero Section */}
      <section className="relative pt-12 pb-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto text-center space-y-8">
        
        {/* Ambient Top Glow */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3/4 h-96 bg-gradient-to-b from-cyan-500/15 via-blue-600/5 to-transparent blur-3xl pointer-events-none -z-10" />

        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 text-xs font-mono">
          <span className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
          <span>AI-POWERED PERSONAL DIGITAL SECURITY • 2026</span>
        </div>

        {/* Main Headline */}
        <div className="space-y-4 max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight font-['Outfit'] leading-none">
            Your Digital World. <br />
            <span className="bg-gradient-to-r from-cyan-400 via-blue-400 to-teal-300 bg-clip-text text-transparent">
              One Intelligent Shield.
            </span>
          </h1>
          <p className="text-base sm:text-xl text-slate-400 max-w-2xl mx-auto leading-relaxed font-normal">
            Detect scams, phishing, and suspicious interactions before they become costly mistakes. 
            GALAX explains <strong className="text-slate-200">why</strong> something is dangerous and guides <strong className="text-slate-200">what to do next</strong>.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-2">
          <button
            onClick={onGetStarted}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-8 py-4 rounded-2xl bg-gradient-to-r from-cyan-500 via-cyan-400 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-extrabold text-sm shadow-[0_0_35px_rgba(0,240,255,0.4)] transition-all active:scale-95"
          >
            <span>Protect Me</span>
            <ArrowRight className="w-4 h-4" />
          </button>
          <button
            onClick={onTryLocalShield}
            className="w-full sm:w-auto flex items-center justify-center gap-2 px-7 py-4 rounded-2xl bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-cyan-500/50 text-white font-semibold text-sm transition"
          >
            <Search className="w-4 h-4 text-cyan-400" />
            <span>Try Local Shield (No Signup)</span>
          </button>
        </div>

        {/* Interactive Cyber Command Visual Mockup */}
        <div className="pt-8 max-w-5xl mx-auto">
          <div className="p-4 sm:p-6 rounded-3xl bg-slate-950/80 border border-slate-800 shadow-2xl relative overflow-hidden backdrop-blur-xl">
            {/* Top Bar */}
            <div className="flex items-center justify-between pb-4 border-b border-slate-800/80 text-xs font-mono text-slate-500">
              <div className="flex items-center gap-2">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500/80" />
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500/80" />
                <span className="ml-2 text-slate-400">GALAX Threat Radar • Heuristic Analysis v1.4</span>
              </div>
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                <span>ACTIVE MONITORING</span>
              </div>
            </div>

            {/* Visual Simulated Attack & Detection Grid */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-4 pt-4 text-left">
              {/* Left Sample Incoming */}
              <div className="md:col-span-6 p-4 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-2.5">
                <div className="flex items-center justify-between text-xs font-mono text-slate-400">
                  <span>UNVERIFIED INCOMING SMS</span>
                  <span className="text-rose-400 font-bold">SUSPECT</span>
                </div>
                <p className="text-xs font-mono text-slate-300 leading-relaxed bg-slate-950 p-3 rounded-xl border border-slate-800">
                  "Your bank account will be blocked in 30 minutes. Verify your KYC immediately: http://chase-security-verify.xyz/login"
                </p>
                <div className="flex items-center gap-2 text-[10px] font-mono text-slate-500">
                  <span>Vector: Banking Impersonation</span>
                  <span>•</span>
                  <span>Payload: Malicious Redirect</span>
                </div>
              </div>

              {/* Right GALAX Defense Verdict */}
              <div className="md:col-span-6 p-4 rounded-2xl bg-rose-950/20 border border-rose-500/30 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase font-mono text-rose-400 flex items-center gap-1.5">
                    <ShieldAlert className="w-4 h-4" />
                    <span>HIGH RISK DETECTED</span>
                  </span>
                  <span className="px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 text-xs font-mono font-black">
                    94/100
                  </span>
                </div>

                <div className="space-y-1 text-xs text-slate-300">
                  <div className="flex items-center gap-1.5 text-rose-300 text-[11px] font-mono">
                    <span>⚠ Urgency manipulation (30 min cutoff)</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-rose-300 text-[11px] font-mono">
                    <span>⚠ Spoofed banking credential collector</span>
                  </div>
                </div>

                <div className="pt-2 border-t border-rose-500/20 flex items-center justify-between text-xs">
                  <span className="text-[11px] text-slate-400 font-mono">Protocol: DO NOT CLICK</span>
                  <button
                    onClick={onTryLocalShield}
                    className="px-3 py-1 rounded-lg bg-rose-500 text-white font-bold text-[11px] hover:bg-rose-400 transition"
                  >
                    Test In Engine
                  </button>
                </div>
              </div>
            </div>

          </div>
        </div>

      </section>

      {/* How GALAX Works */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 text-center">
        <div className="space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
            THE DEFENSE ENGINE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
            How GALAX Protects You
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            From first point of contact to decisive defense. A 4-step loop designed for non-technical clarity.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          {[
            {
              step: "01",
              title: "Detect",
              desc: "Screens syntax, sender reputations, URLs, and screenshots across thousands of attack signatures.",
              icon: Search,
              color: "text-cyan-400"
            },
            {
              step: "02",
              title: "Analyze",
              desc: "Synthesizes multi-signal heuristics with AI reasoning to separate true hazards from safe notes.",
              icon: Cpu,
              color: "text-blue-400"
            },
            {
              step: "03",
              title: "Explain",
              desc: "Breaks down the psychological manipulation, typosquatting, or financial bait in plain English.",
              icon: Sparkles,
              color: "text-amber-400"
            },
            {
              step: "04",
              title: "Protect",
              desc: "Delivers explicit, numbered defense protocols: what not to click, what to verify, and how to report.",
              icon: ShieldCheck,
              color: "text-emerald-400"
            }
          ].map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 text-left space-y-4 hover:border-slate-700 transition group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-black font-mono text-slate-700 group-hover:text-slate-500 transition">
                    {item.step}
                  </span>
                  <div className={`p-2.5 rounded-xl bg-slate-800 ${item.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>
                <h3 className="text-lg font-bold text-white font-['Outfit']">
                  {item.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed font-normal">
                  {item.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* What GALAX Detects */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
            MULTI-VECTOR THREAT TAXONOMY
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
            What GALAX Detects
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Adversaries evolve daily. GALAX evaluates attacks across modern threat topologies.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {threatCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div 
                key={idx}
                className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 space-y-4 hover:border-cyan-500/40 transition group"
              >
                <div className="flex items-center justify-between">
                  <div className="p-3 rounded-2xl bg-slate-800 text-cyan-400 group-hover:bg-cyan-500/10 transition">
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-xs font-mono font-bold px-2.5 py-0.5 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                    Typical Risk: {card.risk}
                  </span>
                </div>
                <h3 className="text-base font-bold text-white font-['Outfit']">
                  {card.title}
                </h3>
                <p className="text-xs text-slate-400 leading-relaxed">
                  {card.desc}
                </p>
              </div>
            );
          })}
        </div>
      </section>

      {/* Two Modes Comparison */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-mono uppercase tracking-wider text-cyan-400">
            FLEXIBLE ARCHITECTURE
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
            Two Protection Modes
          </h2>
          <p className="text-sm text-slate-400 max-w-xl mx-auto">
            Choose instant guest analysis or connect services under least-privilege permissions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Local Shield Card */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
                  <Search className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-['Outfit']">
                  Local Shield
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-cyan-500/10 text-cyan-300 border border-cyan-500/30">
                Zero Signup Needed
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Analyze suspicious text, URLs, and screenshots manually in volatile browser memory.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>No account or email connection required</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Instant paste-and-scan interface</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Zero telemetry stored on cloud servers</span>
              </li>
            </ul>

            <button
              onClick={onTryLocalShield}
              className="w-full py-3 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
            >
              Use Local Shield
            </button>
          </div>

          {/* Default Shield Card */}
          <div className="p-8 rounded-3xl bg-slate-900/80 border border-cyan-500/30 space-y-6 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-2xl bg-blue-500/10 text-blue-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-white font-['Outfit']">
                  Default Shield
                </h3>
              </div>
              <span className="px-3 py-1 rounded-full text-[10px] font-mono font-bold uppercase bg-blue-500/10 text-blue-300 border border-blue-500/30">
                Autonomous
              </span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">
              Connect supported communication channels under strict least-privilege OAuth scopes.
            </p>

            <ul className="space-y-2.5 text-xs text-slate-400">
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Autonomous background inbox threat inspection</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>Read-only snippet access (Never sends or deletes)</span>
              </li>
              <li className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-cyan-400" />
                <span>1-Click complete OAuth revocation at any time</span>
              </li>
            </ul>

            <button
              onClick={onGetStarted}
              className="w-full py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg transition"
            >
              Set Up Default Shield
            </button>
          </div>
        </div>
      </section>

      {/* Trust & Privacy Statement */}
      <section className="max-w-4xl mx-auto px-4 text-center space-y-6">
        <div className="p-8 sm:p-10 rounded-3xl bg-slate-950 border border-slate-800 space-y-4">
          <div className="inline-flex p-3 rounded-2xl bg-cyan-500/10 text-cyan-400">
            <Lock className="w-6 h-6" />
          </div>
          <h3 className="text-2xl font-bold text-white font-['Outfit']">
            Your data. Your permission. Your control.
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto leading-relaxed">
            GALAX never claims "100% scam proof". We provide honest, multi-signal probabilistic risk assessments with clear explanations. 
            We never sell data, train public models on your private messages, or retain ephemeral tokens.
          </p>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="max-w-5xl mx-auto px-4 text-center space-y-6">
        <div className="p-10 rounded-3xl bg-gradient-to-r from-cyan-950/40 via-slate-900 to-slate-900 border border-cyan-500/30 space-y-6">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-['Outfit']">
            Start Your Digital Protection
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
            Join thousands shielding themselves against deceptive digital threats, spoofed banks, and coercive scams.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <button
              onClick={onGetStarted}
              className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg transition"
            >
              Get Protected Now
            </button>
            <button
              onClick={onTryLocalShield}
              className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-slate-900 border border-slate-700 text-white font-semibold text-xs hover:bg-slate-800 transition"
            >
              Scan a Message First
            </button>
          </div>
        </div>
      </section>

    </div>
  );
}
