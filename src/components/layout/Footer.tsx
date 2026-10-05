import React from 'react';
import { Shield, AlertOctagon, Scale, Lock, HeartHandshake, ExternalLink } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#050914] border-t border-slate-800 text-slate-400 text-xs py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Core Safety & Legal Disclaimers Banner */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-5 rounded-xl bg-slate-900/60 border border-slate-800">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-rose-400 font-bold">
              <AlertOctagon className="w-4 h-4" />
              <span>STRICT PUBLIC NON-INTERFERENCE MANDATE</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-300">
              Members of the public are strictly prohibited and strongly advised <strong>NEVER to approach, surveil, confront, pursue, or attempt to detain</strong> any individual listed in this registry. All listed persons may pose unpredictable hazards. Contact official emergency services immediately (911 / 112 / 999).
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-amber-300 font-bold">
              <Scale className="w-4 h-4" />
              <span>UNIVERSAL PRESUMPTION OF INNOCENCE</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-300">
              In accordance with Article 11 of the Universal Declaration of Human Rights and corresponding constitutional safeguards, <strong>every individual listed in this directory is strictly presumed innocent until proven guilty</strong> according to law in a public trial with full guarantees for their defense.
            </p>
          </div>

          <div className="space-y-2">
            <div className="flex items-center gap-2 text-blue-300 font-bold">
              <Lock className="w-4 h-4" />
              <span>DUE PROCESS & CORRECTION PROTOCOL</span>
            </div>
            <p className="text-[11px] leading-relaxed text-slate-300">
              No individual is published without verified judicial court warrants or multilateral police notices (e.g. INTERPOL Red Notice, European Arrest Warrant). For expedited record corrections, court orders of dismissal, or expungement notifications, submit official requisitions through the judicial verification liaison.
            </p>
          </div>
        </div>

        {/* Platform Architecture & Treaty Partners */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 pt-4 border-t border-slate-800/80 text-slate-300 text-[11px]">
          <div>
            <h4 className="font-semibold text-slate-100 mb-2 uppercase tracking-wider text-[10px]">Judicial Frameworks</h4>
            <ul className="space-y-1 text-slate-400">
              <li>INTERPOL Constitution Art. 3 Compliance</li>
              <li>Framework Decision 2002/584/JHA (EAW)</li>
              <li>Mutual Legal Assistance Treaties (MLAT)</li>
              <li>Schengen Information System II Protocols</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-100 mb-2 uppercase tracking-wider text-[10px]">Data & Privacy</h4>
            <ul className="space-y-1 text-slate-400">
              <li>End-to-End Encrypted Tip Pipelines</li>
              <li>Macro-Geographic Obfuscation</li>
              <li>ISO/IEC 27001 Security Controls</li>
              <li>Automated Audit Log Signatures</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-100 mb-2 uppercase tracking-wider text-[10px]">Whistleblower & Public</h4>
            <ul className="space-y-1 text-slate-400">
              <li>Confidential Source Protection</li>
              <li>Anonymous Tokenized Submissions</li>
              <li>Zero Tracking / Strip Metadata</li>
              <li>State Reward Coordination</li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold text-slate-100 mb-2 uppercase tracking-wider text-[10px]">International Contact</h4>
            <p className="text-slate-400">
              Global Command Center:
              <br />
              <span className="font-mono text-slate-300">HQ-OPERATIONS@SENTINEL-INTEL.GOV</span>
              <br />
              Secure Telex: +33 4 72 44 70 00
            </p>
          </div>
        </div>

        {/* Bottom copyright & certification */}
        <div className="pt-6 border-t border-slate-800/60 flex flex-col sm:flex-row items-center justify-between text-[11px] text-slate-400 gap-2">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-blue-400" />
            <span>SENTINEL Global Public Safety Intelligence Platform — Authorized Multi-Agency System</span>
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>TLS 1.3 / AES-256-GCM Verified</span>
            <span>•</span>
            <span>Version 4.2-LTS</span>
            <span>•</span>
            <span className="text-emerald-400 font-mono">ALL SYSTEMS OPERATIONAL</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
