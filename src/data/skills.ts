export interface Skill {
  name: string;
  icon: string;
  color?: string;
  description?: string;
  category: "programming" | "engine" | "design" | "tools";
}

export const SKILLS: Skill[] = [
  // Programming
  { name: "C#", icon: "devicon:csharp", color: "#239120", category: "programming", description: "Primary language for Unity game development" },
  { name: "C++", icon: "devicon:cplusplus", color: "#00599C", category: "programming", description: "Used in Unreal Engine and low-level systems" },
  { name: "JavaScript", icon: "devicon:javascript", color: "#F7DF1E", category: "programming", description: "Web-based game development with Phaser" },
  { name: "Python", icon: "devicon:python", color: "#3776AB", category: "programming", description: "Scripting, tools, and automation" },
  { name: "HTML5", icon: "devicon:html5", color: "#E34F26", category: "programming", description: "Structure for web-based projects" },
  { name: "CSS3", icon: "devicon:css3", color: "#1572B6", category: "programming", description: "Styling and visual design for the web" },

  // Engines
  { name: "Unity", icon: "simple-icons:unity", color: "#ffffff", category: "engine", description: "2D/3D game engine — my main development tool" },
  { name: "Unreal Engine", icon: "simple-icons:unrealengine", color: "#ffffff", category: "engine", description: "AAA-grade engine for high-fidelity projects" },
  { name: "Phaser", icon: "mdi:gamepad-variant-outline", color: "#336699", category: "engine", description: "HTML5 framework for browser-based games" },

  // Design
  { name: "Blender", icon: "simple-icons:blender", color: "#E87D0D", category: "design", description: "3D modeling, animation, and rendering" },
  { name: "Photoshop", icon: "simple-icons:adobephotoshop", color: "#31A8FF", category: "design", description: "Image editing and texture creation" },
  { name: "Aseprite", icon: "simple-icons:aseprite", color: "#7D929E", category: "design", description: "Pixel art and sprite animation tool" },

  // Tools
  { name: "Git", icon: "devicon:git", color: "#F05032", category: "tools", description: "Version control for all projects" },
  { name: "GitHub", icon: "simple-icons:github", color: "#ffffff", category: "tools", description: "Code hosting and collaboration platform" },
  { name: "GitLab", icon: "simple-icons:gitlab", color: "#FC6D26", category: "tools", description: "CI/CD and project management" },
  { name: "Jira", icon: "simple-icons:jira", color: "#0052CC", category: "tools", description: "Agile project management and task tracking" },
  { name: "Visual Studio", icon: "devicon:visualstudio", color: "#5C2D91", category: "tools", description: "IDE for C# and C++ development" },
];
