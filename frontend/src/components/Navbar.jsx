import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Search, 
  Mail, 
  History, 
  Lock, 
  Settings as SettingsIcon, 
  Activity, 
  Menu, 
  X,
  Zap,
  Sparkles,
  ExternalLink
} from 'lucide-react';
import Logo from './Logo';

export default function Navbar({ 
  currentTab, 
  setCurrentTab, 
  onQuickScan, 
  onOpenOnboarding,
  protectionStatus = "PROTECTED",
  onLoadPreset
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [demoDropdownOpen, setDemoDropdownOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Security Center', icon: Activity },
    { id: 'local-shield', label: 'Local Shield', icon: Search, badge: 'Zero Data' },
    { id: 'default-shield', label: 'Default Shield', icon: Mail, badge: 'Flagship' },
    { id: 'threat-history', label: 'Threat Audit', icon: History },
    { id: 'privacy-center', label: 'Privacy Center', icon: Lock },
    { id: 'settings', label: 'Settings', icon: SettingsIcon },
  ];

  const presets = [
    { label: "Bank KYC Freeze (High Risk)", type: "kyc" },
    { label: "Lottery Sweepstake (Advance Fee)", type: "lottery" },
    { label: "Fake Google Recruiter Job", type: "job" },
    { label: "Crypto Algorithmic Bot Ponzi", type: "crypto" },
    { label: "Typosquatting URL (PayPal spoof)", type: "url" },
  ];

  return (
    <header className="sticky top-0 z-40 border-b border-slate-800/80 bg-[#06080F]/90 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          
          {/* Logo */}
          <div onClick={() => setCurrentTab('landing')} className="cursor-pointer">
            <Logo size={32} showText={true} subtitle={false} />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`relative flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-200 ${
                    isActive 
                      ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30 shadow-[0_0_15px_rgba(0,240,255,0.15)]' 
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-850'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-cyan-400' : 'text-slate-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className={`text-[9px] px-1 py-0.2 rounded font-mono ${
                      isActive ? 'bg-cyan-400/20 text-cyan-300' : 'bg-slate-800 text-slate-400'
                    }`}>
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Right Action Cluster */}
          <div className="hidden lg:flex items-center gap-3">
            {/* Live Security Indicator */}
            <div className="flex items-center gap-2 px-2.5 py-1 rounded-full bg-slate-900/80 border border-slate-800 text-xs font-mono">
              <span className={`w-2 h-2 rounded-full ${
                protectionStatus === "PROTECTED" ? 'bg-emerald-400 animate-pulse' : 'bg-rose-500 animate-ping'
              }`} />
              <span className="text-[11px] text-slate-300">
                {protectionStatus === "PROTECTED" ? 'DEFENSE ACTIVE' : 'THREAT DETECTED'}
              </span>
            </div>

            {/* Demo Presets Dropdown */}
            <div className="relative">
              <button
                onClick={() => setDemoDropdownOpen(!demoDropdownOpen)}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-900 border border-slate-700 text-xs text-slate-300 hover:text-white hover:border-slate-600 transition"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-400" />
                <span>Demo Scenarios</span>
              </button>

              {demoDropdownOpen && (
                <div 
                  className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-700 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2"
                  onMouseLeave={() => setDemoDropdownOpen(false)}
                >
                  <div className="text-[10px] font-mono uppercase text-slate-500 px-2 py-1 tracking-wider border-b border-slate-800 mb-1">
                    Load Sample Threat
                  </div>
                  {presets.map((p, idx) => (
                    <button
                      key={idx}
                      onClick={() => {
                        onLoadPreset(p.type);
                        setDemoDropdownOpen(false);
                      }}
                      className="w-full text-left px-2.5 py-2 rounded-lg text-xs text-slate-300 hover:bg-cyan-500/10 hover:text-cyan-300 transition flex items-center justify-between"
                    >
                      <span>{p.label}</span>
                      <Zap className="w-3 h-3 text-cyan-400 opacity-60" />
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Scan Button */}
            <button
              onClick={onQuickScan}
              className="flex items-center gap-1.5 px-3.5 py-1.5 rounded-lg bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-semibold text-xs shadow-[0_0_20px_rgba(0,240,255,0.3)] transition-all duration-200 active:scale-95"
            >
              <Zap className="w-3.5 h-3.5" />
              <span>Scan Suspicious Item</span>
            </button>
          </div>

          {/* Mobile menu toggle */}
          <div className="flex md:hidden items-center gap-2">
            <button
              onClick={onQuickScan}
              className="px-2.5 py-1 rounded bg-cyan-500 text-slate-950 font-semibold text-xs"
            >
              Scan
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded-lg bg-slate-900 text-slate-400 hover:text-white"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-t border-slate-800 bg-slate-950/95 backdrop-blur-2xl p-4 space-y-2">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center justify-between px-3 py-2.5 rounded-lg text-sm font-medium ${
                  isActive ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/30' : 'text-slate-400 hover:text-slate-200'
                }`}
              >
                <div className="flex items-center gap-3">
                  <Icon className="w-4 h-4" />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] px-1.5 py-0.5 rounded bg-slate-800 text-slate-400 font-mono">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      )}
    </header>
  );
}
