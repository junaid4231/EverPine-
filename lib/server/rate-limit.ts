import 'server-only'

/**
 * Best-effort sliding-window limiter (per server instance). On serverless it
 * resets on cold starts; together with the honeypot and timing check it stops
 * casual abuse. For stronger guarantees, swap in Vercel KV / Upstash.
 */
const hits = new Map<string, number[]>()
const WINDOW_MS = 10 * 60 * 1000
const LIMIT = 5

export function rateLimited(key: string): boolean {
  const now = Date.now()
  const recent = (hits.get(key) ?? []).filter((t) => now - t < WINDOW_MS)
  if (recent.length >= LIMIT) {
    hits.set(key, recent)
    return true
  }
  recent.push(now)
  hits.set(key, recent)
  if (hits.size > 5000) {
    for (const [k, v] of hits) if (!v.some((t) => now - t < WINDOW_MS)) hits.delete(k)
  }
  return false
}
