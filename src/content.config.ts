import { glob } from "astro/loaders";
import { defineCollection } from "astro:content";
import { z } from "astro/zod";

/** Projects in English: the complete record, including media and order. */
const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    engine: z.enum(["Unity", "Unreal Engine", "Phaser", "C++"]),
    image: z.string(),
    /** Short muted loop shown on card hover (.mp4 with a .webm twin). */
    video: z.string().optional(),
    /** Ambient identity cue behind the devlog header and the card text. */
    ambient: z
      .enum(["space", "arcane", "strata", "pixel", "duo", "wisp"])
      .optional(),
    hero: z.string().optional(),
    link: z.string().optional(),
    links: z
      .array(
        z.object({
          label: z.string(),
          url: z.string(),
          kind: z.string().optional(),
          thumbnail: z.string().optional(),
          alt: z.string().optional(),
        }),
      )
      .optional(),
    previews: z
      .array(
        z.object({
          src: z.string(),
          alt: z.string(),
          caption: z.string().optional(),
        }),
      )
      .optional(),
    overview: z.string().optional(),
    contribution: z.array(z.string()).optional(),
    highlights: z.array(z.string()).optional(),
    technologies: z.array(z.string()).optional(),
    challenges: z.array(z.string()).optional(),
    technicalDecisions: z.array(z.string()).optional(),
    controls: z.array(z.string()).optional(),
    featured: z.boolean().default(false),
    order: z.number().default(0),
  }),
});

/**
 * Spanish translations. Same file name as the English project; only the
 * text is repeated. `links` and `previews` are matched to the English ones
 * by position and only override their text fields. The MDX body, when
 * present, replaces the English devlog.
 */
const projectsEs = defineCollection({
  loader: glob({ base: "./src/content/projects-es", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string().optional(),
    description: z.string(),
    tags: z.array(z.string()).optional(),
    links: z
      .array(
        z.object({ label: z.string().optional(), alt: z.string().optional() }),
      )
      .optional(),
    previews: z
      .array(
        z.object({
          alt: z.string().optional(),
          caption: z.string().optional(),
        }),
      )
      .optional(),
    overview: z.string().optional(),
    contribution: z.array(z.string()).optional(),
    highlights: z.array(z.string()).optional(),
    technologies: z.array(z.string()).optional(),
    challenges: z.array(z.string()).optional(),
    technicalDecisions: z.array(z.string()).optional(),
    controls: z.array(z.string()).optional(),
  }),
});

export const collections = { projects, projectsEs };
