"use client";
// Evidence tab content — extracted from original index.html
// This is a client component because it includes interactive media cards

const sections = [
  {
    num: "1",
    label: "Sign",
    title: "Christian Nationalism & Religious Legislation",
    prophecyCol: {
      label: "Prophecy",
      content: [
        "Revelation 13:11–12 describes a beast 'like a lamb' that 'causes the earth to worship the first beast.' This points to a Protestant-flavoured power that enforces religious conformity. Revelation 13:16–17 describes an economic coercion system tied to worship.",
        "The Three Angels' Messages of Revelation 14 warn against the 'mark of the beast' — which Historicists identify with enforced false worship, not a microchip. The mark is about allegiance, not technology.",
      ],
      scripture: '"He causes all… to receive a mark… that no man might buy or sell." — Rev 13:16–17',
    },
    scriptureCol: {
      label: "Scripture",
      content: [
        "Revelation 13:11 — the second beast has 'two horns like a lamb and spake as a dragon.' Protestant America fulfilling the role of image-maker to Rome.",
        "Daniel 3 — Nebuchadnezzar's image: a global enforced worship system. The pattern repeats at the end of time on a world stage.",
      ],
      scripture: '"And he had power to give life unto the image of the beast, that the image of the beast should both speak." — Rev 13:15',
    },
    evidenceCol: {
      label: "Today's Evidence",
      newsItems: [
        { headline: "Project 2025 & Christian Nationalist Blueprint", meta: "Heritage Foundation · 2023", body: "900-page federal policy blueprint proposing to restructure US government along explicitly Christian nationalist principles. Authored by 80+ conservative organisations." },
        { headline: "Supreme Court rules for praying football coach", meta: "SCOTUS · 2022", body: "Kennedy v. Bremerton — court expands religious expression in public schools, beginning erosion of church-state separation precedent." },
        { headline: "Louisiana mandates Ten Commandments in all classrooms", meta: "Louisiana Legislature · 2024", body: "First US state to require the Ten Commandments displayed in every public school classroom K–12. Immediately challenged in federal court." },
      ],
    },
    mediaCards: [
      { href: "https://www.youtube.com/results?search_query=CNN+Project+2025+Christian+nationalism", icon: "🎥", outlet: "CNN", outletClass: "o-cnn", headline: "Project 2025 & the Christian Nationalism Blueprint", cta: "Watch on YouTube →" },
      { href: "https://www.youtube.com/results?search_query=Al+Jazeera+Christian+nationalism+USA+church+state", icon: "🌎", outlet: "Al Jazeera", outletClass: "o-aj", headline: "Church-State Separation Under Threat in America", cta: "Watch on YouTube →" },
      { href: "https://www.youtube.com/results?search_query=BBC+Louisiana+Ten+Commandments+classroom+law", icon: "⚖", outlet: "BBC News", outletClass: "o-bbc", headline: "Louisiana Mandates Ten Commandments in Public Schools", cta: "Watch on YouTube →" },
    ],
  },
  {
    num: "2",
    label: "Sign",
    title: "Sunday Law Movement",
    prophecyCol: {
      label: "Prophecy",
      content: [
        "SDA Historicism has long identified Sunday legislation as the prophetic 'mark of the beast' system — not a microchip, but mandated worship on the day altered by Rome (Sunday) rather than God's commanded Sabbath (Saturday).",
        "The prophecy requires religious law backed by civil power: buying and selling restricted, consciences coerced. Revelation 13 and 14 present a clear either/or: commandments of God (incl. Sabbath) vs. mark of the beast (Sunday worship enforced).",
      ],
      scripture: '"Here is the patience of the saints: here are they that keep the commandments of God and the faith of Jesus." — Rev 14:12',
    },
    scriptureCol: {
      label: "Scripture",
      content: [
        "Daniel 7:25 — the little horn 'thinks to change times and laws.' Rome officially moved the day of worship from Saturday to Sunday, a change preserved in Catholic catechisms.",
        "Revelation 14:9–12 — the final warning against the mark of the beast is immediately followed by a call to Sabbath-keeping ('commandments of God').",
      ],
      scripture: '"And he shall… think to change times and laws." — Dan 7:25',
    },
    evidenceCol: {
      label: "Today's Evidence",
      newsItems: [
        { headline: "Pope Francis calls for mandatory Sunday rest in Laudato Si'", meta: "Vatican · Ongoing", body: "Pope Francis explicitly calls for Sunday to be protected as a day of rest in his encyclical, linking it to environmental concerns and human dignity — a merging of religious and civil agendas." },
        { headline: "EU Working Time Directive — Sunday protections expand", meta: "European Union · 2023", body: "European Court of Justice strengthens Sunday rest protections across EU member states, citing worker dignity and cultural heritage." },
        { headline: "Blue laws resurgent in multiple US states", meta: "Various States · 2022–24", body: "Multiple state legislatures revisit Sunday trading restrictions, often with explicit religious justification cited by sponsors." },
      ],
    },
    mediaCards: [
      { href: "https://www.youtube.com/results?search_query=Pope+Francis+Laudato+Si+Sunday+rest+environment", icon: "☀", outlet: "DW News", outletClass: "o-dw", headline: "Pope Francis Calls for Mandatory Sunday Rest to Save the Planet", cta: "Watch on YouTube →" },
      { href: "https://www.youtube.com/results?search_query=EU+Sunday+working+time+directive+court+ruling", icon: "🏫", outlet: "BBC News", outletClass: "o-bbc", headline: "EU Court Strengthens Sunday Rest Protections Across Member States", cta: "Watch on YouTube →" },
      { href: "https://www.youtube.com/results?search_query=Fox+News+Sunday+blue+laws+religious+freedom", icon: "📅", outlet: "Fox News", outletClass: "o-fox", headline: "Sunday Laws: Religious Liberty or State Religion?", cta: "Watch on YouTube →" },
    ],
  },
  {
    num: "3",
    label: "Sign",
    title: "Fall of Babylon / Ecumenism",
    prophecyCol: {
      label: "Prophecy",
      content: [
        "Revelation 17–18 describes 'Mystery Babylon' — a religio-political system that 'made all nations drink of the wine of her fornication.' The call of Revelation 18:4 is 'Come out of her, my people.' This implies a global false religious confederation from which God calls His remnant.",
        "Revelation 17:5 identifies Babylon as 'the mother of harlots' — a mother church with daughter churches that have retained her corrupt doctrines. The ecumenical movement represents this prophetic gathering.",
      ],
      scripture: '"Come out of her, my people, that ye be not partakers of her sins." — Rev 18:4',
    },
    scriptureCol: {
      label: "Scripture",
      content: [
        "Revelation 18:2–3 — 'Babylon the great is fallen… all nations have drunk of the wine of the wrath of her fornication, and the kings of the earth have committed fornication with her.'",
        "Revelation 13:3 — 'And all the world wondered after the beast.' Global admiration and unity around the papal system is a prophetic sign.",
      ],
      scripture: '"And all the world wondered after the beast." — Rev 13:3',
    },
    evidenceCol: {
      label: "Today's Evidence",
      newsItems: [
        { headline: "Vatican Synod targets 2033 for global Christian unity", meta: "Vatican Synodality · 2023–24", body: "The Synod on Synodality explicitly works toward visible Christian unity by 2033 — the 2,000th anniversary of the crucifixion. Catholic, Orthodox, and Protestant leaders meeting in Rome." },
        { headline: "Joint Catholic-Lutheran Declaration signed", meta: "Lutheran World Federation · 2023", body: "Major Protestant denominations continue signing joint declarations with Rome, walking back 500 years of Reformation-era separations on justification and church authority." },
        { headline: "World Council of Churches pushes for unified global faith response", meta: "WCC · 2022–24", body: "WCC's 11th Assembly calls for a 'one human family' approach to global crises, with Rome increasingly at the centre of ecumenical initiatives." },
      ],
    },
    mediaCards: [
      { href: "https://www.youtube.com/results?search_query=Vatican+Synod+Synodality+ecumenical+unity+2033", icon: "✞", outlet: "AP News", outletClass: "o-ap", headline: "Vatican Synod: Targeting 2033 for Global Christian Unity", cta: "Watch on YouTube →" },
      { href: "https://www.youtube.com/results?search_query=CNN+Catholic+Protestant+reunion+ecumenism", icon: "✚", outlet: "CNN", outletClass: "o-cnn", headline: "Catholics and Protestants: The Drive Toward Visible Unity", cta: "Watch on YouTube →" },
      { href: "https://www.youtube.com/results?search_query=DW+Pope+Leo+XIV+ecumenical+dialogue+2026", icon: "🌏", outlet: "DW News", outletClass: "o-dw", headline: "Pope Leo XIV & the New Ecumenical Agenda", cta: "Watch on YouTube →" },
    ],
  },
  {
    num: "4",
    label: "Sign",
    title: "Mark of the Beast Technology",
    prophecyCol: {
      label: "Prophecy",
      content: [
        "Revelation 13:16–17: 'He causes all, both small and great, rich and poor, free and bond, to receive a mark in their right hand or in their foreheads: and that no man might buy or sell, save he that had the mark.' The enforcement mechanism requires global economic control.",
        "This prophecy does not require microchips — but it does require infrastructure capable of excluding non-compliant individuals from economic life. Digital ID, CBDC, and social credit systems provide exactly this infrastructure.",
      ],
      scripture: '"No man might buy or sell, save he that had the mark." — Rev 13:17',
    },
    scriptureCol: {
      label: "Scripture",
      content: [
        "Revelation 13:16–17 — 'in their right hand, or in their foreheads' — a mark of allegiance (forehead = belief, hand = action), not necessarily physical implant.",
        "Revelation 14:9–11 — the strongest warning in Scripture against receiving the mark. Its severity implies it will be very difficult to refuse — economic exclusion is the mechanism.",
      ],
      scripture: '"The third angel followed them, saying with a loud voice, If any man worship the beast… he shall drink of the wine of the wrath of God." — Rev 14:9–10',
    },
    evidenceCol: {
      label: "Today's Evidence",
      newsItems: [
        { headline: "130+ countries developing Central Bank Digital Currencies", meta: "BIS / Atlantic Council · 2024", body: "The Bank for International Settlements confirms 130+ CBDC projects globally. CBDCs allow governments and banks to control exactly how money is spent — and by whom." },
        { headline: "EU Digital Identity Wallet launches across member states", meta: "European Commission · 2024", body: "The EU Digital Identity Wallet becomes mandatory for member state participation. One digital ID for all government services, banking, travel, and healthcare." },
        { headline: "China's social credit system fully operational", meta: "PRC Government · Ongoing", body: "China's social credit system denies flights, trains, business licences, and internet access to 'untrustworthy' individuals. A live model of Revelation 13:17." },
      ],
    },
    mediaCards: [
      { href: "https://www.youtube.com/results?search_query=BBC+digital+ID+biometric+surveillance+global", icon: "👁", outlet: "BBC News", outletClass: "o-bbc", headline: "The Rise of Global Digital Identity & Biometric Control", cta: "Watch on YouTube →" },
      { href: "https://www.youtube.com/results?search_query=Al+Jazeera+CBDC+central+bank+digital+currency+economic+control", icon: "💳", outlet: "Al Jazeera", outletClass: "o-aj", headline: "Central Bank Digital Currencies & the End of Financial Privacy", cta: "Watch on YouTube →" },
      { href: "https://www.youtube.com/results?search_query=CNN+digital+ID+surveillance+state+freedoms", icon: "📱", outlet: "CNN", outletClass: "o-cnn", headline: "Your Digital Identity: Who Controls It?", cta: "Watch on YouTube →" },
    ],
  },
  {
    num: "5",
    label: "Sign",
    title: "Papal Wound Healed (Rev 13:3)",
    prophecyCol: {
      label: "Prophecy",
      content: [
        "Revelation 13:3 — 'And I saw one of his heads as it were wounded to death; and his deadly wound was healed: and all the world wondered after the beast.' The 'deadly wound' was the 1798 captivity of Pope Pius VI by Napoleon — the end of 1,260 years of papal supremacy.",
        "The 'healing' began with the 1929 Lateran Treaty, which restored Vatican statehood. The full healing = restoration of global political and spiritual influence. Today the Pope speaks before the UN, addresses joint sessions of Congress, and mediates international disputes.",
      ],
      scripture: '"His deadly wound was healed: and all the world wondered after the beast." — Rev 13:3',
    },
    scriptureCol: {
      label: "Scripture",
      content: [
        "Revelation 13:3 — 'deadly wound… healed.' The papacy lost temporal power in 1798 (Napoleon). The 1929 Lateran Treaty gave it back. Today it is a sovereign state with 180+ diplomatic relations.",
        "Revelation 13:7–8 — 'Power was given him over all kindreds, and tongues, and nations. And all that dwell upon the earth shall worship him.' Global admiration of the Pope is not a future event — it is present reality.",
      ],
      scripture: '"Power was given him over all kindreds, and tongues, and nations." — Rev 13:7',
    },
    evidenceCol: {
      label: "Today's Evidence",
      newsItems: [
        { headline: "Pope Leo XIV — first American Pope elected (2025)", meta: "Vatican · May 2025", body: "Cardinal Robert Prevost elected as Pope Leo XIV following the death of Pope Francis. First American-born pope in history. Global media coverage unprecedented since John Paul II." },
        { headline: "Vatican maintains diplomatic relations with 183 states", meta: "Holy See · 2024", body: "The Holy See maintains full diplomatic relations with more countries than almost any nation on earth — including nations with no other diplomatic ties." },
        { headline: "Pope addresses UN General Assembly, Joint Session of US Congress", meta: "UN / US Congress · 2015–ongoing", body: "The papacy has addressed the highest political bodies on earth. No other religious leader has this access. 'All the world wondered after the beast' is not hyperbole — it is present geopolitics." },
      ],
    },
    mediaCards: [
      { href: "https://www.youtube.com/results?search_query=Al+Jazeera+Vatican+global+influence+papacy+power", icon: "✒", outlet: "Al Jazeera", outletClass: "o-aj", headline: "How the Vatican Became a Global Power Again", cta: "Watch on YouTube →" },
      { href: "https://www.youtube.com/results?search_query=BBC+Pope+Leo+XIV+first+American+pope+elected", icon: "🌥", outlet: "BBC News", outletClass: "o-bbc", headline: "Pope Leo XIV: First American Pope & His Global Agenda", cta: "Watch on YouTube →" },
      { href: "https://www.youtube.com/results?search_query=Fox+News+Vatican+Lateran+Treaty+pope+political+power", icon: "🏘", outlet: "Fox News", outletClass: "o-fox", headline: "The Vatican's Remarkable Restoration of Political Power", cta: "Watch on YouTube →" },
    ],
  },
  {
    num: "6",
    label: "Sign",
    title: "Daniel Unsealed / Knowledge Increased",
    prophecyCol: {
      label: "Prophecy",
      content: [
        "Daniel 12:4 — 'But thou, O Daniel, shut up the words, and seal the book, even to the time of the end: many shall run to and fro, and knowledge shall be increased.' The 'time of the end' is the post-1798 era (end of the 1,260 years). The unsealing of Daniel's prophecies is a sign.",
        "The exponential increase in prophetic understanding since 1844 (William Miller, the Millerite movement, SDA pioneers studying Daniel) is a direct fulfilment. The internet has now made Daniel's prophecies accessible to billions.",
      ],
      scripture: '"Many shall run to and fro, and knowledge shall be increased." — Dan 12:4',
    },
    scriptureCol: {
      label: "Scripture",
      content: [
        "Daniel 12:4 — 'Seal the book, even to the time of the end.' Gabriel explicitly says the prophecy was sealed until a specific time — the time of the end (post-1798). We are in that era.",
        "Daniel 12:9–10 — 'The words are closed up and sealed till the time of the end. Many shall be purified… but the wicked shall do wickedly: and none of the wicked shall understand; but the wise shall understand.'",
      ],
      scripture: '"None of the wicked shall understand; but the wise shall understand." — Dan 12:10',
    },
    evidenceCol: {
      label: "Today's Evidence",
      newsItems: [
        { headline: "Global internet access reaches 5.4 billion users", meta: "ITU / Statista · 2024", body: "More humans have access to Scripture and prophetic commentary than at any point in history. The 'sealing' of Daniel is definitionally over — the book is open to all." },
        { headline: "Prophetic study resources multiply exponentially online", meta: "Digital Media · Ongoing", body: "YouTube channels dedicated to Daniel and Revelation have tens of millions of subscribers. The interest in end-times prophecy is at an all-time peak globally." },
        { headline: "AI accelerates scholarly access to ancient manuscripts", meta: "Academic · 2023–24", body: "AI tools now make the Dead Sea Scrolls, Septuagint, and Elephantine Papyri accessible to non-scholars — the very ancient sources that verify the 457 BC anchor date of Daniel 9." },
      ],
    },
    mediaCards: [
      { href: "https://www.youtube.com/results?search_query=Daniel+prophecy+explained+historicism+time+of+end", icon: "📖", outlet: "YouTube", outletClass: "o-ap", headline: "Daniel 12 Unsealed: What the Time of the End Really Means", cta: "Watch on YouTube →" },
      { href: "https://www.youtube.com/results?search_query=BBC+AI+Dead+Sea+Scrolls+ancient+manuscript+discovery", icon: "📜", outlet: "BBC News", outletClass: "o-bbc", headline: "AI Unlocks Ancient Scrolls — Including Daniel's Prophecies", cta: "Watch on YouTube →" },
      { href: "https://www.youtube.com/results?search_query=internet+global+knowledge+explosion+end+times", icon: "🌐", outlet: "DW News", outletClass: "o-dw", headline: "The Knowledge Explosion: 5 Billion Online for the First Time", cta: "Watch on YouTube →" },
    ],
  },
];

