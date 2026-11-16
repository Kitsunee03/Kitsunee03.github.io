// Visible text lives in src/i18n/translations.ts under `specializations.<id>`.
export interface Specialization {
  id: string;
  icon: string;
}

export const SPECIALIZATIONS: Specialization[] = [
  { id: "programmer", icon: "mdi:code-braces" },
  { id: "designer", icon: "mdi:dice-multiple-outline" },
  { id: "producer", icon: "mdi:clipboard-check-outline" },
];
