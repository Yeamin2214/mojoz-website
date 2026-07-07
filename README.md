# Mojoz — Marketing Website

A pixel-close recreation of the Mojoz "GummiCone" homepage, built with Next.js
15 (App Router), React 19, TypeScript, and Tailwind CSS v4, with premium
Framer Motion / GSAP interactions.

## Tech stack

- **Next.js 15** (App Router, server components by default)
- **React 19** + **TypeScript**
- **Tailwind CSS v4** (CSS-first `@theme` design tokens, see `src/app/globals.css`)
- **Framer Motion** — scroll reveals, stagger, hover lift, magnetic buttons, parallax
- **GSAP** — installed and ready for any additional premium timeline work
- **lucide-react** — icon set for the Product Standards grid, contact icons, etc.

## Getting started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Open the site
# http://localhost:3000
```

Other scripts:

```bash
npm run build   # production build
npm run start   # run the production build locally
npm run lint    # eslint
```

Requires Node.js 18.18+ (Node 20 LTS recommended).

## Project structure

```
src/
  app/
    layout.tsx        Root layout: fonts, metadata, SEO
    page.tsx           Assembles all homepage sections
    globals.css         Design tokens (@theme) + base styles
  components/
    Navbar.tsx          Sticky nav, scroll shadow, animated mobile menu
    Hero.tsx             Headline, floating candy, parallax blob
    FlavoursSection.tsx  "Most Craved Flavours" grid
    IntroSection.tsx      "Introducing the GummiCone" + chat bubbles
    ProductStandards.tsx  Kosher/Halal/etc. icon grid + "Including also" strip
    DistributorPartners.tsx
    FranchisePartners.tsx
    WholesaleForm.tsx     Contact / wholesale inquiry form
    Footer.tsx
    GummiCone.tsx         Placeholder SVG illustration (see note below)
    SocialIcon.tsx        Lightweight custom social icons
    MagneticButton.tsx    Reusable magnetic CTA
    Reveal.tsx            Shared scroll-reveal / stagger variants
  lib/data.ts           All copy/content, extracted from the source design
  types/index.ts         Shared TypeScript types
```

## Notes on assets

The source `.fig` file is a binary Figma document — its internal format
isn't something that can be parsed into usable layers/exports outside of
Figma itself. All **copy, layout, spacing, color values, and typography
scale** were taken directly from the CSS spec and screenshot you provided,
and should match closely.

**Product photography, hero hand/cone photo, and franchise logos** could not
be extracted, so they're stand-ins:

- The ice cream cone artwork is a lightweight illustrative SVG component
  (`GummiCone.tsx`) using the correct flavour colors, swappable for real
  photography.
- Franchise partner logos use the same "Logoipsum" placeholder treatment
  visible in your screenshot.

To finish the site with real assets: export the actual images/photos from
Figma (right-click frame → Export), drop them into `/public/images`, and
replace the `<GummiCone />` usages with Next.js `<Image />` components.

## Fonts

The design uses Montera, Peace Sans, Satoshi, and Instrument Sans, which are
commercial/marketplace fonts not distributed on Google Fonts. Close, freely
licensed substitutes are loaded instead (via Google Fonts `<link>` tags in
`layout.tsx`):

| Design font     | Used for                  | Substitute          |
|------------------|---------------------------|----------------------|
| Montera          | Headings/display          | Fredoka              |
| Peace Sans       | Logo & pill buttons        | Baloo 2              |
| Satoshi          | Body copy                  | Plus Jakarta Sans    |
| Instrument Sans  | Form field text            | Instrument Sans (exact match, on Google Fonts) |

If you own license files for Montera, Peace Sans, and Satoshi, drop the
`.woff2` files into `src/app/fonts/` and swap the Google Fonts `<link>` for
`next/font/local` — the CSS variable names (`--font-display`, `--font-logo`,
`--font-body`) are already wired up in `globals.css`, so no other code needs
to change.

## Accessibility & performance

- Visible focus rings on all interactive elements
- `prefers-reduced-motion` respected globally
- Semantic landmarks (`header`, `main`, `footer`, headings in order)
- All icon-only buttons have `aria-label`s
- Production build produces a fully static, prerendered page

---

## Immersive experience layer (v2)

The original UI, layout, branding, typography, and content are untouched. A
premium animation layer has been added on top of the existing architecture:

### New stack additions

- **Lenis** — buttery smooth scrolling, inertia, smooth `#anchor` navigation,
  synced with GSAP ScrollTrigger via a shared ticker
- **Three.js + React Three Fiber + drei** — immersive hero scene and a
  site-wide ambient candy field
- **@react-three/postprocessing** — Bloom, Depth of Field, Noise, Vignette

### Architecture

```
src/
  components/
    providers/SmoothScrollProvider.tsx  Lenis + ScrollTrigger sync, scroll store
    three/
      HeroScene.tsx        Hero canvas: cone, orbiting candies, particles
      AmbientCandyField.tsx Site-wide fixed candy layer (ultra light)
      CandyModels.tsx      Procedural gummy cone / bear / ring / slice / crystal
      materials.tsx        Shared gummy / hard-candy physical materials
      CameraRig.tsx        Slow orbit + mouse parallax + scroll dolly + sway
      SceneLighting.tsx    HDR env, key/rim lights, contact shadows
      SugarParticles.tsx   Instanced sugar-dust field (one draw call)
      Effects.tsx          Post FX stack, DoF gated off on low-power devices
    fx/
      TextReveal.tsx       Staggered word/character mask reveals for headings
      TiltCard.tsx         3D tilt + sheen + border glow + floating shadow
      SectionReveal.tsx    Clip-mask / blur-rise section transitions + parallax
      AmbientBackground.tsx Drifting gradient blobs, grain, cursor-follow glow
      PageTransition.tsx   Brand curtain load transition + page fade-in
  hooks/
    useGlobalPointer.ts    Zero-re-render shared pointer store
    usePrefersReducedMotion.ts
  lib/
    motion.ts              Shared eases, damp/lerp helpers
```

### Performance notes

- Both canvases are dynamically imported (code-split); the hero scene is
  `ssr: false` so it never blocks first paint.
- All candy geometry is procedural — zero GLB/HDR downloads.
- Scroll and mouse values live in module-level stores read inside rAF/useFrame
  loops, so scrolling and pointer movement cause **no React re-renders**.
- Sugar dust is a single instanced mesh; particle counts and Depth of Field
  are reduced/disabled on small screens and low-core devices.
- `prefers-reduced-motion` disables Lenis and the WebGL hero (the original
  illustrated cone is shown instead), keeping the site fully accessible.
