import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { fetchQuery } from "convex/nextjs";
import { api } from "@/convex/_generated/api";
import DoctrineContent from "./DoctrineContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doctrine = await fetchQuery(api.doctrines.getBySlug, { slug });
  if (!doctrine) return { title: "Doctrine Not Found" };

  const title = doctrine.metaTitle || `${doctrine.title} — Plain Prophecy`;
  const description = doctrine.metaDescription || doctrine.intro;

  return {
    title,
    description,
    alternates: {
      canonical: `https://plainprophecy.com/doctrine/${slug}`,
    },
    openGraph: {
      title: doctrine.metaTitle || `${doctrine.title} | Plain Prophecy`,
      description,
      url: `https://plainprophecy.com/doctrine/${slug}`,
      type: "article",
      ...(doctrine.ogImage ? { images: [{ url: doctrine.ogImage }] } : {}),
    },
  };
}

export default async function DoctrineSlugPage({ params }: Props) {
  const { slug } = await params;
  const doctrine = await fetchQuery(api.doctrines.getBySlug, { slug });

  if (!doctrine || !doctrine.published) notFound();

  return <DoctrineContent doctrine={doctrine} />;
}
