'use client';

import { useQuery, useMutation } from "convex/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { api } from "@/convex/_generated/api";
import Image from "next/image";
import Link from "next/link";
import {
  User,
  Sparkles,
  RefreshCw,
  ChevronLeft,
  BookOpen,
  Target,
  Brain,
  Landmark,
  Flag,
  Camera,
} from "lucide-react";
import { useRef } from "react";

const motivationLabels: Record<string, string> = {
  curiosity: "Curiosity",
  concern: "Concern",
  conviction: "Conviction",
  scholarly: "Scholarly interest",
};
const foundationLabels: Record<string, string> = {
  new: "Just beginning to explore",
  familiar: "I know the main stories",
  deeply_rooted: "His life is my daily foundation",
};
const methodologyLabels: Record<string, string> = {
  big_picture: "The Big Picture",
  evidence: "The Evidence",
  application: "The Application",
};
const backgroundLabels: Record<string, string> = {
  rapture: "Secret Rapture / 7-Year Tribulation",
  historicism: "Reformation / Historicism / 1260 Days",
  neither: "I haven't heard much about either",
};
const goalLabels: Record<string, string> = {
  clarity: "Clarity — understand Revelation",
  certainty: "Certainty — firm faith foundation",
  change: "Change — become more like Christ",
};

const levelLabels: Record<string, string> = {
  beginner: "Seeker — Level 1",
  intermediate: "Student — Level 2",
  advanced: "Scholar — Level 3",
};

