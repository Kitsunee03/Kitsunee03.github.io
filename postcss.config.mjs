import tailwindcss from "tailwindcss";

// Tailwind 3 runs as a plain PostCSS plugin; Astro picks this file up.
export default {
  plugins: [tailwindcss()],
};
