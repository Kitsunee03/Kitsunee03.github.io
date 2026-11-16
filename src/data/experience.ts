// Visible text for each entry lives in src/i18n/translations.ts under
// `experience.<id>` (title, institution, period, description).
export interface Experience {
  id: string;
  icon: string;
  mark?: string;
  logo?: string;
  url: string;
  /** Still ongoing: its timeline node keeps a slow signal pulse. */
  current?: boolean;
}

export const EXPERIENCE: Experience[] = [
  {
    id: "ubisoft",
    icon: "simple-icons:ubisoft",
    logo: "/brands/ubisoft.svg",
    url: "https://www.ubisoft.com/en-us/company/careers/locations/barcelona/ubisoft-barcelona-mobile",
    current: true,
  },
  {
    id: "jandusoft",
    icon: "",
    mark: "J",
    logo: "/brands/jandusoft.png",
    url: "https://jandusoft.com/",
  },
];
