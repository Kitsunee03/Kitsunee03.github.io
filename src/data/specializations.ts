export interface Specialization {
  title: string;
  description: string;
  icon: string;
}

export const SPECIALIZATIONS: Specialization[] = [
  {
    title: "Programmer",
    description: "Building robust game systems, mechanics, and tools with clean, efficient code across multiple languages and engines.",
    icon: "mdi:code-braces",
  },
  {
    title: "Designer",
    description: "Crafting engaging gameplay experiences through level design, game mechanics, UX flows, and visual communication.",
    icon: "mdi:palette-outline",
  },
  {
    title: "Producer",
    description: "Managing project timelines, coordinating teams, and ensuring deliverables meet quality standards on schedule.",
    icon: "mdi:chart-gantt",
  },
];
