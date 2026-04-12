// Procedural sound definitions — no audio files needed.
// Each sound is generated via Web Audio API oscillators + noise.

export type SoundId =
  | "swipe-threshold"
  | "swipe-commit"
  | "card-flyoff"
  | "reveal-open"
  | "completion"
  | "trophy-unlock"
  | "vm-reveal"
  | "vm-easy"
  | "vm-again"
  | "wq-match"
  | "wq-wrong"
  | "xp-toast"
  | "click";

export interface ToneParams {
  type: OscillatorType;
  freq: number;
  endFreq?: number;
  duration: number; // seconds
  gain: number;
  attack?: number;
  decay?: number;
}

export interface NoiseParams {
  duration: number;
  gain: number;
  filterType: BiquadFilterType;
  filterFreq: number;
  filterQ?: number;
}

export interface SoundDef {
  tones?: ToneParams[];
  noise?: NoiseParams;
  delay?: number; // start offset in seconds
}

export const SOUND_DEFS: Record<SoundId, SoundDef> = {
  "swipe-threshold": {
    tones: [
      { type: "sine", freq: 440, endFreq: 660, duration: 0.08, gain: 0.12 },
    ],
  },
  "swipe-commit": {
    noise: {
      duration: 0.06,
      gain: 0.1,
      filterType: "bandpass",
      filterFreq: 2000,
      filterQ: 2,
    },
  },
  "card-flyoff": {
    noise: {
      duration: 0.2,
      gain: 0.08,
      filterType: "highpass",
      filterFreq: 1200,
    },
  },
  "reveal-open": {
    tones: [
      {
        type: "triangle",
        freq: 110,
        duration: 0.4,
        gain: 0.08,
        attack: 0.15,
        decay: 0.25,
      },
    ],
  },
  completion: {
    tones: [
      { type: "sine", freq: 523, duration: 0.12, gain: 0.1 },
      { type: "sine", freq: 659, duration: 0.12, gain: 0.1 },
      { type: "sine", freq: 784, duration: 0.12, gain: 0.1 },
      { type: "sine", freq: 1047, duration: 0.18, gain: 0.12 },
    ],
  },
  "trophy-unlock": {
    tones: [
      { type: "sine", freq: 587, duration: 0.15, gain: 0.12 },
      { type: "sine", freq: 740, duration: 0.15, gain: 0.12 },
      { type: "sine", freq: 880, duration: 0.25, gain: 0.14 },
    ],
  },
  "vm-reveal": {
    noise: {
      duration: 0.1,
      gain: 0.06,
      filterType: "bandpass",
      filterFreq: 3000,
      filterQ: 1,
    },
  },
  "vm-easy": {
    tones: [
      { type: "sine", freq: 880, endFreq: 1320, duration: 0.1, gain: 0.1 },
    ],
  },
  "vm-again": {
    tones: [
      { type: "triangle", freq: 220, duration: 0.12, gain: 0.06 },
    ],
  },
  "wq-match": {
    tones: [
      { type: "sine", freq: 660, endFreq: 880, duration: 0.1, gain: 0.1 },
    ],
  },
  "wq-wrong": {
    tones: [
      { type: "square", freq: 180, duration: 0.08, gain: 0.04 },
    ],
  },
  "xp-toast": {
    tones: [
      { type: "sine", freq: 660, duration: 0.06, gain: 0.08 },
      { type: "sine", freq: 880, duration: 0.08, gain: 0.1 },
    ],
  },
  click: {
    noise: {
      duration: 0.04,
      gain: 0.05,
      filterType: "highpass",
      filterFreq: 4000,
    },
  },
};
