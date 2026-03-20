import { expandRef } from "./expandRef"

export interface VerseResult {
  text: string
  reference: string
  /** true when a comma-separated ref was truncated to the first verse */
  truncated?: boolean
}

// Module-level cache: persists for the session, shared across all ScriptureRef
// instances. Keyed by the lowercased raw reference string.
const cache = new Map<string, VerseResult>()

/**
 * Fetch verse text from bible-api.com (WEB translation, no API key required).
 * Results are cached in memory — subsequent calls for the same reference are
 * instantaneous and make no network request.
 */
export async function fetchVerse(raw: string): Promise<VerseResult> {
  const key = raw.trim().toLowerCase()

  if (cache.has(key)) return cache.get(key)!

  // Note whether the raw ref contained comma-separated verses (we only fetch
  // the first one, so we flag it for display in the popover).
  const truncated = raw.includes(",")

  const query = expandRef(raw)
  const res = await fetch(`https://bible-api.com/${query}?translation=web`)

  if (!res.ok) {
    throw new Error(`Verse not found: ${raw}`)
  }

  const data = await res.json()
  const result: VerseResult = {
    text: (data.text as string).trim(),
    reference: data.reference as string,
    truncated,
  }

  cache.set(key, result)
  return result
}
