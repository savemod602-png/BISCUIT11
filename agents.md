# AGENTS.md

## What this is

A static, single-page personal bio/link-in-bio site ("Biscuit"). No backend, no database, no build step.

## Architecture

- `index.html` — all page markup: theme toggle, background video layer, profile card, bio text, link cards.
- `style.css` — all styling. Theme colors are CSS custom properties on `:root` (light) and
  `html[data-theme="dark"]` (dark). Everything else (glass card, glow ring, entrance/hover animations,
  responsive rules) lives in this one file.
- `script.js` — three small, independent behaviors: theme init/toggle + `localStorage` persistence, the
  theme-switch "flash" transition, and a background-video failure fallback (adds `.no-video` to `<body>`
  so CSS can show an animated gradient instead of a broken video element).
- `netlify.toml` — static publish config (`publish = "."`) plus long-cache headers for the video/image assets.
- Root-level assets (`avatar.png`, `alpha.png`, `kartona.png`, and optionally `video.mp4`) are referenced by
  exact filename at the site root — this mapping was a hard requirement, don't move them into a subfolder
  without updating every reference (`index.html`, and the `/.netlify/images?url=/...` query strings).

## Conventions

- No JS framework and no bundler — keep it that way unless the page's scope grows well beyond a single
  profile view. Vanilla DOM APIs only.
- Images are always referenced through Netlify Image CDN (`/.netlify/images?url=...&w=...&fm=webp`), never
  the raw file, so they're resized and re-encoded on the fly.
- Colors, radii, and glow values are theme-aware CSS variables (`--bg`, `--accent`, `--card-bg`, etc.) —
  add new colors as variables in both the `:root` and `html[data-theme="dark"]` blocks rather than hardcoding.
- Animations favor `transform`/`opacity`/`filter` for performance; avoid animating layout properties.
- `prefers-reduced-motion: reduce` is respected globally at the bottom of `style.css` — new animations don't
  need individual opt-outs.

## Non-obvious decisions

- The bio text is rendered with `font-variant-caps: all-small-caps` (per the original spec's "strict
  small-caps" requirement) rather than manually lowercasing content, so real casing is preserved in the DOM
  for accessibility/copy-paste while the visual style stays small-caps.
- The theme switch doesn't rely on the CSS `@property`/animated-custom-property trick (inconsistent browser
  support). Instead `.theme-flash` is a full-screen overlay that briefly fades to the current background
  color while the `data-theme` attribute swaps underneath it, which reads as a smooth cross-fade in every
  browser.
- `avatar.png`, `alpha.png`, and `kartona.png` are AI-generated placeholder art (a cookie-mascot avatar and
  two badge-style server emblems) rather than real photos/logos, since none were supplied. The avatar is
  intentionally a mascot illustration, not a realistic human portrait, given the profile's stated birthdate.
- `video.mp4` was never supplied. The `<video>` element is wired up and will "just work" the moment a real
  file is added at the project root; until then `script.js` detects the load failure and falls back to a
  CSS animated gradient (`body.no-video` in `style.css`) so the background never renders broken.
