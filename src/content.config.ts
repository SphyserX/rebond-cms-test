import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// Les champs ci-dessous sont les mêmes que dans .pages.yml (mêmes noms, mêmes types).
// Le texte de la page ou de l'article est le contenu Markdown sous le frontmatter
// (champ « body » dans .pages.yml).

const articles = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/articles' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    image: z.string().nullish(),
    draft: z.boolean().default(false),
  }),
});

const pages = defineCollection({
  loader: glob({ pattern: '*.md', base: './src/content/pages' }),
  schema: z.object({
    title: z.string(),
    accroche: z.string(),
    image: z.string().nullish(),
    image_alt: z.string().nullish(),
    bouton_texte: z.string(),
    bouton_lien: z.string(),
  }),
});

export const collections = { articles, pages };
