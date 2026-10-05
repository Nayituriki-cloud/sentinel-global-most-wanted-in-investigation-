import React, { useState } from 'react';
import { 
  X, 
  ShieldAlert, 
  Scale, 
  Printer, 
  Sparkles, 
  AlertTriangle, 
  FileText, 
  Calendar, 
  MapPin, 
  User, 
  CheckCircle2, 
  Clock, 
  ExternalLink,
  Bot
} from 'lucide-react';
import { WantedPerson } from '../../types';
import { summarizeCaseAI } from '../../services/aiService';

interface WantedDetailModalProps {
  person: WantedPerson | null;
  onClose: () => void;
  onSubmitTip: (person: WantedPerson) => void;
}

export const WantedDetailModal: React.FC<WantedDetailModalProps> = ({
  person,
  onClose,
  onSubmitTip
}) => {
  const [aiSummary, setAiSummary] = useState<string | null>(null);
  const [isLoadingAI, setIsLoadingAI] = useState(false);
  const [posterMode, setPosterMode] = useState(false);

  if (!person) return null;

  const handleGenerateAISummary = async () => {
    setIsLoadingAI(true);
    try {
      const summary = await summarizeCaseAI(person);
      setAiSummary(summary);
    } catch (e) {
      console.error(e);
    } finally {
      setIsLoadingAI(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-6">
      <div className="bg-[#0B132B] border border-slate-700 w-full max-w-4xl rounded-2xl shadow-2xl overflow-hidden max-h-[92vh] flex flex-col animate-in fade-in zoom-in-95 duration-200">
        {/* Header Bar */}
        <div className="p-4 bg-slate-950 border-b border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-blue-400 bg-blue-950/80 px-2.5 py-1 rounded border border-blue-800">
              {person.caseNumber}
            </span>
            <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
              person.priority === 'CRITICAL' ? 'bg-rose-950 text-rose-300 border border-rose-800' : 'bg-blue-950 text-blue-300'
            }`}>
              {person.priority} PRIORITY
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
              {person.status}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => setPosterMode(!posterMode)}
              className={`px-3 py-1 rounded text-xs font-semibold flex items-center gap-1.5 transition ${
                posterMode ? 'bg-amber-500 text-slate-950' : 'bg-slate-800 hover:bg-slate-700 text-slate-200'
              }`}
            >
              <Printer className="w-3.5 h-3.5" />
              {posterMode ? 'Standard Dossier' : 'Poster Mode'}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 transition"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Scrollable Content */}
        <div className="overflow-y-auto p-6 space-y-6 text-slate-200">
          {/* Printable Poster Format View */}
          {posterMode ? (
            <div className="bg-slate-900 border-4 border-rose-700 p-8 rounded-xl text-center space-y-6 max-w-2xl mx-auto text-slate-100 shadow-2xl print:border-black print:text-black print:bg-white">
              <div className="border-b-4 border-rose-700 pb-3">
                <h1 className="text-3xl font-black tracking-widest text-rose-500 uppercase">
                  WANTED BY LAW ENFORCEMENT
                </h1>
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mt-1">
                  OFFICIAL PUBLIC SAFETY BULLETIN • {person.issuingAuthority}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <img
                  src={person.photoUrl}
                  alt={person.name}
                  className="w-48 h-48 object-cover rounded-lg border-2 border-slate-700 shadow-lg"
                />
                <div className="text-left space-y-2">
                  <h2 className="text-2xl font-black text-white">{person.name}</h2>
                  <p className="text-xs text-amber-400 font-mono">Known Aliases: {person.verifiedAliases.join(', ') || person.primaryAlias}</p>
                  <p className="text-xs text-slate-300">Case Warrant: <strong className="font-mono">{person.caseNumber}</strong></p>
                  <p className="text-xs text-slate-300">Height: <strong>{person.physical.height}</strong></p>
                  <p className="text-xs text-slate-300">Eyes / Hair: <strong>{person.physical.eyeColor} / {person.physical.hairColor}</strong></p>
                  {person.bountyReward && (
                    <div className="mt-2 p-2 bg-amber-950/40 border border-amber-500/40 rounded text-amber-300 font-bold text-sm">
                      REWARD: {person.bountyReward}
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-slate-950/70 p-4 rounded-lg text-left text-xs space-y-2 border border-slate-800">
                <strong className="text-rose-400 block uppercase font-mono">Allegations & Official Charges:</strong>
                <p className="text-slate-300">{person.chargesSummary}</p>
                <ul className="list-disc pl-5 space-y-1 text-slate-400">
                  {person.officialChargesList.map((ch, i) => (
                    <li key={i}>{ch}</li>
                  ))}
                </ul>
              </div>

              {/* Crucial Non-Vigilante Warning */}
              <div className="bg-rose-950/40 border border-rose-600/60 p-4 rounded-lg text-xs text-rose-200 font-semibold space-y-1">
                <p className="uppercase tracking-wider">⚠️ CRITICAL SAFETY NOTICE</p>
                <p>DO NOT ATTEMPT APPREHENSION. SUBJECT MAY BE ARMED OR DANGEROUS.</p>
                <p className="text-[11px] text-slate-300 font-normal">
                  All accused persons are strictly presumed innocent until proven guilty in a competent court of law.
                </p>
              </div>

              <div className="flex justify-center gap-3 pt-2">
                <button
                  onClick={handlePrint}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold transition flex items-center gap-2"
                >
                  <Printer className="w-4 h-4" /> Print Authorized Notice
                </button>
                <button
                  onClick={() => onSubmitTip(person)}
                  className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold transition flex items-center gap-2"
                >
                  <AlertTriangle className="w-4 h-4" /> Submit Confidential Sighting
                </button>
              </div>
            </div>
          ) : (
            /* Standard Full Dossier View */
            <>
              {/* Top Profile Card */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="space-y-3">
                  <div className="relative aspect-[4/5] bg-slate-950 rounded-xl overflow-hidden border border-slate-800">
                    <img
                      src={person.photoUrl}
                      alt={person.name}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute bottom-0 inset-x-0 bg-slate-950/90 p-2 text-[9px] text-slate-400 border-t border-slate-800 text-center">
                      Authorized publication under court seal
                    </div>
                  </div>
                  <div className="text-[10px] text-slate-400 bg-slate-900 p-2.5 rounded-lg border border-slate-800 space-y-1">
                    <div className="flex justify-between">
                      <span>Source Reliability:</span>
                      <strong className="text-emerald-400">{person.sourceReliabilityCode.split('-')[0]}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Date Published:</span>
                      <strong className="text-slate-300">{person.datePublished}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Verified:</span>
                      <strong className="text-slate-300">{person.dateLastVerified}</strong>
                    </div>
                  </div>
                </div>

                <div className="md:col-span-2 space-y-4">
                  <div>
                    <span className="text-xs uppercase tracking-wider font-mono text-blue-400">
                      OFFICIAL JUDICIAL DOSSIER
                    </span>
                    <h2 className="text-2xl font-black text-white">{person.name}</h2>
                    <p className="text-xs text-slate-400 mt-0.5">
                      Primary Alias: <strong className="text-slate-200">{person.primaryAlias}</strong>
                    </p>
                    {person.verifiedAliases.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-1.5">
                        {person.verifiedAliases.map((al, idx) => (
                          <span key={idx} className="px-2 py-0.5 rounded text-[10px] font-mono bg-slate-800 text-slate-300 border border-slate-700">
                            {al}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Issuing Court & Authority */}
                  <div className="p-3 bg-slate-900 rounded-xl border border-slate-800 grid grid-cols-2 gap-3 text-xs">
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Issuing Authority</span>
                      <span className="font-semibold text-slate-200">{person.issuingAuthority}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Jurisdiction</span>
                      <span className="font-semibold text-slate-200">{person.jurisdiction}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Category</span>
                      <span className="font-semibold text-slate-200">{person.warrantCategory.replace('_', ' ')}</span>
                    </div>
                    <div>
                      <span className="text-slate-400 block text-[10px] uppercase">Official Reward</span>
                      <span className="font-bold text-amber-400">{person.bountyReward || 'None Authorized'}</span>
                    </div>
                  </div>

                  {/* Charges Summary */}
                  <div className="space-y-2">
                    <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Warrant Specifications & Summary
                    </h3>
                    <p className="text-xs text-slate-300 leading-relaxed bg-slate-900/60 p-3 rounded-lg border border-slate-800">
                      {person.chargesSummary}
                    </p>
                    <div className="space-y-1">
                      <span className="text-[10px] uppercase font-semibold text-slate-400">Formal Indictments:</span>
                      <ul className="space-y-1 text-xs text-slate-300">
                        {person.officialChargesList.map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <span className="text-blue-400">•</span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>

              {/* Biometrics & Physical Characteristics */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <User className="w-3.5 h-3.5 text-blue-400" />
                  Verified Biometric & Identifying Features
                </h3>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-900 p-4 rounded-xl border border-slate-800 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Gender / Age</span>
                    <span className="font-medium text-slate-200">{person.physical.gender} / {person.physical.ageApprox}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Height / Weight</span>
                    <span className="font-medium text-slate-200">{person.physical.height} / {person.physical.weight}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Hair / Eyes</span>
                    <span className="font-medium text-slate-200">{person.physical.hairColor} / {person.physical.eyeColor}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-400 uppercase block">Languages</span>
                    <span className="font-medium text-slate-200">{person.physical.languagesSpoken.join(', ')}</span>
                  </div>
                  <div className="col-span-2 sm:col-span-4 pt-2 border-t border-slate-800">
                    <span className="text-[10px] text-slate-400 uppercase block">Distinguishing Scars / Marks / Tattoos</span>
                    <span className="font-medium text-amber-300">{person.physical.distinguishingFeatures.join(' • ')}</span>
                  </div>
                </div>
              </div>

              {/* Macro Location Alert */}
              <div className="p-4 bg-slate-900 rounded-xl border border-slate-800 flex items-start gap-3">
                <MapPin className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <div className="space-y-1 text-xs">
                  <div className="font-bold text-white">Authorized Macro-Geographic Region: {person.authorizedMacroLocation.region}</div>
                  <p className="text-slate-400 text-[11px]">
                    Operational compliance policy: Exact GPS coordinates and live operational targets are strictly classified to prevent vigilantism and protect investigative integrity. Public search encompasses broad transportation corridors only.
                  </p>
                </div>
              </div>

              {/* Verified Chronological Timeline */}
              <div className="space-y-3">
                <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
                  <Calendar className="w-3.5 h-3.5 text-blue-400" />
                  Verified Case Timeline & Judicial Milestones
                </h3>
                <div className="space-y-2">
                  {person.timeline.map((evt) => (
                    <div key={evt.id} className="p-3 bg-slate-900/60 rounded-lg border border-slate-800 text-xs flex items-start gap-3">
                      <span className="font-mono text-blue-400 text-[11px] shrink-0 pt-0.5">{evt.date}</span>
                      <div className="space-y-0.5">
                        <div className="font-semibold text-slate-200">{evt.title}</div>
                        <p className="text-slate-400 text-[11px]">{evt.description}</p>
                        <div className="text-[10px] text-slate-400">
                          Location: {evt.location} | Verified by: <span className="text-slate-300">{evt.verifiedBy}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* AI Summarization Panel */}
              <div className="p-4 bg-indigo-950/30 border border-indigo-500/30 rounded-xl space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Bot className="w-4 h-4 text-indigo-400" />
                    <span className="text-xs font-bold text-white">AI Case Intelligence Summary</span>
                    <span className="text-[9px] px-1.5 py-0.5 rounded bg-indigo-950 text-indigo-300 border border-indigo-800 font-mono">
                      Gemini 3.8 Flash
                    </span>
                  </div>
                  {!aiSummary && (
                    <button
                      onClick={handleGenerateAISummary}
                      disabled={isLoadingAI}
                      className="px-3 py-1 bg-indigo-600 hover:bg-indigo-500 text-white rounded text-xs font-semibold transition flex items-center gap-1.5"
                    >
                      <Sparkles className="w-3 h-3" />
                      {isLoadingAI ? 'Analyzing...' : 'Generate AI Brief'}
                    </button>
                  )}
                </div>

                {isLoadingAI && (
                  <div className="text-xs text-indigo-300 animate-pulse">
                    Synthesizing official court records, verifying cross-border alias records, and generating ethical executive brief...
                  </div>
                )}

                {aiSummary && (
                  <div className="text-xs text-slate-300 leading-relaxed bg-slate-950/70 p-3 rounded-lg border border-indigo-900/40 whitespace-pre-wrap">
                    {aiSummary}
                  </div>
                )}
              </div>

              {/* Mandatory Presumption of Innocence Statement */}
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2 text-xs">
                <div className="flex items-center gap-2 text-amber-400 font-bold">
                  <Scale className="w-4 h-4" />
                  <span>Statutory Presumption of Innocence</span>
                </div>
                <p className="text-[11px] text-slate-400 leading-relaxed">
                  {person.presumptionOfInnocenceNotice}
                </p>
              </div>
            </>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950 border-t border-slate-800 flex flex-wrap items-center justify-between gap-3">
          <div className="text-xs text-slate-400 flex items-center gap-1.5">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Do not attempt apprehension. Contact emergency authorities or submit tip below.</span>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => onSubmitTip(person)}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-lg text-xs font-bold transition flex items-center gap-1.5 shadow"
            >
              <AlertTriangle className="w-3.5 h-3.5" />
              Submit Tip For This Case
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg text-xs font-semibold transition"
            >
              Close Dossier
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
