# kenn.dev — Cinematic Developer Portfolio

A premium, single-page developer portfolio with a dark cinematic UI, glassmorphism, particle field, custom cursor, scroll-driven reveals, and a dark/light theme toggle. Built with vanilla **HTML + CSS + JavaScript** — no build step required.

![status](https://img.shields.io/badge/status-live-22c55e?style=flat-square)
![stack](https://img.shields.io/badge/stack-HTML%20%C2%B7%20CSS%20%C2%B7%20JS-6366f1?style=flat-square)
![license](https://img.shields.io/badge/license-MIT-8b5cf6?style=flat-square)

---

## Highlights

- Cinematic loader with progress bar and percentage counter
- Custom dot + ring cursor with mix-blend-difference and ambient mouse-follow glow
- Live particle canvas with proximity line-networking and cursor interaction
- Animated headline reveal, typewriter intro, and gradient text
- Glassmorphic floating cards, 3D-tilt portrait with orbiting rings
- Animated skill bars, SVG circular progress, counting metrics
- Project showcase with CSS-only mockup previews and hover overlays
- Alternating-side experience timeline with a gradient scroll-fill
- Dark / light theme toggle (persisted to `localStorage`)
- Smooth anchor scrolling, scroll-progress bar, sticky condensing nav
- Fully responsive (mobile / tablet / desktop) and respects `prefers-reduced-motion`

## Tech

| Layer | Tools |
| --- | --- |
| Markup | Semantic HTML5 |
| Styles | Modern CSS — custom properties, `backdrop-filter`, `mask`, container-aware layout |
| Motion | Vanilla JS, `IntersectionObserver`, `requestAnimationFrame`, Canvas 2D |
| Fonts | Space Grotesk · Inter · JetBrains Mono (Google Fonts) |

## Run locally

```bash
git clone https://github.com/<your-username>/portfolio.git
cd portfolio
# open index.html in your browser, or serve it:
npx serve .
# or
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Structure

```
portfolio/
├── index.html      # Markup + section content
├── styles.css      # Design tokens, layout, glassmorphism, motion
├── script.js       # Loader, cursor, particles, reveals, theme, form
└── README.md
```

## Customize

- **Name, copy, projects** — edit `index.html` directly
- **Color palette** — change `--accent-1/2/3/4` at the top of `styles.css`
- **Typewriter phrases** — edit the `phrases` array in `script.js`

## Deploy

Drop the folder onto **Vercel**, **Netlify**, **Cloudflare Pages**, or enable **GitHub Pages** in your repo settings (Source → `main` / root).

## License

MIT — feel free to fork and make it yours.
