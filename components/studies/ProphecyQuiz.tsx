"use client";

import React, { useState, useEffect } from "react";
import { getQuizQuestions, QuizQuestion } from "@/data/quizQuestions";
import "./ProphecyQuiz.css";

interface ProphecyQuizProps {
  lessonSlug: string;
}

export default function ProphecyQuiz({ lessonSlug }: ProphecyQuizProps) {
  const [questions, setQuestions] = useState<QuizQuestion[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [isFinished, setIsFinished] = useState(false);

  // States for interaction
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [correctOption, setCorrectOption] = useState<string | null>(null);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [showHint, setShowHint] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [feedback, setFeedback] = useState("");

  const correctPraise = [
    "Scripture Mastery!",
    "Divine Insight!",
    "Faithful Truth!",
    "Prophetic Clarity!",
    "Wisdom of Daniel!",
  ];

  useEffect(() => {
    const loadedQuestions = getQuizQuestions(lessonSlug);
    setQuestions(loadedQuestions);
  }, [lessonSlug]);

  if (questions.length === 0) return null;

  const currentQuestion = questions[currentIndex];
  const progressPercentage = ((currentIndex + (isCorrect ? 1 : 0)) / questions.length) * 100;

  const handleOptionSelect = (option: string) => {
    if (selectedOption !== null || isTransitioning) return;

    setSelectedOption(option);
    const correct = option === currentQuestion.correctAnswer;
    setIsCorrect(correct);

    if (correct) {
      setScore(prev => prev + 1);
      setStreak(prev => prev + 1);
      setFeedback(correctPraise[Math.floor(Math.random() * correctPraise.length)]);
      
      setTimeout(() => {
        setIsTransitioning(true);
        setTimeout(() => {
          if (currentIndex < questions.length - 1) {
            setCurrentIndex(prev => prev + 1);
            resetInteractionState();
            setIsTransitioning(false);
          } else {
            setIsFinished(true);
          }
        }, 500); // Duration of slide-out
      }, 1200); // Time to see the correct state
    } else {
      setStreak(0);
      setFeedback("Study deeper...");
      setCorrectOption(currentQuestion.correctAnswer);
      setShowHint(true);
      
      setTimeout(() => {
        resetInteractionState();
      }, 2500);
    }
  };

  const resetInteractionState = () => {
    setSelectedOption(null);
    setCorrectOption(null);
    setIsCorrect(null);
    setShowHint(false);
    setFeedback("");
  };

  const restartQuiz = () => {
    setCurrentIndex(0);
    setScore(0);
    setStreak(0);
    setIsFinished(false);
    resetInteractionState();
    setIsTransitioning(false);
  };

  if (isFinished) {
    return (
      <section className="prophecy-quiz-section">
        <div className="prophecy-quiz-container quiz-finished-state">
          <div className="quiz-header">
            <h3 className="quiz-title">Knowledge Mastery</h3>
          </div>
          <div className="score-orb">
            <span className="score-number">{score}/{questions.length}</span>
            <span className="score-label">RESOLVED</span>
          </div>
          <p className="completion-text">
            {score === questions.length 
              ? "Your understanding is ten times better than all the magicians of Babylon. Excellent faithfulness." 
              : "A strong foundation in prophecy. Re-examine the text to absolute mastery."}
          </p>
          <button className="quiz-btn-premium" onClick={restartQuiz}>
            Begin New Study
          </button>
        </div>
      </section>
    );
  }

  return (
    <section className="prophecy-quiz-section">
      <div className={`prophecy-quiz-container ${isCorrect ? 'correct-glow' : ''}`}>
        <div className="quiz-header">
          <div className="quiz-header-main">
            <span className="quiz-eyebrow">Prophetic Check</span>
            <h3 className="quiz-title">Test Your Discernment</h3>
          </div>
          <div className="quiz-stats">
            {streak > 1 && <span className="streak-orb">{streak}</span>}
            {feedback && <span className="feedback-tag fade-in">{feedback}</span>}
          </div>
        </div>

        <div className="quiz-progress-wrap">
          <div className="quiz-progress-meta">
            <span className="q-current">Question {currentIndex + 1}</span>
            <span>of {questions.length}</span>
          </div>
          <div className="quiz-progress-track">
            <div
              className="quiz-progress-fill"
              style={{ width: `${progressPercentage}%` }}
            />
          </div>
        </div>
        
        <div className={`quiz-slide-wrapper ${isTransitioning ? 'slide-out' : 'slide-in'}`}>
          <div className="quiz-body">
            <p className="quiz-question-main">{currentQuestion.question}</p>

            <div className="quiz-grid-options">
              {currentQuestion.options.map((option, idx) => {
                let optionClass = "quiz-pill-option";
                
                if (selectedOption !== null && option === correctOption && !isCorrect) {
                  optionClass += " pill-reveal-correct";
                } else if (selectedOption === option) {
                  if (isCorrect) optionClass += " pill-correct";
                  else optionClass += " pill-incorrect";
                } else if (selectedOption !== null) {
                  optionClass += " pill-muted";
                }

                return (
                  <button 
                    key={idx} 
                    className={optionClass}
                    onClick={() => handleOptionSelect(option)}
                    disabled={selectedOption !== null || isTransitioning}
                  >
                    <span className="option-index">{String.fromCharCode(65 + idx)}</span>
                    <span className="option-label">{option}</span>
                  </button>
                );
              })}
            </div>
          </div>

          <div className="quiz-footer-context">
            {showHint && currentQuestion.hint && (
              <div className="quiz-ctx-box hint-style fade-in">
                <span className="ctx-icon">💡</span>
                <p>{currentQuestion.hint}</p>
              </div>
            )}
            
            {isCorrect && currentQuestion.explanation && (
              <div className="quiz-ctx-box insight-style fade-in">
                <span className="ctx-icon">✨</span>
                <p>{currentQuestion.explanation}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
