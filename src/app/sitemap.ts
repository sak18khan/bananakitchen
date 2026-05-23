import { MetadataRoute } from 'next';
import { getPastCombos } from '@/lib/db';
import { getISTDateString } from '@/lib/timezone';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://bananakitchen.in';
  const todayStr = getISTDateString();
  const pastCombos = await getPastCombos(todayStr);

  const staticPaths = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 1.0,
    },
    {
      url: `${baseUrl}/archive`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/submit`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.5,
    },
    {
      url: `${baseUrl}/leaderboard`,
      lastModified: new Date(),
      changeFrequency: 'daily' as const,
      priority: 0.7,
    },
  ];

  const dynamicPaths = pastCombos.map((combo) => ({
    url: `${baseUrl}/archive/${combo.id}`,
    lastModified: new Date(combo.createdAt || Date.now()),
    changeFrequency: 'weekly' as const,
    priority: 0.6,
  }));

  return [...staticPaths, ...dynamicPaths];
}
