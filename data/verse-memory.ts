export type VerseBook =
  | "daniel"
  | "revelation"
  | "isaiah"
  | "genesis"
  | "psalms"
  | "zechariah"
  | "micah"
  | "matthew"
  | "hebrews";

export type VerseTheme =
  | "Son of Man"
  | "Little Horn"
  | "70 Weeks"
  | "New Earth"
  | "Lamb"
  | "Ancient of Days"
  | "2300 Days"
  | "Three Angels"
  | "Messianic"
  | "Second Coming"
  | "Judgement"
  | "Sanctuary"
  | "Resurrection"
  | "Remnant";

export interface VerseMemoryCard {
  id: string;
  reference: string;
  verseText: string;
  contextClue: string;
  book: VerseBook;
  theme: VerseTheme;
  christAnchor: string;
}

export const verseMemoryCards: VerseMemoryCard[] = [
  // ── Daniel ────────────────────────────────────────────────────────────────
  {
    id: "dan-2-44",
    reference: "Daniel 2:44",
    verseText:
      "And in the days of these kings shall the God of heaven set up a kingdom, which shall never be destroyed: and the kingdom shall not be left to other people, but it shall break in pieces and consume all these kingdoms, and it shall stand for ever.",
    contextClue:
      "After four world empires crumble, one final kingdom rises — and it will never fall.",
    book: "daniel",
    theme: "Son of Man",
    christAnchor:
      "The eternal kingdom belongs to Christ; when he returns, all earthly powers give way to his reign.",
  },
  {
    id: "dan-7-9",
    reference: "Daniel 7:9-10",
    verseText:
      "I beheld till the thrones were cast down, and the Ancient of days did sit, whose garment was white as snow, and the hair of his head like the pure wool: his throne was like the fiery flame, and his wheels as burning fire. A fiery stream issued and came forth from before him: thousand thousands ministered unto him, and ten thousand times ten thousand stood before him: the judgment was set, and the books were opened.",
    contextClue: "The ultimate courtroom — the Ancient of Days takes his seat and the books are opened.",
    book: "daniel",
    theme: "Ancient of Days",
    christAnchor:
      "This pre-Advent judgement vindicates the saints and prepares the way for Christ to receive his kingdom.",
  },
  {
    id: "dan-7-13",
    reference: "Daniel 7:13-14",
    verseText:
      "I saw in the night visions, and, behold, one like the Son of man came with the clouds of heaven, and came to the Ancient of days, and they brought him near before him. And there was given him dominion, and glory, and a kingdom, that all people, nations, and languages, should serve him: his dominion is an everlasting dominion, which shall not pass away, and his kingdom that which shall not be destroyed.",
    contextClue: "The Son of Man approaches the Ancient of Days and receives an everlasting kingdom.",
    book: "daniel",
    theme: "Son of Man",
    christAnchor:
      "This is the title Jesus used most often for himself — his enthronement is the very scene Daniel sees.",
  },
  {
    id: "dan-7-25",
    reference: "Daniel 7:25",
    verseText:
      "And he shall speak great words against the most High, and shall wear out the saints of the most High, and think to change times and laws: and they shall be given into his hand until a time and times and the dividing of time.",
    contextClue:
      "A boastful power speaks against God, persecutes the saints, and attempts to alter the divine law — for a measured period.",
    book: "daniel",
    theme: "Little Horn",
    christAnchor:
      "The saints endure because Christ intercedes as their High Priest; the persecution has a fixed end date set by God.",
  },
  {
    id: "dan-8-14",
    reference: "Daniel 8:14",
    verseText:
      "And he said unto me, Unto two thousand and three hundred days; then shall the sanctuary be cleansed.",
    contextClue: "The longest time prophecy in Scripture — 2,300 days — ends with the sanctuary being cleansed.",
    book: "daniel",
    theme: "2300 Days",
    christAnchor:
      "The cleansing of the heavenly sanctuary is Christ's final high-priestly work before he returns as King.",
  },
  {
    id: "dan-9-24",
    reference: "Daniel 9:24",
    verseText:
      "Seventy weeks are determined upon thy people and upon thy holy city, to finish the transgression, and to make an end of sins, and to make reconciliation for iniquity, and to bring in everlasting righteousness, and to seal up the vision and prophecy, and to anoint the most Holy.",
    contextClue:
      "Seventy prophetic weeks are set aside for Israel — ending transgression, making atonement, and anointing the Most Holy.",
    book: "daniel",
    theme: "70 Weeks",
    christAnchor:
      "All six purposes of the 70 weeks are fulfilled in Christ: his baptism, ministry, death, and the anointing of the heavenly sanctuary.",
  },
  {
    id: "dan-9-25",
    reference: "Daniel 9:25",
    verseText:
      "Know therefore and understand, that from the going forth of the commandment to restore and to build Jerusalem unto the Messiah the Prince shall be seven weeks, and threescore and two weeks: the street shall be built again, and the wall, even in troublous times.",
    contextClue: "A countdown from a royal decree to the arrival of the Messiah.",
    book: "daniel",
    theme: "70 Weeks",
    christAnchor:
      "The decree of 457 BC plus 483 years lands precisely on the baptism of Jesus in AD 27 — the most exact messianic prophecy in the Bible.",
  },
  {
    id: "dan-9-27",
    reference: "Daniel 9:27",
    verseText:
      "And he shall confirm the covenant with many for one week: and in the midst of the week he shall cause the sacrifice and the oblation to cease, and for the overspreading of abominations he shall make it desolate, even until the consummation, and that determined shall be poured upon the desolate.",
    contextClue:
      "In the middle of the final prophetic week, sacrifice and offering are caused to cease.",
    book: "daniel",
    theme: "70 Weeks",
    christAnchor:
      "When Christ was crucified in AD 31 — mid-week — every temple sacrifice became obsolete; he was the final Lamb.",
  },
  {
    id: "dan-12-1",
    reference: "Daniel 12:1",
    verseText:
      "And at that time shall Michael stand up, the great prince which standeth for the children of thy people: and there shall be a time of trouble, such as never was since there was a nation even to that same time: and at that time thy people shall be delivered, every one that shall be found written in the book.",
    contextClue:
      "In the time of greatest trouble, Michael stands up — and everyone written in the book is delivered.",
    book: "daniel",
    theme: "Second Coming",
    christAnchor:
      "Michael — the great Prince — is Christ himself; his standing marks the close of his priestly intercession and the start of deliverance.",
  },
  {
    id: "dan-12-2",
    reference: "Daniel 12:2",
    verseText:
      "And many of them that sleep in the dust of the earth shall awake, some to everlasting life, and some to shame and everlasting contempt.",
    contextClue: "The dead in the dust awake — some to everlasting life, some to contempt.",
    book: "daniel",
    theme: "Resurrection",
    christAnchor:
      "The resurrection of the dead is only possible because Christ conquered death — his resurrection is the guarantee of ours.",
  },

  // ── Revelation ────────────────────────────────────────────────────────────
  {
    id: "rev-1-7",
    reference: "Revelation 1:7",
    verseText:
      "Behold, he cometh with clouds; and every eye shall see him, and they also which pierced him: and all kindreds of the earth shall wail because of him. Even so, Amen.",
    contextClue: "His return is visible, undeniable, and universal — every eye will see him.",
    book: "revelation",
    theme: "Second Coming",
    christAnchor:
      "The Second Coming is not secret or invisible — it is the literal, global return of the same Jesus who was crucified.",
  },
  {
    id: "rev-12-17",
    reference: "Revelation 12:17",
    verseText:
      "And the dragon was wroth with the woman, and went to make war with the remnant of her seed, which keep the commandments of God, and have the testimony of Jesus Christ.",
    contextClue:
      "After failing to destroy the woman, the dragon turns on her remaining children — identified by two marks.",
    book: "revelation",
    theme: "Remnant",
    christAnchor:
      "The remnant are defined by their loyalty to Christ's testimony and the law he wrote — they are his people in the final conflict.",
  },
  {
    id: "rev-14-6",
    reference: "Revelation 14:6-7",
    verseText:
      "And I saw another angel fly in the midst of heaven, having the everlasting gospel to preach unto them that dwell on the earth, and to every nation, and kindred, and tongue, and people, saying with a loud voice, Fear God, and give glory to him; for the hour of his judgment is come: and worship him that made heaven, and earth, and the sea, and the fountains of waters.",
    contextClue: "The first of three angels carries the everlasting gospel to every nation with an urgent summons to worship.",
    book: "revelation",
    theme: "Three Angels",
    christAnchor:
      "The everlasting gospel — the good news that Christ has judged and won — is the heart of the first angel's cry.",
  },
  {
    id: "rev-14-12",
    reference: "Revelation 14:12",
    verseText:
      "Here is the patience of the saints: here are they that keep the commandments of God, and the faith of Jesus.",
    contextClue: "A one-sentence portrait of the end-time saints: two things define them.",
    book: "revelation",
    theme: "Remnant",
    christAnchor:
      "Keeping the commandments is not legalism — it flows from the faith of Jesus, the faithfulness he gives his people.",
  },
  {
    id: "rev-19-10",
    reference: "Revelation 19:10",
    verseText:
      "And I fell at his feet to worship him. And he said unto me, See thou do it not: I am thy fellowservant, and of thy brethren that have the testimony of Jesus: worship God: for the testimony of Jesus is the spirit of prophecy.",
    contextClue:
      "John tries to worship an angel — and is stopped. The angel reveals the spirit behind all true prophecy.",
    book: "revelation",
    theme: "Messianic",
    christAnchor:
      "All genuine prophecy finds its centre in the testimony of Jesus — prophecy that does not point to Christ has missed its purpose.",
  },
  {
    id: "rev-21-3",
    reference: "Revelation 21:3-4",
    verseText:
      "And I heard a great voice out of heaven saying, Behold, the tabernacle of God is with men, and he will dwell with them, and they shall be his people, and God himself shall be with them, and be their God. And God shall wipe away all tears from their eyes; and there shall be no more death, neither sorrow, nor crying, neither shall there be any more pain: for the former things are passed away.",
    contextClue: "The final promise — God makes his home with humanity and abolishes every source of suffering.",
    book: "revelation",
    theme: "New Earth",
    christAnchor:
      "God dwelling with his people is the whole arc of Scripture from Eden to Revelation; Christ is the bridge that makes it possible.",
  },
  {
    id: "rev-22-12",
    reference: "Revelation 22:12",
    verseText:
      "And, behold, I come quickly; and my reward is with me, to give every man according as his work shall be.",
    contextClue: "The last promise of Scripture: he is coming, and he brings reward with him.",
    book: "revelation",
    theme: "Second Coming",
    christAnchor:
      "The coming of Christ is not a threat but a rescue — he returns as the same Jesus who gave himself for us.",
  },
  {
    id: "rev-14-14",
    reference: "Revelation 14:14",
    verseText:
      "And I looked, and behold a white cloud, and upon the cloud one sat like unto the Son of man, having on his head a golden crown, and in his hand a sharp sickle.",
    contextClue: "The Son of Man on a white cloud with a golden crown and a sickle — the harvest has come.",
    book: "revelation",
    theme: "Second Coming",
    christAnchor:
      "Daniel's vision of the Son of Man is now fulfilled in full glory — the same figure arrives to gather his harvest.",
  },

  // ── Isaiah ────────────────────────────────────────────────────────────────
  {
    id: "isa-7-14",
    reference: "Isaiah 7:14",
    verseText:
      "Therefore the Lord himself shall give you a sign; Behold, a virgin shall conceive, and bear a son, and shall call his name Immanuel.",
    contextClue: "A sign is given to the house of David: a virgin conceives and names her son 'God with us.'",
    book: "isaiah",
    theme: "Messianic",
    christAnchor:
      "Written 700 years before Bethlehem — the incarnation is the ultimate sign that God does not abandon his people.",
  },
  {
    id: "isa-9-6",
    reference: "Isaiah 9:6",
    verseText:
      "For unto us a child is born, unto us a son is given: and the government shall be upon his shoulder: and his name shall be called Wonderful, Counsellor, The mighty God, The everlasting Father, The Prince of Peace.",
    contextClue: "A child is born who bears five names — each one a title of God himself.",
    book: "isaiah",
    theme: "Messianic",
    christAnchor:
      "Every title belongs to Jesus: Wonderful (John 1:14), Counsellor (John 14:26), Mighty God, Everlasting Father, Prince of Peace.",
  },
  {
    id: "isa-53-5",
    reference: "Isaiah 53:5",
    verseText:
      "But he was wounded for our transgressions, he was bruised for our iniquities: the chastisement of our peace was upon him; and with his stripes we are healed.",
    contextClue: "A suffering servant pierced for someone else's sins — his wounds bring healing.",
    book: "isaiah",
    theme: "Messianic",
    christAnchor:
      "Written 700 years before Calvary — this is the clearest pre-cross description of substitutionary atonement in Scripture.",
  },
  {
    id: "isa-53-7",
    reference: "Isaiah 53:7",
    verseText:
      "He was oppressed, and he was afflicted, yet he opened not his mouth: he is brought as a lamb to the slaughter, and as a sheep before her shearers is dumb, so he openeth not his mouth.",
    contextClue: "Led to slaughter, he says nothing — silent as a lamb.",
    book: "isaiah",
    theme: "Lamb",
    christAnchor:
      "At his trial Jesus was silent (Matthew 27:14) — the prophecy was fulfilled word for word seven centuries later.",
  },
  {
    id: "isa-66-22",
    reference: "Isaiah 66:22-23",
    verseText:
      "For as the new heavens and the new earth, which I will make, shall remain before me, saith the LORD, so shall your seed and your name remain. And it shall come to pass, that from one new moon to another, and from one sabbath to another, shall all flesh come to worship before me, saith the LORD.",
    contextClue: "In the new creation, all flesh worships the LORD every Sabbath — for ever.",
    book: "isaiah",
    theme: "New Earth",
    christAnchor:
      "The Sabbath that pointed to creation and the exodus now points to the new creation — worship in the age to come.",
  },

  // ── Other books ───────────────────────────────────────────────────────────
  {
    id: "gen-3-15",
    reference: "Genesis 3:15",
    verseText:
      "And I will put enmity between thee and the woman, and between thy seed and her seed; it shall bruise thy head, and thou shalt bruise his heel.",
    contextClue:
      "In the garden, just after the fall, God declares war between the serpent and the woman's offspring — ending in one decisive blow.",
    book: "genesis",
    theme: "Messianic",
    christAnchor:
      "The very first prophecy in Scripture — the heel-bruise is the cross, the head-bruise is the resurrection victory of Christ.",
  },
  {
    id: "ps-22-1",
    reference: "Psalm 22:1, 16-18",
    verseText:
      "My God, my God, why hast thou forsaken me? why art thou so far from helping me, and from the words of my roaring? … For dogs have compassed me: the assembly of the wicked have inclosed me: they pierced my hands and my feet. I may tell all my bones: they look and stare upon me. They part my garments among them, and cast lots upon my vesture.",
    contextClue:
      "A psalm of utter abandonment — pierced hands, mocking crowds, and soldiers dividing his clothes.",
    book: "psalms",
    theme: "Messianic",
    christAnchor:
      "Written a thousand years before crucifixion existed as a practice — Jesus quotes the opening line from the cross.",
  },
  {
    id: "zech-9-9",
    reference: "Zechariah 9:9",
    verseText:
      "Rejoice greatly, O daughter of Zion; shout, O daughter of Jerusalem: behold, thy King cometh unto thee: he is just, and having salvation; lowly, and riding upon an ass, and upon a colt the foal of an ass.",
    contextClue: "Jerusalem is told to shout — her king approaches, humble, riding on a donkey's colt.",
    book: "zechariah",
    theme: "Messianic",
    christAnchor:
      "The triumphal entry fulfils this exactly — the king arrives in humility before his sacrifice, not in conquest.",
  },
  {
    id: "mic-5-2",
    reference: "Micah 5:2",
    verseText:
      "But thou, Bethlehem Ephratah, though thou be little among the thousands of Judah, yet out of thee shall he come forth unto me that is to be ruler in Israel; whose goings forth have been from of old, from everlasting.",
    contextClue: "A specific small town is named — from it will come a ruler whose origin is from everlasting.",
    book: "micah",
    theme: "Messianic",
    christAnchor:
      "Bethlehem, seven centuries before the manger — and the ruler's origin is described as eternal, confirming his divinity.",
  },
  {
    id: "heb-8-1",
    reference: "Hebrews 8:1-2",
    verseText:
      "Now of the things which we have spoken this is the sum: We have such an high priest, who is set on the right hand of the throne of the Majesty in the heavens; a minister of the sanctuary, and of the true tabernacle, which the Lord pitched, and not man.",
    contextClue: "The sum of everything — our high priest ministers in the real sanctuary that God himself built.",
    book: "hebrews",
    theme: "Sanctuary",
    christAnchor:
      "The earthly temple was always a shadow; Christ serves in the original — the heavenly sanctuary is the key to understanding Daniel 8:14.",
  },
  {
    id: "matt-24-14",
    reference: "Matthew 24:14",
    verseText:
      "And this gospel of the kingdom shall be preached in all the world for a witness unto all nations; and then shall the end come.",
    contextClue: "One thing must happen before the end comes — the gospel reaches every nation.",
    book: "matthew",
    theme: "Second Coming",
    christAnchor:
      "The mission of the church is not speculation about dates but proclamation — the same everlasting gospel the first angel of Revelation 14 carries.",
  },
];
