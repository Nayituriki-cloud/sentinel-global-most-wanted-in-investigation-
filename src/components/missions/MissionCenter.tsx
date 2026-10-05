import React, { useState } from 'react';
import { 
  SlidersHorizontal, 
  CheckCircle2, 
  AlertCircle, 
  Clock, 
  FileText, 
  Shield, 
  UserCheck, 
  ChevronRight, 
  Plus, 
  Lock, 
  Scale, 
  Check, 
  ArrowRight,
  Send,
  Flag
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { useAuth } from '../../context/AuthContext';
import { Mission, MissionStatus, WantedPerson } from '../../types';

interface MissionCenterProps {
  onSelectCase: (person: WantedPerson) => void;
  selectedMissionId?: string;
}

const STATUS_STEPS: MissionStatus[] = [
  'NEW',
  'VERIFIED',
  'ACTIVE',
  'INFORMATION RECEIVED',
  'REVIEW',
  'RESOLVED'
];

export const MissionCenter: React.FC<MissionCenterProps> = ({
  onSelectCase,
  selectedMissionId
}) => {
  const { missions, wantedPersons, updateMissionStatus, toggleMissionChecklist, addMissionNote } = usePlatform();
  const { currentUser, canModifyMissions, canAccessInvestigativeData } = useAuth();

  const [activeMissionId, setActiveMissionId] = useState<string>(
    selectedMissionId || (missions[0]?.id ?? '')
  );

  const [newNoteText, setNewNoteText] = useState('');
  const [resolutionModalOpen, setResolutionModalOpen] = useState(false);
  const [resolutionReason, setResolutionReason] = useState('');

  const currentMission = missions.find((m) => m.id === activeMissionId) || missions[0];
  const relatedCase = wantedPersons.find((w) => w.id === currentMission?.caseId);

  const handleNextStatus = () => {
    if (!currentMission) return;
    const currentIndex = STATUS_STEPS.indexOf(currentMission.status);
    if (currentIndex < STATUS_STEPS.length - 1) {
      const nextStatus = STATUS_STEPS[currentIndex + 1];
      if (nextStatus === 'RESOLVED') {
        setResolutionModalOpen(true);
      } else {
        updateMissionStatus(currentMission.id, nextStatus);
      }
    }
  };

  const handleConfirmResolution = () => {
    if (!currentMission) return;
    updateMissionStatus(currentMission.id, 'RESOLVED', resolutionReason);
    setResolutionModalOpen(false);
    setResolutionReason('');
  };

  const handleAddNote = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newNoteText.trim() || !currentMission) return;
    addMissionNote(currentMission.id, newNoteText.trim());
    setNewNoteText('');
  };

  if (!currentMission) {
    return (
      <div className="p-8 text-center text-slate-400">
        No mission records currently loaded.
      </div>
    );
  }

  const currentStepIndex = STATUS_STEPS.indexOf(currentMission.status);

  return (
    <div className="space-y-6">
      {/* Title & Mission Selector Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">
              Mission Operations Center
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-950 text-blue-300 border border-blue-800">
              {missions.length} Missions Active
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Authoritative lifecycle management for international fugitive identification, evidence verification, and multi-agency coordination.
          </p>
        </div>

        {/* Mission Quick Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 md:pb-0">
          {missions.map((m) => {
            const isSelected = m.id === activeMissionId;
            return (
              <button
                key={m.id}
                onClick={() => setActiveMissionId(m.id)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition flex items-center gap-1.5 ${
                  isSelected
                    ? 'bg-blue-600 text-white shadow-md'
                    : 'bg-slate-900 hover:bg-slate-800 text-slate-300 border border-slate-800'
                }`}
              >
                <span>{m.missionCode}</span>
                <span className={`w-1.5 h-1.5 rounded-full ${m.status === 'RESOLVED' ? 'bg-emerald-400' : 'bg-amber-400'}`}></span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Mission Card */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl space-y-6 p-6">
        {/* Top Header: Code, Priority, Target Subject */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 pb-6 border-b border-slate-800">
          <div className="space-y-1">
            <div className="flex items-center gap-3">
              <span className="font-mono text-sm font-black text-blue-400 px-3 py-1 rounded bg-blue-950/80 border border-blue-800">
                {currentMission.missionCode}
              </span>
              <span className={`px-2.5 py-0.5 rounded text-xs font-bold ${
                currentMission.priority === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-blue-950 text-blue-300'
              }`}>
                {currentMission.priority} PRIORITY
              </span>
              <span className="text-xs text-slate-400">
                Jurisdiction: <strong className="text-slate-200">{currentMission.jurisdiction}</strong>
              </span>
            </div>
            <h2 className="text-xl font-bold text-white mt-2">
              Objective: {currentMission.objective}
            </h2>
            <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 pt-1">
              <span>Assigned Agency: <strong className="text-slate-200">{currentMission.assignedAgency}</strong></span>
              <span>•</span>
              <span>Team: <strong className="text-slate-200">{currentMission.assignedTeam}</strong></span>
              <span>•</span>
              <span>Lead: <strong className="text-slate-200">{currentMission.leadOfficer}</strong></span>
            </div>
          </div>

          {/* Quick Target Link */}
          {relatedCase && (
            <div
              onClick={() => onSelectCase(relatedCase)}
              className="p-3 bg-slate-950 hover:bg-slate-850 border border-slate-800 rounded-xl flex items-center gap-3 cursor-pointer transition group"
            >
              <img
                src={relatedCase.photoUrl}
                alt={relatedCase.name}
                className="w-12 h-12 rounded-lg object-cover border border-slate-700"
              />
              <div className="text-left text-xs">
                <span className="text-[10px] text-slate-400 uppercase font-mono block">Primary Target</span>
                <span className="font-bold text-white group-hover:text-blue-300 transition-colors">
                  {relatedCase.name}
                </span>
                <span className="text-[11px] text-blue-400 font-mono block">
                  {relatedCase.caseNumber}
                </span>
              </div>
              <ChevronRight className="w-4 h-4 text-slate-500 group-hover:text-blue-400 ml-2" />
            </div>
          )}
        </div>

        {/* Status Lifecycle Stepper: NEW → VERIFIED → ACTIVE → INFORMATION RECEIVED → REVIEW → RESOLVED */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
              Mission Lifecycle Progression
            </span>
            {canModifyMissions && currentMission.status !== 'RESOLVED' && (
              <button
                onClick={handleNextStatus}
                className="px-3 py-1 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-bold transition flex items-center gap-1.5 shadow"
              >
                <span>Advance to {STATUS_STEPS[currentStepIndex + 1]}</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
            {STATUS_STEPS.map((step, idx) => {
              const isPassed = idx < currentStepIndex;
              const isCurrent = idx === currentStepIndex;

              return (
                <div
                  key={step}
                  className={`p-2.5 rounded-lg border text-center transition-all ${
                    isCurrent
                      ? 'bg-blue-600/30 border-blue-500 text-white shadow-lg ring-1 ring-blue-500/50'
                      : isPassed
                      ? 'bg-slate-800/80 border-slate-700 text-slate-300'
                      : 'bg-slate-950/50 border-slate-800/50 text-slate-500'
                  }`}
                >
                  <div className="flex items-center justify-center mb-1">
                    {isPassed ? (
                      <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    ) : isCurrent ? (
                      <span className="w-2 h-2 rounded-full bg-blue-400 animate-ping"></span>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-700"></span>
                    )}
                  </div>
                  <span className="text-[10px] font-mono uppercase font-bold block">
                    {step}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Completion Report if Resolved */}
        {currentMission.completionReport && (
          <div className="p-4 bg-emerald-950/30 border border-emerald-500/40 rounded-xl space-y-2">
            <div className="flex items-center gap-2 text-emerald-300 font-bold text-xs uppercase">
              <CheckCircle2 className="w-4 h-4" />
              <span>Official Mission Completion & Judicial Resolution Report</span>
            </div>
            <p className="text-xs text-slate-200">
              {currentMission.completionReport.publicSafetyStatement}
            </p>
            <div className="flex flex-wrap gap-4 text-[11px] text-slate-400 pt-1">
              <span>Resolving Agency: <strong className="text-slate-200">{currentMission.completionReport.resolvingAgency}</strong></span>
              <span>•</span>
              <span>Magistrate Ref: <strong className="font-mono text-emerald-400">{currentMission.completionReport.magistrateReference}</strong></span>
              <span>•</span>
              <span>Resolved Date: {currentMission.completionReport.resolvedDate}</span>
            </div>
          </div>
        )}

        {/* Middle Two-Column Grid: Action Checklist & Evidence References */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 pt-2">
          {/* Action Checklist */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-blue-400" />
                Authorized Action Checklist
              </h3>
              <span className="text-[10px] text-slate-400">
                {currentMission.actionChecklist.filter((c) => c.completed).length} of {currentMission.actionChecklist.length} Complete
              </span>
            </div>

            <div className="space-y-2.5">
              {currentMission.actionChecklist.map((item) => (
                <div
                  key={item.id}
                  className={`p-3 rounded-lg border transition ${
                    item.completed
                      ? 'bg-slate-900/60 border-slate-800 text-slate-300'
                      : 'bg-slate-900 border-blue-900/40 text-white'
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <button
                      onClick={() => toggleMissionChecklist(currentMission.id, item.id)}
                      className={`mt-0.5 w-4 h-4 rounded border flex items-center justify-center transition shrink-0 ${
                        item.completed
                          ? 'bg-emerald-600 border-emerald-500 text-white'
                          : 'border-slate-600 hover:border-blue-400 bg-slate-850'
                      }`}
                    >
                      {item.completed && <Check className="w-3 h-3" />}
                    </button>
                    <div className="space-y-1 w-full text-xs">
                      <div className={item.completed ? 'line-through text-slate-400' : 'font-medium text-slate-200'}>
                        {item.label}
                      </div>
                      {item.notes && (
                        <p className="text-[11px] text-blue-300/90 italic bg-slate-950 p-2 rounded">
                          {item.notes}
                        </p>
                      )}
                      <div className="flex justify-between text-[10px] text-slate-500 pt-1">
                        <span>Assigned: {item.assignedTo || 'Unassigned'}</span>
                        {item.completedAt && <span>Verified: {item.completedAt}</span>}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Evidence & Document References */}
          <div className="bg-slate-950/70 p-4 rounded-xl border border-slate-800 space-y-3">
            <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
              <FileText className="w-4 h-4 text-blue-400" />
              Evidence & Judicial Document References
            </h3>

            <div className="space-y-2.5">
              {currentMission.evidenceRefs.map((doc) => (
                <div
                  key={doc.id}
                  className="p-3 bg-slate-900 rounded-lg border border-slate-800 space-y-1.5 text-xs"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-bold text-slate-200">{doc.title}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-mono font-bold ${
                      doc.classificationLevel === 'PUBLIC_RELEASABLE' ? 'bg-blue-950 text-blue-300' :
                      doc.classificationLevel === 'LAW_ENFORCEMENT_SENSITIVE' ? 'bg-amber-950 text-amber-300' :
                      'bg-rose-950 text-rose-300'
                    }`}>
                      {doc.classificationLevel}
                    </span>
                  </div>
                  <p className="text-[11px] text-slate-400">{doc.summary}</p>
                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800">
                    <span className="font-mono text-slate-400">{doc.documentNumber}</span>
                    <span>Custodian: {doc.custodianAgency}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Secure Investigative Notes (RBAC Protected) */}
        {canAccessInvestigativeData ? (
          <div className="bg-slate-950/80 p-4 rounded-xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold uppercase text-slate-300">
                <Lock className="w-3.5 h-3.5 text-emerald-400" />
                <span>Secure Investigator Log (Law Enforcement Only)</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-mono">
                CLEARANCE: {currentUser.securityClearance}
              </span>
            </div>

            <div className="space-y-2">
              {currentMission.confidentialNotes.map((note) => (
                <div key={note.id} className="p-3 bg-slate-900 rounded-lg border border-slate-800 text-xs space-y-1">
                  <div className="flex items-center justify-between text-[10px] text-slate-400">
                    <span className="font-bold text-blue-300">{note.author} ({note.role})</span>
                    <span className="font-mono">{note.timestamp}</span>
                  </div>
                  <p className="text-slate-300 text-xs">{note.content}</p>
                </div>
              ))}
            </div>

            {/* Add Note Form */}
            <form onSubmit={handleAddNote} className="flex gap-2 pt-2">
              <input
                type="text"
                value={newNoteText}
                onChange={(e) => setNewNoteText(e.target.value)}
                placeholder="Append authorized investigative log note..."
                className="flex-1 bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
              />
              <button
                type="submit"
                disabled={!newNoteText.trim()}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white rounded-lg text-xs font-semibold flex items-center gap-1.5 transition"
              >
                <Send className="w-3 h-3" />
                Post
              </button>
            </form>
          </div>
        ) : (
          <div className="p-4 bg-slate-950/40 border border-slate-800 rounded-xl text-center text-xs text-slate-400 flex items-center justify-center gap-2">
            <Lock className="w-4 h-4 text-slate-500" />
            <span>Classified tactical logs are restricted to authenticated law-enforcement personnel. Switch role in top bar to preview investigator view.</span>
          </div>
        )}
      </div>

      {/* Resolution Confirmation Modal */}
      {resolutionModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl max-w-lg w-full space-y-4 shadow-2xl">
            <h3 className="text-lg font-bold text-white flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-400" />
              Resolve Mission & Issue Completion Report
            </h3>
            <p className="text-xs text-slate-300">
              You are certifying that the mission objective has been legally concluded (apprehension, surrender, or court order). Enter resolution particulars:
            </p>
            <textarea
              value={resolutionReason}
              onChange={(e) => setResolutionReason(e.target.value)}
              placeholder="e.g. Subject safely apprehended in cooperation with local authorities. Warrant executed under magistrate supervision..."
              className="w-full h-24 bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500"
            />
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setResolutionModalOpen(false)}
                className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmResolution}
                disabled={!resolutionReason.trim()}
                className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 disabled:opacity-50 text-white rounded-lg text-xs font-bold"
              >
                Confirm Resolution
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
