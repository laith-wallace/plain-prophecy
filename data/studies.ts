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
  keyVerse?: string;
  keyVerseRef?: string;
  intro?: string;
  sections?: StudySection[];
  christCentre?: string;
  nextLesson?: { book: string; lesson: string; title: string };
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
            body: "Daniel is left overwhelmed after chapter 8 — the 2,300-day figure is unexplained. In chapter 9, the angel Gabriel returns with the explicit purpose of 'giving Daniel understanding' (9:22). The 70 weeks of Daniel 9 are 'cut off' (Hebrew: chātak — severed from a larger whole) from the 2,300 days. They share the same starting point: the decree to restore Jerusalem in 457 BC (Ezra 7, verified by the Elephantine Papyri). The 70 weeks (490 years) end in 34 AD. The remaining 1,810 years run to 1844 AD: 457 BC + 2,300 = 1844 AD. In that year, a worldwide movement independently reached this calculation and recognised that the heavenly sanctuary — not an earthly temple — was the subject of the prophecy.",
          },
          {
            heading: "The Day-Year Principle",
            body: "The prophetic conversion of days to years is not an assumption — it is exegetically mandated. Numbers 14:34: 'According to the number of the days in which you spied out the land, forty days, each day for a year, you shall bear your iniquity forty years.' Ezekiel 4:6: 'A day for each year I have assigned to you.' Both texts use the same formula in a prophetic context. The principle is not Adventist innovation — it was the interpretive method of the Reformers, of Newton, of the entire Historicist school.",
          },
        ],
        christCentre:
          "The sanctuary of Daniel 8 is not the Jerusalem temple — it is the heavenly sanctuary of which the earthly was a copy (Heb 8:2, 5). Christ is the High Priest of that sanctuary (Heb 4:14). The 2,300 days are ultimately about his priestly work: after the 'little horn' power suppressed and substituted for Christ's mediation for centuries, the heavenly sanctuary ministry was brought to a new phase in 1844. The judgment of Daniel 7:9–14 and the sanctuary restoration of Daniel 8:14 are the same event seen from two angles. Both point to Christ completing what no human priesthood can: the final atonement, the vindication of his people, the restoration of truth.",
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
            body: "Gabriel arrives 'in swift flight' while Daniel is still praying. He gives 70 weeks (490 years) concerning Jerusalem and the Messiah. The starting point: 'from the going out of the word to restore and rebuild Jerusalem' — the decree of Artaxerxes in 457 BC (Ezra 7), confirmed by multiple independent ancient sources including the Elephantine Papyri. 69 weeks (483 years) to 'Messiah the Prince' = 457 BC + 483 = 27 AD — the exact year of Jesus' baptism (Luke 3:1, 21–23). 'In the midst of the week' (3.5 years in) = 31 AD — the year of the crucifixion. At the cross, sacrifice and offering ceased in their meaning — the veil tore (Matt 27:51). The 70th week ends at 34 AD — the stoning of Stephen and the formal extension of the gospel to the Gentiles (Acts 7–10).",
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
            body: "Futurist (dispensationalist) interpretation separates the 70th week from the first 69, inserting a 'Church Age gap' of indeterminate length and placing the 70th week at the end of history. This 'gap theory' was introduced by John Nelson Darby in the 1830s, drawing on earlier Jesuit scholar Francisco Ribera (1590). It has no explicit textual basis. The Hebrew text of Daniel 9 uses the conjunction waw to connect the 69th and 70th weeks sequentially. The Reformers, without exception, read all 70 weeks as continuous. The gap theory exists not because the text requires it, but because it is necessary to the futurist system.",
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
            body: "'At that time Michael, the great prince who has charge of your people, will arise.' The phrase 'at that time' connects directly to the sequence of chapters 10–11. Michael 'arising' or 'standing up' does not mean he begins to act — it signals the end of his intercessory role. In the ancient Near East, a judge who sat administered cases; when he stood, the court closed. Michael standing up marks the close of probation — every case decided, every soul either sealed or lost. This is followed immediately by 'a time of trouble such as never has been since there was a nation.'",
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
          "Michael in Daniel is not a created angel. He is the 'Prince of princes' (Dan 8:25), the one who contends for Moses' body (Jude 9), whose voice raises the dead (1 Thess 4:16). Michael is Christ in his role as the divine warrior-defender of his people. When Michael stands up, probation closes — not as punishment, but as the moment when grace has done its full work and every soul has made its final choice. Then he comes. The stone of Daniel 2 strikes. The Son of Man of Daniel 7 descends with the clouds. The sanctuary of Daniel 8 is fully restored. Every vision in the book of Daniel converges on this moment: the return of Jesus Christ.",
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
            body: "John calls for wisdom: 'Let the one who has understanding calculate the number of the beast, for it is the number of a man, and his number is 666.' The Greek and Hebrew practice of gematria (assigning numerical values to letters) was well known to John's readers. The title 'Vicarius Filii Dei' (Vicar of the Son of God), used in official papal documents, calculates to 666 in Latin. This is not the only line of evidence — but it is historically documented and fits the overall identification. The mark is not merely a number — it represents allegiance: to worship the beast is to accept its authority over conscience.",
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
        nextLesson: undefined,
      },
    ],
  },
  {
    slug: "gospel",
    title: "The Gospel",
    icon: "✝️",
    description: "The core message of the Bible — Jesus Christ and him crucified.",
    hasSeparator: true,
    lessons: [
      {
        slug: "love-for-god",
        title: "Love for God",
        scriptureRef: "1 John 4:19",
        readingTime: 5,
        keyVerse: "We love because he first loved us.",
        keyVerseRef: "1 John 4:19",
        intro: "The foundation of all true religion is the love of God. Before we can love Him, we must understand how He has first loved us.",
        sections: [
          {
            heading: "The Source of Love",
            body: "God is love, and all true love originates in Him. Our capacity to love is a response to His infinite, pre-emptive love shown at the cross."
          },
          {
            heading: "Love in Action",
            body: "Coming Soon: A deeper look at how God's love transforms our lives and our relationships with others."
          }
        ],
        christCentre: "Jesus is the supreme revelation of God's love. In His life, death, and resurrection, we see the heart of the Father laid bare."
      },
      {
        slug: "righteousness-by-faith",
        title: "Righteousness by Faith",
        scriptureRef: "Romans 4:3",
        readingTime: 6,
        keyVerse: "Abraham believed God, and it was counted to him as righteousness.",
        keyVerseRef: "Romans 4:3",
        intro: "Righteousness is not something we achieve, but something we receive. It is the gift of God through faith in Jesus Christ.",
        sections: [
          {
            heading: "The Gift of Righteousness",
            body: "Faith is the hand that takes hold of God's promise. It is not our faith that saves us, but the Object of our faith—Jesus Christ."
          },
          {
            heading: "The Walk of Faith",
            body: "Coming Soon: Exploring how living by faith leads to a life of peace, assurance, and true holiness."
          }
        ],
        christCentre: "Christ is our righteousness. He lived the life we could not live and died the death we deserved, so that we might be clothed in His perfection."
      },
      {
        slug: "the-resurrection",
        title: "The Resurrection",
        scriptureRef: "1 Corinthians 15:17,20",
        readingTime: 5,
        keyVerse: "If Christ has not been raised, your faith is futile... But in fact Christ has been raised from the dead.",
        keyVerseRef: "1 Corinthians 15:17,20",
        intro: "The resurrection of Jesus is the pivot point of history. Without it, our faith is empty; with it, we have a living hope.",
        sections: [
          {
            heading: "Victory Over Death",
            body: "The empty tomb is God's 'Amen' to Christ's 'It is finished.' It proves that sin and death have been defeated forever."
          },
          {
            heading: "The Power of the Resurrection",
            body: "Coming Soon: Understanding how the same power that raised Jesus from the dead is at work in believers today."
          }
        ],
        christCentre: "Jesus is the Resurrection and the Life. Because He lives, we shall live also. His victory is our victory."
      },
      {
        slug: "jesus-at-the-centre",
        title: "Jesus at the Centre",
        scriptureRef: "John 5:39",
        readingTime: 5,
        keyVerse: "These are the Scriptures that testify about me.",
        keyVerseRef: "John 5:39",
        intro: "Every page of Scripture, from Genesis to Revelation, points to Jesus. He is the heart and centre of all biblical truth.",
        sections: [
          {
            heading: "All Scripture Testifies of Him",
            body: "To read the Bible without finding Jesus is to miss its entire purpose. He is the key that unlocks every prophecy and promise."
          },
          {
            heading: "The Alpha and Omega",
            body: "Coming Soon: A study on how keeping Jesus at the centre of our theology, our worship, and our lives changes everything."
          }
        ],
        christCentre: "Jesus is the focus of every study. He is the Lamb slain, the High Priest interceding, and the King who is coming again."
      }
    ]
  }
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
