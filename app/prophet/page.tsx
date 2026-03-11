import type { Metadata } from "next";
import ProphetClient from "./ProphetClient";

export const metadata: Metadata = {
  title: "Prophet — Daniel's Prophecies | Plain Prophecy",
  description:
    "Swipe through 8 Daniel prophecies. Stake your claim before the reveal — then see how history confirms each one and how every prophecy points to Christ.",
  alternates: {
    canonical: "https://plainprophecy.com/prophet",
  },
  openGraph: {
    title: "Prophet — Daniel's Prophecies",
    description:
      "Swipe through 8 Daniel prophecies. Commit to an answer, then see the historical truth and the Christ-centred anchor of each vision.",
    url: "https://plainprophecy.com/prophet",
    type: "website",
  },
};

export default function ProphetPage() {
  return <ProphetClient />;
}
