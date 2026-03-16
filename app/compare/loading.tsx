export default function Loading() {
  return (
    <div
      style={{
        minHeight: "80vh",
        padding: "2rem 1.5rem",
        maxWidth: 900,
        margin: "0 auto",
      }}
    >
      {/* Header */}
      <div className="animate-pulse">
        <div
          style={{
            height: 14,
            width: 120,
            background: "#1c1c28",
            borderRadius: 4,
            marginBottom: 12,
          }}
        />
        <div
          style={{
            height: 36,
            width: "60%",
            background: "#1c1c28",
            borderRadius: 6,
            marginBottom: 8,
          }}
        />
        <div
          style={{
            height: 16,
            width: "45%",
            background: "#1c1c28",
            borderRadius: 4,
            marginBottom: 32,
          }}
        />

        {/* Tab pills */}
        <div style={{ display: "flex", gap: 8, marginBottom: 32 }}>
          {[100, 90, 80, 70, 90].map((w, i) => (
            <div
              key={i}
              style={{
                height: 34,
                width: w,
                background: "#1c1c28",
                borderRadius: 20,
              }}
            />
          ))}
        </div>

        {/* Content block */}
        <div
          style={{
            height: 320,
            background: "#1c1c28",
            borderRadius: 12,
          }}
        />
      </div>
    </div>
  );
}
