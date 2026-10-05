import React, { useState } from 'react';
import { 
  ShieldCheck, 
  Lock, 
  KeyRound, 
  UserCheck, 
  Server, 
  RotateCcw, 
  AlertTriangle, 
  CheckCircle2, 
  Sliders, 
  Clock,
  Eye,
  FileText
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePlatform } from '../../context/PlatformContext';

export const SecuritySettingsView: React.FC = () => {
  const { currentUser, is2FAVerified, toggle2FA, sessionRemainingMinutes, setRole } = useAuth();
  const { resetToDefaults } = usePlatform();

  const [dataRetentionDays, setDataRetentionDays] = useState('90');
  const [resetModalOpen, setResetModalOpen] = useState(false);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div>
        <div className="flex items-center gap-2">
          <h1 className="text-2xl font-black text-white tracking-tight">
            Security & Governance Architecture
          </h1>
          <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
            <ShieldCheck className="w-3.5 h-3.5" />
            Zero-Trust Protocol
          </span>
        </div>
        <p className="text-xs text-slate-400 mt-1">
          Cryptographic enforcement, role-based access controls, statutory data-retention controls, and audit integrity oversight.
        </p>
      </div>

      {/* Security Health Matrix */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Transport & At-Rest Encryption</span>
          <span className="font-bold text-emerald-400 text-sm flex items-center gap-1.5">
            <Lock className="w-4 h-4" />
            TLS 1.3 / AES-256-GCM
          </span>
          <p className="text-[10px] text-slate-500">Perfect forward secrecy verified</p>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Multi-Factor Authentication</span>
          <div className="flex items-center justify-between">
            <span className={`font-bold text-sm ${is2FAVerified ? 'text-emerald-400' : 'text-rose-400'}`}>
              {is2FAVerified ? 'HARDWARE TOKEN ACTIVE' : '2FA DISABLED'}
            </span>
            <button
              onClick={toggle2FA}
              className="text-[10px] px-2 py-0.5 rounded bg-slate-800 hover:bg-slate-700 text-slate-200"
            >
              Toggle
            </button>
          </div>
          <p className="text-[10px] text-slate-500">FIDO2 / WebAuthn standard compliant</p>
        </div>

        <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-1">
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Authenticated Session</span>
          <span className="font-mono font-bold text-white text-sm">
            {sessionRemainingMinutes} mins remaining
          </span>
          <p className="text-[10px] text-slate-500">Auto-lockout policy on inactivity</p>
        </div>
      </div>

      {/* Current User Session Profile */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-3">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <UserCheck className="w-4 h-4 text-blue-400" />
          Active Identity & Role-Based Clearance (RBAC)
        </h3>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs bg-slate-950 p-4 rounded-lg border border-slate-800">
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">Current Role</span>
            <span className="font-bold text-white">{currentUser.role}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">User / Officer</span>
            <span className="font-medium text-slate-200">{currentUser.name}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">Clearance Level</span>
            <span className="font-mono text-emerald-400">{currentUser.securityClearance}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 uppercase block">Agency</span>
            <span className="font-medium text-slate-200 truncate block">{currentUser.agency}</span>
          </div>
        </div>
      </div>

      {/* Data Retention & Statutory Expungement Controls */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-5 space-y-4">
        <h3 className="text-xs font-bold uppercase tracking-wider text-slate-300 flex items-center gap-2">
          <Clock className="w-4 h-4 text-blue-400" />
          Statutory Data Retention & Purge Protocol
        </h3>
        <p className="text-xs text-slate-400 leading-relaxed">
          Unsubstantiated public tips and withdrawn judicial warrants are automatically subjected to cryptographic purge algorithms after the statutory holding threshold, ensuring full alignment with international privacy regulations.
        </p>

        <div className="flex items-center gap-4 text-xs">
          <label className="text-slate-300 font-medium">Uncorroborated Tip Retention Period:</label>
          <select
            value={dataRetentionDays}
            onChange={(e) => setDataRetentionDays(e.target.value)}
            className="bg-slate-950 border border-slate-700 rounded-lg py-1.5 px-3 text-white text-xs"
          >
            <option value="30">30 Days (Strict European Standard)</option>
            <option value="90">90 Days (Interpol Default)</option>
            <option value="180">180 Days (Extended Inquest)</option>
          </select>
        </div>
      </div>

      {/* Database Reset for Evaluation / Clean State */}
      <div className="bg-slate-900/60 border border-rose-900/40 rounded-xl p-5 space-y-3">
        <div className="flex items-center gap-2 text-rose-400 font-bold text-xs uppercase">
          <RotateCcw className="w-4 h-4" />
          <span>Platform Demonstration Baseline Reset</span>
        </div>
        <p className="text-xs text-slate-400">
          Reset all mission checklists, public tip submissions, and case statuses back to the official initial state.
        </p>
        <button
          onClick={() => setResetModalOpen(true)}
          className="px-4 py-2 bg-rose-950/80 hover:bg-rose-900 text-rose-300 border border-rose-800 rounded-lg text-xs font-bold transition"
        >
          Reset Platform Data to Defaults
        </button>
      </div>

      {/* Reset Confirmation Modal */}
      {resetModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-700 p-6 rounded-2xl max-w-md w-full space-y-4">
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-amber-400" />
              Confirm Demonstration Reset
            </h3>
            <p className="text-xs text-slate-300">
              This will restore all sample cases, mission stages, and tips to pristine baseline settings.
            </p>
            <div className="flex justify-end gap-2 pt-2">
              <button
                onClick={() => setResetModalOpen(false)}
                className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded text-xs font-semibold"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  resetToDefaults();
                  setResetModalOpen(false);
                }}
                className="px-3 py-1.5 bg-rose-600 hover:bg-rose-500 text-white rounded text-xs font-bold"
              >
                Reset Data Now
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
