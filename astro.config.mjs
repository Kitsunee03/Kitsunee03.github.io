// @ts-check
import { defineConfig } from "astro/config";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import icon from "astro-icon";

// https://astro.build/config
export default defineConfig({
  output: "static",
  site: "https://Kitsunee03.github.io",
  integrations: [
    mdx(),
    // /en/... and /es/... are noindex language redirects, not real pages.
    sitemap({ filter: (page) => !/^\/(en|es)\//.test(new URL(page).pathname) }),
    tailwind(),
    icon(),
  ],
  markdown: {
    shikiConfig: {
      theme: "github-dark-high-contrast",
    },
  },
});
