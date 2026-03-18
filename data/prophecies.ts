export interface Prophecy {
  id: string;
  number: number;
  title: string;
  subtitle: string;
  symbol: string;
  scripture: string;
  connections: string[];
  href: string;
  reveal: {
    what: string;
    history: string;
    christ: string;
    love: string;
  };
}

export const prophecies: Prophecy[] = [
  {
    id: "dream-statue",
    number: 1,
    title: "The Dream Statue",
    subtitle: "Four kingdoms rise — then one that never ends",
    symbol: "🗿",
    scripture: "Daniel 2:31–45",
    href: "/studies/daniel/daniel-2",
    connections: ["four-beasts", "little-horn", "michael-stands"],
    reveal: {
      what: "Nebuchadnezzar dreams of a colossal statue: head of gold, chest of silver, belly of bronze, legs of iron, feet of iron mixed with clay. A stone cut without hands strikes the feet and becomes a mountain filling the earth.",
      history: "History confirms four successive world empires exactly: Babylon (gold, 605–539 BC), Medo-Persia (silver, 539–331 BC), Greece (bronze, 331–168 BC), Rome (iron, 168 BC–476 AD). Rome never unified into a fifth empire — it split into the nations of Europe (iron mixed with clay), which 'shall not cleave together' (v.43). Napoleon tried. Hitler tried. The EU tries. None have succeeded.",
      christ: "The stone is Christ — 'cut without hands,' born of a virgin, not of human dynasty. His kingdom is the only one described as eternal (v.44). Every other empire was conquered or collapsed. His kingdom alone stands forever. This is the first prophecy in Daniel: it ends with Jesus.",
      love: "God gave a pagan king — not a prophet, not a priest — a vision of the entire arc of human history. That is love: warning the world before the end, leaving no one without a witness.",
    },
  },
  {
    id: "four-beasts",
    number: 2,
    title: "Four Beasts",
    subtitle: "The same story — told from heaven's perspective",
    symbol: "🦁",
    scripture: "Daniel 7:1–8, 15–27",
    href: "/studies/daniel/daniel-7",
    connections: ["dream-statue", "ancient-of-days", "little-horn"],
    reveal: {
      what: "Daniel sees four beasts rise from the sea: a lion with eagle's wings (Babylon), a lopsided bear (Medo-Persia), a four-headed leopard (Greece), and a terrible beast with iron teeth and ten horns (Rome). From among the ten horns a little horn arises, uprooting three, speaking great words against God, wearing out the saints for 'a time, times and half a time.'",
      history: "The four kingdoms map identically to the statue — but now seen as predatory beasts. The ten horns are the ten Germanic kingdoms that divided Rome (Visigoths, Vandals, Ostrogoths, etc.). The little horn uprooted three kingdoms (Heruli 493, Vandals 534, Ostrogoths 538) and ruled for 1,260 years (538–1798 AD), exactly 'a time, times and half a time' using the biblical day-year principle. This is not speculation — it is verified secular history.",
      christ: "The scene ends with the Son of Man receiving dominion, glory, and an everlasting kingdom (v.13–14). This is the title Jesus used most for himself. At his trial before the Sanhedrin he quoted it directly: 'you will see the Son of Man sitting at the right hand of Power and coming on the clouds of heaven' (Matt 26:64). Daniel 7 is Jesus describing his own enthronement.",
      love: "God's final answer to every empire built on violence is not a greater empire. It is a Son of Man — a human figure — who receives his kingdom not by conquest but by the Father's gift. Love, not force, wins in the end.",
    },
  },
  {
    id: "ancient-of-days",
    number: 3,
    title: "The Ancient of Days",
    subtitle: "A courtroom opens in heaven — and the verdict changes everything",
    symbol: "⚖️",
    scripture: "Daniel 7:9–14",
    href: "/studies/daniel/daniel-7",
    connections: ["four-beasts", "seventy-weeks", "michael-stands"],
    reveal: {
      what: "In the same vision as the beasts, Daniel sees heaven open: the Ancient of Days takes his throne — white clothing, white hair, a river of fire before him. Thousands upon thousands attend him. The court sits. Books are opened. Then One like a Son of Man comes on the clouds and is presented before the Ancient of Days and receives an eternal kingdom.",
      history: "The judgment begins after the 1,260-year period of the little horn. Historicist interpreters consistently identified 1798 (when Napoleon ended the papacy's temporal power) as the close of this period — and 1844 (end of the 2,300-day prophecy in Daniel 8) as the beginning of the heavenly judgment. This is not a future event inserted into the end times — it's a heavenly reality that has been underway.",
      christ: "The 'Son of Man' presented before the Ancient of Days is Jesus — enthroned, not returning to earth yet, but receiving authority in heaven first. Hebrews 8–9 confirms Christ entered the Most Holy Place in the heavenly sanctuary. His intercessory work is not passive — it is judicial, priestly, royal. Daniel saw the courtroom. John saw the same in Revelation 4–5. We are living in the hour of his judgment.",
      love: "A God of justice who also opens a courtroom is a God who cares about the truth. Every wrong done under every empire goes on record. The judgment is not a threat — it is the promise that love will have the final word.",
    },
  },
  {
    id: "ram-and-goat",
    number: 4,
    title: "The Ram and the Goat",
    subtitle: "Two empires clash — and a small power rises from the wreckage",
    symbol: "🐏",
    scripture: "Daniel 8:1–14",
    href: "/studies/prophecy/daniel-8",
    connections: ["two-thousand-days", "little-horn", "four-beasts"],
    reveal: {
      what: "A ram with two horns (one higher than the other) charges westward, northward, southward — none can stop it. Then a goat comes from the west with a single conspicuous horn, strikes the ram, breaks its two horns, and becomes very great. The great horn breaks and four horns grow in its place. From one of these four comes a little horn that grows exceedingly great, casts down truth, and defiles the sanctuary for 2,300 days.",
      history: "The angel interprets this directly (v.20–21): the ram is Medo-Persia, the goat is Greece, the great horn is Alexander the Great. Alexander died in 323 BC — his empire split among four generals (Ptolemy, Seleucus, Cassander, Lysimachus). From one of these territories Rome arose — and from Rome came the little horn power that cast down the sanctuary of truth. The names, dates, and geography are all confirmed by secular historians who had never read Daniel.",
      christ: "The sanctuary being 'cast down' and then 'cleansed' points forward to Christ's priestly ministry. The earthly sanctuary was a copy of the heavenly one (Heb 8:2, 5). When the little horn 'cast down truth,' it substituted human tradition for Christ's completed atonement. The 2,300-day prophecy ends at 1844 — when the heavenly sanctuary's cleansing ministry begins. Christ's priesthood cannot be suppressed forever.",
      love: "Even when the sanctuary was defiled and truth was cast down, God did not abandon his people. He counted every day — 2,300 of them — and at the end, restoration. Love keeps count even when the world has forgotten.",
    },
  },
  {
    id: "two-thousand-days",
    number: 5,
    title: "The 2,300 Days",
    subtitle: "The longest time prophecy in Scripture — and it ends with restoration",
    symbol: "📅",
    scripture: "Daniel 8:14",
    href: "/studies/prophecy/daniel-8",
    connections: ["seventy-weeks", "ram-and-goat", "ancient-of-days"],
    reveal: {
      what: "'For 2,300 evenings and mornings; then the sanctuary shall be restored to its rightful state.' This is the only time measurement in Daniel 8. It is left unexplained until Daniel 9, where the angel Gabriel returns to give understanding.",
      history: "Daniel 9's 70 weeks are explicitly 'cut off' from the 2,300 days — they share the same start point: 457 BC (the decree to restore Jerusalem, confirmed by Ezra 7). 70 weeks = 490 years → ends 34 AD. 2,300 days (years) from 457 BC = 1844 AD. In 1844, a worldwide movement independently came to this calculation — and discovered the heavenly sanctuary, not an earthly temple, was the subject. The prophecy had been sealed since Daniel's day. Now it was opened.",
      christ: "Christ is the High Priest of the heavenly sanctuary (Heb 4:14–16). The 2,300-day prophecy is ultimately about him — his priestly work, his judgment, his vindication of those who have trusted him. The sanctuary is restored not by human hands but by Christ completing his work in heaven. Every day of those 2,300 years, grace was still extended. The sanctuary was not abandoned — it was being administered.",
      love: "2,300 years. God held the timeline open — not because he forgot, but because love is patient. Every generation within those years still had access to grace. The restoration came right on time, not a day late.",
    },
  },
  {
    id: "seventy-weeks",
    number: 6,
    title: "The 70 Weeks",
    subtitle: "457 BC. 27 AD. 31 AD. 34 AD. Named to the year — 500 years in advance",
    symbol: "✡️",
    scripture: "Daniel 9:24–27",
    href: "/studies/daniel/daniel-9",
    connections: ["two-thousand-days", "ancient-of-days", "dream-statue"],
    reveal: {
      what: "Gabriel gives Daniel '70 weeks' (490 years) concerning Jerusalem and the Messiah: from the decree to restore Jerusalem → 7 weeks + 62 weeks = 69 weeks (483 years) to 'Messiah the Prince.' In the middle of the 70th week he is 'cut off.' The covenant is confirmed for one week (7 years).",
      history: "The decree of Artaxerxes in 457 BC (Ezra 7) is confirmed by the Elephantine Papyri and Ptolemaic chronology. 457 BC + 483 years = 27 AD — the year of Jesus' baptism and the beginning of his public ministry (Luke 3:1, 21–23). 27 AD + 3.5 years = 31 AD — the year of the crucifixion. 34 AD ends the 70 weeks — when Stephen was stoned and the gospel went to the Gentiles. Every date is externally verified. No other figure in history fits this prophecy.",
      christ: "This is the most precise Messianic prophecy ever written. It names the year of Jesus' baptism, the year of his death, and the duration of his ministry. The phrase 'cut off but not for himself' (v.26, KJV) means he died not for his own sin — he had none — but as a substitute. Daniel predicted substitutionary atonement 500 years before Calvary. The 70 weeks are a telescope pointed directly at Jesus.",
      love: "God did not leave us to wonder if the Messiah had arrived. He wrote the arrival date into the fabric of prophecy 500 years early. That is love that refuses to leave you guessing — love that names the year, the act, and the reason.",
    },
  },
  {
    id: "little-horn",
    number: 7,
    title: "The Little Horn",
    subtitle: "A power that changes times and laws — and speaks against the Most High",
    symbol: "📯",
    scripture: "Daniel 7:8, 20–25 · Daniel 8:9–12",
    href: "/studies/daniel/daniel-7",
    connections: ["four-beasts", "ram-and-goat", "dream-statue"],
    reveal: {
      what: "Across Daniel 7 and 8, a 'little horn' appears with these characteristics: it rises after Rome, uproots three kings, speaks great words against God, thinks to change times and laws, wears out the saints, and persecutes for 'a time, times and half a time' (1,260 years). It also casts down the 'host' and the 'place of his sanctuary.'",
      history: "Reformers Luther, Calvin, Tyndale, Knox, Wesley, and Newton all identified this power as the medieval papacy — not as an individual Antichrist still future, but as an institutional power that claimed authority to change divine law (Sunday observance replacing the Sabbath), persecuted dissenters (Waldensians, Huguenots, Albigensians — estimated millions over the 1,260 years), and declared the Pope to be God's vicar on earth. The Reformation understanding was the dominant Protestant position for 300 years. Futurist reinterpretation arose in the 19th century.",
      christ: "The little horn's power is ultimately defined by its opposition to Christ's priestly work. It 'cast down the place of his sanctuary' — inserting a human priesthood between believers and their High Priest. But Christ is the one mediator (1 Tim 2:5). His finished atonement needs no supplement, no earthly repetition, no human intermediary. The little horn's challenge is ultimately a challenge to the sufficiency of Christ. The answer is Calvary.",
      love: "God warned his people about a power that would distort access to him — because love protects. Knowing the counterfeit helps you recognise the real thing. Every warning in prophecy is love keeping watch.",
    },
  },
  {
    id: "michael-stands",
    number: 8,
    title: "Michael Stands Up",
    subtitle: "The greatest time of trouble — then everyone written in the book is delivered",
    symbol: "⚔️",
    scripture: "Daniel 12:1–4",
    href: "/studies/daniel/daniel-9",
    connections: ["ancient-of-days", "dream-statue", "four-beasts"],
    reveal: {
      what: "'At that time Michael shall stand up, the great prince who stands watch over the sons of your people; and there shall be a time of trouble, such as never was since there was a nation... And at that time your people shall be delivered, every one who is found written in the book. And many of those who sleep in the dust of the earth shall awake...'",
      history: "Daniel 12 is the culmination of all that came before. 'At that time' refers back to the sequence of chapters 10–11. Michael 'standing up' signals the close of the heavenly judgment — the intercessory ministry ends and probation closes. The 'time of trouble such as never was' precedes the Second Coming. The resurrection of the righteous follows immediately — Daniel was told he would 'stand in his lot at the end of the days' (v.13). This is a linear sequence, not a repeating cycle.",
      christ: "Michael in Daniel is not a created angel — he is the Prince of princes (8:25), the great prince who stands for God's people, the one who contends with Satan over Moses' body (Jude 9), the archangel whose voice raises the dead (1 Thess 4:16). Michael is Christ in his role as warrior-defender. When Michael stands up, probation closes — not as punishment, but as the moment when every case has been decided and grace has done its full work. Then he comes. The stone of Daniel 2 strikes. The kingdom of God fills the earth.",
      love: "The last word in Daniel is not judgement — it is resurrection. 'You shall rest and will rise to receive your allotted inheritance.' Love does not let death have the final say. Michael stands up, and everyone written in the book comes home.",
    },
  },
];
