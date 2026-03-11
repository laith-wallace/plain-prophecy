export interface ScoringRow {
  criterion: string;
  futuristPosition: string;
  sdaPosition: string;
  futuristScore: number;
  futuristClass: 'score-low' | 'score-mid' | 'score-high';
  sdaScore: number;
  sdaClass: 'score-low' | 'score-mid' | 'score-high';
}

export const scoringCriteria: ScoringRow[] = [
  {
    criterion: 'Day-Year Principle (Num 14:34; Ezek 4:6)',
    futuristPosition: 'Rejects it for most prophecies; insists on literal 7 years for Dan 9:27 and literal 1,260 days for Tribulation',
    sdaPosition: 'Explicitly mandated by two independent Scriptures (Num 14:34; Ezek 4:6). Applied consistently across Daniel and Revelation. All anchor dates historically verified.',
    futuristScore: 3, futuristClass: 'score-low',
    sdaScore: 9, sdaClass: 'score-high',
  },
  {
    criterion: "The 70th Week of Daniel (Dan 9:24–27)",
    futuristPosition: 'Inserts a 2,000+ year gap between week 69 and week 70 — no textual basis. Antichrist fulfils week 70 in the future.',
    sdaPosition: 'All 70 weeks are contiguous (457 BC–34 AD). Jesus confirms the covenant (v.27). Cross ends sacrifice. Stephen\'s stoning = 34 AD. Historically verified at every data point.',
    futuristScore: 2, futuristClass: 'score-low',
    sdaScore: 10, sdaClass: 'score-high',
  },
  {
    criterion: 'The Rapture as Distinct Event (1 Thess 4:16–17)',
    futuristPosition: 'A "secret" removal of the church — two separate returns of Christ. First secret, then public 7 years later. Pre-tribulation rapture invented by J.N. Darby c.1830.',
    sdaPosition: '1 Thess 4 describes the Second Coming — one event, visible to all (Rev 1:7). No biblical text teaches two separate returns of Christ. Paul\'s language is public and audible ("shout," "trumpet").',
    futuristScore: 2, futuristClass: 'score-low',
    sdaScore: 9, sdaClass: 'score-high',
  },
  {
    criterion: 'Identity of the "Little Horn" / Antichrist (Dan 7; 2 Thess 2)',
    futuristPosition: 'A future world political leader who rules for 7 years. Requires a rebuilt Jerusalem Temple and restored sacrificial system (implicitly denying the finality of Calvary).',
    sdaPosition: 'The "little horn" = papal Rome (also identified by Luther, Calvin, Wesley, Newton). All diagnostic markers match: speaks against God, wears out saints, changes times and law, 1,260 years of dominance.',
    futuristScore: 3, futuristClass: 'score-low',
    sdaScore: 9, sdaClass: 'score-high',
  },
  {
    criterion: 'Historical Verification of Prophetic Anchors',
    futuristPosition: 'No historical event verifies the 7-year Tribulation — it is entirely future. The Rapture is unverifiable. All timeline anchors are speculative and future.',
    sdaPosition: "Every anchor is historically verifiable: Artaxerxes' decree (457 BC), Baptism of Jesus (27 AD), Crucifixion (31 AD), Stephen (34 AD), Justinian (538), Napoleon/Pius VI (1798), 1844.",
    futuristScore: 1, futuristClass: 'score-low',
    sdaScore: 9, sdaClass: 'score-high',
  },
  {
    criterion: 'Hermeneutical Origins & Scholarly Pedigree',
    futuristPosition: 'Futurism was first developed by Jesuit priest Francisco Ribera (1590 AD) as a Counter-Reformation move to deflect Protestant identification of Rome as Antichrist. Popularised by Darby (1830s) — no patristic support.',
    sdaPosition: 'Historicism was the dominant prophetic method of the entire Reformation (Luther, Calvin, Knox, Tyndale, Newton, Wesley). It has deep patristic roots and was the consensus until the 19th century.',
    futuristScore: 2, futuristClass: 'score-low',
    sdaScore: 9, sdaClass: 'score-high',
  },
  {
    criterion: 'Internal Biblical Consistency',
    futuristPosition: 'The rebuilt Temple and restored animal sacrifices would contradict Hebrews 7–10 (Christ\'s sacrifice is final and complete). The gap theory also requires OT prophecy to have two radically different audiences.',
    sdaPosition: 'The heavenly sanctuary of Hebrews 8–9 interprets Dan 8:14. The investigative judgment ties Lev 16 (Yom Kippur), Dan 7:9–10, and Rev 14:7 into one coherent system. No internal contradictions.',
    futuristScore: 3, futuristClass: 'score-low',
    sdaScore: 9, sdaClass: 'score-high',
  },
  {
    criterion: 'Christological Centrality',
    futuristPosition: "Places heavy focus on Israel's national restoration and earthly politics. Christ's Second Coming becomes one event in a complex sequence centred on national Israel, not the cosmic lordship of Christ.",
    sdaPosition: 'Every prophetic period anchors to Christ: He is the Messiah of 457 BC, the Sacrifice of 31 AD, the High Priest of 1844, and the Coming King. The investigative judgment is His intercession, not a work of merit.',
    futuristScore: 5, futuristClass: 'score-mid',
    sdaScore: 9, sdaClass: 'score-high',
  },
  {
    criterion: 'Millennium Location (Rev 20)',
    futuristPosition: "Earthly millennium with Christ reigning in Jerusalem. Requires geographic Israel, national politics, and a Davidic earthly throne — reading Revelation's symbolic language literally.",
    sdaPosition: 'Millennium in heaven (John 14:2–3; Rev 20). Earth desolate (Jer 4:23–27). Satan bound — no one to deceive. Consistent with the state of the dead (unconscious) and conditionalist immortality.',
    futuristScore: 5, futuristClass: 'score-mid',
    sdaScore: 8, sdaClass: 'score-high',
  },
  {
    criterion: 'Application of Revelation to Real History',
    futuristPosition: 'Chapters 4–19 of Revelation have no application until the future Tribulation. The church age is essentially a prophetic blank. This renders most of Revelation irrelevant to 2,000 years of church history.',
    sdaPosition: 'Revelation speaks to real persecuted churches (1st century), through the Reformation, into the modern age. The seven churches (Rev 1–3) = seven historical eras. Seven seals, seven trumpets = church history unfolding.',
    futuristScore: 3, futuristClass: 'score-low',
    sdaScore: 8, sdaClass: 'score-high',
  },
];

