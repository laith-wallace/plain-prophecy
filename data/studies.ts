export interface StudySectionContent {
  label: string;
  text: string;
}

export interface StudySection {
  id?: string;
  era?: string;
  badge?: string;
  heading: string;
  body?: string;
  contentBlocks?: StudySectionContent[];
  christCentre?: string;
  keyVerse?: { text: string; ref: string };
}

export interface StudyLesson {
  slug: string;
  title: string;
  scriptureRef: string;
  readingTime?: number;
  published?: boolean;
  keyVerse?: string;
  keyVerseRef?: string;
  intro?: string;
  sections?: StudySection[];
  christCentre?: string;
  nextLesson?: { book: string; lesson: string; title: string };
  cardImageId?: string;
  cardImageUrl?: string | null;
}

export interface StudyBook {
  slug: string;
  title: string;
  icon?: string;
  description: string;
  hasSeparator?: boolean;
  lessons: StudyLesson[];
}

export const studyBooks: StudyBook[] = [
  {
    slug: "daniel",
    title: "Daniel",
    icon: "📘",
    description:
      "The prophetic backbone of Scripture — six visions spanning world history from Babylon to the Second Coming.",
    lessons: [
      {
        slug: "daniel-1",
        title: "Daniel 1",
        scriptureRef: "Daniel 1:1–21",
        readingTime: 6,
        keyVerse:
          "But Daniel resolved that he would not defile himself with the king's food, or with the wine that he drank.",
        keyVerseRef: "Daniel 1:8",
        intro:
          "Taken captive to Babylon, four Hebrew teenagers faced a choice: compromise their consecration to fit in, or risk their lives to remain faithful to God.",
        sections: [
          {
            heading: "The Captivity (vv. 1–4)",
            body: "In 605 BC, Nebuchadnezzar besieged Jerusalem and carried away the finest of the royal family and nobility. Among them were Daniel, Hananiah, Mishael, and Azariah. They were taken to Babylon to be integrated into Chaldean culture, literature, and statecraft. Their names were changed to reflect Babylonian deities — an attempt to erase their identity and allegiance to the God of Israel.",
          },
          {
            heading: "The King's Meat (vv. 5–7)",
            body: "The king appointed for them a daily provision of his own food and wine. This was not merely a dietary change; eating from the king's table implied covenantal loyalty and relied on food previously offered to idols. To accept it was to accept assimilation and acknowledge Babylon's gods as supreme.",
          },
          {
            heading: "The 10-Day Test (vv. 8–16)",
            body: "Daniel 'purposed in his heart' not to defile himself. He respectfully requested a diet of pulse (vegetables/legumes) and water. The chief eunuch feared for his head if the youths appeared emaciated. Daniel proposed a 10-day test. The result? They appeared better and healthier than all the Chaldean youths. Their physical health was a visible manifestation of their spiritual fidelity.",
          },
          {
            heading: "Ten Times Wiser (vv. 17–21)",
            body: "God gave them singular learning and skill. At their graduation three years later, Nebuchadnezzar found them 'ten times better' than all the magicians and enchanters in his realm. Daniel's influence would span the entire duration of the Babylonian empire and into the Medo-Persian era (v.21).",
          },
        ],
        christCentre:
          "Daniel entered the darkest place on earth — the heart of pagan Babylon — and lived an undefiled life. He was a captive who became a counselor to kings. In this, he points to Jesus, who entered a world captive to sin, remained completely undefiled by its temptations, and was elevated to the right hand of the Majesty on high. Like Daniel's test, our true loyalty is tested not in the grand moments, but in our daily, unseen choices.",
        nextLesson: {
          book: "daniel",
          lesson: "daniel-2",
          title: "Daniel 2",
        },
      },
      {
        slug: "daniel-2",
        title: "Daniel 2",
        scriptureRef: "Daniel 2:31–45",
        readingTime: 8,
        keyVerse:
          "In the days of those kings the God of heaven will set up a kingdom that will never be destroyed.",
        keyVerseRef: "Daniel 2:44",
        intro:
          "Nebuchadnezzar's dream of a colossal statue is the first and most accessible of Daniel's visions. It maps world history in four metals — and ends with the only kingdom that never falls.",
        sections: [
          {
            id: "gold",
            era: "605 – 539 BC",
            badge: "Gold",
            heading: "Babylon",
            body: "",
            contentBlocks: [
              { label: "The Prophecy", text: "\"You are the head of gold.\" Daniel told Nebuchadnezzar directly — his empire was the first kingdom represented in the dream. Babylon stood alone at the top, the most glorious of all the kingdoms to follow. (Daniel 2:38)" },
              { label: "History Confirms", text: "Babylon under Nebuchadnezzar was the dominant world empire from 605–539 BC. Herodotus wrote of its astounding wealth — gold-covered temples, gold statues, palaces lined with gold. The Ishtar Gate remains one of the wonders of the ancient world. Babylon fell exactly as Daniel described: in a single night, to the Medes and Persians (Daniel 5)." }
            ],
            christCentre: "Daniel himself was brought to Babylon as a captive teenager. The God who ruled over Nebuchadnezzar's golden empire was already preserving the line that would lead to Christ — and giving Daniel the wisdom to interpret what no one else could see.",
            keyVerse: { text: "\"You are the head of gold.\"", ref: "Daniel 2:38" }
          },
          {
            id: "silver",
            era: "539 – 331 BC",
            badge: "Silver",
            heading: "Medo-Persia",
            body: "",
            contentBlocks: [
              { label: "The Prophecy", text: "\"After you shall arise another kingdom inferior to yours.\" The two arms point to the dual nature of this empire — Medes and Persians ruling together. Silver is valuable but less so than gold: the empire was vast but more bureaucratic, more diffuse. (Daniel 2:39)" },
              { label: "History Confirms", text: "Cyrus the Great of Persia conquered Babylon in 539 BC — the very night of Belshazzar's feast (Daniel 5). The Medo-Persian empire stretched from India to Ethiopia, with 127 provinces. Notably, Cyrus immediately freed the Jewish captives and financed the rebuilding of Jerusalem's temple. The two-armed nature of the empire perfectly maps to its dual Medo-Persian leadership." }
            ],
            christCentre: "It was under Medo-Persian authority that the decree went out to restore Jerusalem — starting the prophetic 70-Week countdown that would end at the exact year of Jesus' baptism (Ezra 7; Daniel 9). Cyrus is even named by Isaiah 150 years before he was born as God's instrument for this. (Isaiah 44:28)",
            keyVerse: { text: "\"After you shall arise another kingdom inferior to yours.\"", ref: "Daniel 2:39" }
          },
          {
            id: "bronze",
            era: "331 – 168 BC",
            badge: "Bronze",
            heading: "Greece",
            body: "",
            contentBlocks: [
              { label: "The Prophecy", text: "\"A third kingdom of bronze, which shall rule over all the earth.\" Bronze was the metal of Greek warfare — their soldiers wore it into battle. The thighs suggest speed and power. This empire would be characterised by conquest across the known world. (Daniel 2:39)" },
              { label: "History Confirms", text: "Alexander the Great conquered Persia by 331 BC at just 25 years old. He marched an army from Greece to India in a decade — the fastest territorial expansion in ancient history. His soldiers famously wore bronze armour. After his death in 323 BC, his empire split among four generals, exactly mirroring the imagery in Daniel 8. Greece dominated Judea, forcing Hellenistic culture on the Jewish people." }
            ],
            christCentre: "Greek conquest spread one common language — Koine Greek — across the entire known world. This was the language the New Testament would be written in, and the Septuagint (the Greek Old Testament) would be translated into. God used the Greek empire to prepare the communication network for the Gospel.",
            keyVerse: { text: "\"A third kingdom of bronze, which shall rule over all the earth.\"", ref: "Daniel 2:39" }
          },
          {
            id: "iron",
            era: "168 BC – 476 AD",
            badge: "Iron",
            heading: "Rome",
            body: "",
            contentBlocks: [
              { label: "The Prophecy", text: "\"A fourth kingdom, strong as iron, because iron breaks in pieces and shatters all things.\" No imagery of inferiority here — iron is described as the most powerful material. And two legs: Rome would eventually split. (Daniel 2:40)" },
              { label: "History Confirms", text: "Rome is history's most iron-accurate empire. They built roads, aqueducts, and legal systems that still shape Western civilisation. Their two legs became literal — the Western Roman Empire fell in 476 AD, while the Eastern (Byzantine) Empire continued until 1453 AD. Rome crushed every kingdom before it. And it was under Roman rule — in the reign of Caesar Augustus — that Jesus was born. (Luke 2:1)" }
            ],
            christCentre: "Jesus was crucified by Rome. The Roman road system carried the first apostles across the empire in decades. Roman law gave Paul his right of appeal to Caesar. Rome, the iron empire, was the unwitting infrastructure for the spread of the Gospel to the world.",
            keyVerse: { text: "\"Strong as iron, because iron breaks in pieces and shatters all things.\"", ref: "Daniel 2:40" }
          },
          {
            id: "clay",
            era: "476 AD – Present",
            badge: "Iron & Clay",
            heading: "Divided Europe",
            body: "",
            contentBlocks: [
              { label: "The Prophecy", text: "\"The feet and toes, partly of potter's clay and partly of iron, it shall be a divided kingdom.\" The mixture of iron and clay that won't bond: these kingdoms will be partly strong, partly brittle. Intermarriage will be attempted but won't hold them together. (Daniel 2:41–43)" },
              { label: "History Confirms", text: "After Rome fell in 476 AD, Europe fragmented into the Germanic kingdoms — the Visigoths, Ostrogoths, Franks, Vandals, and others. Every attempt to re-unify Europe has ultimately failed: Charlemagne, Napoleon, Hitler — all fell short. European royalty spent centuries intermarrying to create political alliances (the iron trying to mix with clay), and none of it lasted. Europe remains divided to this day, exactly as prophesied." }
            ],
            christCentre: "The prophecy says no human power will unite these kingdoms. The next unifying event in Daniel's vision is the Stone — not a politician or a general, but Christ himself. We are living in the age of the feet right now. The next event in this prophecy is the Second Coming.",
            keyVerse: { text: "\"As the toes of the feet were partly iron and partly clay, so the kingdom shall be partly strong and partly brittle.\"", ref: "Daniel 2:42" }
          },
          {
            id: "stone",
            era: "The Second Coming → Eternity",
            badge: "Cut Without Hands",
            heading: "Christ's Eternal Kingdom",
            body: "",
            contentBlocks: [
              { label: "The Prophecy", text: "\"A stone was cut out by no human hand, and it struck the image on its feet of iron and clay, and broke them in pieces.\" The stone then became a mountain that filled the whole earth. This kingdom is not built by human effort — it arrives from outside history entirely. (Daniel 2:34–35, 44–45)" },
              { label: "What It Means", text: "Every previous kingdom succeeded through military conquest, political strategy, or intermarriage. The Stone kingdom is different: it is \"cut without human hands.\" It doesn't defeat the other kingdoms by playing by their rules — it replaces the entire system. The five kingdoms become \"like the chaff of the summer threshing floors\" and the Stone becomes a mountain filling the whole earth." }
            ],
            christCentre: "Jesus called himself \"the stone the builders rejected\" (Matthew 21:42). Paul calls him \"the chief cornerstone\" (Ephesians 2:20). Peter calls him \"a living stone\" (1 Peter 2:4). The Stone in Daniel 2 is not a symbol that needs decoding — the New Testament is emphatic. Christ's kingdom will be the final one, and it will never be destroyed. (Daniel 2:44)",
            keyVerse: { text: "\"The God of heaven will set up a kingdom that shall never be destroyed… it shall stand forever.\"", ref: "Daniel 2:44" }
          }
        ],
        christCentre:
          "The stone is Christ — born of a virgin (cut without human hands), rejected by the builders (Ps 118:22; Matt 21:42), but destined to fill the earth. Every empire in this vision rises and falls. Only one is described as eternal (v.44). Daniel 2 is not principally about geopolitics — it is a Christological proclamation. The God of heaven had a plan before Babylon's first king sat on a throne, and it ends with Jesus.",
        nextLesson: {
          book: "daniel",
          lesson: "daniel-7",
          title: "Daniel 7",
        },
      },
      {
        slug: "daniel-7",
        title: "Daniel 7",
        scriptureRef: "Daniel 7:1–28",
        readingTime: 10,
        keyVerse:
          "One like a Son of Man came with the clouds of heaven… He was given dominion and glory and a kingdom, that all peoples, nations, and languages should serve him.",
        keyVerseRef: "Daniel 7:13–14",
        intro:
          "Daniel 7 retells the story of Daniel 2 — but from heaven's perspective. The empires that looked like noble metals are now revealed as predatory beasts. And then the heavens open.",
        sections: [
          {
            heading: "Four Beasts from the Sea (vv. 1–8)",
            body: "Daniel sees four great beasts arise from the sea: a lion with eagle's wings (Babylon — the wings plucked, the beast given a man's heart), a lopsided bear with three ribs in its mouth (Medo-Persia — three conquered powers: Lydia, Babylon, Egypt), a four-headed leopard with four wings (Greece — Alexander's speed, the four-way split after his death), and a terrible beast with iron teeth and ten horns (Rome and its successors). Among the ten horns a little horn arises, uprooting three, with eyes like a man and a mouth speaking great things.",
          },
          {
            heading: "The Heavenly Courtroom (vv. 9–14)",
            body: "This is the visual apex of the chapter. The Ancient of Days takes his throne — white clothing, white hair, a river of fire before him, a thousand thousands attending. The court sits. Books are opened. Then One like the Son of Man comes on the clouds and is presented before the Ancient of Days and receives dominion, glory, and a kingdom. This is not the Second Coming — Christ is being presented in heaven, not descending to earth. It is his enthronement as King-Priest, confirmed by Hebrews 8–9.",
          },
          {
            heading: "The Little Horn Identified (vv. 19–27)",
            body: "The interpreter angel explains: the ten horns are ten kingdoms from Rome's territory. The little horn is a different kind of power — it speaks words against the Most High, wears out the saints, and thinks to change times and law. It is given authority for 'a time, times and half a time' — a prophetic period of 1,260 days (years, by the day-year principle of Num 14:34). History confirms: three kingdoms were uprooted (Heruli 493, Vandals 534, Ostrogoths 538 AD). The 1,260-year period runs 538–1798 AD. The Reformers — Luther, Calvin, Tyndale, Knox, Newton, Wesley — unanimously identified this power as the medieval papacy. This was the dominant Protestant position for 300 years.",
          },
        ],
        christCentre:
          "Jesus used the title 'Son of Man' more than any other self-designation — deliberately evoking this chapter. At his trial before the Sanhedrin he quoted Daniel 7:13 directly: 'You will see the Son of Man sitting at the right hand of Power and coming on the clouds of heaven' (Matt 26:64). The high priest called it blasphemy because he understood the claim: Jesus was asserting that he is the one presented before the Ancient of Days, the one who receives the eternal kingdom. Daniel 7 is not a political prophecy with a religious footnote. It is a Christological revelation that ends with the Son of Man receiving all authority.",
        nextLesson: {
          book: "daniel",
          lesson: "2300-days",
          title: "2300 Days",
        },
      },
      {
        slug: "2300-days",
        title: "2300 Days",
        scriptureRef: "Daniel 8:14",
        readingTime: 9,
        keyVerse:
          "For 2,300 evenings and mornings; then the sanctuary shall be restored to its rightful state.",
        keyVerseRef: "Daniel 8:14",
        intro:
          "The longest time prophecy in all of Scripture — and arguably the most precise. It stretches from 457 BC to 1844 AD, spans three chapters of Daniel, and its meaning was deliberately sealed until 'the time of the end.'",
        sections: [
          {
            heading: "The Ram and the Goat (Dan 8:1–14)",
            body: "Daniel sees a ram with two horns (Medo-Persia, interpreted by the angel in v.20) charge in every direction without opposition. Then a goat with a single conspicuous horn (Greece, v.21 — Alexander the Great) comes from the west at astonishing speed, shatters the ram, and becomes very great. The great horn breaks at its peak (Alexander died in 323 BC), and four horns grow in its place (his four generals). From one of the four arises a little horn that grows exceedingly great, casts down the host and the sanctuary, and continues for 2,300 evenings and mornings — then 'the sanctuary shall be restored.'",
          },
          {
            heading: "The Connection to Daniel 9",
            body: "Daniel is left overwhelmed after chapter 8 — the 2,300-day figure is unexplained. In chapter 9, the angel Gabriel returns with the explicit purpose of 'giving Daniel understanding' (9:22). The 70 weeks of Daniel 9 are 'cut off' (Hebrew: chātak — rendered 'decreed' or 'determined' in most translations, but understood by historicist scholars as 'cut off from a larger period') from the 2,300 days — their starting point is the same, and they are a subset of the larger prophecy. They share the same starting point: the decree to restore Jerusalem in 457 BC (Ezra 7, verified by the Elephantine Papyri). The 70 weeks (490 years) end in 34 AD. The remaining 1,810 years run to 1844 AD: 457 BC + 2,300 = 1844 AD. In that year, a worldwide movement independently reached this calculation and recognised that the heavenly sanctuary — not an earthly temple — was the subject of the prophecy.",
          },
          {
            heading: "The Day-Year Principle",
            body: "The prophetic conversion of days to years is not an assumption — it is exegetically mandated. Numbers 14:34: 'According to the number of the days in which you spied out the land, forty days, each day for a year, you shall bear your iniquity forty years.' Ezekiel 4:6: 'A day for each year I have assigned to you.' Both texts use the same formula in a prophetic context. The principle is not Adventist innovation — it was the interpretive method of the Reformers, of Newton, of the entire Historicist school.",
          },
        ],
        christCentre:
          "The sanctuary of Daniel 8 is not the Jerusalem temple — it is the heavenly sanctuary of which the earthly was a copy (Heb 8:2, 5). Christ is the High Priest of that sanctuary (Heb 4:14). The 2,300 days are ultimately about his priestly work: after the 'little horn' power suppressed and substituted for Christ's mediation for centuries, the heavenly sanctuary ministry entered a new phase in 1844. This understanding — that the judgment of Daniel 7:9–14 and the sanctuary restoration of Daniel 8:14 are the same event, beginning in 1844 — is the conclusion historicist interpreters, particularly in the Adventist tradition, have drawn from this prophecy. It is one of the most significant and specific claims in the entire prophetic framework. Both visions point to Christ completing what no human priesthood can: the final atonement, the vindication of his people, the restoration of truth.",
        nextLesson: {
          book: "daniel",
          lesson: "daniel-9",
          title: "Daniel 9",
        },
      },
      {
        slug: "daniel-9",
        title: "Daniel 9",
        scriptureRef: "Daniel 9:1–27",
        readingTime: 10,
        keyVerse:
          "Know therefore and understand that from the going out of the word to restore and build Jerusalem to the coming of an anointed one, a prince, there shall be seven weeks.",
        keyVerseRef: "Daniel 9:25",
        intro:
          "Daniel 9 begins with prayer and ends with prophecy. Responding to Daniel's intercession, Gabriel delivers the most precise Messianic timetable ever written — naming the year of Christ's baptism, the year of his death, and the duration of his ministry.",
        sections: [
          {
            heading: "Daniel's Prayer (vv. 1–19)",
            body: "The chapter opens with Daniel reading Jeremiah's prophecy of 70 years of Babylonian captivity (Jer 25:11–12) and recognising the time was near. He responds not with calculation but with prayer — confessing Israel's sins, acknowledging God's righteousness, and pleading for restoration based on God's mercy, not Israel's merit. This context matters: the 70 weeks that follow are given in the context of God's faithfulness to his covenant people despite their unfaithfulness.",
          },
          {
            heading: "The 70 Weeks Explained (vv. 24–27)",
            body: "Gabriel arrives 'in swift flight' while Daniel is still praying. He gives 70 weeks (490 years) concerning Jerusalem and the Messiah. The starting point: 'from the going out of the word to restore and rebuild Jerusalem' — the decree of Artaxerxes in 457 BC (Ezra 7), confirmed by multiple independent ancient sources including the Elephantine Papyri. 69 weeks (483 years) to 'Messiah the Prince' = 457 BC + 483 = 27 AD — the exact year of Jesus' baptism (Luke 3:1, 21–23). 'In the midst of the week' (3.5 years in) = 31 AD — the year of the crucifixion (consistent with the 457 BC start date; scholars have also proposed 30 and 33 AD, but 31 AD produces the most internally coherent alignment across this entire prophecy). At the cross, sacrifice and offering ceased in their meaning — the veil tore (Matt 27:51). The 70th week ends at 34 AD — the stoning of Stephen and the formal extension of the gospel to the Gentiles (Acts 7–10).",
          },
          {
            heading: "Historical Verification",
            body: "The date of 457 BC does not rest on Adventist tradition. The Elephantine Papyri (Jewish documents from Egypt, discovered 1903–8) independently confirm the chronology of Artaxerxes I's reign. Ptolemaic records, Persian astronomical tablets, and Nehemiah 2's account all converge on 457 BC. The calculation produces 27 AD for Jesus' baptism — exactly when Luke places it, 'in the fifteenth year of Tiberius Caesar.' No other figure in history fits this timetable. The prophecy names Jesus with mathematical precision 500 years before his birth.",
          },
        ],
        christCentre:
          "Daniel 9:24–27 is the most detailed Messianic prophecy in the Hebrew Bible. It predicts: the year of his anointing (baptism), the year of his death ('cut off but not for himself' — he died as a substitute, not for his own sin), and the end of the Jewish civil period (34 AD). 'He shall cause sacrifice and offering to cease' — not by abolishing the law but by fulfilling it. His death rendered the sacrificial system obsolete. Every lamb that ever burned on an altar was pointing forward to this moment. Daniel saw it 500 years in advance.",
        nextLesson: {
          book: "daniel",
          lesson: "70-week-prophecy",
          title: "70 Week Prophecy",
        },
      },
      {
        slug: "70-week-prophecy",
        title: "70 Week Prophecy",
        scriptureRef: "Daniel 9:24–27",
        readingTime: 12,
        keyVerse:
          "Seventy weeks are decreed about your people and your holy city, to finish the transgression, to put an end to sin, and to atone for iniquity, to bring in everlasting righteousness.",
        keyVerseRef: "Daniel 9:24",
        intro:
          "The 70-week prophecy is the prophetic keystone of the entire Bible. It answers the question the whole Old Testament was asking: when will the Messiah come? The answer is given to the year — 500 years in advance.",
        sections: [
          {
            heading: "Six Objectives of the 70 Weeks (v. 24)",
            body: "Verse 24 lists six divine purposes for the 70-week period: (1) to finish the transgression — Israel's probationary period as a nation ends; (2) to put an end to sin — the atoning work of Christ; (3) to atone for iniquity — Calvary; (4) to bring in everlasting righteousness — the righteousness of Christ imputed to believers; (5) to seal both vision and prophet — the fulfilment of Daniel's vision validates the entire prophetic corpus; (6) to anoint a most holy place — the inauguration of the heavenly sanctuary ministry. All six are fulfilled in the life, death, and priestly ministry of Jesus.",
          },
          {
            heading: "The Structure of the 70 Weeks",
            body: "The 70 weeks divide into three segments: 7 weeks (49 years) for the rebuilding of Jerusalem; 62 weeks (434 years) to 'Messiah the Prince'; 1 final week (7 years) in which the covenant is confirmed and sacrifice ceases. Total: 490 years from 457 BC. Note that the 70th week is not a future event separated by a 2,000-year gap — that interpretation requires inserting a parenthesis the text does not contain. The 70 weeks run continuously, culminating in 34 AD when the gospel formally extends to the Gentiles.",
          },
          {
            heading: "Why Futurism Moves the 70th Week",
            body: "Futurist (dispensationalist) interpretation separates the 70th week from the first 69, inserting a 'Church Age gap' of indeterminate length and placing the 70th week at the end of history. This 'gap theory' was systematised by John Nelson Darby in the 1830s, building on the earlier futurist strategy of Jesuit scholar Francisco Ribera (1590) — who had first relocated the last 3.5 years of Daniel's 70th week to the end of time to deflect Protestant identification of the papacy. It has no explicit textual basis. The Hebrew text of Daniel 9 uses the conjunction waw to connect the 69th and 70th weeks sequentially. The Reformers, without exception, read all 70 weeks as continuous. The gap theory exists not because the text requires it, but because it is necessary to the futurist system.",
          },
        ],
        christCentre:
          "The 70-week prophecy is a telescope pointed at one man. 'Messiah the Prince' — the anointed ruler — appears at the exact year of Jesus' baptism. 'Cut off but not for himself' — he dies as a substitutionary sacrifice. 'Covenant confirmed' — his 3.5-year ministry was the fulfilment of the new covenant promised in Jeremiah 31. The phrase 'not for himself' is one of the most theologically rich in all of Daniel: it is a pre-Calvary definition of penal substitutionary atonement. He was cut off — not because of crime, not because of failure — but for others. For us.",
        nextLesson: {
          book: "daniel",
          lesson: "daniel-12",
          title: "Daniel 12",
        },
      },
      {
        slug: "daniel-12",
        title: "Daniel 12",
        scriptureRef: "Daniel 12:1–13",
        readingTime: 8,
        keyVerse:
          "At that time your people shall be delivered, everyone whose name shall be found written in the book.",
        keyVerseRef: "Daniel 12:1",
        intro:
          "Daniel 12 is the final chapter of the book and the culmination of everything that came before. It describes the close of the heavenly judgment, the greatest time of trouble, the resurrection, and Daniel's personal assurance of deliverance.",
        sections: [
          {
            heading: "Michael Stands Up (v. 1)",
            body: "'At that time Michael, the great prince who has charge of your people, will arise.' The phrase 'at that time' connects directly to the sequence of chapters 10–11. Michael 'arising' or 'standing up' — in the cultural context of ancient Near Eastern judicial proceedings, where a seated judge administered cases and a standing judge closed deliberation — suggests that this is not the beginning of action but the end of the intercessory phase. Historicist interpreters, particularly in the Adventist tradition, have consistently understood this as the close of probation: every case decided, every soul either sealed or lost. This is followed immediately by 'a time of trouble such as never has been since there was a nation.'",
          },
          {
            heading: "The Resurrection (vv. 2–3)",
            body: "'Many of those who sleep in the dust of the earth shall awake, some to everlasting life, and some to shame and everlasting contempt.' This is one of the clearest Old Testament statements of resurrection — and notably, it is connected to the end of the judgment period, not a separate event. Verse 3 promises that those who are wise — who understand — shall shine like the stars. Daniel is told at the very end of the chapter: 'you shall rest and shall stand in your allotted place at the end of the days' (v.13). The prophet who received all these visions was given his own personal resurrection promise.",
          },
          {
            heading: "The Sealed Prophecy and Time Periods (vv. 4–13)",
            body: "Daniel is told to 'shut up the words and seal the book, until the time of the end. Many shall run to and fro, and knowledge shall increase.' The prophecy was not meant for Daniel's generation — it was sealed for a later time. Three additional time periods are mentioned: 1,260 days (the recurring period of the little horn), 1,290 days, and 1,335 days. The slight extensions beyond 1,260 mark transition points in the close of the prophetic era. The 1,335-day recipient is pronounced 'blessed' — blessed, like those who see the meaning of all these things fulfilled.",
          },
        ],
        christCentre:
          "Scripture's cumulative portrait of Michael points toward Christ himself. He is the 'Prince of princes' (Dan 8:25), the one who contends for Moses' body (Jude 9), whose voice raises the dead (1 Thess 4:16). The Adventist tradition, along with many Reformation-era scholars, has understood Michael as Christ in his role as the divine warrior-defender of his people — not a created angel, but the eternal Son acting under this title. When Michael stands up, the intercessory phase ends — not as punishment, but as the moment when grace has done its full work and every soul has made its final choice. Then he comes. The stone of Daniel 2 strikes. The Son of Man of Daniel 7 descends with the clouds. The sanctuary of Daniel 8 is fully restored. Every vision in the book of Daniel converges on this moment: the return of Jesus Christ.",
        nextLesson: {
          book: "revelation",
          lesson: "seven-seals",
          title: "7 Seals",
        },
      },
    ],
  },
  {
    slug: "revelation",
    title: "Revelation",
    icon: "📖",
    description:
      "The Apocalypse of John — the culmination of all biblical prophecy, unfolding the cosmic conflict and Christ's final victory.",
    lessons: [
      {
        slug: "seven-seals",
        title: "7 Seals",
        scriptureRef: "Revelation 6–8:1",
        readingTime: 11,
        keyVerse:
          "And they cried out with a loud voice, 'O Sovereign Lord, holy and true, how long before you will judge and avenge our blood on those who dwell on the earth?'",
        keyVerseRef: "Revelation 6:10",
        intro:
          "The seven seals of Revelation chart the history of the Christian church from the apostolic era to the Second Coming — opened one by one by the Lamb who alone is worthy.",
        sections: [
          {
            heading: "The Sealed Scroll (Rev 5)",
            body: "Before the seals are opened, John weeps because no one is found worthy to open the scroll. Then the Lamb — 'as though it had been slain' — takes the scroll. Heaven erupts in worship. This context is essential: the seals are opened by Christ's authority, earned by his death. The entire sequence of history that follows is under his sovereign control.",
          },
          {
            heading: "Seals 1–4: The Four Horsemen",
            body: "The white horse (Seal 1) represents the apostolic church riding in victory — the gospel going forth pure. The red horse (Seal 2) represents the era of Roman persecution — 'peace was taken from the earth.' The black horse (Seal 3) represents spiritual famine — the darkening of the gospel during doctrinal corruption. The pale horse (Seal 4) is Death and Hades — the era of deepest apostasy, the Dark Ages. Each seal describes a stage in the spiritual history of the church, not isolated geopolitical events.",
          },
          {
            heading: "Seals 5–7: The Cry, the Signs, the Silence",
            body: "The fifth seal reveals the souls under the altar — martyred saints asking 'how long?' They are given white robes and told to rest a little longer. The sixth seal brings cosmic signs: earthquake, the sun darkened, the moon like blood, stars falling. Historicists see these as literal fulfillments: the Lisbon earthquake of 1755, the Dark Day of May 19, 1780, and the Leonid meteor storm of November 13, 1833. These are the signs Jesus himself said would precede his coming (Matt 24:29). The seventh seal opens to half an hour of silence — the awesome pause before the final event.",
          },
        ],
        christCentre:
          "The entire drama of the seven seals is framed by one decisive act: the Lamb takes the scroll (Rev 5:7). Everything that follows — every seal, every trial, every martyrdom, every cosmic sign — is under the authority of the crucified and risen Christ. The souls under the altar are not forgotten — they are given white robes. The martyrs of the Dark Ages were not abandoned — they are vindicated. The seventh seal's silence is not emptiness — it is the reverent hush before the King appears. The seals are not a calendar of disasters; they are a revelation of Christ's sovereignty over all of history.",
        nextLesson: {
          book: "revelation",
          lesson: "revelation-13",
          title: "Revelation 13",
        },
      },
      {
        slug: "revelation-13",
        title: "Revelation 13",
        scriptureRef: "Revelation 13:1–18",
        readingTime: 12,
        keyVerse:
          "It was allowed to make war on the saints and to conquer them. And authority was given it over every tribe and people and language and nation.",
        keyVerseRef: "Revelation 13:7",
        intro:
          "Revelation 13 introduces two beasts — one from the sea, one from the earth — representing the great powers of end-time deception. Understanding this chapter requires understanding Daniel 7.",
        sections: [
          {
            heading: "The Beast from the Sea (vv. 1–10)",
            body: "The sea beast has seven heads, ten horns, and bears the characteristics of Daniel's four beasts combined (leopard body, bear feet, lion mouth). It receives its seat and authority from the dragon (Satan). It was given a mouth 'speaking haughty and blasphemous words' and was allowed to exercise authority for 42 months — the same 1,260-day period as Daniel 7:25. One of its heads receives a 'mortal wound' that is healed. The entire world marvels and worships. This beast uses the same descriptors as Daniel 7's little horn: it blasphemes God, makes war on the saints, and exercises global authority. The Reformers consistently identified this power as Rome in its papal expression.",
          },
          {
            heading: "The Beast from the Earth (vv. 11–17)",
            body: "The second beast rises from the earth — a different origin than the sea (peoples, nations). It has two horns like a lamb but speaks like a dragon. It exercises all the authority of the first beast and causes the earth to worship the first beast. It performs signs, deceives, and enforces a mark — upon the right hand or forehead — without which no one can buy or sell. This land beast, arising after 1798 (when the sea beast received its wound), fits the profile of a later, initially lamb-like power: many scholars identify this with the United States of America, which arose in the land (New World), presented itself as Christian and liberty-loving, but whose role in end-time events involves enforcing religious conformity.",
          },
          {
            heading: "The Number of the Beast: 666 (v. 18)",
            body: "John calls for wisdom: 'Let the one who has understanding calculate the number of the beast, for it is the number of a man, and his number is 666.' The Greek and Hebrew practice of gematria (assigning numerical values to letters) was well known to John's readers. Reformation-era commentators noted that the title 'Vicarius Filii Dei' (Vicar of the Son of God) — a phrase appearing in certain historical documents associated with the papacy, including the medieval Donation of Constantine — calculates to 666 in Latin. While not a currently official papal title (the formal title is Vicarius Christi), this has been cited as one strand in the cumulative identification. The mark is not merely a number — it represents allegiance: to worship the beast is to accept its authority over conscience.",
          },
        ],
        christCentre:
          "Revelation 13 is ultimately about worship — who will be worshipped, and on what terms. The beast demands worship under threat of economic exclusion and death. But the Lamb of Revelation 5 earned worship by giving his life. The contrast is absolute: the beast takes; the Lamb gives. The beast's mark is a counterfeit of the seal of God (Rev 7:3). The fundamental question of the end times is not geopolitical — it is theological: will you worship the Creator (Rev 14:7) or the creature? Christ is the foundation of the true worship the beast seeks to counterfeit.",
        nextLesson: {
          book: "revelation",
          lesson: "revelation-14",
          title: "Revelation 14",
        },
      },
      {
        slug: "revelation-14",
        title: "Revelation 14",
        scriptureRef: "Revelation 14:1–20",
        readingTime: 11,
        keyVerse:
          "Here is a call for the endurance of the saints, those who keep the commandments of God and their faith in Jesus.",
        keyVerseRef: "Revelation 14:12",
        intro:
          "Revelation 14 is the last gospel proclamation before Christ returns — three angels with three messages that span the globe. Understanding these messages is essential to understanding the final generation.",
        sections: [
          {
            heading: "The 144,000 on Mount Zion (vv. 1–5)",
            body: "Before the three messages, John sees the 144,000 standing with the Lamb on Mount Zion — they have his name and his Father's name written on their foreheads. They sing a new song that no one else can learn. They are described as 'firstfruits' — not the only saved, but the first of the final harvest. They are those who 'follow the Lamb wherever he goes' — total loyalty, costly discipleship. This vision anchors the messages that follow: the final proclamation goes out because the Lamb is there, and his people know his voice.",
          },
          {
            heading: "The Three Angels' Messages (vv. 6–12)",
            body: "The First Angel proclaims the eternal gospel 'to every nation, tribe, language, and people' with the call to 'Fear God and give him glory, because the hour of his judgment has come; and worship him who made heaven and earth.' This is the judgment-hour message — the heavenly court of Daniel 7 is in session. The Second Angel announces 'Fallen, fallen is Babylon the great!' — a call to come out of the apostate system. The Third Angel warns with the loudest voice: those who worship the beast and receive his mark will drink the wine of God's wrath. The contrast is then stated in verse 12: the saints keep the commandments of God and the faith of Jesus.",
          },
          {
            heading: "The Harvest (vv. 14–20)",
            body: "The chapter closes with two harvests: one of grain (the righteous, gathered by the Son of Man), and one of grapes (the wicked, thrown into the great winepress of God's wrath). These are not sequential — they happen at the same moment: the Second Coming. The imagery is drawn from Joel 3 and parallels the parable of the wheat and tares. The harvest is massive — the blood rises as high as a horse's bridle for 1,600 stadia. This is symbolic language for total, comprehensive judgment. Nothing escapes. Every soul is either gathered to the Lamb or pressed in the winepress.",
          },
        ],
        christCentre:
          "Revelation 14 begins with the Lamb (v.1) and ends with the Son of Man on the cloud (v.14). The three angels' messages are not free-standing proclamations — they are the Lamb's final call to his people before he comes to gather them. The First Angel's message is the eternal gospel (v.6) — the same gospel that has always been the heart of Scripture, now proclaimed in its end-time urgency. The commandments of God and the faith of Jesus (v.12) are not two separate things — the commandments are kept by faith, and faith in Jesus produces obedience. The final generation is defined not by their own righteousness but by their total trust in his.",
        nextLesson: {
          book: "gospel",
          lesson: "love-for-god",
          title: "Love for God",
        },
      },
    ],
  },
  {
    slug: "gospel",
    title: "The Gospel",
    icon: "✝️",
    description: "Before the beasts, the seals, or the trumpets — there is the Lamb. Every prophecy in Daniel and Revelation finds its meaning in the person and work of Jesus Christ.",
    lessons: [
      {
        slug: "love-for-god",
        title: "Love for God",
        scriptureRef: "1 John 4:7–19",
        readingTime: 12,
        keyVerse: "We love because he first loved us.",
        keyVerseRef: "1 John 4:19",
        intro:
          "Before we can love God, we have to understand what kind of love we're dealing with. This is not the love of songs or films. This is something the world has no category for.",
        sections: [
          {
            heading: "What Kind of Love Is This?",
            contentBlocks: [
              {
                label: "The Four Greek Words for Love",
                text: "English flattens something the ancient Greeks mapped carefully. There are four words for love: storge (family affection), philia (friendship), eros (romantic love), and agape (unconditional, self-giving love). The New Testament uses agape almost exclusively when speaking of God's love — and for good reason. Agape is not love in response to lovability. It creates value in its object.",
              },
              {
                label: "ἀγάπη / agapē",
                text: "Unconditional, self-giving love. Used 116 times in the NT; defines God's essential nature (1 John 4:8).",
              },
              {
                label: "ἀγαπάω / agapaō",
                text: "To love unconditionally (verb form). John 3:16 — 'God so loved (agapaō) the world.'",
              },
              {
                label: "Key Theological Point",
                text: "The Bible does not say God is loving — as though love were one of His many qualities. It says 'God IS love' (1 John 4:8). Love is not something God does; it is what God is. This distinction matters enormously. If love were merely one attribute among many, God could theoretically set it aside. But if love is His essential nature, then His every act toward us — even judgment — flows from it.",
              },
              {
                label: "1 John 4:7–10 (ESV)",
                text: "\"Beloved, let us love one another, for love is from God, and whoever loves has been born of God and knows God. Anyone who does not love does not know God, because God is love. In this the love of God was made manifest among us, that God sent his only Son into the world, so that we might live through him. In this is love, not that we have loved God but that he loved us and sent his Son to be the propitiation for our sins.\"",
              },
              {
                label: "The Cross as the Definition of Love",
                text: "Notice the logic John uses. He does not define love abstractly and then say God matches the definition. He points to an event — the sending of the Son — and says: that is love. The cross is not an illustration of love. The cross is the definition.",
              },
            ],
          },
          {
            heading: "Why Did God Love Us? The Problem of Pre-emption",
            contentBlocks: [
              {
                label: "The Question Nobody Wants to Ask",
                text: "If God loved us before we loved Him, then His love is not a response to anything in us. Which raises an uncomfortable question: why did He love us at all? The answer lies in one small Greek word.",
              },
              {
                label: "πρῶτος / prōtos",
                text: "First, foremost. 1 John 4:19 — 'He first loved us' — not merely as a sequence but as an origin. God's love is not first chronologically; it is first as the fountainhead. All love that exists anywhere in the universe is downstream of His.",
              },
              {
                label: "Romans 5:8 (ESV)",
                text: "\"God shows his love for us in that while we were still sinners, Christ died for us.\"",
              },
              {
                label: "Historical Context",
                text: "In the Roman world, dying for a great person was considered the highest form of virtue. Paul's argument in Romans 5:7–8 is deliberately shocking: God did not die for the great. He died for sinners. He died for His enemies (v.10). No Roman virtue ethic had a category for this. Paul is not describing an elevated version of Roman honour — he is describing something that breaks the entire framework.",
              },
            ],
          },
          {
            heading: "The Triune Logic of Love",
            contentBlocks: [
              {
                label: "Why the Trinity Is Required by '1 John 4:8'",
                text: "'God is love' is one of the most sophisticated arguments for the Trinity in all of Scripture. Here is why: love requires an object. If God were a solitary being, He could not have been love before creation existed. He could have been potentially loving — but John doesn't say God can love. He says God IS love. For that to be eternally true, love must have existed within God's own being before a single creature existed.",
              },
              {
                label: "If God Were a Solitary Being...",
                text: "Love could only begin when creation existed. 'God is love' would be a future aspiration, not an eternal reality. We would be necessary to complete God. God's love would depend on having someone to love.",
              },
              {
                label: "Because God Is a Trinity...",
                text: "Love has existed eternally between Father, Son, and Spirit. 'God is love' describes His eternal, essential nature. We are the overflow of a love that needs nothing from us. God's love is the source from which all love flows.",
              },
              {
                label: "The Implication",
                text: "The Trinity is not a theological puzzle to solve. It is the only framework in which 'God is love' makes sense. We are not necessary to God. We are wanted. The difference between necessity and desire is the difference between a tool and a child.",
              },
            ],
          },
          {
            heading: "What Loving God Actually Looks Like",
            contentBlocks: [
              {
                label: "Matthew 22:37–39 (ESV)",
                text: "\"You shall love the Lord your God with all your heart and with all your soul and with all your mind. This is the great and first commandment. And a second is like it: You shall love your neighbour as yourself.\"",
              },
              {
                label: "καρδία / kardia",
                text: "Heart — the seat of will and decision (not merely emotion). Matthew 22:37 — love for God originates in the will, not the feelings.",
              },
              {
                label: "The Critical Mistake",
                text: "The most common mistake is thinking love for God is primarily an emotion we must conjure. But 'heart' in Hebrew and Greek thought is the seat of will and decision — not feeling. Feelings are the fruit of love, not the root. You cannot command a feeling. You can command a direction. Jesus is commanding the direction of your entire life toward God — and feelings, over time, follow.",
              },
              {
                label: "For 16–24s: The Honest Question",
                text: "How can I love someone I can't see? The Bible's answer is not 'try harder.' Look at the cross. You don't produce love for God — you receive it as you encounter His love for you (1 John 4:19). The more clearly you see what He did, the more naturally love arises. This is why studying the gospel isn't a warm-up act before the 'real' doctrine. It is the engine.",
              },
            ],
          },
          {
            heading: "Hard Questions Answered",
            contentBlocks: [
              {
                label: "Q: What if I just don't feel like I love God?",
                text: "A: John connects loving God to two things: keeping His commandments (1 John 5:3) and loving one another (1 John 4:20). Love is a direction to orient your life in — not a feeling to summon. If you are orienting your life toward obedience and community, you are loving God, even when the feeling is absent. Faith comes before feeling, and feeling follows.",
              },
              {
                label: "Q: Can I love God and still struggle with sin?",
                text: "A: Yes — 1 John was written specifically to people struggling with assurance of salvation. John's test is not perfection; it is the orientation of your life. The person who loves God struggles against sin; the person who does not care never fights it.",
              },
              {
                label: "Q: What does the Great Controversy have to do with love?",
                text: "A: Everything. Satan's original charge was that God was unlovable — that His law was arbitrary, that obedience was servitude, and that God was ultimately self-serving (Isaiah 14:12–15; Ezekiel 28:12–16). The entire universe watched to see if God's character was what He claimed. The cross is God's answer — not a verbal argument, but self-sacrifice. He answered Satan's charge by giving everything. Love vindicated.",
              },
            ],
          },
        ],
        christCentre:
          "Jesus is not just the messenger of God's love. He is the love of God made visible, tangible, and historical. John 1:14 says the Word became flesh — God's love put on skin. In the incarnation, life, death, and resurrection of Jesus, we see not a distant God sending a message, but a God who entered the suffering He could have avoided, to rescue people who had no capacity to rescue themselves. 'God is love' is not an abstraction. It has a face: Jesus of Nazareth.",
        nextLesson: {
          book: "gospel",
          lesson: "righteousness-by-faith",
          title: "Righteousness by Faith",
        },
      },
      {
        slug: "righteousness-by-faith",
        title: "Righteousness by Faith",
        scriptureRef: "Romans 3:21–4:8",
        readingTime: 13,
        keyVerse:
          "For our sake he made him to be sin who knew no sin, so that in him we might become the righteousness of God.",
        keyVerseRef: "2 Corinthians 5:21",
        intro:
          "This is the doctrine that sparked the Reformation, the doctrine Paul calls 'the gospel' (Romans 1:16–17), and the doctrine most Christians get subtly but fatally wrong.",
        sections: [
          {
            heading: "What Is Righteousness?",
            contentBlocks: [
              {
                label: "The English Word Misleads",
                text: "The English word 'righteousness' sounds like a personality trait — being a good, upright person. The biblical concept is more radical. It is about standing before God. Not character, but status.",
              },
              {
                label: "δικαιοσύνη / dikaiosynē",
                text: "Righteousness, right standing, justice. Romans 1:17 — 'the righteousness of God is revealed' — not our righteousness, but His. The word describes a legal and relational status, not just moral behaviour.",
              },
              {
                label: "צְדָקָה / tsedaqah",
                text: "Righteousness, covenant faithfulness (Hebrew). Genesis 15:6 — Abraham's faith was 'counted' as tsedaqah. The Hebrew concept is inseparable from covenant relationship.",
              },
              {
                label: "The Central Question of the Bible",
                text: "Righteousness means right standing before God — a legal and relational status that human beings cannot manufacture for themselves. The question 'How can a person be right before God?' is not a peripheral theological question. It is the question the entire Bible is answering.",
              },
            ],
          },
          {
            heading: "The Mechanism: How Does It Work?",
            contentBlocks: [
              {
                label: "Romans 4:3–5 (ESV)",
                text: "\"For what does the Scripture say? 'Abraham believed God, and it was counted to him as righteousness.' Now to the one who works, his wages are not counted as a gift but as his due. And to the one who does not work but believes in him who justifies the ungodly, his faith is counted as righteousness.\"",
              },
              {
                label: "λογίζομαι / logizomai",
                text: "To count, reckon, credit to an account. Romans 4:3 — this word appears 11 times in Romans 4 alone. It is accounting language: God credits righteousness to our account. Not earned wages — a gift entered into the ledger.",
              },
              {
                label: "The Accounting Metaphor",
                text: "Paul uses an accounting metaphor deliberately. God credits righteousness not to the one who earns it but to the one who trusts. This means the ground of our acceptance before God is not our track record. It is Christ's track record, transferred to our account at the moment of genuine faith.",
              },
              {
                label: "Justification Defined",
                text: "Justification is a forensic legal declaration — not a process of being made good, but a verdict of being declared right. It is instant at the moment of genuine trust. It is complete — nothing more is needed. The penalty of sin is cancelled. The guilt of sin is removed. This is the Reformation's recovered truth: sola fide — faith alone.",
              },
            ],
          },
          {
            heading: "Two Phrases That Change Everything",
            contentBlocks: [
              {
                label: "The Distinction Most Translations Flatten",
                text: "In Galatians 2:16 alone, two different Greek constructions appear side by side, and most English translations render both as 'faith in Jesus.' But the Greek is doing something more precise — and the difference is load-bearing.",
              },
              {
                label: "pistis eis Iēsoun — Faith IN Jesus",
                text: "Our faith directed toward Jesus as its object. Focus: our act of believing. 'I trust in Jesus.' This is our capacity to believe — which, frankly, is inconsistent and weak.",
              },
              {
                label: "pistis Iēsou — Faith OF Jesus",
                text: "Jesus's own faithfulness — His perfect trust in the Father throughout His life. Focus: Christ's faithful obedience. 'The faithfulness Jesus lived.' This is Christ's faithfulness given to us as a gift. See Galatians 2:20; Revelation 14:12; Romans 3:22.",
              },
              {
                label: "Galatians 2:20 (ESV)",
                text: "\"I have been crucified with Christ. It is no longer I who live, but Christ who lives in me. And the life I now live in the flesh I live by faith in the Son of God, who loved me and gave himself for me.\"",
              },
              {
                label: "Why This Matters",
                text: "The phrase 'faith of the Son of God' in Galatians 2:20 (pistis tou huiou tou theou) is a genitive construction — it can mean 'the faithfulness that the Son of God exercised.' Paul is saying: the life he lives now, he lives by the faithfulness Christ Himself exercised on his behalf. Our righteousness is not built on our fragile faith. It is built on Christ's unbreakable faithfulness.",
              },
            ],
          },
          {
            heading: "Justification AND Sanctification — Both Matter",
            contentBlocks: [
              {
                label: "Justification — Forensic",
                text: "A legal declaration. Positional — what I am in Christ. Instant — the moment of genuine faith. Imputed righteousness — Christ's record credited to me. Qualifies me for heaven. Past tense: I have been justified (Romans 5:1).",
              },
              {
                label: "Sanctification — Experiential",
                text: "A growing transformation. Progressive — what Christ is doing in me. Ongoing — a daily, lifelong process. Imparted righteousness — Christ's character reproduced in me. Fits me for heaven and witnesses to my justification. Present tense: I am being sanctified (1 Corinthians 1:18).",
              },
              {
                label: "Critical Warning",
                text: "There are two great errors in Protestant theology. Error 1: Collapsing justification into sanctification — making acceptance before God dependent on progress in holiness. This is legalism. Error 2: Separating sanctification from justification — treating growth in holiness as optional after being declared righteous. The root of the tree is justified; the fruit is sanctified. But a tree with no fruit is a dead tree (James 2:17). They are distinct but inseparable.",
              },
            ],
          },
          {
            heading: "Hard Questions Answered",
            contentBlocks: [
              {
                label: "Q: Doesn't this make behaviour irrelevant?",
                text: "A: Romans 6:1 — Paul anticipates this exact objection. 'Shall we go on sinning that grace may increase? By no means!' Genuine justifying faith is never alone. It always produces the desire and, progressively, the capacity for holy living. A person who treats justification as a licence to sin has not understood justification — they have misunderstood what faith is.",
              },
              {
                label: "Q: What about James 2? Doesn't he say faith without works is dead?",
                text: "A: Paul and James answer different questions. Paul: how is a sinner justified before God? James: how do you know if someone has genuine faith? Paul addresses the basis of justification; James addresses the evidence of genuine faith. They are perfectly consistent: genuine saving faith always produces works, but works are not the ground of justification.",
              },
              {
                label: "Q: What about the investigative judgment (Daniel 7:9–10, 8:14)?",
                text: "A: The investigative judgment examines the records to determine whether genuine faith was actually present in the life of each person. Christ's righteousness is the only ground of appeal. The judgment does not threaten the believer who rests in Christ — it vindicates them. The verdict of justification declared at conversion is upheld and publicly confirmed at the judgment.",
              },
            ],
          },
        ],
        christCentre:
          "Righteousness by faith is not a system — it is a Person. When Paul says in 1 Corinthians 1:30 that Christ 'became to us wisdom from God, righteousness and sanctification and redemption,' he is saying that every aspect of our standing before God is located in Jesus. We don't possess righteousness as a quality we have earned or even received and now own independently. We are righteous because we are in Christ. The moment we are in Him, His record becomes our record. His life, death, and resurrection are the substance of our justification.",
        nextLesson: {
          book: "gospel",
          lesson: "the-resurrection",
          title: "The Resurrection",
        },
      },
      {
        slug: "the-resurrection",
        title: "The Resurrection",
        scriptureRef: "1 Corinthians 15:1–28",
        readingTime: 15,
        keyVerse:
          "But in fact Christ has been raised from the dead, the firstfruits of those who have fallen asleep.",
        keyVerseRef: "1 Corinthians 15:20",
        intro:
          "Everything Christianity claims rises or falls with one historical event: the bodily resurrection of Jesus of Nazareth on the third day after His crucifixion. Paul doesn't soften this. He says if it didn't happen, your faith is worthless. So let's look at the evidence.",
        sections: [
          {
            heading: "Why the Resurrection Is Non-Negotiable",
            contentBlocks: [
              {
                label: "1 Corinthians 15:14,17,20 (ESV)",
                text: "\"If Christ has not been raised, then our preaching is in vain and your faith is in vain... If Christ has not been raised, your faith is futile and you are still in your sins... But in fact Christ has been raised from the dead, the firstfruits of those who have fallen asleep.\"",
              },
              {
                label: "ἀνάστασις / anastasis",
                text: "Resurrection — a standing up again. 1 Corinthians 15:21 — not a resuscitation to the same mortal life, but a transformation to new, imperishable, glorified life. The resurrection body is continuous with but transformed from the body that died.",
              },
              {
                label: "ἀπαρχή / aparchē",
                text: "Firstfruits — the first portion of a harvest that guarantees the rest is coming. 1 Corinthians 15:20 — Christ's resurrection is not an isolated miracle. It is the guarantee and the pattern of ours.",
              },
              {
                label: "Paul's Five Consequences of No Resurrection",
                text: "Paul makes the stakes explicit: (1) preaching is empty, (2) faith is empty, (3) the apostles are false witnesses about God, (4) believers are still in their sins, (5) those who died in Christ are eternally lost. The resurrection is not a peripheral belief. It is the load-bearing wall. Remove it and everything collapses.",
              },
            ],
          },
          {
            heading: "The Earliest Evidence: The 1 Corinthians 15 Creed",
            contentBlocks: [
              {
                label: "The Modern Sceptic's Argument",
                text: "Critics often argue that the resurrection is a legend — a story that grew in the decades following Jesus's death. The historical evidence obliterates this claim, starting with a creed embedded in 1 Corinthians 15 that Paul explicitly identifies as received tradition.",
              },
              {
                label: "1 Corinthians 15:3–7 (ESV)",
                text: "\"For I delivered to you as of first importance what I also received: that Christ died for our sins in accordance with the Scriptures, that he was buried, that he was raised on the third day in accordance with the Scriptures, and that he appeared to Cephas, then to the twelve. Then he appeared to more than five hundred brothers at one time, most of whom are still alive, though some have fallen asleep. Then he appeared to James, then to all the apostles.\"",
              },
              {
                label: "Historical Dating",
                text: "The words 'delivered' (paredōka) and 'received' (parelabon) are technical rabbinic terms for the transmission of established tradition. Paul received this creed from earlier sources. Non-Christian scholars including Gerd Lüdemann date this tradition to within 18–36 months of the crucifixion — approximately AD 32–35. Paul wrote 1 Corinthians around AD 55. The resurrection proclamation pre-dates the letter by two decades. There is no time for legend.",
              },
            ],
          },
          {
            heading: "Six Arguments for the Empty Tomb",
            contentBlocks: [
              {
                label: "Argument 1: The creed implicitly includes the empty tomb",
                text: "When Paul says Jesus 'was buried...then raised,' the burial-resurrection sequence presupposes that the body which was buried is the body which was raised — not left behind in the tomb. Resurrection in Jewish thought was always bodily.",
              },
              {
                label: "Argument 2: The tomb's location was publicly known",
                text: "Jerusalem had a population of roughly 80,000 at Passover. The crucifixion was public, and the burial site was known to both Jewish authorities and the Roman garrison. A movement claiming resurrection in Jerusalem would have been instantly and permanently refuted if the tomb still contained a body.",
              },
              {
                label: "Argument 3: Mark's passion narrative dates to within years of the events",
                text: "Oxford historian A.N. Sherwin-White established that legendary distortion of historical tradition requires a minimum of two full generations. Mark's passion narrative is far too early for legendary corruption to have occurred.",
              },
              {
                label: "Argument 4: The narrative's simplicity argues for authenticity",
                text: "Second-century apocryphal accounts of the resurrection describe elaborate visions, Jesus emerging from the tomb in overwhelming glory. Mark's account is stark and unadorned — women, an empty tomb, a young man in white, fear. That is how eyewitness testimony looks. That is not how legend reads.",
              },
              {
                label: "Argument 5: Women discovered the empty tomb",
                text: "In first-century Jewish and Roman culture, women's testimony was not legally admissible. Josephus states explicitly that women could not serve as witnesses in court. No one fabricating this story would have chosen women as the primary witnesses. The embarrassing detail argues powerfully for historical accuracy.",
              },
              {
                label: "Argument 6: The earliest Jewish polemic concedes the empty tomb",
                text: "Matthew 28:11–15: Jewish authorities circulated the counter-story that the disciples stole the body. This concedes the fundamental point — the tomb was empty. The debate was never about whether the tomb was empty. It was always about what happened to the body.",
              },
            ],
          },
          {
            heading: "The Post-Resurrection Appearances",
            contentBlocks: [
              {
                label: "What the Empty Tomb Establishes",
                text: "The empty tomb proves something remarkable happened. The post-resurrection appearances establish what. The 1 Corinthians 15 creed names specific individuals — Peter, the twelve, then more than 500 at once. 'Most of whom are still alive' is not a casual aside. It is an explicit legal invitation: go and verify this with living witnesses. This is testimony language, not mythology.",
              },
              {
                label: "The Appearances: What the Evidence Shows",
                text: "Historian Gary Habermas notes that the resurrection was 'the central proclamation of the early church from the very beginning.' Named, identifiable witnesses are cited. Two of the appearances — to Paul and to James — are to people who were sceptics or opponents before the resurrection. Paul was actively persecuting Christians; James was Jesus's own brother and a non-believer during Jesus's ministry (John 7:5). Both became foundational church leaders who were martyred for their testimony. Nobody knowingly dies for a lie they invented.",
              },
            ],
          },
          {
            heading: "Alternative Theories — and Why They Fail",
            contentBlocks: [
              {
                label: "Disciples stole the body (Matthew 28:15)",
                text: "Requires frightened, scattered disciples (who had fled at the arrest) to overpower a trained Roman guard unit, remove a 1–2 tonne sealed stone, steal the body — and then spend the rest of their lives dying for a lie they personally knew to be false. No serious historian holds this view.",
              },
              {
                label: "Wrong tomb theory (Kirsopp Lake, 1907)",
                text: "The disciples went to the wrong tomb in the dark and assumed resurrection. But both Jewish authorities and Romans knew the correct tomb and had every motive to produce the body immediately to end the movement. They never did.",
              },
              {
                label: "Swoon theory — Jesus survived the cross",
                text: "Roman executioners were professionals whose job was confirmed death. Crucifixion victims were stabbed to confirm death — John 19:34 records the spear thrust that produced blood and water, consistent with cardiac tamponade. A half-dead man could not roll away a 1–2 tonne sealed stone, overpower guards, walk on crucifixion wounds, and then inspire 'risen Lord' proclamations in his disciples.",
              },
              {
                label: "Hallucination theory",
                text: "Hallucinations are private, individual psychological events. The 1 Corinthians 15 creed records group appearances: twelve at once, then five hundred at once. Collective, consistent, contemporaneous hallucinations of this specificity — involving the same person, the same conversations, physical interaction — are not documented anywhere in the psychology literature.",
              },
              {
                label: "Legend theory",
                text: "The creedal tradition dates to within 18–36 months of the crucifixion. A.N. Sherwin-White demonstrated that 'not even two full generations' is enough time for legendary distortion to corrupt a solid historical core. The entire New Testament was written within one generation of the events it describes. There is no legendary gap.",
              },
            ],
          },
          {
            heading: "What the Resurrection Means Now",
            contentBlocks: [
              {
                label: "Acts 2:24 (ESV)",
                text: "\"God raised him up, loosing the pangs of death, because it was not possible for him to be held by it.\"",
              },
              {
                label: "God's verdict on the cross",
                text: "The resurrection is God's 'Amen' to the cross. It proves the sacrifice was accepted. If Christ had remained in the tomb, the cross would have been a defeat. The resurrection declares it a victory.",
              },
              {
                label: "The defeat of death itself",
                text: "Not a temporary reprieve — an ontological reversal. Death no longer has ultimate authority over those who are in Christ (1 Corinthians 15:54–55).",
              },
              {
                label: "The firstfruits guarantee",
                text: "Where Christ goes in His resurrection body, all who are in Him will follow. His resurrection is not a unique exception — it is the guarantee of the pattern (1 Corinthians 15:20–23).",
              },
              {
                label: "Makes intercession possible",
                text: "The risen Christ is right now interceding for us at the Father's right hand. He did not merely save us at the cross and disappear — He lives to intercede (Romans 8:34; Hebrews 7:25).",
              },
              {
                label: "Grounds Christian ethics",
                text: "Because death is defeated, we can live without fear. Because Christ is Lord, we can live with purpose. The resurrection is not just a past event — it is the foundation of the present life.",
              },
            ],
          },
        ],
        christCentre:
          "Jesus did not merely teach about life after death. He demonstrated it. He entered the tomb as every human being must — and He left it as no human being had. His resurrection is not a symbol of springtime or new beginnings. It is a dateable, historical, bodily event with named witnesses, legal and political consequences, and permanent cosmic significance. Because He lives, death for the believer is not a terminal event. It is a transition. The grave does not have the final word — the Risen Christ does.",
        nextLesson: {
          book: "gospel",
          lesson: "jesus-at-the-centre",
          title: "Jesus at the Centre",
        },
      },
      {
        slug: "jesus-at-the-centre",
        title: "Jesus at the Centre",
        scriptureRef: "John 5:39; Luke 24:27",
        readingTime: 14,
        keyVerse:
          "You search the Scriptures because you think that in them you have eternal life; and it is they that bear witness about me.",
        keyVerseRef: "John 5:39",
        intro:
          "The Bible is not a collection of inspiring stories, moral lessons, and prophecies about world events. It is one story — and it has one hero. Reading the Bible without finding Jesus is not just missing the point. Jesus says it is missing the entire purpose.",
        sections: [
          {
            heading: "Jesus's Own Hermeneutic",
            contentBlocks: [
              {
                label: "What Is Hermeneutics?",
                text: "Hermeneutics is the science of interpretation — the principles used to determine what a text means. Jesus had a specific hermeneutic, and He taught it explicitly. Before we can rightly interpret any part of Scripture, we need to understand the interpretive key He gave us.",
              },
              {
                label: "Luke 24:27 (ESV)",
                text: "\"And beginning with Moses and all the Prophets, he interpreted to them in all the Scriptures the things concerning himself.\"",
              },
              {
                label: "John 5:39 (ESV)",
                text: "\"You search the Scriptures because you think that in them you have eternal life; and it is they that bear witness about me.\"",
              },
              {
                label: "μαρτυρέω / martyreō",
                text: "To testify, bear witness — legal language. John 5:39 — the Scriptures' primary function is to testify — to give legal witness — to Christ. Not one of the Bible's purposes. The purpose.",
              },
              {
                label: "σκιά / σῶμα — skia / sōma",
                text: "Shadow / Body (substance). Colossians 2:17 — the OT practices are the shadow; the body (substance) belongs to Christ. A shadow is real. It has shape and form. But it is not the object itself.",
              },
              {
                label: "The Pharisees' Failure",
                text: "In Luke 24, Jesus walks two disciples through the entirety of the Hebrew scriptures and shows how each section pointed to Him. In John 5, He charges the Pharisees — who knew the biblical text with extraordinary precision — with missing its entire purpose. You can know the Bible forwards and backwards and still miss the point. The point is Jesus.",
              },
            ],
          },
          {
            heading: "The Shadow-to-Substance Pattern",
            contentBlocks: [
              {
                label: "Colossians 2:17",
                text: "Paul says the festivals, new moons, and Sabbaths of the OT ceremonial system 'are a shadow of the things to come, but the substance belongs to Christ.' A shadow is real — it has shape, it has form. But a shadow is not the object. God gave Israel types — real events, real people, real institutions — that carried the shape of the coming Christ. This is not allegory. It is typology — and Jesus Himself teaches it.",
              },
              {
                label: "Adam (Genesis 1–3)",
                text: "First man, head of humanity. Antitype: Christ — the Last Adam, head of a new humanity (Romans 5:14–21; 1 Corinthians 15:45).",
              },
              {
                label: "The Passover Lamb (Exodus 12)",
                text: "Blood on the doorpost protects from judgment. Antitype: Christ — 'our Passover lamb has been sacrificed' (1 Corinthians 5:7; John 1:29).",
              },
              {
                label: "The Bronze Serpent (Numbers 21:8–9)",
                text: "Lifted up to heal the dying. Antitype: Christ — 'as Moses lifted up the serpent, so must the Son of Man be lifted up' (John 3:14).",
              },
              {
                label: "The Day of Atonement (Leviticus 16)",
                text: "The High Priest enters the Most Holy Place once a year with blood. Antitype: Christ — our High Priest who entered heaven itself with His own blood (Hebrews 9:11–12).",
              },
              {
                label: "Manna in the Wilderness (Exodus 16)",
                text: "Bread from heaven sustains life in the desert. Antitype: Christ — 'I am the bread of life that came down from heaven' (John 6:32–35).",
              },
              {
                label: "David (2 Samuel 7)",
                text: "King after God's own heart, promised an eternal dynasty. Antitype: Christ — Son of David, the eternal King (Matthew 22:41–45; Revelation 22:16).",
              },
              {
                label: "Daniel (Daniel 1)",
                text: "Faithful exile who refused to be reprogrammed by Babylon. Antitype: Christ — the greater Daniel who entered this world (the greater Babylon), refused every Satanic reprogramming, and was vindicated by the Father.",
              },
              {
                label: "The Sanctuary System",
                text: "Priesthood, sacrifice, and intercession — the entire system pointing forward. Antitype: Christ — Lamb, Priest, and Sanctuary all in one (Hebrews 8–10).",
              },
            ],
          },
          {
            heading: "Why Getting This Wrong Leads to Moralism",
            contentBlocks: [
              {
                label: "The Moralism Test",
                text: "Here is a practical test for any Bible teaching: if you removed Jesus entirely from the message, could the audience still walk away with a practical takeaway? If yes — Jesus has not been sufficiently embedded. 'Be like Daniel' is moralism. 'Receive the faithfulness of Jesus — which is what Daniel himself was pointing to' is the gospel.",
              },
              {
                label: "Daniel — Moralistic vs Christ-Centred",
                text: "Moralism: 'Daniel refused the king's food — so should you.' Christ-centred: 'Daniel points to Jesus, who refused every Satanic provision and was faithful where Daniel could only be faithful in glimpses.'",
              },
              {
                label: "David — Moralistic vs Christ-Centred",
                text: "Moralism: 'David trusted God with Goliath — so should you.' Christ-centred: 'David is a type; Christ is the King who defeated the ultimate enemy — sin and death — where David's victories were temporary.'",
              },
              {
                label: "Moses — Moralistic vs Christ-Centred",
                text: "Moralism: 'Moses led the people out of slavery — be a leader.' Christ-centred: 'Moses is a type; Christ is the greater Deliverer who leads humanity out of slavery to sin.'",
              },
              {
                label: "Esther — Moralistic vs Christ-Centred",
                text: "Moralism: 'Esther had courage — be courageous.' Christ-centred: 'Esther points to Christ, who like her entered the presence of the King uninvited, at the risk of death, to intercede for His people.'",
              },
              {
                label: "Paul — Moralistic vs Christ-Centred",
                text: "Moralism: 'Paul was faithful despite suffering — endure suffering.' Christ-centred: 'Paul's endurance flows from Christ's strength, not his own. Philippians 4:13 — through Him who gives me strength.'",
              },
            ],
          },
          {
            heading: "The One Biblical Storyline",
            contentBlocks: [
              {
                label: "Why This Matters Practically",
                text: "From Genesis to Revelation, there is one unfolding story. Understanding this prevents reading Bible passages as disconnected moral episodes. Every text is a scene in a story — and if you don't know the story, you will misread the scene.",
              },
              {
                label: "Creation",
                text: "God creates humanity in His image, to live in love-relationship with Him (Genesis 1–2). The world is good. The relationship is whole.",
              },
              {
                label: "Fall",
                text: "Humanity chooses autonomy over trust. Sin enters. The image is damaged. Death is introduced. The relationship is broken (Genesis 3).",
              },
              {
                label: "Promise",
                text: "Immediately, God promises a Deliverer who will crush the serpent (Genesis 3:15 — the protoevangelium, the 'first gospel'). The rest of the Bible is this promise being progressively and specifically revealed.",
              },
              {
                label: "Israel",
                text: "God calls a people through whom the promise will come, gives them the Law (revealing the standard Christ will meet), the sacrificial system (typifying the sacrifice Christ will make), and the prophecies (specifying who Christ will be and when He will come).",
              },
              {
                label: "Incarnation",
                text: "The Word becomes flesh. Jesus of Nazareth enters the story as its long-promised hero. 'When the fullness of time had come, God sent forth his Son' (John 1:14; Galatians 4:4–5).",
              },
              {
                label: "Cross and Resurrection",
                text: "Christ meets the standard the Law required, makes the sacrifice the system pointed toward, defeats death, and vindicates the character of God before the watching universe.",
              },
              {
                label: "Church Age",
                text: "The gospel goes to every nation. The Spirit applies the work of Christ to human hearts. The great controversy between Christ and Satan is in its final phase.",
              },
              {
                label: "Consummation",
                text: "Christ returns, the dead are raised, the wicked are judged, the righteous receive the promised inheritance, and God dwells with humanity in a restored creation (Revelation 21–22). The story ends where it began — but better. The garden becomes a city. The relationship is restored, but now it is indestructible.",
              },
              {
                label: "Revelation 22:13 (ESV)",
                text: "\"I am the Alpha and the Omega, the first and the last, the beginning and the end.\" Jesus is not just the beginning and end chronologically. He is the interpretive lens of everything in between.",
              },
            ],
          },
          {
            heading: "How to Read Scripture with Jesus as the Key",
            contentBlocks: [
              {
                label: "A Four-Step Method for Any Old Testament Passage",
                text: "This is practical. Here is a framework for reading any OT text with Christ-centred eyes — without descending into allegory or losing the original meaning.",
              },
              {
                label: "Step 1: Text",
                text: "What does this passage say in its original, literal sense? Who wrote it, to whom, and what did it mean to the original audience? Start here. Never skip this step.",
              },
              {
                label: "Step 2: Type",
                text: "What is the typological shape of this text? What person, event, or institution is functioning as a shadow pointing forward?",
              },
              {
                label: "Step 3: Christ",
                text: "Where did Jesus live this out at a deeper level? What is the corresponding substance in His life, death, or resurrection? What did the type become in Him?",
              },
              {
                label: "Step 4: You",
                text: "What does this mean for your life — not 'try to be like the OT figure,' but 'receive the reality that OT figure was pointing to.' You don't imitate Daniel; you receive the faithfulness of Christ that Daniel prefigured.",
              },
              {
                label: "Q: Isn't this reading Jesus into texts that aren't about Him?",
                text: "A: There is an important difference between responsible typology and free-form allegory. Typology identifies structural correspondences that the NT authors themselves make explicit — Paul on Adam, Hagar, Melchizedek, the sanctuary; Hebrews on the priesthood and sacrifice. These are apostolic interpretation, grounded in Jesus's own teaching in Luke 24. We are not inventing connections. We are following the interpretive tradition Jesus established.",
              },
              {
                label: "Q: What about the prophetic books — aren't they mainly about history?",
                text: "A: The prophets address historical situations, but always within covenant faithfulness and eschatological hope. Isaiah 53, Micah 5:2, Zechariah 9:9, Psalm 22 — these were recognised as messianic before their historical fulfilment. The prophets were not historians with occasional predictions. They were covenant theologians who saw all of history through the lens of God's redemptive purpose.",
              },
            ],
          },
        ],
        christCentre:
          "Revelation 19:10 says 'the testimony of Jesus is the spirit of prophecy.' This means prophecy — all of it — exists to give testimony about Jesus. If you are studying prophecy and not finding Jesus, you have not yet found the point. He is the Lamb slain (Revelation 5:6), the High Priest interceding (Hebrews 7:25), the King who is coming (Revelation 19:11–16), the Judge whose verdict is grace (Daniel 7:22), and the New Creation's light (Revelation 21:23). Every study on Plain Prophecy is built on this conviction: prophecy stripped of Christ is not prophecy at all. It is map-reading with no destination.",
        nextLesson: {
          book: "gospel",
          lesson: "the-sabbath",
          title: "The Sabbath",
        },
      },
      {
        slug: "the-sabbath",
        title: "The Sabbath",
        scriptureRef: "Genesis 2:1–3; Mark 2:27–28",
        readingTime: 18,
        keyVerse:
          "The Sabbath was made for man, not man for the Sabbath. So the Son of Man is lord even of the Sabbath.",
        keyVerseRef: "Mark 2:27–28",
        intro:
          "Most debates about the Sabbath start in the wrong place — with rules, with which day, with what you can and can't do. Start here instead: what kind of God carves a day out of time and gives it to the people He loves?",
        sections: [
          {
            heading: "The Sabbath Was Born From Joy, Not Law",
            contentBlocks: [
              {
                label: "Genesis 2:1–3 (ESV)",
                text: "\"Thus the heavens and the earth were finished, and all the host of them. And on the seventh day God finished his work that he had done, and he rested on the seventh day from all his work that he had done. So God blessed the seventh day and made it holy, because on it God rested from all his work that he had done in creation.\"",
              },
              {
                label: "שָׁבַת shavat",
                text: "To cease — rest from completion, not exhaustion. Gen. 2:2 — God is not tired; He is finished and satisfied. This is the rest of an artist stepping back from a masterpiece.",
              },
              {
                label: "קָדַשׁ qadash",
                text: "To sanctify — to set apart as holy. Gen. 2:3 — the only element of the creation week declared holy before the fall. Holiness precedes sin, not as a remedy for it but as an original design.",
              },
              {
                label: "",
                text: "Creation follows a pattern: God forms a space, then fills it. Sky, then birds. Sea, then fish. Land, then animals. But the seventh day breaks the pattern. God creates a space that is not material — not sky, sea, or soil — and fills it not with objects but with Himself. His presence is what the Sabbath is made of.",
              },
              {
                label: "",
                text: "Notice what this means for human beings. Adam and Eve were created on the sixth day. Their first full day of existence — before they had done a single hour of work, before they had contributed anything to creation — was the Sabbath. They rested before they worked. They received before they gave. They were loved before they could produce anything.",
              },
              {
                label: "The Theology Built Into the Sequence",
                text: "The Sabbath inscribes into the fabric of human existence the truth that the gospel would later make explicit: we are creatures of grace before we are creatures of effort. 'We love because he first loved us' (1 John 4:19). The Sabbath is not the reward after a week of good work. It is the starting point — the weekly reset back to our foundational identity as loved, not earners.",
              },
            ],
          },
          {
            heading: "Two Foundations: Creation and Liberation",
            contentBlocks: [
              {
                label: "",
                text: "The fourth commandment appears twice in Scripture. Most people know one version. Fewer notice that the second gives a completely different reason — and the difference is not a contradiction. It is a revelation.",
              },
              {
                label: "Exodus 20:8–11 — Creation Foundation",
                text: "\"Remember the Sabbath day, to keep it holy.\" You rest because God rested — creation is the precedent. Grounded in God as Creator. Identity: you are a creature made in love.",
              },
              {
                label: "Deuteronomy 5:12–15 — Liberation Foundation",
                text: "\"Observe the Sabbath day, to keep it holy. You shall remember that you were a slave in Egypt, and the Lord your God brought you out from there with a mighty hand.\" You rest because you were once a slave who could never rest — liberation is the precedent. Grounded in God as Liberator. Identity: you are a freed person, not a slave.",
              },
              {
                label: "זָכַר zakar",
                text: "To remember — active, embodied re-enactment. Deut. 5:15 — not nostalgic recall but living memory. The Sabbath is a weekly act of re-living liberation.",
              },
              {
                label: "",
                text: "The Exodus story is about physical slavery in Egypt. But the New Testament reframes the pattern: 'Everyone who commits sin is a slave to sin' (John 8:34). The anxiety of proving your worth, the pressure to perform for acceptance, the exhaustion of producing your own security — this is bondage. The Sabbath is God interrupting that system every seven days with the same message He delivered at the Red Sea: you are already free. Stop. Receive. Rest.",
              },
              {
                label: "The Sabbath as Social Justice",
                text: "Deuteronomy 5:14 names who must rest: 'your male servant and your female servant... that your male servant and your female servant may rest as well as you.' In the ancient world, slaves worked every day with no respite. God's command that servants rest on the Sabbath was one of the earliest pieces of labour law in human history — a built-in economic equaliser. On the Sabbath, the landowner and the servant stopped together. The Sabbath was countercultural from the moment it was given.",
              },
            ],
          },
          {
            heading: "Two Different Laws — A Framework You Need",
            contentBlocks: [
              {
                label: "",
                text: "Before we go any further, we need to establish a distinction that will answer half the objections people raise about the Sabbath. The Bible describes two separate law systems in ancient Israel — and confusing them is the source of most of the confusion about the Sabbath.",
              },
              {
                label: "The Moral Law — Ten Commandments",
                text: "Written by the finger of God in stone (Ex. 31:18; Deut. 9:10). Placed inside the ark of the covenant (Deut. 10:5). Reflects God's eternal, unchanging character. Pre-dates Sinai: the Sabbath from creation (Gen. 2:3), murder wrong before Sinai (Gen. 4:10). Governs the Creator-creature relationship universally. Not abolished at the cross — no text says it was. Jesus: 'Do not think I came to abolish the Law' (Matt. 5:17).",
              },
              {
                label: "The Ceremonial Law — Laws of Moses",
                text: "Written by Moses in a book (Deut. 31:24; 2 Chron. 35:12). Placed beside the ark — outside it (Deut. 31:26). Pointed forward to Christ's sacrifice — types and shadows. Given at Sinai specifically for Israel's ceremonial life. Regulated priesthood, sacrifices, feasts, and cleansing rites. Fulfilled and completed at the cross: Col. 2:14 — 'nailing it to the cross.' Paul: 'the law of commandments expressed in ordinances' abolished (Eph. 2:15).",
              },
              {
                label: "Why This Matters",
                text: "When Paul writes about the law being abolished, nailed to the cross, or done away with (Col. 2:14; Eph. 2:15), he is speaking about the ceremonial law — the handwritten ordinances, the sacrificial system, the annual festivals. He is not touching the Ten Commandments, written in stone by God's own finger and placed inside the ark. Every argument that uses 'Paul said the law is abolished' to remove the Sabbath must also remove 'do not murder', 'do not commit adultery', and 'honour your father and mother.' Nobody is prepared to do that — because the argument doesn't hold.",
              },
            ],
          },
          {
            heading: "Jesus and the Sabbath: The Lord Who Kept It",
            contentBlocks: [
              {
                label: "",
                text: "Jesus is the Christian's ultimate example. Whatever He did, we are called to imitate — 'Whoever says he abides in him ought to walk in the same way in which he walked' (1 John 2:6). Jesus was a Sabbath keeper. Every week. Without exception.",
              },
              {
                label: "Luke 4:16 (ESV) — His Custom",
                text: "\"And he came to Nazareth, where he had been brought up. And as was his custom, he went to the synagogue on the Sabbath day, and he stood up to read.\"",
              },
              {
                label: "εἴωθεν eiōthen",
                text: "His custom — an ingrained, habitual practice. Luke 4:16 — the same word used of Paul's Sabbath practice in Acts 17:2. Not occasional compliance but a defining rhythm of life.",
              },
              {
                label: "Matthew 5:17–19 (ESV) — He Did Not Abolish the Law",
                text: "\"Do not think that I have come to abolish the Law or the Prophets; I have not come to abolish them but to fulfil them. For truly, I say to you, until heaven and earth pass away, not an iota, not a dot, will pass from the Law until all is accomplished. Therefore whoever relaxes one of the least of these commandments and teaches others to do the same will be called least in the kingdom of heaven.\"",
              },
              {
                label: "πληρόω plēroō",
                text: "To fulfil — to bring to full expression, complete. Matt. 5:17 — fulfil does not mean terminate. You fulfil a promise by keeping it, not by cancelling it. Jesus fulfilled the law by living it perfectly and embodying its deepest meaning.",
              },
              {
                label: "The 'Fulfil = Abolish' Error",
                text: "The most common misreading of Matthew 5:17 is to treat 'fulfil' as a synonym for 'terminate.' But this is linguistically unsupportable. Plēroō means to fill to the full — to bring something to its complete expression. When a prophecy is 'fulfilled', it is not cancelled; it is confirmed. Jesus fulfilled the moral law by living it perfectly (John 15:10 — 'I have kept my Father's commandments'). This does not end the law — it demonstrates what the law always meant when lived from the inside out.",
              },
              {
                label: "Mark 2:27–28 (ESV) — Lord of the Sabbath",
                text: "\"The Sabbath was made for man, not man for the Sabbath. So the Son of Man is lord even of the Sabbath.\" Jesus responds to the Pharisees' legalistic perversion with two statements. First: the Sabbath is a gift, not a punishment — it was made for humanity. Second: He is its Lord. This is a claim of ownership and authority, not abolition.",
              },
              {
                label: "John 15:10 (ESV) — All His Father's Commandments",
                text: "\"If you keep my commandments, you will abide in my love, just as I have kept my Father's commandments and abide in his love.\" Jesus kept His Father's commandments. The fourth commandment is the Father's commandment. The Pharisees' charges of Sabbath-breaking were false — He broke their traditions, not the commandment.",
              },
              {
                label: "Sabbath Healing: Man with a withered hand (Matt. 12:9–13)",
                text: "It is lawful to do good on the Sabbath — the day is for restoration.",
              },
              {
                label: "Sabbath Healing: Bent-over woman (Luke 13:10–17)",
                text: "Sabbath is liberation — Jesus calls her 'a daughter of Abraham bound by Satan.'",
              },
              {
                label: "Sabbath Healing: Man at Bethesda (John 5:1–9)",
                text: "The Creator gives life on His own day — Sabbath and creation power are linked.",
              },
              {
                label: "Sabbath Healing: Man born blind (John 9:1–7)",
                text: "Jesus forms clay to heal — an echo of Genesis 2:7; creation and re-creation converge on the Sabbath.",
              },
              {
                label: "Sabbath Healing: Man with dropsy (Luke 14:1–6)",
                text: "Mercy is always appropriate on the Sabbath — Jesus challenges their logic with an ox in a pit.",
              },
              {
                label: "Luke 23:54–56 (ESV) — Rested in the Tomb",
                text: "\"It was the day of Preparation, and the Sabbath was beginning... On the Sabbath they rested according to the commandment.\" After the cross — the most devastating event in cosmic history — the disciples kept the Sabbath. And Jesus Himself lay in the tomb through those sacred hours. Both great works — creation and redemption — were sealed with Sabbath rest.",
              },
            ],
            christCentre:
              "Jesus did not teach about the Sabbath from a distance. He inhabited it every week of His life. He restored its meaning by healing on it, teaching on it, and resting in it after Calvary. He is its Lord because He is its Maker — 'all things were made through him, and without him was not any thing made that was made' (John 1:3). Every Sabbath we keep is a declaration that our Creator is also our Redeemer, and that His finished work is enough.",
          },
          {
            heading: "Hebrews 4:9 — The Most Overlooked Proof Text",
            contentBlocks: [
              {
                label: "",
                text: "There is a verse in the New Testament — written after the resurrection, to a Christian audience — that makes the continuing obligation of the Sabbath as explicit as language allows. It is quoted less often than it deserves to be.",
              },
              {
                label: "Hebrews 4:9 (NASB)",
                text: "\"There remains therefore a sabbatismos for the people of God.\"",
              },
              {
                label: "σαββατισμός sabbatismos",
                text: "Sabbath observance — Sabbath-keeping. Heb. 4:9 — appears nowhere else in the entire New Testament. This is not the generic Greek word for rest (anapausis or katapausis). The author chose a word that can only mean: the keeping of the Sabbath. In every known occurrence in early Christian and Jewish literature (Plutarch, Justin Martyr, Epiphanius, Martyrdom of Peter and Paul) it means the observance of the Sabbath day itself.",
              },
              {
                label: "",
                text: "The word 'remains' (Greek: apoleipetai) is equally significant. It means something that continues to be in force — something left over, not yet completed. The writer is not pointing backward to a shadow that has passed. He is pointing forward to an ongoing reality for Christians: Sabbath observance remains for the people of God.",
              },
              {
                label: "What Hebrews 4 Is Actually Arguing",
                text: "The full context of Hebrews 3–4 is an argument that the Israelites who entered Canaan under Joshua did not enter the full rest God intended — they received the land, but they failed in the spiritual rest of trusting God completely. The writer then says: that rest still remains, and the Sabbath is its ongoing sign and weekly rehearsal. Far from abolishing the Sabbath, Hebrews 4:9 reaffirms it as the continuing mark of the people who rest in God's finished work by faith.",
              },
            ],
          },
          {
            heading: "The Disciples Kept It After the Resurrection",
            contentBlocks: [
              {
                label: "",
                text: "If the cross abolished the Sabbath, the disciples — who lived through the cross — were the first people who should have stopped keeping it. They did not.",
              },
              {
                label: "Acts 13:14",
                text: "Paul and Barnabas 'went into the synagogue on the Sabbath day and sat down.' No qualifier, no apology, no sense that this required justification.",
              },
              {
                label: "Acts 13:42–44",
                text: "After preaching, the Gentiles begged Paul to speak again 'on the next Sabbath.' The whole city gathered. If Paul believed Sunday was now the Christian day of worship, this was the perfect moment to say so. He said nothing.",
              },
              {
                label: "Acts 16:13",
                text: "'On the Sabbath day we went outside the gate to the riverside, where we supposed there was a place of prayer.' This is Philippi — a Roman colony with almost no Jewish population. Paul had no social or cultural incentive to keep the Sabbath here. He kept it anyway.",
              },
              {
                label: "Acts 17:2",
                text: "'Paul went in, as was his custom, and on three Sabbath days he reasoned with them from the Scriptures.' His custom — eiōthen, the identical word used of Jesus in Luke 4:16.",
              },
              {
                label: "Acts 18:4",
                text: "'He reasoned in the synagogue every Sabbath, and tried to persuade Jews and Greeks.' Every Sabbath, in every city, among both Jews and Gentiles. For decades.",
              },
              {
                label: "The Argument from Silence",
                text: "In the entire New Testament — covering three decades of post-resurrection apostolic life — there is not one instruction to begin worshipping on Sunday, not one statement that the Sabbath has been transferred to the first day, and not one rebuke of Sabbath observance as obsolete. The apostles simply kept it. Week after week. City after city. Jew and Gentile together. The burden of proof rests entirely with those who claim the Sabbath was changed.",
              },
            ],
          },
          {
            heading: "The Sunday Texts — What They Actually Say",
            contentBlocks: [
              {
                label: "",
                text: "Four New Testament texts are regularly cited as evidence for Sunday worship in the apostolic era. Each requires careful examination.",
              },
              {
                label: "Objection: Jesus rose on Sunday — the resurrection changed everything.",
                text: "This sounds reasonable, but it has a fatal problem: no New Testament author ever makes it. Not one apostle, in any letter or sermon, connects the resurrection to a change of the weekly worship day. The resurrection is celebrated in the NT — but it is celebrated every day (Acts 2:46 — daily breaking of bread; Romans 6:4 — baptism as resurrection participation), not specifically on Sunday. The connection of the resurrection to Sunday as a worship day is a post-apostolic inference, not apostolic instruction.",
              },
              {
                label: "Objection: Acts 20:7 — 'On the first day of the week, when we were gathered together to break bread...'",
                text: "By Jewish reckoning — which Paul used — 'the first day of the week' began at sunset on what we call Saturday night. This was a farewell meeting the night before Paul's departure (v.7 — he was leaving the next morning). 'Breaking bread' in Acts is not restricted to any day — Acts 2:46 records the disciples breaking bread daily. Paul preached until midnight because he was leaving — this is a special farewell gathering, not a regular Sunday worship service.",
              },
              {
                label: "Objection: 1 Corinthians 16:2 — 'On the first day of every week, each of you is to put something aside and store it up.'",
                text: "Paul is instructing each person to set money aside privately — at their own home — in preparation for the collection he will gather when he arrives. There is no gathering mentioned, no corporate assembly, no worship service. This is personal financial discipline, not public corporate worship. Using it to prove Sunday worship is as logical as using 'pray without ceasing' (1 Thess. 5:17) to prove continuous worship replaces all fixed days.",
              },
              {
                label: "Objection: Revelation 1:10 — 'I was in the Spirit on the Lord's Day.'",
                text: "The Bible itself never calls Sunday 'the Lord's Day.' The only day in Scripture that God explicitly names as His own is the Sabbath — 'my holy day' (Isaiah 58:13), 'the Sabbath of the Lord your God' (Ex. 20:10). Jesus called Himself 'Lord of the Sabbath' (Mark 2:28) — making the Sabbath the Lord's Day by explicit biblical identification. The connection of 'the Lord's Day' to Sunday does not appear in Christian writing until the late second century.",
              },
            ],
          },
          {
            heading: "Colossians 2:16 — The Ceremonial Triad",
            contentBlocks: [
              {
                label: "Colossians 2:16–17 (ESV)",
                text: "\"Therefore let no one pass judgement on you in questions of food and drink, or with regard to a festival or a new moon or a Sabbath. These are a shadow of the things to come, but the substance belongs to Christ.\"",
              },
              {
                label: "",
                text: "This is the most commonly cited text against the Sabbath. But a careful reading — with the Old Testament pattern in view — demolishes the argument. The triad 'festival / new moon / sabbath' is a technical formula in the Old Testament for the annual ceremonial calendar. It appears this way in six OT passages — always referring to the feasts and the special ceremonial sabbaths attached to them, never to the weekly creation Sabbath.",
              },
              {
                label: "1 Chronicles 23:31",
                text: "Burnt offerings on Sabbaths, new moons, and appointed feasts — Levitical temple duties. Ceremonial calendar only.",
              },
              {
                label: "2 Chronicles 2:4",
                text: "Sabbaths, new moons, and appointed feasts of the Lord — context of building the temple. Annual ceremonial schedule.",
              },
              {
                label: "2 Chronicles 31:3",
                text: "Sabbaths, new moons, and the appointed feasts — Hezekiah's reforms restoring temple ceremonial rites.",
              },
              {
                label: "Nehemiah 10:33",
                text: "Sabbaths, new moons, and appointed feasts — covenant renewal, re-instituting the ceremonial calendar.",
              },
              {
                label: "Ezekiel 45:17",
                text: "Feasts, new moons, and Sabbaths — ceremonial system in prophetic vision.",
              },
              {
                label: "Hosea 2:11",
                text: "Her feast days, her new moons, her Sabbaths — ceremonial days God would stop, not the weekly Sabbath.",
              },
              {
                label: "The Shadow Argument — Turned Around",
                text: "Paul says the ceremonial observances are 'a shadow of things to come, but the substance belongs to Christ' (v.17). The ceremonial sabbaths — Day of Atonement, Feast of Tabernacles sabbaths, etc. — were shadows pointing to Christ's work. Christ is their substance. But the weekly Sabbath from Genesis 2 is not a shadow of Christ's work — it is a memorial of creation and liberation. It does not point forward to Christ as a type; it points backward to the character of a God who creates and liberates. That is why it stands after the cross.",
              },
            ],
          },
          {
            heading: "Galatians 4:10 — Days, Months, Seasons, and Years",
            contentBlocks: [
              {
                label: "Galatians 4:8–10 (ESV)",
                text: "\"Formerly, when you did not know God, you were enslaved to those that by nature are not gods. But now that you have come to know God... how can you turn back again to the weak and worthless elementary principles of the world, whose slaves you want to be once more? You observe days and months and seasons and years!\"",
              },
              {
                label: "στοιχεῖα stoicheia",
                text: "Elementary principles — elemental spirits of the world. Gal. 4:3,9 — Paul's term for the pagan spiritual forces and religious systems the Galatians were formerly enslaved to before knowing Christ.",
              },
              {
                label: "",
                text: "This is the passage people use to argue that Paul condemned Sabbath observance. But the context makes the interpretation untenable. Paul is writing to Galatian Gentiles who were formerly enslaved to pagan gods (v.8) and who were now being pressured by Judaising teachers into observing Jewish ceremonial rites as a condition of salvation. The 'days and months and seasons and years' are the pagan-turned-legalistic ceremonial calendar, not the creation Sabbath.",
              },
              {
                label: "The Decisive Evidence",
                text: "Paul wrote Galatians approximately AD 49. He kept the Sabbath as his custom (Acts 17:2) throughout his ministry — in cities visited after Galatians was written. If Galatians 4:10 condemned Sabbath observance, Paul immediately and consistently violated his own teaching. The only coherent reading is that Galatians 4:10 targets the pagan religious calendar or the Judaising misuse of ceremonial days as a mechanism for earning salvation — not the creation Sabbath.",
              },
            ],
          },
          {
            heading: "The Eternal Sabbath — It Never Ends",
            contentBlocks: [
              {
                label: "",
                text: "If the Sabbath was a temporary provision for a fallen world, why will the redeemed still keep it in a world where sin, death, and the curse no longer exist?",
              },
              {
                label: "Isaiah 66:22–23 (ESV)",
                text: "\"For as the new heavens and the new earth that I make shall remain before me, says the Lord, so shall your offspring and your name remain. From new moon to new moon, and from Sabbath to Sabbath, all flesh shall come to worship before me, declares the Lord.\"",
              },
              {
                label: "מִדֵּי שַׁבָּת בְּשַׁבַּתּוֹ midde Shabbat be-Shabbato",
                text: "From Sabbath to Sabbath — recurring, rhythmic. Isa. 66:23 — the phrase denotes regular, periodic Sabbath worship in the new earth: no sin, no death, no suffering. The Sabbath is still there.",
              },
              {
                label: "Three Bookends That Prove the Sabbath Was Never Merely Ceremonial",
                text: "BEFORE SIN: God blessed the seventh day in Eden — before any human sin, before any need for a remedy (Gen. 2:1–3). The Sabbath is not a sin-management tool; it is part of the original design. WITHIN REDEMPTION: Jesus rested in the tomb on the Sabbath after completing salvation — sealing creation rest and redemption rest in the same day (Luke 23:56). AFTER SIN IS GONE: The redeemed worship from Sabbath to Sabbath in the new earth — in a world with no sin, no curse, no need for any remedial institution (Isaiah 66:22–23). If the Sabbath brackets eternity on both ends, it was never ceremonial. It is eternal.",
              },
            ],
          },
          {
            heading: "Why Does Almost Everyone Keep Sunday? — The Historical Answer",
            contentBlocks: [
              {
                label: "",
                text: "If the Sabbath was never changed in Scripture, why has Sunday been the dominant Christian worship day for most of church history? This is the question your generation will ask — and they deserve a documented, honest answer. No New Testament text commands Sunday worship. No apostolic council decreed the change. The shift from Saturday to Sunday worship happened gradually, over centuries, driven by social, political, and anti-Semitic pressures — not by Scripture.",
              },
              {
                label: "c. AD 100–150 — First hints of Sunday gathering",
                text: "Source: Justin Martyr, Apology (c.155). Significance: A voluntary additional meeting alongside, not replacing, the Sabbath — not a commanded transfer of worship.",
              },
              {
                label: "AD 321 — Constantine's Sunday law",
                text: "Source: Codex Justinianus, III.12.2 — 'On the venerable day of the Sun let the magistrates and people... rest.' Significance: A pagan Roman emperor — not a church council — issued the first Sunday law. He calls it 'the venerable day of the Sun' — a solar cult reference, not a Christian one.",
              },
              {
                label: "AD 364 — Council of Laodicea, Canon 29",
                text: "'Christians shall not Judaize and be idle on Saturday... but shall work on that day; but the Lord's day they shall especially honour.' Significance: The first church council to explicitly forbid Saturday Sabbath observance — 330+ years after the resurrection.",
              },
              {
                label: "AD 1400s — The Waldenses",
                text: "Source: GC ch. 4; Monastier, History of the Vaudois Church. Significance: A faithful remnant kept the Sabbath through centuries of persecution — evidence the Sabbath was never forgotten, only suppressed.",
              },
              {
                label: "What Constantine Actually Said",
                text: "In his Sunday edict of AD 321, Constantine used the phrase 'venerable day of the Sun' (venerabili die Solis) — a reference to Sol Invictus, the unconquered sun god of Roman paganism. He was a sun-cult emperor who politically unified the Roman Empire by merging pagan solar worship with increasingly popular Christianity. The first Sunday law in history was issued by a man who did not become a Christian by his own account until his deathbed.",
              },
              {
                label: "",
                text: "The Ethiopian church maintained Sabbath observance for centuries after Constantine. The Celtic church in Britain and Ireland kept both Saturday and Sunday into the 6th century. The Waldenses throughout the Middle Ages were persecuted in part for their Sabbath keeping. The trail of faithful Sabbath observance runs unbroken from the creation through the apostles, through the margins of history, to the present day. It was never fully lost — only suppressed.",
              },
            ],
          },
          {
            heading: "Revelation 14:12 — The Sabbath in the Last Days",
            contentBlocks: [
              {
                label: "Revelation 14:12 (ESV)",
                text: "\"Here is a call for the endurance of the saints, those who keep the commandments of God and their faith in Jesus.\"",
              },
              {
                label: "ἐντολάς entolas",
                text: "Commandments — the Decalogue. Rev. 14:12 — the same word used in John 15:10 where Jesus says He kept His Father's commandments. The continuity is explicit.",
              },
              {
                label: "",
                text: "Revelation 14 describes the final generation — the people God calls out in the last days before Christ returns. They are identified by two marks: they keep the commandments of God, and they hold the faith of Jesus. The Sabbath is in the commandments of God. It cannot be separated from them without removing the fourth commandment from the Decalogue.",
              },
              {
                label: "",
                text: "The three angels' messages of Revelation 14:6–12 form the final gospel proclamation to every nation, tribe, tongue, and people before Christ's return. The first angel calls all humanity to 'worship him who made heaven and earth, the sea and the springs of water' — language that is a direct quotation of the fourth commandment (Exodus 20:11). The Sabbath is the sign of the Creator precisely at the moment when the identity of the true God is the central question before the world.",
              },
              {
                label: "Why the Sabbath Is the Final Issue",
                text: "The Sabbath is the central point of conflict in the last days because it is the seal of God's authority as Creator. A counterfeit sabbath — Sunday, instituted by human authority — becomes the mark of an alternative allegiance. This is not about which day of the week you happen to rest on. It is about whose authority you acknowledge as supreme: the Creator's word written in stone, or human tradition written in canon law.",
              },
              {
                label: "Revelation 1:17–18 (ESV)",
                text: "\"Fear not, I am the first and the last, and the living one. I died, and behold I am alive forevermore, and I have the keys of Death and Hades.\" The God who commands the Sabbath is not a distant lawgiver. He is the one who entered the tomb. He is the one who lay still through those Sabbath hours. He is the one who rose — and who holds the keys of death itself.",
              },
            ],
            christCentre:
              "The Sabbath does not save you. Nothing you do saves you. But the Sabbath is a weekly declaration that you are already saved — that God's work is finished, that His love was first, that rest is the starting point of the whole story. Jesus kept it because He made it. He honoured it because He loved His Father's commandments. His disciples kept it because they walked as He walked. The apostles kept it because the resurrection did not abolish the law — it confirmed it. The redeemed will keep it in eternity because when every trace of sin is gone, the Sabbath will still be there — a relational space carved out of time, filled with the presence of a God who has always wanted to sit with His children and be known.",
          },
          {
            heading: "Key Texts — Know These Cold",
            contentBlocks: [
              { label: "Genesis 2:1–3", text: "The origin: blessed, sanctified, before the fall." },
              { label: "Exodus 20:8–11", text: "Remember: creation foundation." },
              { label: "Deuteronomy 5:12–15", text: "Observe: liberation foundation — you were a slave." },
              { label: "Isaiah 58:13–14", text: "The Sabbath connected to justice and liberation for the vulnerable." },
              { label: "Isaiah 66:22–23", text: "Eternal: from Sabbath to Sabbath in the new earth." },
              { label: "Matthew 5:17–19", text: "Jesus: I did not come to abolish — not one iota will pass." },
              { label: "Mark 2:27–28", text: "Jesus: Lord of the Sabbath; it was made for man." },
              { label: "Luke 4:16", text: "It was Jesus's custom — habitual, not occasional." },
              { label: "John 15:10", text: "Jesus kept His Father's commandments — including the fourth." },
              { label: "Luke 23:54–56", text: "The disciples kept the Sabbath after the crucifixion." },
              { label: "Acts 13:14, 42–44; 16:13; 17:2; 18:4", text: "Paul's Sabbath practice: decades after the resurrection." },
              { label: "Hebrews 4:9", text: "A sabbatismos remains for the people of God (post-resurrection, to Christians)." },
              { label: "1 John 2:6", text: "We walk as He walked — He walked as a Sabbath keeper." },
              { label: "Revelation 14:12", text: "The last-day people keep the commandments of God and the faith of Jesus." },
            ],
          },
        ],
        nextLesson: {
          book: "gospel",
          lesson: "antichrist-development",
          title: "Antichrist Study Development",
        },
      },
      {
        slug: "antichrist-development",
        title: "Antichrist Study Development",
        scriptureRef: "1 John 2:18-19; 2 Thessalonians 2:3-4",
        readingTime: 12,
        keyVerse: "Children, it is the last hour, and as you have heard that antichrist is coming, so now many antichrists have appeared.",
        keyVerseRef: "1 John 2:18",
        intro: "The word 'Antichrist' is one of the most misunderstood terms in the Bible. To some, it is a figure from a horror movie; to others, a political leader. But the Bible presents a much more sophisticated — and much more personal — development of this mystery.",
        sections: [
          {
            heading: "The Origin of the Term: Not Against, but In Place Of",
            contentBlocks: [
              {
                label: "ἀντίχριστος / antichristos",
                text: "The Greek prefix 'anti' primarily means 'in place of' or 'a substitute for.' While it includes the idea of opposition, its core meaning is a replacement. The Antichrist is not a figure who openly hates Christ; he is a figure who seeks to stand in the place of Christ.",
              },
              {
                label: "The First Appearance (1 John 2:18-19)",
                text: "John is the only biblical author to use the specific word 'antichrist.' He notes that 'many antichrists have appeared' already in his day. This tells us that the spirit of antichrist is not just a future threat, but an active principle operating inside the history of the church.",
              },
            ],
          },
          {
            heading: "The Apostolic Warning: Wolves From Within",
            contentBlocks: [
              {
                label: "Acts 20:27-32",
                text: "Paul warned the elders at Ephesus: 'from among your own selves will arise men speaking twisted things, to draw away the disciples after them.' The greatest danger to the church was not external persecution from Rome, but internal subversion from within the leadership.",
              },
              {
                label: "2 Thessalonians 2:3-4",
                text: "Paul describes a 'falling away' (apostasy) that must happen before the 'man of lawlessness' is revealed. This development takes place 'in the temple of God' — that is, within the professing body of Christ.",
              },
            ],
          },
          {
            heading: "The Historical Context: The Gnostic Heresy",
            contentBlocks: [
              {
                label: "Denying the Flesh",
                text: "The early church faced Gnosticism, which taught that matter was evil and spirit was good. Consequently, they denied that Jesus had truly come in human flesh (1 John 4:2-3). John identifies this specific denial as the 'spirit of the antichrist.'",
              },
              {
                label: "Counterfeit Divinity",
                text: "By denying the humanity of Christ, the Gnostics effectively removed the bridge between God and man, replacing the true Mediator with a series of spiritual 'emanations' or human substitutes.",
              },
            ],
          },
          {
            heading: "The Purpose of Separation: Truth vs Error",
            contentBlocks: [
              {
                label: "1 John 2:19",
                text: "'They went out from us, but they were not of us; for if they had been of us, they would have continued with us.' The departure of the antichrists was a necessary separation to make clear who truly belonged to the apostolic faith.",
              },
              {
                label: "The Sifting Process",
                text: "God allows error to develop so that the truth might be more clearly defined. The development of the 'mystery of lawlessness' is the backdrop against which the 'mystery of godliness' (Christ) is most beautifully revealed.",
              },
            ],
          },
        ],
        christCentre: "The study of the Antichrist is not about the study of evil; it is about the protection of the true Christ. We identify the counterfeit only so that we may more clearly cling to the original. Jesus is the only Mediator, the only High Priest, and the only Head of the Church. Any person, system, or tradition that seeks to occupy that space — even with the best of intentions — is operating in the spirit of antichrist. Our safety is found not in tracking every move of the enemy, but in knowing the voice of the Shepherd so well that no substitute can ever deceive us.",
        nextLesson: undefined,
      }
    ]
  },
  {
    slug: "messianic-prophecies",
    title: "Messianic Prophecies",
    icon: "✡",
    description:
      "Christ in every scroll — ten prophecies written centuries before Calvary that converge on one Person.",
    lessons: [
      {
        slug: "suffering-servant",
        title: "The Suffering Servant",
        scriptureRef: "Isaiah 52:13–53:12",
        readingTime: 8,
        published: true,
        keyVerse: "He was pierced for our transgressions; he was crushed for our iniquities.",
        keyVerseRef: "Isaiah 53:5",
        intro:
          "The most detailed portrait of Christ's death in the entire Old Testament — written 700 years before Calvary, cited or alluded to in over a dozen New Testament passages, and the text that led the Ethiopian eunuch to faith.",
        sections: [
          {
            heading: "The Servant Exalted (52:13–15)",
            contentBlocks: [
              {
                label: "The Prophecy",
                text: "Isaiah opens with a shocking reversal: the Servant will be 'exalted and lifted up and greatly honoured' — the very language used of God in Isaiah 6:1. But first, 'his appearance was marred beyond human semblance.' The passage begins at the end, with glory guaranteed before the suffering is described.",
              },
              {
                label: "NT Fulfilment",
                text: "The 'lifting up' language is taken by John directly to the crucifixion and glorification of Christ (John 12:32–34). The nations who are 'astonished' (52:15) find their fulfilment in Paul's Gentile mission — 'those who were not told about him will see, and those who have not heard will understand' (Romans 15:21).",
              },
            ],
          },
          {
            heading: "The Report Nobody Believed (53:1–3)",
            contentBlocks: [
              {
                label: "The Prophecy",
                text: "'Who has believed our report? And to whom has the arm of the LORD been revealed?' The Servant grew up 'like a root out of dry ground' — in obscurity, without outward majesty. He was despised and rejected, a man of sorrows acquainted with grief. The people hid their faces from him; he was not esteemed.",
              },
              {
                label: "NT Fulfilment",
                text: "John 12:37–38 quotes Isaiah 53:1 directly: 'Though he had done so many signs before them, they still did not believe in him, so that the word spoken by the prophet Isaiah might be fulfilled.' The rejection of Jesus by the religious establishment is presented not as a divine failure but as the fulfilment of a 700-year-old prophecy.",
              },
              {
                label: "Jewish Reception",
                text: "Targum Jonathan opens Isaiah 53 with the words 'Behold my servant the Messiah' — the ancient Aramaic translation already applied this chapter to the Messiah before the Christian era. Only with Rashi (c. 1100 AD), amid the trauma of First Crusade massacres, did the corporate-Israel reading become dominant in Ashkenazi exegesis.",
              },
            ],
          },
          {
            heading: "The Vicarious Suffering (53:4–6)",
            contentBlocks: [
              {
                label: "The Prophecy",
                text: "'Surely he has borne our griefs and carried our sorrows... He was pierced for our transgressions; he was crushed for our iniquities; upon him was the chastisement that brought us peace, and with his wounds we are healed.' The substitutionary logic is explicit: our sin, his punishment; our peace, his wounding.",
              },
              {
                label: "NT Fulfilment",
                text: "Matthew 8:17 quotes verse 4 as fulfilled in Jesus' healings. 1 Peter 2:24 quotes verse 5 directly — 'by his wounds you have been healed.' Romans 4:25 draws on verse 5's logic — 'delivered up for our trespasses.' Paul's summary of the gospel in 1 Corinthians 15:3 — 'Christ died for our sins in accordance with the Scriptures' — anchors the atonement in Isaiah 53.",
              },
            ],
          },
          {
            heading: "Silent Before His Accusers (53:7)",
            contentBlocks: [
              {
                label: "The Prophecy",
                text: "'He was oppressed, and he was afflicted, yet he opened not his mouth; like a lamb that is led to the slaughter, and like a sheep that before its shearers is silent, so he opened not his mouth.' The silence is specific — not passive resignation but chosen restraint before unjust accusers.",
              },
              {
                label: "NT Fulfilment",
                text: "Matthew 26:62–63: 'The high priest stood up and said, \"Have you no answer to make? What is it that these men testify against you?\" But Jesus remained silent.' Matthew 27:12–14: 'When he was accused by the chief priests and elders, he gave no answer... so that the governor was greatly amazed.' Peter Stoner assigned this prophecy a probability of 1 in 1,000 of accidental fulfilment.",
              },
            ],
          },
          {
            heading: "The Burial and the Vindication (53:8–12)",
            contentBlocks: [
              {
                label: "The Prophecy",
                text: "The Servant is 'cut off out of the land of the living' for the transgression of the people. He 'made his grave with the wicked and with a rich man in his death' — two groups in one verse. Then: 'he shall see his offspring; he shall prolong his days.' Death does not end the Servant's story. He is given 'a portion among the many' and 'shall bear their iniquities.'",
              },
              {
                label: "NT Fulfilment",
                text: "Isaiah 53:9's 'grave with the rich' finds perfect fulfilment in Matthew 27:57–60: Joseph of Arimathea, a rich man, donated his own tomb. Isaiah 53:12's 'numbered with the transgressors' is cited by Jesus himself in Luke 22:37, fulfilled when he was crucified between two criminals. The 'seeing of offspring' after death points unmistakably to resurrection.",
              },
              {
                label: "The Textual Evidence",
                text: "The Great Isaiah Scroll (1QIsaᵃ) from Qumran, dated c. 125 BC, confirms the entire text of Isaiah 53 predates the Christian era — refuting any claim that the chapter was written after the fact. Driver and Neubauer's two-volume Oxford study (1877) documented the older Jewish messianic consensus on Isaiah 53 exhaustively.",
              },
            ],
          },
        ],
        christCentre:
          "Isaiah 53 is the prophecy the Ethiopian eunuch was reading when Philip found him on the desert road (Acts 8:32–35). 'About whom does the prophet say this — about himself or someone else?' Philip began with that same scripture and told him the good news about Jesus. Written when crucifixion was unknown as a Roman execution method, it describes not a general martyr but a specific Person whose suffering is vicarious, whose burial is dignified, and whose death leads to life.",
        nextLesson: {
          book: "messianic-prophecies",
          lesson: "first-promise",
          title: "The First Promise",
        },
      },
      {
        slug: "first-promise",
        title: "The First Promise",
        scriptureRef: "Genesis 3:15",
        readingTime: 5,
        published: true,
        keyVerse:
          "I will put enmity between you and the woman, and between your offspring and her offspring; he shall bruise your head, and you shall bruise his heel.",
        keyVerseRef: "Genesis 3:15",
        intro:
          "The first prophecy in all of Scripture — spoken in Eden before the first exile began, promising a Redeemer who would be wounded in the conflict but would ultimately destroy the serpent.",
        sections: [
          {
            heading: "The Protoevangelium",
            contentBlocks: [
              {
                label: "The Prophecy",
                text: "God speaks directly to the serpent in Eden: 'I will put enmity between you and the woman, and between your offspring and her offspring; he shall bruise your head, and you shall bruise his heel.' This is the protoevangelium — the first gospel. Before the first chapter of human history closes, God announces its resolution.",
              },
              {
                label: "Ancient Jewish Reception",
                text: "Targum Pseudo-Jonathan and the Jerusalem Targum both read this text messianically — 'in the days of King Messiah.' Genesis Rabbah 23:5 identifies the Seed as 'the King Messiah.' Justin Martyr and Irenaeus called this the first messianic prophecy. This was not a Christian invention but an ancient Jewish reading.",
              },
            ],
          },
          {
            heading: "The Seed of the Woman",
            contentBlocks: [
              {
                label: "Why 'Seed of the Woman'?",
                text: "In every other genealogical reference in Scripture, the seed is traced through the man. This is the only place in the Old Testament where the seed is explicitly identified as the woman's — a grammatical anomaly that points forward to a birth without a human father. Paul picks up this exact language in Galatians 4:4: 'God sent forth his Son, born of woman.'",
              },
              {
                label: "NT Fulfilment",
                text: "Galatians 4:4 — born of woman. Romans 16:20 — 'The God of peace will soon crush Satan under your feet.' Hebrews 2:14 — 'he himself partook of flesh and blood, that through death he might destroy the one who has the power of death, that is, the devil.' 1 John 3:8 — 'The reason the Son of God appeared was to destroy the works of the devil.' Revelation 12 maps the entire conflict symbolically.",
              },
            ],
          },
          {
            heading: "The Wound and the Victory",
            contentBlocks: [
              {
                label: "Bruised Heel, Crushed Head",
                text: "The Hebrew verb for 'bruise' is the same in both clauses — but the targets are different. The serpent strikes the heel (a wound, painful but survivable); the Seed crushes the head (a mortal blow). The cross looked like the serpent winning — the Seed was struck down. But the resurrection revealed it as the moment the serpent's head was crushed. What looked like defeat was the decisive victory.",
              },
              {
                label: "The Whole Bible in One Verse",
                text: "Every subsequent messianic prophecy is an elaboration of this single verse. The Abrahamic covenant (Genesis 12, 22) specifies through which line the Seed will come. The Davidic covenant (2 Samuel 7) narrows to a royal lineage. The prophets sketch the details of the wounding. The Psalms give the Seed a voice. And Revelation 20:10 narrates the final fulfilment: 'the devil who had deceived them was thrown into the lake of fire.'",
              },
            ],
          },
        ],
        christCentre:
          "The first word God speaks after the fall is not judgment but gospel. Before expelling Adam and Eve from Eden, God turns to the serpent and announces that its victory will be short-lived. The rest of the Bible is the long unfolding of that promise — leading to a garden tomb on the third day, and a risen Seed who holds the keys of death and Hades (Revelation 1:18).",
        nextLesson: {
          book: "messianic-prophecies",
          lesson: "seventy-weeks",
          title: "The 70 Weeks",
        },
      },
      {
        slug: "seventy-weeks",
        title: "The 70 Weeks",
        scriptureRef: "Daniel 9:24–27",
        readingTime: 10,
        published: true,
        keyVerse:
          "Know and understand this: From the time the word goes out to restore and rebuild Jerusalem until the Anointed One, the ruler, comes, there will be seven 'sevens,' and sixty-two 'sevens.'",
        keyVerseRef: "Daniel 9:25",
        intro:
          "The single prophecy that names the exact year of Christ's baptism and crucifixion — the chronological backbone of the entire messianic case, anchoring the story from 457 BC to AD 34.",
        sections: [
          {
            heading: "The Six Redemptive Purposes (v. 24)",
            contentBlocks: [
              {
                label: "What God Declared",
                text: "Gabriel announces six purposes 'determined' upon Israel and Jerusalem: finish transgression, put an end to sin, atone for iniquity, bring in everlasting righteousness, seal vision and prophecy, and anoint the Most Holy. All six are Christological. Not one was fulfilled by the Maccabean revolt — the preterist alternative — but all six were accomplished at the cross and resurrection of Jesus.",
              },
              {
                label: "The Hebrew Word 'Neḥtak'",
                text: "The verb translated 'determined' (neḥtak) means literally 'cut off' — pointing to the 490 years being cut off from the longer 2,300-year prophecy of Daniel 8:14. Adventist scholars (Maxwell, Shea, Pfandl) read both prophecies as anchored at the same starting point: the decree of Artaxerxes in 457 BC.",
              },
            ],
          },
          {
            heading: "The Decree: 457 BC (v. 25)",
            contentBlocks: [
              {
                label: "Which Decree?",
                text: "Four Persian decrees are candidates: Cyrus (538 BC), Darius (520 BC), Artaxerxes in his seventh year (457 BC), and Artaxerxes in his twentieth year (444 BC). Only Artaxerxes' seventh-year decree (Ezra 7:11–26) authorises the full civil restoration of Jerusalem — with magistrates, judges, and the power of capital punishment — exactly what Daniel 9:25's 'restore and build' requires. The other decrees concern only the Temple.",
              },
              {
                label: "Archaeological Confirmation",
                text: "Horn and Wood's The Chronology of Ezra 7 (Review and Herald, 1953) established 457 BC through the Aramaic Elephantine papyri — 5th-century documents from a Jewish military colony in Egypt. These double-dated documents prove a fall-to-fall Tishri regnal calendar, confirmed by Ptolemy's Canon and a key Ur tablet fixing Xerxes's death. 457 BC is one of the most precisely documented dates in ancient history.",
              },
            ],
          },
          {
            heading: "From 457 BC to AD 27 — Christ's Baptism",
            contentBlocks: [
              {
                label: "The Arithmetic",
                text: "The 69 weeks (7 + 62) = 483 prophetic days. By the year-day principle (Numbers 14:34; Ezekiel 4:6), 483 days = 483 literal years. From autumn 457 BC, adding 483 years — with no year zero between BC and AD — yields autumn AD 27: the baptism of Jesus and his anointing with the Holy Spirit (Luke 3:21–22; Acts 10:38).",
              },
              {
                label: "Jesus' Own Claim",
                text: "Mark 1:14–15 records Jesus' first public sermon: 'The time is fulfilled, and the kingdom of God is at hand.' The word 'fulfilled' (peplerōtai) is the technical Greek term for a prophecy reaching its terminus. Jesus was announcing that Daniel's prophetic clock — running since 457 BC — had just terminated. His baptism was not a private spiritual event but a publicly timed prophetic fulfilment.",
              },
            ],
          },
          {
            heading: "Cut Off in the Midst (v. 27) — The Crucifixion",
            contentBlocks: [
              {
                label: "The Prophecy",
                text: "Daniel 9:27 states that 'in the midst of the week he shall cause the sacrifice and the oblation to cease.' The 70th week spans AD 27–34. The midpoint is spring AD 31. This is when the Messiah is 'cut off' — crucified. The sacrifice and offering cease because the entire Levitical system has found its antitype and is now superseded.",
              },
              {
                label: "NT Fulfilment",
                text: "At the moment of Christ's death, 'the curtain of the temple was torn in two, from top to bottom' (Matthew 27:51). This was God's own declaration that the ceremonial system was finished — not by Roman armies (that came in AD 70) but by the completed work of the Lamb of God. The Daniel 9 prediction of the Messiah being 'cut off' is fulfilled in all four Passion narratives.",
              },
            ],
          },
          {
            heading: "The Final Week and AD 34",
            contentBlocks: [
              {
                label: "The 70th Week Closes",
                text: "The 70th week ends in AD 34 — marked by the stoning of Stephen (Acts 7), the scattering persecution, the conversion of Saul of Tarsus, and the formal opening of the gospel to Samaritans (Acts 8) and Gentiles (Acts 10 — Cornelius). Israel's national probationary advantage was not revoked in AD 70 but in AD 34, when the 490-year covenant period expired.",
              },
              {
                label: "The Larger Frame: 2,300 Years",
                text: "The 490 years are 'cut off' from the 2,300-year prophecy of Daniel 8:14. Subtracting 490 from 2,300 leaves 1,810 years. From AD 34, adding 1,810 years yields AD 1844 — the date Adventists identify as the inauguration of Christ's antitypical Day-of-Atonement ministry in the heavenly sanctuary, foreshadowed by every Yom Kippur in the Levitical calendar.",
              },
            ],
          },
        ],
        christCentre:
          "Daniel 9 is the only prophecy in the Old Testament that gives an actual date for the Messiah's appearance. When Jesus announced 'The time is fulfilled' in Mark 1:15, he was not speaking generally — he was claiming that the clock Gabriel set running in 457 BC had just reached its terminus at his baptism. The prophecy that named the year of his anointing also named the year of his death. History was not happening to Jesus; he was walking into a script written centuries before.",
        nextLesson: {
          book: "messianic-prophecies",
          lesson: "born-in-bethlehem",
          title: "Born in Bethlehem",
        },
      },
      {
        slug: "born-in-bethlehem",
        title: "Born in Bethlehem",
        scriptureRef: "Micah 5:2",
        readingTime: 5,
        published: true,
        keyVerse:
          "But you, Bethlehem Ephrathah, though you are small among the clans of Judah, out of you will come for me one who will be ruler over Israel, whose origins are from of old, from ancient times.",
        keyVerseRef: "Micah 5:2",
        intro:
          "A ruler from an obscure village — predicted 700 years in advance, so well-known by the first century that the chief priests cited it without hesitation when Herod asked where the Messiah was to be born.",
        sections: [
          {
            heading: "The Prophecy",
            contentBlocks: [
              {
                label: "Bethlehem Ephrathah",
                text: "Micah specifies not merely 'Bethlehem' but 'Bethlehem Ephrathah' — distinguishing the village in Judah from a Bethlehem in Zebulun. This is the city of David. The ruler would come from David's own birthplace. Though small among the clans of Judah — a footnote on the map — it would produce the ruler of Israel.",
              },
              {
                label: "Ancient Jewish Reception",
                text: "The prophecy was universally accepted as messianic in Second-Temple Judaism. Targum Jonathan explicitly inserts 'Messiah' into the text. When Herod summoned the chief priests and scribes to ask where the Christ was to be born, they answered without deliberation: Bethlehem of Judea. The prophecy was so well-established that it required no debate — Matthew 2:5–6 records their citation of Micah 5:2 verbatim.",
              },
            ],
          },
          {
            heading: "The Fulfilment",
            contentBlocks: [
              {
                label: "The Census That Moved a Family",
                text: "Mary and Joseph lived in Nazareth — 90 miles from Bethlehem. The mechanism that brought them south was a Roman imperial census ordered by Augustus (Luke 2:1–5). No human arranged this. A pagan emperor's administrative decree fulfilled a 700-year-old Jewish prophecy, transporting a Galilean carpenter and his pregnant wife to the precise village Micah had named.",
              },
              {
                label: "NT Fulfilment",
                text: "Matthew 2:1–6 records the chief priests citing Micah 5:2 to Herod. John 7:42 records the crowd debating whether Jesus could be the Christ, since 'the Christ comes from the offspring of David, and comes from Bethlehem.' Ironically, they used the prophecy against him — not knowing he was born there.",
              },
            ],
          },
          {
            heading: "Pre-existence in the Text",
            contentBlocks: [
              {
                label: "'From of Old, from Ancient Times'",
                text: "The Hebrew phrase 'whose origins are from of old, from ancient times' (miqedem mimei olam) is not merely a reference to Davidic ancestry. The word olam denotes eternity or the distant past — the same word used in Psalm 90:2 ('from everlasting to everlasting, you are God'). Micah is signalling that the one born in Bethlehem pre-existed Bethlehem — that his origins are not merely historical but eternal.",
              },
              {
                label: "Christological Implication",
                text: "John 1:1–14 and Colossians 1:16–17 describe the eternal pre-existence of the Word who became flesh. The incarnation at Bethlehem was not the beginning of the Son of God's existence but his entry into human history. Micah saw both simultaneously: the smallness of Bethlehem and the eternity of the one who would emerge from it.",
              },
            ],
          },
        ],
        christCentre:
          "The God who created the universe chose to enter it in a village so small it nearly didn't register on the census rolls. Bethlehem was not chosen for its prestige — it was chosen because God had promised it seven centuries earlier. The Magi travelled hundreds of miles following a star; the answer to where it led was already written in Jewish Scripture. The smallness of Bethlehem magnifies the greatness of the One it produced.",
        nextLesson: {
          book: "messianic-prophecies",
          lesson: "virgin-shall-conceive",
          title: "A Virgin Shall Conceive",
        },
      },
      {
        slug: "virgin-shall-conceive",
        title: "A Virgin Shall Conceive",
        scriptureRef: "Isaiah 7:14",
        readingTime: 5,
        published: true,
        keyVerse:
          "Therefore the Lord himself will give you a sign: The virgin will conceive and give birth to a son, and will call him Immanuel.",
        keyVerseRef: "Isaiah 7:14",
        intro:
          "Immanuel — God with us. A sign that God himself would give: not a natural birth but one that would signal the presence of God in human flesh.",
        sections: [
          {
            heading: "The Sign Given",
            contentBlocks: [
              {
                label: "The Context",
                text: "Isaiah 7 is set during the Syro-Ephraimite war (c. 735 BC). King Ahaz of Judah is terrified. God tells him to ask for a sign — from the depths of Sheol to the heights of heaven. Ahaz refuses, falsely pious. So God gives the sign anyway: a virgin conceiving and bearing a son named Immanuel. The sign's magnitude matches the scope of the offer — this is not a small reassurance but a cosmic declaration.",
              },
              {
                label: "The Name 'Immanuel'",
                text: "The child is to be named Immanuel — literally 'God with us' in Hebrew. This is not a symbolic nickname. Matthew 1:23 quotes Isaiah 7:14 and interprets the name theologically: it is the identification of Jesus as the presence of God himself entering human history. John 1:14 — 'the Word became flesh and dwelt among us' — is the gospel of Immanuel.",
              },
            ],
          },
          {
            heading: "The Hebrew Word Almah",
            contentBlocks: [
              {
                label: "What the Word Means",
                text: "The Hebrew word translated 'virgin' is almah — which means a young woman of marriageable age, with the cultural assumption of chastity. Critics argue almah doesn't require virginity and that the common word for virgin (betulah) was not used. But almah appears nine times in the Old Testament and in every case refers to a young unmarried woman. A married or pregnant woman would not be called an almah.",
              },
              {
                label: "The Pre-Christian Jewish Translation",
                text: "The most powerful evidence is not Christian exegesis but Jewish translation. The Septuagint — the Greek translation of the Hebrew Bible produced by Jewish scholars in Alexandria in the 3rd century BC, two centuries before Christ — renders almah as parthenos, the unambiguous Greek word for virgin. This was a Jewish translation choice made long before any Christian apologetic existed. The LXX translators understood what Isaiah meant.",
              },
            ],
          },
          {
            heading: "Matthew's Fulfilment",
            contentBlocks: [
              {
                label: "The Explicit Citation",
                text: "Matthew 1:22–23: 'All this took place to fulfil what the Lord had spoken by the prophet: \"Behold, the virgin shall conceive and bear a son, and they shall call his name Immanuel.\"' Matthew quotes the LXX — parthenos — not to twist the text but because the LXX accurately represented the Hebrew original's intent. The miraculous sign Isaiah pointed to was fulfilled in Mary: no human father, no natural conception.",
              },
              {
                label: "The Dual Horizon",
                text: "Isaiah 7:14 has an immediate historical reference — a sign relevant to Ahaz's crisis — and a distant messianic fulfilment. The 'Immanuel' born in the 8th century was a sign pointing to the greater Immanuel to come. Matthew's use of 'fulfilment' language recognises this: the prophecy found its complete, intended meaning in Jesus. Luke 1:31–35 confirms the mechanism — 'the Holy Spirit will come upon you, and the power of the Most High will overshadow you.'",
              },
            ],
          },
        ],
        christCentre:
          "The virgin birth is not a theological footnote — it is the hinge on which the incarnation turns. For Jesus to be the Seed of the woman (Genesis 3:15) without the seed of a man, for him to be born under the law (Galatians 4:4) yet without inheriting the guilt of Adam, required exactly what Isaiah predicted: a miraculous conception. Immanuel means God chose not to send a messenger but to come himself. That is the astonishing claim at the heart of Christmas.",
        nextLesson: {
          book: "messianic-prophecies",
          lesson: "triumphal-entry-prophecy",
          title: "The Triumphal Entry",
        },
      },
      {
        slug: "triumphal-entry-prophecy",
        title: "The Triumphal Entry",
        scriptureRef: "Zechariah 9:9",
        readingTime: 5,
        published: true,
        keyVerse:
          "Rejoice greatly, Daughter Zion! Shout, Daughter Jerusalem! See, your king comes to you, righteous and victorious, lowly and riding on a donkey, on a colt, the foal of a donkey.",
        keyVerseRef: "Zechariah 9:9",
        intro:
          "A king on a donkey — the exact choreography of Palm Sunday, written five centuries before Rome existed, already wrestled with by the Talmud for its paradox of humility and conquest.",
        sections: [
          {
            heading: "The Prophecy",
            contentBlocks: [
              {
                label: "Zechariah's Vision",
                text: "Zechariah 9:9, written c. 520 BC, describes a king arriving in Jerusalem — righteous, victorious (or 'having salvation'), humble, riding on a donkey. All four attributes are packed into one verse: moral character (righteous), military outcome (victorious), posture (humble), and transport (a donkey's colt). The king who arrives this way is presented as the fulfilment of the nation's deepest hope.",
              },
              {
                label: "Rabbinic Reception",
                text: "The Babylonian Talmud (Sanhedrin 98a) explicitly wrestles with the paradox in Zechariah 9:9: how can the Messiah arrive on a humble donkey if Daniel 7:13 shows him coming on the clouds of heaven? The rabbis answered: if Israel is worthy, he comes on clouds; if not, on a donkey. This shows the verse was firmly established as messianic in Jewish tradition before and beyond the Christian era.",
              },
            ],
          },
          {
            heading: "Donkey vs. Horse — Ancient Symbolism",
            contentBlocks: [
              {
                label: "The Cultural Code",
                text: "In the ancient Near East, every royal entry carried a clear symbolic vocabulary: a king entering a city on a horse was coming for war; a king entering on a donkey was coming in peace. Solomon had ridden a royal mule to his own anointing (1 Kings 1:33). Zechariah's specification of a donkey — the foal of a donkey — was not incidental colour but a deliberate peace-arrival signal. The king comes to save, not to conquer by force.",
              },
              {
                label: "The Deeper Paradox",
                text: "The same verse calls him 'victorious' — but his victory is achieved through lowliness, not military power. This is the cross-shaped logic the disciples could not grasp until after the resurrection. The king wins by losing. The conqueror arrives on a colt. The throne he inherits is a cross before it is a cloud.",
              },
            ],
          },
          {
            heading: "The Fulfilment on Palm Sunday",
            contentBlocks: [
              {
                label: "Jesus' Deliberate Choreography",
                text: "All four gospels record the Triumphal Entry (Matthew 21:1–9; Mark 11:1–10; Luke 19:28–40; John 12:12–16). John 12:14–16 explicitly cites Zechariah 9:9 and notes that the disciples 'did not understand these things at first, but when Jesus was glorified, then they remembered.' Jesus did not accidentally ride a donkey — he sent disciples ahead to fetch a specific animal, the colt of a donkey, fulfilling the precise detail of the prophecy.",
              },
              {
                label: "The Crowd's Response",
                text: "The crowd spread cloaks and palm branches — the reception due a conquering king — and shouted 'Hosanna to the Son of David! Blessed is he who comes in the name of the Lord!' (Matthew 21:9, citing Psalm 118:26). They read the symbolism correctly: this was a royal arrival. They misread its nature — expecting political liberation, not redemptive sacrifice. The king had come to conquer death, not Rome.",
              },
            ],
          },
        ],
        christCentre:
          "Jesus entered Jerusalem knowing what the week would hold. He did not arrive on a war horse demanding surrender; he arrived on a donkey, offering peace. The prophecy's paradox — righteous and victorious, yet humble — is the gospel paradox. The greatest victory in history was won by the most seemingly defeated Person in history. Palm Sunday is not a triumphant prelude to a tragic week; it is the announcement of the kind of King who wins by giving himself away.",
        nextLesson: {
          book: "messianic-prophecies",
          lesson: "thirty-pieces-of-silver",
          title: "Thirty Pieces of Silver",
        },
      },
      {
        slug: "thirty-pieces-of-silver",
        title: "Thirty Pieces of Silver",
        scriptureRef: "Zechariah 11:12–13",
        readingTime: 5,
        published: true,
        keyVerse:
          "So they paid me thirty pieces of silver. And the Lord said to me, 'Throw it to the potter' — the handsome price at which they valued me! So I took the thirty pieces of silver and threw them into the house of the Lord to the potter.",
        keyVerseRef: "Zechariah 11:12–13",
        intro:
          "The precise betrayal price — and what would happen to the money afterward — prophesied in a single passage 500 years before Judas walked into the temple with a fistful of coins.",
        sections: [
          {
            heading: "The Prophecy",
            contentBlocks: [
              {
                label: "Zechariah's Acted Parable",
                text: "In Zechariah 11, the prophet acts out the role of a rejected shepherd. He asks his employers to pay him his wages. They weigh out thirty pieces of silver — a contemptuous sum. God's response drips with irony: 'the lordly price at which I was priced by them.' Then the prophet is told to throw the money to 'the potter' in the house of the LORD — a strange, specific, seemingly arbitrary instruction.",
              },
              {
                label: "The Price of a Slave",
                text: "Thirty shekels of silver was the legal price for a slave gored by an ox under Mosaic law (Exodus 21:32). The priests and elders were assigning the value of a damaged slave to the Shepherd of Israel. The irony Zechariah flags — 'the handsome price at which they valued me' — is God's own sardonic commentary on how badly they had underestimated who stood before them.",
              },
            ],
          },
          {
            heading: "Thrown to the Potter",
            contentBlocks: [
              {
                label: "The Specific Instruction",
                text: "The command is oddly specific: throw it to the potter, in the house of the LORD. Not donated to the treasury. Not spent on food. Thrown to a potter, in the temple precincts. This level of detail — amount, action, location, recipient — is unusual even for biblical prophecy. It demands a precise historical match.",
              },
              {
                label: "Matthew's Fulfilment",
                text: "Matthew 27:3–10 records the fulfilment in granular detail. Judas, regretting his betrayal, returns the thirty pieces to the chief priests and elders in the temple. They refuse to put it back in the treasury — 'it is blood money' — and use it instead to buy the Potter's Field as a burial ground for foreigners. Matthew explicitly cites this as the fulfilment of the prophecy. Every specific detail — amount, location of the return, the potter, the purchase — lands within hours of the crucifixion.",
              },
            ],
          },
          {
            heading: "The Probability",
            contentBlocks: [
              {
                label: "Peter Stoner's Calculation",
                text: "Mathematician Peter Stoner assigned the 'thirty pieces of silver' prophecy a probability of 1 in 1,000 — that any random person would be betrayed for exactly that amount. He assigned the 'thrown to the potter in the house of the LORD' detail a separate probability of 1 in 100,000. Combined with the other six prophecies in his famous eight, the statistical case becomes staggering. But the numbers only sharpen what the text itself makes plain: this was written 500 years before it happened.",
              },
            ],
          },
        ],
        christCentre:
          "Judas received thirty pieces of silver — the price of a slave — for the Son of God. The priests declared him worth less than a man accidentally killed by an ox. But the irony cuts the other way: the price of Christ's betrayal became the price of a field for the dead — a burial place. From the cheapest possible valuation, God produced a gift for the unburied poor of Jerusalem. The one who was treated as worthless made even his betrayal into grace.",
        nextLesson: {
          book: "messianic-prophecies",
          lesson: "forsaken-one",
          title: "The Forsaken One",
        },
      },
      {
        slug: "forsaken-one",
        title: "The Forsaken One",
        scriptureRef: "Psalm 22",
        readingTime: 7,
        published: true,
        keyVerse:
          "My God, my God, why have you forsaken me? Why are you so far from saving me, so far from my cries of anguish?",
        keyVerseRef: "Psalm 22:1",
        intro:
          "David's cry of dereliction — including the mocking, the piercing of hands and feet, and the casting of lots for garments — becomes Christ's cry from the cross, in a psalm written 1,000 years before crucifixion.",
        sections: [
          {
            heading: "The Opening Cry (v. 1)",
            contentBlocks: [
              {
                label: "The Dereliction",
                text: "Psalm 22 opens with a cry of absolute abandonment: 'My God, my God, why have you forsaken me?' It is the language of a man who has lost the felt sense of God's presence entirely — not because God has abandoned his covenant, but because the psalmist is bearing something that creates the experience of total separation.",
              },
              {
                label: "Jesus' Quotation",
                text: "Matthew 27:46 and Mark 15:34 record Jesus crying these exact words from the cross in Aramaic: 'Eloi, Eloi, lema sabachthani?' In rabbinic practice, quoting the opening line of a psalm was the conventional way of citing the entire psalm — the first line was the title. Jesus was not expressing mere emotional desolation; he was announcing, to anyone literate in Scripture, that the entirety of Psalm 22 was being enacted in that moment.",
              },
            ],
          },
          {
            heading: "The Mocking (vv. 7–8)",
            contentBlocks: [
              {
                label: "The Prophecy",
                text: "'All who see me mock me; they make mouths at me; they wag their heads: \"He trusts in the LORD; let him deliver him; let him rescue him, for he delights in him!\"' The specific content of the mockery is predicted: not just that he would be mocked, but the form — head-wagging and the taunt that God should rescue his favoured one.",
              },
              {
                label: "NT Fulfilment",
                text: "Matthew 27:39, 43 records the fulfilment verbatim: 'Those who passed by derided him, wagging their heads... \"He trusts in God; let God deliver him now, if he desires him.\"' The bystanders at Calvary were not inventing cruelty — they were reciting a script written a millennium earlier, without knowing it.",
              },
            ],
          },
          {
            heading: "Pierced Hands and Feet (v. 16)",
            contentBlocks: [
              {
                label: "The Prophecy",
                text: "'For dogs encompass me; a company of evildoers encircles me; they have pierced my hands and feet.' This is the single most debated verse in the psalm. The Masoretic text reads ka'ari ('like a lion'), which gives an incomplete sentence. The LXX, the Dead Sea Scrolls text, and the Nahal Hever scroll all read ka'aru ('they have pierced') — the reading behind the standard English translations.",
              },
              {
                label: "The Textual Evidence",
                text: "The Great Psalm Scroll from Qumran (4QPsf) and the Nahal Hever scroll (c. 1st century BC) both support the 'pierced' reading — predating the Christian era. These manuscripts decisively refute the claim that the 'piercing' reading was a Christian invention. Crucifixion was not a Jewish method of execution; the image of pierced hands and feet in a Jewish psalm, written 1,000 years before Christ, points to a fulfilment the psalmist himself could not have engineered.",
              },
            ],
          },
          {
            heading: "Garments Divided (v. 18)",
            contentBlocks: [
              {
                label: "The Prophecy",
                text: "'They divide my garments among them, and for my clothing they cast lots.' This is remarkable in its specificity: not merely that the victim's clothes are taken, but that lots are cast for a specific garment — implying it was too valuable to divide but worth gambling over.",
              },
              {
                label: "NT Fulfilment",
                text: "John 19:23–24 is the only gospel to record both the dividing and the lot-casting: 'When the soldiers had crucified Jesus, they took his garments and divided them into four parts... But his tunic was seamless, woven in one piece from top to bottom, so they said, \"Let us not tear it, but cast lots for it.\"' John then explicitly states: 'This was to fulfil the Scripture.' The seamless tunic was too whole to divide — so they gambled for it, fulfilling Psalm 22:18 in both clauses.",
              },
            ],
          },
        ],
        christCentre:
          "Psalm 22 ends not in abandonment but in praise: 'He has not despised or scorned the suffering of the afflicted one; he has not hidden his face from him but has listened to his cry for help' (v. 24). The dereliction was real — Christ bore the full weight of sin's separation — but it was not the last word. The psalm that opened with 'My God, my God, why have you forsaken me?' closes with 'future generations will be told about the Lord, and proclaim his righteousness.' The cross is not the end of the story. It is the pivot.",
        nextLesson: {
          book: "messianic-prophecies",
          lesson: "risen-lord",
          title: "The Risen Lord",
        },
      },
      {
        slug: "risen-lord",
        title: "The Risen Lord",
        scriptureRef: "Psalm 16:10",
        readingTime: 5,
        published: true,
        keyVerse:
          "Because you will not abandon me to the realm of the dead, nor will you let your faithful one see decay.",
        keyVerseRef: "Psalm 16:10",
        intro:
          "He would not see corruption — and Peter's Pentecost proof rested entirely on this single observation: David's tomb was still occupied, so the prophecy must refer to someone else.",
        sections: [
          {
            heading: "The Prophecy",
            contentBlocks: [
              {
                label: "Psalm 16 — A Psalm of Trust",
                text: "Psalm 16 is David's expression of complete confidence in God's protection: 'I have set the LORD always before me; because he is at my right hand, I shall not be shaken.' The psalm reaches its climax in verses 9–11: 'Therefore my heart is glad, and my whole being rejoices; my flesh also dwells secure. For you will not abandon my soul to Sheol, or let your holy one see corruption.' The word translated 'corruption' or 'decay' (shaḥat) refers to the decomposition of the body in the grave.",
              },
              {
                label: "The Problem with a Literal Reading",
                text: "If Psalm 16:10 simply expresses David's confidence that God will protect his life, it had already been falsified — David died. His tomb was in Jerusalem (1 Kings 2:10; Nehemiah 3:16), and it was well-known. The promise of 'not seeing corruption' could not have been fulfilled in David's own body. The prophecy either fails, or it points beyond David to someone whose body did not decay.",
              },
            ],
          },
          {
            heading: "Peter's Pentecost Proof",
            contentBlocks: [
              {
                label: "The Apostolic Argument",
                text: "Acts 2:25–32 records Peter's Pentecost sermon. He quotes Psalm 16:8–11 and then makes his argument explicit: 'Brothers, I may say to you with confidence about the patriarch David that he both died and was buried, and his tomb is with us to this day.' David's occupied tomb is the linchpin. If the prophecy applied to David, it had already failed. Therefore David 'foresaw and spoke about the resurrection of Christ, that he was not abandoned to Hades, nor did his flesh see corruption.'",
              },
              {
                label: "The Logic",
                text: "Peter's argument is not mystical — it is historical and textual. He reasons from three premises: (1) David wrote Psalm 16; (2) David died and his body decomposed; (3) therefore David was prophesying about someone else whose body would not decompose. The resurrection of Jesus is the only event in history that satisfies premise 3. The empty tomb is not just a claim — it is the fulfilment of a 1,000-year-old prophetic logic.",
              },
            ],
          },
          {
            heading: "Paul at Antioch",
            contentBlocks: [
              {
                label: "The Second Citation",
                text: "Acts 13:34–37 records Paul using the identical argument at Antioch: 'And as for the fact that he raised him from the dead, no more to return to corruption, he has spoken in this way: \"I will give you the holy and sure blessings of David.\" Therefore he also says in another psalm, \"You will not let your Holy One see corruption.\" For David, after he had served the purpose of God in his own generation, fell asleep and was laid with his fathers and saw corruption, but he whom God raised up did not see corruption.'",
              },
              {
                label: "The Resurrection as Prophetic Fulfilment",
                text: "For both Peter and Paul, the resurrection is not primarily a miracle performed to prove Jesus is powerful — it is the fulfilment of a prophetic necessity. It had to happen because Psalm 16 said it would. The resurrection was not an afterthought to the cross; it was the prophetic plan. Every Easter morning is the answer to a thousand-year-old question embedded in a psalm of trust.",
              },
            ],
          },
        ],
        christCentre:
          "Psalm 16 is a psalm of trust — David resting in God's faithfulness. The deepest expression of that trust is the confidence that not even death is the final word. Christ entered death trusting the Father completely. Three days later, the Father answered. 'You will not abandon my soul to Sheol' was not wishful thinking — it was prophecy. And the empty tomb is how God said Amen.",
        nextLesson: {
          book: "messianic-prophecies",
          lesson: "priest-forever",
          title: "Priest Forever",
        },
      },
      {
        slug: "priest-forever",
        title: "Priest Forever",
        scriptureRef: "Psalm 110",
        readingTime: 6,
        published: true,
        keyVerse:
          "The Lord says to my lord: 'Sit at my right hand until I make your enemies a footstool for your feet.'",
        keyVerseRef: "Psalm 110:1",
        intro:
          "The most-cited Old Testament passage in the entire New Testament — a priest and king on an eternal throne, whose ongoing ministry is the basis of every believer's access to God right now.",
        sections: [
          {
            heading: "The Throne Promise (v. 1)",
            contentBlocks: [
              {
                label: "The Psalm",
                text: "Psalm 110 opens with a divine declaration: 'The LORD (Yahweh) says to my Lord (Adonai): Sit at my right hand until I make your enemies your footstool.' David is speaking, but he addresses someone as 'my Lord' — a person of superior status to himself. The question Jesus posed to the Pharisees in Matthew 22:41–46 was devastating: if the Messiah is David's Son, why does David call him Lord?",
              },
              {
                label: "The Most-Cited OT Text in the NT",
                text: "Psalm 110:1 is quoted or directly alluded to more than any other Old Testament passage in the New Testament — appearing in Matthew 22, Mark 12, Luke 20, Acts 2, Romans 8, 1 Corinthians 15, Ephesians 1, Colossians 3, Hebrews 1, 5, 7, 8, 10, 12, and 1 Peter 3. The early church's entire understanding of the ascension, heavenly session, and second advent was framed by this verse.",
              },
            ],
          },
          {
            heading: "The Melchizedek Priesthood (v. 4)",
            contentBlocks: [
              {
                label: "The Prophecy",
                text: "'The LORD has sworn and will not change his mind: You are a priest forever after the order of Melchizedek.' This verse combines two offices that the Law of Moses kept strictly separate: king and priest. In Israel, kings were from Judah/David; priests were from Levi/Aaron. Psalm 110 prophesies a Messiah who holds both offices simultaneously — not by Levitical descent but by a divine oath rooted in the older, pre-Levitical priesthood of Melchizedek.",
              },
              {
                label: "The Hebrews Exposition",
                text: "The book of Hebrews devotes three full chapters (5, 7, 10) to Psalm 110:4. The argument: Melchizedek was a priest before Abraham, superior to Levi (since Levi's ancestor Abraham paid tithes to Melchizedek). Christ's priesthood is therefore superior to the entire Levitical system — not because he broke the Law but because he fulfils a priesthood the Law could only shadow. His priesthood rests not on genealogy but on 'the power of an indestructible life' (Hebrews 7:16).",
              },
            ],
          },
          {
            heading: "The Heavenly Ministry",
            contentBlocks: [
              {
                label: "Sitting and Interceding",
                text: "Hebrews 7:25 — 'He is able to save to the uttermost those who draw near to God through him, since he always lives to make intercession for them.' Christ's current ministry is not passive waiting. He is the Great High Priest who, having offered himself once for all, now intercedes for every believer. The 'sitting' of Psalm 110:1 denotes the completion of the sacrificial work; the ongoing priesthood of verse 4 denotes the continuous intercessory work.",
              },
              {
                label: "The Second Advent",
                text: "'Until I make your enemies your footstool' — the sitting is not permanent. Psalm 110:1 anticipates a moment when the session ends and the reign is fully and visibly established. 1 Corinthians 15:25–26 maps this to the resurrection and consummation: 'For he must reign until he has put all his enemies under his feet. The last enemy to be destroyed is death.' The priest who intercedes becomes the King who reigns — the two roles of Psalm 110 reach their full expression at the second advent.",
              },
            ],
          },
        ],
        christCentre:
          "Psalm 110 answers the question every suffering believer asks: what is Jesus doing right now? He is seated at the right hand of the Majesty on high (Hebrews 1:3), interceding for us by name (Romans 8:34), as a priest after the order of Melchizedek — not by law but by life. The same Jesus who offered himself at Calvary is the Jesus who stands in our defence in the heavenly sanctuary. The priesthood that began with a cross continues in a throne room — and it will not end until every enemy, including death itself, is under his feet.",
      },
    ],
  },
];

export function findLesson(
  bookSlug: string,
  lessonSlug: string
): { book: StudyBook; lesson: StudyLesson } | null {
  const book = studyBooks.find((b) => b.slug === bookSlug);
  if (!book) return null;
  const lesson = book.lessons.find((l) => l.slug === lessonSlug);
  if (!lesson) return null;
  return { book, lesson };
}

export function getFirstLesson(): { book: string; lesson: string } {
  return {
    book: studyBooks[0].slug,
    lesson: studyBooks[0].lessons[0].slug,
  };
}
