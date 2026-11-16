// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import icon from "astro-icon";

// English lives at the root and Spanish under /es/ (see src/i18n/index.ts).
// The old /en/… addresses were language switches; keep them working.
const legacyEnglish = Object.fromEntries(
  ["", "/about", "/projects", "/contact"].map((path) => [
    `/en${path}`,
    path || "/",
  ]),
);

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://Kitsunee03.github.io",
  redirects: legacyEnglish,
  integrations: [
    mdx(),
    sitemap({
      filter: (page) => !/\/(en|404)(\/|$)/.test(new URL(page).pathname),
      i18n: {
        defaultLocale: "en",
        locales: { en: "en", es: "es" },
      },
    }),
    icon(),
  ],
  // Keep the pre-v7 whitespace handling so inline text keeps its spaces.
  compressHTML: true,
});