export default function ProfileSettingsPage() {
  const router = useRouter();
  const user = useQuery(api.users.viewer);
  const resetOnboarding = useMutation(api.profile.resetOnboarding);
  const updateProfileImage = useMutation(api.profile.updateProfileImage);
  const generateUploadUrl = useMutation(api.files.generateUploadUrl);
  const resolveStorageUrl = useMutation(api.files.resolveStorageUrl);
  const [resetting, setResetting] = useState(false);
  const [uploadingAvatar, setUploadingAvatar] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleAvatarChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingAvatar(true);
    try {
      const uploadUrl = await generateUploadUrl();
      const res = await fetch(uploadUrl, {
        method: "POST",
        headers: { "Content-Type": file.type },
        body: file,
      });
      const { storageId } = await res.json();
      const imageUrl = await resolveStorageUrl({ storageId });
      if (imageUrl) await updateProfileImage({ image: imageUrl });
    } finally {
      setUploadingAvatar(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleRedoOnboarding = async () => {
    setResetting(true);
    await resetOnboarding();
    router.push("/profile");
  };

  if (user === undefined) {
    return (
      <div
        className="flex items-center justify-center min-h-dvh"
        style={{ background: "#0c0a09", color: "rgba(255,255,255,0.5)" }}
      >
        <div className="text-sm font-mono">Loading...</div>
      </div>
    );
  }

  if (user === null) {
    router.push("/login");
    return null;
  }

  const answers = user.onboardingAnswers as Record<string, string> | undefined;
  const initial = user.name?.[0] || user.email?.[0] || "S";

  return (
    <div
      className="min-h-dvh px-4 py-8 md:px-8 md:py-10"
      style={{ background: "#0c0a09", color: "#fff" }}
    >
      <div className="max-w-2xl mx-auto space-y-6">

        {/* Back nav */}
        <Link
          href="/profile"
          className="inline-flex items-center gap-1.5 text-xs font-mono uppercase tracking-widest transition-opacity hover:opacity-70"
          style={{ color: "rgba(255,255,255,0.4)" }}
        >
          <ChevronLeft size={14} /> Back to Overview
        </Link>

        {/* Page heading */}
        <div>
          <p
            className="text-xs uppercase tracking-widest font-mono mb-1"
            style={{ color: "#e8a020" }}
          >
            Account
          </p>
          <h1 className="text-2xl font-bold">Profile Settings</h1>
        </div>

        {/* User identity card */}
        <section
          className="rounded-2xl p-5 flex gap-4 items-start"
          style={{
            background: "#1c1917",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <button
            onClick={() => fileInputRef.current?.click()}
            disabled={uploadingAvatar}
            className="relative w-14 h-14 rounded-full flex items-center justify-center text-lg font-bold flex-shrink-0 overflow-hidden group"
            style={{ background: "#e8a020", color: "#0c0a09" }}
            title="Change profile photo"
          >
            {user.image ? (
              <Image
                src={user.image}
                alt={user.name || "Profile"}
                width={56}
                height={56}
                style={{ objectFit: "cover" }}
              />
            ) : (
              initial.toUpperCase()
            )}
            <div
              className="absolute inset-0 flex items-center justify-center rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              style={{ background: "rgba(0,0,0,0.55)" }}
            >
              {uploadingAvatar ? (
                <RefreshCw size={16} color="#fff" className="animate-spin" />
              ) : (
                <Camera size={16} color="#fff" />
              )}
            </div>
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleAvatarChange}
          />
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-white truncate">{user.name || "—"}</p>
            <p className="text-sm mt-0.5 truncate" style={{ color: "rgba(255,255,255,0.4)" }}>
              {user.email || "—"}
            </p>
            {user.spiritualLevel && (
              <span
                className="inline-block mt-2 px-2.5 py-0.5 rounded-full text-xs font-mono uppercase tracking-widest"
                style={{
                  background: "rgba(232,160,32,0.12)",
                  border: "1px solid rgba(232,160,32,0.25)",
                  color: "#e8a020",
                }}
              >
                {levelLabels[user.spiritualLevel] || user.spiritualLevel}
              </span>
            )}
          </div>
        </section>

        {/* Interests */}
        {user.interests && user.interests.length > 0 && (
          <section
            className="rounded-2xl p-5"
            style={{
              background: "#1c1917",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-center gap-2 mb-3">
              <User size={15} style={{ color: "#e8a020" }} />
              <h2 className="text-sm font-semibold">Your Interests</h2>
            </div>
            <div className="flex flex-wrap gap-2">
              {(user.interests as string[]).map((interest) => (
                <span
                  key={interest}
                  className="px-3 py-1 rounded-full text-xs capitalize"
                  style={{
                    background: "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                    color: "rgba(255,255,255,0.7)",
                  }}
                >
                  {interest.replace(/_/g, " ")}
                </span>
              ))}
            </div>
          </section>
        )}

        {/* Survey answers summary */}
        {answers && Object.keys(answers).length > 0 && (
          <section
            className="rounded-2xl p-5"
            style={{
              background: "#1c1917",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div className="flex items-center gap-2 mb-4">
              <Brain size={15} style={{ color: "#e8a020" }} />
              <h2 className="text-sm font-semibold">Your Onboarding Profile</h2>
            </div>
            <div className="space-y-3">
              {answers.motivation && (
                <div className="flex items-start gap-3">
                  <Sparkles size={13} className="mt-0.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)" }} />
                  <div>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Motivation</p>
                    <p className="text-sm text-white">{motivationLabels[answers.motivation] || answers.motivation}</p>
                  </div>
                </div>
              )}
              {answers.foundation && (
                <div className="flex items-start gap-3">
                  <BookOpen size={13} className="mt-0.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)" }} />
                  <div>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Foundation</p>
                    <p className="text-sm text-white">{foundationLabels[answers.foundation] || answers.foundation}</p>
                  </div>
                </div>
              )}
              {answers.methodology && (
                <div className="flex items-start gap-3">
                  <Brain size={13} className="mt-0.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)" }} />
                  <div>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Study Style</p>
                    <p className="text-sm text-white">{methodologyLabels[answers.methodology] || answers.methodology}</p>
                  </div>
                </div>
              )}
              {answers.background && (
                <div className="flex items-start gap-3">
                  <Landmark size={13} className="mt-0.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)" }} />
                  <div>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Background</p>
                    <p className="text-sm text-white">{backgroundLabels[answers.background] || answers.background}</p>
                  </div>
                </div>
              )}
              {answers.goal && (
                <div className="flex items-start gap-3">
                  <Flag size={13} className="mt-0.5 flex-shrink-0" style={{ color: "rgba(255,255,255,0.3)" }} />
                  <div>
                    <p className="text-xs" style={{ color: "rgba(255,255,255,0.35)" }}>Goal</p>
                    <p className="text-sm text-white">{goalLabels[answers.goal] || answers.goal}</p>
                  </div>
                </div>
              )}
            </div>
          </section>
        )}

        {/* Redo onboarding */}
        <section
          className="rounded-2xl p-5"
          style={{
            background: "#1c1917",
            border: "1px solid rgba(255,255,255,0.07)",
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0"
              style={{ background: "rgba(232,160,32,0.12)", color: "#e8a020" }}
            >
              <Target size={16} />
            </div>
            <div className="flex-1">
              <h2 className="text-sm font-semibold text-white">Personalise My Path</h2>
              <p className="text-xs mt-1 leading-relaxed" style={{ color: "rgba(255,255,255,0.45)" }}>
                Retake the onboarding survey to update your study recommendations and recalibrate your level.
              </p>
            </div>
          </div>
          <button
            onClick={handleRedoOnboarding}
            disabled={resetting}
            className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-semibold transition-all"
            style={{
              background: resetting ? "rgba(232,160,32,0.3)" : "#e8a020",
              color: "#0c0a09",
              cursor: resetting ? "not-allowed" : "pointer",
            }}
          >
            <RefreshCw size={14} className={resetting ? "animate-spin" : ""} />
            {resetting ? "Resetting..." : "Redo Onboarding"}
          </button>
        </section>

      </div>
    </div>
  );
}
