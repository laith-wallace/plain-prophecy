export type BadgeType = 'fulfilled' | 'future' | 'present' | 'historical';

export interface EraBlock {
  date: string;
  badge: BadgeType;
  title: string;
  desc: string;
  refs: string;
}

export const futuristTimeline: EraBlock[] = [
  {
    date: '~4 BC–33 AD',
    badge: 'fulfilled',
    title: 'First Coming of Christ',
    desc: "Jesus ministers, dies, and ascends. 69 of Daniel's 70 weeks are fulfilled. The 70th week is then \"paused\" and deferred to the end times — a gap of 2,000+ years inserted with no explicit textual basis.",
    refs: 'Dan 9:25–26 · Matt 26–28',
  },
  {
    date: '33 AD → Now',
    badge: 'present',
    title: 'The Church Age (Gap)',
    desc: "The church is a \"parenthesis\" — a mystery entirely hidden in the OT not prophesied by Daniel. Israel's prophetic clock is stopped. All OT prophecy is on hold until the Rapture.",
    refs: 'Eph 3:3–6 · Rom 11',
  },
  {
    date: 'Future — Imminent',
    badge: 'future',
    title: 'The Rapture (Pre-Tribulation)',
    desc: 'Christ secretly removes the church before the Tribulation. Believers are "caught up" to heaven. The world is left without Christians. This is a distinct event from the Second Coming — separated by 7 years.',
    refs: '1 Thess 4:16–17 · John 14:3 · 1 Cor 15:52',
  },
  {
    date: 'Future — 7 Years',
    badge: 'future',
    title: "Daniel's 70th Week — The Tribulation",
    desc: 'A literal 7-year period of global tribulation. The "Antichrist" rises, signs a 7-year treaty with Israel, rebuilds the Jerusalem Temple, and restores animal sacrifices — all to be broken at the midpoint (3.5 years).',
    refs: 'Dan 9:27 · Rev 6–18 · Matt 24:15–21',
  },
  {
    date: 'Future — Mid-Trib',
    badge: 'future',
    title: 'Abomination of Desolation',
    desc: 'At the 3.5-year mark, Antichrist enters the rebuilt Temple, stops sacrifices, declares himself God (the "Great Tribulation" begins). The mark of the beast is implemented globally.',
    refs: 'Dan 9:27 · 2 Thess 2:4 · Rev 13:16–18',
  },
  {
    date: 'Future — End',
    badge: 'future',
    title: 'Battle of Armageddon & Second Coming',
    desc: 'Nations gather to fight Israel. Christ returns visibly in glory, destroys the armies, defeats Antichrist and the False Prophet, who are cast into the Lake of Fire. Satan is bound for 1,000 years.',
    refs: 'Rev 19:11–21 · Zech 14:1–4',
  },
  {
    date: 'Future — 1,000 Yrs',
    badge: 'future',
    title: 'Millennial Kingdom (on Earth)',
    desc: 'Christ reigns physically from Jerusalem for 1,000 literal years. Restored nation of Israel fulfils all OT land and covenant promises. Temple worship and Davidic monarchy reinstated on earth.',
    refs: 'Rev 20:1–6 · Isa 65:17–25 · Ezek 40–48',
  },
  {
    date: 'Eternity',
    badge: 'fulfilled',
    title: 'Great White Throne & New Earth',
    desc: 'Satan released, final rebellion crushed, Great White Throne Judgment, Lake of Fire, New Heavens and New Earth created.',
    refs: 'Rev 20:7–21:1',
  },
];

