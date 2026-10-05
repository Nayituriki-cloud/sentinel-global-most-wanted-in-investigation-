import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ShieldAlert, 
  CheckCircle2, 
  AlertTriangle, 
  SlidersHorizontal, 
  Globe2, 
  Eye, 
  Printer, 
  Sparkles, 
  ChevronRight,
  LayoutGrid,
  List,
  Scale
} from 'lucide-react';
import { usePlatform } from '../../context/PlatformContext';
import { WantedPerson } from '../../types';

interface MostWantedListProps {
  onSelectPerson: (person: WantedPerson) => void;
  onOpenSubmitTipForPerson: (person: WantedPerson) => void;
  onRunDuplicateCheck: (person: WantedPerson) => void;
}

export const MostWantedList: React.FC<MostWantedListProps> = ({
  onSelectPerson,
  onOpenSubmitTipForPerson,
  onRunDuplicateCheck
}) => {
  const { wantedPersons } = usePlatform();

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedJurisdiction, setSelectedJurisdiction] = useState('ALL');
  const [selectedCategory, setSelectedCategory] = useState('ALL');
  const [selectedPriority, setSelectedPriority] = useState('ALL');
  const [selectedStatus, setSelectedStatus] = useState('ALL');
  const [viewMode, setViewMode] = useState<'grid' | 'table'>('grid');

  // Available unique jurisdictions and categories
  const jurisdictions = useMemo(() => {
    const list = Array.from(new Set(wantedPersons.map((w) => w.jurisdiction)));
    return ['ALL', ...list];
  }, [wantedPersons]);

  const categories = useMemo(() => {
    const list = Array.from(new Set(wantedPersons.map((w) => w.warrantCategory)));
    return ['ALL', ...list];
  }, [wantedPersons]);

  const filteredPersons = useMemo(() => {
    return wantedPersons.filter((p) => {
      const q = searchTerm.toLowerCase();
      const matchSearch =
        p.name.toLowerCase().includes(q) ||
        p.caseNumber.toLowerCase().includes(q) ||
        p.primaryAlias.toLowerCase().includes(q) ||
        p.verifiedAliases.some((a) => a.toLowerCase().includes(q)) ||
        p.chargesSummary.toLowerCase().includes(q) ||
        p.issuingAuthority.toLowerCase().includes(q);

      const matchJurisdiction = selectedJurisdiction === 'ALL' || p.jurisdiction === selectedJurisdiction;
      const matchCategory = selectedCategory === 'ALL' || p.warrantCategory === selectedCategory;
      const matchPriority = selectedPriority === 'ALL' || p.priority === selectedPriority;
      const matchStatus = selectedStatus === 'ALL' || p.status === selectedStatus;

      return matchSearch && matchJurisdiction && matchCategory && matchPriority && matchStatus;
    });
  }, [wantedPersons, searchTerm, selectedJurisdiction, selectedCategory, selectedPriority, selectedStatus]);

  return (
    <div className="space-y-6">
      {/* Header and Title */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-black text-white tracking-tight">
              Official Most Wanted Registry
            </h1>
            <span className="px-2.5 py-0.5 rounded-full text-xs font-bold bg-blue-950 text-blue-300 border border-blue-800">
              {filteredPersons.length} Records
            </span>
          </div>
          <p className="text-xs text-slate-300 mt-1 max-w-2xl">
            Officially published fugitive search notices authorized under certified judicial warrants, European Arrest Warrants, and INTERPOL Red Notices.
          </p>
        </div>

        {/* View Toggle & Quick Filter Count */}
        <div className="flex items-center gap-2 self-start md:self-auto">
          <div className="flex items-center bg-slate-900 border border-slate-800 rounded-lg p-1">
            <button
              onClick={() => setViewMode('grid')}
              className={`p-1.5 rounded ${viewMode === 'grid' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Grid View"
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode('table')}
              className={`p-1.5 rounded ${viewMode === 'table' ? 'bg-blue-600 text-white' : 'text-slate-400 hover:text-white'}`}
              title="Table View"
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Due Process Strip */}
      <div className="p-3 bg-slate-900/80 border border-slate-800 rounded-xl flex items-center justify-between gap-4 text-xs text-slate-300">
        <div className="flex items-center gap-2">
          <Scale className="w-4 h-4 text-amber-400 shrink-0" />
          <span>
            <strong>Legal Standard:</strong> Presumption of innocence strictly applies. Never confront or attempt apprehension.
          </span>
        </div>
        <span className="hidden sm:inline text-[11px] text-slate-400">
          Source: Official Judicial Gazette & Treaty Desks
        </span>
      </div>

      {/* Search and Filters Bar */}
      <div className="p-4 bg-slate-900/90 border border-slate-800 rounded-xl space-y-3 shadow-lg">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by name, verified alias, case # (e.g. INT-2026-RN-9941), charges, or issuing court..."
            className="w-full pl-10 pr-4 py-2.5 bg-slate-950 border border-slate-700 rounded-lg text-xs text-white placeholder-slate-500 focus:outline-none focus:border-blue-500 transition"
          />
          {searchTerm && (
            <button
              onClick={() => setSearchTerm('')}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white"
            >
              Clear
            </button>
          )}
        </div>

        {/* Filter Selectors */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs">
          <div>
            <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">
              Jurisdiction
            </label>
            <select
              value={selectedJurisdiction}
              onChange={(e) => setSelectedJurisdiction(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-md py-1.5 px-2 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
            >
              {jurisdictions.map((j) => (
                <option key={j} value={j}>{j === 'ALL' ? 'All Jurisdictions' : j}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">
              Warrant Category
            </label>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-md py-1.5 px-2 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
            >
              {categories.map((c) => (
                <option key={c} value={c}>{c === 'ALL' ? 'All Categories' : c.replace('_', ' ')}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">
              Priority
            </label>
            <select
              value={selectedPriority}
              onChange={(e) => setSelectedPriority(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-md py-1.5 px-2 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Priorities</option>
              <option value="CRITICAL">Critical (P1)</option>
              <option value="HIGH">High (P2)</option>
              <option value="MEDIUM">Medium (P3)</option>
            </select>
          </div>

          <div>
            <label className="block text-[10px] uppercase font-semibold text-slate-400 mb-1">
              Case Status
            </label>
            <select
              value={selectedStatus}
              onChange={(e) => setSelectedStatus(e.target.value)}
              className="w-full bg-slate-950 border border-slate-700 rounded-md py-1.5 px-2 text-slate-200 text-xs focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Statuses</option>
              <option value="ACTIVE">Active</option>
              <option value="LOCATED">Located</option>
              <option value="ARRESTED">Arrested</option>
              <option value="CLEARED">Cleared</option>
            </select>
          </div>
        </div>
      </div>

      {/* Grid View */}
      {viewMode === 'grid' && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPersons.map((person) => (
            <div
              key={person.id}
              className="bg-slate-900 border border-slate-800 hover:border-blue-500/50 rounded-xl overflow-hidden transition-all duration-200 flex flex-col justify-between group shadow-xl hover:shadow-blue-950/20"
            >
              <div>
                {/* Photo & Priority Badges */}
                <div className="relative aspect-[4/3] bg-slate-950 overflow-hidden cursor-pointer" onClick={() => onSelectPerson(person)}>
                  <img
                    src={person.photoUrl}
                    alt={person.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>

                  {/* Priority Tag */}
                  <div className="absolute top-3 left-3 flex flex-wrap gap-1.5">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold font-mono tracking-wider ${
                      person.priority === 'CRITICAL' ? 'bg-rose-600 text-white shadow-lg shadow-rose-900/40' :
                      person.priority === 'HIGH' ? 'bg-amber-600 text-white' : 'bg-blue-600 text-white'
                    }`}>
                      {person.priority}
                    </span>
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      person.status === 'ACTIVE' ? 'bg-emerald-600 text-white' :
                      person.status === 'LOCATED' ? 'bg-amber-500 text-slate-950' : 'bg-slate-700 text-white'
                    }`}>
                      {person.status}
                    </span>
                  </div>

                  {/* Reward Badge */}
                  {person.bountyReward && (
                    <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-sm border border-amber-500/40 px-2 py-0.5 rounded text-[11px] font-mono font-bold text-amber-300">
                      {person.bountyReward.split(' ')[0]}
                    </div>
                  )}

                  {/* Verification Notice Badge */}
                  <div className="absolute bottom-2 left-3 right-3 flex items-center justify-between text-[10px] text-slate-300">
                    <span className="font-mono text-blue-300 font-bold">{person.caseNumber}</span>
                    <span className="px-1.5 py-0.5 rounded bg-slate-900/80 text-emerald-400 text-[9px] border border-emerald-500/30 flex items-center gap-1">
                      <CheckCircle2 className="w-2.5 h-2.5" />
                      Verified
                    </span>
                  </div>
                </div>

                {/* Card Body */}
                <div className="p-4 space-y-3">
                  <div>
                    <h3 
                      onClick={() => onSelectPerson(person)}
                      className="font-bold text-lg text-white group-hover:text-blue-300 transition-colors cursor-pointer"
                    >
                      {person.name}
                    </h3>
                    <p className="text-xs text-slate-400">
                      Alias: <strong className="text-slate-200">{person.primaryAlias}</strong>
                      {person.verifiedAliases.length > 0 && ` (${person.verifiedAliases[0]})`}
                    </p>
                  </div>

                  <p className="text-xs text-slate-300 line-clamp-2 leading-relaxed">
                    {person.chargesSummary}
                  </p>

                  <div className="space-y-1.5 pt-2 border-t border-slate-800 text-[11px] text-slate-400">
                    <div className="flex justify-between">
                      <span>Issuing Agency:</span>
                      <span className="font-medium text-slate-200 text-right truncate max-w-[180px]">
                        {person.issuingAuthority}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Macro Region:</span>
                      <span className="font-medium text-slate-200">
                        {person.authorizedMacroLocation.region.split('&')[0]}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>Last Verified:</span>
                      <span className="font-mono text-slate-300">{person.dateLastVerified}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Card Footer Actions */}
              <div className="p-3 bg-slate-950 border-t border-slate-800 flex items-center justify-between gap-2">
                <button
                  onClick={() => onSelectPerson(person)}
                  className="flex-1 py-1.5 px-3 bg-blue-600/20 hover:bg-blue-600 text-blue-300 hover:text-white rounded text-xs font-semibold border border-blue-500/30 transition flex items-center justify-center gap-1.5"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View Dossier
                </button>
                <button
                  onClick={() => onOpenSubmitTipForPerson(person)}
                  className="py-1.5 px-3 bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 rounded text-xs font-semibold border border-amber-500/30 transition flex items-center gap-1"
                  title="Submit encrypted tip for this person"
                >
                  <AlertTriangle className="w-3.5 h-3.5" />
                  Tip
                </button>
                <button
                  onClick={() => onRunDuplicateCheck(person)}
                  className="p-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded border border-slate-700 transition"
                  title="Run Cross-Jurisdiction AI Entity Correlation"
                >
                  <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewMode === 'table' && (
        <div className="bg-slate-900 border border-slate-800 rounded-xl overflow-x-auto shadow-xl">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase text-[10px] font-semibold border-b border-slate-800">
              <tr>
                <th className="py-3 px-4">Subject</th>
                <th className="py-3 px-4">Case #</th>
                <th className="py-3 px-4">Category</th>
                <th className="py-3 px-4">Priority</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Issuing Authority</th>
                <th className="py-3 px-4">Verified</th>
                <th className="py-3 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {filteredPersons.map((p) => (
                <tr key={p.id} className="hover:bg-slate-850/60 transition">
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-3">
                      <img
                        src={p.photoUrl}
                        alt={p.name}
                        className="w-10 h-10 rounded-md object-cover border border-slate-700"
                      />
                      <div>
                        <div className="font-bold text-white hover:text-blue-300 cursor-pointer" onClick={() => onSelectPerson(p)}>
                          {p.name}
                        </div>
                        <div className="text-[11px] text-slate-400">{p.primaryAlias}</div>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono font-bold text-blue-300">{p.caseNumber}</td>
                  <td className="py-3 px-4">{p.warrantCategory.replace('_', ' ')}</td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      p.priority === 'CRITICAL' ? 'bg-rose-950 text-rose-300' : 'bg-blue-950 text-blue-300'
                    }`}>
                      {p.priority}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300">
                      {p.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 max-w-[200px] truncate">{p.issuingAuthority}</td>
                  <td className="py-3 px-4 font-mono text-[11px]">{p.dateLastVerified}</td>
                  <td className="py-3 px-4 text-right">
                    <div className="flex items-center justify-end gap-1.5">
                      <button
                        onClick={() => onSelectPerson(p)}
                        className="px-2.5 py-1 rounded bg-blue-600/30 hover:bg-blue-600 text-blue-200 hover:text-white transition font-medium"
                      >
                        Dossier
                      </button>
                      <button
                        onClick={() => onOpenSubmitTipForPerson(p)}
                        className="p-1 rounded bg-amber-500/20 hover:bg-amber-500 text-amber-300 hover:text-slate-950 transition"
                        title="Submit tip"
                      >
                        <AlertTriangle className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {filteredPersons.length === 0 && (
        <div className="p-12 text-center bg-slate-900/50 border border-slate-800 rounded-xl space-y-3">
          <ShieldAlert className="w-8 h-8 text-slate-500 mx-auto" />
          <h3 className="text-base font-bold text-white">No Matching Official Records Found</h3>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            Try adjusting your search criteria or resetting filters. All published data is strictly restricted to certified judicial warrants.
          </p>
          <button
            onClick={() => {
              setSearchTerm('');
              setSelectedJurisdiction('ALL');
              setSelectedCategory('ALL');
              setSelectedPriority('ALL');
              setSelectedStatus('ALL');
            }}
            className="px-3 py-1.5 bg-blue-600 hover:bg-blue-500 text-white rounded text-xs font-semibold"
          >
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
