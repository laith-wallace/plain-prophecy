"use client";

import dynamic from "next/dynamic";
// Import the card deck styles here so they always travel with the component,
// no matter which page StudyCardDeck is embedded in.
import "@/app/studies-index.css";

const StudyCardDeck = dynamic(() => import("@/components/studies/StudyCardDeck"), { ssr: false });

export default function StudyCardDeckClient() {
  return <StudyCardDeck />;
}
