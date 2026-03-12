"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";

export default function ScrollHeroVideo() {
  const videoRef = useRef<HTMLVideoElement>(null);
  const wrapperRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const sublineRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLAnchorElement>(null);
  const hintRef = useRef<HTMLDivElement>(null);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReducedMotion(motionQuery.matches);

    const video = videoRef.current;
    const wrapper = wrapperRef.current;
    if (!video || !wrapper || motionQuery.matches) return;

    video.pause();
    video.currentTime = 0;

    let rafPending = false;

    function scrubVideo() {
      if (!video || !wrapper) return;
      const wrapperTop = wrapper.getBoundingClientRect().top + window.scrollY;
      const wrapperHeight = wrapper.offsetHeight - window.innerHeight;
      const scrolled = window.scrollY - wrapperTop;
      const progress = Math.min(Math.max(scrolled / wrapperHeight, 0), 1);

      if (video.readyState >= 2) {
        video.currentTime = progress * video.duration;
      }

      // Widened visibility window for better readability
      const visible = progress > 0.1 && progress < 0.9;
      [headlineRef.current, sublineRef.current, ctaRef.current].forEach((el) => {
        if (!el) return;
        if (visible) {
          el.classList.add("scroll-hero-visible");
        } else {
          el.classList.remove("scroll-hero-visible");
        }
      });

      // Fade out hint after initial scroll
      if (hintRef.current) {
        if (progress > 0.05) {
          hintRef.current.style.opacity = "0";
          hintRef.current.style.pointerEvents = "none";
        } else {
          hintRef.current.style.opacity = "1";
          hintRef.current.style.pointerEvents = "auto";
        }
      }
    }

    function onScroll() {
      if (!rafPending) {
        rafPending = true;
        requestAnimationFrame(() => {
          scrubVideo();
          rafPending = false;
        });
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    scrubVideo();

    video.addEventListener("loadedmetadata", () => {
      video.currentTime = 0.001;
    });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  if (prefersReducedMotion) {
    return (
      <section className="scroll-hero-static" aria-label="Daniel prophecy preview">
        <div className="scroll-hero-sticky">
           <Image 
            src="/videos/beast-poster.jpg" 
            alt="Daniel's Prophetic Beasts" 
            width={1920}
            height={1080}
            className="scroll-hero-video object-cover"
            priority
          />
          <div className="scroll-hero-overlay-bg" />
          <div className="scroll-hero-content scroll-hero-visible-static">
            <div className="scroll-hero-eyebrow">The Prophecies of Daniel</div>
            <h2 className="scroll-hero-headline scroll-hero-visible">
              Eight Prophecies.
              <br />
              <em>Decoded by History.</em>
            </h2>
            <p className="scroll-hero-sub scroll-hero-visible">
              Guess the fulfilment. Reveal the history.
              <br />
              See how Scripture and archaeology converge on Christ.
            </p>
            <Link href="/prophet" className="scroll-hero-cta scroll-hero-visible">
              Explore the Prophecies →
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section 
      ref={wrapperRef} 
      className="scroll-hero-wrapper" 
      aria-label="Scroll-driven Daniel prophecy preview"
    >
      <div className="scroll-hero-sticky">
        <video
          ref={videoRef}
          className="scroll-hero-video"
          src="/videos/beast-hero.mp4"
          poster="/videos/beast-poster.jpg"
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
        />
        <div className="scroll-hero-overlay-bg" />

        <div className="scroll-hero-content">
          <div className="scroll-hero-eyebrow">The Prophecies of Daniel</div>
          <h2 ref={headlineRef} className="scroll-hero-headline">
            Eight Prophecies.
            <br />
            <em>Decoded by History.</em>
          </h2>
          <p ref={sublineRef} className="scroll-hero-sub">
            Guess the fulfilment. Reveal the history.
            <br />
            See how Scripture and archaeology converge on Christ.
          </p>
          <Link
            href="/prophet"
            ref={ctaRef}
            className="scroll-hero-cta"
          >
            Explore the Prophecies →
          </Link>
        </div>

        <div ref={hintRef} className="scroll-hero-progress-hint">
          <span>Scroll to explore</span>
          <div className="scroll-hero-chevron" />
        </div>
      </div>
    </section>
  );
}
