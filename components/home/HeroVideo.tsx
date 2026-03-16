"use client";

import { useEffect, useRef, useState } from "react";

/**
 * Detects whether the user is on a slow or data-saving connection.
 * Returns true when the video should be skipped.
 */
function shouldSkipVideo(): boolean {
  if (typeof navigator === "undefined") return true;

  // Honour "Save Data" preference — Network Information API is not in all TS lib defs
  type NetworkInformation = { saveData?: boolean; effectiveType?: string };
  type NavigatorWithConnection = Navigator & {
    connection?: NetworkInformation;
    mozConnection?: NetworkInformation;
    webkitConnection?: NetworkInformation;
  };
  const nav = navigator as NavigatorWithConnection;
  const conn = nav.connection ?? nav.mozConnection ?? nav.webkitConnection;

  if (conn) {
    if (conn.saveData) return true;
    if (conn.effectiveType === "slow-2g" || conn.effectiveType === "2g") return true;
  }

  return false;
}

export default function HeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [show, setShow] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    if (shouldSkipVideo()) return;
    setShow(true);
  }, []);

  useEffect(() => {
    if (!show || !videoRef.current) return;
    const video = videoRef.current;

    // "playing" fires once the first frame is rendered — safe to fade in
    const onPlaying = () => setLoaded(true);
    video.addEventListener("playing", onPlaying);

    // play() both starts the download and requests playback
    video.play().catch(() => {
      // Autoplay blocked (e.g. strict browser policy) — silently skip
    });

    return () => video.removeEventListener("playing", onPlaying);
  }, [show]);

  if (!show) return null;

  return (
    <>
      {/* The video element — absolutely fills hero-bg */}
      <video
        ref={videoRef}
        className={`hero-video${loaded ? " hero-video--visible" : ""}`}
        src="/videos/hero-bible-study-compressed.mp4"
        poster="/videos/hero-bible-study-poster.jpg"
        muted
        loop
        playsInline
        preload="auto"
        aria-hidden="true"
      />

      {/* Dark overlay so text stays legible */}
      <div className="hero-video-overlay" aria-hidden="true" />
    </>
  );
}
