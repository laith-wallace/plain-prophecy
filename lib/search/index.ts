import { create, insert, search as oramaSearch, type AnyOrama } from "@orama/orama";
import { studyBooks } from "@/data/studies";
import { lessons } from "@/data/lessons";
import { prophecies } from "@/data/prophecies";
import { doctrines } from "@/data/doctrines";
import { pillars } from "@/data/pillars";

export interface SearchDoc {
  id: string;
  type: "study" | "lesson" | "prophecy" | "doctrine" | "pillar";
  title: string;
  body: string;
  href: string;
  label: string;
  scriptureRef: string;
}

let _db: AnyOrama | null = null;

async function buildIndex(): Promise<AnyOrama> {
  const db = await create({
    schema: {
      id: "string",
      type: "string",
      title: "string",
      body: "string",
      href: "string",
      label: "string",
      scriptureRef: "string",
    },
  });

  const docs: SearchDoc[] = [];

  // Studies
  for (const book of studyBooks) {
    for (const lesson of book.lessons) {
      const bodyParts = [lesson.intro ?? "", lesson.christCentre ?? ""];
      for (const section of lesson.sections ?? []) {
        bodyParts.push(section.heading, section.body ?? "");
        for (const block of section.contentBlocks ?? []) {
          bodyParts.push(block.label, block.text);
        }
      }
      docs.push({
        id: `study-${book.slug}-${lesson.slug}`,
        type: "study",
        title: lesson.title,
        body: bodyParts.filter(Boolean).join(" "),
        href: `/studies/${book.slug}/${lesson.slug}`,
        label: `Study · ${book.title}`,
        scriptureRef: lesson.scriptureRef ?? "",
      });
    }
  }

  // Lessons (Learn section)
  for (const lesson of lessons) {
    const bodyParts = [lesson.subtitle, lesson.summary];
    for (const section of lesson.sections) {
      bodyParts.push(section.heading, ...section.body);
      if (section.callout) bodyParts.push(section.callout.label, section.callout.text);
    }
    docs.push({
      id: `lesson-${lesson.slug}`,
      type: "lesson",
      title: lesson.title,
      body: bodyParts.filter(Boolean).join(" "),
      href: `/learn/${lesson.slug}`,
      label: `Lesson · ${lesson.scripture}`,
      scriptureRef: lesson.scripture,
    });
  }

  // Prophecies
  for (const p of prophecies) {
    const body = [p.subtitle, p.reveal.what, p.reveal.history, p.reveal.christ, p.reveal.love]
      .filter(Boolean)
      .join(" ");
    docs.push({
      id: `prophecy-${p.id}`,
      type: "prophecy",
      title: p.title,
      body,
      href: p.href,
      label: `Prophecy · ${p.scripture}`,
      scriptureRef: p.scripture,
    });
  }

  // Doctrines
  for (const doc of doctrines) {
    const bodyParts = [doc.subtitle, doc.intro, doc.christCentre, doc.verdict];
    for (const section of doc.sections) {
      bodyParts.push(section.heading);
      for (const block of section.contentBlocks) {
        bodyParts.push(block.label, block.text);
      }
    }
    docs.push({
      id: `doctrine-${doc.slug}`,
      type: "doctrine",
      title: doc.title,
      body: bodyParts.filter(Boolean).join(" "),
      href: `/doctrine/${doc.slug}`,
      label: `Doctrine · ${doc.scriptureRef}`,
      scriptureRef: doc.scriptureRef,
    });
  }

  // Pillars
  for (const pillar of pillars) {
    docs.push({
      id: `pillar-${pillar.num}`,
      type: "pillar",
      title: pillar.title,
      body: [pillar.label, ...pillar.paragraphs].join(" "),
      href: "/compare",
      label: `Pillar · ${pillar.label}`,
      scriptureRef: "",
    });
  }

  for (const doc of docs) {
    await insert(db, doc);
  }

  return db;
}

export async function getSearchIndex(): Promise<AnyOrama> {
  if (!_db) _db = await buildIndex();
  return _db;
}

export async function search(query: string): Promise<SearchDoc[]> {
  if (!query.trim()) return [];
  const db = await getSearchIndex();
  const results = await oramaSearch(db, {
    term: query,
    properties: ["title", "body", "label", "scriptureRef"],
    limit: 20,
    boost: { title: 2, scriptureRef: 1.5 },
    tolerance: 1,
  });
  return results.hits.map((h) => h.document as unknown as SearchDoc);
}

/**
 * Extract a ~120 char snippet from body centred on the first query token match.
 * Returns empty string if no match found (title-only match).
 */
export function getSnippet(body: string, query: string, maxLen = 120): string {
  const tokens = query
    .trim()
    .split(/\s+/)
    .filter(Boolean)
    .sort((a, b) => b.length - a.length); // longest token first for best context

  for (const token of tokens) {
    const idx = body.toLowerCase().indexOf(token.toLowerCase());
    if (idx === -1) continue;

    const half = Math.floor(maxLen / 2);
    const start = Math.max(0, idx - half);
    const end = Math.min(body.length, start + maxLen);
    const snippet = body.slice(start, end).trim();

    return (start > 0 ? "…" : "") + snippet + (end < body.length ? "…" : "");
  }

  return "";
}
