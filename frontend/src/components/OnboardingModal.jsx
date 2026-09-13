import React, { useState } from 'react';
import { 
  X, 
  ArrowRight, 
  Search, 
  Shield, 
  Mail, 
  Lock, 
  CheckCircle2, 
  ShieldCheck
} from 'lucide-react';
import Logo from './Logo';

export default function OnboardingModal({ 
  isOpen, 
  onClose, 
  onSelectMode 
}) {
  const [screen, setScreen] = useState(1);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in">
      <div className="relative w-full max-w-lg rounded-3xl bg-slate-900 border border-slate-700 shadow-2xl overflow-hidden p-6 sm:p-8 space-y-6">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
        >
          <X className="w-5 h-5" />
        </button>

        {/* SCREEN 1: Welcome & Brand Promise */}
        {screen === 1 && (
          <div className="text-center space-y-6 py-4 animate-in fade-in">
            <div className="flex justify-center">
              <Logo size={48} showText={false} />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-mono uppercase tracking-widest text-cyan-400">
                GALAX CYBER DEFENSE
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-['Outfit'] tracking-tight">
                Your Personal Digital Shield.
              </h2>
              <p className="text-xs sm:text-sm text-slate-400 max-w-sm mx-auto leading-relaxed">
                AI-powered protection against scams, phishing, fake payment requests, and digital impersonation.
              </p>
            </div>

            <div className="pt-2">
              <button
                onClick={() => setScreen(2)}
                className="w-full py-3.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg transition"
              >
                Get Protected
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 2: Create Account or Guest */}
        {screen === 2 && (
          <div className="space-y-5 animate-in fade-in">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold text-white font-['Outfit']">
                Activate Your Security Identity
              </h2>
              <p className="text-xs text-slate-400">
                Sign in to sync your threat audit trail or proceed instantly with guest Local Shield.
              </p>
            </div>

            {/* Google button */}
            <button
              onClick={() => setScreen(3)}
              className="w-full flex items-center justify-center gap-3 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-semibold text-xs shadow transition"
            >
              <svg className="w-4 h-4" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
              </svg>
              <span>Continue with Google</span>
            </button>

            <div className="flex items-center gap-3 my-3">
              <div className="flex-1 h-px bg-slate-800" />
              <span className="text-[10px] font-mono uppercase text-slate-500">OR WITH EMAIL</span>
              <div className="flex-1 h-px bg-slate-800" />
            </div>

            <div className="space-y-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.com"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 font-mono"
              />
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••••••"
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-800 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 font-mono"
              />

              <button
                onClick={() => setScreen(3)}
                className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold text-xs transition"
              >
                Continue
              </button>
            </div>

            {/* Local Shield Option */}
            <div className="pt-2 border-t border-slate-800/80 text-center">
              <button
                onClick={() => {
                  onSelectMode('local');
                  onClose();
                }}
                className="text-xs font-mono text-cyan-400 hover:text-cyan-300 transition"
              >
                Continue with Local Shield (No Signup) →
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 3: Choose Protection Mode */}
        {screen === 3 && (
          <div className="space-y-6 animate-in fade-in">
            <div className="text-center space-y-1">
              <h2 className="text-xl font-bold text-white font-['Outfit']">
                Choose Your Protection Level
              </h2>
              <p className="text-xs text-slate-400">
                You can switch between modes at any point in your settings.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Card 1: Local Shield */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 space-y-3 transition flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-cyan-500/10 text-cyan-400 w-fit">
                    <Search className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white font-['Outfit']">
                    LOCAL SHIELD
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Analyze suspicious messages, URLs, and screenshots manually.
                  </p>
                </div>

                <button
                  onClick={() => {
                    onSelectMode('local');
                    onClose();
                  }}
                  className="w-full py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition"
                >
                  Use Local Shield
                </button>
              </div>

              {/* Card 2: Default Shield */}
              <div className="p-5 rounded-2xl bg-slate-950/70 border border-cyan-500/30 hover:border-cyan-400 space-y-3 transition flex flex-col justify-between">
                <div className="space-y-2">
                  <div className="p-2.5 rounded-xl bg-blue-500/10 text-blue-400 w-fit">
                    <ShieldCheck className="w-5 h-5" />
                  </div>
                  <h3 className="text-sm font-bold text-white font-['Outfit']">
                    DEFAULT SHIELD
                  </h3>
                  <p className="text-xs text-slate-400 leading-relaxed">
                    Connect supported services and let GALAX help detect threats automatically.
                  </p>
                </div>

                <button
                  onClick={() => {
                    onSelectMode('default');
                    onClose();
                  }}
                  className="w-full py-2.5 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-lg transition"
                >
                  Set Up Default Shield
                </button>
              </div>
            </div>
          </div>
        )}

      </div>
    </div>
  );
}
