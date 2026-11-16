// Visible text for each entry lives in src/i18n/translations.ts under
// `education.<id>` (title, institution, period, description).
export interface Education {
  id: string;
  icon: string;
  /** Still ongoing: its timeline node keeps a slow signal pulse. */
  current?: boolean;
}

export const EDUCATION: Education[] = [
  { id: "ddvja", icon: "mdi:school-outline", current: true },
  { id: "damviod", icon: "mdi:laptop" },
  { id: "bachillerato", icon: "mdi:certificate-outline" },
];