export default function EvidenceTab() {
  return (
    <div>
      <div className="ev-intro">
        <p>
          The Historicist framework predicted these developments from Scripture centuries before they occurred. Each section below maps a prophetic marker to its contemporary fulfilment, with mainstream news sources for verification.
        </p>
      </div>

      {sections.map((sec, i) => (
        <div className="ev-section" key={i}>
          <div className="ev-section-header">
            <div className="ev-section-number">{sec.num}</div>
            <div className="ev-section-title-wrap">
              <div className="ev-section-label">{sec.label}</div>
              <div className="ev-section-title">{sec.title}</div>
            </div>
          </div>
          <div className="ev-columns">
            {/* Prophecy Col */}
            <div className="ev-col">
              <div className="ev-col-head" style={{ color: "var(--sda-primary)" }}>{sec.prophecyCol.label}</div>
              <div className="ev-col-body">
                {sec.prophecyCol.content.map((p, j) => <p key={j}>{p}</p>)}
                {sec.prophecyCol.scripture && (
                  <span className="ev-scripture">{sec.prophecyCol.scripture}</span>
                )}
              </div>
            </div>
            {/* Scripture Col */}
            <div className="ev-col">
              <div className="ev-col-head" style={{ color: "#5c3d11" }}>{sec.scriptureCol.label}</div>
              <div className="ev-col-body">
                {sec.scriptureCol.content.map((p, j) => <p key={j}>{p}</p>)}
                {sec.scriptureCol.scripture && (
                  <span className="ev-scripture">{sec.scriptureCol.scripture}</span>
                )}
              </div>
            </div>
            {/* Evidence Col */}
            <div className="ev-col" style={{ padding: 0 }}>
              <div className="ev-col-head" style={{ padding: "0.75rem 1rem", color: "#b5222c" }}>{sec.evidenceCol.label}</div>
              <div>
                {sec.evidenceCol.newsItems.map((item, j) => (
                  <div className="ev-news-item" key={j}>
                    <div className="ev-news-headline">{item.headline}</div>
                    <div className="ev-news-meta">{item.meta}</div>
                    <div className="ev-news-body">{item.body}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          {/* Media Cards */}
          <div className="media-row">
            <div className="media-row-label">▶ Watch media coverage</div>
            <div className="media-cards">
              {sec.mediaCards.map((mc, j) => (
                <a className="media-card" href={mc.href} target="_blank" rel="noopener" key={j}>
                  <div className="media-thumb">
                    <div className="thumb-icon">{mc.icon}</div>
                    <div className="play-btn">▶</div>
                  </div>
                  <div className="media-info">
                    <span className={`outlet-badge ${mc.outletClass}`}>{mc.outlet}</span>
                    <div className="media-headline">{mc.headline}</div>
                    <div className="media-cta">{mc.cta}</div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      ))}

      {/* Summary Banner */}
      <div className="ev-summary-banner" style={{ background: "linear-gradient(135deg, var(--sda-primary) 0%, #0d2218 100%)", marginTop: "1.5rem" }}>
        <div style={{ fontFamily: "var(--font-ibm-plex-mono)", fontSize: "0.62rem", letterSpacing: "0.25em", textTransform: "uppercase", opacity: 0.6, marginBottom: "0.5rem" }}>Assessment</div>
        <div className="sb-title">The Prophetic Framework Is Active — Not Theoretical</div>
        <div className="sb-grid">
          {[
            { num: "6", desc: "Major prophetic signs in active fulfilment" },
            { num: "130+", desc: "Nations developing CBDC infrastructure" },
            { num: "183", desc: "States with Vatican diplomatic ties" },
            { num: "2033", desc: "Vatican's target for global Christian unity" },
          ].map((stat, i) => (
            <div className="sb-stat" key={i}>
              <div className="num">{stat.num}</div>
              <div className="desc">{stat.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
