export interface Education {
  id: string;
  title: string;
  institution: string;
  period: string;
  description: string;
  icon: string;
}

export const EDUCATION: Education[] = [
  {
    id: "ddvja",
    title: "DDVJA — Degree in Video Game Design and Development",
    institution: "ENTI (Barcelona)",
    period: "2023 — Present",
    description: "Game development student in third year, focused on gameplay programming, game design, production, and rapid prototyping across multiple engines.",
    icon: "mdi:school-outline",
  },
  {
    id: "damviod",
    title: "DAM-VIOD — Cross-platform Application Development",
    institution: "ENTI (Barcelona)",
    period: "2021 — 2023",
    description: "Higher degree focused on application development, databases, and software engineering, with a specialization in video game development.",
    icon: "mdi:laptop",
  },
  {
    id: "bachillerato",
    title: "Bachillerato Tecnológico",
    institution: "INS Leonardo da Vinci (Sant Cugat del Vallès)",
    period: "2019 — 2021",
    description: "Technology-focused baccalaureate with foundations in math, physics, and early programming exposure.",
    icon: "mdi:certificate-outline",
  },
];
