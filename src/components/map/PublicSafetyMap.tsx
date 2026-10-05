import React, { useState } from 'react';
import { 
  Globe2, 
  MapPin, 
  ShieldAlert, 
  AlertTriangle, 
  Info, 
  ChevronRight, 
  Lock,
  Eye,
  Sliders
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { WantedPerson } from '../../types';

interface PublicSafetyMapProps {
  onSelectPerson: (person: WantedPerson) => void;
  onSubmitTipForPerson: (person: WantedPerson) => void;
}

interface MacroRegion {
  id: string;
  name: string;
  coordinates: { x: number; y: number }; // Percentage in SVG projection
  description: string;
  jurisdictionAgency: string;
  warrantsCount: number;
}

export const PublicSafetyMap: React.FC<PublicSafetyMapProps> = ({
  onSelectPerson,
  onSubmitTipForPerson
}) => {
  const { wantedPersons } = usePlatform();

  const [selectedRegionId, setSelectedRegionId] = useState<string>('all');
  const [activeHoverPerson, setActiveHoverPerson] = useState<WantedPerson | null>(null);

  // Broad macro-regions representing authorized search zones
  const MACRO_REGIONS: MacroRegion[] = [
    {
      id: 'baltic',
      name: 'Baltic Maritime Corridor & North-East Europe',
      coordinates: { x: 58, y: 28 },
      description: 'Regional maritime passenger terminals and transit ferries across Estonia, Sweden, and Finland.',
      jurisdictionAgency: 'Estonian Border Police & Europol EC3',
      warrantsCount: wantedPersons.filter((w) => w.authorizedMacroLocation.region.includes('Baltic')).length
    },
    {
      id: 'mediterranean',
      name: 'Western Mediterranean Coastal Basin',
      coordinates: { x: 50, y: 40 },
      description: 'Maritime freight shipping routes and port marinas across Italy, France, and Spain.',
      jurisdictionAgency: 'Guardia di Finanza & Spanish Guardia Civil',
      warrantsCount: wantedPersons.filter((w) => w.authorizedMacroLocation.region.includes('Mediterranean')).length
    },
    {
      id: 'rhine',
      name: 'Central Europe (Rhine-Ruhr Corridor)',
      coordinates: { x: 52, y: 32 },
      description: 'High-density international rail and highway transit network in Germany and Benelux.',
      jurisdictionAgency: 'Bundeskriminalamt Zi 35 FAST Desk',
      warrantsCount: wantedPersons.filter((w) => w.authorizedMacroLocation.region.includes('Rhine')).length
    },
    {
      id: 'middle_east',
      name: 'Arabian Gulf / Levant Transit Zone',
      coordinates: { x: 67, y: 45 },
      description: 'Transnational financial and commercial aviation transit hubs.',
      jurisdictionAgency: 'INTERPOL Middle East & North Africa Taskforce',
      warrantsCount: wantedPersons.filter((w) => w.authorizedMacroLocation.region.includes('Gulf')).length
    },
    {
      id: 'north_america',
      name: 'North American Atlantic Seaboard',
      coordinates: { x: 26, y: 34 },
      description: 'Saint Lawrence commercial container shipping corridor and East Coast logistics ports.',
      jurisdictionAgency: 'RCMP & CBSA International Directorate',
      warrantsCount: wantedPersons.filter((w) => w.authorizedMacroLocation.region.includes('Atlantic') || w.countryCode === 'US' || w.countryCode === 'CA').length
    },
    {
      id: 'east_asia',
      name: 'East Asia / Pacific Rim Hub',
      coordinates: { x: 84, y: 42 },
      description: 'Extradition processing and consular liaison perimeter in East Asian logistics hubs.',
      jurisdictionAgency: 'Tokyo Metropolitan Police & Regional Extradition Liaison',
      warrantsCount: wantedPersons.filter((w) => w.authorizedMacroLocation.region.includes('Asia') || w.countryCode === 'JP').length
    }
  ];

  const filteredPersons = wantedPersons.filter((w) => {
    if (selectedRegionId === 'all') return true;
    const regionObj = MACRO_REGIONS.find((r) => r.id === selectedRegionId);
    if (!regionObj) return true;
    return w.authorizedMacroLocation.region.toLowerCase().includes(regionObj.name.split(' ')[0].toLowerCase()) ||
           w.jurisdiction.toLowerCase().includes(regionObj.name.split(' ')[0].toLowerCase());
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">
              Authorized Macro-Jurisdiction Safety Map
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
              Broad Region Only
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1 max-w-2xl">
            Displays public-safe regional jurisdictions. In full compliance with privacy safeguards, all private dwellings, tactical positions, and live GPS tracks are strictly withheld.
          </p>
        </div>

        {/* Region Filter */}
        <div className="flex items-center gap-2">
          <select
            value={selectedRegionId}
            onChange={(e) => setSelectedRegionId(e.target.value)}
            className="bg-slate-900 border border-slate-700 rounded-lg py-1.5 px-3 text-xs text-white focus:outline-none focus:border-blue-500"
          >
            <option value="all">Global (All 6 Macro Zones)</option>
            {MACRO_REGIONS.map((r) => (
              <option key={r.id} value={r.id}>
                {r.name} ({r.warrantsCount} warrants)
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Mandatory Statutory Compliance Notice */}
      <div className="bg-slate-900 border border-blue-500/30 rounded-xl p-4 flex items-start gap-3 text-xs text-slate-300 shadow-md">
        <Info className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-white block uppercase tracking-wide">
            Legal Compliance & Geographic Obfuscation Mandate
          </span>
          <p className="leading-relaxed text-slate-400 text-[11px]">
            In strict compliance with statutory regulations: <strong>Live surveillance tracking, private residences, and operational deployment coordinates are NEVER published.</strong> Markers indicate authorized international transit corridors and port authorities where public cooperation has been authorized by court order.
          </p>
        </div>
      </div>

      {/* Interactive Global Tactical Map Canvas */}
      <div className="relative bg-[#070D1F] border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-6 min-h-[440px] flex items-center justify-center">
        {/* SVG Tactical World Background */}
        <div className="w-full max-w-5xl aspect-[2/1] relative">
          <svg
            viewBox="0 0 1000 500"
            className="w-full h-full opacity-30 pointer-events-none select-none"
            fill="currentColor"
          >
            {/* World Landmass Silhouettes (Stylized Tactical Vector) */}
            <path
              d="M150,120 Q220,100 280,140 Q310,210 240,250 Q180,240 140,180 Z"
              className="text-slate-700"
            />
            <path
              d="M230,260 Q280,270 290,340 Q250,420 200,380 Q180,310 230,260 Z"
              className="text-slate-700"
            />
            <path
              d="M450,110 Q540,90 560,170 Q510,220 440,180 Z"
              className="text-slate-700"
            />
            <path
              d="M480,210 Q580,230 570,360 Q500,430 460,340 Q430,260 480,210 Z"
              className="text-slate-700"
            />
            <path
              d="M580,100 Q800,80 860,200 Q780,270 660,230 Q600,160 580,100 Z"
              className="text-slate-700"
            />
            <path
              d="M740,310 Q830,300 840,390 Q770,420 730,370 Z"
              className="text-slate-700"
            />
            {/* Grid Lines */}
            <line x1="0" y1="250" x2="1000" y2="250" stroke="#1e293b" strokeDasharray="4 4" />
            <line x1="500" y1="0" x2="500" y2="500" stroke="#1e293b" strokeDasharray="4 4" />
          </svg>

          {/* Interactive Macro-Region Hotspots */}
          {MACRO_REGIONS.map((region) => {
            const isSelected = selectedRegionId === region.id || selectedRegionId === 'all';
            return (
              <div
                key={region.id}
                style={{
                  left: `${region.coordinates.x}%`,
                  top: `${region.coordinates.y}%`
                }}
                onClick={() => setSelectedRegionId(region.id)}
                className={`absolute -translate-x-1/2 -translate-y-1/2 cursor-pointer transition-all duration-300 group z-20 ${
                  isSelected ? 'opacity-100 scale-100' : 'opacity-40 scale-90'
                }`}
              >
                {/* Pulsing Tactical Ring */}
                <div className="relative flex items-center justify-center">
                  <span className="animate-ping absolute inline-flex h-8 w-8 rounded-full bg-blue-500 opacity-30"></span>
                  <div className="relative px-3 py-1 rounded-full bg-slate-900/90 border border-blue-400 text-white font-mono text-xs font-bold shadow-xl flex items-center gap-1.5 hover:bg-blue-600 transition">
                    <MapPin className="w-3.5 h-3.5 text-blue-400 group-hover:text-white" />
                    <span>{region.warrantsCount}</span>
                  </div>
                </div>

                {/* Hover / Tooltip Card */}
                <div className="absolute left-1/2 -translate-x-1/2 top-full mt-2 w-64 p-3 bg-slate-900 border border-slate-700 rounded-xl shadow-2xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none text-left z-30">
                  <span className="text-[10px] uppercase font-mono text-blue-400 block font-bold">
                    Authorized Public Search Zone
                  </span>
                  <h4 className="text-xs font-bold text-white mt-0.5">{region.name}</h4>
                  <p className="text-[11px] text-slate-300 mt-1 leading-tight">{region.description}</p>
                  <div className="text-[10px] text-slate-400 pt-1.5 mt-1.5 border-t border-slate-800">
                    Lead: {region.jurisdictionAgency}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Legend Overlay in Bottom Corner */}
        <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-md border border-slate-800 rounded-xl p-3 text-[11px] text-slate-400 space-y-1 z-10 hidden sm:block">
          <div className="font-bold text-slate-200 uppercase text-[10px]">Tactical Map Legend</div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500"></span>
            <span>Authorized Public Sighting Corridor</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-2.5 h-2.5 text-amber-400" />
            <span>Operational GPS Obfuscated (Legal Requirement)</span>
          </div>
        </div>
      </div>

      {/* Region Breakdown Cards */}
      <div className="space-y-4">
        <h3 className="text-sm font-bold text-white uppercase tracking-wider">
          Cases in {selectedRegionId === 'all' ? 'All Macro Jurisdictions' : MACRO_REGIONS.find((r) => r.id === selectedRegionId)?.name}
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredPersons.map((p) => (
            <div
              key={p.id}
              className="p-4 bg-slate-900 border border-slate-800 rounded-xl flex items-center justify-between gap-3 hover:border-slate-700 transition"
            >
              <div className="flex items-center gap-3">
                <img
                  src={p.photoUrl}
                  alt={p.name}
                  className="w-12 h-12 rounded-lg object-cover border border-slate-700"
                />
                <div className="text-xs">
                  <h4 className="font-bold text-white hover:text-blue-300 cursor-pointer" onClick={() => onSelectPerson(p)}>
                    {p.name}
                  </h4>
                  <p className="text-[11px] text-slate-400 font-mono">{p.caseNumber}</p>
                  <p className="text-[10px] text-blue-400">{p.authorizedMacroLocation.region.split('&')[0]}</p>
                </div>
              </div>

              <div className="flex flex-col gap-1.5">
                <button
                  onClick={() => onSelectPerson(p)}
                  className="px-2.5 py-1 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white rounded text-xs font-semibold transition"
                >
                  Dossier
                </button>
                <button
                  onClick={() => onSubmitTipForPerson(p)}
                  className="px-2.5 py-1 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 rounded text-xs font-semibold transition"
                >
                  Tip
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
