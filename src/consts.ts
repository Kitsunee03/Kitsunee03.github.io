// Text shown to visitors lives in src/i18n/translations.ts; these are
// identifiers, links and fixed values that do not change with the language.
export const SITE_TITLE = "Arnau Miragall";
export const FULL_NAME = "Arnau Miragall Torra";
export const EMAIL = "arnaum03@gmail.com";
export const GITHUB_USERNAME = "Kitsunee03";

export const SOCIAL_LINKS = {
  github: `https://github.com/${GITHUB_USERNAME}`,
  itchio: "https://kitsunee03.itch.io",
  linkedin: "https://linkedin.com/in/arnau-miragall-torra",
  instagram: "https://instagram.com/kitsunee03",
  tiktok: "https://tiktok.com/@kitsunee03",
};

/** Main navigation. `href` is the English path; pages localize it. */
export const NAV_LINKS: Array<{ href: string; i18nKey: string }> = [
  { href: "/", i18nKey: "nav.home" },
  { href: "/projects", i18nKey: "nav.projects" },
  { href: "/about", i18nKey: "nav.about" },
  { href: "/contact", i18nKey: "nav.contact" },
];

export const ENGINES = ["Unity", "Unreal Engine"] as const;
export type Engine = (typeof ENGINES)[number];
