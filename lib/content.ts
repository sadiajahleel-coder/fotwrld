import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { remark } from 'remark';
import html from 'remark-html';

export type ArticleMeta = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  industry: string;
  method: string;
  location: string;
  readTime: string;
  published: string;
  subject: string;
  discipline: string;
  featured?: boolean;
  archiveId?: string;
};

export type Article = ArticleMeta & {
  contentHtml: string;
};

const articlesDirectory = path.join(process.cwd(), 'content/articles');

export function getArticleSlugs(): string[] {
  return fs.readdirSync(articlesDirectory).filter((file) => file.endsWith('.md'));
}

export function getArticleBySlug(slug: string): Article {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = path.join(articlesDirectory, `${realSlug}.md`);
  const fileContents = fs.readFileSync(fullPath, 'utf8');
  const { data, content } = matter(fileContents);

  const contentHtml = remark().use(html).processSync(content).toString();

  return {
    slug: realSlug,
    title: data.title,
    excerpt: data.excerpt,
    category: data.category,
    industry: data.industry,
    method: data.method,
    location: data.location,
    readTime: data.readTime,
    published: data.published,
    subject: data.subject,
    discipline: data.discipline,
    featured: data.featured ?? false,
    archiveId: data.archiveId ?? '',
    contentHtml,
  };
}

export function getAllArticles(): ArticleMeta[] {
  return getArticleSlugs()
    .map((slug) => getArticleBySlug(slug))
    .map(({ contentHtml, ...meta }) => meta)
    .sort((a, b) => new Date(b.published).getTime() - new Date(a.published).getTime());
}

export function getFeaturedArticles(): ArticleMeta[] {
  return getAllArticles().filter((article) => article.featured);
}
