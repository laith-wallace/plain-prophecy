export interface DoctrineSection {
  id: string;
  heading: string;
  badge?: string;
  era?: string;
  contentBlocks: {
    label: string;
    text: string;
  }[];
  christCentre?: string;
  keyVerse?: { text: string; ref: string };
}

export interface DoctrinePage {
  slug: string;
  title: string;
  subtitle: string;
  scriptureRef: string;
  category: "rapture" | "antichrist" | "daniel" | "revelation";
  intro: string;
  sections: DoctrineSection[];
  christCentre: string;
  verdict: string;
  nextDoctrine?: { slug: string; title: string };
}

export function findDoctrine(slug: string): DoctrinePage | undefined {
  return doctrines.find((d) => d.slug === slug);
}

export const doctrines: DoctrinePage[] = [
  {
    slug: "the-rapture",
    title: "The Rapture",
    subtitle: "The word doesn't appear once in Scripture — and neither does the idea",
    scriptureRef: "1 Thessalonians 4:16–17",
    category: "rapture",
    intro:
      "Millions of believers are waiting to vanish. But the 'rapture' as a distinct, secret event was unknown to the church for 1,800 years — and the Bible doesn't teach it.",
    sections: [
      {
        id: "the-claim",
        heading: "The Claim",
        badge: "Mainstream View",
        contentBlocks: [
          {
            label: "What many churches teach",
            text: "Before a coming seven-year tribulation, Christ will secretly return and 'rapture' all true believers off the earth. The living will vanish, the dead in Christ will be resurrected, and the world will be left behind. Those who remain will face the rule of the Antichrist. After seven years, Christ returns again — visibly — to establish His kingdom.",
          },
          {
            label: "Key teachers",
            text: "John Nelson Darby (1830s Plymouth Brethren), popularised by the Scofield Reference Bible (1909), and cemented in popular culture by Hal Lindsey's The Late Great Planet Earth (1970) and Tim LaHaye's Left Behind series (1995–2007).",
          },
        ],
      },
      {
        id: "the-text",
        heading: "What Scripture Says",
        badge: "Biblical Text",
        contentBlocks: [
          {
            label: "The passage everyone quotes",
            text: "1 Thessalonians 4:16–17 is the cornerstone text: 'For the Lord himself shall descend from heaven with a shout, with the voice of the archangel, and with the trump of God: and the dead in Christ shall rise first.' This event is not silent. It is announced with a shout, an archangel's voice, and a trumpet. There is nothing secret about it.",
          },
          {
            label: "One return, not two",
            text: "Matthew 24:30–31 describes the same event: the Son of Man appearing in the clouds with great power and glory, sending His angels with a great trumpet to gather His elect from the four winds. Paul's language in 1 Thessalonians exactly mirrors Jesus' language in Matthew 24. The Bible describes one Second Coming — not two separate returns separated by seven years.",
          },
          {
            label: "Additional references",
            text: "Acts 1:11 — 'This same Jesus, which is taken up from you into heaven, shall so come in like manner as ye have seen him go.' He left visibly. He returns visibly. John 6:39–40 — Christ raises the righteous 'at the last day' — one resurrection event. Revelation 1:7 — 'Behold, he cometh with clouds; and every eye shall see him.'",
          },
        ],
        keyVerse: {
          text: "For the Lord himself shall descend from heaven with a shout, with the voice of the archangel, and with the trump of God.",
          ref: "1 Thessalonians 4:16",
        },
      },
      {
        id: "the-origin",
        heading: "Where This Came From",
        badge: "Historical Record",
        era: "1830s",
        contentBlocks: [
          {
            label: "A nineteenth-century invention",
            text: "The rapture doctrine as a distinct pre-tribulation event was first taught by John Nelson Darby of the Plymouth Brethren movement in the 1830s. No church father, Reformer, or theologian before Darby ever taught a secret, pre-tribulation rapture. The entire Protestant Reformation tradition knew nothing of it.",
          },
          {
            label: "How it spread",
            text: "Darby's system was popularised in America primarily through the Scofield Reference Bible (1909), which embedded dispensational footnotes alongside the Scripture text — training generations of pastors and laypeople to read the Bible through a rapture lens. The doctrine was further popularised by radio preachers in the mid-twentieth century and mass-market novels in the 1990s.",
          },
          {
            label: "The Margaret MacDonald connection",
            text: "Historians have documented that an early form of the pre-tribulation rapture idea appeared in a vision received by Margaret MacDonald, a young Scottish charismatic, in 1830 — shortly before Darby developed his full system. Whatever its precise origin, the rapture is demonstrably modern and post-Reformation.",
          },
        ],
      },
      {
        id: "the-truth",
        heading: "The Biblical Alternative",
        badge: "Historicist Reading",
        contentBlocks: [
          {
            label: "One glorious return",
            text: "Scripture consistently describes one Second Coming — visible, audible, and unmistakable. The righteous dead are raised and the living righteous are transformed in a moment (1 Cor 15:51–52). Both groups meet the Lord in the air (1 Thess 4:17). This is not a secret event. It ends human history as we know it.",
          },
          {
            label: "The tribulation is now — and has always been",
            text: "Revelation 7:14 describes saints who 'came out of great tribulation' — not future survivors, but the faithful throughout history who suffered for their faith. The tribulation is the experience of God's people in a hostile world (John 16:33), not a seven-year geopolitical event after everyone disappears.",
          },
          {
            label: "Why this matters",
            text: "The rapture doctrine encourages disengagement from the world ('we'll be gone anyway') and focuses prophetic expectation on geopolitical news rather than personal faithfulness. Scripture's call is to endure, watch, and be ready — not to wait for an exit.",
          },
        ],
        christCentre:
          "Christ's return is not a secret evacuation — it is the culmination of redemption history. Every eye will see Him. Every knee will bow. The One who was crucified publicly is coming back publicly, in glory. The hope of the Second Coming is not escape from tribulation but the final vindication of every saint who trusted Him through it.",
      },
    ],
    christCentre:
      "The Second Coming is the grand climax of Scripture — the moment when everything Christ purchased on the cross is fully realised. Not a whisper, but a shout. Not a vanishing, but a resurrection. The same Jesus who bled openly on a Roman cross will return openly in the clouds. That is the hope.",
    verdict:
      "The rapture as a secret, pre-tribulation event has no biblical basis. It is a nineteenth-century invention with no support in church history before 1830.",
    nextDoctrine: { slug: "gap-theory-daniel-9", title: "The Gap in Daniel 9" },
  },

  {
    slug: "gap-theory-daniel-9",
    title: "The Gap in Daniel 9",
    subtitle: "A 2,000-year hole cut into the most precise prophecy in Scripture",
    scriptureRef: "Daniel 9:24–27",
    category: "daniel",
    intro:
      "Daniel 9 gives the most precise timeline in the entire Bible — 490 years, one continuous period, pointing directly to Christ. Dispensationalism cuts a 2,000-year gap into it. Scripture doesn't.",
    sections: [
      {
        id: "the-claim",
        heading: "The Claim",
        badge: "Mainstream View",
        contentBlocks: [
          {
            label: "What many churches teach",
            text: "The 70 weeks of Daniel 9 contain a 'prophetic gap.' The first 69 weeks ran from 445 BC to Christ's triumphal entry. Then the prophetic clock stopped. The final week — one seven-year period — is separated from the first 69 by the current church age, which could last thousands of years. This 70th week is the future seven-year Tribulation.",
          },
          {
            label: "Key teachers",
            text: "John Nelson Darby developed the gap theory to accommodate his dispensational system. It was codified by C.I. Scofield (1909), Chuck Missler, John MacArthur, and virtually all popular prophecy teachers in the evangelical mainstream.",
          },
        ],
      },
      {
        id: "the-text",
        heading: "What Scripture Says",
        badge: "Biblical Text",
        contentBlocks: [
          {
            label: "Seventy weeks — one decree, one purpose",
            text: "Daniel 9:24 says: 'Seventy weeks are determined upon thy people and upon thy holy city.' The text gives one unified block of seventy weeks for one unified purpose — to finish transgression, make an end of sins, make reconciliation for iniquity, bring in everlasting righteousness, seal up vision and prophecy, and anoint the Most Holy. All six of these are accomplished in and through Christ. There is no grammatical basis for inserting a gap.",
          },
          {
            label: "The maths: 457 BC to 34 AD",
            text: "The decree to restore Jerusalem was issued in 457 BC (Ezra 7:12–26). Sixty-nine weeks (483 years) from 457 BC = 27 AD — the exact year of Christ's baptism and the beginning of His public ministry (Luke 3:1). In the midst of the 70th week (31 AD), Christ was 'cut off' — crucified. His death confirmed the covenant and made the temple sacrifices obsolete (Heb 10:1–14). The 70th week ended in 34 AD when the gospel broke beyond Israel to the Gentiles.",
          },
          {
            label: "He confirms the covenant",
            text: "Daniel 9:27 — 'he shall confirm the covenant with many for one week.' The dispensational reading makes 'he' the Antichrist signing a peace deal. But in context, the subject of the passage is 'Messiah the Prince' (v.25). Christ confirmed the covenant through His ministry and death. His sacrifice made the sacrificial system obsolete — 'causing the sacrifice and oblation to cease' (v.27) — exactly as Hebrews 7–10 describes.",
          },
        ],
        keyVerse: {
          text: "Seventy weeks are determined upon thy people and upon thy holy city, to finish the transgression, and to make an end of sins, and to make reconciliation for iniquity, and to bring in everlasting righteousness.",
          ref: "Daniel 9:24",
        },
      },
      {
        id: "the-origin",
        heading: "Where This Came From",
        badge: "Historical Record",
        era: "1590 AD",
        contentBlocks: [
          {
            label: "A Jesuit counter-move",
            text: "The gap theory was first introduced by Francisco Ribera, a Spanish Jesuit priest, in 1590. His motivation was explicitly political: the Protestant Reformers — Luther, Calvin, Tyndale, Knox, and nearly all the major Reformers — had identified the papacy as the Antichrist of prophecy using the historicist method. Ribera's solution was to relocate the antichrist prophecies to a future figure, removing the threat from the papacy.",
          },
          {
            label: "From Jesuit seminaries to evangelical pulpits",
            text: "Ribera's futurist interpretation lay largely dormant for two centuries until it was rediscovered and popularised by Manuel Lacunza (1790) and then by Edward Irving and John Nelson Darby in the 1830s. It passed into mainstream evangelicalism through the Scofield Reference Bible (1909) without most readers knowing its Counter-Reformation origin.",
          },
        ],
      },
      {
        id: "the-truth",
        heading: "The Biblical Alternative",
        badge: "Historicist Reading",
        contentBlocks: [
          {
            label: "The 70 weeks are continuous",
            text: "Historicist exegesis reads the 70 weeks as one unbroken 490-year period beginning in 457 BC. This places Christ's baptism at 27 AD, His crucifixion at 31 AD (the midst of the 70th week), and the gospel's expansion to the Gentiles at 34 AD. Every event fits with remarkable precision. No gap is required — or supported by the text.",
          },
          {
            label: "Daniel 9 is the anchor of all prophetic chronology",
            text: "The 70 weeks are a subset of the 2,300 days of Daniel 8:14 (both begin with the same decree in 457 BC). This means Daniel 9 and Daniel 8 are meant to be read together. The chronology anchors to a verifiable historical date and terminates in verifiable historical events — the cross and the heavenly sanctuary ministry of Christ.",
          },
        ],
        christCentre:
          "Daniel 9 is the most Christ-centred prophecy in the Old Testament. It predicts the exact year of His baptism, the exact year of His death, and the reason for His death — to 'make reconciliation for iniquity' and 'bring in everlasting righteousness.' Cutting a 2,000-year gap into it does not just distort chronology. It obscures the most precise prediction of the Messiah in all Scripture.",
      },
    ],
    christCentre:
      "The 70 weeks of Daniel exist for one reason: to identify and validate Jesus as the Messiah. The prophecy names Him, times Him, and describes His work — all before a single event happened. No gap is needed. The text is complete, and Christ is the fulfilment.",
    verdict:
      "The 2,000-year gap in Daniel 9 has no basis in the text. It was invented in 1590 to protect the papacy from Protestant identification and later absorbed into evangelical dispensationalism.",
    nextDoctrine: {
      slug: "antichrist-future-world-leader",
      title: "The Antichrist as a Future World Leader",
    },
  },

  {
    slug: "antichrist-future-world-leader",
    title: "The Antichrist as a Future World Leader",
    subtitle: "Daniel's 'little horn' is not a future politician — it already rose and ruled",
    scriptureRef: "Daniel 7:7–8, 23–25",
    category: "antichrist",
    intro:
      "Prophecy books picture the Antichrist as a charming future dictator signing peace deals and demanding global worship. Daniel describes something that already happened — and the evidence is in the history books.",
    sections: [
      {
        id: "the-claim",
        heading: "The Claim",
        badge: "Mainstream View",
        contentBlocks: [
          {
            label: "What many churches teach",
            text: "A future world leader — the Antichrist — will arise after the rapture, sign a peace deal with Israel, rebuild the Jerusalem temple, demand global worship, and rule with absolute power for 3.5 years before Christ's return. He will be a political and religious figure of unprecedented influence.",
          },
          {
            label: "Key teachers",
            text: "Hal Lindsey (The Late Great Planet Earth), Tim LaHaye (Left Behind series), John Hagee, Joel Rosenberg. The concept is foundational to dispensationalism and dominates evangelical prophecy teaching today.",
          },
        ],
      },
      {
        id: "the-text",
        heading: "What Scripture Says",
        badge: "Biblical Text",
        contentBlocks: [
          {
            label: "The little horn arises from Rome's collapse",
            text: "Daniel 7 describes four beasts representing four world empires. The fourth beast — Rome — has ten horns (the ten kingdoms that emerged from Rome's collapse in the 4th–5th centuries AD). The little horn arises among them, after them, uprooting three. This means the little horn is not a future figure — it arose out of the political fragmentation of the Roman Empire. That is history.",
          },
          {
            label: "Its identifying marks",
            text: "Daniel 7:25 gives four precise characteristics: it speaks great words against God; it wears out the saints; it thinks to change times and laws; and it rules for 'a time, times and half a time' (1260 day-years). Each of these is a historical, institutional description — not a biography of a future individual. The entity that rose from Rome's ruins, claimed to speak for God, persecuted dissenters, changed the Sabbath and church calendar, and ruled for approximately 1260 years (538–1798 AD) is identifiable from history.",
          },
          {
            label: "2 Thessalonians and the temple of God",
            text: "2 Thessalonians 2:3–4 describes the 'man of sin' sitting in the 'temple of God, showing himself that he is God.' Paul's audience had no rebuilt temple — the temple of God in the New Testament is the church (1 Cor 3:16–17, 2 Cor 6:16). The man of sin sits within the church, claiming divine authority. This is not a future political dictator. It is a religious institution claiming to stand in the place of God.",
          },
        ],
        keyVerse: {
          text: "He shall speak great words against the most High, and shall wear out the saints of the most High, and think to change times and laws: and they shall be given into his hand until a time and times and the dividing of time.",
          ref: "Daniel 7:25",
        },
      },
      {
        id: "the-origin",
        heading: "Where This Came From",
        badge: "Historical Record",
        era: "1590 AD",
        contentBlocks: [
          {
            label: "The same Jesuit strategy",
            text: "Francisco Ribera's 1590 futurist commentary relocated the Antichrist to a future period specifically to divert Protestant identification of the papacy. Luis de Alcasar, another Jesuit, simultaneously argued the opposite — that all Antichrist prophecies had already been fulfilled in ancient Rome (preterism). Both strategies had the same objective: make it impossible for the historicist reading to hold.",
          },
          {
            label: "What the Reformers believed",
            text: "Martin Luther, John Calvin, John Knox, William Tyndale, John Huss, John Wycliffe, Isaac Newton, John Wesley, and virtually every major Reformer and Protestant theologian before the nineteenth century identified the papacy as the little horn of Daniel 7 and the Antichrist of 2 Thessalonians 2. This was not a fringe view. It was the Protestant consensus for 300 years.",
          },
        ],
      },
      {
        id: "the-truth",
        heading: "The Biblical Alternative",
        badge: "Historicist Reading",
        contentBlocks: [
          {
            label: "An institutional, not individual, identification",
            text: "The historicist identification of the papacy as the little horn is not a personal attack on any individual Catholic — it is an institutional and prophetic observation. Daniel 7's characteristics match the papacy as an institution with historical precision: it arose from the Roman Empire, claimed divine authority on earth, persecuted dissenting believers, and altered the Sabbath commandment and church calendar. This is verifiable history.",
          },
          {
            label: "The 1260 years: 538–1798 AD",
            text: "The 'time, times and half a time' of Daniel 7:25 = 1260 prophetic years (using the day-year principle established in Num 14:34 and Ezek 4:6). This period runs from 538 AD — when the Eastern Emperor Justinian's decree gave the papacy political supremacy in the West — to 1798 AD, when Napoleon's general Berthier entered Rome and took Pope Pius VI prisoner. The papacy 'received the deadly wound' (Rev 13:3) on schedule.",
          },
        ],
        christCentre:
          "The real antichrist question is not 'who is this future man?' but 'what has been set up in place of Christ?' Christ is the sole mediator between God and humanity (1 Tim 2:5). Any system that inserts another mediator — human or institutional — into that role is, by definition, anti-christ. The prophetic warning is not about geopolitics. It is about where we place our trust for salvation.",
      },
    ],
    christCentre:
      "Christ is the only high priest, the only mediator, the only one who sits at the right hand of the Father. The antichrist is whatever claims His seat. The prophecy is a warning to keep our eyes on Jesus — and be sceptical of any earthly institution that claims His authority.",
    verdict:
      "The Antichrist as a future world leader is a post-Reformation invention with no exegetical support. Daniel's little horn has already risen, ruled, and received its wound — on prophetic schedule.",
    nextDoctrine: {
      slug: "mark-of-the-beast",
      title: "The Mark of the Beast",
    },
  },

  {
    slug: "mark-of-the-beast",
    title: "The Mark of the Beast",
    subtitle: "Not a microchip. Not a vaccine. Revelation's marks are about allegiance, not technology",
    scriptureRef: "Revelation 13:16–17; 14:9–12",
    category: "revelation",
    intro:
      "Every decade brings new speculation about the mark — barcodes, microchips, vaccines, digital IDs. Revelation's symbolic language points to something far more significant than a technology.",
    sections: [
      {
        id: "the-claim",
        heading: "The Claim",
        badge: "Mainstream View",
        contentBlocks: [
          {
            label: "What many churches teach",
            text: "During the future Tribulation, the Antichrist will require all people to receive a physical mark — an implanted microchip, biometric tattoo, or digital identifier — in their right hand or forehead in order to buy or sell. Anyone who refuses will be unable to participate in the economy. Taking this mark means eternal damnation.",
          },
          {
            label: "Key teachers",
            text: "Hal Lindsey, Tim LaHaye, and virtually all dispensational teachers. The concept has driven widespread speculation tied to the 1970s barcode scare, the 1990s RFID chip, and the 2020s COVID vaccine. Each new technology is identified as a candidate.",
          },
        ],
      },
      {
        id: "the-text",
        heading: "What Scripture Says",
        badge: "Biblical Text",
        contentBlocks: [
          {
            label: "Revelation's marks are symbolic throughout",
            text: "Revelation is a book of symbols. The 144,000 have the Father's name written on their foreheads (Rev 14:1) — no one interprets this as a literal tattoo. The harlot has a name written on her forehead (Rev 17:5) — no one takes this literally either. The mark of the beast follows the same symbolic pattern. Interpreting the beast's mark literally while interpreting the seal of God symbolically is inconsistent exegesis.",
          },
          {
            label: "Forehead and hand in Scripture",
            text: "In the Old Testament, God commanded Israel to bind His laws 'as a sign upon your hand' and 'as frontlets between your eyes' (Deut 6:8). No one interprets this as a literal instruction for physical objects on the body — it means devotion in thought (forehead = mind) and action (hand = behaviour). Ezekiel 9:4 marks the faithful with a sign on their foreheads to distinguish them from those who do not grieve over sin. The forehead in Scripture consistently represents allegiance and belief.",
          },
          {
            label: "The seal of God vs the mark of the beast",
            text: "Revelation 14:12 defines those who do not receive the mark: 'Here is the patience of the saints: here are they that keep the commandments of God, and the faith of Jesus.' The contrast to the beast's mark is commandment-keeping and Christ-centred faith. The final conflict is not between those who accept and reject a microchip — it is between those who worship the beast's system and those who worship the Creator.",
          },
        ],
        keyVerse: {
          text: "Here is the patience of the saints: here are they that keep the commandments of God, and the faith of Jesus.",
          ref: "Revelation 14:12",
        },
      },
      {
        id: "the-origin",
        heading: "Where This Came From",
        badge: "Historical Record",
        era: "Post-1830",
        contentBlocks: [
          {
            label: "Technology anxiety, not exegesis",
            text: "The physical mark interpretation is driven primarily by modern technology anxiety, not biblical exegesis. Before the industrial age, no serious commentator interpreted the mark as a physical implant. The identification of the mark with specific technologies has been repeated in every generation since the barcode era — and has been wrong every time.",
          },
          {
            label: "Futurism requires a physical mark",
            text: "Within the dispensational system, the mark must be physical because the Antichrist is a physical future person and the Tribulation is a literal future period. Once the futurist framework is removed, there is no exegetical reason to read the mark as a technological implant. The symbolism of Revelation points consistently toward spiritual allegiance.",
          },
        ],
      },
      {
        id: "the-truth",
        heading: "The Biblical Alternative",
        badge: "Historicist Reading",
        contentBlocks: [
          {
            label: "The mark is about worship, not technology",
            text: "Revelation 13 and 14 are framed entirely around worship. Those who receive the mark 'worship the beast and his image' (Rev 14:9). Those who do not receive the mark 'worship him that made heaven and earth' (Rev 14:7 — the Creator's Sabbath language from Genesis 2 and Exodus 20). The final issue in Revelation is not economic or technological — it is about who you worship and by whose authority.",
          },
          {
            label: "The Sabbath as the line in the sand",
            text: "Revelation 14:7 calls people to 'worship him that made heaven and earth, and the sea, and the fountains of waters' — direct language from the fourth commandment (Exod 20:11). The seal of God is connected to Creator-worship on the Sabbath. The mark of the beast is connected to the rival system of worship that Daniel 7:25 describes — the institution that 'thought to change times and laws.' The final conflict is a worship conflict, and the Sabbath is the sign of that conflict.",
          },
        ],
        christCentre:
          "The mark of the beast is ultimately a counterfeit seal. God seals His people with His name (Rev 14:1) — meaning His character, His authority, His ownership. The beast offers a different allegiance, a different authority, a different lord. Every person will ultimately bear one mark or the other — not on their skin, but in their devotion. Christ's call is simple: worship the Creator.",
      },
    ],
    christCentre:
      "The mark question is the Revelation's way of asking: who owns you? Every soul will be either sealed by God or marked by the beast — not physically, but in the orientation of their loyalty and worship. Christ has purchased us with His blood. The seal of God is the assurance that we belong to Him.",
    verdict:
      "The mark of the beast is not a microchip or a vaccine. It is a mark of spiritual allegiance in a final conflict over worship — and it is inseparable from the question of who you obey as Lord.",
    nextDoctrine: {
      slug: "seven-year-tribulation",
      title: "The Seven-Year Tribulation",
    },
  },

  {
    slug: "seven-year-tribulation",
    title: "The Seven-Year Tribulation",
    subtitle: "The Left Behind timeline is built on a gap that Scripture doesn't contain",
    scriptureRef: "Revelation 7:14; Matthew 24:21",
    category: "revelation",
    intro:
      "Millions of Christians are waiting for a seven-year tribulation to begin after the rapture. The phrase 'seven-year tribulation' does not appear anywhere in Scripture — and neither does the timeline built around it.",
    sections: [
      {
        id: "the-claim",
        heading: "The Claim",
        badge: "Mainstream View",
        contentBlocks: [
          {
            label: "What many churches teach",
            text: "After the rapture removes all Christians, a seven-year tribulation period begins on earth. The first 3.5 years are a false peace under the Antichrist's rule. The second 3.5 years are the 'Great Tribulation' — a period of unprecedented suffering, divine judgments, and the mark of the beast. Christ returns at the end of these seven years to defeat the Antichrist at Armageddon.",
          },
          {
            label: "Key teachers",
            text: "The seven-year tribulation is the organising framework of virtually all dispensational prophecy teaching: Darby, Scofield, Hal Lindsey, Tim LaHaye, and most contemporary prophecy ministries. It is the plot structure of the Left Behind novels and films.",
          },
        ],
      },
      {
        id: "the-text",
        heading: "What Scripture Says",
        badge: "Biblical Text",
        contentBlocks: [
          {
            label: "Where does 'seven years' come from?",
            text: "The entire construct depends on the dispensational reading of Daniel 9:27 — the 70th week as a future seven-year period. Remove the gap (see our analysis of the Gap Theory), and there is no textual basis for a seven-year tribulation anywhere in Scripture. The phrase 'seven-year tribulation' does not appear once in the Bible.",
          },
          {
            label: "Matthew 24 — what Jesus actually said",
            text: "Matthew 24:21 says: 'For then shall be great tribulation, such as was not since the beginning of the world to this time, no, nor ever shall be.' Jesus was answering His disciples' question about the destruction of the temple (v.2). The primary fulfilment of this 'great tribulation' was the Roman siege of Jerusalem in 70 AD, when over one million Jews perished. Jesus gave specific, practical instructions for people in Judea to flee to the mountains — advice that makes no sense if the event is thousands of years future.",
          },
          {
            label: "Revelation 7:14 — the tribulation is not future",
            text: "Revelation 7:14 describes a great multitude 'which came out of great tribulation, and have washed their robes, and made them white in the blood of the Lamb.' The Greek aorist tense ('came out') does not point to a future seven-year window. This is the entire faithful community throughout history — those who endured tribulation in every age and were cleansed by Christ's blood.",
          },
        ],
        keyVerse: {
          text: "These are they which came out of great tribulation, and have washed their robes, and made them white in the blood of the Lamb.",
          ref: "Revelation 7:14",
        },
      },
      {
        id: "the-origin",
        heading: "Where This Came From",
        badge: "Historical Record",
        era: "1830s",
        contentBlocks: [
          {
            label: "The whole system depends on the gap",
            text: "The seven-year tribulation is not an independent biblical teaching — it is an architectural element of Darby's dispensational system. It requires the rapture (to remove the church before it begins) and the gap in Daniel 9 (to supply the seven-year period). Take away either foundation and the tribulation construct collapses. It is not an exegetical conclusion — it is a systemic implication.",
          },
          {
            label: "The church endured tribulation without waiting for it",
            text: "For eighteen centuries, Christians understood tribulation as their present condition in a fallen world — not a future event they would be spared. 'In the world ye shall have tribulation' (John 16:33). The martyrs of the early church, the Waldensians, the Huguenots, and every persecuted believer throughout history experienced what Revelation 7:14 describes. They did not wait for a future seven-year period.",
          },
        ],
      },
      {
        id: "the-truth",
        heading: "The Biblical Alternative",
        badge: "Historicist Reading",
        contentBlocks: [
          {
            label: "The 1260-year tribulation: 538–1798 AD",
            text: "Revelation describes a period of tribulation using the language of 1260 days, 42 months, and 'time, times and half a time' — all pointing to the same 1260-year period (Dan 7:25, Rev 11:2–3, 12:6, 12:14, 13:5). This was not a future period when John wrote. It was the prophesied era of the little horn's dominance — the 1260 years from 538 AD to 1798 AD, during which countless believers were persecuted for their faith.",
          },
          {
            label: "Tribulation is the path, not a detour",
            text: "Jesus never promised His followers escape from tribulation — He promised His presence through it. 'In the world ye shall have tribulation: but be of good cheer; I have overcome the world' (John 16:33). Acts 14:22: 'We must through much tribulation enter into the kingdom of God.' The dispensational framework turns tribulation into a future event to be avoided. Scripture turns it into the normal experience of the faithful.",
          },
        ],
        christCentre:
          "Christ did not promise to remove His people from suffering — He promised to be with them through it. 'Lo, I am with you alway, even unto the end of the world' (Matt 28:20). The seven-year tribulation teaching offers escape; Jesus offers presence. The saints of Revelation endured tribulation and overcame it through the blood of the Lamb. That is the biblical model.",
      },
    ],
    christCentre:
      "The seven-year tribulation is built on a gap that does not exist, for a church that will not be removed, featuring an antichrist who has already risen. Scripture's actual promise to the saints is not escape but endurance — and the One who walked with Shadrach in the furnace is the same One who walks with His people through every tribulation.",
    verdict:
      "The seven-year tribulation has no independent scriptural basis. It is an architectural consequence of the Gap Theory, and it collapses without it.",
    nextDoctrine: undefined,
  },
];
