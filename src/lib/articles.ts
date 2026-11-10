import { getCollection } from 'astro:content';

// Articles publiés (les brouillons sont exclus), du plus récent au plus ancien.
export async function articlesPublies() {
  const articles = await getCollection('articles', ({ data }) => !data.draft);
  return articles.sort((a, b) => b.data.date.getTime() - a.data.date.getTime());
}
