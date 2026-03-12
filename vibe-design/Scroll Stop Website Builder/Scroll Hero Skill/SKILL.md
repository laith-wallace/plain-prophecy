# 🎬 Scroll Hero Skill

> A reusable skill for building scroll-driven video sections where the video
> scrubs frame-by-frame as the user scrolls — on desktop AND mobile.

---

## What This Skill Builds

A **Scroll Hero** section where:

- A video is pinned/sticky on screen
- As the user **scrolls down**, the video plays forward frame by frame
- As the user **scrolls up**, the video rewinds
- On **mobile**, the same effect is driven by touch scroll
- The section "locks" the page while the video plays, then releases scroll when
  done
- Overlaid **text/headlines animate in** at specific video timestamps

This is the same interaction Apple uses on iPhone product pages. It is one of
the highest-converting, most scroll-stopping interactions on the modern web.

---

## How It Works (The Core Concept)

The trick is simple but powerful:

1. The video is **never set to autoplay** — `currentTime` is manually controlled
2. A tall scroll container (e.g. `500vh`) sits behind the sticky video
3. As the user scrolls through that container, we calculate scroll progress (`0`
   to `1`)
4. We multiply that progress by `video.duration` to get the target `currentTime`
5. We set `video.currentTime = targetTime` on every scroll event

scrollProgress = scrollY / scrollHeight → (0.0 to 1.0) video.currentTime =
scrollProgress × video.duration

---

## Video Requirements

Before building, prepare your video correctly:

| Property       | Requirement                                          | Why                                |
| -------------- | ---------------------------------------------------- | ---------------------------------- |
| **Format**     | MP4 (H.264) + WebM fallback                          | Best browser compatibility         |
| **Resolution** | 1920×1080 (landscape) or 1080×1920 (portrait/mobile) | Crisp on retina                    |
| **Duration**   | 3–10 seconds ideal                                   | Longer = more scrolling needed     |
| **Frame Rate** | 24–60fps                                             | Higher fps = smoother scrub        |
| **File Size**  | Under 8MB ideally                                    | Compress with HandBrake or Squoosh |
| **Audio**      | Muted or no audio track                              | Autoplay policies block audio      |
| **Encoding**   | Fast-start / moov atom at front                      | Allows scrubbing before full load  |

### ⚠️ Critical: Encode for Scrubbing

Normal video files buffer frames sequentially. For scrubbing to work, encode
with:

- **HandBrake:** Web Optimized = ON (moves moov atom to front)
- **FFmpeg command:** ffmpeg -i input.mp4 -movflags faststart -acodec copy
  -vcodec copy output.mp4

---

## Full Implementation (Copy-Paste Ready)

### HTML Structure

, ,[object Object],

---

### CSS

/* ─── Scroll Hero ─── _/ .scroll-hero-wrapper { position: relative; height:
500vh; /_ Controls how much scrolling = full video playthrough */ background:
#000; }

.scroll-hero-sticky { position: sticky; top: 0; height: 100vh; width: 100%;
overflow: hidden; display: flex; align-items: center; justify-content: center; }

.scroll-hero-video { position: absolute; top: 0; left: 0; width: 100%; height:
100%; object-fit: cover; /* Always fills the viewport — crops if needed */
pointer-events: none; }

/* Overlay text */ .scroll-hero-overlay { position: relative; z-index: 10;
text-align: center; color: #fff; padding: 0 24px; max-width: 800px; }

.scroll-hero-headline { font-size: clamp(2rem, 6vw, 5rem); /* Scales with
viewport */ font-weight: 800; line-height: 1.1; opacity: 0; transform:
translateY(30px); transition: opacity 0.6s ease, transform 0.6s ease; }

.scroll-hero-sub { font-size: clamp(1rem, 2vw, 1.5rem); margin-top: 16px;
opacity: 0; transform: translateY(20px); transition: opacity 0.6s ease 0.15s,
transform 0.6s ease 0.15s; }

/* Class toggled by JS to reveal text */ .scroll-hero-headline.visible,
.scroll-hero-sub.visible { opacity: 1; transform: translateY(0); }

/* ─── Mobile: portrait video swap ─── _/ @media (max-width: 768px) and
(orientation: portrait) { .scroll-hero-wrapper { height: 600vh; /_ Slightly
taller on mobile for easier control */ } }

---

### JavaScript (Works on Desktop + Mobile)

(function () { const video = document.getElementById('scrollHeroVideo'); const
wrapper = document.querySelector('.scroll-hero-wrapper'); const headline =
document.getElementById('scrollLine1'); const subline =
document.getElementById('scrollLine2');

if (!video || !wrapper) return;

// ── Ensure video is ready to scrub ── video.pause(); video.currentTime = 0;

// ── Core scrubbing function ── function scrubVideo() { const wrapperTop =
wrapper.getBoundingClientRect().top + window.scrollY; const wrapperHeight =
wrapper.offsetHeight - window.innerHeight; const scrolled = window.scrollY -
wrapperTop;

    // Clamp progress between 0 and 1
    const progress = Math.min(Math.max(scrolled / wrapperHeight, 0), 1);

    // Set video time
    if (video.readyState >= 2) {
      video.currentTime = progress * video.duration;
    }

    // ── Optional: Animate text at specific scroll progress points ──
    if (progress > 0.2 && progress < 0.8) {
      headline?.classList.add('visible');
      subline?.classList.add('visible');
    } else {
      headline?.classList.remove('visible');
      subline?.classList.remove('visible');
    }

}

// ── Desktop: scroll event ── window.addEventListener('scroll', scrubVideo, {
passive: true });

