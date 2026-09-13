import React, { useState } from 'react';
import { 
  Settings as SettingsIcon, 
  User, 
  Lock, 
  Trash2, 
  Download, 
  ShieldAlert, 
  Check, 
  Key, 
  Sliders, 
  LogOut,
  Bell
} from 'lucide-react';

export default function Settings({ 
  onPurgeData, 
  onDisconnectAll, 
  onExportData 
}) {
  const [apiKey, setApiKey] = useState('');
  const [keySaved, setKeySaved] = useState(false);
  const [sensitivity, setSensitivity] = useState('standard');
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  const handleSaveApiKey = (e) => {
    e.preventDefault();
    setKeySaved(true);
    setTimeout(() => setKeySaved(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8 animate-in fade-in">
      
      {/* Header */}
      <div>
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <SettingsIcon className="w-3.5 h-3.5" />
          <span>CONFIGURATION & GOVERNANCE</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight font-['Outfit'] mt-1">
          Settings & Security Controls
        </h1>
        <p className="text-sm text-slate-400 mt-1">
          Manage system preferences, data retention policies, and threat engine sensitivity.
        </p>
      </div>

      {/* 1. Profile & Account */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
          <User className="w-4 h-4 text-cyan-400" />
          <span>Protected Profile</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-mono">
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="text-slate-500 block">Full Name</span>
            <span className="text-slate-200 font-bold">Alex Mercer</span>
          </div>
          <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <span className="text-slate-500 block">Identity Email</span>
            <span className="text-slate-200 font-bold">alex.mercer@cyber-defense.io</span>
          </div>
        </div>
      </div>

      {/* 2. AI Threat Engine Configuration */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
          <Key className="w-4 h-4 text-amber-400" />
          <span>AI Engine & External Providers (Optional)</span>
        </h2>
        <p className="text-xs text-slate-400">
          GALAX runs out-of-the-box using built-in hybrid heuristics. You can optionally supply your own Google Gemini or OpenAI API key.
        </p>

        <form onSubmit={handleSaveApiKey} className="space-y-3">
          <div className="flex items-center gap-3">
            <input
              type="password"
              value={apiKey}
              onChange={(e) => setApiKey(e.target.value)}
              placeholder="AIzaSy... (Gemini) or sk-... (OpenAI)"
              className="flex-1 px-3.5 py-2.5 bg-slate-950 border border-slate-800 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 font-mono"
            />
            <button
              type="submit"
              className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition font-mono"
            >
              Save Key
            </button>
          </div>

          {keySaved && (
            <div className="text-[11px] font-mono text-emerald-400 flex items-center gap-1.5">
              <Check className="w-3.5 h-3.5" />
              <span>Provider key securely registered in session context.</span>
            </div>
          )}
        </form>
      </div>

      {/* 3. Sensitivity & Alerts */}
      <div className="p-6 rounded-3xl bg-slate-900/80 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white font-['Outfit'] flex items-center gap-2">
          <Sliders className="w-4 h-4 text-cyan-400" />
          <span>Analysis Preferences & Heuristic Sensitivity</span>
        </h2>

        <div className="space-y-3 text-xs">
          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <div>
              <span className="font-bold text-slate-200 block">Engine Aggression</span>
              <span className="text-slate-400 text-[11px]">Strictness of urgency and brand distance scoring</span>
            </div>
            <select
              value={sensitivity}
              onChange={(e) => setSensitivity(e.target.value)}
              className="bg-slate-900 border border-slate-700 text-slate-200 rounded-lg px-2.5 py-1.5 text-xs font-mono"
            >
              <option value="standard">Standard (Balanced)</option>
              <option value="aggressive">Aggressive (Zero-Trust)</option>
              <option value="conservative">Conservative</option>
            </select>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-xl bg-slate-950 border border-slate-800/80">
            <div>
              <span className="font-bold text-slate-200 block">High-Risk Banner Alerts</span>
              <span className="text-slate-400 text-[11px]">Display persistent notifications for score &ge; 80</span>
            </div>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={(e) => setNotificationsEnabled(e.target.checked)}
              className="w-4 h-4 accent-cyan-500 cursor-pointer"
            />
          </div>
        </div>
      </div>

      {/* 4. Data Governance & Danger Zone */}
      <div className="p-6 rounded-3xl bg-rose-950/10 border border-rose-500/20 space-y-4">
        <h2 className="text-base font-bold text-rose-400 font-['Outfit'] flex items-center gap-2">
          <Trash2 className="w-4 h-4" />
          <span>Data Controls & Revocation</span>
        </h2>

        <div className="flex flex-col sm:flex-row items-center gap-3">
          <button
            onClick={onPurgeData}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 border border-rose-500/30 text-rose-400 hover:bg-rose-500/10 text-xs font-bold font-mono transition"
          >
            Delete Analysis History
          </button>

          <button
            onClick={onDisconnectAll}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-slate-300 hover:text-white text-xs font-bold font-mono transition"
          >
            Disconnect All Services
          </button>

          <button
            onClick={onExportData}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl bg-slate-900 border border-slate-700 text-cyan-400 hover:bg-cyan-500/10 text-xs font-bold font-mono transition"
          >
            Export All Data
          </button>
        </div>
      </div>

    </div>
  );
}
