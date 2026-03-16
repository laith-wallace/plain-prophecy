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

  return {
    title: `${doctrine.title} — Plain Prophecy`,
    description: doctrine.intro,
    alternates: {
      canonical: `https://plainprophecy.com/doctrine/${slug}`,
    },
    openGraph: {
      title: `${doctrine.title} | Plain Prophecy`,
      description: doctrine.intro,
      url: `https://plainprophecy.com/doctrine/${slug}`,
      type: "article",
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
