# Biscuit — Personal Bio Site

A single-page, highly animated personal bio site with a light/dark theme toggle, a full-screen looping
background video, a glassmorphism profile card, and a set of animated social/community link cards.

## Tech

Plain HTML, CSS, and vanilla JavaScript — no build step, no framework. This keeps the heavily custom
animation and layout work (glass card, glowing avatar ring, theme-flash transition) simple and fast to load.

- **Fonts**: [Lilita One](https://fonts.google.com/specimen/Lilita+One) for the decorated name treatment,
  [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) for body text, loaded from Google Fonts.
- **Images**: served through [Netlify Image CDN](https://docs.netlify.com/image-cdn/overview/)
  (`/.netlify/images?...`) so they're resized/cropped and re-encoded to WebP on the fly.
- **Theme toggle**: persisted in `localStorage`, defaults to the visitor's OS preference on first visit,
  falls back to light mode.

## Local files this site expects

The page is wired to these exact root-level file paths:

| Path | Purpose |
|---|---|
| `video.mp4` | Full-screen looping background video |
| `avatar.png` | Circular profile picture |
| `alpha.png` | ALPHA MC Discord server icon |
| `kartona.png` | Kartona Discord server icon |

`avatar.png`, `alpha.png`, and `kartona.png` were generated with an AI image model as placeholder art.
`video.mp4` was not provided — if the file is missing, `script.js` detects the failed video load and swaps
in an animated gradient background automatically, so the site still looks intentional without it. Drop a
real `video.mp4` in the project root to enable the video background.

## Running locally

This is a static site, so any static file server works:

```bash
npx serve .
```

Or, with the Netlify CLI (also emulates Image CDN):

```bash
netlify dev
```

Then open the printed local URL in a browser.
