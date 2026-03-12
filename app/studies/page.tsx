import type { Metadata } from "next";
import StudiesIndexClient from "./StudiesIndexClient";

export const metadata: Metadata = {
  title: "Studies — Plain Prophecy",
  description:
    "Explore Christ-centred studies in Daniel and Revelation. Discover the prophetic framework of Scripture through swipeable, visual study cards.",
  alternates: {
    canonical: "https://plainprophecy.com/studies",
  },
  openGraph: {
    title: "Studies | Plain Prophecy",
    description:
      "Explore Christ-centred studies in Daniel and Revelation.",
    url: "https://plainprophecy.com/studies",
    type: "website",
  },
};

export default function StudiesPage() {
  return <StudiesIndexClient />;
}
