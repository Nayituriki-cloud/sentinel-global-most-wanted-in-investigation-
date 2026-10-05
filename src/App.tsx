import React, { useState } from 'react';
import { AuthProvider } from './context/AuthContext';
import { PlatformProvider } from './context/PlatformContext';
import { Navbar } from './components/layout/Navbar';
import { Footer } from './components/layout/Footer';
import { OverviewDashboard } from './components/dashboard/OverviewDashboard';
import { MostWantedList } from './components/wanted/MostWantedList';
import { WantedDetailModal } from './components/wanted/WantedDetailModal';
import { MissionCenter } from './components/missions/MissionCenter';
import { CaseManagementView } from './components/wanted/CaseManagementView';
import { PublicTipPortal } from './components/tips/PublicTipPortal';
import { TipReviewQueue } from './components/tips/TipReviewQueue';
import { PublicSafetyMap } from './components/map/PublicSafetyMap';
import { AgencyDirectory } from './components/agencies/AgencyDirectory';
import { AuditLogViewer } from './components/audit/AuditLogViewer';
import { SecuritySettingsView } from './components/security/SecuritySettingsView';
import { AIAssistantModal } from './components/ai/AIAssistantModal';
import { WantedPerson, Mission } from './types';
import { AlertTriangle, FileText, Send, Eye } from 'lucide-react';

function PlatformApp() {
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [selectedPersonForDetail, setSelectedPersonForDetail] = useState<WantedPerson | null>(null);
  const [selectedMissionId, setSelectedMissionId] = useState<string | undefined>(undefined);
  const [isSubmitTipModalOpen, setIsSubmitTipModalOpen] = useState(false);
  const [tipPreselectedPerson, setTipPreselectedPerson] = useState<WantedPerson | null>(null);
  const [isAIAssistantOpen, setIsAIAssistantOpen] = useState(false);
  const [tipsSubTab, setTipsSubTab] = useState<'submit' | 'queue'>('submit');

  const handleOpenSubmitTip = (person?: WantedPerson) => {
    setTipPreselectedPerson(person || null);
    setIsSubmitTipModalOpen(true);
  };

  const handleSelectCase = (person: WantedPerson) => {
    setSelectedPersonForDetail(person);
  };

  const handleSelectMission = (mission: Mission) => {
    setSelectedMissionId(mission.id);
    setCurrentTab('missions');
  };

  const handleRunDuplicateCheck = (person: WantedPerson) => {
    setIsAIAssistantOpen(true);
  };

  return (
    <div className="min-h-screen bg-[#070D1F] text-slate-100 flex flex-col font-sans selection:bg-blue-600 selection:text-white">
      {/* Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        openSubmitTipModal={() => handleOpenSubmitTip()}
        openAIAssistant={() => setIsAIAssistantOpen(true)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentTab === 'dashboard' && (
          <OverviewDashboard
            onNavigate={(tab) => setCurrentTab(tab)}
            onSelectCase={handleSelectCase}
            onSelectMission={handleSelectMission}
            openSubmitTip={() => handleOpenSubmitTip()}
            openAIAssistant={() => setIsAIAssistantOpen(true)}
          />
        )}

        {currentTab === 'wanted' && (
          <MostWantedList
            onSelectPerson={handleSelectCase}
            onOpenSubmitTipForPerson={handleOpenSubmitTip}
            onRunDuplicateCheck={handleRunDuplicateCheck}
          />
        )}

        {currentTab === 'missions' && (
          <MissionCenter
            onSelectCase={handleSelectCase}
            selectedMissionId={selectedMissionId}
          />
        )}

        {currentTab === 'cases' && (
          <CaseManagementView
            onSelectPerson={handleSelectCase}
          />
        )}

        {currentTab === 'tips' && (
          <div className="space-y-6">
            {/* Sub-navigation between Public Tip Form and Investigator Queue */}
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTipsSubTab('submit')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                    tipsSubTab === 'submit'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  Public Sighting Submission
                </button>
                <button
                  onClick={() => setTipsSubTab('queue')}
                  className={`px-4 py-2 rounded-lg text-xs font-bold transition flex items-center gap-2 ${
                    tipsSubTab === 'queue'
                      ? 'bg-blue-600 text-white shadow-md'
                      : 'bg-slate-900 text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  Investigator Triage Queue
                </button>
              </div>
            </div>

            {tipsSubTab === 'submit' ? (
              <PublicTipPortal
                preselectedCase={tipPreselectedPerson}
                onSuccess={(tipId) => {
                  // Keep user aware
                }}
              />
            ) : (
              <TipReviewQueue onSelectCase={handleSelectCase} />
            )}
          </div>
        )}

        {currentTab === 'map' && (
          <PublicSafetyMap
            onSelectPerson={handleSelectCase}
            onSubmitTipForPerson={handleOpenSubmitTip}
          />
        )}

        {currentTab === 'agencies' && (
          <AgencyDirectory />
        )}

        {currentTab === 'audit' && (
          <AuditLogViewer />
        )}

        {currentTab === 'security' && (
          <SecuritySettingsView />
        )}
      </main>

      {/* Case Dossier Modal */}
      <WantedDetailModal
        person={selectedPersonForDetail}
        onClose={() => setSelectedPersonForDetail(null)}
        onSubmitTip={(p) => {
          setSelectedPersonForDetail(null);
          handleOpenSubmitTip(p);
        }}
      />

      {/* Standalone Public Tip Modal if opened via Header Button */}
      {isSubmitTipModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto">
          <div className="w-full max-w-2xl">
            <PublicTipPortal
              preselectedCase={tipPreselectedPerson}
              onClose={() => {
                setIsSubmitTipModalOpen(false);
                setTipPreselectedPerson(null);
              }}
              onSuccess={() => {}}
            />
          </div>
        </div>
      )}

      {/* AI Assistant Modal */}
      <AIAssistantModal
        isOpen={isAIAssistantOpen}
        onClose={() => setIsAIAssistantOpen(false)}
      />

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <PlatformProvider>
        <PlatformApp />
      </PlatformProvider>
    </AuthProvider>
  );
}
