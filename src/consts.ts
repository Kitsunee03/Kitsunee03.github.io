export const SITE_TITLE = "Arnau Miragall";
export const FULL_NAME = "Arnau Miragall Torra";
export const PROFESSIONAL_TITLE = "Programmer, Designer & Producer";
export const EMAIL = "arnaum03@gmail.com";
export const GITHUB_USERNAME = "Kitsunee03";

export const SITE_DESCRIPTION =
  `Portfolio of Arnau Miragall Torra — Programmer, Designer & Producer. Specializing in game development with Unity, Unreal Engine, Phaser, and C++.`.trim();

export const ABOUT_ME_SHORT =
  `Passionate game developer and designer with experience in Unity, Unreal Engine, Phaser, and C++. I love creating interactive experiences that combine technical skill with creative vision. Always looking for new challenges and opportunities to grow.`.trim();

export const ABOUT_ME_FULL =
  `I'm Arnau Miragall Torra, a multidisciplinary game developer passionate about creating interactive experiences that push the boundaries of creativity and technology. With a strong foundation in programming, design, and production, I bring projects from concept to completion.\n\nMy journey spans across multiple engines and frameworks — from Unity and Unreal Engine for immersive 3D experiences, to Phaser for web-based games, and C++ for performance-critical applications. I believe in the power of games as a medium for storytelling, education, and entertainment.\n\nWhether I'm coding gameplay systems, designing levels, or managing production pipelines, I approach every project with curiosity and dedication. I'm always eager to learn new technologies and collaborate with like-minded creators.`.trim();

export const QUOTE = "Creating worlds, one line of code at a time";

export const SOCIAL_LINKS = {
  github: `https://github.com/${GITHUB_USERNAME}`,
  itchio: "https://kitsunee03.itch.io",
  linkedin: "https://linkedin.com/in/arnau-miragall-torra",
  instagram: "https://instagram.com/kitsunee03",
  tiktok: "https://tiktok.com/@kitsunee03",
};

export const NAV_LINKS: Array<{ title: string; href: string }> = [
  { title: "Home", href: "/" },
  { title: "Projects", href: "/projects" },
  { title: "About Me", href: "/about" },
  { title: "Contact", href: "/contact" },
];

export const ENGINES = ["Unity", "Unreal Engine", "Phaser", "C++"] as const;
export type Engine = (typeof ENGINES)[number];
