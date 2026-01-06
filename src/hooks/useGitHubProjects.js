import { useEffect, useMemo, useState } from 'react'

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0
}

export function useGitHubProjects({
  username = 'D13G0ARJ',
  excludeUrls = [],
  forceIncludeNames = [],
} = {}) {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [repos, setRepos] = useState([])

  const excludeKey = Array.isArray(excludeUrls) ? excludeUrls.filter(Boolean).join('|') : ''
  const forceIncludeKey = Array.isArray(forceIncludeNames)
    ? forceIncludeNames.filter(Boolean).map((n) => String(n).toLowerCase()).sort().join('|')
    : ''

  const excludeSet = useMemo(() => new Set((Array.isArray(excludeUrls) ? excludeUrls : []).filter(Boolean)), [excludeKey])
  const forceIncludeSet = useMemo(() => {
    return new Set(
      (Array.isArray(forceIncludeNames) ? forceIncludeNames : [])
        .filter(Boolean)
        .map((n) => String(n).toLowerCase()),
    )
  }, [forceIncludeKey])

  useEffect(() => {
    let cancelled = false

    async function load() {
      setLoading(true)
      setError(null)

      try {
        const url = `https://api.github.com/users/${username}/repos?per_page=100&sort=updated&direction=desc`
        const res = await fetch(url, {
          headers: {
            Accept: 'application/vnd.github+json',
            'X-GitHub-Api-Version': '2022-11-28',
          },
        })

        if (!res.ok) throw new Error(`GitHub API error: ${res.status}`)

        const data = await res.json()
        if (cancelled) return

        const list = Array.isArray(data) ? data : []

        const filtered = list
          .filter((r) => {
            if (!r) return false

            const isForced = forceIncludeSet.has(String(r.name || '').toLowerCase())

            // Exclude repos already featured
            if (r.html_url && excludeSet.has(r.html_url)) return false

            // Exclude empty descriptions
            if (!isForced && !isNonEmptyString(r.description)) return false

            // Exclude forks unless they have > 2 stars
            if (!isForced && r.fork && (r.stargazers_count || 0) <= 2) return false

            return true
          })
          .sort((a, b) => {
            const aUpdated = new Date(a.updated_at || 0).getTime()
            const bUpdated = new Date(b.updated_at || 0).getTime()
            return bUpdated - aUpdated
          })

        setRepos(filtered)
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
  }, [username, excludeSet, forceIncludeSet])

  return { repos, loading, error }
}
