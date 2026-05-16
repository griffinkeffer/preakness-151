# Preakness 151 Microsite

Mobile-first card-flip carousel for the 2026 Preakness Stakes field at Laurel Park. Tap a card to flip from a side-profile horse photo to a playing-card-style stats back with jockey, trainer, owner, pedigree, running style, odds, and record.

## Stack

- Single-file `index.html` (no build step, no framework)
- Vanilla JS, CSS variables for theming
- Fonts: Bebas Neue (display), Cormorant Garamond (body), JetBrains Mono (data labels)
- Deploys to Vercel as a static site — zero config needed beyond `vercel.json`

## Project structure

```
preakness/
├── index.html       ← all markup, CSS, JS in one file
├── vercel.json      ← static config + asset caching
└── public/
    └── horses/
        ├── taj-mahal-side.jpg   ← front of card (side profile, ~800x1200, 2:3)
        ├── taj-mahal-race.jpg   ← back of card top (action shot, ~800x450, 16:9)
        └── [slug]-side.jpg / [slug]-race.jpg  for each horse
```

## Local dev

```bash
npx serve .
# or
python3 -m http.server 3000
```

Open http://localhost:3000.

## Deploy

```bash
npm i -g vercel
vercel deploy
```

That's it. Static, no build.

## How the data works

The 14-horse field is defined as a `FIELD` array near the bottom of `index.html`. Each entry looks like:

```js
{
  pp: 1,                         // post position
  name: "Taj Mahal",
  slug: "taj-mahal",             // ← matches image filenames
  odds: "5-1",
  trainer: "Brittany Russell",
  jockey: "Sheldon Russell",
  owner: "SF Racing & partners",
  sire: "Nyquist",
  dam: "Placeholder Mare",       // ← needs filling in
  style: "Stalker",              // running style: Speed | Presser | Stalker | Closer
  record: "5-3-1-0",             // starts-wins-place-show
  earnings: "$485,200",
  silk: "#003478"                // hex color for fallback background tint
}
```

**To add a horse's photo:** add a `slug: "horse-name"` field and drop matching files into `public/horses/`. The template auto-uses photos when `slug` is present; otherwise it falls back to the stylized SVG placeholder.

## Current status

- [x] Layout, carousel, flip animation, pill nav, mobile snap-scroll
- [x] Taj Mahal photos wired (post 1)
- [ ] Photos for posts 2–14
- [ ] Real bio data (dam, current earnings, recent results) for all horses
- [ ] Optional: photo credits / source attribution

## Design notes

- Bold conceptual direction: Daily Racing Form crossed with a Bicycle playing card
- Dark masthead (Pimlico black + Preakness marigold gold), cream paper-stock card backs
- Cards are `2:3` aspect, sized for thumb-swipe; pills above let you jump to a post
- Field is 14 horses (Crude Velocity and Talk To Me Jimmy scratched); a 15th placeholder slot exists in the data array but can be removed
