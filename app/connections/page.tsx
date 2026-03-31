import type { Metadata } from "next";
import ConnectionsClient from "./ConnectionsClient";

export const metadata: Metadata = {
  title: "The Web of Scripture | Plain Prophecy",
  description:
    "Explore every cross-reference in the Bible — 63,779 connections visualised. Discover guided paths through the Christ Thread, the Sanctuary, the 70 Weeks, and more.",
};

export default function ConnectionsPage() {
  return <ConnectionsClient />;
}
