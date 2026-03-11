import type { Metadata } from "next";
import CompareClient from "./CompareClient";

export const metadata: Metadata = {
  title: "Compare: Futurism vs Historicism | Plain Prophecy",
  description:
    "A rigorous side-by-side comparison of Evangelical Futurism (Dispensationalism) and SDA Historicism — timelines, accuracy scoring, biblical pillars, and evidence today.",
};

export default function ComparePage() {
  return <CompareClient />;
}
