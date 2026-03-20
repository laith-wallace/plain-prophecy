export type ShareCardFormat = "square" | "portrait";

async function fetchAIBackground(
  accentColor: string,
  format: ShareCardFormat
): Promise<HTMLImageElement | null> {
  try {
    const res = await fetch("/api/share-card", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ accentColor, format }),
    });
    if (!res.ok) return null;
    const { backgroundB64, mimeType } = await res.json();
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => resolve(img);
      img.onerror = () => resolve(null);
      img.src = `data:${mimeType};base64,${backgroundB64}`;
    });
  } catch {
    return null;
  }
}

export interface ShareCardInput {
  keyVerse: string;
  keyVerseRef: string;
  lessonTitle: string;
  accentColor: string;
  format: ShareCardFormat;
}

function wrapText(
  ctx: CanvasRenderingContext2D,
  text: string,
  maxWidth: number
): string[] {
  const words = text.split(" ");
  const lines: string[] = [];
  let current = "";
  for (const word of words) {
    const test = current ? `${current} ${word}` : word;
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current);
      current = word;
    } else {
      current = test;
    }
  }
  if (current) lines.push(current);
  return lines;
}

export async function generateShareCard(input: ShareCardInput): Promise<Blob> {
  const { keyVerse, keyVerseRef, accentColor, format } = input;

  // Ensure fonts are ready before drawing
  await Promise.all([
    document.fonts.load('700 56px "Playfair Display"'),
    document.fonts.load('500 32px "IBM Plex Mono"'),
    document.fonts.load('400 26px "IBM Plex Sans"'),
  ]);

  const W = 1080;
  const H = format === "portrait" ? 1920 : 1080;
  const PADDING = 96;
  const MAX_TEXT_W = W - PADDING * 2;

  const canvas = document.createElement("canvas");
  canvas.width = W;
  canvas.height = H;
  const ctx = canvas.getContext("2d")!;

  // 1 — Background: AI-generated if available, canvas gradient as fallback
  const aiBg = await fetchAIBackground(accentColor, format);
  if (aiBg) {
    ctx.drawImage(aiBg, 0, 0, W, H);
    // Darken overlay to keep verse text readable over any AI background
    ctx.fillStyle = "rgba(0,0,0,0.35)";
    ctx.fillRect(0, 0, W, H);
  } else {
    // Fallback: original canvas gradient
    ctx.fillStyle = "#0f0e0c";
    ctx.fillRect(0, 0, W, H);
    const grad = ctx.createRadialGradient(W * 0.8, H * 0.15, 0, W * 0.8, H * 0.15, W * 0.7);
    grad.addColorStop(0, accentColor + "44");
    grad.addColorStop(1, "transparent");
    ctx.fillStyle = grad;
    ctx.fillRect(0, 0, W, H);
  }

  // 3 — Top gold rule
  ctx.save();
  ctx.globalAlpha = 0.6;
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(PADDING, 80);
  ctx.lineTo(W - PADDING, 80);
  ctx.stroke();
  ctx.restore();

  // 4 — Large faded opening quote mark
  ctx.save();
  ctx.globalAlpha = 0.07;
  ctx.font = `bold 280px "Playfair Display"`;
  ctx.fillStyle = accentColor;
  ctx.textAlign = "left";
  ctx.fillText("\u275D", PADDING - 16, format === "portrait" ? 520 : 340);
  ctx.restore();

  // 5 — Verse text (two-tier sizing, vertically centred)
  const verseText = `\u201C${keyVerse}\u201D`;
  const centreY = format === "portrait" ? 880 : 480;

  let fontSize = 56;
  ctx.font = `700 ${fontSize}px "Playfair Display"`;
  let lines = wrapText(ctx, verseText, MAX_TEXT_W);

  if (lines.length > 7) {
    fontSize = 48;
    ctx.font = `700 ${fontSize}px "Playfair Display"`;
    lines = wrapText(ctx, verseText, MAX_TEXT_W);
  }

  const lineHeight = Math.round(fontSize * 1.38);
  const totalTextH = lines.length * lineHeight;
  let verseY = centreY - totalTextH / 2 + fontSize;

  ctx.fillStyle = "#ffffff";
  ctx.textAlign = "center";
  for (const line of lines) {
    ctx.fillText(line, W / 2, verseY);
    verseY += lineHeight;
  }

  // Last baseline of verse text
  const lastLineY = verseY - lineHeight;

  // 6 — Thin separator line
  const sepY = lastLineY + 52;
  ctx.save();
  ctx.globalAlpha = 0.4;
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 1;
  const SEP_HALF = 60;
  ctx.beginPath();
  ctx.moveTo(W / 2 - SEP_HALF, sepY);
  ctx.lineTo(W / 2 + SEP_HALF, sepY);
  ctx.stroke();
  ctx.restore();

  // 7 — Scripture reference
  ctx.font = `500 32px "IBM Plex Mono"`;
  ctx.fillStyle = accentColor;
  ctx.textAlign = "center";
  ctx.fillText(`\u2014 ${keyVerseRef}`, W / 2, sepY + 56);

  // 8 — Branding watermark
  ctx.font = `400 26px "IBM Plex Sans"`;
  ctx.fillStyle = "rgba(255,255,255,0.18)";
  ctx.textAlign = "center";
  ctx.fillText("PlainProphecy.com", W / 2, H - 60);

  // 9 — Bottom gold rule
  ctx.save();
  ctx.globalAlpha = 0.6;
  ctx.strokeStyle = accentColor;
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(PADDING, H - 80);
  ctx.lineTo(W - PADDING, H - 80);
  ctx.stroke();
  ctx.restore();

  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Canvas toBlob returned null"));
      },
      "image/png"
    );
  });
}
