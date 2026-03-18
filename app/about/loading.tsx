export default function Loading() {
  return (
    <div style={{ minHeight: "80vh", background: "var(--paper, #f5f0e8)" }}>
      <div
        style={{
          background: "#0e0e1a",
          padding: "4rem 2rem 3rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "1rem",
        }}
      >
        <div className="animate-pulse" style={{ width: 80, height: 10, background: "rgba(255,255,255,0.1)", borderRadius: 4 }} />
        <div className="animate-pulse" style={{ width: 360, height: 36, background: "rgba(255,255,255,0.1)", borderRadius: 4 }} />
        <div className="animate-pulse" style={{ width: 500, height: 14, background: "rgba(255,255,255,0.07)", borderRadius: 4 }} />
      </div>
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "3rem 2rem", display: "flex", flexDirection: "column", gap: "1rem" }}>
        {[180, 120, 160, 100, 140].map((h, i) => (
          <div key={i} className="animate-pulse" style={{ height: h, background: "#e8e2d8", borderRadius: 4 }} />
        ))}
      </div>
    </div>
  );
}
