import React, { createContext, useContext, useState, useEffect } from 'react';
import { 
  WantedPerson, 
  Mission, 
  TipSubmission, 
  PartnerAgency, 
  AuditLogEntry, 
  MissionStatus, 
  CaseStatus 
} from '../types';
import { 
  INITIAL_WANTED, 
  INITIAL_MISSIONS, 
  INITIAL_TIPS, 
  INITIAL_AGENCIES, 
  INITIAL_AUDIT_LOGS 
} from '../data/mockData';
import { useAuth } from './AuthContext';
import { triageTipAI } from '../services/aiService';

interface PlatformContextType {
  wantedPersons: WantedPerson[];
  missions: Mission[];
  tips: TipSubmission[];
  auditLogs: AuditLogEntry[];
  agencies: PartnerAgency[];
  
  // Actions
  addTip: (tip: Omit<TipSubmission, 'id' | 'timestamp' | 'status' | 'encryptionBadge'>) => Promise<string>;
  updateTipStatus: (tipId: string, status: TipSubmission['status'], investigatorNotes?: string) => void;
  updateMissionStatus: (missionId: string, status: MissionStatus, completionReason?: string) => void;
  toggleMissionChecklist: (missionId: string, checklistId: string, notes?: string) => void;
  addMissionNote: (missionId: string, noteContent: string) => void;
  addCaseRecord: (newCase: WantedPerson, initialMissionObjective?: string) => void;
  updateCaseStatus: (caseId: string, status: CaseStatus) => void;
  recordAudit: (actionType: AuditLogEntry['actionType'], targetReference: string, details: string) => void;
  resetToDefaults: () => void;
}

const PlatformContext = createContext<PlatformContextType | undefined>(undefined);

