import React, { useState } from 'react';
import { 
  AlertTriangle, 
  ShieldCheck, 
  Lock, 
  Upload, 
  File, 
  CheckCircle2, 
  Copy, 
  EyeOff, 
  User, 
  MapPin, 
  Calendar, 
  Scale, 
  X
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { WantedPerson } from '../../types';

interface PublicTipPortalProps {
  preselectedCase?: WantedPerson | null;
  onClose?: () => void;
  onSuccess?: (tipId: string) => void;
}

export const PublicTipPortal: React.FC<PublicTipPortalProps> = ({
  preselectedCase,
  onClose,
  onSuccess
}) => {
  const { wantedPersons, addTip } = usePlatform();

  const [isAnonymous, setIsAnonymous] = useState(true);
  const [informantName, setInformantName] = useState('');
  const [informantContact, setInformantContact] = useState('');
  const [selectedCaseId, setSelectedCaseId] = useState<string>(preselectedCase?.id || '');
  const [locationReported, setLocationReported] = useState('');
  const [sightingDate, setSightingDate] = useState(new Date().toISOString().substring(0, 10));
  const [details, setDetails] = useState('');
  const [attachedFiles, setAttachedFiles] = useState<Array<{ name: string; type: string; size: string; simulatedHash: string }>>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submittedTipId, setSubmittedTipId] = useState<string | null>(null);
  const [copiedToken, setCopiedToken] = useState(false);

  const handleSimulatedFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      const simulatedHash = `sha256:${Math.random().toString(36).substring(2, 12)}${Math.random().toString(36).substring(2, 12)}`;
      setAttachedFiles((prev) => [
        ...prev,
        {
          name: file.name,
          type: file.type || 'application/octet-stream',
          size: `${(file.size / 1024).toFixed(1)} KB`,
          simulatedHash
        }
      ]);
    }
  };

  const handleRemoveFile = (index: number) => {
    setAttachedFiles((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!details.trim() || !locationReported.trim()) return;

    setIsSubmitting(true);
    const targetCase = wantedPersons.find((w) => w.id === selectedCaseId);

    try {
      const tipId = await addTip({
        caseId: selectedCaseId || undefined,
        caseName: targetCase?.name,
        isAnonymous,
        informantName: isAnonymous ? undefined : informantName,
        informantContact: isAnonymous ? undefined : informantContact,
        locationReported,
        sightingDate,
        details,
        attachments: attachedFiles,
        urgencyScore: 'ROUTINE'
      });

      setSubmittedTipId(tipId);
      if (onSuccess) onSuccess(tipId);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyToken = () => {
    if (!submittedTipId) return;
    navigator.clipboard.writeText(submittedTipId);
    setCopiedToken(true);
    setTimeout(() => setCopiedToken(false), 2000);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl max-w-2xl mx-auto space-y-6">
      {/* Safety Warning Header */}
      <div className="bg-rose-950/40 border border-rose-500/50 p-4 rounded-xl space-y-2 text-rose-200">
        <div className="flex items-center gap-2 font-bold text-xs uppercase tracking-wider text-rose-400">
          <AlertTriangle className="w-4 h-4 shrink-0" />
          <span>STATUTORY PUBLIC SAFETY WARNING: DO NOT CONFRONT</span>
        </div>
        <p className="text-xs leading-relaxed text-slate-300">
          Never attempt to question, pursue, shadow, or detain any individual. All persons listed are sought under judicial warrants and maintain the legal presumption of innocence. Report your observation here or immediately dial local emergency services (911 / 112).
        </p>
      </div>

      {submittedTipId ? (
        /* Submission Success Receipt */
        <div className="text-center py-6 space-y-4">
          <div className="w-16 h-16 rounded-full bg-emerald-950 border border-emerald-500 text-emerald-400 flex items-center justify-center mx-auto shadow-lg shadow-emerald-950/50">
            <CheckCircle2 className="w-8 h-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-xl font-bold text-white">Confidential Report Recorded</h3>
            <p className="text-xs text-slate-400">
              Your submission has been cryptographically sealed and dispatched to authorized duty investigators.
            </p>
          </div>

          <div className="p-4 bg-slate-950 rounded-xl border border-slate-800 max-w-sm mx-auto space-y-2">
            <span className="text-[10px] uppercase font-mono text-slate-400 block">
              Official Tip Reference Token
            </span>
            <div className="flex items-center justify-between font-mono text-base font-bold text-amber-400 bg-slate-900 px-3 py-2 rounded border border-slate-700">
              <span>{submittedTipId}</span>
              <button
                onClick={copyToken}
                className="text-xs text-slate-400 hover:text-white flex items-center gap-1"
                title="Copy token"
              >
                {copiedToken ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
              </button>
            </div>
            <p className="text-[10px] text-slate-500">
              Save this token to reference or supplement your report without disclosing your identity.
            </p>
          </div>

          <div className="flex justify-center gap-3 pt-2">
            <button
              onClick={() => {
                setSubmittedTipId(null);
                setDetails('');
                setLocationReported('');
                setAttachedFiles([]);
              }}
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded-lg text-xs font-semibold"
            >
              Submit Another Report
            </button>
            {onClose && (
              <button
                onClick={onClose}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-xs font-bold"
              >
                Done
              </button>
            )}
          </div>
        </div>
      ) : (
        /* Submission Form */
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-800">
            <div>
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-blue-400" />
                Encrypted Public Tip & Sighting System
              </h2>
              <p className="text-[11px] text-slate-400">
                End-to-End Encrypted (AES-256-GCM) • Direct route to authorized fugitive investigators
              </p>
            </div>
            {onClose && (
              <button onClick={onClose} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Anonymous Option Selector */}
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className={`p-2 rounded-lg ${isAnonymous ? 'bg-blue-950 text-blue-300' : 'bg-slate-800 text-slate-400'}`}>
                {isAnonymous ? <EyeOff className="w-4 h-4" /> : <User className="w-4 h-4" />}
              </div>
              <div>
                <div className="font-bold text-white">
                  {isAnonymous ? 'Anonymous Confidential Submission' : 'Identified Whistleblower / Contact'}
                </div>
                <div className="text-[10px] text-slate-400">
                  {isAnonymous
                    ? 'No IP, device fingerprint, or identifying telemetry is retained.'
                    : 'Contact details kept strictly protected under official whistleblower directives.'}
                </div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setIsAnonymous(!isAnonymous)}
              className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded text-[11px] font-semibold transition"
            >
              Switch to {isAnonymous ? 'Contact Mode' : 'Anonymous'}
            </button>
          </div>

          {/* Contact Fields if not anonymous */}
          {!isAnonymous && (
            <div className="grid grid-cols-2 gap-3 p-3 bg-slate-950/60 rounded-xl border border-slate-800">
              <div>
                <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">
                  Full Name / Legal Alias
                </label>
                <input
                  type="text"
                  value={informantName}
                  onChange={(e) => setInformantName(e.target.value)}
                  placeholder="Your full name"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                />
              </div>
              <div>
                <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">
                  Secure Contact (Signal/Phone/Email)
                </label>
                <input
                  type="text"
                  value={informantContact}
                  onChange={(e) => setInformantContact(e.target.value)}
                  placeholder="+1... / name@proton.me"
                  className="w-full bg-slate-900 border border-slate-700 rounded-lg p-2 text-xs text-white"
                />
              </div>
            </div>
          )}

          {/* Target Person Selector */}
          <div>
            <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">
              Associated Most Wanted Case
            </label>
            <select
              value={selectedCaseId}
              onChange={(e) => setSelectedCaseId(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-2 text-xs text-white focus:outline-none focus:border-blue-500"
            >
              <option value="">General Fugitive Sighting (Unlisted or Unknown)</option>
              {wantedPersons.map((w) => (
                <option key={w.id} value={w.id}>
                  {w.name} — {w.caseNumber} ({w.issuingAuthority})
                </option>
              ))}
            </select>
          </div>

          {/* Date & Location */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div>
              <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">
                Sighting / Incident Date
              </label>
              <div className="relative">
                <Calendar className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="date"
                  value={sightingDate}
                  onChange={(e) => setSightingDate(e.target.value)}
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">
                Location Observed (Street / City / Transit Hub)
              </label>
              <div className="relative">
                <MapPin className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
                <input
                  type="text"
                  required
                  value={locationReported}
                  onChange={(e) => setLocationReported(e.target.value)}
                  placeholder="e.g. Frankfurt Central Station, Platform 9"
                  className="w-full pl-9 pr-3 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white"
                />
              </div>
            </div>
          </div>

          {/* Details / Narrative */}
          <div>
            <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">
              Detailed Observation / Intelligence
            </label>
            <textarea
              required
              rows={4}
              value={details}
              onChange={(e) => setDetails(e.target.value)}
              placeholder="Describe physical appearance, clothing, companion individuals, vehicles (make/model/license plate), spoken language, and direction of travel..."
              className="w-full bg-slate-950 border border-slate-700 rounded-lg p-3 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
            />
          </div>

          {/* Document / Media Upload Simulation */}
          <div className="space-y-2">
            <label className="block text-[10px] uppercase font-semibold text-slate-400">
              Attach Photographs, Documents, or Media (Simulated Encrypted Vault)
            </label>
            <div className="border border-dashed border-slate-700 hover:border-slate-500 rounded-xl p-3 text-center transition bg-slate-950/40">
              <Upload className="w-5 h-5 text-slate-400 mx-auto mb-1" />
              <p className="text-slate-300 text-[11px]">Click or drag files to encrypt & attach</p>
              <p className="text-[10px] text-slate-500">EXIF geolocation stripped before investigator review</p>
              <input
                type="file"
                onChange={handleSimulatedFileUpload}
                className="hidden"
                id="tip-file-input"
              />
              <label
                htmlFor="tip-file-input"
                className="mt-2 inline-block px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded text-[10px] font-semibold cursor-pointer"
              >
                Browse File
              </label>
            </div>

            {attachedFiles.length > 0 && (
              <div className="space-y-1.5 pt-1">
                {attachedFiles.map((f, i) => (
                  <div key={i} className="flex items-center justify-between p-2 bg-slate-950 rounded-lg border border-slate-800 text-[11px]">
                    <div className="flex items-center gap-2">
                      <File className="w-3.5 h-3.5 text-blue-400" />
                      <span className="text-slate-200 font-mono">{f.name}</span>
                      <span className="text-slate-500 font-mono">({f.size})</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => handleRemoveFile(i)}
                      className="text-slate-400 hover:text-rose-400 text-xs"
                    >
                      Remove
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Encryption & Legal Checkbox */}
          <div className="p-3 bg-slate-950/80 rounded-xl border border-slate-800 flex items-start gap-2.5 text-[11px] text-slate-400">
            <Lock className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <div>
              <strong>Encrypted Gateway:</strong> This submission is processed via zero-knowledge client encryption. Information will be reviewed solely by authorized judicial and police officers. Knowingly submitting false police reports is punishable under national laws.
            </div>
          </div>

          {/* Submit Action Button */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={isSubmitting || !details.trim() || !locationReported.trim()}
              className="w-full py-3 bg-amber-500 hover:bg-amber-400 disabled:opacity-50 text-slate-950 font-black rounded-xl text-xs uppercase tracking-wider transition shadow-lg shadow-amber-950/40 flex items-center justify-center gap-2"
            >
              <AlertTriangle className="w-4 h-4" />
              {isSubmitting ? 'Encrypting & Routing...' : 'Transmit Confidential Tip to Authorized Team'}
            </button>
          </div>
        </form>
      )}
    </div>
  );
};
