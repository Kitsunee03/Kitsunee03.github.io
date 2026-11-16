// Descriptions live in src/i18n/translations.ts under `skills.<id>.description`.
export interface Skill {
  id: string;
  name: string;
  icon: string;
  color?: string;
  category: "programming" | "engine" | "design" | "tools";
}

export const SKILLS: Skill[] = [
  // Programming
  {
    id: "csharp",
    name: "C#",
    icon: "devicon:csharp",
    color: "#239120",
    category: "programming",
  },
  {
    id: "cpp",
    name: "C++",
    icon: "devicon:cplusplus",
    color: "#00599C",
    category: "programming",
  },
  {
    id: "javascript",
    name: "JavaScript",
    icon: "devicon:javascript",
    color: "#F7DF1E",
    category: "programming",
  },
  {
    id: "processing",
    name: "Processing",
    icon: "simple-icons:processingfoundation",
    color: "#006699",
    category: "programming",
  },
  {
    id: "html5",
    name: "HTML5",
    icon: "devicon:html5",
    color: "#E34F26",
    category: "programming",
  },
  {
    id: "css3",
    name: "CSS3",
    icon: "devicon:css3",
    color: "#1572B6",
    category: "programming",
  },

  // Engines
  {
    id: "unity",
    name: "Unity",
    icon: "simple-icons:unity",
    color: "#ffffff",
    category: "engine",
  },
  {
    id: "unreal",
    name: "Unreal Engine",
    icon: "simple-icons:unrealengine",
    color: "#ffffff",
    category: "engine",
  },
  {
    id: "phaser",
    name: "Phaser",
    icon: "mdi:gamepad-variant-outline",
    color: "#336699",
    category: "engine",
  },

  // Design
  {
    id: "blender",
    name: "Blender",
    icon: "simple-icons:blender",
    color: "#E87D0D",
    category: "design",
  },
  {
    id: "photoshop",
    name: "Photoshop",
    icon: "simple-icons:adobephotoshop",
    color: "#31A8FF",
    category: "design",
  },
  {
    id: "aseprite",
    name: "Aseprite",
    icon: "simple-icons:aseprite",
    color: "#7D929E",
    category: "design",
  },

  // Tools
  {
    id: "git",
    name: "Git",
    icon: "devicon:git",
    color: "#F05032",
    category: "tools",
  },
  {
    id: "github",
    name: "GitHub",
    icon: "simple-icons:github",
    color: "#ffffff",
    category: "tools",
  },
  {
    id: "gitlab",
    name: "GitLab",
    icon: "simple-icons:gitlab",
    color: "#FC6D26",
    category: "tools",
  },
  {
    id: "jira",
    name: "Jira",
    icon: "simple-icons:jira",
    color: "#0052CC",
    category: "tools",
  },
  {
    id: "audacity",
    name: "Audacity",
    icon: "simple-icons:audacity",
    color: "#0000CC",
    category: "tools",
  },
  {
    id: "visualstudio",
    name: "Visual Studio",
    icon: "devicon:visualstudio",
    color: "#5C2D91",
    category: "tools",
  },
];
