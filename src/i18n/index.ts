/**
 * Build-time translations.
 *
 * English pages live at the root (/, /about, …) and Spanish pages under
 * /es/ (/es/, /es/about, …). Every page is rendered in its own language at
 * build time, so no dictionary is shipped to the browser.
 */
import {
  DEFAULT_LANG,
  LANGUAGES,
  translations,
  type Lang,
} from "./translations";

export { DEFAULT_LANG, LANGUAGES, type Lang };

const LANG_PREFIX = /^\/(es)(?=\/|$)/;

/** Language of a page, from its URL. */
export function getLang(url: URL): Lang {
  const match = url.pathname.match(LANG_PREFIX);
  return (match?.[1] as Lang | undefined) ?? DEFAULT_LANG;
}

/** Route param for `[...lang]` pages: undefined for English, "es" for Spanish. */
export const langParam = (lang: Lang) =>
  lang === DEFAULT_LANG ? undefined : lang;

/** Static paths for a page rendered once per language. */
export const langStaticPaths = () =>
  LANGUAGES.map((lang) => ({
    params: { lang: langParam(lang) },
    props: { lang },
  }));

const lookup = (lang: Lang, key: string): string | undefined => {
  let current: unknown = translations[lang];
  for (const part of key.split(".")) {
    if (!current || typeof current !== "object") return undefined;
    current = (current as Record<string, unknown>)[part];
  }
  return typeof current === "string" ? current : undefined;
};

/**
 * Translator for one language. A key missing in either language stops the
 * build, so a page can never ship an untranslated key.
 */
export function useTranslations(lang: Lang) {
  return (key: string): string => {
    const value = lookup(lang, key);
    if (value === undefined) {
      throw new Error(`[i18n] Missing "${key}" for "${lang}"`);
    }
    return value;
  };
}

/** Add the language prefix to an internal path ("/about" → "/es/about"). */
export function localizePath(path: string, lang: Lang): string {
  const clean = path.replace(LANG_PREFIX, "") || "/";
  if (lang === DEFAULT_LANG) return clean;
  return clean === "/" ? `/${lang}/` : `/${lang}${clean}`;
}

/** The same page in another language. */
export const switchLang = (url: URL, lang: Lang) =>
  localizePath(url.pathname, lang);
