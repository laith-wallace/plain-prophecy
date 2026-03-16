export default function Loading() {
  return (
    <div
      style={{
        minHeight: "80vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "2rem",
      }}
    >
      <div className="animate-pulse" style={{ width: "100%", maxWidth: 360 }}>
        {/* Card skeleton */}
        <div
          style={{
            height: 480,
            background: "#1c1c28",
            borderRadius: 16,
            marginBottom: 24,
          }}
        />
        {/* Dot indicators */}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            gap: 8,
          }}
        >
          {[1, 2, 3, 4, 5].map((i) => (
            <div
              key={i}
              style={{
                width: i === 1 ? 20 : 8,
                height: 8,
                background: "#1c1c28",
                borderRadius: 4,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
