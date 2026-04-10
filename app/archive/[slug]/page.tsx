import { notFound } from 'next/navigation';
import { getAllArticles, getArticleBySlug, getArticleSlugs } from '@/lib/content';

export function generateStaticParams() {
  return getArticleSlugs().map((slug) => ({ slug: slug.replace(/\.md$/, '') }));
}

export default function ArticlePage({ params }: { params: { slug: string } }) {
  try {
    const article = getArticleBySlug(params.slug);
    const related = getAllArticles().filter((item) => item.slug !== article.slug).slice(0, 2);

    return (
      <div className="container page-shell">
        <div className="article-header-block">
          <div className="eyebrow">Case Study — {article.industry} — {article.location}</div>
          <h1 className="article-title">{article.title}</h1>
          <div className="article-meta-grid">
            <div><strong>Subject</strong><span>{article.subject}</span></div>
            <div><strong>Discipline</strong><span>{article.discipline}</span></div>
            <div><strong>Location</strong><span>{article.location}</span></div>
            <div><strong>Published</strong><span>{article.published}</span></div>
            <div><strong>Read time</strong><span>{article.readTime}</span></div>
          </div>
        </div>

        <div className="article-layout">
          <article className="article-prose" dangerouslySetInnerHTML={{ __html: article.contentHtml }} />
          <aside className="article-sidebar">
            <div className="sidebar-card">
              <div className="sidebar-title">Archive Data</div>
              <div className="sidebar-item"><strong>ID</strong><span>{article.archiveId}</span></div>
              <div className="sidebar-item"><strong>Industry</strong><span>{article.industry}</span></div>
              <div className="sidebar-item"><strong>Method</strong><span>{article.method}</span></div>
              <div className="sidebar-item"><strong>Location</strong><span>{article.location}</span></div>
            </div>
            <div className="sidebar-card">
              <div className="sidebar-title">Related Entries</div>
              {related.map((item) => (
                <a key={item.slug} href={`/archive/${item.slug}`} className="related-link">
                  {item.title}
                </a>
              ))}
            </div>
          </aside>
        </div>
      </div>
    );
  } catch {
    notFound();
  }
}
