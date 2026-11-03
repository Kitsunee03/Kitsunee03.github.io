export interface Experience {
  id: string;
  title: string;
  institution: string;
  period: string;
  description: string;
  icon: string;
  mark?: string;
  logo?: string;
  url: string;
}

export const EXPERIENCE: Experience[] = [
  {
    id: "ubisoft",
    title: "QC Trainee",
    institution: "Ubisoft Barcelona Mobile",
    period: "2026 — Present",
    description:
      "University internship in quality control, contributing to the testing and verification of mobile game experiences within a professional production environment.",
    icon: "simple-icons:ubisoft",
    logo: "/brands/ubisoft.svg",
    url: "https://www.ubisoft.com/en-us/company/careers/locations/barcelona/ubisoft-barcelona-mobile",
  },
  {
    id: "jandusoft",
    title: "Junior Gameplay Programmer",
    institution: "Jandusoft",
    period: "2022 — 2023",
    description:
      "Higher-degree internship focused on gameplay programming for a game project that was later cancelled, gaining experience in professional workflows and team development.",
    icon: "",
    mark: "J",
    logo: "/brands/jandusoft.png",
    url: "https://jandusoft.com/",
  },
];
