import { WantedPerson, Mission, TipSubmission, PartnerAgency, AuditLogEntry } from '../types';

export const INITIAL_AGENCIES: PartnerAgency[] = [
  {
    id: 'ag-interpol',
    code: 'INTERPOL-FIS',
    name: 'INTERPOL Fugitive Investigative Support Unit',
    headquarters: 'Lyon, France',
    jurisdictionScope: 'Global (196 Member Countries)',
    badgeEmblem: '🌐',
    focalPoint: 'Command & Coordination Centre (CCC)',
    emergencyDesk: '+33 4 72 44 70 00',
    mlatStatus: 'ACTIVE_TREATY',
    activeSharedMissions: 18
  },
  {
    id: 'ag-europol',
    code: 'EUROPOL-FAST',
    name: 'Europol European Fugitive Active Search Teams',
    headquarters: 'The Hague, Netherlands',
    jurisdictionScope: 'European Union & Strategic Partner States',
    badgeEmblem: '🛡️',
    focalPoint: 'Operational & Analytical Centre (OAC)',
    emergencyDesk: '+31 70 302 5000',
    mlatStatus: 'ACTIVE_TREATY',
    activeSharedMissions: 14
  },
  {
    id: 'ag-fbi',
    code: 'FBI-VCAC',
    name: 'Federal Bureau of Investigation - Transnational Violent Crime',
    headquarters: 'Washington, D.C., United States',
    jurisdictionScope: 'United States & Overseas Legal Attachés',
    badgeEmblem: '🦅',
    focalPoint: 'Strategic Information and Operations Center (SIOC)',
    emergencyDesk: '+1 202-324-3000',
    mlatStatus: 'ACTIVE_TREATY',
    activeSharedMissions: 9
  },
  {
    id: 'ag-rcmp',
    code: 'RCMP-O-DIV',
    name: 'Royal Canadian Mounted Police - Fugitive Apprehension',
    headquarters: 'Ottawa, Canada',
    jurisdictionScope: 'Canada & North American Bilateral Accord',
    badgeEmblem: '🍁',
    focalPoint: 'National Operations Centre',
    emergencyDesk: '+1 613-993-7267',
    mlatStatus: 'BILATERAL_LIAISON',
    activeSharedMissions: 6
  },
  {
    id: 'ag-bka',
    code: 'BKA-ZI',
    name: 'Bundeskriminalamt - Targeted Fugitive Search (Zi 35)',
    headquarters: 'Wiesbaden, Germany',
    jurisdictionScope: 'Federal Republic of Germany & Schengen Zone',
    badgeEmblem: '⚖️',
    focalPoint: 'Zi 35 FAST Desk',
    emergencyDesk: '+49 611 55-0',
    mlatStatus: 'ACTIVE_TREATY',
    activeSharedMissions: 11
  },
  {
    id: 'ag-tmpd',
    code: 'TMPD-INT',
    name: 'Tokyo Metropolitan Police - International Criminal Investigation',
    headquarters: 'Tokyo, Japan',
    jurisdictionScope: 'Japan & East Asia Police Cooperation Network',
    badgeEmblem: '🌸',
    focalPoint: 'International Affairs Division',
    emergencyDesk: '+81 3-3581-4321',
    mlatStatus: 'BILATERAL_LIAISON',
    activeSharedMissions: 4
  }
];

