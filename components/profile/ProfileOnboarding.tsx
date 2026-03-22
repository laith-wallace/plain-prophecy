"use client";

import { useState } from "react";
import { useMutation, useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { BookOpen, Map, Clock, Scale, CheckCircle2, ChevronRight } from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────

type StepType = "intro" | "tour" | "question" | "complete";

interface Option {
  label: string;
  value: string;
}

interface Step {
  type: StepType;
  id?: string;
  text?: string;
  options?: Option[];
}

// ─── Data ─────────────────────────────────────────────────────────────────────

const questionSteps: Step[] = [
  {
    type: "question",
    id: "motivation",
    text: "When you think about biblical prophecy, what's your primary feeling?",
    options: [
      { label: "Curiosity", value: "curiosity" },
      { label: "Concern", value: "concern" },
      { label: "Conviction", value: "conviction" },
      { label: "Scholarly interest", value: "scholarly" },
    ],
  },
  {
    type: "question",
    id: "foundation",
    text: "How familiar are you with the story of Jesus as told in the Gospels?",
    options: [
      { label: "Just beginning to explore", value: "new" },
      { label: "I know the main stories and teachings", value: "familiar" },
      { label: "His life is the foundation of my daily walk", value: "deeply_rooted" },
    ],
  },
  {
    type: "question",
    id: "methodology",
    text: "How do you prefer to study complex topics?",
    options: [
      { label: "The Big Picture — give me the 'why it matters'", value: "big_picture" },
      { label: "The Evidence — dates, archaeology, original languages", value: "evidence" },
      { label: "The Application — how does this shape my life today?", value: "application" },
    ],
  },
  {
    type: "question",
    id: "background",
    text: "Which terms have you heard most in relation to prophecy?",
    options: [
      { label: "The Secret Rapture / 7-Year Tribulation", value: "rapture" },
      { label: "The Reformation / Historicism / 1260 Days", value: "historicism" },
      { label: "I haven't heard much about either", value: "neither" },
    ],
  },
  {
    type: "question",
    id: "goal",
    text: "If you finished a course here, what would you want the result to be?",
    options: [
      { label: "Clarity — understand the symbols in Revelation", value: "clarity" },
      { label: "Certainty — a firm, Bible-based reason for my faith", value: "certainty" },
      { label: "Change — become more like Christ as I study", value: "change" },
    ],
  },
];

const allSteps: Step[] = [
  { type: "intro" },
  { type: "tour" },
  ...questionSteps,
  { type: "complete" },
];

const features = [
  {
    icon: <BookOpen size={22} strokeWidth={1.5} />,
    title: "Studies",
    desc: "Deep dives into Daniel & Revelation",
  },
  {
    icon: <Map size={22} strokeWidth={1.5} />,
    title: "Map",
    desc: "Visualise prophecy on an interactive map",
  },
  {
    icon: <Clock size={22} strokeWidth={1.5} />,
    title: "Timeline",
    desc: "Watch history fulfil prophecy in real time",
  },
  {
    icon: <Scale size={22} strokeWidth={1.5} />,
    title: "Compare",
    desc: "See how historicism differs from futurism",
  },
];

// Phase dots config: which allSteps indices belong to each phase
// 0 = Welcome (step 0), 1 = Explore (step 1), 2 = Personalise (steps 2-6), 3 = You're In (step 7)
const phases = ["Welcome", "Explore", "Personalise", "You're In"];

function getPhase(stepIndex: number): number {
  if (stepIndex === 0) return 0;
  if (stepIndex === 1) return 1;
  if (stepIndex >= 2 && stepIndex <= 6) return 2;
  return 3;
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function ProfileOnboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [computedLevel, setComputedLevel] = useState<"beginner" | "intermediate" | "advanced">("intermediate");
  const updateProfile = useMutation(api.profile.updateProfile);
  const user = useQuery(api.users.viewer);

  const currentStep = allSteps[step];
  const currentPhase = getPhase(step);

  // Which question number are we on (1-indexed, for question steps only)
  const questionIndex = step - 2; // steps 2-6 are questions 0-4

  const handleSelect = (value: string) => {
    if (!currentStep.id) return;
    setAnswers((prev) => ({ ...prev, [currentStep.id!]: value }));
  };

  const handleNext = () => {
    if (step < allSteps.length - 1) {
      setStep(step + 1);
    }
  };

  const handleSkip = async () => {
    // Complete onboarding with defaults
    await updateProfile({
      spiritualLevel: "beginner",
      interests: [],
      onboardingComplete: true,
      funnelLevel: "basic",
    });
    onComplete();
  };

  const finish = async () => {
    // Scoring logic — unchanged from original
    let level: "beginner" | "intermediate" | "advanced" = "intermediate";
    if (answers.foundation === "new" || answers.background === "neither") {
      level = "beginner";
    } else if (answers.foundation === "deeply_rooted" && answers.background === "historicism") {
      level = "advanced";
    }

    const interests: string[] = [];
    if (answers.methodology === "evidence") interests.push("evidence");
    if (answers.methodology === "application") interests.push("application");
    if (answers.motivation === "concern") interests.push("current_events");
    if (answers.goal === "clarity") interests.push("revelation");

    setComputedLevel(level);

    await updateProfile({
      spiritualLevel: level,
      interests,
      onboardingComplete: true,
      funnelLevel: level === "beginner" ? "basic" : level,
      answers: {
        motivation: answers.motivation,
        foundation: answers.foundation,
        methodology: answers.methodology,
        background: answers.background,
        goal: answers.goal,
      },
    });

    // Move to completion step
    setStep(allSteps.length - 1);
  };

  // Primary button label and action
  const getPrimaryLabel = () => {
    if (currentStep.type === "intro") return "Get Started";
    if (currentStep.type === "tour") return "Continue";
    if (currentStep.type === "question") {
      return step === 6 ? "Finish" : "Continue";
    }
    return "Enter Your Library";
  };

  const handlePrimary = () => {
    if (currentStep.type === "intro" || currentStep.type === "tour") {
      handleNext();
    } else if (currentStep.type === "question") {
      if (step === 6) {
        finish();
      } else {
        handleNext();
      }
    } else if (currentStep.type === "complete") {
      onComplete();
    }
  };

  const isPrimaryDisabled =
    currentStep.type === "question" && !answers[currentStep.id ?? ""];

  return (
    <div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center overflow-y-auto"
      style={{ background: "#0c0a09" }}
    >
      {/* Phase indicator — hidden on welcome */}
      {step > 0 && step < allSteps.length - 1 && (
        <div className="fixed top-0 left-0 right-0 flex justify-center pt-6 pb-4 z-10"
          style={{ background: "linear-gradient(to bottom, #0c0a09 80%, transparent)" }}>
          <div className="flex items-start gap-6">
            {phases.map((phase, i) => {
              const isActive = i === currentPhase;
              const isDone = i < currentPhase;
              return (
                <div key={phase} className="flex flex-col items-center gap-1.5">
                  <div
                    className="w-2.5 h-2.5 rounded-full transition-all duration-300"
                    style={{
                      background: isActive
                        ? "#e8a020"
                        : isDone
                        ? "#e8a020"
                        : "rgba(255,255,255,0.2)",
                      boxShadow: isActive ? "0 0 8px rgba(232,160,32,0.6)" : "none",
                      opacity: isDone ? 0.5 : 1,
                    }}
                  />
                  <span
                    className="text-[10px] tracking-wide uppercase font-mono"
                    style={{
                      color: isActive ? "#e8a020" : "rgba(255,255,255,0.3)",
                    }}
                  >
                    {phase}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Main content area */}
      <div className="w-full max-w-lg px-5 pt-20 pb-8 flex flex-col min-h-dvh">
        <AnimatePresence mode="wait">
          <motion.div
            key={step}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="flex-1 flex flex-col"
          >
            {/* ── INTRO ── */}
            {currentStep.type === "intro" && (
              <div className="flex flex-col items-center justify-center flex-1 text-center gap-6 pt-8">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center"
                  style={{ background: "#1c1917", border: "1px solid rgba(232,160,32,0.3)" }}
                >
                  <Image
                    src="/images/login/logo.png"
                    alt="Plain Prophecy"
                    width={40}
                    height={40}
                  />
                </div>

                <div className="space-y-3">
                  <h1 className="text-3xl font-bold text-white leading-tight">
                    Biblical prophecy,<br />made clear.
                  </h1>
                  <p className="text-base leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
                    The most accurate prophecy resource on the internet — built for curious minds like yours. Grounded in Scripture. Christ-centred.
                  </p>
                </div>

                <button
                  onClick={handlePrimary}
                  className="flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-sm mt-4 transition-all"
                  style={{ background: "#e8a020", color: "#0c0a09" }}
                >
                  Get Started <ChevronRight size={16} />
                </button>
              </div>
            )}

            {/* ── TOUR ── */}
            {currentStep.type === "tour" && (
              <div className="flex flex-col gap-6 flex-1 pt-4">
                <div className="space-y-1">
                  <p className="text-xs uppercase tracking-widest font-mono" style={{ color: "#e8a020" }}>
                    What you'll find
                  </p>
                  <h2 className="text-2xl font-bold text-white">Four ways to explore prophecy</h2>
                </div>

                <div className="grid grid-cols-2 gap-3 flex-1">
                  {features.map((f) => (
                    <div
                      key={f.title}
                      className="flex flex-col gap-3 p-4 rounded-xl transition-all"
                      style={{
                        background: "#1c1917",
                        border: "1px solid rgba(255,255,255,0.07)",
                      }}
                    >
                      <div
                        className="w-10 h-10 rounded-lg flex items-center justify-center"
                        style={{ background: "rgba(232,160,32,0.12)", color: "#e8a020" }}
                      >
                        {f.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-white text-sm">{f.title}</p>
                        <p className="text-xs mt-0.5 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                          {f.desc}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSkip}
                    className="flex-1 py-3.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    Skip to Library
                  </button>
                  <button
                    onClick={handlePrimary}
                    className="flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-1.5"
                    style={{ background: "#e8a020", color: "#0c0a09" }}
                  >
                    Continue <ChevronRight size={15} />
                  </button>
                </div>
              </div>
            )}

            {/* ── QUESTION ── */}
            {currentStep.type === "question" && currentStep.options && (
              <div className="flex flex-col gap-5 flex-1 pt-2">
                {/* Badge */}
                <div className="flex items-center gap-2">
                  <span
                    className="text-xs font-mono px-2.5 py-1 rounded-full"
                    style={{ background: "rgba(232,160,32,0.12)", color: "#e8a020" }}
                  >
                    {questionIndex + 1} of {questionSteps.length}
                  </span>
                </div>

                <h2 className="text-xl font-bold text-white leading-snug">
                  {currentStep.text}
                </h2>

                <div className="flex flex-col gap-2.5 flex-1">
                  {currentStep.options.map((opt) => {
                    const selected = answers[currentStep.id!] === opt.value;
                    return (
                      <button
                        key={opt.value}
                        onClick={() => handleSelect(opt.value)}
                        className="w-full text-left px-4 py-4 rounded-xl text-sm transition-all"
                        style={{
                          background: selected ? "rgba(232,160,32,0.1)" : "#1c1917",
                          border: selected
                            ? "1px solid rgba(232,160,32,0.5)"
                            : "1px solid rgba(255,255,255,0.07)",
                          color: selected ? "#fff" : "rgba(255,255,255,0.7)",
                          borderLeft: selected ? "3px solid #e8a020" : "1px solid rgba(255,255,255,0.07)",
                          minHeight: "52px",
                        }}
                      >
                        {opt.label}
                      </button>
                    );
                  })}
                </div>

                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleSkip}
                    className="flex-1 py-3.5 rounded-xl text-sm font-medium transition-all"
                    style={{
                      background: "transparent",
                      border: "1px solid rgba(255,255,255,0.12)",
                      color: "rgba(255,255,255,0.5)",
                    }}
                  >
                    Skip to Library
                  </button>
                  <button
                    onClick={handlePrimary}
                    disabled={isPrimaryDisabled}
                    className="flex-1 py-3.5 rounded-xl text-sm font-semibold transition-all"
                    style={{
                      background: isPrimaryDisabled ? "rgba(232,160,32,0.3)" : "#e8a020",
                      color: "#0c0a09",
                      cursor: isPrimaryDisabled ? "not-allowed" : "pointer",
                    }}
                  >
                    {getPrimaryLabel()}
                  </button>
                </div>
              </div>
            )}

            {/* ── COMPLETE ── */}
            {currentStep.type === "complete" && (
              <div className="flex flex-col items-center justify-center flex-1 text-center gap-6 pt-8">
                <motion.div
                  initial={{ scale: 0.5, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 200, damping: 15 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(232,160,32,0.15)", border: "1px solid rgba(232,160,32,0.3)" }}
                >
                  <CheckCircle2 size={40} color="#e8a020" strokeWidth={1.5} />
                </motion.div>

                <div className="space-y-2">
                  <h1 className="text-2xl font-bold text-white">
                    You're all set{user?.name ? `, ${user.name.split(" ")[0]}` : ""}
                  </h1>
                  <p style={{ color: "rgba(255,255,255,0.5)" }} className="text-sm leading-relaxed">
                    Your study path is ready. We've personalised your library based on your answers.
                  </p>
                </div>

                {/* Level badge */}
                <div
                  className="px-4 py-2 rounded-full text-xs font-mono uppercase tracking-widest"
                  style={{
                    background: "rgba(232,160,32,0.12)",
                    border: "1px solid rgba(232,160,32,0.25)",
                    color: "#e8a020",
                  }}
                >
                  {computedLevel === "beginner"
                    ? "Seeker — Level 1"
                    : computedLevel === "advanced"
                    ? "Scholar — Level 3"
                    : "Student — Level 2"}
                </div>

                {/* First study teaser */}
                <div
                  className="w-full rounded-xl p-4 text-left"
                  style={{ background: "#1c1917", border: "1px solid rgba(255,255,255,0.07)" }}
                >
                  <p className="text-xs uppercase tracking-widest font-mono mb-2" style={{ color: "rgba(255,255,255,0.35)" }}>
                    Recommended first study
                  </p>
                  <p className="font-semibold text-white text-sm">
                    {computedLevel === "beginner"
                      ? "The Day-Year Principle"
                      : "The Seventy Weeks Decoded"}
                  </p>
                  <p className="text-xs mt-1" style={{ color: "rgba(255,255,255,0.45)" }}>
                    {computedLevel === "beginner"
                      ? "The key that unlocks biblical prophecy timelines."
                      : "Daniel 9 — the most precise prophecy in all of Scripture."}
                  </p>
                </div>

                <button
                  onClick={handlePrimary}
                  className="w-full py-4 rounded-xl font-semibold text-sm mt-2 transition-all flex items-center justify-center gap-2"
                  style={{ background: "#e8a020", color: "#0c0a09" }}
                >
                  Enter Your Library <ChevronRight size={16} />
                </button>
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
