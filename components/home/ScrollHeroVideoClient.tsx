"use client";

import dynamic from "next/dynamic";

// ssr: false must live inside a Client Component — it cannot be used in Server Components.
// This wrapper ensures ScrollHeroVideo is only rendered on the client, which:
//   1. Prevents the server from emitting the 200vh desktop wrapper on mobile
//   2. Allows getInitialStatic() to read window.innerWidth on the very first render
const ScrollHeroVideo = dynamic(() => import("@/components/home/ScrollHeroVideo"), { ssr: false });

export default function ScrollHeroVideoClient() {
  return <ScrollHeroVideo />;
}
