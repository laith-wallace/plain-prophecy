import { notFound } from "next/navigation";
import type { Metadata } from "next";
import Link from "next/link";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import { markdownToHtml } from "@/lib/markdown";
import { Clock, Calendar, ChevronRight, User, RefreshCw } from "lucide-react";
import TableOfContents from "@/components/blog/TableOfContents";
import SocialShare from "@/components/blog/SocialShare";
import AuthorProfile from "@/components/blog/AuthorProfile";
import { cn } from "@/lib/utils";

interface Props {
  params: Promise<{ slug: string }>;
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

  const contentHtml = markdownToHtml(post.body);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.coverImage || post.ogImage,
    "datePublished": new Date(post.publishedAt).toISOString(),
    "dateModified": post.lastUpdated ? new Date(post.lastUpdated).toISOString() : new Date(post.publishedAt).toISOString(),
    "author": {
      "@type": "Person",
      "name": post.author,
    },
    "publisher": {
      "@type": "Organization",
      "name": "Plain Prophecy",
      "logo": {
        "@type": "ImageObject",
        "url": "https://plainprophecy.com/plain-prophecy-logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://plainprophecy.com/blog/${post.slug}`
    }
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <main className="bg-[#0a0a06] min-h-screen text-white font-sans selection:bg-amber-500/30 selection:text-white">
      {/* Back nav */}
      <div className="max-w-7xl mx-auto pt-8 px-6">
        <Link
          href="/blog"
          className="font-mono text-[11px] text-white/40 tracking-[0.1em] uppercase no-underline hover:text-white/70 inline-flex items-center gap-2"
        >
          ← Back to Blog
        </Link>
      </div>

      <article className="max-w-7xl mx-auto px-6 py-12">
        {/* Title Section */}
        <div className="max-w-3xl mx-auto mb-12">
          {post.tags.length > 0 && (
            <div className="flex gap-3 mb-6">
              {post.tags.map((tag) => (
                <span
                  key={tag}
                  className="font-mono text-[10px] font-semibold tracking-[0.2em] uppercase text-amber-500/80"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}

          <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl font-black leading-[1.1] text-white mb-6">
            {post.title}
          </h1>

          <p className="text-xl text-stone-400 leading-relaxed mb-8 border-l-2 border-stone-800 pl-6 py-2">
            {post.excerpt}
          </p>

          {/* E-E-A-T Trust Signals */}
          <div className="flex flex-wrap items-center gap-x-8 gap-y-4 text-sm text-stone-500 pb-8 border-b border-stone-800/60">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-stone-900 flex items-center justify-center border border-stone-800">
                <User className="w-5 h-5 text-amber-500" />
              </div>
              <div>
                <span className="block text-stone-300 font-semibold">{post.author}</span>
                <span className="text-xs text-stone-500">Verified Author</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2 px-4 py-1.5 bg-stone-900/50 rounded-full border border-stone-800/50">
              <Calendar className="w-4 h-4 text-stone-600" />
              <span>
                {new Date(post.publishedAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </span>
            </div>

            {post.lastUpdated && (
              <div className="flex items-center gap-2 px-4 py-1.5 bg-amber-500/5 rounded-full border border-amber-500/10 text-amber-500/80">
                <RefreshCw className="w-4 h-4" />
                <span>
                  Updated {new Date(post.lastUpdated).toLocaleDateString("en-US", {
                    month: "long",
                    day: "numeric",
                    year: "numeric",
                  })}
                </span>
              </div>
            )}

            {post.readingTime && (
              <div className="flex items-center gap-2 text-stone-400">
                <Clock className="w-4 h-4" />
                <span>{post.readingTime} min read</span>
              </div>
            )}
          </div>
        </div>

        {/* Main Layout Grid */}
        <div className="flex flex-col lg:flex-row gap-16 lg:items-start">
          {/* Sidebar / ToC */}
          <aside className="lg:w-72 shrink-0 lg:sticky lg:top-24 order-2 lg:order-1">
            <div className="space-y-12">
              <TableOfContents content={post.body} />
              
              <div className="pt-8 border-t border-stone-800/60">
                <SocialShare 
                  url={`https://plainprophecy.com/blog/${post.slug}`} 
                  title={post.title} 
                />
              </div>

              <div className="p-6 bg-amber-500/5 rounded-2xl border border-amber-500/10">
                <h5 className="text-amber-500 font-bold text-sm mb-2 font-serif">Christ-Centered Study</h5>
                <p className="text-stone-400 text-xs leading-relaxed">
                  Our mission is to help you understand God's plan through history and prophecy.
                </p>
              </div>
            </div>
          </aside>

          {/* Content Area */}
          <div className="flex-1 max-w-3xl order-1 lg:order-2">
            {post.coverImage && (
              <div className="mb-12 rounded-3xl overflow-hidden border border-stone-800 shadow-2xl shadow-black/50">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full aspect-[16/9] object-cover hover:scale-105 transition-transform duration-700"
                />
              </div>
            )}

            <div 
              className={cn(
                "prose prose-invert prose-stone max-w-none",
                "prose-headings:font-serif prose-headings:text-white prose-headings:font-black",
                "prose-h2:text-3xl prose-h2:mt-16 prose-h2:mb-8 prose-h2:pb-4 prose-h2:border-b prose-h2:border-stone-800",
                "prose-h3:text-2xl prose-h3:mt-12 prose-h3:mb-6",
                "prose-p:text-stone-400 prose-p:leading-[1.8] prose-p:text-lg prose-p:mb-8",
                "prose-strong:text-stone-100 prose-strong:font-bold",
                "prose-blockquote:border-l-4 prose-blockquote:border-amber-500 prose-blockquote:bg-stone-900/40 prose-blockquote:py-2 prose-blockquote:px-8 prose-blockquote:rounded-r-2xl prose-blockquote:italic prose-blockquote:text-stone-300",
                "prose-ul:my-8 prose-ul:list-disc prose-ul:marker:text-amber-500",
                "prose-li:text-stone-400 prose-li:mb-4",
                "prose-img:rounded-3xl prose-img:mt-12 prose-img:shadow-xl",
                "prose-hr:border-stone-800 prose-hr:my-16"
              )}
              dangerouslySetInnerHTML={{ __html: contentHtml }}
            />

            {/* Author Section */}
            <AuthorProfile 
              name={post.author}
              bio={post.authorBio}
              image={post.authorImage}
              twitter={post.authorTwitter}
              linkedin={post.authorLinkedIn}
            />

            {/* Bottom Actions */}
            <div className="mt-16 pt-12 border-t border-stone-800 flex flex-col sm:flex-row items-center justify-between gap-8">
              <SocialShare 
                url={`https://plainprophecy.com/blog/${post.slug}`} 
                title={post.title} 
              />
              <Link 
                href="/blog"
                className="text-amber-500 hover:text-amber-400 font-semibold flex items-center gap-2 group"
              >
                Read more articles <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </article>

      {/* Font Classes - Mapping standard utility classes to font variables from layout */}
      <style key="blog-fonts">{`
        .font-serif { font-family: var(--font-cinzel), serif; }
        .font-sans { font-family: var(--font-ibm-plex-sans), sans-serif; }
        .font-mono { font-family: var(--font-ibm-plex-mono), monospace; }
        html { scroll-behavior: smooth; }
      `}</style>
      </main>
    </>
  );
}
