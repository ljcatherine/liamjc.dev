# liamjc.dev

My personal site. Plain HTML, CSS and JavaScript, no build step.

## Run locally

Any static server works:

```bash
npx serve public
```

Or with Wrangler, which also applies `public/_headers`:

```bash
npx wrangler dev
```

## Deploy

Hosted on Cloudflare Workers as static assets.

```bash
npx wrangler deploy
```

## Layout

```
public/
  index.html
  404.html
  _headers        security headers (CSP, HSTS, frame blocking)
  css/style.css
  js/motion.js    applies the saved animation setting before first paint
  js/main.js      scroll reveals, hero crosshair, animation toggle
wrangler.jsonc
```
