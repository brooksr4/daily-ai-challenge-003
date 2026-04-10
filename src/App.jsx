import './App.css'
import { useAnimeQuote } from './hooks/useAnimeQuote'
import QuoteCard from './components/QuoteCard/QuoteCard'
import SearchFilter from './components/SearchFilter/SearchFilter'

function App() {
  const { quote, loading, error, fetchRandom, fetchByCharacter } = useAnimeQuote()

  return (
    <div className="app">
      <header className="app__header">
        <h1 className="app__title">✦ Anime Quote Generator ✦</h1>
        <p className="app__subtitle">Words from another world</p>
      </header>

      <SearchFilter
        onSearchCharacter={fetchByCharacter}
        onRandom={fetchRandom}
        loading={loading}
      />

      <QuoteCard
        quote={quote}
        loading={loading}
        error={error}
        onNewQuote={fetchRandom}
      />
    </div>
  )
}

export default App
