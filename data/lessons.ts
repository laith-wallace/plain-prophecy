export interface Lesson {
  slug: string;
  number: number;
  title: string;
  subtitle: string;
  symbol: string;
  scripture: string;
  readingTime: string; // e.g. "8 min"
  summary: string;
  sections: {
    heading: string;
    body: string[]; // paragraphs
    callout?: { label: string; text: string };
  }[];
  keyDates?: { date: string; event: string }[];
  relatedSlugs: string[];
}

export const lessons: Lesson[] = [
  {
    slug: "day-year-principle",
    number: 1,
    title: "The Day-Year Principle",
    subtitle: "How one interpretive key unlocks the entire prophetic calendar",
    symbol: "📐",
    scripture: "Numbers 14:34 · Ezekiel 4:6",
    readingTime: "7 min",
    summary:
      "The day-year principle is the hermeneutical foundation of Historicist prophecy. It is not invented — it is stated twice in plain Scripture, confirmed by internal evidence across Daniel and Revelation, and validated by every major time prophecy landing precisely on verifiable historical dates.",
    sections: [
      {
        heading: "What is the Day-Year Principle?",
        body: [
          "The day-year principle states that in symbolic, apocalyptic prophecy, one prophetic day represents one literal year. It is not a hermeneutical invention of the Reformers or of SDA theologians. It is stated explicitly in Scripture — twice.",
          "Numbers 14:34: 'After the number of the days in which ye searched the land, even forty days, each day for a year, shall ye bear your iniquities, even forty years.' God himself converted days to years in a non-symbolic passage.",
          "Ezekiel 4:6: 'I have appointed thee each day for a year.' Again, God explicitly applies the day-year equivalence in a prophetic context.",
          "These two plain-text statements establish the principle. The prophetic application then follows naturally: when Daniel and Revelation give time periods in days (or 'times'), the Historicist applies the divinely stated equivalence — one day equals one year.",
        ],
      },
      {
        heading: "The Internal Evidence from Daniel",
        body: [
          "Daniel's time prophecies use three overlapping expressions for the same period: 'a time, times and half a time' (Dan 7:25; 12:7), '1,260 days' (Rev 12:6), and '42 months' (Rev 13:5). All three describe identical durations using different units — months of 30 days, days explicitly, and 'times' (years in Aramaic).",
          "A time = 1 year (360 days), times = 2 years (720 days), half a time = 0.5 year (180 days). Total: 1,260 days. Applied as years: 1,260 years.",
          "The convergence of three independently worded expressions on the same number is not coincidence — it is an internal confirmation that the prophetic measurements are meant to be taken as years.",
        ],
        callout: {
          label: "Verification",
          text: "Applied historically: 538 AD (Justinian's decree establishing the papacy's supremacy) to 1798 AD (Napoleon captures Pope Pius VI) = exactly 1,260 years. This is not approximate — it is exact to the year, verified by secular historians.",
        },
      },
      {
        heading: "Why Futurism Rejects It — and What That Costs",
        body: [
          "Evangelical futurism rejects the day-year principle in order to compress Daniel's time prophecies into a literal 3.5-year 'Great Tribulation' inserted at the end of history. But this creates an insurmountable problem: the 70 weeks of Daniel 9.",
          "If Daniel 9's 70 weeks are literal weeks (490 days = 1.37 years), they cannot possibly reach from Daniel's day to Christ's first coming. The math is irreconcilable. Futurism must therefore split the 70 weeks: 69 weeks literal, then a 2,000-year 'gap,' then the 70th week resumed at the end of time.",
          "But the text contains no gap. Gabriel says the 70 weeks are 'determined' — cut off as a single unit. Inserting a 2,000-year gap into a 490-year prophecy is not exegesis — it is eisegesis. The day-year principle, by contrast, makes the 70 weeks land precisely on the dates of Jesus' baptism, death, and the gospel's extension to the Gentiles.",
          "The interpretive cost of rejecting the day-year principle is the entire prophetic structure of Daniel. The benefit of accepting it is a coherent, verifiable timeline that converges on Jesus Christ.",
        ],
      },
      {
        heading: "Historical Consensus",
        body: [
          "The day-year principle was not invented by Seventh-day Adventists. It was the standard Protestant interpretation from the Reformation until the mid-19th century. Joachim of Fiore (12th century), John Wycliffe (14th century), William Tyndale, Martin Luther, Philip Melanchthon, John Calvin, John Knox, Isaac Newton, John Wesley, and Jonathan Edwards all accepted it.",
          "Isaac Newton devoted decades to its mathematical verification in his 'Observations upon the Prophecies of Daniel.' He was not a fringe thinker — he was the most rigorous scientific mind of his era. He found the prophecies, interpreted with the day-year principle, to be mathematically precise.",
          "The Futurist reinterpretation that abandoned the day-year principle originated with Francisco Ribera (1590), a Spanish Jesuit writing specifically to deflect Protestant identification of the papacy with the Antichrist. This is not a Protestant innovation — it is a Counter-Reformation reinterpretation that entered Protestantism only in the 19th century through John Nelson Darby.",
        ],
      },
    ],
    keyDates: [
      { date: "538 AD", event: "Justinian's decree — start of 1,260 years" },
      { date: "1798 AD", event: "Napoleon captures Pope Pius VI — end of 1,260 years" },
      { date: "457 BC", event: "Artaxerxes' decree — start of 70 weeks (2,300 days)" },
      { date: "27 AD", event: "Jesus baptised — end of 69 weeks" },
      { date: "31 AD", event: "Crucifixion — middle of 70th week" },
      { date: "1844 AD", event: "End of 2,300 years — heavenly judgment begins" },
    ],
    relatedSlugs: ["seventy-weeks-decoded", "twelve-sixty-years", "futurism-origins"],
  },
  {
    slug: "seventy-weeks-decoded",
    number: 2,
    title: "The 70 Weeks Decoded",
    subtitle: "The most precisely verified prophecy in the Bible — named to the year, 500 years in advance",
    symbol: "✡️",
    scripture: "Daniel 9:24–27",
    readingTime: "10 min",
    summary:
      "Daniel 9's 70 weeks (490 years) predicted the exact year of Jesus' baptism, the exact year of his death, and the duration of his ministry — all from a starting date confirmed by independent archaeology. No other interpretation of this passage produces verifiable results.",
    sections: [
      {
        heading: "The Decree: 457 BC",
        body: [
          "Gabriel tells Daniel that 70 weeks are 'determined' (literally 'cut off') upon 'thy people and thy holy city.' The clock begins with 'the going forth of the commandment to restore and to build Jerusalem' (Dan 9:25).",
          "Three decrees were issued regarding Jerusalem (Cyrus in 538 BC, Darius in 520 BC, Artaxerxes in 457 BC). Only the 457 BC decree of Artaxerxes I (recorded in Ezra 7) authorised the full restoration of Jerusalem's civil and judicial governance. The other two concerned only the temple.",
          "The 457 BC date is confirmed by multiple independent sources: the Elephantine Papyri (Jewish documents from the Persian period), Ptolemaic chronology, and internal consistency with Ezra 7–8. It is not a calculated date working backward from Jesus — it is an independently verified historical anchor.",
        ],
        callout: {
          label: "The Decree",
          text: "Artaxerxes I issued his decree in his 7th regnal year — 457 BC by universal scholarly consensus. Ezra 7 records it in detail. The Elephantine Papyri corroborate his reign dates.",
        },
      },
      {
        heading: "Seven Weeks + Sixty-Two Weeks: 483 Years to Messiah",
        body: [
          "Daniel 9:25 says from the decree to 'Messiah the Prince' shall be 'seven weeks and threescore and two weeks' — 69 weeks total. 69 × 7 = 483 years.",
          "457 BC + 483 years = 27 AD. (Remember: there is no year zero — 1 BC is immediately followed by 1 AD, so subtract 1.)",
          "In 27 AD, Jesus came to the Jordan River and was baptised by John. At his baptism, the Holy Spirit descended on him, the Father spoke from heaven, and his public ministry began. Luke 3:1 places this in the 15th year of Tiberius Caesar — which is 27–28 AD by standard historical reckoning.",
          "Luke 3:23 notes Jesus was 'about thirty years of age' when he began his ministry. Born in approximately 4 BC (the standard scholarly date, due to Herod the Great dying in 4 BC), baptised at 27 AD — the ages align perfectly.",
          "Gabriel said the Messiah would arrive in 483 years from 457 BC. He did. This is not a fuzzy approximation. It is exact.",
        ],
      },
      {
        heading: "The Middle of the 70th Week: 31 AD",
        body: [
          "Daniel 9:27 says the Messiah 'shall cause the sacrifice and the oblation to cease' in the middle of the 70th week. If the 70th week begins in 27 AD, its midpoint is 3.5 years later: 31 AD.",
          "Jesus was crucified in 31 AD. At the moment of his death, the temple veil was torn from top to bottom (Matt 27:51). The sacrificial system — which pointed forward to Christ — ceased to have theological meaning. The lamb that the sacrifices prefigured had been slain.",
          "The phrase 'cause sacrifice and oblation to cease' does not mean Jesus abolished the Jewish ceremonial law by force. It means his death made it obsolete — the shadow met the reality. Paul articulates this in Colossians 2:16–17 and Hebrews 10:1–14.",
          "31 AD as the crucifixion year is disputed among scholars (with 30 AD, 31 AD, and 33 AD all having defenders), but 31 AD is consistent with the astronomical data for Passover, the chronology of Tiberius, and Daniel's prophecy. The prophetic calculation demands it — and the historical data supports it.",
        ],
        callout: {
          label: "The Torn Veil",
          text: "Matthew 27:51 — 'the veil of the temple was rent in twain from the top to the bottom.' This was not coincidence. It was the visible end of the sacrificial system — fulfilled in Christ, ceased at his death, exactly when Daniel said.",
        },
      },
      {
        heading: "The End of the 70 Weeks: 34 AD",
        body: [
          "The 70th week ends in 34 AD — exactly 490 years from 457 BC. In 34 AD, Stephen was stoned (Acts 7) — the first Christian martyr and the formal rejection of the gospel by the Jewish leadership. Following Stephen's death, the disciples were scattered (Acts 8:1), and Philip, Peter, and Paul began taking the gospel to the Samaritans and Gentiles.",
          "The 70 weeks were determined upon 'thy people' — Israel as a nation. When the Jewish leadership made their final rejection in 34 AD, the exclusive focus on Israel as God's covenant people gave way to the universal gospel call: 'Go ye therefore and teach all nations' (Matt 28:19).",
          "Daniel's prophecy predicted not just the dates, but the theological turning point: the Messiah would come, be cut off, confirm the covenant, and the focus would broaden beyond Israel. Every element was fulfilled in precise sequence.",
        ],
      },
      {
        heading: "The Futurist Gap — and Why It Fails",
        body: [
          "Futurist interpreters split the 70 weeks: 69 weeks are applied to Christ's first coming (literally or by day-year), then a 2,000-year gap is inserted, and the 70th week is pushed to the end of history as a future 7-year Tribulation period.",
          "But the text provides no gap. Gabriel says the 70 weeks are 'determined' — a Hebrew word (neḥtaq) meaning 'cut off as a unit.' There is no grammatical, syntactical, or logical basis for inserting a gap of indefinite length between the 69th and 70th weeks.",
          "Moreover, if the 70th week is still future, then Christ did not confirm the covenant in the middle of the 70th week — making 31 AD theologically un-anchored in Daniel. The Historicist reading is internally coherent. The Futurist reading requires a grammatically unsupported gap to make the text fit a system it was never designed to support.",
        ],
      },
    ],
    keyDates: [
      { date: "457 BC", event: "Artaxerxes' decree — 70 weeks begin" },
      { date: "27 AD", event: "Jesus baptised — 'Messiah the Prince' (end of 69 weeks)" },
      { date: "31 AD", event: "Crucifixion — middle of 70th week, sacrifices cease" },
      { date: "34 AD", event: "Stephen stoned — end of 70 weeks, gospel goes to Gentiles" },
    ],
    relatedSlugs: ["day-year-principle", "twelve-sixty-years", "heavenly-sanctuary"],
  },
  {
    slug: "twelve-sixty-years",
    number: 3,
    title: "The 1,260 Years",
    subtitle: "Six independent Bible texts. One historical period. Verified to the year.",
    symbol: "⏳",
    scripture: "Daniel 7:25 · Revelation 12:6, 14 · Revelation 13:5",
    readingTime: "8 min",
    summary:
      "The 1,260-year period is the most heavily attested time prophecy in Scripture — stated six times using three different units of measurement. Applied historically, it runs from 538 AD to 1798 AD and is confirmed by secular historians who had no prophetic agenda.",
    sections: [
      {
        heading: "Six Witnesses to One Period",
        body: [
          "The 1,260-year period is not mentioned once in Scripture — it is mentioned six times, using three different formulations:",
          "'A time, times and half a time' — Daniel 7:25; Daniel 12:7; Revelation 12:14",
          "'1,260 days' — Revelation 11:3; Revelation 12:6",
          "'42 months' — Revelation 11:2; Revelation 13:5",
          "All three expressions describe the same duration: a 'time' (one year of 360 days) + 'times' (two years, 720 days) + 'half a time' (180 days) = 1,260 days = 42 months of 30 days each.",
          "The convergence of six independent statements, using three different units, all arriving at 1,260 is not coincidental. It is the prophetic equivalent of nailing the same notice to the door six times. This period matters.",
        ],
        callout: {
          label: "The Number",
          text: "1,260 days = 42 months = 3.5 years = 'a time, times and half a time.' Six different references. One period.",
        },
      },
      {
        heading: "538 AD: The Starting Point",
        body: [
          "Applying the day-year principle, the 1,260 days become 1,260 years. The question is: when did they begin?",
          "In 533–538 AD, Emperor Justinian I issued a series of decrees establishing the Bishop of Rome as 'head of all the holy churches' and 'corrector of heretics.' In 538 AD, the last obstacle to papal supremacy — the Ostrogoth kingdom — was defeated at Rome. The papacy emerged as the dominant religious and increasingly political power of the Western world.",
          "Secular historians date the establishment of papal temporal power to this exact period. It is not a date calculated backward from 1798 — it is independently documented by historians of the late Roman and early medieval period.",
        ],
      },
      {
        heading: "1798 AD: The End Point",
        body: [
          "1,260 years after 538 AD is 1798 AD. In February 1798, General Louis-Alexandre Berthier, acting under Napoleon Bonaparte's orders, entered Rome and took Pope Pius VI prisoner. Pius VI died in captivity in Valence, France, in 1799.",
          "For the first time in over a millennium, the papacy had no temporal power. The Papal States were dissolved. A pope died in captivity under a foreign power. Many observers at the time believed the papacy would never recover.",
          "This is the 'deadly wound' of Revelation 13:3 — and the prophecy notes that the wound would be healed. The healing began with the 1929 Lateran Treaty, which restored Vatican statehood, and has continued to the present day as the papacy has regained global diplomatic and spiritual influence.",
        ],
        callout: {
          label: "1798",
          text: "Berthier entered Rome on February 15, 1798. Pius VI was taken prisoner. The French Republic abolished the Papal States. 1,260 years after 538 AD — to the year.",
        },
      },
      {
        heading: "What Happened During Those 1,260 Years",
        body: [
          "Daniel 7:25 describes what the little horn power would do during this period: 'He shall speak great words against the Most High, and shall wear out the saints of the Most High, and think to change times and laws.'",
          "The historical record during 538–1798 AD includes: the Inquisition, the Crusades against the Waldensians and Albigensians, the burning of Jan Hus, William Tyndale, Hugh Latimer, and thousands of others who refused to submit to papal authority. Historians estimate between 50 and 100 million people died during this period for religious nonconformity.",
          "The 'change of times and laws' is reflected in the substitution of Sunday for the Sabbath — a change acknowledged in Catholic catechisms as the church's prerogative — and the alteration of the Ten Commandments in catechetical teaching (removing the second commandment about images, splitting the tenth).",
          "These are not Protestant polemics. They are documented in Catholic sources, secular histories, and are openly acknowledged by Catholic theologians today.",
        ],
      },
      {
        heading: "The Reformation Consensus",
        body: [
          "Every major Protestant Reformer identified the 1,260-year period with the medieval papacy. This was not fringe anti-Catholic prejudice — it was the considered exegetical conclusion of the best biblical scholars of the 16th–18th centuries.",
          "Martin Luther (1483–1546): identified the papacy as the Antichrist based on Daniel 7 and Revelation 13.",
          "John Calvin (1509–1564): 'Daniel's little horn is the papacy.' (Commentary on Daniel)",
          "Isaac Newton (1643–1727): spent decades calculating the 1,260 years in his 'Observations upon the Prophecies of Daniel and the Apocalypse.' He arrived at 538 as the starting point.",
          "John Wesley (1703–1791): 'He [the Pope] is, in an emphatical sense, the Man of Sin.' (Notes on the New Testament, 2 Thess 2:3)",
          "The abandonment of this consensus in 19th-century Protestantism was not the result of better exegesis — it was the result of Jesuit counter-reformation theology entering Protestant circles through John Nelson Darby and the Plymouth Brethren.",
        ],
      },
    ],
    keyDates: [
      { date: "533 AD", event: "Justinian's Code elevates Bishop of Rome" },
      { date: "538 AD", event: "Ostrogoths expelled — papal supremacy established" },
      { date: "1798 AD", event: "Napoleon's general takes Pope Pius VI prisoner" },
      { date: "1799 AD", event: "Pius VI dies in French captivity" },
      { date: "1929 AD", event: "Lateran Treaty — Vatican statehood restored ('wound healed')" },
    ],
    relatedSlugs: ["day-year-principle", "little-horn-identified", "futurism-origins"],
  },
  {
    slug: "little-horn-identified",
    number: 4,
    title: "The Little Horn Identified",
    subtitle: "What the Reformers believed — and why they believed it so confidently",
    symbol: "📯",
    scripture: "Daniel 7:8, 20–25 · Daniel 8:9–12",
    readingTime: "9 min",
    summary:
      "The 'little horn' of Daniel 7 and 8 is described with eight specific characteristics. Historicists argue that only one institution in history matches all eight — and that institution is the medieval papacy as a religio-political system, not an individual future ruler.",
    sections: [
      {
        heading: "Eight Identifying Marks",
        body: [
          "Daniel 7 describes the little horn with remarkable specificity. A responsible interpretation must identify a power that matches all of these characteristics — not just some.",
          "1. It rises from the fourth kingdom (Rome) — not from Greece or Persia or Babylon.",
          "2. It arises after the ten horns (the ten Germanic kingdoms that divided Rome — 5th–6th centuries AD).",
          "3. It is 'diverse' from the other kingdoms — different in character (religious as well as political).",
          "4. It uproots three of the ten horns — three kingdoms are removed before it.",
          "5. It 'speaks great words against the Most High' — makes blasphemous claims.",
          "6. It 'wears out the saints' — a long period of persecution.",
          "7. It 'thinks to change times and laws' — claims authority to alter divine ordinances.",
          "8. It rules for 'a time, times and half a time' — 1,260 years.",
        ],
        callout: {
          label: "The Test",
          text: "Any candidate for the 'little horn' must satisfy all eight criteria. Futurist candidates (a future individual Antichrist) fail on criteria 1, 2, 4, 7, and 8 — they are not from Rome, did not uproot three specific kingdoms, and cannot rule for a period that already ended in 1798.",
        },
      },
      {
        heading: "The Papal System: All Eight Criteria",
        body: [
          "The medieval papacy as an institutional power satisfies all eight criteria:",
          "1. Arose from Rome — the Bishop of Rome's authority derives entirely from the imperial Roman context.",
          "2. Arose after the ten horns — the papacy's temporal power was established in 538 AD, after the Germanic kingdoms had already divided Rome.",
          "3. Diverse from other kingdoms — it was a theocratic religious institution claiming spiritual and temporal authority, unlike any secular kingdom.",
          "4. Uprooted three horns — the Heruli (493 AD), Vandals (534 AD), and Ostrogoths (538 AD) were all destroyed specifically because they were Arian Christians who opposed papal supremacy. Secular history confirms all three were removed in direct connection with the establishment of papal authority.",
          "5. 'Great words against the Most High' — papal titles including 'Vicar of Christ,' 'Holy Father,' claims to forgive sin, and the doctrine of papal infallibility (1870).",
          "6. 'Wore out the saints' — the 1,260 years of persecution of Waldensians, Huguenots, Albigensians, and Protestant Reformers.",
          "7. 'Change times and laws' — acknowledged substitution of Sunday for Sabbath, alteration of the Decalogue in catechetical teaching.",
          "8. 1,260 years — 538 AD to 1798 AD, exact.",
        ],
      },
      {
        heading: "The Reformers Were Not Reacting — They Were Exegeting",
        body: [
          "It is common to dismiss the Reformers' identification of the papacy as anti-Catholic polemics driven by political conflict. But this misreads history. The Reformers did not first decide they disliked the papacy and then find texts to support it.",
          "Luther's identification of the papacy with the Antichrist of Daniel 7 came from his study of the Greek and Hebrew texts of Scripture — and his realization that the claims of the papacy directly contradicted what Scripture said about the mediatorial role of Christ and the sufficiency of his atonement.",
          "Calvin's commentary on Daniel is systematic exegesis, not polemic. He identifies the little horn's characteristics one by one and matches them to the historical record.",
          "Isaac Newton — a mathematical genius with no ecclesiastical axe to grind — arrived at the same conclusion through historical and chronological analysis of Daniel.",
          "The Historicist identification is not a product of hatred. It is the result of rigorously applying the text to history and asking: what power matches every characteristic?",
        ],
      },
      {
        heading: "The Futurist Alternative — and Its Problems",
        body: [
          "Futurist interpreters identify the little horn as a future individual — a world dictator who will arise at the end of time, rebuild the Jewish temple, sign a 7-year peace treaty with Israel, and break it at the midpoint.",
          "But this candidate fails on multiple criteria. No future individual can satisfy criterion 4 (uprooting three specific Germanic kingdoms) — those kingdoms ceased to exist in the 6th century. No future individual can satisfy criterion 8 (1,260 years) if the period is taken literally as 3.5 years — a single ruler cannot 'wear out the saints' in 3.5 years the way the prophetic language implies.",
          "More fundamentally, futurism requires the gap: 69 weeks of Daniel 9 historically fulfilled, then a 2,000-year pause, then 70th week resumed. The text supports no such gap.",
          "Futurism arose as a systematic theology in Jesuit circles (Ribera, 1590; Lacunza, 1812) specifically to counter the Reformation identification. It entered Protestant circles in the 19th century. This historical origin does not make it wrong — but it should prompt careful scrutiny of whether the exegesis or the apologetic agenda is driving the interpretation.",
        ],
      },
    ],
    keyDates: [
      { date: "493 AD", event: "Heruli kingdom destroyed — first horn uprooted" },
      { date: "534 AD", event: "Vandal kingdom destroyed — second horn uprooted" },
      { date: "538 AD", event: "Ostrogoth kingdom expelled — third horn uprooted, little horn established" },
      { date: "1798 AD", event: "Papal temporal power ends — 1,260 years close" },
      { date: "1590 AD", event: "Ribera publishes Futurist commentary — Jesuit counter-reformation" },
    ],
    relatedSlugs: ["twelve-sixty-years", "day-year-principle", "futurism-origins"],
  },
  {
    slug: "heavenly-sanctuary",
    number: 5,
    title: "The Heavenly Sanctuary",
    subtitle: "What Daniel 8:14 really means — and why it matters for us now",
    symbol: "⚖️",
    scripture: "Daniel 8:14 · Hebrews 8:1–2 · Revelation 11:19",
    readingTime: "9 min",
    summary:
      "Daniel 8:14 ('Unto 2,300 evenings and mornings; then shall the sanctuary be cleansed') is one of the most misunderstood verses in Scripture. When understood through the lens of the Levitical sanctuary system and the book of Hebrews, it describes a heavenly judicial process that is not future — it has been underway since 1844.",
    sections: [
      {
        heading: "The Earthly Sanctuary: A Copy of the Heavenly",
        body: [
          "To understand Daniel 8:14, you must understand what a sanctuary is in biblical theology. The Levitical sanctuary — first the tabernacle, then the temple — was not a permanent establishment. Hebrews 8:2 calls the heavenly sanctuary 'the true tabernacle which the Lord pitched, and not man.' Hebrews 8:5 calls the earthly sanctuary 'a copy and shadow of heavenly things.'",
          "The earthly sanctuary had two compartments: the Holy Place (entered daily by priests) and the Most Holy Place (entered once a year, on the Day of Atonement, by the High Priest alone). This annual ceremony, described in Leviticus 16, was the cleansing of the sanctuary — the judicial settlement of all sins confessed during the year.",
          "If the earthly sanctuary was a copy, then the heavenly original has corresponding realities. The heavenly sanctuary has a Holy Place ministry (intercessory) and a Most Holy Place ministry (judicial). Daniel 8:14 concerns the transition from one to the other.",
        ],
        callout: {
          label: "The Pattern",
          text: "Exodus 25:40 — 'See that thou make them after their pattern, which was shown thee in the mount.' The earthly sanctuary was built to a heavenly blueprint. The heavenly original has a High Priest — Jesus Christ (Heb 4:14).",
        },
      },
      {
        heading: "The 2,300 Days: When Does the Cleansing Begin?",
        body: [
          "Daniel 8:14 gives a time — 2,300 evenings and mornings — before 'the sanctuary shall be restored to its rightful state' (ESV) or 'cleansed' (KJV). The Hebrew word for 'cleansed' (nitsdaq) means 'to be put right' or 'vindicated' — it is not merely a physical cleaning but a judicial restoration.",
          "The 2,300 days, using the day-year principle, become 2,300 years. From the starting point of 457 BC (the same decree that begins the 70 weeks of Daniel 9, since Gabriel tells Daniel in chapter 9 that the 70 weeks are 'cut off' from the larger 2,300), we calculate: 457 BC + 2,300 years = 1844 AD.",
          "The 70 weeks (490 years) are a subset of the 2,300 years. They begin together in 457 BC. The 70 weeks end in 34 AD. The 2,300 years end in 1844 AD, at which point the heavenly sanctuary's cleansing — the pre-Advent judgment — begins.",
        ],
      },
      {
        heading: "1844 and the Pre-Advent Judgment",
        body: [
          "The concept of a 'pre-Advent judgment' surprises many Christians who assume that all judgment is post-Second Coming. But Revelation 14:7 announces 'the hour of his judgment is come' before Christ's return — while probation is still open.",
          "Daniel 7:9–10 shows the same event: the Ancient of Days takes his throne, books are opened, and judgment begins — before the Son of Man receives his kingdom and descends to earth. The sequence is: judgment in heaven → then Second Coming to earth.",
          "This is consistent with the legal logic of Scripture. Before an executive act (the Second Coming), there is a judicial act (the heavenly judgment). Jesus cannot return with his reward until each case has been decided: 'Behold, I come quickly; and my reward is with me, to give every man according as his work shall be' (Rev 22:12).",
          "The pre-Advent judgment is not about God needing information — he knows all things. It is the opening of the books before the universe, demonstrating the justice of God's decisions and the basis on which each person is saved or lost.",
        ],
        callout: {
          label: "Revelation 22:12",
          text: "'Behold, I come quickly; and my reward is with me, to give every man according as his work shall be.' Jesus returns with decisions already made. The judgment precedes the coming.",
        },
      },
      {
        heading: "Christ as Our High Priest",
        body: [
          "Hebrews 4:14–16 is the practical anchor of this doctrine: 'We have a great high priest, that is passed into the heavens, Jesus the Son of God... Let us therefore come boldly unto the throne of grace, that we may obtain mercy and find grace to help in time of need.'",
          "The Levitical High Priest was the only person who could enter the Most Holy Place — the place of God's presence. Jesus is our High Priest in the heavenly Most Holy Place. His intercessory ministry is not passive sympathy — it is active legal advocacy before the Father on behalf of every believer.",
          "The little horn of Daniel 8 'cast down the sanctuary' by substituting a human priesthood, an ongoing sacrifice (the mass), and the authority of tradition for the completed, sufficient atonement of Christ. The cleansing of the sanctuary is the restoration of Christ's unique, unrepeatable, all-sufficient priestly ministry.",
          "For the believer, this means: you have direct access to God through Christ. There is one mediator between God and humanity — Jesus Christ (1 Tim 2:5). His blood is sufficient. His intercession is continuous. His judgment is just.",
        ],
      },
    ],
    keyDates: [
      { date: "457 BC", event: "2,300-year prophecy begins (shared start with 70 weeks)" },
      { date: "31 AD", event: "Crucifixion — Christ enters heavenly Holy Place as High Priest" },
      { date: "1798 AD", event: "End of 1,260 years — pre-Advent judgment approaches" },
      { date: "1844 AD", event: "End of 2,300 years — heavenly Most Holy Place ministry begins" },
    ],
    relatedSlugs: ["day-year-principle", "seventy-weeks-decoded", "twelve-sixty-years"],
  },
  {
    slug: "futurism-origins",
    number: 6,
    title: "Where Futurism Came From",
    subtitle: "A 19th-century innovation with 16th-century Jesuit roots",
    symbol: "🔍",
    scripture: "2 Thessalonians 2:1–12 · 1 Timothy 4:1",
    readingTime: "8 min",
    summary:
      "Evangelical futurism — the rapture, 7-year tribulation, rebuilt temple, and future individual Antichrist — is not the ancient Christian interpretation of Daniel and Revelation. It originated in specific, traceable historical circumstances as a Counter-Reformation response to Protestant biblical scholarship.",
    sections: [
      {
        heading: "The Reformation Identification",
        body: [
          "By the time of the Protestant Reformation, the mainstream interpretation of Daniel 7 and Revelation 13 was that the 'little horn' and the 'beast' referred to the papacy as an institution — not to a future individual ruler.",
          "This interpretation was not new with Luther. It had been developing since the Waldensians, Wycliffe (14th century), and Huss (15th century). The Reformers systematised it, gave it exegetical grounding, and made it the explicit theological position of Protestantism.",
          "The practical consequence was significant: if the papacy is the Antichrist of Daniel and Revelation, then Rome's spiritual claims are undermined. The Reformation was not merely a dispute about indulgences — it was a challenge to the entire theological and political structure of medieval Catholicism.",
        ],
      },
      {
        heading: "The Jesuit Response: Ribera and Preterist-Futurist Counter-Readings",
        body: [
          "The Roman Catholic response to this identification was systematic. Two Spanish Jesuit scholars — in the same era — produced two alternative interpretive systems designed to deflect the Reformation's charge.",
          "Francisco Ribera (1537–1591) published a 500-page commentary on Revelation in 1590. His key move: restrict the first few chapters of Revelation to ancient Rome, and push everything else into the distant future — specifically, a 3.5-year period at the end of time, involving a future individual Antichrist who would deny Christ, rebuild the Jewish temple, abolish Christianity, and claim to be God. This became 'Futurism.'",
          "Luis de Alcázar (1554–1613) went the other direction: all of Revelation was already fulfilled in the first few centuries, referring to pagan Rome and Jewish persecution. This became 'Preterism.'",
          "Both systems share the same goal: remove the papacy from the frame of prophetic fulfillment. Futurism pushes the Antichrist into the future. Preterism places it in the past. Neither allows that an ongoing institutional power — one contemporaneous with the Reformers — could be the subject of Daniel's prophecies.",
        ],
        callout: {
          label: "The Date",
          text: "Francisco Ribera published 'In Sacrum Beati Ioannis Apostoli & Evangelistiae Apocalypsin Commentarij' in 1590. This is the founding document of modern evangelical futurism.",
        },
      },
      {
        heading: "The 19th-Century Protestant Adoption",
        body: [
          "Ribera's futurism remained largely within Catholic scholarship for two centuries. The mechanism by which it entered Protestantism is traceable.",
          "Manuel Lacunza (1731–1801), a Chilean Jesuit, wrote 'The Coming of Messiah in Glory and Majesty' under the pseudonym 'Juan Josafat Ben-Ezra' (disguised as a converted Jew to make the book more palatable to Protestants). His work popularised futurist ideas in Protestant contexts.",
          "Edward Irving (1792–1834), a Scottish Presbyterian minister, translated Lacunza into English and added his own commentary. Irving was fascinated by the end times and built a significant following in London.",
          "John Nelson Darby (1800–1882), the Plymouth Brethren leader, attended Irving's prophetic conferences, absorbed the futurist framework, and systematised it into what became known as 'dispensationalism.' Darby added the pre-tribulation rapture — the idea that Christians would be secretly caught away before the 7-year tribulation — a concept with no precedent in 1,800 years of Christian interpretation.",
          "Through Darby's influence, through the Scofield Reference Bible (1909), and through 20th-century evangelical culture, dispensational futurism became the default prophetic framework of American Protestantism. It is now so embedded that most evangelical Christians assume it is the ancient, obvious reading of Scripture.",
          "It is not. It is 170 years old in Protestant circles and originated as a Jesuit counter-reformation apologetic.",
        ],
      },
      {
        heading: "What This Means for Interpretation",
        body: [
          "The historical origin of futurism does not automatically make it wrong — the genetic fallacy cuts both ways. But it should prompt the question: does futurism succeed or fail on exegetical grounds, independently of its origins?",
          "The evidence examined in these lessons suggests it fails: the gap in Daniel 9 is grammatically unsupported, the day-year principle is explicitly stated in Scripture, the historical fulfillments of the 1,260 years are exact, and the little horn's characteristics all match the medieval papacy rather than a future individual.",
          "The Historicist interpretation, by contrast, was the dominant Protestant reading for 300 years, was developed by scholars with no denominational axe to grind (Newton was not SDA), and produces verifiable historical predictions that can be checked against secular history.",
          "The question is not: which interpretation is more comfortable? The question is: which interpretation treats the text of Daniel and Revelation as serious prophetic literature whose fulfillments can be examined and tested?",
        ],
      },
    ],
    relatedSlugs: ["day-year-principle", "little-horn-identified", "twelve-sixty-years"],
  },
];
