import React from 'react';

export default function Logo({ size = 32, showText = true, subtitle = false }) {
  return (
    <div className="flex items-center gap-3 select-none group cursor-pointer">
      <div className="relative flex items-center justify-center">
        {/* Ambient Glow */}
        <div 
          className="absolute -inset-1 rounded-xl bg-gradient-to-r from-cyan-500/40 via-blue-600/30 to-teal-400/40 blur-md opacity-70 group-hover:opacity-100 transition-opacity duration-300"
          style={{ width: size + 8, height: size + 8 }}
        />
        
        {/* Geometric Shield SVG with embedded 'G' */}
        <svg
          width={size}
          height={size}
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="relative transform transition-transform duration-300 group-hover:scale-105"
        >
          {/* Shield Outer Outline */}
          <path
            d="M24 4L7 11V23C7 33.5 14.3 43.1 24 46C33.7 43.1 41 33.5 41 23V11L24 4Z"
            fill="#0B1220"
            stroke="url(#shield-grad)"
            strokeWidth="2.5"
            strokeLinejoin="round"
          />
          {/* Subtle Inner Accent Grid */}
          <path
            d="M24 8L11 13.5V23C11 31 16.5 38.5 24 41C31.5 38.5 37 31 37 23V13.5L24 8Z"
            stroke="rgba(0, 240, 255, 0.2)"
            strokeWidth="1"
            strokeDasharray="2 2"
          />
          {/* Cyber G Core Element */}
          <path
            d="M28 17H20C17.79 17 16 18.79 16 21V27C16 29.21 17.79 31 20 31H28C30.21 31 32 29.21 32 27V23H24"
            stroke="url(#g-grad)"
            strokeWidth="3.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Center Target Core Point */}
          <circle cx="24" cy="24" r="2" fill="#00F0FF" />

          {/* Gradients */}
          <defs>
            <linearGradient id="shield-grad" x1="7" y1="4" x2="41" y2="46" gradientUnits="userSpaceOnUse">
              <stop stopColor="#00F0FF" />
              <stop offset="0.5" stopColor="#3B82F6" />
              <stop offset="1" stopColor="#10B981" />
            </linearGradient>
            <linearGradient id="g-grad" x1="16" y1="17" x2="32" y2="31" gradientUnits="userSpaceOnUse">
              <stop stopColor="#FFFFFF" />
              <stop offset="0.7" stopColor="#00F0FF" />
            </linearGradient>
          </defs>
        </svg>
      </div>

      {showText && (
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-xl font-extrabold tracking-wider text-white font-['Outfit']">
              GALAX
            </span>
            <span className="px-1.5 py-0.5 text-[9px] font-bold tracking-widest uppercase rounded border border-cyan-500/40 bg-cyan-500/10 text-cyan-400 font-mono">
              SHIELD
            </span>
          </div>
          {subtitle && (
            <span className="text-[10px] tracking-wider text-slate-400 font-mono uppercase">
              Detect • Explain • Protect
            </span>
          )}
        </div>
      )}
    </div>
  );
}
