import type { Metadata } from "next";
import WordQuestClient from "./WordQuestClient";

export const metadata: Metadata = {
  title: "Word Quest — Bible Vocabulary Game | Plain Prophecy",
  description:
    "Match the word to its meaning and discover the scripture behind it. Grace, faith, covenant, resurrection — the vocabulary of the gospel, levelled up.",
  alternates: {
    canonical: "https://plainprophecy.com/games/word-quest",
  },
  openGraph: {
    title: "Word Quest — Bible Vocabulary Game",
    description:
      "Match the word to its meaning. Every correct match reveals the scripture behind it. Three levels, from Explorer to Champion.",
    url: "https://plainprophecy.com/games/word-quest",
    type: "website",
  },
};

export default function WordQuestPage() {
  return <WordQuestClient />;
}
