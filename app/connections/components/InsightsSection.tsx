const INSIGHTS = [
  {
    num: '01',
    headline: 'Over 450 OT passages point to Christ — identified by the rabbis before He was born.',
    body: 'Alfred Edersheim catalogued 456 Old Testament passages that the ancient Jewish rabbinate classified as Messianic before the time of Christ (The Life and Times of Jesus the Messiah, Appendix IX). These weren\'t retroactive Christian readings — they appeared in rabbinic writings centuries before Jesus. When King Herod asked where the Christ would be born, the chief priests immediately cited Micah 5:2, a verifiable prophecy made 700 years earlier about Bethlehem.',
    refs: 'Micah 5:2 → Matthew 2:1–6 · Isaiah 53 → Luke 22:37',
  },
  {
    num: '02',
    headline: 'The odds of coincidence: 1 in 100 quadrillion.',
    body: 'Peter W. Stoner, Chairman of Mathematics and Astronomy at Pasadena City College, applied rigorous probability analysis to Messianic prophecy (Science Speaks, reviewed by the American Scientific Affiliation). The probability of one person fulfilling just 8 major prophecies by chance: 1 in 10¹⁷. Extending the analysis to 48 prophecies reaches 1 in 10¹⁵⁷ — a number so vast it eliminates coincidence as a category. This moved the scholarly conversation from philosophy to mathematics.',
    refs: 'Isaiah 53 · Micah 5:2 · Psalm 22 · Zechariah 9:9',
  },
  {
    num: '03',
    headline: 'Written 700 years before the crucifixion. Confirmed by archaeology.',
    body: 'For centuries, critics claimed Isaiah 53 was written after Jesus and edited into the text. In 1947, the Great Isaiah Scroll was discovered among the Dead Sea Scrolls — carbon-dated to approximately 125 BC, over 150 years before the crucifixion. The scroll contains the entire Suffering Servant passage, almost verbatim with later manuscripts. John Oswalt (The Book of Isaiah, NICOT, 1998) and Alec Motyer (The Prophecy of Isaiah, IVP, 1993) both conclude this can only be explained as divine foreknowledge.',
    refs: 'Isaiah 53:5–6 → 1 Peter 2:24–25 · Acts 8:32–35',
  },
  {
    num: '04',
    headline: 'Daniel predicted the exact year of Christ\'s arrival 500 years in advance.',
    body: 'Daniel 9:24–27 (written ~539 BC) specifies 69 "weeks" of years — 483 years — from "the decree to restore Jerusalem" to the Messiah\'s arrival. Harold Hoehner (Chronological Aspects of the Life of Christ, Zondervan, 1977) calculated: the decree of Artaxerxes (Nehemiah 2:1–8, 444 BC) plus 483 × 360-day years = 173,880 days, converging on April AD 32 — the Triumphal Entry. No human could engineer a 500-year countdown and land on Palm Sunday.',
    refs: 'Daniel 9:24–27 · Nehemiah 2:1–8 → Luke 19:28–44',
  },
  {
    num: '05',
    headline: 'The Passover lamb was designed bone-by-bone to mirror Christ\'s death.',
    body: 'Exodus 12 specified that the Passover lamb must be without blemish, and its bones must not be broken (Exodus 12:46). When Jesus died, Roman soldiers found He was already dead and did not break His legs — John explicitly records this as fulfilling Exodus 12:46 (John 19:36). Paul identifies Jesus as "Christ, our Passover lamb" (1 Corinthians 5:7); Peter calls Him "a lamb without blemish or defect" (1 Peter 1:19). The typological architecture is exact, not approximate.',
    refs: 'Exodus 12:5, 46 → John 19:36 · 1 Corinthians 5:7',
  },
  {
    num: '06',
    headline: 'Jesus confirmed OT typology was His own hermeneutic.',
    body: 'In John 3:14–15, Jesus said: "As Moses lifted up the serpent in the wilderness, so must the Son of Man be lifted up." He was directly citing Numbers 21:8–9, where Israel received healing by looking in faith at a bronze serpent lifted on a pole. The parallel is structural: Israel under judgment → deliverance through a substitute lifted up → life for all who look. G.K. Beale calls this "typology with teeth" — not a grid imposed on Scripture, but a pattern placed there intentionally by its Author.',
    refs: 'Numbers 21:4–9 → John 3:14–15',
  },
  {
    num: '07',
    headline: 'The Bible ends exactly where it began — but with everything restored.',
    body: 'Genesis 2: a garden, a tree of life, a river, and direct access to God. Revelation 22: a garden city, the tree of life, a river of life, and God dwelling with humanity again. The same vocabulary, the same imagery — 1,500 years of writing apart. G.K. Beale\'s A New Testament Biblical Theology (Baker Academic, 2011) traces this new-creation arc as the organizing spine of the entire canon. What was lost in Genesis 3 is precisely what is restored in Revelation 22. This is not symmetry by accident. It\'s architecture.',
    refs: 'Genesis 2:9–10, 3:24 → Revelation 22:1–4',
  },
]

