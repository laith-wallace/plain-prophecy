import { GoogleGenAI } from "@google/genai";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const { accentColor, format } = await request.json();

  if (!process.env.GEMINI_API_KEY) {
    return NextResponse.json({ error: "No API key configured" }, { status: 503 });
  }

  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
  const orientationHint = format === "portrait" ? "portrait orientation, tall" : "square format";
  const lightColor = accentColor || "golden";

  const prompt = `Dark cinematic background for a scripture card, ${orientationHint}. Deep dark charcoal base. Subtle warm ${lightColor} light rays from upper right corner. Soft atmospheric bokeh particles. Minimal, elegant, spiritual mood. Absolutely no text, letters, numbers or words anywhere in the image.`;

  const response = await ai.models.generateContent({
    model: "gemini-3.1-flash-image-preview",
    contents: [{ role: "user", parts: [{ text: prompt }] }],
    config: { responseModalities: ["IMAGE"] },
  });

  for (const part of response.candidates?.[0]?.content?.parts ?? []) {
    if (part.inlineData?.data) {
      return NextResponse.json({
        backgroundB64: part.inlineData.data,
        mimeType: part.inlineData.mimeType ?? "image/jpeg",
      });
    }
  }

  return NextResponse.json({ error: "No image in response" }, { status: 500 });
}
