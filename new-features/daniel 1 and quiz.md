# Daniel 1 and Interactive Quiz Plan

## 1. Daniel 1 Study Page Addition
**Objective:** Add a "Daniel 1" study page matching the robust design, interactivity, and color scheme of the existing Daniel 2, 7, and 9 pages (e.g., using `--gold`, `--silver`, `Cinzel`, and `Inter`).

### Visual Structure & Interactivity
*   **Header Section:**
    *   Eyebrow: `Daniel 1 · 605 BC`
    *   Title: `The Test of <span>Faithfulness</span>`
    *   Subtitle: `Taken captive to Babylon, four Hebrew teenagers faced a choice: compromise their consecration to fit in, or risk their lives to remain faithful to God.`
    *   Scripture Reference: `Daniel 1:1–21`
*   **Interactive Visual Element:**
    *   Instead of a statue or beasts, the SVG can depict a **10-Day Dial**, a **Royal Table vs. Simple Pulse Plate**, or a **Timeline of Captivity**.
    *   Users will tap 5 segments to reveal the story phases:
        1.  **The Captivity:** Babylon sieges Jerusalem; Daniel and friends taken.
        2.  **The King's Meat:** The command to eat the royal diet and learn Chaldean ways.
        3.  **The Resolve:** "Daniel purposed in his heart not to defile himself."
        4.  **The 10-Day Test:** The risk of eating pulse (vegetables) and water.
        5.  **Ten Times Wiser:** The 3-year graduation before Nebuchadnezzar.

### Detail Cards (for each phase)
Each phase will follow the structure of existing pages:
*   **Era / Title / Verse:** (e.g., "The Resolve").
*   **The Prophecy/Story:** The biblical narrative for that phase.
*   **History Confirms / The Lesson:** How God honors those who honor Him.
*   **✦ Christ at the Centre:**
    *   *Example for "The Resolve":* Just as Daniel purposed in his heart and lived a life without blemish in a pagan empire, Jesus lived a perfect, undefiled life in a sinful world, qualifying Him to be our spotless sacrifice.
*   **Verse Spotlight:** A key verse from the chapter for that phase.

---

## 2. Gamified Interactive Quiz
**Objective:** A visually engaging, interactive quiz at the end of the `/studies` section to ensure users understand the prophetic sequence and symbols (Daniel 1, 2, 7, 9).

### Core Mechanics & UX
*   **Dynamic Progression (The Prophetic Timeline):** A progress bar (perhaps using the `progress-strip` style) that fills seamlessly as they answer questions correctly.
*   **Instant Visual & Haptic Feedback:**
    *   **Correct Answers:** A smooth `ring-pulse` animation in `--gold`, a gentle "success" chime, and a glowing highlight.
    *   **Incorrect Answers:** A subtle "shake" animation, graying out the option (`dimmed`), and a helpful hint appearing to guide them without frustration.

### Question Types
1.  **Multiple Choice (Standard):**
    *   *Example:* "Which metal represents Babylon in Nebuchadnezzar’s statue?" (Options: Gold, Silver, Bronze, Iron)
2.  **Drag & Drop / Matching:**
    *   Users match the Beast (Lion, Bear, Leopard, Terrible Beast) to the Metal (Gold, Silver, Bronze, Iron) or the Empire (Babylon, Medo-Persia, Greece, Rome).
3.  **Timeline Sequence Building:**
    *   Drag events into chronological order: (1) 457 BC Decree, (2) Jerusalem Rebuilt, (3) AD 27 Baptism of Jesus, (4) AD 31 Crucifixion.

### Gamification Elements
*   **Streaks:** Consecutive correct answers build a "Prophetic Insight" multiplier.
*   **Badges / Rewards:** Earning digital badges upon completing module quizzes (e.g., "The Golden Head Badge", "The 70 Weeks Master").
*   **Completion Screen:** A celebratory screen verifying their understanding, unlocking the next study, and providing a quick summary of the prophecies they've mastered.

### Tech Stack / Implementation
*   Build within the Next.js app as a reusable `QuizComponent.tsx`.
*   Maintain the existing CSS variable system (`--panel`, `--border`, fluid typography using `clamp()`).
*   Store quiz progress and badges in local state (or via Convex if user accounts are active) to track completion.
