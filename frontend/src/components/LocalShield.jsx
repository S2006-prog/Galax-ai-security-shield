import React, { useState, useEffect } from 'react';
import { 
  Shield, 
  MessageSquare, 
  Globe, 
  Image as ImageIcon, 
  Upload, 
  ArrowRight, 
  Sparkles, 
  Zap, 
  AlertCircle, 
  CheckCircle, 
  Lock,
  Cpu,
  RefreshCw,
  Sliders
} from 'lucide-react';
import AnalysisResult from './AnalysisResult';

export default function LocalShield({ 
  onOpenAssistant, 
  initialPreset = null,
  onClearPreset 
}) {
  const [activeTab, setActiveTab] = useState('text'); // 'text' | 'url' | 'screenshot'
  const [textContent, setTextContent] = useState('');
  const [urlContent, setUrlContent] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [loading, setLoading] = useState(false);
  const [loadingStep, setLoadingStep] = useState('');
  const [analysisResult, setAnalysisResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState('');

  // 5 Realistic Demo Presets
  const demoSamples = [
    {
      id: 'kyc',
      title: 'Fake Bank KYC Freeze',
      category: 'Phishing',
      type: 'text',
      content: 'Your bank account will be blocked in 30 minutes. Verify your KYC immediately by clicking this link: http://chase-security-verify.xyz/login to avoid permanent suspension.'
    },
    {
      id: 'lottery',
      title: 'International Lottery Win',
      category: 'Advance Fee',
      type: 'text',
      content: 'Congratulations! You have won $1,000,000 in the 2026 Global Tech Sweepstakes. To release your payout, wire a $250 processing and tax clearance fee to our escrow officer.'
    },
    {
      id: 'job',
      title: 'Remote Job Offer Scam',
      category: 'Employment',
      type: 'text',
      content: 'Dear Candidate, Congratulations! Google Talent Acquisition selected you for Remote AI Data Auditor ($75/hr). To receive your company MacBook and security credentials, wire $150 registration deposit.'
    },
    {
      id: 'crypto',
      title: 'Crypto 300% ROI Scheme',
      category: 'Ponzi',
      type: 'text',
      content: 'Private VIP Alpha: Automated quantitative arbitrage smart contract guarantees 300% profit within 24 hours. Send minimum 0.5 ETH to 0x71C6... to start immediate automated compounding.'
    },
    {
      id: 'url',
      title: 'Spoofed Domain URL',
      category: 'Typosquatting',
      type: 'url',
      content: 'https://paypal-secure-authorization.xyz/webapps/mpp/account-recovery'
    }
  ];

  // If a preset was triggered from Navbar or external
  useEffect(() => {
    if (initialPreset) {
      const match = demoSamples.find(s => s.id === initialPreset);
      if (match) {
        if (match.type === 'url') {
          setActiveTab('url');
          setUrlContent(match.content);
        } else {
          setActiveTab('text');
          setTextContent(match.content);
        }
        setAnalysisResult(null);
      }
      if (onClearPreset) onClearPreset();
    }
  }, [initialPreset]);

  const handleApplyPreset = (sample) => {
    setErrorMsg('');
    setAnalysisResult(null);
    if (sample.type === 'url') {
      setActiveTab('url');
      setUrlContent(sample.content);
    } else {
      setActiveTab('text');
      setTextContent(sample.content);
    }
  };

  const handleAnalyzeText = async () => {
    if (!textContent.trim()) {
      setErrorMsg('Please paste or type a suspicious message to analyze.');
      return;
    }
    setErrorMsg('');
    setLoading(true);
    setLoadingStep('Tokenizing input heuristics...');

    try {
      setTimeout(() => setLoadingStep('Evaluating urgency & coercion vectors...'), 400);
      setTimeout(() => setLoadingStep('Cross-referencing brand impersonation models...'), 800);

      const resp = await fetch('/api/analyze/text', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: textContent, source_type: 'text' })
      });

      if (!resp.ok) {
        throw new Error('Analysis request failed.');
      }
      const data = await resp.json();
      setAnalysisResult(data);
    } catch (err) {
      setErrorMsg('Analysis service temporarily unavailable. Please try again.');
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  const handleAnalyzeUrl = async () => {
    if (!urlContent.trim()) {
      setErrorMsg('Please enter a URL to inspect.');
      return;
    }
    setErrorMsg('');
    setLoading(true);
    setLoadingStep('Resolving host & SSL protocol...');

    try {
      setTimeout(() => setLoadingStep('Scanning typosquatting registry & Levenshtein index...'), 400);
      setTimeout(() => setLoadingStep('Evaluating TLD abuse reputation & deceptive tokens...'), 800);

      const resp = await fetch('/api/analyze/url', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ url: urlContent })
      });

      if (!resp.ok) {
        const errData = await resp.json();
        throw new Error(errData.detail || 'URL inspection failed.');
      }
      const data = await resp.json();
      setAnalysisResult(data);
    } catch (err) {
      setErrorMsg(err.message || 'Inspection failed.');
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setSelectedFile(file);
      setImagePreview(URL.createObjectURL(file));
      setAnalysisResult(null);
      setErrorMsg('');
    }
  };

  const handleAnalyzeImage = async () => {
    if (!selectedFile) {
      setErrorMsg('Please upload a screenshot or image.');
      return;
    }
    setErrorMsg('');
    setLoading(true);
    setLoadingStep('Scanning image layer with optical character recognition...');

    try {
      setTimeout(() => setLoadingStep('Extracting suspicious textual entities & URLs...'), 600);
      setTimeout(() => setLoadingStep('Passing extracted tokens to GALAX Risk Engine...'), 1200);

      const formData = new FormData();
      formData.append('file', selectedFile);

      const resp = await fetch('/api/analyze/image', {
        method: 'POST',
        body: formData
      });

      if (!resp.ok) {
        throw new Error('Screenshot analysis failed.');
      }
      const data = await resp.json();
      setAnalysisResult(data);
    } catch (err) {
      setErrorMsg('Failed to process screenshot. Check file format.');
    } finally {
      setLoading(false);
      setLoadingStep('');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8 animate-in fade-in">
      
      {/* Top Section */}
      <div className="space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-cyan-400">
          <Shield className="w-3.5 h-3.5" />
          <span>ZERO-ACCOUNT PRIVACY SHIELD</span>
        </div>
        <h1 className="text-3xl font-extrabold text-white tracking-tight font-['Outfit']">
          Local Threat Analysis Engine
        </h1>
        <p className="text-slate-400 text-sm max-w-2xl leading-relaxed">
          Submit suspicious messages, unverified URLs, or screenshot captures. 
          Evaluated locally in volatile memory with zero cloud telemetry retention.
        </p>
      </div>

      {/* Preset Scenario Quick-Bar */}
      <div className="p-3.5 rounded-2xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-center gap-2 text-xs font-mono text-slate-300">
          <Sparkles className="w-4 h-4 text-amber-400" />
          <span>Test with Realistic Attack Scenarios:</span>
        </div>
        <div className="flex flex-wrap gap-2">
          {demoSamples.map((sample) => (
            <button
              key={sample.id}
              onClick={() => handleApplyPreset(sample)}
              className="px-2.5 py-1 rounded-lg text-xs font-medium bg-slate-800/80 hover:bg-cyan-500/20 text-slate-300 hover:text-cyan-300 border border-slate-700 hover:border-cyan-500/40 transition"
            >
              {sample.title}
            </button>
          ))}
        </div>
      </div>

      {/* If Result exists, display it; otherwise show Scanner Workspace */}
      {analysisResult ? (
        <AnalysisResult 
          result={analysisResult} 
          onReset={() => {
            setAnalysisResult(null);
            setErrorMsg('');
          }}
          onOpenAssistant={onOpenAssistant}
        />
      ) : (
        <div className="space-y-6">
          
          {/* Mode Selector Tabs */}
          <div className="flex items-center gap-2 border-b border-slate-800 pb-2">
            <button
              onClick={() => { setActiveTab('text'); setErrorMsg(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold font-mono transition ${
                activeTab === 'text' 
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.1)]' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <MessageSquare className="w-4 h-4" />
              <span>1. Text / Message</span>
            </button>

            <button
              onClick={() => { setActiveTab('url'); setErrorMsg(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold font-mono transition ${
                activeTab === 'url' 
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.1)]' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <Globe className="w-4 h-4" />
              <span>2. URL / Domain Scanner</span>
            </button>

            <button
              onClick={() => { setActiveTab('screenshot'); setErrorMsg(''); }}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-semibold font-mono transition ${
                activeTab === 'screenshot' 
                  ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/40 shadow-[0_0_15px_rgba(0,240,255,0.1)]' 
                  : 'text-slate-400 hover:text-slate-200'
              }`}
            >
              <ImageIcon className="w-4 h-4" />
              <span>3. Screenshot & OCR</span>
            </button>
          </div>

          {/* Error notification */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-rose-950/40 border border-rose-500/40 text-rose-300 text-xs flex items-center gap-2 animate-in fade-in">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Tab 1: Text / Message Input */}
          {activeTab === 'text' && (
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-4">
              <div className="flex items-center justify-between">
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
                  Suspicious Message / Email Content
                </label>
                <span className="text-[11px] text-slate-500 font-mono">
                  {textContent.length} characters
                </span>
              </div>

              <textarea
                value={textContent}
                onChange={(e) => setTextContent(e.target.value)}
                placeholder="Paste SMS, WhatsApp text, email body, job offer, or payment demand here...&#10;Example: 'Your bank account will be blocked in 30 minutes. Verify your KYC immediately by clicking this link.'"
                rows={7}
                className="w-full bg-slate-950/80 border border-slate-800 rounded-xl p-4 text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 transition font-mono leading-relaxed"
              />

              <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-2">
                <div className="flex items-center gap-2 text-xs text-slate-400 font-mono">
                  <Lock className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Encrypted in-memory inspection. No logs kept.</span>
                </div>

                <button
                  onClick={handleAnalyzeText}
                  disabled={loading || !textContent.trim()}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(0,240,255,0.25)] transition-all active:scale-95"
                >
                  <Cpu className="w-4 h-4" />
                  <span>Analyze Message Threats</span>
                </button>
              </div>
            </div>
          )}

          {/* Tab 2: URL Scanner */}
          {activeTab === 'url' && (
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
                  Target Destination URL
                </label>
                <p className="text-xs text-slate-400 mt-1">
                  Evaluates SSL validity, brand typosquatting, high-abuse TLDs, and homoglyph disguises.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-3">
                <div className="relative flex-1 w-full">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-slate-500">
                    <Globe className="w-4 h-4" />
                  </div>
                  <input
                    type="text"
                    value={urlContent}
                    onChange={(e) => setUrlContent(e.target.value)}
                    placeholder="example-security-login.xyz or https://paypal-verification.support"
                    className="w-full pl-10 pr-4 py-3 bg-slate-950/80 border border-slate-800 rounded-xl text-sm text-slate-100 placeholder-slate-500 focus:outline-none focus:border-cyan-500/50 font-mono"
                  />
                </div>

                <button
                  onClick={handleAnalyzeUrl}
                  disabled={loading || !urlContent.trim()}
                  className="w-full sm:w-auto flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 disabled:opacity-40 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(0,240,255,0.25)] transition-all active:scale-95"
                >
                  <Globe className="w-4 h-4" />
                  <span>Scan URL Heuristics</span>
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 text-xs font-mono text-slate-400">
                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
                  <span className="text-slate-300 font-bold block mb-1">Typosquatting Check</span>
                  Compares Levenshtein distance across 50+ banking & tech giants.
                </div>
                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
                  <span className="text-slate-300 font-bold block mb-1">TLD Risk Index</span>
                  Screens disposable domains (.xyz, .top, .buzz, .sbs, etc.).
                </div>
                <div className="p-3 rounded-xl bg-slate-950/50 border border-slate-800/80">
                  <span className="text-slate-300 font-bold block mb-1">Homoglyph Guard</span>
                  Flags Punycode and Cyrillic character substitution tricks.
                </div>
              </div>
            </div>
          )}

          {/* Tab 3: Screenshot & OCR */}
          {activeTab === 'screenshot' && (
            <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 space-y-5">
              <div>
                <label className="text-xs font-mono uppercase tracking-wider text-slate-300">
                  Analyze Screenshot / Capture
                </label>
                <p className="text-xs text-slate-400 mt-1">
                  Upload suspicious payment receipts, SMS screen grabs, QR codes, or email images.
                </p>
              </div>

              {/* Upload Dropzone */}
              <div className="relative border-2 border-dashed border-slate-700 hover:border-cyan-500/50 rounded-2xl p-8 text-center bg-slate-950/40 hover:bg-slate-950/80 transition cursor-pointer overflow-hidden group">
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
                />

                {imagePreview ? (
                  <div className="space-y-4">
                    <img 
                      src={imagePreview} 
                      alt="Capture Preview" 
                      className="max-h-56 mx-auto rounded-xl border border-slate-700 object-contain shadow-xl"
                    />
                    <div className="flex items-center justify-center gap-2 text-xs font-mono text-cyan-400">
                      <CheckCircle className="w-4 h-4" />
                      <span>{selectedFile?.name} ready for OCR forensic analysis</span>
                    </div>
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center space-y-3">
                    <div className="p-4 rounded-2xl bg-slate-900 border border-slate-800 group-hover:border-cyan-500/40 text-cyan-400 group-hover:scale-110 transition-transform">
                      <Upload className="w-8 h-8" />
                    </div>
                    <div>
                      <span className="text-sm font-semibold text-slate-200 block">
                        Click or drag & drop capture here
                      </span>
                      <span className="text-xs text-slate-500 font-mono">
                        Supports PNG, JPG, WEBP screenshots up to 10MB
                      </span>
                    </div>
                  </div>
                )}
              </div>

              {selectedFile && (
                <div className="flex justify-end">
                  <button
                    onClick={handleAnalyzeImage}
                    disabled={loading}
                    className="flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 font-bold text-xs shadow-[0_0_20px_rgba(0,240,255,0.25)] transition-all active:scale-95"
                  >
                    <Cpu className="w-4 h-4" />
                    <span>Run OCR & Threat Scoring</span>
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Radar Scan Overlay Loading State */}
          {loading && (
            <div className="p-8 rounded-2xl bg-slate-900/90 border border-cyan-500/30 shadow-2xl relative overflow-hidden text-center space-y-4">
              <div className="absolute inset-x-0 h-1 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-radar-sweep pointer-events-none" />
              
              <div className="flex justify-center">
                <div className="p-4 rounded-full bg-cyan-500/10 border border-cyan-500/40 text-cyan-400 animate-pulse">
                  <RefreshCw className="w-8 h-8 animate-spin" />
                </div>
              </div>

              <div className="space-y-1">
                <h3 className="text-base font-bold text-white font-['Outfit']">
                  GALAX Threat Inspection Active
                </h3>
                <p className="text-xs font-mono text-cyan-300">
                  {loadingStep || 'Executing heuristic risk engine...'}
                </p>
              </div>

              <div className="flex justify-center gap-2 pt-2">
                <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                <span className="text-[10px] font-mono text-slate-400">
                  Evaluating against 2026 adversarial heuristics
                </span>
              </div>
            </div>
          )}

        </div>
      )}

    </div>
  );
}
