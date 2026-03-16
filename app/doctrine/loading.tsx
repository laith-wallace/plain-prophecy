export default function Loading() {
  return (
    <div
      style={{
        minHeight: "80vh",
        padding: "3rem 1.5rem",
        maxWidth: 820,
        margin: "0 auto",
      }}
    >
      <div className="animate-pulse">
        <div
          style={{
            height: 14,
            width: 110,
            background: "#1c1c28",
            borderRadius: 4,
            marginBottom: 14,
          }}
        />
        <div
          style={{
            height: 36,
            width: "50%",
            background: "#1c1c28",
            borderRadius: 6,
            marginBottom: 24,
          }}
        />
        <div style={{ display: "flex", flexWrap: "wrap" as const, gap: 16 }}>
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              style={{
                height: 140,
                flex: "1 1 240px",
                background: "#1c1c28",
                borderRadius: 10,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