export const PlatformProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentUser } = useAuth();

  const [wantedPersons, setWantedPersons] = useState<WantedPerson[]>(() => {
    const saved = localStorage.getItem('sentinel_wanted_data');
    return saved ? JSON.parse(saved) : INITIAL_WANTED;
  });

  const [missions, setMissions] = useState<Mission[]>(() => {
    const saved = localStorage.getItem('sentinel_missions_data');
    return saved ? JSON.parse(saved) : INITIAL_MISSIONS;
  });

  const [tips, setTips] = useState<TipSubmission[]>(() => {
    const saved = localStorage.getItem('sentinel_tips_data');
    return saved ? JSON.parse(saved) : INITIAL_TIPS;
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    const saved = localStorage.getItem('sentinel_audit_logs');
    return saved ? JSON.parse(saved) : INITIAL_AUDIT_LOGS;
  });

  const [agencies] = useState<PartnerAgency[]>(INITIAL_AGENCIES);

  // Sync to local storage
  useEffect(() => {
    localStorage.setItem('sentinel_wanted_data', JSON.stringify(wantedPersons));
  }, [wantedPersons]);

  useEffect(() => {
    localStorage.setItem('sentinel_missions_data', JSON.stringify(missions));
  }, [missions]);

  useEffect(() => {
    localStorage.setItem('sentinel_tips_data', JSON.stringify(tips));
  }, [tips]);

  useEffect(() => {
    localStorage.setItem('sentinel_audit_logs', JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Record audit log
  const recordAudit = (actionType: AuditLogEntry['actionType'], targetReference: string, details: string) => {
    const newEntry: AuditLogEntry = {
      id: `aud-${Date.now().toString(36)}-${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      actorRole: currentUser.role,
      actorIdentifier: currentUser.badgeNumber || currentUser.name,
      actionType,
      targetReference,
      details,
      ipMasked: '10.82.*** (Secured Sentinel Protocol)',
      digitalSignature: `ED25519:${Math.random().toString(36).substring(2, 10)}${Math.random().toString(36).substring(2, 10)}`
    };
    setAuditLogs((prev) => [newEntry, ...prev]);
  };

  // Add tip with auto AI triage
  const addTip = async (tipData: Omit<TipSubmission, 'id' | 'timestamp' | 'status' | 'encryptionBadge'>): Promise<string> => {
    const tipId = `TIP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
    const timestamp = new Date().toISOString().replace('T', ' ').substring(0, 19);

    const relatedCase = wantedPersons.find((w) => w.id === tipData.caseId);

    const baseTip: TipSubmission = {
      ...tipData,
      id: tipId,
      timestamp,
      status: 'SUBMITTED',
      encryptionBadge: 'End-to-End Encrypted (AES-256-GCM / Client-side Hash)',
      urgencyScore: tipData.urgencyScore || 'ROUTINE'
    };

    // Prepend immediately
    setTips((prev) => [baseTip, ...prev]);
    recordAudit('TIP_SUBMITTED', tipId, `Encrypted public tip submitted regarding case "${tipData.caseName || 'General'}". Anonymous: ${tipData.isAnonymous}`);

    // If associated mission exists, transition to INFORMATION RECEIVED if currently ACTIVE
    if (tipData.caseId) {
      setMissions((prevMissions) => 
        prevMissions.map((m) => {
          if (m.caseId === tipData.caseId && (m.status === 'ACTIVE' || m.status === 'VERIFIED')) {
            recordAudit('MISSION_STATUS_CHANGE', m.missionCode, `Mission status escalated to INFORMATION RECEIVED due to Tip ${tipId}`);
            return { ...m, status: 'INFORMATION RECEIVED' };
          }
          return m;
        })
      );
    }

    // Trigger AI Triage asynchronously
    triageTipAI(baseTip, relatedCase).then((analysis) => {
      setTips((prevTips) =>
        prevTips.map((t) => (t.id === tipId ? { ...t, aiTriageAnalysis: analysis, status: 'TRIAGED' } : t))
      );
      recordAudit('AI_ANALYSIS_REQUEST', tipId, `Automated AI risk triage & lead scoring completed for Tip ${tipId}`);
    });

    return tipId;
  };

  // Update tip status
  const updateTipStatus = (tipId: string, status: TipSubmission['status'], investigatorNotes?: string) => {
    setTips((prev) =>
      prev.map((t) => {
        if (t.id === tipId) {
          return {
            ...t,
            status,
            reviewedBy: currentUser.name,
            investigatorNotes: investigatorNotes || t.investigatorNotes
          };
        }
        return t;
      })
    );
    recordAudit('TIP_TRIAGED', tipId, `Tip status modified to ${status} by ${currentUser.name}. Notes updated.`);
  };

  // Update mission status
  const updateMissionStatus = (missionId: string, status: MissionStatus, completionReason?: string) => {
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id === missionId) {
          const updated = { ...m, status };
          if (status === 'RESOLVED') {
            updated.completionReport = {
              resolvedDate: new Date().toISOString().substring(0, 10),
              resolutionType: 'APPREHENDED',
              resolvingAgency: currentUser.agency,
              magistrateReference: `MAG-ORDER-${Date.now().toString(36).toUpperCase()}`,
              publicSafetyStatement: completionReason || 'Subject safely apprehended in coordination with competent judicial authorities. Warrant rescinded.'
            };
          }
          return updated;
        }
        return m;
      })
    );

    const mission = missions.find((m) => m.id === missionId);
    if (mission) {
      recordAudit('MISSION_STATUS_CHANGE', mission.missionCode, `Mission status set to ${status}. Authorization by ${currentUser.name}`);
    }
  };

  // Toggle checklist
  const toggleMissionChecklist = (missionId: string, checklistId: string, notes?: string) => {
    setMissions((prev) =>
      prev.map((m) => {
        if (m.id === missionId) {
          const updatedChecklist = m.actionChecklist.map((item) => {
            if (item.id === checklistId) {
              const completed = !item.completed;
              return {
                ...item,
                completed,
                completedAt: completed ? new Date().toISOString().substring(0, 10) : undefined,
                assignedTo: currentUser.name,
                notes: notes !== undefined ? notes : item.notes
              };
            }
            return item;
          });
          return { ...m, actionChecklist: updatedChecklist };
        }
        return m;
      })
    );

    recordAudit('CHECKLIST_TOGGLE', missionId, `Checklist item ${checklistId} updated by ${currentUser.name}`);
  };

  // Add secure note
  const addMissionNote = (missionId: string, noteContent: string) => {
    const newNote = {
      id: `cn-${Date.now()}`,
      author: currentUser.name,
      role: currentUser.role,
      timestamp: new Date().toISOString().replace('T', ' ').substring(0, 19),
      content: noteContent
    };

    setMissions((prev) =>
      prev.map((m) => {
        if (m.id === missionId) {
          return {
            ...m,
            confidentialNotes: [newNote, ...m.confidentialNotes]
          };
        }
        return m;
      })
    );

    recordAudit('CASE_UPDATE', missionId, `Secure investigative note appended by ${currentUser.name}`);
  };

  // Add new case
  const addCaseRecord = (newCase: WantedPerson, initialMissionObjective?: string) => {
    setWantedPersons((prev) => [newCase, ...prev]);

    // Create corresponding mission
    const newMission: Mission = {
      id: `ms-${Date.now().toString(36)}`,
      caseId: newCase.id,
      missionCode: `MISSION-${newCase.countryCode}-${Date.now().toString(36).toUpperCase()}`,
      objective: initialMissionObjective || `Identify, locate, and coordinate lawful judicial surrender of ${newCase.name}.`,
      priority: newCase.priority,
      jurisdiction: newCase.jurisdiction,
      assignedAgency: newCase.issuingAuthority,
      assignedTeam: 'Special Fugitive Taskforce Delta',
      leadOfficer: currentUser.name,
      status: 'VERIFIED',
      evidenceRefs: [
        {
          id: `ev-${Date.now()}`,
          type: 'WARRANT',
          title: `Judicial Warrant ${newCase.caseNumber}`,
          documentNumber: newCase.caseNumber,
          custodianAgency: newCase.issuingAuthority,
          dateFiled: newCase.datePublished,
          summary: 'Original certified court search warrant.',
          classificationLevel: 'PUBLIC_RELEASABLE'
        }
      ],
      timeline: newCase.timeline,
      actionChecklist: [
        { id: `ck-1-${Date.now()}`, label: 'Verify biometric and facial template across INTERPOL I-24/7', completed: true, assignedTo: currentUser.name },
        { id: `ck-2-${Date.now()}`, label: 'Issue public safety advisory and coordinate with border control', completed: false, assignedTo: currentUser.name },
        { id: `ck-3-${Date.now()}`, label: 'Establish secure tip triage queue', completed: true, assignedTo: currentUser.name }
      ],
      confidentialNotes: []
    };

    setMissions((prev) => [newMission, ...prev]);
    recordAudit('CASE_UPDATE', newCase.caseNumber, `New verified case publication created by ${currentUser.name}. Warrant verified.`);
  };

  // Update case status
  const updateCaseStatus = (caseId: string, status: CaseStatus) => {
    setWantedPersons((prev) =>
      prev.map((c) => (c.id === caseId ? { ...c, status, dateLastVerified: new Date().toISOString().substring(0, 10) } : c))
    );
    const targetCase = wantedPersons.find((c) => c.id === caseId);
    if (targetCase) {
      recordAudit('CASE_UPDATE', targetCase.caseNumber, `Case status changed to ${status}`);
    }
  };

  const resetToDefaults = () => {
    setWantedPersons(INITIAL_WANTED);
    setMissions(INITIAL_MISSIONS);
    setTips(INITIAL_TIPS);
    setAuditLogs(INITIAL_AUDIT_LOGS);
    localStorage.removeItem('sentinel_wanted_data');
    localStorage.removeItem('sentinel_missions_data');
    localStorage.removeItem('sentinel_tips_data');
    localStorage.removeItem('sentinel_audit_logs');
    recordAudit('VERIFICATION_AUDIT', 'SYSTEM', 'Platform data reset to baseline authorized sample records.');
  };

  return (
    <PlatformContext.Provider
      value={{
        wantedPersons,
        missions,
        tips,
        auditLogs,
        agencies,
        addTip,
        updateTipStatus,
        updateMissionStatus,
        toggleMissionChecklist,
        addMissionNote,
        addCaseRecord,
        updateCaseStatus,
        recordAudit,
        resetToDefaults
      }}
    >
      {children}
    </PlatformContext.Provider>
  );
};

export const usePlatform = () => {
  const context = useContext(PlatformContext);
  if (!context) {
    throw new Error('usePlatform must be used within a PlatformProvider');
  }
  return context;
};
