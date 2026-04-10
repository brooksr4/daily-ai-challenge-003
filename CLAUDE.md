# 003 - Anime Quote Generator

Part of the **Daily AI Challenge** series. Day 003 learns how to set up API calls — fetching random anime quotes from a RapidAPI endpoint, with character-based search.

## Tech Stack

- **Vite + React 19** — same scaffold as challenge 002
- **Plain CSS** — component-scoped `.css` files, no UI library
- **RapidAPI (`quotes-api12`)** — anime quotes, requires `VITE_RAPIDAPI_KEY`
- No backend, no localStorage — purely stateless fetch-on-demand

## API

- **Provider**: `quotes-api12` on RapidAPI (subscribed under the existing RapidAPI key)
- **Host**: `quotes-api12.p.rapidapi.com`
- **Key**: stored in `.env.local` as `VITE_RAPIDAPI_KEY` (gitignored) and as a Netlify env var in production

### Endpoints

| Purpose | Method | Path |
|---------|--------|------|
| Random quote | GET | `/quotes/anime` |
| List anime characters | GET | `/author/anime?page=1&limit=10` |
| Quotes by character | GET | `/quotes/author/anime/{name}?page=1&limit=10` |

### Response shapes

```js
// GET /quotes/anime
{ quote: string, author: string }

// GET /quotes/author/anime/{name}
{ data: [{ quote: string, author: string }], totalItems, totalPages, currentPage, ... }
```

**Note:** No anime title field exists in any response — only `quote` + `author` (character name). There is no "filter by anime title" endpoint.

### APIs tried and rejected

- `anime-quotes5` (RapidAPI) — only `/anime-list` endpoint worked; all quote endpoints returned 404
- `animechan.io` — rate limit of 5 req/hour was too restrictive

## Project Structure

```
003-anime-quote-generator/
├── CLAUDE.md                        # This file
├── README.md
├── netlify.toml                     # Build command + SPA redirect
├── .env.local                       # VITE_RAPIDAPI_KEY (gitignored)
├── index.html                       # Loads Google Fonts (Cinzel, Lato)
├── package.json
├── vite.config.js
└── src/
    ├── main.jsx
    ├── App.jsx                      # Root — no state, just wires hook to components
    ├── App.css
    ├── index.css                    # Global CSS custom properties + dark theme
    ├── hooks/
    │   └── useAnimeQuote.js         # All fetch logic: fetchRandom, fetchByCharacter
    └── components/
        ├── QuoteCard/               # Displays quote text + character attribution
        └── SearchFilter/            # Character search input + clear button
```

## Key Architecture Decisions

- **All API logic in `useAnimeQuote.js`** — components are purely presentational. `App.jsx` holds no state; it destructures the hook and passes values down.
- **`normalizeQuote()`** handles both response shapes (single object vs. paginated array) and maps them to `{ text, character, anime }`.
- **Random pick from paginated results** — `fetchByCharacter` fetches up to 10 quotes and picks one at random so repeated searches feel varied.
- **No UI library** — handwritten CSS with CSS custom properties for the dark anime-themed palette (navy bg, purple/pink gradient accents).
- **Fonts**: `Cinzel` (headings) + `Lato` (body) loaded via Google Fonts in `index.html`.

## Development

```bash
npm install
npm run dev       # http://localhost:5173
npm run build     # output to /dist
npm run preview   # preview production build locally
```

**Requires** a `.env.local` file with:
```
VITE_RAPIDAPI_KEY=<your_rapidapi_key>
```

## Deployment

- **GitHub**: https://github.com/brooksr4/daily-ai-challenge-003
- **Live site**: https://daily-ai-challenge-003.netlify.app
- **Netlify env var**: `VITE_RAPIDAPI_KEY` is set via `netlify env:set` (not in git)

To redeploy after changes:
```bash
git add . && git commit -m "your message" && git push
# Netlify auto-deploys on push if CI is configured, otherwise:
netlify deploy --prod
```

## Series Context

| Day | Project | Stack |
|-----|---------|-------|
| 001 | Basic app | Single HTML file |
| 002 | Todo List App | Vite + React + localStorage |
| 003 | Anime Quote Generator (this project) | Vite + React + RapidAPI fetch |
