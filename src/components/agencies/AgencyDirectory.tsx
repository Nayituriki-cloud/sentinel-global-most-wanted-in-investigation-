import React, { useState } from 'react';
import { 
  Building2, 
  Globe2, 
  PhoneCall, 
  ShieldCheck, 
  ExternalLink, 
  SlidersHorizontal,
  Mail,
  Scale
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';

export const AgencyDirectory: React.FC = () => {
  const { agencies, missions } = usePlatform();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">
              Authorized Partner Agencies & Treaty Network
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-950 text-blue-300 border border-blue-800">
              {agencies.length} Operational Desks
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Accredited multilateral law enforcement commands coordinating cross-border fugitive searches under certified Mutual Legal Assistance Treaties (MLAT).
          </p>
        </div>
      </div>

      {/* Grid of Agencies */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {agencies.map((agency) => (
          <div
            key={agency.id}
            className="bg-slate-900 border border-slate-800 hover:border-blue-500/40 rounded-2xl p-5 space-y-4 transition shadow-xl flex flex-col justify-between group"
          >
            <div className="space-y-3">
              {/* Top badge and code */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <span className="text-2xl">{agency.badgeEmblem}</span>
                  <div>
                    <span className="font-mono text-xs font-bold text-blue-300 block">
                      {agency.code}
                    </span>
                    <span className="text-[10px] text-slate-400 block">{agency.headquarters}</span>
                  </div>
                </div>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  agency.mlatStatus === 'ACTIVE_TREATY' ? 'bg-emerald-950 text-emerald-300 border border-emerald-800' :
                  'bg-blue-950 text-blue-300 border border-blue-800'
                }`}>
                  {agency.mlatStatus.replace('_', ' ')}
                </span>
              </div>

              <h3 className="font-bold text-base text-white group-hover:text-blue-300 transition-colors">
                {agency.name}
              </h3>

              <div className="space-y-1.5 text-xs text-slate-300 pt-2 border-t border-slate-800">
                <div className="flex justify-between">
                  <span className="text-slate-400">Jurisdiction Scope:</span>
                  <span className="font-medium text-slate-200 text-right truncate max-w-[170px]">
                    {agency.jurisdictionScope}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Focal Point Desk:</span>
                  <span className="font-medium text-slate-200">{agency.focalPoint}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Active Shared Missions:</span>
                  <span className="font-mono font-bold text-emerald-400">{agency.activeSharedMissions} Active</span>
                </div>
              </div>
            </div>

            {/* Emergency Hotline Button */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
              <span className="text-slate-400 font-mono text-[11px]">{agency.emergencyDesk}</span>
              <a
                href={`tel:${agency.emergencyDesk.replace(/[^0-9+]/g, '')}`}
                className="px-3 py-1 bg-slate-800 hover:bg-slate-700 text-slate-200 rounded font-semibold text-[11px] flex items-center gap-1.5 transition"
              >
                <PhoneCall className="w-3 h-3 text-emerald-400" />
                Emergency Desk
              </a>
            </div>
          </div>
        ))}
      </div>

      {/* Treaty Framework Notice */}
      <div className="p-4 bg-slate-900 border border-slate-800 rounded-xl space-y-2 text-xs text-slate-300">
        <div className="flex items-center gap-2 text-blue-400 font-bold">
          <Scale className="w-4 h-4" />
          <span>Multilateral Judicial Protocol Compliance</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-relaxed">
          All shared operational data conforms to the Council of Europe Convention on Extradition, the European Arrest Warrant Framework (2002/584/JHA), and bilateral Mutual Legal Assistance Treaties. Direct field operations are conducted solely under the territorial sovereignty of competent national authorities.
        </p>
      </div>
    </div>
  );
};
