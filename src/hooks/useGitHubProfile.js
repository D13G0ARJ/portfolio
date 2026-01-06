import { useEffect, useMemo, useState } from 'react'

const CACHE_KEY_PREFIX = 'gh_profile:'
const DEFAULT_TTL_MS = 60 * 60 * 1000 // 1h

function safeReadCache(key) {
  try {
    const raw = sessionStorage.getItem(key)
    if (!raw) return null
    const parsed = JSON.parse(raw)
    if (!parsed || typeof parsed !== 'object') return null
    return parsed
  } catch {
    return null
  }
}

function safeWriteCache(key, value) {
  try {
    sessionStorage.setItem(key, JSON.stringify(value))
  } catch {
    // ignore
  }
}

export function useGitHubProfile({ username = 'D13G0ARJ', ttlMs = DEFAULT_TTL_MS } = {}) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [profile, setProfile] = useState(null)

  const cacheKey = useMemo(() => `${CACHE_KEY_PREFIX}${username}`, [username])

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      const cached = safeReadCache(cacheKey)
      const now = Date.now()
      if (cached?.data && typeof cached.ts === 'number' && now - cached.ts < ttlMs) {
        setProfile(cached.data)
        setLoading(false)
        return
      }

      try {
        const url = `https://api.github.com/users/${username}`
        const res = await fetch(url, {
          headers: {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
          },
        })

        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)

        const data = await res.json()
        if (cancelled) return

        setProfile(data)
        safeWriteCache(cacheKey, { ts: now, data })
      } catch (e) {
        if (!cancelled) setError(e)
      } finally {
        if (!cancelled) setLoading(false)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [cacheKey, ttlMs, username])

  return { profile, loading, error }
}