export const INITIAL_WANTED: WantedPerson[] = [
  {
    id: 'wp-001',
    caseNumber: 'INT-2026-RN-9941',
    name: 'Elena Rostova',
    primaryAlias: 'The Cyber Architect',
    verifiedAliases: ['Elena M. Voronova', 'Alina S. Kross', 'Nika Vance'],
    photoUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80',
    photoAuthorizedNotice: 'Official Publication Authorized under Interpol Red Notice Resolution AG-2026-RES-04',
    issuingAuthority: 'INTERPOL General Secretariat / Europol European Cybercrime Centre',
    jurisdiction: 'Transnational (EU / North America)',
    countryCode: 'EU',
    warrantCategory: 'CYBER_ESPIONAGE',
    chargesSummary: 'Orchestrating multi-million dollar critical infrastructure ransomware syndicate and international financial laundering.',
    officialChargesList: [
      'Conspiracy to Commit Computer Intrusions (18 U.S.C. § 371)',
      'Extortion Related to Critical Public Utility Infrastructures',
      'Aggravated Transnational Money Laundering (Directive (EU) 2018/1673)',
      'Unlawful Interception of State Telecommunications Data'
    ],
    status: 'ACTIVE',
    priority: 'CRITICAL',
    datePublished: '2026-02-14',
    dateLastVerified: '2026-10-02',
    verificationStatus: 'INTERPOL_RED_NOTICE',
    presumptionOfInnocenceNotice: 'LEGAL NOTICE: The individual listed above is officially sought under an active judicial warrant. Under international and constitutional law, every person accused of any crime is strictly presumed innocent until proven guilty in a court of law.',
    sourceReliabilityCode: 'A1 - Completely Reliable / Official Judicial Warrant Confirmed',
    physical: {
      gender: 'Female',
      ageApprox: '34 (Born Oct 1991)',
      height: '172 cm (5 ft 8 in)',
      weight: '61 kg (135 lbs)',
      hairColor: 'Dark Chestnut / Frequently dyed blonde',
      eyeColor: 'Green / Hazel',
      distinguishingFeatures: ['Geometric constellation tattoo on right collarbone', 'Small surgical scar below left eyebrow'],
      languagesSpoken: ['English (Fluent)', 'Russian (Native)', 'German (Conversational)'],
      nationalities: ['Estonian / Cross-border dual claim']
    },
    timeline: [
      {
        id: 'tl-101',
        date: '2025-11-20',
        title: 'Judicial Indictment Issued',
        description: 'Joint High Court grand jury sealed indictment returned in District Court.',
        location: 'The Hague, Netherlands',
        verifiedBy: 'Magistrate Court Chamber 4',
        evidenceRef: 'DOC-NL-2025-882'
      },
      {
        id: 'tl-102',
        date: '2026-02-14',
        title: 'INTERPOL Red Notice Published',
        description: 'Worldwide law enforcement alert published following judicial validation.',
        location: 'Lyon, France',
        verifiedBy: 'INTERPOL Notice Quality Control Desk',
        evidenceRef: 'RN-2026-9941'
      },
      {
        id: 'tl-103',
        date: '2026-09-18',
        title: 'Verified Transit Log Sighted',
        description: 'Biometric passenger manifest match recorded at regional maritime terminal.',
        location: 'Baltic Sea Transit Corridor',
        verifiedBy: 'Border Police Tactical Group',
        evidenceRef: 'SEC-LOG-2026-551'
      }
    ],
    authorizedMacroLocation: {
      region: 'Baltic Maritime Corridor & North-East Europe',
      country: 'Estonia / International Waters',
      coordinatesApprox: [59.437, 24.753],
      lastKnownOfficialRegion: 'Baltic Transit Hub (Macro-area only)'
    },
    bountyReward: '€250,000 Authorized State Cooperation Compensation',
    disclaimer: 'DO NOT ATTEMPT APPREHENSION. Highly specialized technical evasion capabilities.'
  },
  {
    id: 'wp-002',
    caseNumber: 'EUP-2026-FAST-4108',
    name: 'Marco Aurelio Bianchi',
    primaryAlias: 'Il Falco',
    verifiedAliases: ['Marcus Weiss', 'Antonio Del Vecchio', 'Marco Sanna'],
    photoUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80',
    photoAuthorizedNotice: 'Authorized under European Arrest Warrant ref EAW-IT-2025-7791-EUP',
    issuingAuthority: 'Guardia di Finanza (Italy) & Europol FAST Network',
    jurisdiction: 'Southern & Western Europe',
    countryCode: 'IT',
    warrantCategory: 'TRANSNATIONAL_ORGANIZED',
    chargesSummary: 'Trans-Mediterranean narcotics trafficking, organized syndicate leadership, and clandestine logistics network.',
    officialChargesList: [
      'Mafia Association and Transnational Syndicate Management (Art. 416-bis c.p.)',
      'Large-Scale Maritime Controlled Substance Smuggling',
      'Corrupt Acquisition of Commercial Freight Documentation',
      'Illegal Possession of Prohibited Weaponry'
    ],
    status: 'ACTIVE',
    priority: 'CRITICAL',
    datePublished: '2026-01-10',
    dateLastVerified: '2026-10-01',
    verificationStatus: 'JUDICIAL_ORDER_VERIFIED',
    presumptionOfInnocenceNotice: 'LEGAL NOTICE: Subject to European Arrest Warrant. Presumption of innocence guaranteed pursuant to Directive (EU) 2016/343.',
    sourceReliabilityCode: 'A1 - Official Judicial Warrant Confirmed',
    physical: {
      gender: 'Male',
      ageApprox: '48 (Born Mar 1978)',
      height: '185 cm (6 ft 1 in)',
      weight: '88 kg (194 lbs)',
      hairColor: 'Salt and Pepper / Receding hairline',
      eyeColor: 'Dark Brown',
      distinguishingFeatures: ['Anchor tattoo on left forearm', 'Noticeable limp on right leg from prior injury'],
      languagesSpoken: ['Italian (Native)', 'Spanish (Fluent)', 'French (Conversational)'],
      nationalities: ['Italian']
    },
    timeline: [
      {
        id: 'tl-201',
        date: '2025-10-04',
        title: 'Maritime Interception and Seizure',
        description: 'Naval vessel intercepted commercial vessel carrying illicit cargo.',
        location: 'Tyrrhenian Sea',
        verifiedBy: 'Guardia di Finanza Naval Air Command',
        evidenceRef: 'EVD-GDF-9912'
      },
      {
        id: 'tl-202',
        date: '2026-01-10',
        title: 'European Arrest Warrant Entry',
        description: 'EAW uploaded to Schengen Information System (SIS II).',
        location: 'Rome, Italy',
        verifiedBy: 'Ministry of Justice Fugitive Desk',
        evidenceRef: 'EAW-IT-2025-7791'
      }
    ],
    authorizedMacroLocation: {
      region: 'Western Mediterranean Coastal Perimeter',
      country: 'Spain / Italy (Maritime Basin)',
      coordinatesApprox: [39.569, 2.650],
      lastKnownOfficialRegion: 'Western Mediterranean (Macro-area only)'
    },
    bountyReward: '€500,000 Ministry Authorized Recovery Fund',
    disclaimer: 'CAUTION: Considered armed and escorted by tactical security.'
  },
  {
    id: 'wp-003',
    caseNumber: 'FBI-2026-WNT-1102',
    name: 'Tariq Al-Mansoor',
    primaryAlias: 'The Broker',
    verifiedAliases: ['Tariq Mansoor', 'T. M. Al-Otaibi', 'George Raymond'],
    photoUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80',
    photoAuthorizedNotice: 'Published in accordance with 28 C.F.R. § 0.85 & Federal Court Order 26-CR-0012',
    issuingAuthority: 'Federal Bureau of Investigation & FinCEN Taskforce',
    jurisdiction: 'North America / Middle East Financial Centers',
    countryCode: 'US',
    warrantCategory: 'FINANCIAL_FRAUD',
    chargesSummary: 'Multi-jurisdictional shell banking conspiracy, $400M sovereign asset diversion, and wire fraud.',
    officialChargesList: [
      'Wire Fraud Affecting Financial Institutions (18 U.S.C. § 1343)',
      'Bank Fraud and False Loan Documents (18 U.S.C. § 1344)',
      'Conspiracy to Launder Monetary Instruments (18 U.S.C. § 1956)',
      'Securities Fraud (15 U.S.C. § 78j(b))'
    ],
    status: 'ACTIVE',
    priority: 'HIGH',
    datePublished: '2026-03-01',
    dateLastVerified: '2026-09-29',
    verificationStatus: 'JUDICIAL_ORDER_VERIFIED',
    presumptionOfInnocenceNotice: 'LEGAL NOTICE: A criminal complaint is an accusation. The defendant is presumed innocent unless and until proven guilty in a court of law.',
    sourceReliabilityCode: 'B1 - Reliable Source / Documented Financial Subpoenas',
    physical: {
      gender: 'Male',
      ageApprox: '52 (Born Jun 1974)',
      height: '178 cm (5 ft 10 in)',
      weight: '82 kg (180 lbs)',
      hairColor: 'Black / Slightly greying temples',
      eyeColor: 'Brown',
      distinguishingFeatures: ['Wears designer gold-rimmed prescription glasses', 'Distinctive birthmark on upper neck behind right ear'],
      languagesSpoken: ['Arabic (Native)', 'English (Fluent)', 'French (Fluent)'],
      nationalities: ['Lebanese / International Travel Documents']
    },
    timeline: [
      {
        id: 'tl-301',
        date: '2026-02-18',
        title: 'Federal Grand Jury Indictment',
        description: 'Southern District of New York returned sealed indictment for wire fraud.',
        location: 'New York, USA',
        verifiedBy: 'U.S. Attorney Office SDNY',
        evidenceRef: 'DOC-SDNY-26-CR-12'
      },
      {
        id: 'tl-302',
        date: '2026-03-01',
        title: 'Public Release of Case Warrant',
        description: 'Public notice authorized following asset freeze order in 6 countries.',
        location: 'Washington D.C., USA',
        verifiedBy: 'FBI Financial Crimes Section',
        evidenceRef: 'FBI-FC-2026-44'
      }
    ],
    authorizedMacroLocation: {
      region: 'Arabian Gulf / Levant Financial Corridor',
      country: 'United Arab Emirates / Regional Transit',
      coordinatesApprox: [25.204, 55.270],
      lastKnownOfficialRegion: 'Gulf Aviation Hub (Macro-area only)'
    },
    bountyReward: '$1,000,000 Department of State Rewards for Justice',
    disclaimer: 'Subject utilizes sophisticated financial aliases and private air charter.'
  },
  {
    id: 'wp-004',
    caseNumber: 'BKA-2026-FED-7820',
    name: 'Lukas Heinrich Vogel',
    primaryAlias: 'Specter',
    verifiedAliases: ['Lukas V. Bergmann', 'Carl Vogel', 'Hendrik Vos'],
    photoUrl: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=600&q=80',
    photoAuthorizedNotice: 'Public search authorized under German Code of Criminal Procedure § 131a StPO',
    issuingAuthority: 'Bundeskriminalamt & Generalbundesanwalt beim BGH',
    jurisdiction: 'Central Europe (DACH Region)',
    countryCode: 'DE',
    warrantCategory: 'VIOLENT_CRIME',
    chargesSummary: 'Armed logistics robbery of federal armored transport, high-explosive ordnance theft, and evasion.',
    officialChargesList: [
      'Aggravated Armed Robbery with Explosives (§ 250 StGB)',
      'Membership in a Criminal Organization (§ 129 StGB)',
      'Unlawful Possession of Military Grade War Weapons (KrWaffKontrG)',
      'Dangerous Endangerment of Public Rail Infrastructure'
    ],
    status: 'ACTIVE',
    priority: 'CRITICAL',
    datePublished: '2026-04-12',
    dateLastVerified: '2026-10-03',
    verificationStatus: 'MINISTRY_VALIDATED',
    presumptionOfInnocenceNotice: 'LEGAL NOTICE: Under § 131a StPO, search warrants are published for public safety. Full presumption of innocence applies pending trial.',
    sourceReliabilityCode: 'A1 - Completely Reliable / Verified Physical Ballistics',
    physical: {
      gender: 'Male',
      ageApprox: '41 (Born Dec 1984)',
      height: '188 cm (6 ft 2 in)',
      weight: '94 kg (207 lbs)',
      hairColor: 'Blonde / Short cropped',
      eyeColor: 'Blue',
      distinguishingFeatures: ['Extensive sleeve tattoo with Nordic runes on right arm', 'Scar across knuckle of left hand'],
      languagesSpoken: ['German (Native)', 'Dutch (Good)', 'English (Fluent)'],
      nationalities: ['German']
    },
    timeline: [
      {
        id: 'tl-401',
        date: '2026-04-11',
        title: 'Armored Rail Incident',
        description: 'Coordinated heist intercepted at freight terminal near Frankfurt.',
        location: 'Hesse, Germany',
        verifiedBy: 'Federal Police Tactical Division',
        evidenceRef: 'BKA-EVD-9941'
      },
      {
        id: 'tl-402',
        date: '2026-04-12',
        title: 'Federal Search Order Issued',
        description: 'Public warrant authorized by Federal Court of Justice judge in Karlsruhe.',
        location: 'Karlsruhe, Germany',
        verifiedBy: 'Generalbundesanwalt',
        evidenceRef: 'BGH-ORD-2026-109'
      }
    ],
    authorizedMacroLocation: {
      region: 'Rhineland-Palatinate / Ardennes Forest Border Region',
      country: 'Germany / Belgium Border',
      coordinatesApprox: [50.110, 8.682],
      lastKnownOfficialRegion: 'Upper Rhine Valley (Macro-area only)'
    },
    bountyReward: '€100,000 State Police Bounty Authorization',
    disclaimer: 'EXTREMELY DANGEROUS: Suspect possesses military training. Call 110/112 immediately.'
  },
  {
    id: 'wp-005',
    caseNumber: 'RCMP-2026-CAN-0341',
    name: 'Camille Simone Laurent',
    primaryAlias: 'The Cargo Mirage',
    verifiedAliases: ['Simone Leclerc', 'Camille Tremblay', 'Claire Moreau'],
    photoUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=600&q=80',
    photoAuthorizedNotice: 'Authorized pursuant to Canadian Criminal Code Warrant Section 507',
    issuingAuthority: 'Royal Canadian Mounted Police & Canada Border Services Agency',
    jurisdiction: 'North America / Atlantic Seaboard',
    countryCode: 'CA',
    warrantCategory: 'TRAFFICKING',
    chargesSummary: 'Transnational container freight trafficking and counterfeit maritime customs clearance operation.',
    officialChargesList: [
      'Export and Import of Prohibited Substances (CDSA Sec. 6(1))',
      'Conspiracy to Commit Forgery of Commercial Manifests (CC Sec. 465(1))',
      'Laundering Proceeds of Crime (CC Sec. 462.31)'
    ],
    status: 'ACTIVE',
    priority: 'HIGH',
    datePublished: '2026-05-19',
    dateLastVerified: '2026-09-25',
    verificationStatus: 'JUDICIAL_ORDER_VERIFIED',
    presumptionOfInnocenceNotice: 'LEGAL NOTICE: Innocent until proven guilty according to Section 11(d) of the Canadian Charter of Rights and Freedoms.',
    sourceReliabilityCode: 'B2 - Highly Reliable Maritime Agency Intelligence',
    physical: {
      gender: 'Female',
      ageApprox: '38 (Born Aug 1988)',
      height: '168 cm (5 ft 6 in)',
      weight: '58 kg (128 lbs)',
      hairColor: 'Auburn / Reddish-Brown',
      eyeColor: 'Hazel',
      distinguishingFeatures: ['Small mole above right upper lip', 'Wears high-grade maritime chronometer'],
      languagesSpoken: ['French (Native)', 'English (Bilingual)'],
      nationalities: ['Canadian', 'French']
    },
    timeline: [
      {
        id: 'tl-501',
        date: '2026-05-18',
        title: 'Customs Warehouse Interdiction',
        description: 'Port of Montreal border audit identified 14 modified shipping containers.',
        location: 'Montreal, QC, Canada',
        verifiedBy: 'CBSA Intelligence Directorate',
        evidenceRef: 'CBSA-INT-2026-904'
      }
    ],
    authorizedMacroLocation: {
      region: 'Saint Lawrence River Maritime Basin & Atlantic Ports',
      country: 'Canada (Quebec & Maritime Provinces)',
      coordinatesApprox: [45.501, -73.567],
      lastKnownOfficialRegion: 'Greater Montreal Shipping Area (Macro-area only)'
    },
    bountyReward: '$50,000 CAD RCMP Public Assistance Fund',
    disclaimer: 'Do not interfere with shipping personnel. Relay all sightings to RCMP National Desk.'
  },
  {
    id: 'wp-006',
    caseNumber: 'TMPD-2026-JPN-8891',
    name: 'Kenji Takahashi',
    primaryAlias: 'Silver Blade',
    verifiedAliases: ['Kenji Sato', 'Ken Takahashi', 'T. Ken'],
    photoUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=600&q=80',
    photoAuthorizedNotice: 'Authorized by Tokyo District Court Special Warrant Section 199',
    issuingAuthority: 'Tokyo Metropolitan Police & National Police Agency Japan',
    jurisdiction: 'East Asia / Pacific Rim',
    countryCode: 'JP',
    warrantCategory: 'TRANSNATIONAL_ORGANIZED',
    chargesSummary: 'International illicit cryptocurrency extortion, port extortion, and racketeering.',
    officialChargesList: [
      'Organized Crime Punishment Act Violation (Article 3)',
      'Extortion and Coercion through Telecommunications (Penal Code Art. 249)',
      'Unlawful Concealment of Criminal Assets in Digital Ledger'
    ],
    status: 'LOCATED',
    priority: 'MEDIUM',
    datePublished: '2026-01-22',
    dateLastVerified: '2026-10-04',
    verificationStatus: 'JUDICIAL_ORDER_VERIFIED',
    presumptionOfInnocenceNotice: 'LEGAL NOTICE: Under Japanese Code of Criminal Procedure, all suspects retain full presumption of innocence until adjudicated.',
    sourceReliabilityCode: 'A1 - Confirmed by Official Joint Police Taskforce',
    physical: {
      gender: 'Male',
      ageApprox: '45 (Born Feb 1981)',
      height: '175 cm (5 ft 9 in)',
      weight: '73 kg (160 lbs)',
      hairColor: 'Black / Slicked back',
      eyeColor: 'Dark Brown',
      distinguishingFeatures: ['Dragon irezumi shoulder tattoo', 'Index finger on left hand has partial scar'],
      languagesSpoken: ['Japanese (Native)', 'Mandarin (Conversational)', 'English (Basic)'],
      nationalities: ['Japanese']
    },
    timeline: [
      {
        id: 'tl-601',
        date: '2026-09-30',
        title: 'Diplomatic Extradition Request Filed',
        description: 'Formal bilateral treaty package submitted to overseas consulate.',
        location: 'Tokyo, Japan',
        verifiedBy: 'Ministry of Foreign Affairs Legal Liaison',
        evidenceRef: 'MOFA-EXT-2026-31'
      }
    ],
    authorizedMacroLocation: {
      region: 'Southeast Asia Regional Logistics Zone',
      country: 'Regional Treaty Area',
      coordinatesApprox: [13.756, 100.501],
      lastKnownOfficialRegion: 'Metropolitan Transit Zone (Macro-area only)'
    },
    bountyReward: '¥3,000,000 National Police Agency Public Cooperation Fund',
    disclaimer: 'CURRENT STATUS: Subject currently undergoing judicial extradition proceedings.'
  }
];

