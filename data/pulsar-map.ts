export type StarCategory = 'gospel' | 'prophecy' | 'doctrine'

export type StarStatus = 'live' | 'coming-soon'

export interface PulsarStar {
  id: string
  label: string
  category: StarCategory
  status: StarStatus
  angle: number
  distance: number
  loveConnection: string
  scripture: string
  scriptureText: string
  summary: string
  href: string
}

export interface PulsarMapData {
  centre: {
    title: string
    scripture: string
    tagline: string
  }
  stars: PulsarStar[]
}

export const pulsarMapData: PulsarMapData = {
  centre: {
    title: 'God IS Love',
    scripture: '1 John 4:8',
    tagline: 'Every truth about God is a window into the same light.',
  },
  stars: [

    // ── GOSPEL CLUSTER (top, 300°–60°) ──

    {
      id: 'love-for-god',
      label: 'Love for God',
      category: 'gospel',
      status: 'coming-soon',
      angle: 340,
      distance: 0.52,
      loveConnection: 'We only love because He first loved us — our love for God is a reflection, not a starting point.',
      scripture: '1 John 4:19',
      scriptureText: 'We love because he first loved us.',
      summary: 'Understanding love for God starts by understanding the love of God. This study traces what it means to love a God you cannot see — and why Scripture says it is the only natural response to what He has done.',
      href: '/studies/gospel/love-for-god',
    },
    {
      id: 'righteousness-by-faith',
      label: 'Righteousness by Faith',
      category: 'gospel',
      status: 'coming-soon',
      angle: 15,
      distance: 0.6,
      loveConnection: 'God does not declare us righteous because we earned it — He does it because love gives what justice demands.',
      scripture: 'Romans 3:22',
      scriptureText: 'Righteousness of God through faith in Jesus Christ for all who believe.',
      summary: 'This is the hinge doctrine of the Reformation and the heart of the Gospel. Righteousness by faith is not a legal transaction — it is what love looks like when justice is real.',
      href: '/studies/gospel/righteousness-by-faith',
    },
    {
      id: 'the-resurrection',
      label: 'The Resurrection',
      category: 'gospel',
      status: 'coming-soon',
      angle: 45,
      distance: 0.55,
      loveConnection: 'The resurrection is the proof that God\'s love is stronger than the worst thing that has ever happened.',
      scripture: '1 Corinthians 15:20',
      scriptureText: 'Christ has been raised from the dead, the firstfruits of those who have fallen asleep.',
      summary: 'If the cross is the measure of God\'s love, the resurrection is the guarantee of it. This study shows why the resurrection is not a footnote to the Gospel — it is the Gospel\'s verdict.',
      href: '/studies/gospel/the-resurrection',
    },
    {
      id: 'jesus-at-the-centre',
      label: 'Jesus at the Centre',
      category: 'gospel',
      status: 'coming-soon',
      angle: 320,
      distance: 0.68,
      loveConnection: 'Every prophecy, every doctrine, every command finds its meaning when Jesus stands at the centre.',
      scripture: 'Colossians 1:17',
      scriptureText: 'He is before all things, and in him all things hold together.',
      summary: 'This study is the interpretive key for everything else on this site. It shows why Christ is not the conclusion of Scripture but its constant subject — and why every truth about God is ultimately a truth about Jesus.',
      href: '/studies/gospel/jesus-at-the-centre',
    },

    // ── PROPHECY CLUSTER (right side, 60°–180°) ──

    {
      id: 'daniel-2',
      label: 'Daniel 2',
      category: 'prophecy',
      status: 'live',
      angle: 80,
      distance: 0.72,
      loveConnection: 'God showed a pagan king the entire arc of history — because love warns before it ends.',
      scripture: 'Daniel 2:44',
      scriptureText: 'The God of heaven will set up a kingdom that will never be destroyed.',
      summary: 'A Babylonian king dreams of a statue made of four metals. Daniel interprets it. Six centuries later, every empire in the sequence had risen and fallen exactly as predicted. And the final kingdom — the Stone — is still coming.',
      href: '/studies/daniel/daniel-2',
    },
    {
      id: 'daniel-7',
      label: 'Daniel 7',
      category: 'prophecy',
      status: 'live',
      angle: 110,
      distance: 0.65,
      loveConnection: 'God\'s final answer to every beast and empire is not a greater empire — it is a Son of Man, approaching in love.',
      scripture: 'Daniel 7:13',
      scriptureText: 'One like a son of man, coming with the clouds of heaven.',
      summary: 'Daniel sees four terrifying beasts rise from a stormy sea — the same empires as Daniel 2, now seen from God\'s perspective. But the vision does not end with the beasts. It ends with a heavenly courtroom, a throne of fire, and a figure called the Son of Man receiving an everlasting kingdom.',
      href: '/studies/daniel/daniel-7',
    },
    {
      id: 'daniel-9',
      label: 'Daniel 9',
      category: 'prophecy',
      status: 'live',
      angle: 140,
      distance: 0.75,
      loveConnection: 'God gave a mathematical countdown to the exact year of Jesus\' arrival — because love does not leave you guessing.',
      scripture: 'Daniel 9:25',
      scriptureText: 'From the going out of the word to restore Jerusalem to the coming of an anointed one.',
      summary: 'The 70-week prophecy is the most mathematically precise prophecy in Scripture. Starting with a Persian decree in 457 BC, it predicts the exact year of Jesus\' baptism, the year of His crucifixion, and the moment the Gospel goes to the Gentile world. The numbers land exactly.',
      href: '/studies/daniel/daniel-9',
    },
    {
      id: 'daniel-8',
      label: 'Daniel 8',
      category: 'prophecy',
      status: 'coming-soon',
      angle: 165,
      distance: 0.58,
      loveConnection: 'The 2,300-day prophecy points to a heavenly sanctuary where Jesus intercedes — love that never stops advocating for us.',
      scripture: 'Daniel 8:14',
      scriptureText: 'For 2,300 evenings and mornings. Then the sanctuary shall be restored to its rightful state.',
      summary: 'A ram, a goat, and a little horn that reached toward heaven. Daniel 8 extends the prophetic timeline further than any other chapter — and its climax is not a battle, but a sanctuary being set right. This study shows where that sanctuary is and what is happening there right now.',
      href: '/studies/prophecy/daniel-8',
    },

    // ── DOCTRINE CLUSTER (left/bottom, 180°–340°) ──

    {
      id: 'the-sabbath',
      label: 'The Sabbath',
      category: 'doctrine',
      status: 'coming-soon',
      angle: 200,
      distance: 0.7,
      loveConnection: 'The Sabbath is God saying: I love you enough to stop the clock and simply be with you.',
      scripture: 'Exodus 20:8–11',
      scriptureText: 'Remember the Sabbath day, to keep it holy.',
      summary: 'The Sabbath is the only commandment that begins with the word "remember" — because God knew it would be the most forgotten. This study traces the Sabbath from Eden to the new earth, showing why it is not a burden but a love letter written in time.',
      href: '/studies/doctrine/the-sabbath',
    },
    {
      id: 'state-of-the-dead',
      label: 'State of the Dead',
      category: 'doctrine',
      status: 'coming-soon',
      angle: 225,
      distance: 0.62,
      loveConnection: 'A God of love would never let death be the last word — so He calls it sleep, and promises a waking.',
      scripture: '1 Thessalonians 4:13',
      scriptureText: 'We do not want you to be uninformed about those who sleep in death.',
      summary: 'What happens when you die? Scripture\'s answer is consistent, compassionate, and surprising to many. This study examines what the Bible actually says — and why the truth is far more comforting than the alternatives most people have been taught.',
      href: '/studies/doctrine/state-of-the-dead',
    },
    {
      id: 'second-coming',
      label: 'The Second Coming',
      category: 'doctrine',
      status: 'coming-soon',
      angle: 255,
      distance: 0.72,
      loveConnection: 'Jesus is coming back because love does not abandon — it always returns.',
      scripture: 'John 14:3',
      scriptureText: 'I will come again and take you to myself, that where I am you may be also.',
      summary: 'The Second Coming is not a threat — it is a promise made by someone who keeps His word. This study traces every strand of biblical prophecy that points toward that day, and shows why it is the most hope-filled event in Scripture.',
      href: '/studies/doctrine/second-coming',
    },
    {
      id: 'the-sanctuary',
      label: 'The Sanctuary',
      category: 'doctrine',
      status: 'coming-soon',
      angle: 282,
      distance: 0.55,
      loveConnection: 'Every piece of furniture in the sanctuary tells the same story: God is building a way back to Himself.',
      scripture: 'Hebrews 8:1–2',
      scriptureText: 'We have such a high priest, one who is seated at the right hand of the throne.',
      summary: 'The earthly sanctuary was a physical model of something real happening in heaven. This study walks through every element — the altar, the laver, the Holy Place, the Most Holy — and shows how each one is a frame around the face of Jesus.',
      href: '/studies/doctrine/the-sanctuary',
    },
    {
      id: 'the-law',
      label: 'The Law',
      category: 'doctrine',
      status: 'coming-soon',
      angle: 305,
      distance: 0.65,
      loveConnection: 'The law is not a cage — it is a portrait of God\'s own character, and His character is love.',
      scripture: 'Romans 13:10',
      scriptureText: 'Love is the fulfilling of the law.',
      summary: 'Is the law grace or demand? The Bible\'s answer is both — and neither contradicts the other. This study shows why Jesus said he came not to abolish the law but to fulfil it, and what that means for how we live now.',
      href: '/studies/doctrine/the-law',
    },
  ],
}
