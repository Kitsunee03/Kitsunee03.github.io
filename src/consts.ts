export const SITE_TITLE = "Arnau Miragall";
export const FULL_NAME = "Arnau Miragall Torra";
export const PROFESSIONAL_TITLE = "Gameplay Programmer and Game Dev Student";
export const EMAIL = "arnaum03@gmail.com";
export const GITHUB_USERNAME = "Kitsunee03";

export const SITE_DESCRIPTION =
  `Portfolio of Arnau Miragall Torra — gameplay programmer and game development student. Focused on gameplay systems and game design, with prototypes built in Unity, Unreal Engine, Phaser, C#, and C++.`.trim();

export const ABOUT_ME_SHORT =
  `Gameplay programmer and game development student building university and personal prototypes in Unity, Unreal Engine, and Phaser. Calm, collaborative, and focused on solid gameplay feel, level design, and thoughtful systems.`.trim();

export const QUOTE = "Creating playable worlds, one line of code at a time, refined through playtests";

export const SOCIAL_LINKS = {
  github: `https://github.com/${GITHUB_USERNAME}`,
  itchio: "https://kitsunee03.itch.io",
  linkedin: "https://linkedin.com/in/arnau-miragall-torra",
  instagram: "https://instagram.com/kitsunee03",
  tiktok: "https://tiktok.com/@kitsunee03",
};

export const NAV_LINKS: Array<{ title: string; href: string; i18nKey: string }> = [
  { title: "Home", href: "/", i18nKey: "nav.home" },
  { title: "Projects", href: "/projects", i18nKey: "nav.projects" },
  { title: "About Me", href: "/about", i18nKey: "nav.about" },
  { title: "Contact", href: "/contact", i18nKey: "nav.contact" },
];

export const ENGINES = ["Unity", "Unreal Engine", "Phaser", "C++"] as const;
export type Engine = (typeof ENGINES)[number];
