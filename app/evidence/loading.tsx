export default function Loading() {
  return (
    <div
      style={{
        minHeight: "80vh",
        padding: "3rem 1.5rem",
        maxWidth: 760,
        margin: "0 auto",
      }}
    >
      <div className="animate-pulse">
        <div
          style={{
            height: 14,
            width: 100,
            background: "#1c1c28",
            borderRadius: 4,
            marginBottom: 14,
          }}
        />
        <div
          style={{
            height: 32,
            width: "55%",
            background: "#1c1c28",
            borderRadius: 6,
            marginBottom: 16,
          }}
        />
        {[100, 85, 90, 70].map((w, i) => (
          <div
            key={i}
            style={{
              height: 14,
              width: `${w}%`,
              background: "#1c1c28",
              borderRadius: 4,
              marginBottom: 10,
            }}
          />
        ))}
        <div
          style={{
            height: 200,
            background: "#1c1c28",
            borderRadius: 10,
            marginTop: 32,
          }}
        />
      </div>
    </div>
  );
}
