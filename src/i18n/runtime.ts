import { DEFAULT_LANG, LANGUAGES, type Lang, translations } from "./translations";

type I18nApi = {
  getLang: () => Lang;
  setLang: (lang: string) => Lang;
  applyLang: (lang?: Lang) => void;
  t: (key: string, lang?: Lang) => string;
  LANGUAGES: readonly Lang[];
  DEFAULT_LANG: Lang;
};

declare global {
  interface Window {
    __i18n?: I18nApi;
  }
}

const STORAGE_KEY = "lang";

const normalizeLang = (value?: string | null): Lang => {
  return LANGUAGES.includes(value as Lang) ? (value as Lang) : DEFAULT_LANG;
};

const resolveKey = (dict: Record<string, unknown>, key: string): string | undefined => {
  const parts = key.split(".");
  let current: unknown = dict;
  for (const part of parts) {
    if (!current || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : undefined;
};

const t = (key: string, lang = getLang()): string => {
  const value = resolveKey(translations[lang], key) ?? resolveKey(translations[DEFAULT_LANG], key);
  return value ?? key;
};

const applyLang = (lang = getLang()): void => {
  document.documentElement.lang = lang;
  document.documentElement.dataset.lang = lang;

  document.querySelectorAll<HTMLElement>("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;
    if (!key) return;
    const value = t(key, lang);
    if (value !== key) {
      el.textContent = value;
    }
  });

  document.querySelectorAll<HTMLElement>("[data-i18n-attr]").forEach((el) => {
    const spec = el.dataset.i18nAttr;
    if (!spec) return;
    spec.split(";").forEach((entry) => {
      const trimmed = entry.trim();
      if (!trimmed) return;
      const [attr, keyOverride] = trimmed.includes(":")
        ? trimmed.split(":")
        : [trimmed, el.dataset.i18n || ""];
      const key = keyOverride || el.dataset.i18n || "";
      if (!key) return;
      const value = t(key, lang);
      if (value !== key) {
        el.setAttribute(attr, value);
      }
    });
  });

  window.dispatchEvent(new CustomEvent("i18n:changed", { detail: { lang } }));
};

const getLang = (): Lang => {
  try {
    return normalizeLang(localStorage.getItem(STORAGE_KEY));
  } catch {
    return DEFAULT_LANG;
  }
};

const setLang = (lang: string): Lang => {
  const next = normalizeLang(lang);
  try {
    localStorage.setItem(STORAGE_KEY, next);
  } catch {
    // ignore storage errors
  }
  applyLang(next);
  return next;
};

const init = (): void => {
  applyLang(getLang());
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", init);
} else {
  init();
}

document.addEventListener("astro:after-swap", init);

window.__i18n = {
  getLang,
  setLang,
  applyLang,
  t,
  LANGUAGES,
  DEFAULT_LANG,
};
