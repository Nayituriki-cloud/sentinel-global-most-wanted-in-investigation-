import React, { useState } from 'react';
import { 
  Lock, 
  Search, 
  Filter, 
  Download, 
  CheckCircle2, 
  ShieldCheck, 
  FileText, 
  Clock,
  KeyRound,
  ExternalLink
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { useAuth } from '../../context/AuthContext';
import { AuditLogEntry } from '../../types';

export const AuditLogViewer: React.FC = () => {
  const { auditLogs } = usePlatform();
  const { currentUser, canAuditSecurity } = useAuth();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedActionType, setSelectedActionType] = useState('ALL');

  const actionTypes = [
    'ALL',
    'CASE_VIEW',
    'CASE_UPDATE',
    'MISSION_STATUS_CHANGE',
    'CHECKLIST_TOGGLE',
    'TIP_SUBMITTED',
    'TIP_TRIAGED',
    'AI_ANALYSIS_REQUEST',
    'VERIFICATION_AUDIT',
    'SECURITY_LOGIN'
  ];

  const filteredLogs = auditLogs.filter((log) => {
    const q = searchTerm.toLowerCase();
    const matchSearch =
      log.actorIdentifier.toLowerCase().includes(q) ||
      log.targetReference.toLowerCase().includes(q) ||
      log.details.toLowerCase().includes(q) ||
      log.actionType.toLowerCase().includes(q);

    const matchType = selectedActionType === 'ALL' || log.actionType === selectedActionType;
    return matchSearch && matchType;
  });

  const handleExportAudit = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(filteredLogs, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', `SENTINEL_AUDIT_EXPORT_${new Date().toISOString().substring(0, 10)}.json`);
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">
              Immutable Cryptographic Audit Trail
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
              <ShieldCheck className="w-3.5 h-3.5" />
              ED25519 Signed
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Complete chronological event record of all case modifications, mission status transitions, public tip filings, and judicial audits.
          </p>
        </div>

        <button
          onClick={handleExportAudit}
          className="px-3.5 py-2 bg-slate-900 hover:bg-slate-800 text-slate-200 border border-slate-700 rounded-lg text-xs font-semibold flex items-center gap-2 transition shadow self-start md:self-auto"
        >
          <Download className="w-3.5 h-3.5 text-blue-400" />
          Export Audit Manifest (JSON)
        </button>
      </div>

      {/* Security Status Bar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl grid grid-cols-2 sm:grid-cols-4 gap-4 text-xs">
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Log Immutability</span>
          <span className="font-bold text-emerald-400 flex items-center gap-1 mt-0.5">
            <CheckCircle2 className="w-3.5 h-3.5" />
            Append-Only Verified
          </span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Signature Algorithm</span>
          <span className="font-mono text-slate-200 mt-0.5 block">ED25519 / SHA-256</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Total Event Count</span>
          <span className="font-bold text-white mt-0.5 block">{auditLogs.length} Events</span>
        </div>
        <div>
          <span className="text-[10px] text-slate-400 uppercase font-mono block">Your Access Clearance</span>
          <span className="font-mono text-blue-300 mt-0.5 block">{currentUser.securityClearance}</span>
        </div>
      </div>

      {/* Search & Filter Bar */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-3">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by actor, target reference (e.g. TIP-2026-1049, MISSION-AEGIS), or event details..."
            className="w-full pl-10 pr-4 py-2 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        {/* Action Type Filter Buttons */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
          {actionTypes.map((t) => (
            <button
              key={t}
              onClick={() => setSelectedActionType(t)}
              className={`px-2.5 py-1 rounded-md text-[11px] font-semibold whitespace-nowrap transition ${
                selectedActionType === t
                  ? 'bg-blue-600 text-white shadow'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {t === 'ALL' ? 'All Event Types' : t.replace(/_/g, ' ')}
            </button>
          ))}
        </div>
      </div>

      {/* Audit Log Table */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto shadow-xl">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Timestamp (UTC)</th>
              <th className="py-3 px-4">Action Type</th>
              <th className="py-3 px-4">Actor & Role</th>
              <th className="py-3 px-4">Target Reference</th>
              <th className="py-3 px-4">Event Details</th>
              <th className="py-3 px-4">IP (Masked)</th>
              <th className="py-3 px-4 text-right">Digital Signature</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800 font-mono text-[11px]">
            {filteredLogs.map((log) => (
              <tr key={log.id} className="hover:bg-slate-850/60 transition">
                <td className="py-3 px-4 text-slate-400 whitespace-nowrap">{log.timestamp}</td>
                <td className="py-3 px-4 font-sans font-bold">
                  <span className={`px-2 py-0.5 rounded text-[10px] ${
                    log.actionType.includes('SECURITY') || log.actionType.includes('VERIFICATION')
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : log.actionType.includes('STATUS') || log.actionType.includes('TIP')
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : 'bg-blue-950 text-blue-300 border border-blue-800'
                  }`}>
                    {log.actionType.replace(/_/g, ' ')}
                  </span>
                </td>
                <td className="py-3 px-4 font-sans">
                  <div className="text-white font-medium">{log.actorIdentifier}</div>
                  <div className="text-[10px] text-slate-400">{log.actorRole}</div>
                </td>
                <td className="py-3 px-4 font-bold text-blue-400">{log.targetReference}</td>
                <td className="py-3 px-4 font-sans text-slate-300 max-w-sm leading-tight">
                  {log.details}
                </td>
                <td className="py-3 px-4 text-slate-400">{log.ipMasked}</td>
                <td className="py-3 px-4 text-right text-slate-500 font-mono text-[10px]">
                  {log.digitalSignature}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