export const INITIAL_MISSIONS: Mission[] = [
  {
    id: 'ms-001',
    caseId: 'wp-001',
    missionCode: 'MISSION-AEGIS-CYBER-01',
    objective: 'Locate, verify, and dismantle command nodes associated with the transnational ransomware logistics hub.',
    priority: 'CRITICAL',
    jurisdiction: 'Transnational (EU / North America)',
    assignedAgency: 'INTERPOL-FIS & Europol-EC3',
    assignedTeam: 'Joint Cyber Fugitive Taskforce Alpha',
    leadOfficer: 'Inspector Sophie Van Der Meer',
    status: 'ACTIVE',
    evidenceRefs: [
      {
        id: 'ev-01',
        type: 'WARRANT',
        title: 'Interpol Red Notice Resolution RN-2026-9941',
        documentNumber: 'AG-2026-RES-04',
        custodianAgency: 'INTERPOL General Secretariat',
        dateFiled: '2026-02-14',
        summary: 'Official international wanted circular endorsed by 196 member countries.',
        classificationLevel: 'PUBLIC_RELEASABLE'
      },
      {
        id: 'ev-02',
        type: 'MANIFEST',
        title: 'Baltic Sea Passenger Ferry Manifest Audit',
        documentNumber: 'FERRY-BALT-992',
        custodianAgency: 'Estonian Border Police',
        dateFiled: '2026-09-18',
        summary: 'Secondary alias passenger registration identified on maritime route.',
        classificationLevel: 'LAW_ENFORCEMENT_SENSITIVE'
      },
      {
        id: 'ev-03',
        type: 'FINANCIAL_RECORD',
        title: 'Cryptographic Ledger Tracking Subpoena Response',
        documentNumber: 'SUB-2026-FIN-401',
        custodianAgency: 'Europol Financial Intelligence Unit',
        dateFiled: '2026-08-11',
        summary: 'Traced $12M ransom payout dispersion through multi-chain mixers.',
        classificationLevel: 'RESTRICTED'
      }
    ],
    timeline: [
      {
        id: 'mt-01',
        date: '2026-02-15',
        title: 'Mission Initialized under Joint Protocol',
        description: 'Liaison officers assigned from France, Germany, and Netherlands.',
        location: 'The Hague, Netherlands',
        verifiedBy: 'Lead Inspector S. Van Der Meer'
      },
      {
        id: 'mt-02',
        date: '2026-07-22',
        title: 'Server Infrastructure Seized in Zurich',
        description: 'Two secondary relay servers captured by Swiss Federal Police.',
        location: 'Zurich, Switzerland',
        verifiedBy: 'Fedpol Cyber Desk'
      },
      {
        id: 'mt-03',
        date: '2026-09-20',
        title: 'Public Safety Sighting Report Received',
        description: 'Anonymous encrypted tip submitted via SENTINEL portal #TIP-2026-1049.',
        location: 'Stockholm Port Hub',
        verifiedBy: 'Triage Analyst #48'
      }
    ],
    actionChecklist: [
      {
        id: 'ck-01',
        label: 'Audit Schengen Information System (SIS II) automated hits',
        completed: true,
        assignedTo: 'Officer M. Lind',
        completedAt: '2026-09-22',
        notes: 'Updated biometrics synced across all Schengen border e-gates.'
      },
      {
        id: 'ck-02',
        label: 'Cross-reference port manifest data with encrypted maritime tip #TIP-2026-1049',
        completed: true,
        assignedTo: 'Inspector S. Van Der Meer',
        completedAt: '2026-09-28',
        notes: 'Tip corroborated partial alias match on ferry passenger log.'
      },
      {
        id: 'ck-03',
        label: 'Execute Mutual Legal Assistance (MLAT) request for Scandinavian cloud hosting provider',
        completed: false,
        assignedTo: 'Crown Prosecutor Liaison',
        notes: 'Pending final magistrate signature.'
      },
      {
        id: 'ck-04',
        label: 'Review public safety warning updates with press office',
        completed: false,
        assignedTo: 'Public Information Officer'
      }
    ],
    confidentialNotes: [
      {
        id: 'cn-01',
        author: 'Lead Inspector Sophie Van Der Meer',
        role: 'LEAD_DETECTIVE',
        timestamp: '2026-09-28 14:32:00',
        content: 'Corroborated Tip #TIP-2026-1049 indicates subject may be preparing to change maritime travel mode. Surveillance strictly restricted to public transport cameras in accordance with warrant scope.'
      }
    ]
  },
  {
    id: 'ms-002',
    caseId: 'wp-002',
    missionCode: 'MISSION-MED-FALCO-02',
    objective: 'Intercept maritime supply corridor and coordinate safe port apprehension of Marco Aurelio Bianchi.',
    priority: 'CRITICAL',
    jurisdiction: 'Southern & Western Europe',
    assignedAgency: 'Guardia di Finanza & Europol-FAST',
    assignedTeam: 'FAST Tactical Team Mediterranean',
    leadOfficer: 'Col. Roberto De Luca',
    status: 'ACTIVE',
    evidenceRefs: [
      {
        id: 'ev-21',
        type: 'WARRANT',
        title: 'European Arrest Warrant EAW-IT-2025-7791',
        documentNumber: 'EAW-7791-EUP',
        custodianAgency: 'Court of Appeal of Naples',
        dateFiled: '2026-01-10',
        summary: 'Executive order for extradition across all EU member states.',
        classificationLevel: 'PUBLIC_RELEASABLE'
      },
      {
        id: 'ev-22',
        type: 'SURVEILLANCE_IMAGE',
        title: 'Marina Fuel Dock Authorized CCTV Still',
        documentNumber: 'CCTV-MAR-4481',
        custodianAgency: 'Guardia di Finanza Maritime Division',
        dateFiled: '2026-09-12',
        summary: 'Vessel registered under charter alias refueled in Balearic waters.',
        classificationLevel: 'LAW_ENFORCEMENT_SENSITIVE'
      }
    ],
    timeline: [
      {
        id: 'mt-21',
        date: '2026-01-15',
        title: 'FAST Case Opened',
        description: 'Multi-agency operational group constituted across Italy, France, and Spain.',
        location: 'Rome, Italy',
        verifiedBy: 'Col. R. De Luca'
      }
    ],
    actionChecklist: [
      {
        id: 'ck-21',
        label: 'Inspect commercial vessel register for yacht "Stella Maris II"',
        completed: true,
        assignedTo: 'Lt. F. Romano',
        completedAt: '2026-09-25'
      },
      {
        id: 'ck-22',
        label: 'Coordinate with Spanish Guardia Civil Maritime Service',
        completed: false,
        assignedTo: 'Col. R. De Luca',
        notes: 'Coordinated patrol scheduled for Balearic perimeter.'
      }
    ],
    confidentialNotes: [
      {
        id: 'cn-21',
        author: 'Col. Roberto De Luca',
        role: 'AGENCY_SUPERVISOR',
        timestamp: '2026-09-30 09:15:00',
        content: 'Public tip received regarding a sighting in Palma marina. Verified non-violent sighting. Remind public through local channels not to engage.'
      }
    ]
  },
  {
    id: 'ms-003',
    caseId: 'wp-004',
    missionCode: 'MISSION-RHINE-SPECTER-03',
    objective: 'Coordinate cross-border perimeter checkpoints and safely secure public transport hubs.',
    priority: 'CRITICAL',
    jurisdiction: 'Central Europe (Germany / France / Benelux)',
    assignedAgency: 'Bundeskriminalamt Zi 35',
    assignedTeam: 'FAST Germany Special Taskforce',
    leadOfficer: 'Chief Superintendent Hans Richter',
    status: 'ACTIVE',
    evidenceRefs: [
      {
        id: 'ev-31',
        type: 'WARRANT',
        title: 'Federal Search Order BGH-ORD-2026-109',
        documentNumber: 'BGH-ORD-109',
        custodianAgency: 'Generalbundesanwalt',
        dateFiled: '2026-04-12',
        summary: 'Public warrant under § 131a StPO.',
        classificationLevel: 'PUBLIC_RELEASABLE'
      }
    ],
    timeline: [
      {
        id: 'mt-31',
        date: '2026-04-15',
        title: 'National Warning Disseminated',
        description: 'Public broadcast across German news networks with safety warning.',
        location: 'Wiesbaden, Germany',
        verifiedBy: 'BKA Press Office'
      }
    ],
    actionChecklist: [
      {
        id: 'ck-31',
        label: 'Deploy tactical warnings to all rail and bus transit security hubs',
        completed: true,
        assignedTo: 'Supt. H. Richter',
        completedAt: '2026-04-16'
      },
      {
        id: 'ck-32',
        label: 'Verify forensic ballistic matches from recovered weapon casing',
        completed: true,
        assignedTo: 'Forensic Lab Wiesbaden',
        completedAt: '2026-05-02'
      },
      {
        id: 'ck-33',
        label: 'Daily triage of public hotline and SENTINEL portal submissions',
        completed: false,
        assignedTo: 'Desk Officer Mueller'
      }
    ],
    confidentialNotes: []
  },
  {
    id: 'ms-004',
    caseId: 'wp-006',
    missionCode: 'MISSION-SAKURA-EXTRADITION-04',
    objective: 'Execute lawful court-supervised extradition protocol under bilateral treaty.',
    priority: 'MEDIUM',
    jurisdiction: 'East Asia',
    assignedAgency: 'TMPD-INT & Regional Ministry',
    assignedTeam: 'Tokyo Extradition Bureau',
    leadOfficer: 'Captain Kenzo Mori',
    status: 'REVIEW',
    evidenceRefs: [
      {
        id: 'ev-41',
        type: 'WARRANT',
        title: 'Tokyo District Court Warrant #199-A',
        documentNumber: 'TDC-W-199-A',
        custodianAgency: 'Tokyo District Court',
        dateFiled: '2026-01-20',
        summary: 'Authorized detention for cross-border cyber extortion.',
        classificationLevel: 'PUBLIC_RELEASABLE'
      }
    ],
    timeline: [
      {
        id: 'mt-41',
        date: '2026-09-30',
        title: 'Fugitive Located in Regional Port City',
        description: 'Subject detained peacefully by local partner authorities upon passport presentation.',
        location: 'Bangkok, Thailand',
        verifiedBy: 'Liaison Officer Capt. Mori'
      }
    ],
    actionChecklist: [
      {
        id: 'ck-41',
        label: 'Present formal diplomatic extradition packet to host Ministry of Justice',
        completed: true,
        assignedTo: 'Capt. Mori',
        completedAt: '2026-10-02'
      },
      {
        id: 'ck-42',
        label: 'Ensure consular access and medical evaluation',
        completed: true,
        assignedTo: 'Consular General Section',
        completedAt: '2026-10-03'
      },
      {
        id: 'ck-43',
        label: 'Finalize safe repatriation flight schedule with authorized air marshals',
        completed: false,
        assignedTo: 'Air Escort Division'
      }
    ],
    confidentialNotes: [
      {
        id: 'cn-41',
        author: 'Captain Kenzo Mori',
        role: 'LEAD_DETECTIVE',
        timestamp: '2026-10-03 11:20:00',
        content: 'Subject is in safe custody. Human rights monitor present. Scheduled for judicial transfer hearing on Oct 12.'
      }
    ]
  }
];

