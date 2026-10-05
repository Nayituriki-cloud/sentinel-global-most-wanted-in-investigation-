import React, { useState } from 'react';
import { 
  Shield, 
  Search, 
  AlertTriangle, 
  UserCheck, 
  Lock, 
  Bot, 
  FileText, 
  Globe2, 
  Building2, 
  SlidersHorizontal, 
  Activity, 
  HelpCircle,
  Menu,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { UserRole } from '../../types';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  openSubmitTipModal: () => void;
  openAIAssistant: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  openSubmitTipModal,
  openAIAssistant
}) => {
  const { currentUser, setRole, is2FAVerified, toggle2FA } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleMenuOpen, setRoleMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: Activity },
    { id: 'wanted', label: 'Most Wanted', icon: Shield },
    { id: 'missions', label: 'Missions', icon: SlidersHorizontal },
    { id: 'cases', label: 'Cases', icon: FileText },
    { id: 'tips', label: 'Tips & Reports', icon: AlertTriangle },
    { id: 'map', label: 'Safety Map', icon: Globe2 },
    { id: 'agencies', label: 'Agencies', icon: Building2 },
    { id: 'audit', label: 'Audit Log', icon: Lock },
    { id: 'security', label: 'Security & Legal', icon: UserCheck }
  ];

  const roles: { role: UserRole; label: string; badge: string; desc: string }[] = [
    { role: 'PUBLIC', label: 'Public Safety View', badge: 'Public Access', desc: 'Sanitized public registry, anonymous tip submission, safety notices' },
    { role: 'INVESTIGATOR', label: 'Field Investigator', badge: 'Tier 2 Classified', desc: 'Case tracking, tip triage, action checklist execution' },
    { role: 'LEAD_DETECTIVE', label: 'Lead Detective', badge: 'Command Tier', desc: 'Mission status lifecycle, confidential evidence, team coordination' },
    { role: 'AGENCY_SUPERVISOR', label: 'Agency Supervisor', badge: 'High Command', desc: 'Publish verified cases, MLAT inter-agency dispatch, warrants' },
    { role: 'SYSTEM_AUDITOR', label: 'Legal & Due Process Auditor', badge: 'Oversight', desc: 'Presumption of innocence compliance, immutable audit verification' }
  ];

  return (
    <header className="sticky top-0 z-40 bg-[#070D1F] border-b border-slate-800 text-slate-100 shadow-xl">
      {/* Top Lawful Warning & Compliance Marquee */}
      <div className="bg-gradient-to-r from-amber-950 via-slate-900 to-amber-950 text-amber-200 text-xs px-4 py-1.5 border-b border-amber-500/20 flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-amber-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-amber-500"></span>
          </span>
          <span className="font-semibold tracking-wider uppercase text-[10px] text-amber-300">Public Safety Notice:</span>
          <span className="text-slate-200 hidden sm:inline">
            DO NOT CONFRONT OR PURSUE. Persons listed are sought under judicial warrants and are strictly presumed innocent until proven guilty in a court of law.
          </span>
          <span className="text-slate-200 sm:hidden">Do not confront suspects. Presumed innocent.</span>
        </div>
        <div className="flex items-center gap-3 text-[11px]">
          <span className="text-amber-400/90 font-mono hidden md:inline">EMERGENCY: 911 / 112 / +33 4 72 44 70 00</span>
          <button 
            onClick={openSubmitTipModal}
            className="bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold px-2.5 py-0.5 rounded text-[11px] transition shadow flex items-center gap-1"
          >
            <AlertTriangle className="w-3 h-3" />
            Submit Public Tip
          </button>
        </div>
      </div>

      {/* Main Navbar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo & Platform Name */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setCurrentTab('dashboard')}>
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-blue-700 via-indigo-800 to-slate-900 border border-blue-400/30 flex items-center justify-center shadow-lg shadow-blue-900/40">
              <Shield className="w-5 h-5 text-blue-300" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-black text-lg tracking-wider bg-gradient-to-r from-blue-100 via-white to-blue-300 bg-clip-text text-transparent">
                  SENTINEL
                </span>
                <span className="px-1.5 py-0.5 rounded text-[10px] font-mono font-semibold bg-blue-950/80 text-blue-300 border border-blue-800/60">
                  GLOBAL PUBLIC SAFETY
                </span>
              </div>
              <p className="text-[10px] text-slate-400 hidden sm:block tracking-wide">
                Authorized Most Wanted & Lawful Intelligence Network
              </p>
            </div>
          </div>

          {/* Desktop Navigation Items */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setCurrentTab(item.id)}
                  className={`flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600/30 text-blue-200 border border-blue-500/40 shadow-sm'
                      : 'text-slate-300 hover:text-white hover:bg-slate-800/60'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-blue-400' : 'text-slate-400'}`} />
                  {item.label}
                </button>
              );
            })}
          </nav>

          {/* Right Action Icons & Role Switcher */}
          <div className="flex items-center gap-2.5">
            {/* AI Assistant Quick Launcher */}
            <button
              onClick={openAIAssistant}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-semibold bg-indigo-950/80 hover:bg-indigo-900 border border-indigo-700/60 text-indigo-200 shadow-sm transition group"
              title="Launch SENTINEL AI Intelligence Assistant"
            >
              <Bot className="w-3.5 h-3.5 text-indigo-400 group-hover:scale-110 transition-transform" />
              <span className="hidden sm:inline">AI Intel</span>
            </button>

            {/* Role & Access Level Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleMenuOpen(!roleMenuOpen)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-md bg-slate-900 hover:bg-slate-800 border border-slate-700 text-xs font-medium transition"
              >
                <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                <div className="text-left hidden sm:block">
                  <div className="text-[11px] font-semibold text-slate-200 leading-tight">
                    {currentUser.role.replace('_', ' ')}
                  </div>
                  <div className="text-[9px] text-slate-400 leading-none">
                    {currentUser.agency}
                  </div>
                </div>
                <span className="text-[10px] text-slate-400 sm:hidden">Role</span>
              </button>

              {roleMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-slate-900 border border-slate-700 rounded-lg shadow-2xl py-2 z-50">
                  <div className="px-3 py-2 border-b border-slate-800">
                    <p className="text-xs font-bold text-slate-200">Role-Based Access Control (RBAC)</p>
                    <p className="text-[10px] text-slate-400">
                      Switch authority level to preview authorized investigative features vs. public safety portal.
                    </p>
                  </div>
                  <div className="p-1 space-y-1">
                    {roles.map((r) => (
                      <button
                        key={r.role}
                        onClick={() => {
                          setRole(r.role);
                          setRoleMenuOpen(false);
                        }}
                        className={`w-full text-left p-2 rounded-md transition ${
                          currentUser.role === r.role
                            ? 'bg-blue-600/20 border border-blue-500/50'
                            : 'hover:bg-slate-800'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-semibold text-slate-200">{r.label}</span>
                          <span className="text-[9px] font-mono px-1.5 py-0.5 rounded bg-slate-800 text-slate-300">
                            {r.badge}
                          </span>
                        </div>
                        <p className="text-[10px] text-slate-400 mt-0.5">{r.desc}</p>
                      </button>
                    ))}
                  </div>
                  <div className="px-3 py-2 border-t border-slate-800 flex items-center justify-between text-[11px]">
                    <span className="text-slate-400">2FA Security Status:</span>
                    <button
                      onClick={toggle2FA}
                      className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                        is2FAVerified ? 'bg-emerald-950 text-emerald-300 border border-emerald-700' : 'bg-rose-950 text-rose-300'
                      }`}
                    >
                      {is2FAVerified ? '2FA ACTIVE' : '2FA DISABLED'}
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-1.5 rounded-md text-slate-400 hover:text-white hover:bg-slate-800"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900 border-b border-slate-800 px-4 pt-2 pb-4 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = currentTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentTab(item.id);
                  setMobileMenuOpen(false);
                }}
                className={`w-full flex items-center gap-2 px-3 py-2 rounded-md text-sm font-medium ${
                  isActive ? 'bg-blue-600/30 text-blue-200' : 'text-slate-300 hover:bg-slate-800'
                }`}
              >
                <Icon className="w-4 h-4 text-blue-400" />
                {item.label}
              </button>
            );
          })}
          <div className="pt-2 border-t border-slate-800 flex gap-2">
            <button
              onClick={() => {
                openSubmitTipModal();
                setMobileMenuOpen(false);
              }}
              className="flex-1 bg-amber-500 text-slate-950 font-bold py-2 rounded text-xs text-center"
            >
              Submit Public Tip
            </button>
            <button
              onClick={() => {
                openAIAssistant();
                setMobileMenuOpen(false);
              }}
              className="flex-1 bg-indigo-600 text-white font-medium py-2 rounded text-xs text-center"
            >
              AI Assistant
            </button>
          </div>
        </div>
      )}
    </header>
  );
};
