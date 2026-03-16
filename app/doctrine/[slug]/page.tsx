import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { findDoctrine, doctrines } from "@/data/doctrines";
import DoctrineContent from "./DoctrineContent";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const doctrine = findDoctrine(slug);
  if (!doctrine) return { title: "Doctrine Not Found" };

  const d = doctrine as typeof doctrine & { metaTitle?: string; metaDescription?: string; ogImage?: string };
  const title = d.metaTitle || `${doctrine.title} — Plain Prophecy`;
  const description = d.metaDescription || doctrine.intro;

  return {
    title,
    description,
    alternates: {
      canonical: `https://plainprophecy.com/doctrine/${slug}`,
    },
    openGraph: {
      title: d.metaTitle || `${doctrine.title} | Plain Prophecy`,
      description,
      url: `https://plainprophecy.com/doctrine/${slug}`,
      type: "article",
      ...(d.ogImage ? { images: [{ url: d.ogImage }] } : {}),
    },
  };
}

export function generateStaticParams() {
  return doctrines.map((d) => ({ slug: d.slug }));
}

export default async function DoctrineSlugPage({ params }: Props) {
  const { slug } = await params;
  const doctrine = findDoctrine(slug);
  if (!doctrine) notFound();

  return <DoctrineContent doctrine={doctrine} />;
}
