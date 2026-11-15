# Arnau Miragall — Portfolio

Personal portfolio of Arnau Miragall Torra, gameplay programmer and game development student.
Live at <https://kitsunee03.github.io/>.

Built with [Astro](https://astro.build/) (static output), Tailwind CSS and MDX, and deployed to GitHub Pages.
It started from the [token-template](https://github.com/ArnavK-09/token-template) starter by Arnav K (ISC licence, see `LICENSE`).

## Commands

| Command | What it does |
|---|---|
| `npm ci` | Install the exact dependencies from `package-lock.json` |
| `npm run dev` | Start the dev server |
| `npm run build` | Build the production site into `dist/` |
| `npm run preview` | Serve the production build locally |
| `npm run fmt` | Format the code with Prettier |

Always check `npm run build` before merging: the dev server does not guarantee that the deployed site works.

## Structure

| Path | Contents |
|---|---|
| `src/pages/` | Routes: home, projects, about, contact, 404, and the `/en/…` `/es/…` language redirects |
| `src/components/` | Astro components |
| `src/content/projects/` | One MDX file per project (front matter is validated in `src/content.config.ts`) |
| `src/data/` | Skills, tools, education, experience and Q&A |
| `src/i18n/translations.ts` | English and Spanish interface strings |
| `src/scripts/` | Client-side behaviour (navigation, cards, accordions, title decode) |
| `src/visuals/` | Canvas visual systems, each loaded on demand |
| `public/` | Fonts, images and project media |

## Adding a project

Create `src/content/projects/<slug>.mdx`. Required front matter: `title`, `description`, `tags`, `engine`, `image`.
Optional: `video` (short MP4 loop shown on card hover), `hero`, `links`, `previews`, `overview`, `contribution`, `highlights`, `technologies`, `challenges`, `technicalDecisions`, `controls`, `ambient` (`space` or `arcane`), `featured`, `order`.

Use video for motion, not GIF: the same clip is roughly ten times smaller. Each `.mp4` needs a `.webm` with the same name next to it (`ffmpeg -i clip.mp4 -c:v libvpx-vp9 -crf 33 -b:v 0 -an clip.webm`).

## Visual systems

Each effect in `src/visuals/` exports `mount(canvas, options)` and returns a dispose function.
`src/visuals/core/lifecycle.ts` handles the frame loop, pausing when off-screen or when the tab is hidden, the `devicePixelRatio` cap and `prefers-reduced-motion`.
Declare one in markup with `<canvas data-visual="glyph-field">`; `src/visuals/mount.ts` loads the module on demand.

## Deployment

Pushing to `main` runs `.github/workflows/deploy.yml`, which builds the site and publishes `dist/` to GitHub Pages.