export const sdaTimeline: EraBlock[] = [
  {
    date: '457 BC',
    badge: 'fulfilled',
    title: 'Decree to Rebuild Jerusalem',
    desc: "Artaxerxes I issues the decree (Ezra 7:1–27) — the anchor date for both the 2,300-day and 70-week prophecies. Verified by the Elephantine Papyri and Persian-era archaeology. The day-year principle (Num 14:34; Ezek 4:6) converts days to literal years.",
    refs: 'Ezra 7:1–27 · Dan 9:25 · Neh 2:1–8',
  },
  {
    date: '27 AD',
    badge: 'fulfilled',
    title: 'Baptism of Jesus — Messiah Anointed',
    desc: '"69 weeks" (483 years) from 457 BC = 27 AD. Jesus is baptised and anointed by the Spirit — precisely when Daniel 9:25 predicted "Messiah the Prince" would appear. "Messiah" (Heb. māšîaḥ) = anointed one.',
    refs: 'Dan 9:25 · Luke 3:21–22 · Acts 10:38',
  },
  {
    date: '31 AD',
    badge: 'fulfilled',
    title: 'Crucifixion — "Midst of the Week"',
    desc: '"In the midst of the week He shall cause sacrifice and oblation to cease" (Dan 9:27). At Calvary, the veil tore — the entire sacrificial system was rendered obsolete. The 70th week (7 years) runs 27–34 AD, not 7 future years.',
    refs: 'Dan 9:27 · Matt 27:51 · Heb 9:11–14 · 10:1–14',
  },
  {
    date: '34 AD',
    badge: 'fulfilled',
    title: 'Stoning of Stephen — Gospel to Gentiles',
    desc: "End of the 490 years (70 weeks). Israel's exclusive probationary period closes (Acts 7:59–8:1). Saul converted (Acts 9). Gospel formally extends to Gentiles (Acts 10–11). All 70 weeks contiguous and fulfilled.",
    refs: 'Acts 7:59 · 8:1–4 · 9:1–9 · 10:44–48',
  },
  {
    date: '538–1798 AD',
    badge: 'historical',
    title: '1,260 Years of Papal Supremacy',
    desc: 'The "little horn" of Daniel 7 (also Rev 12:6, 14; 13:5) exercises power for 1,260 prophetic days = 1,260 literal years. Justinian\'s Decree 538 AD establishes papal primacy. Pope Pius VI taken captive by Napoleon 1798 AD — the "deadly wound." Reformation prophets (Luther, Wycliffe, Huss, Newton) all identified this power as Rome.',
    refs: 'Dan 7:25 · Rev 12:6, 14 · Rev 13:5 · 2 Thess 2:3–4',
  },
  {
    date: '1844 AD',
    badge: 'present',
    title: 'Start of Investigative Judgment',
    desc: 'End of the 2,300 days (457 BC + 2,300 = 1844 AD). Christ enters the Most Holy Place of the heavenly sanctuary as High Priest (Dan 7:9–14; 8:14). Yom Kippur typology fulfilled in heaven. The "hour of His judgment is come" (Rev 14:7). First Angel\'s Message begins.',
    refs: "Dan 8:14 · 7:9–14 · Rev 14:6–7 · Heb 8:1–2 · 9:23",
  },
  {
    date: '1844 → Now',
    badge: 'present',
    title: "Three Angels' Messages — Loud Cry",
    desc: 'Rev 14:6–12 is the last gospel proclamation — warning about Babylon, the Mark of the Beast (false worship/Sunday law), and calling for Sabbath observance ("commandments of God"). Shaking, Latter Rain, and Loud Cry immediately precede the Second Coming. Close of Probation follows.',
    refs: 'Rev 14:6–12 · 18:1–4 · Joel 2:28–29 · James 5:7–8',
  },
  {
    date: 'Second Coming',
    badge: 'future',
    title: 'Second Advent — Visible, Glorious',
    desc: 'Christ returns visibly, audibly, bodily. No secret rapture — "every eye shall see Him" (Rev 1:7). Righteous dead raised (1st resurrection). Living saints translated. Wicked destroyed by the brightness of His coming. Satan is bound — no one left to tempt.',
    refs: 'Rev 1:7 · 1 Thess 4:16–17 · 2 Thess 2:8 · Rev 6:14–17',
  },
  {
    date: '1,000 Years — In Heaven',
    badge: 'future',
    title: 'Millennium — Saints Reign in Heaven',
    desc: 'The 1,000 years (Rev 20) occur in heaven, not on earth. The earth is desolate — Satan is "bound" (no one to deceive). The saints participate in the judgment of the wicked. Earth is not inhabited for 1,000 years (Jer 4:23–27; Isa 24:1–3).',
    refs: 'Rev 20:1–6 · Jer 4:23–27 · Isa 24:1–3 · John 14:2–3',
  },
  {
    date: 'Eternity',
    badge: 'fulfilled',
    title: 'New Jerusalem Descends — Earth Recreated',
    desc: 'Satan loosed briefly, leads final rebellion, is devoured by fire from God. 2nd resurrection (wicked). Judgment executed. Earth purified and recreated. New Jerusalem descends. God dwells with humanity eternally. Annihilation of the wicked (conditional immortality).',
    refs: 'Rev 20:7–21:4 · Mal 4:1–3 · 2 Pet 3:10–13',
  },
];
