# Balasevic — Digitalni Spomenar

> Čuvaj mi se, svete... Jedan od onih što uvek nose mrvu ravnice u džepu.

Produkcijski spomenar posvećen Đorđu Balaševiću. Fokus na performansama, pristupačnosti i čistom, održivom kodu.

## Stack

- **HTML5** — semantička struktura, JSON-LD, Open Graph
- **CSS** — CSS custom properties, modern layout (Grid/Flexbox), print styles, reduced-motion
- **Vanilla JS (ES2020)** — IntersectionObserver scroll reveal, mobilni meni, scroll progress

## Struktura

```
├── index.html           # Glavna stranica
├── 404.html             # Custom 404
├── style.css            # Core styles
├── main.js              # Navigacija + animacije
├── package.json         # Skripte i dev tools
├── robots.txt           # SEO crawler pravila
├── sitemap.xml          # XML sitemap
├── .gitignore
├── assets/
│   └── favicon.svg      # Inline SVG favicon
└── README.md
```

## Brzi start

```bash
# Dev server (port 3000)
npm run dev

# Minifikuj za produkciju
npm run build

# Validiraj HTML
npm run validate

# Pristupačnost (axe-core)
npm run a11y
```

## Performanse

- **LCP** — optimizovani Unsplash linkovi (`q=80&w=...`), `loading="lazy"` na pod-sekcijama, `fetchpriority="high"` na hero pozadini
- **CLS** — eksplicitne dimenzije na slikama (`width`/`height`)
- **JS** — nema dependencies, vanilla IntersectionObserver umesto scroll event listener-a; `defer` za inline script tagove
- **CSS** — CSS varijable za theming, bez redundantnih pravila; `prefers-reduced-motion` media query

## Pristupačnost

- Semantički HTML (`<header>`, `<main>`, `<section>`, `<blockquote>`, `<cite>`)
- ARIA atributi na navigaciji (`aria-expanded`, `aria-controls`, `aria-label`)
- Skip link za tastaturu
- `focus-visible` outline
- Print stylesheet
- JSON-LD structured data (schema.org/Person)

## Hosting

Predlog: **Netlify** ili **Vercel**. Dodaj `.env` fajl za API ključeve ako bude potrebno. Za Netlify, koristi `netlify.toml`:

```toml
[build]
  command = "npm run build"
  publish = "."

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Licenca

Privatni projekat. Sva autorska prava vezana za Đorđu Balaševića ostaju vlasništvo njegovog nasledstva.
