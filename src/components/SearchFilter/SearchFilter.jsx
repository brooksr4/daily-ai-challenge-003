import { useState } from 'react'
import './SearchFilter.css'

export default function SearchFilter({ onSearchCharacter, onRandom, loading }) {
  const [query, setQuery] = useState('')

  function handleSubmit(e) {
    e.preventDefault()
    if (!query.trim()) return
    onSearchCharacter(query)
  }

  function handleClear() {
    setQuery('')
    onRandom()
  }

  return (
    <div className="search-filter">
      <form className="search-filter__form" onSubmit={handleSubmit}>
        <input
          className="search-filter__input"
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search by character, e.g. Goku, Levi, Edward Elric..."
          disabled={loading}
        />
        <button
          type="submit"
          className="search-filter__btn search-filter__btn--search"
          disabled={loading || !query.trim()}
        >
          Search
        </button>
        {query && (
          <button
            type="button"
            className="search-filter__btn search-filter__btn--clear"
            onClick={handleClear}
            disabled={loading}
          >
            ✕
          </button>
        )}
      </form>
    </div>
  )
}
