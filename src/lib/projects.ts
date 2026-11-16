import { getCollection, type CollectionEntry } from "astro:content";
import type { Lang } from "@/i18n";

export type ProjectData = CollectionEntry<"projects">["data"];

export type LocalizedProject = {
  id: string;
  data: ProjectData;
  /** Entry whose MDX body is the devlog for this language. */
  source: CollectionEntry<"projects"> | CollectionEntry<"projectsEs">;
};

type Translation = CollectionEntry<"projectsEs">["data"];

/** Override text fields of objects matched by position. */
const mergeByIndex = <T extends object>(
  base: T[] | undefined,
  text: Partial<T>[] | undefined,
): T[] | undefined => {
  if (!base) return base;
  if (!text) return base;
  if (text.length !== base.length) {
    throw new Error(
      `[projects] Spanish list has ${text.length} items, English has ${base.length}`,
    );
  }
  return base.map((item, index) => ({ ...item, ...text[index] }));
};

const applyTranslation = (data: ProjectData, es: Translation): ProjectData => ({
  ...data,
  title: es.title ?? data.title,
  description: es.description,
  tags: es.tags ?? data.tags,
  overview: es.overview ?? data.overview,
  contribution: es.contribution ?? data.contribution,
  highlights: es.highlights ?? data.highlights,
  technologies: es.technologies ?? data.technologies,
  challenges: es.challenges ?? data.challenges,
  technicalDecisions: es.technicalDecisions ?? data.technicalDecisions,
  controls: es.controls ?? data.controls,
  links: mergeByIndex(data.links, es.links),
  previews: mergeByIndex(data.previews, es.previews),
});

/**
 * Every project in the given language, sorted by `order`. A Spanish build
 * fails if a project has no translation, so no page mixes languages.
 */
export async function getProjects(lang: Lang): Promise<LocalizedProject[]> {
  const projects = await getCollection("projects");
  const translations = lang === "es" ? await getCollection("projectsEs") : [];

  return projects
    .map((entry) => {
      if (lang === "en")
        return { id: entry.id, data: entry.data, source: entry };
      const es = translations.find((item) => item.id === entry.id);
      if (!es) {
        throw new Error(
          `[projects] "${entry.id}" has no Spanish translation in src/content/projects-es/`,
        );
      }
      return {
        id: entry.id,
        data: applyTranslation(entry.data, es.data),
        // Projects without a written devlog keep the (empty) English body.
        source: es.body?.trim() ? es : entry,
      };
    })
    .sort((a, b) => a.data.order - b.data.order);
}
