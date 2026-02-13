export interface Tool {
  name: string;
  icon: string; // iconify icon name
  color?: string;
}

export const TOOLS: Tool[] = [
  { name: "Unity", icon: "simple-icons:unity", color: "#ffffff" },
  { name: "Unreal Engine", icon: "simple-icons:unrealengine", color: "#ffffff" },
  { name: "C#", icon: "devicon:csharp", color: "#239120" },
  { name: "C++", icon: "devicon:cplusplus", color: "#00599C" },
  { name: "Phaser", icon: "mdi:gamepad-variant-outline", color: "#336699" },
  { name: "JavaScript", icon: "devicon:javascript", color: "#F7DF1E" },
  { name: "HTML5", icon: "devicon:html5", color: "#E34F26" },
  { name: "CSS3", icon: "devicon:css3", color: "#1572B6" },
  { name: "Git", icon: "devicon:git", color: "#F05032" },
  { name: "GitHub", icon: "simple-icons:github", color: "#ffffff" },
  { name: "GitLab", icon: "simple-icons:gitlab", color: "#FC6D26" },
  { name: "Blender", icon: "simple-icons:blender", color: "#E87D0D" },
  { name: "Photoshop", icon: "simple-icons:adobephotoshop", color: "#31A8FF" },
  { name: "Aseprite", icon: "simple-icons:aseprite", color: "#7D929E" },
  { name: "Jira", icon: "simple-icons:jira", color: "#0052CC" },
  { name: "Visual Studio", icon: "devicon:visualstudio", color: "#5C2D91" },
];
