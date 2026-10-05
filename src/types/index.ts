/**
 * SENTINEL Global Most Wanted & Public Safety Intelligence Platform
 * Core Type Definitions
 */

export type CaseStatus = 'ACTIVE' | 'LOCATED' | 'ARRESTED' | 'CLEARED';

export type MissionStatus = 
  | 'NEW' 
  | 'VERIFIED' 
  | 'ACTIVE' 
  | 'INFORMATION RECEIVED' 
  | 'REVIEW' 
  | 'RESOLVED';

export type PriorityLevel = 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'ROUTINE';

export type VerificationStatus = 
  | 'JUDICIAL_ORDER_VERIFIED' 
  | 'INTERPOL_RED_NOTICE' 
  | 'MINISTRY_VALIDATED' 
  | 'PENDING_HUMAN_REVIEW' 
  | 'HISTORICAL_ARCHIVE';

export type UserRole = 
  | 'PUBLIC' 
  | 'INVESTIGATOR' 
  | 'LEAD_DETECTIVE' 
  | 'AGENCY_SUPERVISOR' 
  | 'SYSTEM_AUDITOR';

export interface PhysicalDescription {
  gender: string;
  ageApprox: string;
  height: string;
  weight: string;
  hairColor: string;
  eyeColor: string;
  distinguishingFeatures: string[];
  languagesSpoken: string[];
  nationalities: string[];
}

export interface TimelineEvent {
  id: string;
  date: string;
  title: string;
  description: string;
  location: string;
  verifiedBy: string;
  evidenceRef?: string;
}

export interface EvidenceReference {
  id: string;
  type: 'WARRANT' | 'FORENSIC' | 'MANIFEST' | 'SURVEILLANCE_IMAGE' | 'FINANCIAL_RECORD' | 'AFFIDAVIT';
  title: string;
  documentNumber: string;
  custodianAgency: string;
  dateFiled: string;
  summary: string;
  classificationLevel: 'PUBLIC_RELEASABLE' | 'LAW_ENFORCEMENT_SENSITIVE' | 'RESTRICTED';
}

export interface ActionChecklistItem {
  id: string;
  label: string;
  completed: boolean;
  assignedTo?: string;
  completedAt?: string;
  notes?: string;
}

export interface WantedPerson {
  id: string;
  caseNumber: string; // e.g. "INT-2026-RN-9941"
  name: string;
  primaryAlias: string;
  verifiedAliases: string[];
  photoUrl: string;
  photoAuthorizedNotice: string;
  issuingAuthority: string;
  jurisdiction: string;
  countryCode: string;
  warrantCategory: 'VIOLENT_CRIME' | 'TRANSNATIONAL_ORGANIZED' | 'FINANCIAL_FRAUD' | 'CYBER_ESPIONAGE' | 'MARITIME_PIRACY' | 'TRAFFICKING';
  chargesSummary: string;
  officialChargesList: string[];
  status: CaseStatus;
  priority: PriorityLevel;
  datePublished: string;
  dateLastVerified: string;
  verificationStatus: VerificationStatus;
  presumptionOfInnocenceNotice: string;
  sourceReliabilityCode: string; // e.g. "A1 - Completely Reliable / Confirmed"
  physical: PhysicalDescription;
  timeline: TimelineEvent[];
  authorizedMacroLocation: {
    region: string;
    country: string;
    coordinatesApprox: [number, number]; // [lat, lng] broad regional center
    lastKnownOfficialRegion: string;
  };
  bountyReward?: string;
  disclaimer: string;
}

export interface Mission {
  id: string;
  caseId: string;
  missionCode: string; // e.g. "MISSION-AEGIS-44"
  objective: string;
  priority: PriorityLevel;
  jurisdiction: string;
  assignedAgency: string;
  assignedTeam: string;
  leadOfficer: string;
  status: MissionStatus;
  evidenceRefs: EvidenceReference[];
  timeline: TimelineEvent[];
  actionChecklist: ActionChecklistItem[];
  completionReport?: {
    resolvedDate: string;
    resolutionType: 'APPREHENDED' | 'LOCATED_SURRENDER' | 'WARRANT_RESCINDED' | 'CLEARED_BY_COURT';
    resolvingAgency: string;
    magistrateReference: string;
    publicSafetyStatement: string;
  };
  confidentialNotes: Array<{
    id: string;
    author: string;
    role: string;
    timestamp: string;
    content: string;
  }>;
}

export interface TipSubmission {
  id: string; // e.g. "TIP-2026-9812"
  timestamp: string;
  caseId?: string; // Optional if general
  caseName?: string;
  isAnonymous: boolean;
  informantName?: string;
  informantContact?: string;
  locationReported: string;
  sightingDate: string;
  details: string;
  attachments: Array<{
    name: string;
    type: string;
    size: string;
    simulatedHash: string;
  }>;
  status: 'SUBMITTED' | 'TRIAGED' | 'ASSIGNED' | 'UNDER_REVIEW' | 'CORROBORATED' | 'CLOSED_UNFOUNDED';
  urgencyScore: 'CRITICAL_IMMEDIATE' | 'ELEVATED' | 'ROUTINE' | 'LOW';
  aiTriageAnalysis?: string;
  reviewedBy?: string;
  investigatorNotes?: string;
  encryptionBadge: string;
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  actorRole: UserRole;
  actorIdentifier: string;
  actionType: 
    | 'CASE_VIEW' 
    | 'CASE_UPDATE' 
    | 'MISSION_STATUS_CHANGE' 
    | 'CHECKLIST_TOGGLE' 
    | 'TIP_SUBMITTED' 
    | 'TIP_TRIAGED' 
    | 'AI_ANALYSIS_REQUEST' 
    | 'VERIFICATION_AUDIT' 
    | 'SECURITY_LOGIN' 
    | 'RECORD_EXPUNGEMENT_REQUEST';
  targetReference: string;
  details: string;
  ipMasked: string;
  digitalSignature: string;
}

export interface PartnerAgency {
  id: string;
  code: string;
  name: string;
  headquarters: string;
  jurisdictionScope: string;
  badgeEmblem: string;
  focalPoint: string;
  emergencyDesk: string;
  mlatStatus: 'ACTIVE_TREATY' | 'BILATERAL_LIAISON' | 'OBSERVER_STATUS';
  activeSharedMissions: number;
}
