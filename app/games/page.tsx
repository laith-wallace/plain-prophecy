import type { Metadata } from "next";
import ProphetClient from "./ProphetClient";

export const metadata: Metadata = {
  title: "Games — Bible Prophecy Games | Plain Prophecy",
  description:
    "Play through Daniel's prophecies, the Gospel, and Revelation chapter by chapter. Stake your claim before the reveal — then see how history confirms each one and how every card points to Christ.",
  alternates: {
    canonical: "https://plainprophecy.com/games",
  },
  openGraph: {
    title: "Games — Bible Prophecy Games",
    description:
      "Swipe through Daniel, the Gospel, and Revelation. Commit to an answer, then see the historical truth and the Christ-centred anchor of each card.",
    url: "https://plainprophecy.com/games",
    type: "website",
  },
};

export default function GamesPage() {
  return <ProphetClient />;
}
