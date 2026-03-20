"use client";

import { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { motion, AnimatePresence } from "framer-motion";

const questions = [
  {
    id: "motivation",
    text: "When you think about the future and biblical prophecy, what is your primary feeling?",
    options: [
      { label: "Curiosity: I want to know if the Bible really predicted history.", value: "curiosity" },
      { label: "Concern: I see the world changing and want to know what's coming.", value: "concern" },
      { label: "Conviction: I want to draw closer to Christ and understand His plan better.", value: "conviction" },
      { label: "Scholarly: I'm interested in the historical and academic consensus.", value: "scholarly" },
    ],
  },
  {
    id: "foundation",
    text: "How familiar are you with the story of Jesus as told in the Gospels?",
    options: [
      { label: "New: I'm just beginning to explore the life of Jesus.", value: "new" },
      { label: "Familiar: I know the main stories and teachings.", value: "familiar" },
      { label: "Deeply Rooted: His life and sacrifice are the foundation of my daily walk.", value: "deeply_rooted" },
    ],
  },
  {
    id: "methodology",
    text: "How do you prefer to study complex topics?",
    options: [
      { label: "The Big Picture: Give me the high-level summary and 'why it matters'.", value: "big_picture" },
      { label: "The Evidence: I want to see the historical dates, archaeology, and original languages.", value: "evidence" },
      { label: "The Application: Show me how this applies to my character and spiritual life today.", value: "application" },
    ],
  },
  {
    id: "background",
    text: "Which of these terms have you heard used most often in relation to prophecy?",
    options: [
      { label: "The Secret Rapture / 7-Year Tribulation", value: "rapture" },
      { label: "The Reformation / Historicism / 1260 Days", value: "historicism" },
      { label: "I haven't heard much about either.", value: "neither" },
    ],
  },
  {
    id: "goal",
    text: "If you were to finish a course here, what would you want the result to be?",
    options: [
      { label: "Clarity: To finally understand those confusing symbols in Revelation.", value: "clarity" },
      { label: "Certainty: To have a firm, Bible-based reason for my faith.", value: "certainty" },
      { label: "Change: To be more like Christ as I see His hand in history.", value: "change" },
    ],
  },
];

export default function ProfileOnboarding({ onComplete }: { onComplete: () => void }) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const updateProfile = useMutation(api.profile.updateProfile);

  const currentQuestion = questions[step];

  const handleSelect = (value: string) => {
    setAnswers((prev) => ({ ...prev, [currentQuestion.id]: value }));
  };

  const nextStep = () => {
    if (step < questions.length - 1) {
      setStep(step + 1);
    } else {
      finish();
    }
  };

  const finish = async () => {
    // Scoring logic
    let level: "beginner" | "intermediate" | "advanced" = "intermediate";
    if (answers.foundation === "new" || answers.background === "neither") {
      level = "beginner";
    } else if (answers.foundation === "deeply_rooted" && answers.background === "historicism") {
      level = "advanced";
    }

    const interests = [];
    if (answers.methodology === "evidence") interests.push("evidence");
    if (answers.methodology === "application") interests.push("application");
    if (answers.motivation === "concern") interests.push("current_events");
    if (answers.goal === "clarity") interests.push("revelation");

    await updateProfile({
      spiritualLevel: level,
      interests,
      onboardingComplete: true,
      funnelLevel: level === "beginner" ? "basic" : level,
    });
    onComplete();
  };

  const progress = ((step + 1) / questions.length) * 100;

  return (
    <div className="profile-card">
      <span className="onboarding-subtitle">Spiritual Survey</span>
      <h2 className="onboarding-title">A Quiet Beginning</h2>
      
      <div className="progress-bar" style={{ width: `${progress}%` }} />

      <AnimatePresence mode="wait">
        <motion.div
          key={step}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          className="question-container"
        >
          <p className="question-text">{currentQuestion.text}</p>
          <div className="options-grid">
            {currentQuestion.options.map((opt) => (
              <button
                key={opt.value}
                className={`option-button ${answers[currentQuestion.id] === opt.value ? "selected" : ""}`}
                onClick={() => handleSelect(opt.value)}
              >
                <div className="option-marker" />
                {opt.label}
              </button>
            ))}
          </div>
        </motion.div>
      </AnimatePresence>

      <div className="nav-controls">
        <button 
          className="btn-secondary" 
          onClick={onComplete}
        >
          Skip to Library
        </button>
        <button
          className="btn-primary"
          disabled={!answers[currentQuestion.id]}
          onClick={nextStep}
        >
          {step === questions.length - 1 ? "Complete" : "Continue"}
        </button>
      </div>
    </div>
  );
}
