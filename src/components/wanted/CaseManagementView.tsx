import React, { useState } from 'react';
import { 
  FileText, 
  CheckCircle2, 
  AlertTriangle, 
  Scale, 
  ShieldAlert, 
  Plus, 
  Sparkles, 
  Lock, 
  ExternalLink,
  ChevronRight,
  Filter,
  Check
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { useAuth } from '../../context/AuthContext';
import { WantedPerson, CaseStatus } from '../../types';
import { detectDuplicatesAI } from '../../services/aiService';

interface CaseManagementViewProps {
  onSelectPerson: (person: WantedPerson) => void;
}

export const CaseManagementView: React.FC<CaseManagementViewProps> = ({ onSelectPerson }) => {
  const { wantedPersons, addCaseRecord, updateCaseStatus, recordAudit } = usePlatform();
  const { currentUser, canModifyMissions, canAccessInvestigativeData } = useAuth();

  const [activeTab, setActiveTab] = useState<'registry' | 'publish_new' | 'due_process_audit'>('registry');

  // New Case Form State with Verification Checklist
  const [newName, setNewName] = useState('');
  const [newCaseNumber, setNewCaseNumber] = useState('');
  const [newPrimaryAlias, setNewPrimaryAlias] = useState('');
  const [newIssuingAuthority, setNewIssuingAuthority] = useState('');
  const [newJurisdiction, setNewJurisdiction] = useState('');
  const [newChargesSummary, setNewChargesSummary] = useState('');
  const [newCategory, setNewCategory] = useState<WantedPerson['warrantCategory']>('TRANSNATIONAL_ORGANIZED');
  const [newPriority, setNewPriority] = useState<WantedPerson['priority']>('HIGH');
  const [newReward, setNewReward] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80');

  // Mandatory Due Process Verification Checks (Must all be checked before publication!)
  const [checkCourtOrderVerified, setCheckCourtOrderVerified] = useState(false);
  const [checkHumanReviewerSignoff, setCheckHumanReviewerSignoff] = useState(false);
  const [checkPresumptionOfInnocenceAttached, setCheckPresumptionOfInnocenceAttached] = useState(false);
  const [checkNoPrivateAddressExposed, setCheckNoPrivateAddressExposed] = useState(false);
  const [duplicateCheckPassed, setDuplicateCheckPassed] = useState<boolean | null>(null);
  const [duplicateCheckReport, setDuplicateCheckReport] = useState<string>('');
  const [isCheckingDuplicates, setIsCheckingDuplicates] = useState(false);

  const canPublish = 
    newName.trim() &&
    newCaseNumber.trim() &&
    newIssuingAuthority.trim() &&
    newChargesSummary.trim() &&
    checkCourtOrderVerified &&
    checkHumanReviewerSignoff &&
    checkPresumptionOfInnocenceAttached &&
    checkNoPrivateAddressExposed &&
    canModifyMissions;

  const handleRunDuplicateCheck = async () => {
    setIsCheckingDuplicates(true);
    const candidate: Partial<WantedPerson> = {
      name: newName,
      primaryAlias: newPrimaryAlias,
      caseNumber: newCaseNumber,
      issuingAuthority: newIssuingAuthority
    };
    try {
      const res = await detectDuplicatesAI(candidate, wantedPersons);
      setDuplicateCheckReport(res);
      setDuplicateCheckPassed(true);
    } catch (e) {
      console.error(e);
    } finally {
      setIsCheckingDuplicates(false);
    }
  };

  const handlePublishCase = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canPublish) return;

    const newPerson: WantedPerson = {
      id: `wp-${Date.now().toString(36)}`,
      caseNumber: newCaseNumber.trim(),
      name: newName.trim(),
      primaryAlias: newPrimaryAlias.trim() || newName.trim(),
      verifiedAliases: newPrimaryAlias ? [newPrimaryAlias] : [],
      photoUrl: newPhotoUrl,
      photoAuthorizedNotice: `Certified publication under judicial seal ${newCaseNumber}`,
      issuingAuthority: newIssuingAuthority.trim(),
      jurisdiction: newJurisdiction.trim() || 'International Judicial Cooperation',
      countryCode: 'INT',
      warrantCategory: newCategory,
      chargesSummary: newChargesSummary.trim(),
      officialChargesList: [newChargesSummary.trim()],
      status: 'ACTIVE',
      priority: newPriority,
      datePublished: new Date().toISOString().substring(0, 10),
      dateLastVerified: new Date().toISOString().substring(0, 10),
      verificationStatus: 'JUDICIAL_ORDER_VERIFIED',
      presumptionOfInnocenceNotice: 'LEGAL NOTICE: Published under certified court warrant. The accused is constitutionally presumed innocent until proven guilty in a competent court of law.',
      sourceReliabilityCode: 'A1 - Official Judicial Warrant Confirmed',
      physical: {
        gender: 'Unspecified',
        ageApprox: 'Approx. 35-45',
        height: 'Standard profile',
        weight: 'Recorded in judicial file',
        hairColor: 'Dark',
        eyeColor: 'Dark',
        distinguishingFeatures: ['Documented in classified biometric record'],
        languagesSpoken: ['International coordination languages'],
        nationalities: ['Under judicial evaluation']
      },
      timeline: [
        {
          id: `tl-${Date.now()}`,
          date: new Date().toISOString().substring(0, 10),
          title: 'Judicial Warrant Certified & Published',
          description: `Formally validated by authorized magistrate. Assigned to ${currentUser.agency}.`,
          location: newJurisdiction || 'International Chamber',
          verifiedBy: currentUser.name
        }
      ],
      authorizedMacroLocation: {
        region: newJurisdiction || 'Global Transit Corridors',
        country: 'International',
        coordinatesApprox: [48.856, 2.352],
        lastKnownOfficialRegion: 'International Corridor (Macro-area only)'
      },
      bountyReward: newReward.trim() || undefined,
      disclaimer: 'DO NOT APPROACH. Presumed innocent under statutory law. Report via encrypted portal.'
    };

    addCaseRecord(newPerson);
    setActiveTab('registry');
    // Reset form
    setNewName('');
    setNewCaseNumber('');
    setNewPrimaryAlias('');
    setNewIssuingAuthority('');
    setNewChargesSummary('');
    setCheckCourtOrderVerified(false);
    setCheckHumanReviewerSignoff(false);
    setCheckPresumptionOfInnocenceAttached(false);
    setCheckNoPrivateAddressExposed(false);
    setDuplicateCheckPassed(null);
  };

  const handleUpdateStatus = (caseId: string, status: CaseStatus) => {
    updateCaseStatus(caseId, status);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">
              Case & Warrant Judicial Governance
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-950 text-blue-300 border border-blue-800">
              Authorized Oversight
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Publish verified judicial warrants, review presumption-of-innocence compliance, and manage case status transitions.
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-2 bg-slate-900 p-1 rounded-xl border border-slate-800 text-xs">
          <button
            onClick={() => setActiveTab('registry')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition ${
              activeTab === 'registry' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            Case Registry & Status ({wantedPersons.length})
          </button>
          <button
            onClick={() => setActiveTab('publish_new')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'publish_new' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Plus className="w-3.5 h-3.5" />
            Publish Verified Case
          </button>
          <button
            onClick={() => setActiveTab('due_process_audit')}
            className={`px-3 py-1.5 rounded-lg font-semibold transition flex items-center gap-1.5 ${
              activeTab === 'due_process_audit' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'
            }`}
          >
            <Scale className="w-3.5 h-3.5 text-amber-400" />
            Due Process Audit
          </button>
        </div>
      </div>

      {/* Tab 1: Case Registry Table with Status Updates */}
      {activeTab === 'registry' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto shadow-xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Case #</th>
                <th className="py-3 px-4">Issuing Authority</th>
                <th className="py-3 px-4">Verification State</th>
                <th className="py-3 px-4">Current Status</th>
                <th className="py-3 px-4 text-right">Judicial Status Control</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {wantedPersons.map((p) => (
                <tr key={p.id} className="hover:bg-slate-850/60 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.photoUrl}
                        alt={p.name}
                        className="w-10 h-10 rounded-md object-cover border border-slate-700"
                      />
                      <div>
                        <div 
                          onClick={() => onSelectPerson(p)}
                          className="font-bold text-white hover:text-blue-300 cursor-pointer"
                        >
                          {p.name}
                        </div>
                        <div className="text-[11px] text-slate-400">{p.primaryAlias}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-blue-300">{p.caseNumber}</td>
                  <td className="py-3 px-4 max-w-[200px] truncate">{p.issuingAuthority}</td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800/60 flex items-center gap-1 w-fit">
                      <CheckCircle2 className="w-3 h-3" />
                      {p.verificationStatus.replace(/_/g, ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.status === 'ACTIVE' ? 'bg-rose-950 text-rose-300' :
                      p.status === 'LOCATED' ? 'bg-amber-950 text-amber-300' :
                      p.status === 'ARRESTED' ? 'bg-blue-950 text-blue-300' : 'bg-slate-800 text-slate-300'
                    }`}>
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-right">
                    {canModifyMissions ? (
                      <select
                        value={p.status}
                        onChange={(e) => handleUpdateStatus(p.id, e.target.value as CaseStatus)}
                        className="bg-slate-950 border border-slate-700 rounded py-1 px-2 text-[11px] text-slate-200 focus:outline-none focus:border-blue-500"
                      >
                        <option value="ACTIVE">ACTIVE</option>
                        <option value="LOCATED">LOCATED</option>
                        <option value="ARRESTED">ARRESTED</option>
                        <option value="CLEARED">CLEARED (EXPUNGED)</option>
                      </select>
                    ) : (
                      <span className="text-[11px] text-slate-500 font-mono">Restricted</span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Tab 2: Publish Verified Judicial Case */}
      {activeTab === 'publish_new' && (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl max-w-3xl mx-auto space-y-6">
          <div className="border-b border-slate-800 pb-4">
            <h2 className="text-lg font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-400" />
              Official Judicial Warrant Publication Form
            </h2>
            <p className="text-xs text-slate-400 mt-1">
              Strict Rule: Never automatically label an unverified person as wanted. Official court references, human verification, and presumption-of-innocence certification are statutory prerequisites.
            </p>
          </div>

          <form onSubmit={handlePublishCase} className="space-y-4 text-xs">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Full Legal Name of Subject *
                </label>
                <input
                  type="text"
                  required
                  value={newName}
                  onChange={(e) => setNewName(e.target.value)}
                  placeholder="e.g. Victor Alexander Thorne"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Official Case / Warrant Reference Number *
                </label>
                <input
                  type="text"
                  required
                  value={newCaseNumber}
                  onChange={(e) => setNewCaseNumber(e.target.value)}
                  placeholder="e.g. EAW-2026-CT-9011"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white font-mono"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Primary Verified Alias
                </label>
                <input
                  type="text"
                  value={newPrimaryAlias}
                  onChange={(e) => setNewPrimaryAlias(e.target.value)}
                  placeholder="e.g. The Courier / Alex Thorne"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Issuing Judicial Authority / Court *
                </label>
                <input
                  type="text"
                  required
                  value={newIssuingAuthority}
                  onChange={(e) => setNewIssuingAuthority(e.target.value)}
                  placeholder="e.g. Tribunal Judiciaire de Paris / INTERPOL"
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Warrant Category
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as WantedPerson['warrantCategory'])}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                >
                  <option value="TRANSNATIONAL_ORGANIZED">Transnational Organized Crime</option>
                  <option value="VIOLENT_CRIME">Violent Crime</option>
                  <option value="FINANCIAL_FRAUD">Financial Fraud & Asset Recovery</option>
                  <option value="CYBER_ESPIONAGE">Cybercrime & Infrastructure Sabotage</option>
                  <option value="TRAFFICKING">Trafficking / Contraband</option>
                </select>
              </div>

              <div>
                <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                  Public Safety Priority Tier
                </label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value as WantedPerson['priority'])}
                  className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
                >
                  <option value="CRITICAL">Critical (P1 — Immediate Public Advisory)</option>
                  <option value="HIGH">High (P2 — Transnational Search)</option>
                  <option value="MEDIUM">Medium (P3 — Regional Registry)</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-bold text-slate-400 mb-1">
                Authorized Charges & Warrant Specifications *
              </label>
              <textarea
                required
                rows={3}
                value={newChargesSummary}
                onChange={(e) => setNewChargesSummary(e.target.value)}
                placeholder="Certified text from judicial indictment..."
                className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2.5 text-xs text-white"
              />
            </div>

            {/* AI Duplicate & Alias Check Trigger */}
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center justify-between">
                <span className="font-bold text-slate-200 text-xs flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                  Pre-Publication Duplicate Record & Entity Resolution Audit
                </span>
                <button
                  type="button"
                  onClick={handleRunDuplicateCheck}
                  disabled={!newName.trim() || isCheckingDuplicates}
                  className="px-3 py-1 bg-indigo-600/40 hover:bg-indigo-600 text-indigo-200 hover:text-white rounded text-xs font-semibold transition"
                >
                  {isCheckingDuplicates ? 'Auditing Registries...' : 'Run Duplicate Check'}
                </button>
              </div>
              {duplicateCheckReport && (
                <div className="text-[11px] text-slate-300 bg-slate-900 p-2.5 rounded border border-indigo-900/40 whitespace-pre-wrap">
                  {duplicateCheckReport}
                </div>
              )}
            </div>

            {/* Mandatory Due Process Human Sign-Off Checklist */}
            <div className="p-4 bg-slate-950 rounded-xl border border-amber-500/40 space-y-3">
              <span className="text-xs font-bold uppercase tracking-wider text-amber-300 flex items-center gap-2">
                <Scale className="w-4 h-4" />
                Mandatory Due Process & Statutory Verification Checklist (Required for Publication)
              </span>

              <div className="space-y-2">
                <label className="flex items-start gap-2.5 cursor-pointer text-slate-300 text-xs">
                  <input
                    type="checkbox"
                    checked={checkCourtOrderVerified}
                    onChange={(e) => setCheckCourtOrderVerified(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 text-blue-600 focus:ring-0"
                  />
                  <span>
                    <strong>Certified Judicial Warrant on File:</strong> Official court order, European Arrest Warrant, or INTERPOL Red Notice verified against issuing country court registry.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer text-slate-300 text-xs">
                  <input
                    type="checkbox"
                    checked={checkHumanReviewerSignoff}
                    onChange={(e) => setCheckHumanReviewerSignoff(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 text-blue-600 focus:ring-0"
                  />
                  <span>
                    <strong>Authorized Human Officer Review:</strong> Signed off by designated supervisory investigator or magistrate ({currentUser.name}).
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer text-slate-300 text-xs">
                  <input
                    type="checkbox"
                    checked={checkPresumptionOfInnocenceAttached}
                    onChange={(e) => setCheckPresumptionOfInnocenceAttached(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 text-blue-600 focus:ring-0"
                  />
                  <span>
                    <strong>Statutory Presumption of Innocence Attached:</strong> Mandatory notice included stating subject is legally presumed innocent until trial.
                  </span>
                </label>

                <label className="flex items-start gap-2.5 cursor-pointer text-slate-300 text-xs">
                  <input
                    type="checkbox"
                    checked={checkNoPrivateAddressExposed}
                    onChange={(e) => setCheckNoPrivateAddressExposed(e.target.checked)}
                    className="mt-0.5 rounded border-slate-700 text-blue-600 focus:ring-0"
                  />
                  <span>
                    <strong>Operational Privacy & Non-Vigilante Compliance:</strong> No private residential addresses, sensitive operational tactical units, or real-time surveillance coordinates exposed.
                  </span>
                </label>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={!canPublish}
                className="w-full py-3 bg-blue-600 hover:bg-blue-500 disabled:opacity-50 text-white font-bold rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-blue-950/50 flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-4 h-4" />
                {canPublish
                  ? 'Officially Publish Verified Warrant Record to Global Platform'
                  : 'Complete All Mandatory Verification Checks to Publish'}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Tab 3: Due Process Audit & Correction Protocol */}
      {activeTab === 'due_process_audit' && (
        <div className="space-y-6">
          <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <Scale className="w-5 h-5 text-amber-400" />
              Statutory Due Process, Correction & Removal Workflow
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed">
              SENTINEL strictly enforces international legal standards preventing unverified defamation or unlawful inclusion. Every published record is subject to periodic re-verification. When a court dismisses charges, acquits an individual, or rescinds a warrant, the platform executes an immediate status transition to <strong>CLEARED</strong> followed by automated removal.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-white text-xs block">1. Gazette Cross-Verification</span>
                <p className="text-[11px] text-slate-400">
                  Automated weekly audit matches all active cases against Schengen Information System (SIS II) and INTERPOL cancellation circulars.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-white text-xs block">2. Magistrate Correction Petition</span>
                <p className="text-[11px] text-slate-400">
                  Attorneys and verified defense counsel may submit formal court dismissal orders directly to the compliance desk for priority expungement.
                </p>
              </div>
              <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
                <span className="font-bold text-white text-xs block">3. Immutable Removal Log</span>
                <p className="text-[11px] text-slate-400">
                  Every record retraction is permanently recorded in the cryptographic audit log with the certifying judicial official's signature.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
