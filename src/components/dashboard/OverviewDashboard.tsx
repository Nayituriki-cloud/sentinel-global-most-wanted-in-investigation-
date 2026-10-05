import React from 'react';
import { 
  ShieldAlert, 
  Users, 
  SlidersHorizontal, 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  MapPin, 
  FileCheck2, 
  Bot, 
  ArrowRight,
  TrendingUp,
  Scale
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { useAuth } from '../../context/AuthContext';
import { WantedPerson, Mission } from '../../types';

interface OverviewDashboardProps {
  onNavigate: (tab: string) => void;
  onSelectCase: (wanted: WantedPerson) => void;
  onSelectMission: (mission: Mission) => void;
  openSubmitTip: () => void;
  openAIAssistant: () => void;
}

export const OverviewDashboard: React.FC<OverviewDashboardProps> = ({
  onNavigate,
  onSelectCase,
  onSelectMission,
  openSubmitTip,
  openAIAssistant
}) => {
  const { wantedPersons, missions, tips } = usePlatform();
  const { currentUser } = useAuth();

  const activeWanted = wantedPersons.filter((w) => w.status === 'ACTIVE');
  const criticalWanted = wantedPersons.filter((w) => w.priority === 'CRITICAL');
  const activeMissions = missions.filter((m) => m.status === 'ACTIVE' || m.status === 'INFORMATION RECEIVED');
  const pendingTips = tips.filter((t) => t.status === 'SUBMITTED' || t.status === 'TRIAGED');
  const corroboratedTips = tips.filter((t) => t.status === 'CORROBORATED');

  return (
    <div className="space-y-6">
      {/* Platform Banner / Due Process & Safety Notice */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-slate-900 via-blue-950 to-slate-900 border border-blue-500/20 p-6 shadow-2xl">
        <div className="absolute right-0 top-0 translate-x-8 -translate-y-8 w-64 h-64 bg-blue-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 relative z-10">
          <div className="space-y-2 max-w-3xl">
            <div className="flex flex-wrap items-center gap-2">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider bg-blue-600 text-white uppercase shadow-sm">
                Lawful Operations Network
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-emerald-950 text-emerald-300 border border-emerald-800/60 flex items-center gap-1">
                <CheckCircle2 className="w-3 h-3" />
                100% Judicial Warrant Verified
              </span>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-medium bg-slate-800 text-slate-300 border border-slate-700 flex items-center gap-1">
                <Scale className="w-3 h-3 text-amber-400" />
                Presumption of Innocence Enforced
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black text-white tracking-tight">
              Global Public Safety & Most Wanted Mission Center
            </h1>
            <p className="text-sm text-slate-300 leading-relaxed">
              Authorized central clearinghouse coordinating international fugitive search operations, encrypted public tip processing, and multilateral judicial warrants across partner agencies worldwide.
            </p>
          </div>

          <div className="flex flex-wrap sm:flex-nowrap gap-3 w-full md:w-auto">
            <button
              onClick={openSubmitTip}
              className="flex-1 sm:flex-initial bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-4 py-2.5 rounded-lg text-xs transition shadow-lg shadow-amber-900/20 flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              Submit Public Tip
            </button>
            <button
              onClick={openAIAssistant}
              className="flex-1 sm:flex-initial bg-indigo-600/90 hover:bg-indigo-600 text-white font-semibold px-4 py-2.5 rounded-lg text-xs transition border border-indigo-400/30 shadow-lg flex items-center justify-center gap-2"
            >
              <Bot className="w-4 h-4 text-indigo-200" />
              AI Intel Triage
            </button>
          </div>
        </div>
      </div>

      {/* High-Level Metric Tiles */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div 
          onClick={() => onNavigate('wanted')}
          className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-xl p-4 transition cursor-pointer group shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Wanted</span>
            <div className="w-8 h-8 rounded-lg bg-rose-950/80 text-rose-400 flex items-center justify-center border border-rose-800/40 group-hover:scale-105 transition-transform">
              <ShieldAlert className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{activeWanted.length}</span>
            <span className="text-[11px] font-semibold text-rose-400">({criticalWanted.length} Critical P1)</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
            <span>Verified warrants across 196 states</span>
            <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
          </p>
        </div>

        <div 
          onClick={() => onNavigate('missions')}
          className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-xl p-4 transition cursor-pointer group shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Active Missions</span>
            <div className="w-8 h-8 rounded-lg bg-blue-950/80 text-blue-400 flex items-center justify-center border border-blue-800/40 group-hover:scale-105 transition-transform">
              <SlidersHorizontal className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{activeMissions.length}</span>
            <span className="text-[11px] font-semibold text-blue-300">of {missions.length} assigned</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
            <span>Transnational tactical coordination</span>
            <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-blue-400" />
          </p>
        </div>

        <div 
          onClick={() => onNavigate('tips')}
          className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-amber-500/50 rounded-xl p-4 transition cursor-pointer group shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Tips & Sightings</span>
            <div className="w-8 h-8 rounded-lg bg-amber-950/80 text-amber-400 flex items-center justify-center border border-amber-800/40 group-hover:scale-105 transition-transform">
              <AlertTriangle className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">{tips.length}</span>
            <span className="text-[11px] font-semibold text-amber-400">({corroboratedTips.length} Corroborated)</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
            <span>{pendingTips.length} pending human review</span>
            <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-amber-400" />
          </p>
        </div>

        <div 
          onClick={() => onNavigate('map')}
          className="bg-slate-900/80 hover:bg-slate-900 border border-slate-800 hover:border-emerald-500/50 rounded-xl p-4 transition cursor-pointer group shadow-md"
        >
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">Macro Jurisdictions</span>
            <div className="w-8 h-8 rounded-lg bg-emerald-950/80 text-emerald-400 flex items-center justify-center border border-emerald-800/40 group-hover:scale-105 transition-transform">
              <MapPin className="w-4 h-4" />
            </div>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-black text-white">6 Zones</span>
            <span className="text-[11px] font-semibold text-emerald-400">Public-safe data</span>
          </div>
          <p className="text-[10px] text-slate-400 mt-1 flex items-center gap-1">
            <span>Zero private/operational tracking</span>
            <ArrowRight className="w-3 h-3 ml-auto opacity-0 group-hover:opacity-100 transition-opacity text-emerald-400" />
          </p>
        </div>
      </div>

      {/* Main Grid: Priority Cases & Active Missions Feed */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column (2 cols): High Priority Wanted Notices */}
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 text-rose-400" />
              <h2 className="text-base font-bold text-white tracking-wide">
                Priority 1 — Critical Most Wanted Notices
              </h2>
            </div>
            <button
              onClick={() => onNavigate('wanted')}
              className="text-xs font-medium text-blue-400 hover:text-blue-300 flex items-center gap-1"
            >
              <span>View All ({wantedPersons.length})</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>

          <div className="space-y-3">
            {criticalWanted.map((person) => (
              <div
                key={person.id}
                onClick={() => onSelectCase(person)}
                className="bg-slate-900/90 hover:bg-slate-850 border border-slate-800 hover:border-slate-700 rounded-xl p-4 transition cursor-pointer flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between group shadow-sm"
              >
                <div className="flex items-center gap-4">
                  <div className="relative">
                    <img
                      src={person.photoUrl}
                      alt={person.name}
                      className="w-16 h-16 rounded-lg object-cover border border-slate-700 bg-slate-800"
                    />
                    <span className="absolute -bottom-1 -right-1 px-1 py-0.2 rounded text-[8px] font-bold font-mono bg-rose-600 text-white">
                      P1
                    </span>
                  </div>
                  <div className="space-y-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <h3 className="font-bold text-white text-base group-hover:text-blue-300 transition-colors">
                        {person.name}
                      </h3>
                      <span className="text-xs text-slate-400 font-mono">
                        ({person.caseNumber})
                      </span>
                      <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800/60">
                        {person.warrantCategory.replace('_', ' ')}
                      </span>
                    </div>
                    <p className="text-xs text-slate-300 line-clamp-1">
                      {person.chargesSummary}
                    </p>
                    <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
                      <span>Authority: <strong className="text-slate-300">{person.issuingAuthority}</strong></span>
                      <span>•</span>
                      <span>Verified: {person.dateLastVerified}</span>
                    </div>
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between w-full sm:w-auto pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-800 gap-2">
                  <span className="text-[11px] font-bold text-amber-400 font-mono">
                    {person.bountyReward ? person.bountyReward.split(' ')[0] : 'AUTHORIZED'}
                  </span>
                  <span className="px-2.5 py-1 rounded bg-blue-600/20 text-blue-300 border border-blue-500/30 text-xs font-medium group-hover:bg-blue-600 group-hover:text-white transition">
                    Open Dossier
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Notice Banner on Non-Vigilantism */}
          <div className="bg-amber-950/30 border border-amber-500/30 rounded-xl p-3.5 flex items-start gap-3 text-xs text-amber-200">
            <AlertTriangle className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
            <div className="leading-relaxed">
              <strong>Mandatory Protocol:</strong> SENTINEL strictly operates under legal due process. Information is published exclusively to assist authorized investigations and protect the general public. If you recognize any individual, report details immediately via our encrypted portal or local police dispatch.
            </div>
          </div>
        </div>

        {/* Right Column: Mission Center Pipeline & Live Tip Triage */}
        <div className="space-y-6">
          {/* Active Missions Progress */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <SlidersHorizontal className="w-4 h-4 text-blue-400" />
                <h3 className="font-bold text-white text-sm">Mission Lifecycle Feed</h3>
              </div>
              <button
                onClick={() => onNavigate('missions')}
                className="text-[11px] font-medium text-blue-400 hover:text-blue-300"
              >
                All Missions
              </button>
            </div>

            <div className="space-y-3">
              {missions.slice(0, 3).map((m) => {
                const targetCase = wantedPersons.find((w) => w.id === m.caseId);
                const completedSteps = m.actionChecklist.filter((c) => c.completed).length;
                const totalSteps = m.actionChecklist.length;
                const pct = Math.round((completedSteps / totalSteps) * 100);

                return (
                  <div
                    key={m.id}
                    onClick={() => onSelectMission(m)}
                    className="p-3 rounded-lg bg-slate-850 hover:bg-slate-800/80 border border-slate-800 transition cursor-pointer space-y-2"
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] font-bold text-blue-300">
                        {m.missionCode}
                      </span>
                      <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                        m.status === 'ACTIVE' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                        m.status === 'INFORMATION RECEIVED' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                        'bg-blue-950 text-blue-300'
                      }`}>
                        {m.status}
                      </span>
                    </div>

                    <p className="text-xs font-semibold text-slate-200">
                      Target: {targetCase?.name || 'Authorized Subject'}
                    </p>

                    <div className="space-y-1">
                      <div className="flex justify-between text-[10px] text-slate-400">
                        <span>Checklist: {completedSteps}/{totalSteps} items</span>
                        <span>{pct}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${pct}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Recent Tips Card */}
          <div className="bg-slate-900/80 border border-slate-800 rounded-xl p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-amber-400" />
                <h3 className="font-bold text-white text-sm">Public Tips Triage Queue</h3>
              </div>
              <button
                onClick={() => onNavigate('tips')}
                className="text-[11px] font-medium text-amber-400 hover:text-amber-300"
              >
                Review ({tips.length})
              </button>
            </div>

            <div className="space-y-2">
              {tips.slice(0, 3).map((tip) => (
                <div
                  key={tip.id}
                  onClick={() => onNavigate('tips')}
                  className="p-2.5 rounded-lg bg-slate-850 hover:bg-slate-800 border border-slate-800 transition cursor-pointer text-xs space-y-1"
                >
                  <div className="flex items-center justify-between text-[11px]">
                    <span className="font-mono font-bold text-slate-300">{tip.id}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      tip.urgencyScore === 'CRITICAL_IMMEDIATE' ? 'bg-rose-950 text-rose-300' :
                      tip.urgencyScore === 'ELEVATED' ? 'bg-amber-950 text-amber-300' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {tip.urgencyScore.replace('_', ' ')}
                    </span>
                  </div>
                  <p className="text-slate-400 line-clamp-1 text-[11px]">
                    {tip.details}
                  </p>
                  <div className="flex items-center justify-between text-[10px] text-slate-400 pt-0.5">
                    <span>{tip.locationReported}</span>
                    <span className="text-emerald-400 font-mono">Encrypted</span>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-2">
              <button
                onClick={openSubmitTip}
                className="w-full py-2 bg-slate-800 hover:bg-slate-750 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 transition"
              >
                + Submit New Confidential Report
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
