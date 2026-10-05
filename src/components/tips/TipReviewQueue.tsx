import React, { useState } from 'react';
import { 
  AlertTriangle, 
  CheckCircle2, 
  Clock, 
  FileText, 
  Bot, 
  ShieldAlert, 
  Sparkles, 
  Lock, 
  Filter, 
  User, 
  MapPin, 
  Search,
  ExternalLink,
  ChevronRight
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { useAuth } from '../../context/AuthContext';
import { TipSubmission, WantedPerson } from '../../types';
import { triageTipAI } from '../../services/aiService';

interface TipReviewQueueProps {
  onSelectCase: (person: WantedPerson) => void;
}

export const TipReviewQueue: React.FC<TipReviewQueueProps> = ({ onSelectCase }) => {
  const { tips, wantedPersons, updateTipStatus } = usePlatform();
  const { currentUser, canAccessInvestigativeData } = useAuth();

  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [selectedTipId, setSelectedTipId] = useState<string>(tips[0]?.id || '');
  const [noteInput, setNoteInput] = useState<string>('');
  const [isRetryingAI, setIsRetryingAI] = useState<boolean>(false);

  const filteredTips = tips.filter((t) => {
    if (filterStatus === 'ALL') return true;
    return t.status === filterStatus;
  });

  const selectedTip = tips.find((t) => t.id === selectedTipId) || tips[0];
  const relatedCase = wantedPersons.find((w) => w.id === selectedTip?.caseId);

  const handleStatusChange = (newStatus: TipSubmission['status']) => {
    if (!selectedTip) return;
    updateTipStatus(selectedTip.id, newStatus, noteInput || undefined);
    setNoteInput('');
  };

  const handleManualReTriage = async () => {
    if (!selectedTip) return;
    setIsRetryingAI(true);
    try {
      const analysis = await triageTipAI(selectedTip, relatedCase);
      updateTipStatus(selectedTip.id, 'TRIAGED', analysis);
    } catch (e) {
      console.error(e);
    } finally {
      setIsRetryingAI(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header and Filter */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">
              Investigative Tip Triage & Review Queue
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-950 text-amber-300 border border-amber-800">
              {tips.length} Submissions Total
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Law enforcement intelligence processing workflow with automated Gemini risk triage, actionable lead scoring, and forensic corroboration.
          </p>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 md:pb-0 text-xs">
          {['ALL', 'SUBMITTED', 'TRIAGED', 'UNDER_REVIEW', 'CORROBORATED', 'CLOSED_UNFOUNDED'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1.5 rounded-lg font-semibold whitespace-nowrap transition ${
                filterStatus === st
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-slate-900 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {st === 'ALL' ? 'All Tips' : st.replace('_', ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Main 2-Column Split View */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Tip List */}
        <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 space-y-3 overflow-y-auto max-h-[750px]">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-400 block pb-1 border-b border-slate-800">
            Incoming Queue ({filteredTips.length})
          </span>

          <div className="space-y-2">
            {filteredTips.map((tip) => {
              const isSelected = tip.id === selectedTip?.id;
              return (
                <div
                  key={tip.id}
                  onClick={() => setSelectedTipId(tip.id)}
                  className={`p-3 rounded-lg border text-xs cursor-pointer transition space-y-1.5 ${
                    isSelected
                      ? 'bg-blue-600/20 border-blue-500 text-white shadow-md'
                      : 'bg-slate-850 hover:bg-slate-800 border-slate-800 text-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-blue-300">{tip.id}</span>
                    <span className={`px-1.5 py-0.5 rounded text-[9px] font-bold ${
                      tip.urgencyScore === 'CRITICAL_IMMEDIATE' ? 'bg-rose-950 text-rose-300 border border-rose-800' :
                      tip.urgencyScore === 'ELEVATED' ? 'bg-amber-950 text-amber-300 border border-amber-800' :
                      'bg-slate-800 text-slate-300'
                    }`}>
                      {tip.urgencyScore.replace('_', ' ')}
                    </span>
                  </div>

                  <div className="font-semibold text-slate-200 truncate">
                    Case: {tip.caseName || 'General Sighting'}
                  </div>

                  <p className="text-[11px] text-slate-400 line-clamp-2">
                    {tip.details}
                  </p>

                  <div className="flex items-center justify-between text-[10px] text-slate-500 pt-1 border-t border-slate-800/80">
                    <span>{tip.locationReported.split(',')[0]}</span>
                    <span className="font-mono">{tip.timestamp.substring(5, 16)}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column (2 cols): Selected Tip Detail & Action Workspace */}
        {selectedTip ? (
          <div className="lg:col-span-2 bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6 shadow-xl">
            {/* Header info */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
              <div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-sm font-bold text-amber-400 bg-amber-950/80 px-2.5 py-1 rounded border border-amber-800">
                    {selectedTip.id}
                  </span>
                  <span className={`px-2 py-0.5 rounded text-xs font-bold ${
                    selectedTip.status === 'CORROBORATED' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                    selectedTip.status === 'UNDER_REVIEW' ? 'bg-blue-950 text-blue-300 border border-blue-800' :
                    'bg-slate-800 text-slate-300'
                  }`}>
                    {selectedTip.status.replace('_', ' ')}
                  </span>
                </div>
                <div className="text-xs text-slate-400 mt-1">
                  Received: <strong className="font-mono text-slate-300">{selectedTip.timestamp}</strong>
                  {' • '}{selectedTip.isAnonymous ? 'Anonymous Public Whistleblower' : selectedTip.informantName}
                </div>
              </div>

              {relatedCase && (
                <button
                  onClick={() => onSelectCase(relatedCase)}
                  className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 transition self-start sm:self-auto"
                >
                  <span>Case: {relatedCase.name}</span>
                  <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
                </button>
              )}
            </div>

            {/* Sighting Details */}
            <div className="space-y-2">
              <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                Full Sighting & Intelligence Narrative
              </span>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 text-xs text-slate-200 leading-relaxed whitespace-pre-wrap">
                {selectedTip.details}
              </div>
            </div>

            {/* Reported Location & Date metadata */}
            <div className="grid grid-cols-2 gap-3 text-xs bg-slate-950/60 p-3 rounded-xl border border-slate-800">
              <div>
                <span className="text-[10px] uppercase text-slate-400 block">Reported Location</span>
                <span className="font-medium text-slate-200 flex items-center gap-1 mt-0.5">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  {selectedTip.locationReported}
                </span>
              </div>
              <div>
                <span className="text-[10px] uppercase text-slate-400 block">Sighting Date</span>
                <span className="font-mono text-slate-200 block mt-0.5">
                  {selectedTip.sightingDate}
                </span>
              </div>
            </div>

            {/* AI Automated Triage Report */}
            <div className="p-4 bg-indigo-950/30 border border-indigo-500/30 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Bot className="w-4 h-4 text-indigo-400" />
                  <span className="text-xs font-bold text-white">Gemini AI Risk Triage Assessment</span>
                </div>
                <button
                  onClick={handleManualReTriage}
                  disabled={isRetryingAI}
                  className="px-2.5 py-1 bg-indigo-600/40 hover:bg-indigo-600 text-indigo-200 hover:text-white rounded text-[11px] font-medium transition flex items-center gap-1"
                >
                  <Sparkles className="w-3 h-3" />
                  {isRetryingAI ? 'Evaluating...' : 'Re-run Analysis'}
                </button>
              </div>

              <div className="text-xs text-slate-300 leading-relaxed whitespace-pre-wrap bg-slate-950/80 p-3 rounded-lg border border-indigo-900/40">
                {selectedTip.aiTriageAnalysis || (
                  <span className="italic text-slate-400">Analysis underway by automated duty engine...</span>
                )}
              </div>
            </div>

            {/* Attached Files */}
            {selectedTip.attachments.length > 0 && (
              <div className="space-y-2">
                <span className="text-[10px] uppercase font-bold text-slate-400 tracking-wider">
                  Attached Evidentiary Media ({selectedTip.attachments.length})
                </span>
                <div className="space-y-1.5">
                  {selectedTip.attachments.map((file, i) => (
                    <div key={i} className="flex items-center justify-between p-3 bg-slate-950 rounded-lg border border-slate-800 text-xs">
                      <div className="flex items-center gap-2">
                        <FileText className="w-4 h-4 text-blue-400" />
                        <span className="font-mono text-slate-200">{file.name}</span>
                        <span className="text-slate-500 font-mono text-[10px]">({file.size})</span>
                      </div>
                      <span className="text-[10px] font-mono text-emerald-400">
                        {file.simulatedHash}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Investigator Action Bar */}
            {canAccessInvestigativeData ? (
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-3">
                <span className="text-xs font-bold text-slate-200 block uppercase">
                  Investigator Lead Actioning & Verification
                </span>

                <div className="flex flex-wrap gap-2">
                  <button
                    onClick={() => handleStatusChange('UNDER_REVIEW')}
                    className="px-3 py-1.5 bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white rounded-lg text-xs font-semibold border border-blue-500/40 transition"
                  >
                    Assign to Investigation
                  </button>
                  <button
                    onClick={() => handleStatusChange('CORROBORATED')}
                    className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow"
                  >
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    Corroborate with Border/CCTV Logs
                  </button>
                  <button
                    onClick={() => handleStatusChange('CLOSED_UNFOUNDED')}
                    className="px-3 py-1.5 bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-slate-200 rounded-lg text-xs font-semibold transition"
                  >
                    Close as Uncorroborated
                  </button>
                </div>

                <div className="pt-2">
                  <input
                    type="text"
                    value={noteInput}
                    onChange={(e) => setNoteInput(e.target.value)}
                    placeholder="Add investigator dispatch note..."
                    className="w-full bg-slate-900 border border-slate-700 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>
            ) : (
              <div className="p-3 bg-slate-950/60 rounded-xl border border-slate-800 text-center text-xs text-slate-400">
                Switch to Investigator or Detective role in the top-right header to execute verification and status updates.
              </div>
            )}
          </div>
        ) : (
          <div className="lg:col-span-2 p-12 text-center text-slate-500">
            Select a tip from the queue to inspect details.
          </div>
        )}
      </div>
    </div>
  );
};
