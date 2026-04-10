import fs from 'fs';
import path from 'path';

export type ArticleMeta = {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  industry: string;
  method: string;
  location: string;
  readTime?: string;
  published: string;
  subject?: string;
  discipline?: string;
  featured?: boolean;
  archiveId?: string;
  content: string;
  publicLabel: string;
};

const contentDirectory = path.join(process.cwd(), 'content', 'articles');

function parseFrontmatter(fileContent: string) {
  const match = fileContent.match(/^---\n([\s\S]*?)\n---\n?([\s\S]*)$/);
  if (!match) {
    return { data: {}, content: fileContent };
  }

  const [, frontmatter, content] = match;
  const data: Record<string, any> = {};

  frontmatter.split('\n').forEach((line) => {
    const separatorIndex = line.indexOf(':');
    if (separatorIndex === -1) return;

    const key = line.slice(0, separatorIndex).trim();
    let value: string | boolean = line.slice(separatorIndex + 1).trim();

    if (
      (typeof value === 'string' && value.startsWith('"') && value.endsWith('"')) ||
      (typeof value === 'string' && value.startsWith("'") && value.endsWith("'"))
    ) {
      value = value.slice(1, -1);
    }

    if (value === 'true') value = true;
    if (value === 'false') value = false;

    data[key] = value;
  });

  return { data, content };
}

function getPublicLabel(category: string) {
  if (category === 'The Factories of The World Report') return 'Report';
  if (category === 'Factory Profile') return 'Profile';
  if (category === 'System Essay') return 'Essay';
  return 'Entry';
}

function getGlobalReferenceBlock(meta: Partial<ArticleMeta>) {
  const isReport = meta.category === 'The Factories of The World Report';

  const base = `
---

## References & Contact

Website: [www.fotwrld.com](https://www.fotwrld.com)  
Email: [fotwrldinfo@gmail.com](mailto:fotwrldinfo@gmail.com)  
Location: No. 33 Ali Akilu Road, Kaduna, Nigeria  
Platform: Factories of The World (FOTWRLD)
`;

  const reportExtra = isReport
    ? `

### Research Attribution

**Lead Researcher:** Halima Abdul (Sadia)  
**Organisation:** Factories of The World (FOTWRLD)
`
    : '';

  return `${base}${reportExtra}`;
}

function getReportNavigation(slug: string, category?: string) {
  if (category !== 'The Factories of The World Report') return '';

  const reportOrder = [
    { slug: 'fotwrld-report-overview', title: 'Overview' },
    { slug: 'fotwrld-foundations', title: 'Foundations' },
    { slug: 'fotwrld-methodology-implementation', title: 'Methodology & Implementation' },
    { slug: 'fotwrld-insights-impact', title: 'Insights, Impact & Conclusion' },
    { slug: 'fotwrld-engine-room', title: 'The Engine Room' },
  ];

  const currentIndex = reportOrder.findIndex((item) => item.slug === slug);
  if (currentIndex === -1) return '';

  const previous = reportOrder[currentIndex - 1];
  const next = reportOrder[currentIndex + 1];

  return `
---

## Continue Reading

${previous ? `← [${previous.title}](/archive/${previous.slug})  ` : ''}
${next ? `Next → [${next.title}](/archive/${next.slug})` : ''}
`;
}

function enrichContent(meta: Partial<ArticleMeta>, content: string, slug: string) {
  const navigation = getReportNavigation(slug, meta.category);
  const references = getGlobalReferenceBlock(meta);

  return `${content.trim()}\n${navigation}\n${references}\n`;
}

export function getAllArticles(): ArticleMeta[] {
  if (!fs.existsSync(contentDirectory)) return [];

  const fileNames = fs.readdirSync(contentDirectory);

  const articles = fileNames
    .filter((fileName) => fileName.endsWith('.md'))
    .map((fileName) => {
      const slug = fileName.replace(/\.md$/, '');
      const fullPath = path.join(contentDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = parseFrontmatter(fileContents);

      return {
        slug,
        title: data.title ?? slug,
        excerpt: data.excerpt ?? '',
        category: data.category ?? 'General',
        industry: data.industry ?? 'Research',
        method: data.method ?? 'Field Study',
        location: data.location ?? 'Kaduna, Nigeria',
        readTime: data.readTime ?? '',
        published: data.published ?? '',
        subject: data.subject ?? '',
        discipline: data.discipline ?? '',
        featured: data.featured ?? false,
        archiveId: data.archiveId ?? '',
        publicLabel: getPublicLabel(data.category ?? 'General'),
        content: enrichContent(data, content, slug),
      };
    });

  return articles.sort((a, b) => b.published.localeCompare(a.published));
}

export function getFeaturedArticles(): ArticleMeta[] {
  return getAllArticles().filter((article) => article.featured);
}

export function getArticleBySlug(slug: string): ArticleMeta | null {
  const articles = getAllArticles();
  return articles.find((article) => article.slug === slug) ?? null;
}

export function getArticlesByCategory(category: string): ArticleMeta[] {
  return getAllArticles().filter((article) => article.category === category);
}