export default function InsightsSection() {
  return (
    <section
      style={{
        maxWidth: 1400,
        margin: '0 auto',
        padding: 'clamp(1.5rem, 4vw, 3rem) 1rem clamp(2rem, 5vw, 4rem)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
      }}
    >
      {/* Heading */}
      <div style={{ marginBottom: 'clamp(1.25rem, 3vw, 2rem)' }}>
        <h2
          style={{
            fontFamily: 'var(--font-cinzel)',
            fontSize: 'clamp(1.1rem, 3vw, 1.6rem)',
            color: '#F5F5F0',
            letterSpacing: '0.04em',
            marginBottom: 8,
          }}
        >
          What does this tell us?
        </h2>
        <p
          style={{
            fontFamily: 'var(--font-inter)',
            fontSize: 13,
            color: '#9A9A8A',
            lineHeight: 1.6,
            maxWidth: 520,
          }}
        >
          What the scholars who go deepest into Scripture keep finding — and what most people miss about these connections.
        </p>
      </div>

      {/* Cards grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 300px), 1fr))',
          gap: 12,
        }}
      >
        {INSIGHTS.map((insight) => (
          <InsightCard key={insight.num} {...insight} />
        ))}
      </div>

      {/* Footer attribution */}
      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 10,
          color: 'rgba(154,154,138,0.4)',
          marginTop: 24,
          lineHeight: 1.6,
        }}
      >
        Sources: G.K. Beale, D.A. Carson, Alfred Edersheim, Peter Stoner, Harold Hoehner, John Oswalt, Alec Motyer, Nils Wilhelm Lund, Kenneth Bailey.
      </p>
    </section>
  )
}

function InsightCard({
  num,
  headline,
  body,
  refs,
}: {
  num: string
  headline: string
  body: string
  refs: string
}) {
  return (
    <div
      style={{
        background: 'rgba(255,255,255,0.025)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 10,
        padding: 'clamp(14px, 3vw, 20px)',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(201,168,76,0.22)'
      }}
      onMouseLeave={(e) => {
        ;(e.currentTarget as HTMLDivElement).style.borderColor = 'rgba(255,255,255,0.07)'
      }}
    >
      <div
        style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 9,
          color: 'rgba(201,168,76,0.6)',
          letterSpacing: '0.12em',
          marginBottom: 10,
        }}
      >
        ✦ {num}
      </div>

      <h3
        style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 'clamp(12px, 2vw, 14px)',
          color: '#F0EDE6',
          lineHeight: 1.45,
          marginBottom: 10,
        }}
      >
        {headline}
      </h3>

      <p
        style={{
          fontFamily: 'var(--font-inter)',
          fontSize: 12,
          color: '#9A9A8A',
          lineHeight: 1.8,
          marginBottom: 12,
        }}
      >
        {body}
      </p>

      <p
        style={{
          fontFamily: 'var(--font-cinzel)',
          fontSize: 9,
          color: 'rgba(201,168,76,0.45)',
          letterSpacing: '0.07em',
          lineHeight: 1.6,
        }}
      >
        {refs}
      </p>
    </div>
  )
}
