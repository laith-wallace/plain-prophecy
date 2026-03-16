import type { Metadata } from "next";
import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";

export const metadata: Metadata = {
  title: "Blog — Plain Prophecy",
  description:
    "Articles on Christ-centred biblical prophecy, the historicist framework, and what Scripture actually says about Daniel and Revelation.",
  alternates: {
    canonical: "https://plainprophecy.com/blog",
  },
  openGraph: {
    title: "Blog | Plain Prophecy",
    description:
      "Articles on Christ-centred biblical prophecy, the historicist framework, and what Scripture actually says.",
    url: "https://plainprophecy.com/blog",
    type: "website",
  },
};

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export default async function BlogIndexPage() {
  const posts = await fetchQuery(api.blog.getAllPosts);

  return (
    <main
      style={{
        background: "#0a0a06",
        minHeight: "100dvh",
        color: "#fff",
        fontFamily: "var(--font-ibm-plex-sans), sans-serif",
      }}
    >
      {/* Header */}
      <header
        style={{
          maxWidth: 800,
          margin: "0 auto",
          padding: "72px 24px 48px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "11px",
            fontWeight: 600,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
            color: "#C9A84C",
            marginBottom: "16px",
          }}
        >
          Plain Prophecy
        </div>
        <h1
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(32px, 6vw, 56px)",
            fontWeight: 900,
            lineHeight: 1.1,
            color: "#fff",
            marginBottom: "20px",
          }}
        >
          Blog
        </h1>
        <p
          style={{
            fontSize: "16px",
            fontWeight: 300,
            color: "rgba(255,255,255,0.6)",
            maxWidth: "520px",
            margin: "0 auto",
            lineHeight: 1.7,
          }}
        >
          Articles on biblical prophecy, hermeneutics, and what Scripture
          actually says — written for people who want answers, not speculation.
        </p>
      </header>

      {/* Post list */}
      <section
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: "0 24px 96px",
          display: "flex",
          flexDirection: "column",
          gap: "2px",
        }}
      >
        {posts.length === 0 ? (
          <p style={{ color: "rgba(255,255,255,0.35)", textAlign: "center", padding: "48px 0" }}>
            No posts yet — check back soon.
          </p>
        ) : (
          posts.map((post) => (
            <Link key={post._id} href={`/blog/${post.slug}`} style={{ textDecoration: "none" }}>
              <article
                className="blog-post-card"
                style={{
                  padding: "28px 0",
                  borderBottom: "1px solid rgba(255,255,255,0.07)",
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                  transition: "opacity 0.15s ease",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
                  <span
                    style={{
                      fontFamily: "IBM Plex Mono, monospace",
                      fontSize: "11px",
                      color: "rgba(255,255,255,0.35)",
                      letterSpacing: "0.05em",
                    }}
                  >
                    {formatDate(post.publishedAt)}
                  </span>
                  {post.tags.slice(0, 2).map((tag) => (
                    <span
                      key={tag}
                      style={{
                        fontFamily: "IBM Plex Mono, monospace",
                        fontSize: "10px",
                        fontWeight: 600,
                        letterSpacing: "0.15em",
                        textTransform: "uppercase",
                        color: "#C9A84C",
                        opacity: 0.8,
                      }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <h2
                  style={{
                    fontFamily: "Cinzel, serif",
                    fontSize: "clamp(18px, 3vw, 24px)",
                    fontWeight: 700,
                    color: "#fff",
                    lineHeight: 1.25,
                    margin: 0,
                  }}
                >
                  {post.title}
                </h2>
                <p
                  style={{
                    fontSize: "15px",
                    color: "rgba(255,255,255,0.55)",
                    lineHeight: 1.65,
                    margin: 0,
                  }}
                >
                  {post.excerpt}
                </p>
                <span
                  style={{
                    fontFamily: "IBM Plex Mono, monospace",
                    fontSize: "11px",
                    color: "#C9A84C",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    marginTop: "4px",
                  }}
                >
                  Read →
                </span>
              </article>
            </Link>
          ))
        )}
      </section>

      <style>{`
        .blog-post-card:hover h2 { color: rgba(255,255,255,0.85); }
        .blog-post-card:hover span[style*="C9A84C"]:last-child { opacity: 1; letter-spacing: 0.14em; }
      `}</style>
    </main>
  );
}
