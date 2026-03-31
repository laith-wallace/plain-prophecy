import type { Metadata } from "next";
import VerseMemoryClient from "./VerseMemoryClient";

export const metadata: Metadata = {
  title: "Verse Memory — Prophecy Flashcards | Plain Prophecy",
  description:
    "Commit key prophecy verses from Daniel, Revelation, and Isaiah to memory through spaced repetition. The word that stays with you changes how you see everything.",
  alternates: {
    canonical: "https://plainprophecy.com/games/verse-memory",
  },
  openGraph: {
    title: "Verse Memory — Prophecy Flashcards",
    description:
      "Adaptive flashcards for key prophecy verses. Daniel, Revelation, Isaiah — commit the word to memory and let it stay.",
    url: "https://plainprophecy.com/games/verse-memory",
    type: "website",
  },
};

export default function VerseMemoryPage() {
  return <VerseMemoryClient />;
}
