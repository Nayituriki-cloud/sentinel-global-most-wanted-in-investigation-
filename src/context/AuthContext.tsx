import React, { createContext, useContext, useState, useEffect } from 'react';
import { UserRole } from '../types';

interface AuthUser {
  id: string;
  name: string;
  badgeNumber?: string;
  role: UserRole;
  agency: string;
  has2FA: boolean;
  securityClearance: 'PUBLIC_TIER' | 'RESTRICTED_INVESTIGATOR' | 'TOP_SECRET_SUPERVISOR' | 'SYSTEM_OVERSIGHT';
  sessionToken: string;
  lastLogin: string;
}

interface AuthContextType {
  currentUser: AuthUser;
  setRole: (role: UserRole) => void;
  is2FAVerified: boolean;
  toggle2FA: () => void;
  canAccessInvestigativeData: boolean;
  canModifyMissions: boolean;
  canAuditSecurity: boolean;
  sessionRemainingMinutes: number;
}

const ROLE_CONFIGS: Record<UserRole, Omit<AuthUser, 'sessionToken' | 'lastLogin'>> = {
  PUBLIC: {
    id: 'usr-public-anon',
    name: 'Authorized Public User',
    role: 'PUBLIC',
    agency: 'Public Safety Portal',
    has2FA: false,
    securityClearance: 'PUBLIC_TIER'
  },
  INVESTIGATOR: {
    id: 'usr-inv-992',
    name: 'Det. Sophie Van Der Meer',
    badgeNumber: 'EUROPOL-FAST-8812',
    role: 'INVESTIGATOR',
    agency: 'Europol FAST Unit',
    has2FA: true,
    securityClearance: 'RESTRICTED_INVESTIGATOR'
  },
  LEAD_DETECTIVE: {
    id: 'usr-lead-304',
    name: 'Capt. Kenzo Mori',
    badgeNumber: 'TMPD-INT-4491',
    role: 'LEAD_DETECTIVE',
    agency: 'Tokyo Metropolitan Police Dept.',
    has2FA: true,
    securityClearance: 'RESTRICTED_INVESTIGATOR'
  },
  AGENCY_SUPERVISOR: {
    id: 'usr-sup-010',
    name: 'Col. Roberto De Luca',
    badgeNumber: 'GDF-FAST-001',
    role: 'AGENCY_SUPERVISOR',
    agency: 'Guardia di Finanza / Europol Command',
    has2FA: true,
    securityClearance: 'TOP_SECRET_SUPERVISOR'
  },
  SYSTEM_AUDITOR: {
    id: 'usr-aud-777',
    name: 'Magistrate & Compliance Inspector Helena Vance',
    badgeNumber: 'INT-OVERSIGHT-900',
    role: 'SYSTEM_AUDITOR',
    agency: 'International Due Process Commission',
    has2FA: true,
    securityClearance: 'SYSTEM_OVERSIGHT'
  }
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<UserRole>(() => {
    const saved = localStorage.getItem('sentinel_user_role');
    return (saved as UserRole) || 'PUBLIC';
  });

  const [is2FAVerified, setIs2FAVerified] = useState<boolean>(true);
  const [sessionRemainingMinutes, setSessionRemainingMinutes] = useState<number>(45);

  useEffect(() => {
    localStorage.setItem('sentinel_user_role', currentRole);
  }, [currentRole]);

  useEffect(() => {
    const timer = setInterval(() => {
      setSessionRemainingMinutes((prev) => (prev > 1 ? prev - 1 : 45));
    }, 60000);
    return () => clearInterval(timer);
  }, []);

  const config = ROLE_CONFIGS[currentRole];
  const currentUser: AuthUser = {
    ...config,
    sessionToken: `JWT_${currentRole}_${Date.now().toString(36)}`,
    lastLogin: new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString()
  };

  const setRole = (role: UserRole) => {
    setCurrentRole(role);
  };

  const toggle2FA = () => {
    setIs2FAVerified((prev) => !prev);
  };

  const canAccessInvestigativeData = currentRole !== 'PUBLIC';
  const canModifyMissions = ['LEAD_DETECTIVE', 'AGENCY_SUPERVISOR'].includes(currentRole);
  const canAuditSecurity = ['AGENCY_SUPERVISOR', 'SYSTEM_AUDITOR'].includes(currentRole);

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        setRole,
        is2FAVerified,
        toggle2FA,
        canAccessInvestigativeData,
        canModifyMissions,
        canAuditSecurity,
        sessionRemainingMinutes
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
