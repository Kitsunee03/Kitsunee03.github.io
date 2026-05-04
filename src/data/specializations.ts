export interface Specialization {
  title: string;
  description: string;
  icon: string;
}

export const SPECIALIZATIONS: Specialization[] = [
  {
    title: "Programmer",
    description: "Gameplay-focused programmer building systems, prototypes, and player feel with C# and C++ across Unity, Unreal, and Phaser.",
    icon: "mdi:code-braces",
  },
  {
    title: "Designer",
    description: "Game design foundations with emphasis on mechanics, level design, and playtesting feedback loops.",
    icon: "mdi:palette-outline",
  },
  {
    title: "Producer",
    description: "Led small university teams (3-8 people), organizing scope, priorities, and decisions around a clear vision.",
    icon: "mdi:chart-gantt",
  },
];