export interface ScoringMethodologyItem {
  num: string;
  title: string;
  desc: string;
}

export const scoringMethodology: ScoringMethodologyItem[] = [
  {
    num: '01',
    title: 'Biblical Textual Basis',
    desc: 'Does the position have direct, explicit textual support? Proof-texts must be read in their natural grammatical and contextual sense without requiring supplementary assumptions to function.',
  },
  {
    num: '02',
    title: 'Internal Consistency',
    desc: 'Does the position hold together without requiring contradictions elsewhere in Scripture? A rebuilt Temple that reinstates animal sacrifice, for instance, contradicts Hebrews 7–10.',
  },
  {
    num: '03',
    title: 'Historical Verification',
    desc: 'Have the prophetic anchors been confirmed by independent historical sources? Dates, decrees, and events are checked against archaeology, secular chronology, and peer-reviewed scholarship.',
  },
  {
    num: '04',
    title: 'Hermeneutical Integrity',
    desc: 'Is the interpretive method applied consistently across all texts? Selective literalism (literal days for the Tribulation, symbolic language for everything else) is penalised.',
  },
  {
    num: '05',
    title: 'Scholarly & Historical Consensus',
    desc: 'How does the position fare against the weight of pre-modern exegetical tradition? The Reformation consensus, patristic writing, and academic biblical scholarship are considered.',
  },
];

export interface DeductionItem {
  label: string;
  reason: string;
}

export const sdaDeductions: DeductionItem[] = [
  {
    label: 'Day-Year Principle — 9/10 (not 10/10)',
    reason: "Numbers 14:34 and Ezekiel 4:6 provide explicit textual grounding — this is the strongest element of the Historicist case. The single point deducted reflects a genuine scholarly debate: both texts use the day-year equivalence in a specific narrative context, and some exegetes question whether they constitute a universal hermeneutical rule applicable to all apocalyptic prophetic time-periods. The principle is explicitly stated; its universal scope requires an additional inference.",
  },
  {
    label: 'Identity of the Rapture / Second Coming — 9/10 (not 10/10)',
    reason: 'The SDA position that 1 Thessalonians 4:16–17 describes a single visible Second Coming is exegetically strong (the language of "shout," "voice of the archangel," and "trump" is decidedly public). The one-point deduction acknowledges that the passage\'s grammar does not explicitly rule out a prior removal of the saints — it simply does not require one.',
  },
  {
    label: 'Historical Verification of Prophetic Anchors — 9/10 (not 10/10)',
    reason: '457 BC, 27 AD, 31 AD, 34 AD, 538 AD, 1798 AD are all historically documented with strong external evidence. However, "verified" is not the same as "unambiguous." The precise regnal-year calculation for Artaxerxes I places the decree in 457 BC using the Jewish civil calendar — not all chronologists agree. Similarly, the precise crucifixion date of 31 AD involves calendar reconstruction.',
  },
  {
    label: 'Hermeneutical Origins & Scholarly Pedigree — 9/10 (not 10/10)',
    reason: 'The Reformation consensus was strongly Historicist, and this is the dominant weight of evidence. The one-point deduction reflects that the Reformers were not monolithic in every detail — and that some Antichrist identifications were partly shaped by polemical context (anti-Rome Reformation politics). Full systematised Historicism is largely a Reformation-era development, not a first-century consensus.',
  },
  {
    label: 'Millennium Location (Rev 20) — 8/10 (not 10/10)',
    reason: 'The SDA reading that the millennium occurs in heaven is coherent with John 14:2–3 and conditionalist death. However, Revelation 20 itself does not explicitly name heaven as the location — "thrones" and "souls" are mentioned, but the geography is inferred. The earth-desolate motif (Jer 4:23–27) is strong but Jeremiah\'s immediate context was Babylonian invasion.',
  },
  {
    label: 'Application of Revelation to Real History — 8/10 (not 10/10)',
    reason: 'The identification of the seven churches as seven successive historical eras, and the seven seals and trumpets as specific historical events, is compelling. The two-point deduction reflects that some historical identifications involve more interpretive flexibility than others. Assigning specific trumpet blasts to the fall of Rome or the rise of Islam is plausible but not as tightly anchored as the 457 BC decree.',
  },
];
