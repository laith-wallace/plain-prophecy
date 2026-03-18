export default function Loading() {
  return (
    <div style={{ minHeight: "80vh", background: "var(--paper, #f5f0e8)" }}>
      {/* Hero skeleton */}
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
        <div className="animate-pulse" style={{ width: 320, height: 36, background: "rgba(255,255,255,0.1)", borderRadius: 4 }} />
        <div className="animate-pulse" style={{ width: 480, height: 14, background: "rgba(255,255,255,0.07)", borderRadius: 4 }} />
        <div className="animate-pulse" style={{ width: 400, height: 14, background: "rgba(255,255,255,0.07)", borderRadius: 4 }} />
      </div>

      {/* Card grid skeleton */}
      <div
        style={{
          maxWidth: 1100,
          margin: "0 auto",
          padding: "3.5rem 2rem",
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(310px, 1fr))",
          gap: "1.5rem",
        }}
      >
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="animate-pulse"
            style={{ height: 200, background: "#e8e2d8", borderRadius: 4 }}
          />
        ))}
      </div>
    </div>
  );
}
