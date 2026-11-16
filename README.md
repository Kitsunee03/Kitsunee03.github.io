# Arnau Miragall — Portfolio

Personal portfolio of Arnau Miragall Torra, gameplay programmer and game development student.
Live at <https://kitsunee03.github.io/> (English) and <https://kitsunee03.github.io/es/> (Spanish).

Built with [Astro](https://astro.build/) 7 (static output), Tailwind CSS and MDX, and deployed to GitHub Pages.
It started from the [token-template](https://github.com/ArnavK-09/token-template) starter by Arnav K (ISC licence, see `LICENSE`).

## Commands

| Command | What it does |
|---|---|
| `npm ci` | Install the exact dependencies from `package-lock.json` (Node 22.23.4 or later) |
| `npm run dev` | Start the dev server |
| `npm run check` | Type-check the project (`astro check`) |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run fmt` | Format the code with Prettier |

Always run `npm run check` and `npm run build` before merging: the dev server does not guarantee that the deployed site works.

## Structure

| Path | Contents |
|---|---|
| `src/pages/[...lang]/` | Home, projects, about and contact, each built twice: at the root (English) and under `/es/` (Spanish) |
| `src/pages/404.astro`, `src/pages/es/404.astro` | Not-found page in both languages |
| `src/components/` | Astro components |
| `src/content/projects/` | One MDX file per project, in English (front matter is validated in `src/content.config.ts`) |
| `src/content/projects-es/` | Spanish text for each project, same file name; the MDX body is the Spanish devlog |
| `src/lib/projects.ts` | Loads the projects for a language, merging the Spanish text over the English record |
| `src/data/` | Identifiers and icons for skills, tools, education, experience and Q&A |
| `src/i18n/` | Interface text in both languages (`translations.ts`) and the build-time helpers (`index.ts`) |
| `src/scripts/` | Client-side behaviour (navigation, cards, accordions, copy buttons, title decode) |
| `src/visuals/` | Canvas visual systems, each loaded on demand |
| `public/` | Fonts, images and project media |

## Languages

English pages live at the root and Spanish pages under `/es/`. Every page is rendered in its own language at build time, so no dictionary is sent to the browser.

- In components: `const t = useTranslations(getLang(Astro.url))`, then `t("section.key")`. A key missing in either language stops the build.
- Internal links: `localizePath("/about", lang)`.
- The language switch links to the same page in the other language and remembers the choice; a returning visitor who arrives from outside the site lands in that language.
- Old `/en/…` addresses redirect to the root pages.

## Adding a project

1. Create `src/content/projects/<slug>.mdx`. Required front matter: `title`, `description`, `tags`, `engine`, `image`.
   Optional: `video` (short loop shown on card hover), `hero`, `links`, `previews`, `overview`, `contribution`, `highlights`, `technologies`, `challenges`, `technicalDecisions`, `controls`, `ambient` (`space` or `arcane`), `featured`, `order`.
2. Create `src/content/projects-es/<slug>.mdx` with the Spanish text: at least `description`, plus any text field you want translated. `links` and `previews` are matched to the English ones by position and only take `label`, `alt` and `caption`. The Spanish build fails if this file is missing.

Use video for motion, not GIF: the same clip is roughly ten times smaller. Each `.mp4` needs a `.webm` with the same name next to it (`ffmpeg -i clip.mp4 -c:v libvpx-vp9 -crf 33 -b:v 0 -an clip.webm`).

## Visual systems

Each effect in `src/visuals/` exports `mount(canvas, options)` and returns a dispose function.
`src/visuals/core/lifecycle.ts` handles the frame loop, pausing when off-screen or when the tab is hidden, the `devicePixelRatio` cap and `prefers-reduced-motion` (`createLoop` for any context, `createVisual` for Canvas 2D).
Declare one in markup with `<canvas data-visual="glyph-field">`; `src/visuals/mount.ts` loads the module on demand.
A section gets the lattice background with `<Section visual="lattice">`.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which type-checks, builds the site and publishes `dist/` to GitHub Pages.
