import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    tags: z.array(z.string()),
    engine: z.enum(["Unity", "Unreal Engine", "Phaser", "C++"]),
    image: z.string(),
    gif: z.string().optional(),
    link: z.string().optional(),
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

export const collections = { projects };
