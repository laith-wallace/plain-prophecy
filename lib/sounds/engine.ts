import { SOUND_DEFS, type SoundId } from "./definitions";

let ctx: AudioContext | null = null;
let masterGain: GainNode | null = null;

function getContext(): AudioContext {
  if (!ctx) {
    ctx = new AudioContext();
    masterGain = ctx.createGain();
    masterGain.connect(ctx.destination);
  }
  if (ctx.state === "suspended") {
    ctx.resume();
  }
  return ctx;
}

function getMasterGain(): GainNode {
  getContext();
  return masterGain!;
}

export function setMasterVolume(enabled: boolean): void {
  const gain = getMasterGain();
  gain.gain.value = enabled ? 1 : 0;
}

export function play(soundId: SoundId): void {
  const def = SOUND_DEFS[soundId];
  if (!def) return;

  const audioCtx = getContext();
  const master = getMasterGain();
  const now = audioCtx.currentTime;

  // Play tones
  if (def.tones) {
    let offset = 0;
    for (const tone of def.tones) {
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = tone.type;
      osc.frequency.setValueAtTime(tone.freq, now + offset);
      if (tone.endFreq) {
        osc.frequency.linearRampToValueAtTime(
          tone.endFreq,
          now + offset + tone.duration,
        );
      }

      // Envelope
      const attack = tone.attack ?? 0.005;
      gain.gain.setValueAtTime(0, now + offset);
      gain.gain.linearRampToValueAtTime(tone.gain, now + offset + attack);
      gain.gain.linearRampToValueAtTime(
        0,
        now + offset + (tone.decay ? attack + tone.decay : tone.duration),
      );

      osc.connect(gain);
      gain.connect(master);
      osc.start(now + offset);
      osc.stop(now + offset + tone.duration + 0.01);

      offset += tone.duration * 0.85; // slight overlap for arpeggio feel
    }
  }

  // Play noise
  if (def.noise) {
    const { duration, gain: noiseGain, filterType, filterFreq, filterQ } = def.noise;
    const bufferSize = Math.ceil(audioCtx.sampleRate * duration);
    const buffer = audioCtx.createBuffer(1, bufferSize, audioCtx.sampleRate);
    const data = buffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      data[i] = Math.random() * 2 - 1;
    }

    const source = audioCtx.createBufferSource();
    source.buffer = buffer;

    const filter = audioCtx.createBiquadFilter();
    filter.type = filterType;
    filter.frequency.value = filterFreq;
    if (filterQ) filter.Q.value = filterQ;

    const gain = audioCtx.createGain();
    gain.gain.setValueAtTime(noiseGain, now);
    gain.gain.linearRampToValueAtTime(0, now + duration);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(master);
    source.start(now + (def.delay ?? 0));
    source.stop(now + (def.delay ?? 0) + duration + 0.01);
  }
}
