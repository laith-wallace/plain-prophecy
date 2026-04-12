import type { Metadata } from "next";
import ProphetClient from "../ProphetClient";

export const metadata: Metadata = {
  title: "Daniel's Prophecies — Bible Prophecy Games | Plain Prophecy",
  description:
    "Play through Daniel's 8 prophecies. Commit to an answer before the reveal — then see how history confirms each one and how every card points to Christ.",
  alternates: {
    canonical: "https://plainprophecy.com/games/daniel",
  },
  openGraph: {
    title: "Daniel's Prophecies — Bible Prophecy Games",
    description:
      "Swipe through 8 Daniel prophecies. Commit to an answer, then see the historical truth and the Christ-centred anchor of each card.",
    url: "https://plainprophecy.com/games/daniel",
    type: "website",
  },
};

export default function DanielGamePage() {
  return <ProphetClient />;
}
