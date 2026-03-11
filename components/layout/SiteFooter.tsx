export default function SiteFooter() {
  return (
    <footer
      style={{
        marginTop: "4rem",
        paddingTop: "1.5rem",
        borderTop: "2px solid var(--divider)",
        fontFamily: "var(--font-ibm-plex-mono)",
        fontSize: "0.68rem",
        color: "var(--neutral)",
        display: "flex",
        justifyContent: "space-between",
        flexWrap: "wrap",
        gap: "0.5rem",
        padding: "1.5rem 2rem",
        maxWidth: 1200,
        margin: "0 auto",
      }}
    >
      <span>Plain Prophecy · Biblical Prophecy Resource</span>
      <span>Dan 8:14 · Dan 9:24–27 · Rev 14:6–12 · Rev 20 · Heb 8–9</span>
      <span>plainprophecy.com · British English</span>
    </footer>
  );
}
