export interface Specialization {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const SPECIALIZATIONS: Specialization[] = [
  {
    id: "programmer",
    title: "Programmer",
    description: "Gameplay-focused programmer building systems, prototypes, and player feel with C# and C++ across Unity, Unreal, and Phaser.",
    icon: "mdi:code-braces",
  },
  {
    id: "designer",
    title: "Designer",
    description: "Game design foundations with emphasis on mechanics, level design, and playtesting feedback loops.",
    icon: "mdi:dice-multiple-outline",
  },
  {
    id: "producer",
    title: "Producer",
    description: "Led small university teams (3-8 people), organizing scope, priorities, and decisions around a clear vision.",
    icon: "mdi:clipboard-check-outline",
  },
];
