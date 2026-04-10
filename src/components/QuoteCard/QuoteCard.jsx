import './QuoteCard.css'

export default function QuoteCard({ quote, loading, error, onNewQuote }) {
  return (
    <div className="quote-card">
      <div className="quote-card__top-border" />

      <div className="quote-card__body">
        {loading && (
          <div className="quote-card__loading">
            <span className="quote-card__spinner" />
            <span>Summoning wisdom...</span>
          </div>
        )}

        {!loading && error && (
          <div className="quote-card__error">
            <span className="quote-card__error-icon">✦</span>
            <p>{error}</p>
          </div>
        )}

        {!loading && !error && quote && (
          <div className="quote-card__content" key={quote.text}>
            <p className="quote-card__text">
              <span className="quote-card__mark quote-card__mark--open">&ldquo;</span>
              {quote.text}
              <span className="quote-card__mark quote-card__mark--close">&rdquo;</span>
            </p>
          </div>
        )}
      </div>

      <div className="quote-card__bottom-border" />

      <div className="quote-card__meta">
        {!loading && !error && quote && (
          <>
            <span className="quote-card__character">{quote.character || '—'}</span>
            {quote.anime && <span className="quote-card__anime">{quote.anime}</span>}
          </>
        )}
      </div>

      <div className="quote-card__bottom-border" />

      <div className="quote-card__footer">
        <button
          className="quote-card__btn"
          onClick={onNewQuote}
          disabled={loading}
        >
          ✦ New Quote ✦
        </button>
      </div>
    </div>
  )
}