export const INITIAL_TIPS: TipSubmission[] = [
  {
    id: 'TIP-2026-1049',
    timestamp: '2026-09-20 18:42:15',
    caseId: 'wp-001',
    caseName: 'Elena Rostova',
    isAnonymous: true,
    locationReported: 'Stockholm Port Terminal, Pier 4, Sweden',
    sightingDate: '2026-09-19',
    details: 'Observed a woman matching the height and facial structure of Elena Rostova entering the automated business lounge at the ferry terminal. She was wearing dark sunglasses and spoke fluent German on a handheld satellite phone. She carried a metallic briefcase with Swedish corporate tags.',
    attachments: [
      {
        name: 'terminal_exterior_timestamp.jpg',
        type: 'image/jpeg',
        size: '2.4 MB',
        simulatedHash: 'sha256:8f43a9b1c5e93348102f...c3'
      }
    ],
    status: 'CORROBORATED',
    urgencyScore: 'ELEVATED',
    aiTriageAnalysis: 'High geographical relevance. Sighting coordinates correspond with Baltic maritime corridor timeline. Actionable lead score: 84/100.',
    reviewedBy: 'Inspector S. Van Der Meer',
    investigatorNotes: 'Cross-checked with port passenger log. Match found with secondary alias Alina S. Kross. Added to Mission action items.',
    encryptionBadge: 'End-to-End Encrypted (AES-256-GCM / Client-side Hash)'
  },
  {
    id: 'TIP-2026-1088',
    timestamp: '2026-09-30 08:14:02',
    caseId: 'wp-002',
    caseName: 'Marco Aurelio Bianchi',
    isAnonymous: false,
    informantName: 'Authorized Marine Fuel Technician (Confidential ID)',
    informantContact: 'Protected under Whistleblower Protocol Art. 12',
    locationReported: 'Palma Marina Private Pier, Mallorca, Spain',
    sightingDate: '2026-09-29',
    details: 'During regular fueling operations, a 45-foot yacht named "Stella Maris" berthed for offshore bunkering. A male subject with an anchor tattoo on his left forearm and a distinct limp gave cash payment for 800 liters of marine diesel.',
    attachments: [
      {
        name: 'fuel_invoice_receipt_scan.pdf',
        type: 'application/pdf',
        size: '840 KB',
        simulatedHash: 'sha256:3a1b9c7d4e5f6a7b8c...90'
      }
    ],
    status: 'UNDER_REVIEW',
    urgencyScore: 'CRITICAL_IMMEDIATE',
    aiTriageAnalysis: 'Urgency Critical: Physical identifiers (anchor tattoo + right limp) correlate directly with verified biometrics. Maritime vessel track plausible.',
    reviewedBy: 'Col. Roberto De Luca',
    investigatorNotes: 'Dispatched notification to Guardia Civil Maritime Command. Strict instruction: Do not initiate contact until harbor police in place.',
    encryptionBadge: 'End-to-End Encrypted (AES-256-GCM / Client-side Hash)'
  },
  {
    id: 'TIP-2026-1102',
    timestamp: '2026-10-02 21:05:40',
    caseId: 'wp-003',
    caseName: 'Tariq Al-Mansoor',
    isAnonymous: true,
    locationReported: 'Dubai International Financial Centre, Gate Building, UAE',
    sightingDate: '2026-10-01',
    details: 'Saw an individual with identical gold-rimmed glasses attending a private hedge fund summit under the name George Raymond. He appeared accompanied by private legal counsel.',
    attachments: [],
    status: 'TRIAGED',
    urgencyScore: 'ROUTINE',
    aiTriageAnalysis: 'Alias match confirmed with registered variant. Financial forum registration public record requires legal subpoena.',
    encryptionBadge: 'End-to-End Encrypted (AES-256-GCM / Client-side Hash)'
  },
  {
    id: 'TIP-2026-1120',
    timestamp: '2026-10-04 10:11:23',
    caseId: 'wp-004',
    caseName: 'Lukas Heinrich Vogel',
    isAnonymous: true,
    locationReported: 'Frankfurt Central Railway Station, Platform 9, Germany',
    sightingDate: '2026-10-04',
    details: 'Thought I saw someone who looked like Lukas Vogel near the luggage lockers this morning around 09:30. He was wearing a dark hooded jacket. I immediately stepped away and am submitting this tip as advised on the poster.',
    attachments: [],
    status: 'SUBMITTED',
    urgencyScore: 'ELEVATED',
    aiTriageAnalysis: 'High public interest case. Proximity to high-density transport hub warrants instant surveillance camera footage review by Federal Police.',
    encryptionBadge: 'End-to-End Encrypted (AES-256-GCM / Client-side Hash)'
  }
];

