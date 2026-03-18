export default function Loading() {
  return (
    <div
      style={{
        minHeight: "80vh",
        background: "#05050a",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <div className="animate-pulse" style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "1.5rem" }}>
        <div style={{ width: 280, height: 400, background: "#1c1c28", borderRadius: 20 }} />
        <div style={{ display: "flex", gap: 8 }}>
          {[1, 2, 3].map((i) => (
            <div key={i} style={{ width: 8, height: 8, background: "#1c1c28", borderRadius: "50%" }} />
          ))}
        </div>
      </div>
    </div>
  );
}
