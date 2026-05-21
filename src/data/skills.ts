export interface Skill {
  id: string;
  name: string;
  icon: string;
  color?: string;
  description?: string;
  category: "programming" | "engine" | "design" | "tools";
}

export const SKILLS: Skill[] = [
  // Programming
  { id: "csharp", name: "C#", icon: "devicon:csharp", color: "#239120", category: "programming", description: "Primary language for Unity game development" },
  { id: "cpp", name: "C++", icon: "devicon:cplusplus", color: "#00599C", category: "programming", description: "Used in Unreal Engine and low-level systems" },
  { id: "javascript", name: "JavaScript", icon: "devicon:javascript", color: "#F7DF1E", category: "programming", description: "Web-based game development with Phaser" },
  { id: "processing", name: "Processing", icon: "simple-icons:processingfoundation", color: "#006699", category: "programming", description: "Creative coding for university prototypes and experiments" },
  { id: "html5", name: "HTML5", icon: "devicon:html5", color: "#E34F26", category: "programming", description: "Structure for web-based projects" },
  { id: "css3", name: "CSS3", icon: "devicon:css3", color: "#1572B6", category: "programming", description: "Styling and visual design for the web" },

  // Engines
  { id: "unity", name: "Unity", icon: "simple-icons:unity", color: "#ffffff", category: "engine", description: "2D/3D game engine — my main development tool" },
  { id: "unreal", name: "Unreal Engine", icon: "simple-icons:unrealengine", color: "#ffffff", category: "engine", description: "AAA-grade engine for high-fidelity projects" },
  { id: "phaser", name: "Phaser", icon: "mdi:gamepad-variant-outline", color: "#336699", category: "engine", description: "HTML5 framework for browser-based games" },

  // Design
  { id: "blender", name: "Blender", icon: "simple-icons:blender", color: "#E87D0D", category: "design", description: "3D modeling, animation, and rendering" },
  { id: "photoshop", name: "Photoshop", icon: "simple-icons:adobephotoshop", color: "#31A8FF", category: "design", description: "Image editing and texture creation" },
  { id: "aseprite", name: "Aseprite", icon: "simple-icons:aseprite", color: "#7D929E", category: "design", description: "Pixel art and sprite animation tool" },

  // Tools
  { id: "git", name: "Git", icon: "devicon:git", color: "#F05032", category: "tools", description: "Version control for all projects" },
  { id: "github", name: "GitHub", icon: "simple-icons:github", color: "#ffffff", category: "tools", description: "Code hosting and collaboration platform" },
  { id: "gitlab", name: "GitLab", icon: "simple-icons:gitlab", color: "#FC6D26", category: "tools", description: "CI/CD and project management" },
  { id: "jira", name: "Jira", icon: "simple-icons:jira", color: "#0052CC", category: "tools", description: "Agile project management and task tracking" },
  { id: "audacity", name: "Audacity", icon: "simple-icons:audacity", color: "#0000CC", category: "tools", description: "Basic audio editing and cleanup" },
  { id: "visualstudio", name: "Visual Studio", icon: "devicon:visualstudio", color: "#5C2D91", category: "tools", description: "IDE for C# and C++ development" },
];
