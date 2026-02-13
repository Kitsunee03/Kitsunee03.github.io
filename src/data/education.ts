export interface Education {
  title: string;
  institution: string;
  period: string;
  description: string;
  icon: string;
}

export const EDUCATION: Education[] = [
  {
    title: "DDVJA — Degree in Video Game Design and Development",
    institution: "ENTI (Barcelona)",
    period: "2023 — Present",
    description: "Currently in third year. Studying advanced game design, programming, production, and interactive experience creation across multiple platforms and engines.",
    icon: "mdi:school-outline",
  },
  {
    title: "DAM-VIOD — Cross-platform Application Development",
    institution: "ENTI (Barcelona)",
    period: "2021 — 2023",
    description: "Higher degree focused on application development, databases, and software engineering with a specialization in video game development.",
    icon: "mdi:laptop",
  },
  {
    title: "Bachillerato Tecnológico",
    institution: "INS Leonardo da Vinci (Sant Cugat del Vallès)",
    period: "2019 — 2021",
    description: "Technology-focused baccalaureate. Foundations in mathematics, physics, technology, and first exposure to programming.",
    icon: "mdi:certificate-outline",
  },
];
