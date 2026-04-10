import { useState, useEffect, useCallback } from 'react'

const BASE_URL = 'https://quotes-api12.p.rapidapi.com'

const HEADERS = {
  'Content-Type': 'application/json',
  'x-rapidapi-key': import.meta.env.VITE_RAPIDAPI_KEY,
  'x-rapidapi-host': 'quotes-api12.p.rapidapi.com',
}

function normalizeQuote(data) {
  // Random endpoint returns: { quote, author }
  // By-character endpoint returns: { data: [{ quote, author }], ... }
  const item = Array.isArray(data?.data)
    ? data.data[Math.floor(Math.random() * data.data.length)]
    : data
  if (!item) return null
  return {
    text: item.quote || '',
    character: item.author || '',
    anime: '',
  }
}

export function useAnimeQuote() {
  const [quote, setQuote] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function fetchQuote(path) {
    setLoading(true)
    setError(null)
    try {
      const res = await fetch(`${BASE_URL}${path}`, { headers: HEADERS })
      const data = await res.json()
      if (!res.ok) {
        throw new Error(data?.message || `No results found (${res.status})`)
      }
      const normalized = normalizeQuote(data)
      if (!normalized || !normalized.text) throw new Error('No quote found for that character')
      setQuote(normalized)
    } catch (err) {
      setError(err.message || 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  const fetchRandom = useCallback(() => fetchQuote('/quotes/anime'), [])

  const fetchByCharacter = useCallback((name) => {
    fetchQuote(`/quotes/author/anime/${encodeURIComponent(name.trim())}?page=1&limit=10`)
  }, [])

  useEffect(() => {
    fetchRandom()
  }, [])

  return { quote, loading, error, fetchRandom, fetchByCharacter }
}
