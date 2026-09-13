import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import LocalShield from './components/LocalShield';
import DefaultShield from './components/DefaultShield';
import ThreatHistory from './components/ThreatHistory';
import PrivacyCenter from './components/PrivacyCenter';
import Settings from './components/Settings';
import OnboardingModal from './components/OnboardingModal';
import GalaxIntelligence from './components/GalaxIntelligence';
import Logo from './components/Logo';

export default function App() {
  const [currentTab, setCurrentTab] = useState('landing');
  const [onboardingOpen, setOnboardingOpen] = useState(false);
  const [assistantOpen, setAssistantOpen] = useState(false);
  const [activeAssistantContext, setActiveAssistantContext] = useState(null);
  const [initialPreset, setInitialPreset] = useState(null);

  // Backend state
  const [dashboardData, setDashboardData] = useState(null);
  const [integrations, setIntegrations] = useState([]);
  const [inboxMessages, setInboxMessages] = useState([]);
  const [threats, setThreats] = useState([]);
  const [privacyData, setPrivacyData] = useState(null);

  // Load initial data
  const fetchData = async () => {
    try {
      // 1. Dashboard
      const dashResp = await fetch('/api/dashboard');
      if (dashResp.ok) {
        const d = await dashResp.json();
        setDashboardData(d);
      }

      // 2. Integrations
      const intResp = await fetch('/api/integrations');
      if (intResp.ok) {
        const i = await intResp.json();
        setIntegrations(i.integrations || []);
      }

      // 3. Gmail inbox feed
      const inboxResp = await fetch('/api/integrations/gmail/inbox');
      if (inboxResp.ok) {
        const m = await inboxResp.json();
        setInboxMessages(m.messages || []);
      }

      // 4. Threats
      const threatResp = await fetch('/api/threats');
      if (threatResp.ok) {
        const t = await threatResp.json();
        setThreats(t.threats || []);
      }

      // 5. Privacy
      const privResp = await fetch('/api/privacy');
      if (privResp.ok) {
        const p = await privResp.json();
        setPrivacyData(p);
      }
    } catch (err) {
      console.warn("Backend API fetching encountered offline fallback.", err);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleOpenAssistantWithContext = (context) => {
    setActiveAssistantContext(context);
    setAssistantOpen(true);
  };

  const handleLoadPreset = (presetType) => {
    setInitialPreset(presetType);
    setCurrentTab('local-shield');
  };

  const handleToggleIntegration = async (id, newStatus) => {
    try {
      const resp = await fetch(`/api/integrations/${id}/toggle`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus })
      });
      if (resp.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleDismissAlert = async (alertId) => {
    try {
      const resp = await fetch(`/api/dashboard/alerts/${alertId}/dismiss`, {
        method: 'POST'
      });
      if (resp.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handlePurgeData = async () => {
    try {
      const resp = await fetch('/api/privacy/purge', {
        method: 'POST'
      });
      if (resp.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleClearHistory = async () => {
    try {
      const resp = await fetch('/api/threats/clear', {
        method: 'POST'
      });
      if (resp.ok) {
        fetchData();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectThreatFromList = (threatId) => {
    const item = threats.find(t => t.id === threatId) || dashboardData?.recent_threats?.find(t => t.id === threatId);
    if (item) {
      handleOpenAssistantWithContext({
        threat_type: item.threat_type,
        risk_score: item.risk_score,
        risk_level: item.risk_level,
        evidence_cards: item.full_result?.evidence_cards || []
      });
    }
  };

  return (
    <div className="min-h-screen bg-[#06080F] text-slate-100 flex flex-col font-['Plus_Jakarta_Sans'] relative selection:bg-cyan-500 selection:text-black">
      
      {/* Background Cyber Grid */}
      <div className="fixed inset-0 cyber-grid opacity-60 pointer-events-none -z-10" />
      <div className="fixed inset-0 cyber-radial pointer-events-none -z-10" />

      {/* Top Navbar */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        onQuickScan={() => setCurrentTab('local-shield')}
        onOpenOnboarding={() => setOnboardingOpen(true)}
        protectionStatus={dashboardData?.stats?.protection_status || "PROTECTED"}
        onLoadPreset={handleLoadPreset}
      />

      {/* Main Content Area */}
      <main className="flex-1 w-full">
        {currentTab === 'landing' && (
          <LandingPage
            onGetStarted={() => setOnboardingOpen(true)}
            onTryLocalShield={() => setCurrentTab('local-shield')}
          />
        )}

        {currentTab === 'dashboard' && (
          <Dashboard
            dashboardData={dashboardData}
            onNavigate={(tab) => setCurrentTab(tab)}
            onDismissAlert={handleDismissAlert}
            onSelectThreat={handleSelectThreatFromList}
            onOpenQuickScan={() => setCurrentTab('local-shield')}
          />
        )}

        {currentTab === 'local-shield' && (
          <LocalShield
            onOpenAssistant={handleOpenAssistantWithContext}
            initialPreset={initialPreset}
            onClearPreset={() => setInitialPreset(null)}
          />
        )}

        {currentTab === 'default-shield' && (
          <DefaultShield
            integrations={integrations}
            onToggleIntegration={handleToggleIntegration}
            inboxMessages={inboxMessages}
            onSelectThreat={handleSelectThreatFromList}
          />
        )}

        {currentTab === 'threat-history' && (
          <ThreatHistory
            threats={threats}
            onSelectThreat={handleSelectThreatFromList}
            onClearHistory={handleClearHistory}
          />
        )}

        {currentTab === 'privacy-center' && (
          <PrivacyCenter
            integrations={integrations}
            onToggleIntegration={handleToggleIntegration}
            onPurgeData={handlePurgeData}
            privacyData={privacyData}
          />
        )}

        {currentTab === 'settings' && (
          <Settings
            onPurgeData={handlePurgeData}
            onDisconnectAll={() => {
              integrations.forEach(i => handleToggleIntegration(i.id, 'disconnected'));
            }}
            onExportData={() => {
              const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify({ dashboardData, threats, integrations }, null, 2));
              const downloadAnchor = document.createElement('a');
              downloadAnchor.setAttribute("href", dataStr);
              downloadAnchor.setAttribute("download", `galax_full_data_export.json`);
              document.body.appendChild(downloadAnchor);
              downloadAnchor.click();
              downloadAnchor.remove();
            }}
          />
        )}
      </main>

      {/* GALAX Intelligence Assistant Drawer */}
      <GalaxIntelligence
        isOpen={assistantOpen}
        onClose={() => setAssistantOpen(false)}
        activeContext={activeAssistantContext}
      />

      {/* Onboarding Flow Modal */}
      <OnboardingModal
        isOpen={onboardingOpen}
        onClose={() => setOnboardingOpen(false)}
        onSelectMode={(mode) => {
          if (mode === 'local') {
            setCurrentTab('local-shield');
          } else {
            setCurrentTab('default-shield');
          }
        }}
      />

      {/* Footer */}
      <footer className="border-t border-slate-900 bg-[#04060B] py-8 mt-16 text-xs font-mono text-slate-500">
        <div className="max-w-7xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Logo size={20} showText={true} />
            <span className="text-slate-600">|</span>
            <span>Detect. Explain. Protect.</span>
          </div>

          <div className="flex items-center gap-6">
            <button onClick={() => setCurrentTab('privacy-center')} className="hover:text-cyan-400 transition">
              Privacy Architecture
            </button>
            <button onClick={() => setCurrentTab('default-shield')} className="hover:text-cyan-400 transition">
              Least Privilege Matrix
            </button>
            <button onClick={() => setCurrentTab('threat-history')} className="hover:text-cyan-400 transition">
              Audit Logs
            </button>
          </div>

          <div className="text-[10px] text-slate-600">
            © 2026 GALAX Defense Systems. AI-Powered Personal Digital Shield.
          </div>
        </div>
      </footer>

    </div>
  );
}
