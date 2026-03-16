import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { markdownToHtml } from "@/lib/markdown";

interface Props {
  params: Promise<{ slug: string }>;
}

function formatDate(ts: number): string {
  return new Date(ts).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await fetchQuery(api.blog.getBySlug, { slug });
  if (!post) return { title: "Post Not Found" };

  const title = post.metaTitle || `${post.title} — Plain Prophecy`;
  const description = post.metaDescription || post.excerpt;
  const imageUrl = post.ogImage || post.coverImage;

  return {
    title,
    description,
    alternates: {
      canonical: `https://plainprophecy.com/blog/${slug}`,
    },
    openGraph: {
      title: post.metaTitle || `${post.title} | Plain Prophecy`,
      description,
      url: `https://plainprophecy.com/blog/${slug}`,
      type: "article",
      publishedTime: new Date(post.publishedAt).toISOString(),
      authors: [post.author],
      ...(imageUrl ? { images: [{ url: imageUrl }] } : {}),
    },
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = await fetchQuery(api.blog.getBySlug, { slug });

  if (!post || !post.published) notFound();

  const bodyHtml = markdownToHtml(post.body);

  return (
    <main
      style={{
        background: "#0a0a06",
        minHeight: "100dvh",
        color: "#fff",
        fontFamily: "var(--font-ibm-plex-sans), sans-serif",
      }}
    >
      {/* Back nav */}
      <div style={{ maxWidth: 720, margin: "0 auto", padding: "32px 24px 0" }}>
        <Link
          href="/blog"
          style={{
            fontFamily: "IBM Plex Mono, monospace",
            fontSize: "11px",
            color: "rgba(255,255,255,0.4)",
            letterSpacing: "0.1em",
            textTransform: "uppercase",
            textDecoration: "none",
          }}
          className="blog-back-link"
        >
          ← Blog
        </Link>
      </div>

      {/* Cover image */}
      {post.coverImage && (
        <div
          style={{
            maxWidth: 720,
            margin: "32px auto 0",
            padding: "0 24px",
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={post.coverImage}
            alt={post.title}
            style={{
              width: "100%",
              aspectRatio: "16/9",
              objectFit: "cover",
              borderRadius: "8px",
              border: "1px solid rgba(201,168,76,0.15)",
            }}
          />
        </div>
      )}

      {/* Header */}
      <header
        style={{
          maxWidth: 720,
          margin: "0 auto",
          padding: post.coverImage ? "40px 24px 32px" : "72px 24px 32px",
        }}
      >
        {/* Tags */}
        {post.tags.length > 0 && (
          <div style={{ display: "flex", gap: "12px", marginBottom: "16px" }}>
            {post.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  fontFamily: "IBM Plex Mono, monospace",
                  fontSize: "10px",
                  fontWeight: 600,
                  letterSpacing: "0.2em",
                  textTransform: "uppercase",
                  color: "#C9A84C",
                  opacity: 0.85,
                }}
              >
                {tag}
              </span>
            ))}
          </div>
        )}

        <h1
          style={{
            fontFamily: "Cinzel, serif",
            fontSize: "clamp(28px, 5vw, 48px)",
            fontWeight: 900,
            lineHeight: 1.15,
            color: "#fff",
            marginBottom: "16px",
          }}
        >
          {post.title}
        </h1>

        <p
          style={{
            fontSize: "18px",
            color: "rgba(255,255,255,0.55)",
            lineHeight: 1.6,
            marginBottom: "24px",
          }}
        >
          {post.excerpt}
        </p>

        {/* Byline */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            paddingBottom: "32px",
            borderBottom: "1px solid rgba(255,255,255,0.08)",
          }}
        >
          <span
            style={{
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: "12px",
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "0.05em",
            }}
          >
            {post.author}
          </span>
          <span style={{ color: "rgba(255,255,255,0.2)", fontSize: "12px" }}>·</span>
          <span
            style={{
              fontFamily: "IBM Plex Mono, monospace",
              fontSize: "12px",
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "0.05em",
            }}
          >
            {formatDate(post.publishedAt)}
          </span>
        </div>
      </header>

      {/* Body */}
      <article
        style={{ maxWidth: 720, margin: "0 auto", padding: "0 24px 96px" }}
        dangerouslySetInnerHTML={{ __html: bodyHtml }}
      />

      <style>{`
        .blog-back-link:hover { color: rgba(255,255,255,0.7) !important; }
        article p { font-size: 17px; line-height: 1.8; color: rgba(255,255,255,0.72); margin-bottom: 24px; }
        article h1, article h2, article h3, article h4 { font-family: 'Cinzel', serif; color: #fff; margin-top: 40px; margin-bottom: 12px; }
        article h2 { font-size: clamp(20px, 3vw, 26px); }
        article h3 { font-size: clamp(17px, 2.5vw, 21px); }
        article ul, article ol { padding-left: 24px; margin-bottom: 24px; }
        article li { font-size: 17px; line-height: 1.75; color: rgba(255,255,255,0.72); margin-bottom: 8px; }
        article blockquote { border-left: 3px solid #C9A84C; padding-left: 20px; margin: 32px 0; }
        article blockquote p { color: rgba(255,255,255,0.5); font-style: italic; }
        article pre { margin: 24px 0; }
        article code { font-family: 'IBM Plex Mono', monospace; }
        article hr { border-color: rgba(255,255,255,0.1); margin: 40px 0; }
        article strong { color: #fff; }
      `}</style>
    </main>
  );
}