export const INITIAL_AUDIT_LOGS: AuditLogEntry[] = [
  {
    id: 'aud-001',
    timestamp: '2026-10-04 14:48:12',
    actorRole: 'SYSTEM_AUDITOR',
    actorIdentifier: 'AUDITOR-SEC-09',
    actionType: 'VERIFICATION_AUDIT',
    targetReference: 'INT-2026-RN-9941',
    details: 'Quarterly judicial warrant compliance audit completed. Presumption of innocence banner validated. 196 member state liaison channels active.',
    ipMasked: '192.168.10.*** (Internal Gateway)',
    digitalSignature: 'ED25519:7b3c99a0e1f...'
  },
  {
    id: 'aud-002',
    timestamp: '2026-10-04 12:15:33',
    actorRole: 'AGENCY_SUPERVISOR',
    actorIdentifier: 'SUPERVISOR-DELUCA-IT',
    actionType: 'TIP_TRIAGED',
    targetReference: 'TIP-2026-1088',
    details: 'Urgency classified as CRITICAL_IMMEDIATE. Forwarded encrypted alert to Guardia Civil Maritime Command.',
    ipMasked: '10.24.8.*** (Secure VPN)',
    digitalSignature: 'ED25519:4a98fe11b2...'
  },
  {
    id: 'aud-003',
    timestamp: '2026-10-04 10:11:25',
    actorRole: 'PUBLIC',
    actorIdentifier: 'ANON-SESSION-8841',
    actionType: 'TIP_SUBMITTED',
    targetReference: 'TIP-2026-1120',
    details: 'Public sighting submission recorded and encrypted. Automated non-vigilante safety notice acknowledged by user.',
    ipMasked: '203.0.113.*** (Public Relay)',
    digitalSignature: 'SHA256:c18b760e9f...'
  },
  {
    id: 'aud-004',
    timestamp: '2026-10-04 09:30:10',
    actorRole: 'INVESTIGATOR',
    actorIdentifier: 'INVESTIGATOR-VANDERMEER-NL',
    actionType: 'CHECKLIST_TOGGLE',
    targetReference: 'MISSION-AEGIS-CYBER-01',
    details: 'Action checklist item "Cross-reference port manifest data" marked completed with verified notes.',
    ipMasked: '172.16.4.*** (Europol Secure)',
    digitalSignature: 'ED25519:9f8e7d6c5b...'
  },
  {
    id: 'aud-005',
    timestamp: '2026-10-03 16:04:19',
    actorRole: 'LEAD_DETECTIVE',
    actorIdentifier: 'CAPT-MORI-TMPD',
    actionType: 'MISSION_STATUS_CHANGE',
    targetReference: 'MISSION-SAKURA-EXTRADITION-04',
    details: 'Mission status transitioned from INFORMATION RECEIVED to REVIEW following safe detention of subject.',
    ipMasked: '192.168.1.*** (Police Intranet)',
    digitalSignature: 'ED25519:33bbf49a01...'
  }
];