// ── Mobile: touch events (converts swipe to scroll delta) ── let lastTouchY =
0;

window.addEventListener('touchstart', (e) => { lastTouchY =
e.touches[0].clientY; }, { passive: true });

window.addEventListener('touchmove', (e) => { // On mobile, scroll events fire
normally during touch scroll // The scrubVideo() scroll listener handles it
automatically // This block exists in case you want manual touch override
scrubVideo(); }, { passive: true });

// ── Initial call (in case page loads mid-scroll) ── scrubVideo();

// ── Preload video frames for smoother scrubbing ──
video.addEventListener('loadedmetadata', () => { video.currentTime = 0.001; //
Trigger first frame decode });

})();

---

## Text Animation Trigger Points Reference

Control WHEN your overlay text appears by editing the `progress` thresholds in
JS:

| Effect           | Progress Range | Example Use                    |
| ---------------- | -------------- | ------------------------------ |
| Fade in early    | `0.05 → 0.4`   | Welcome message at top         |
| Mid-video reveal | `0.3 → 0.65`   | Feature callout                |
| End reveal       | `0.7 → 1.0`    | CTA / sign-off                 |
| Full duration    | `0.1 → 0.9`    | Always visible while scrolling |

---

## Scroll Height Formula

The `height` of `.scroll-hero-wrapper` controls scroll speed. Use this formula:

wrapper height = video duration (seconds) × scroll speed multiplier × 100vh

Examples:

- 5s video, normal speed → 500vh (5 × 100)
- 5s video, slow/cinematic → 700vh (5 × 140)
- 8s video, fast → 600vh (8 × 75)

**Rule of thumb:** More `vh` = slower scrub = more control for the user. Less
`vh` = quicker, snappier.

---

## Multiple Video Formats — Mobile/Desktop Swap

For portrait mobile, serve a different (vertical) crop of the video:

,[object Object],

---

## Performance Optimization Checklist

- [ ] Video encoded with `faststart` flag (moov atom at front)
- [ ] Video compressed under 8MB (use HandBrake, target ~2MB for mobile)
- [ ] `poster` attribute set to first frame image (avoids flash of blank)
- [ ] `preload="auto"` on the video element
- [ ] Scroll listener uses `{ passive: true }` (prevents jank)
- [ ] Use `requestAnimationFrame` for very large projects (throttle scrub calls)
- [ ] Test on real iOS Safari (most restrictive video environment)

### Optional: requestAnimationFrame Throttle (for heavy pages)

let rafPending = false;

window.addEventListener('scroll', () => { if (!rafPending) { rafPending = true;
requestAnimationFrame(() => { scrubVideo(); rafPending = false; }); } }, {
passive: true });

---

## Common Issues + Fixes

| Problem                       | Cause                                        | Fix                                                      |
| ----------------------------- | -------------------------------------------- | -------------------------------------------------------- |
| Video doesn't scrub on iOS    | Video not `muted` + `playsinline`            | Always add both attributes                               |
| Scrubbing is choppy           | Video not fast-start encoded                 | Re-encode with `-movflags faststart`                     |
| Blank video on load           | No `poster` image set                        | Add `poster="first-frame.jpg"`                           |
| Mobile scroll doesn't trigger | Passive listeners fine, check wrapper height | Ensure `wrapper-height > 100vh`                          |
| Video jumps instead of scrubs | `readyState < 2`                             | Wrap `currentTime` in `if (video.readyState >= 2)` check |
| Text doesn't animate          | Progress thresholds off                      | Console.log `progress` to calibrate                      |
| Video too fast/slow           | `wrapper height` too short/tall              | Increase/decrease `vh` value                             |

---

## Prompt Template (For Claude / AI Builder)

When you want Claude to build this for you, paste this prompt:

Build a Scroll Hero section using my video file [VIDEO_FILE].

Requirements:

- The video scrubs frame-by-frame as the user scrolls
- Section height is 500vh so the video plays over 5 scroll lengths
- Video is sticky, covers 100vh, object-fit: cover
- On mobile (touch scroll) it works the same way
- Overlay text "[HEADLINE]" fades in when scroll progress is between 20%–80%
- Subheadline "[SUBHEADLINE]" fades in 150ms after headline
- Video is muted, playsinline, preloaded
- Use the Scroll Hero Skill pattern with requestAnimationFrame throttle
- Output clean, self-contained HTML/CSS/JS in one file

---

## Reuse Checklist (Every Time You Use This Skill)

Before deploying your Scroll Hero section, check:

- [ ] Video encoded for scrubbing (faststart / moov at front)
- [ ] Correct `wrapper height` set for desired scroll speed
- [ ] `poster` image matches video first frame
- [ ] Text trigger thresholds calibrated (`console.log(progress)` to check)
- [ ] Tested on Chrome desktop ✓
- [ ] Tested on iOS Safari ✓
- [ ] Tested on Android Chrome ✓
- [ ] Video loads under 3G conditions (test in DevTools)
- [ ] Fallback exists if video fails to load (poster image stays visible)

---

> **This skill is complete and self-contained.** Every time you want a Scroll
> Hero section, open this file, grab the code, swap your video path, adjust the
> `wrapper height`, set your text triggers, and ship. 🚀
