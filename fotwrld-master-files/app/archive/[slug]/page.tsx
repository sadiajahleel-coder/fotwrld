import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getAllArticles, getArticleBySlug } from '@/lib/content';

type PageProps = {
  params: {
    slug: string;
  };
};

function escapeHtml(value: string) {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}

function applyInlineMarkdown(text: string) {
  return text
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, (_match, label, href) => {
      const safeHref =
        href.startsWith('http') || href.startsWith('/') || href.startsWith('mailto:')
          ? href
          : `https://${href}`;
      const external = safeHref.startsWith('http');
      return `<a href="${safeHref}" ${external ? 'target="_blank" rel="noopener noreferrer"' : ''}>${label}</a>`;
    })
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt, src) => {
      const safeSrc = src.startsWith('http') || src.startsWith('/') ? src : `https://${src}`;
      return `<img src="${safeSrc}" alt="${alt}" class="article-image" />`;
    })
    .replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>')
    .replace(/\*([^*]+)\*/g, '<em>$1</em>')
    .replace(/`([^`]+)`/g, '<code>$1</code>');
}

function markdownToHtml(markdown: string) {
  const lines = markdown.split('\n');
  const htmlParts: string[] = [];
  let inList = false;
  let inBlockquote = false;

  const closeList = () => {
    if (inList) {
      htmlParts.push('</ul>');
      inList = false;
    }
  };

  const closeBlockquote = () => {
    if (inBlockquote) {
      htmlParts.push('</blockquote>');
      inBlockquote = false;
    }
  };

  for (const rawLine of lines) {
    const line = rawLine.trim();

    if (!line) {
      closeList();
      closeBlockquote();
      continue;
    }

    if (line === '---') {
      closeList();
      closeBlockquote();
      htmlParts.push('<hr />');
      continue;
    }

    if (line.startsWith('## Continue Reading')) {
      closeList();
      closeBlockquote();
      htmlParts.push('<div class="report-nav"><h2>Continue Reading</h2>');
      continue;
    }

    if (line.startsWith('## References & Contact')) {
      closeList();
      closeBlockquote();
      htmlParts.push('<div class="references-block"><h2>References & Contact</h2>');
      continue;
    }

    if (line.startsWith('### Research Attribution')) {
      htmlParts.push('<h3>Research Attribution</h3>');
      continue;
    }

    if (line.startsWith('### Full Report')) {
      htmlParts.push('<h3>Full Report</h3>');
      continue;
    }

    if (line.startsWith('## ')) {
      closeList();
      closeBlockquote();
      htmlParts.push(`<h2>${applyInlineMarkdown(escapeHtml(line.replace('## ', '')))}</h2>`);
      continue;
    }

    if (line.startsWith('### ')) {
      closeList();
      closeBlockquote();
      htmlParts.push(`<h3>${applyInlineMarkdown(escapeHtml(line.replace('### ', '')))}</h3>`);
      continue;
    }

    if (line.startsWith('- ')) {
      closeBlockquote();
      if (!inList) {
        htmlParts.push('<ul>');
        inList = true;
      }
      htmlParts.push(`<li>${applyInlineMarkdown(escapeHtml(line.replace('- ', '')))}</li>`);
      continue;
    }

    if (line.startsWith('> ')) {
      closeList();
      if (!inBlockquote) {
        htmlParts.push('<blockquote>');
        inBlockquote = true;
      }
      htmlParts.push(`<p>${applyInlineMarkdown(escapeHtml(line.replace('> ', '')))}</p>`);
      continue;
    }

    closeList();
    closeBlockquote();
    htmlParts.push(`<p>${applyInlineMarkdown(escapeHtml(line))}</p>`);
  }

  closeList();
  closeBlockquote();

  let html = htmlParts.join('\n');
  html = html.replace(/(<div class="report-nav">[\s\S]*?)(?=<hr \/>|$)/g, '$1</div>');
  html = html.replace(/(<div class="references-block">[\s\S]*?)(?=$)/g, '$1</div>');

  return html;
}

function getVisibleMeta(article: ReturnType<typeof getArticleBySlug>) {
  if (!article) return [];

  return [
    article.location ? { label: 'Location', value: article.location } : null,
    article.industry ? { label: 'Industry', value: article.industry } : null,
    article.published ? { label: 'Published', value: article.published } : null,
  ].filter(Boolean) as { label: string; value: string }[];
}

function getPublicCategory(category: string) {
  if (category === 'The Factories of The World Report') return 'Report';
  if (category === 'Factory Profile') return 'Profile';
  if (category === 'System Essay') return 'Essay';
  return 'Entry';
}

export function generateStaticParams() {
  return getAllArticles().map((article) => ({
    slug: article.slug,
  }));
}

export default function ArticlePage({ params }: PageProps) {
  const article = getArticleBySlug(params.slug);

  if (!article) notFound();

  const allArticles = getAllArticles();
  const related = allArticles
    .filter(
      (entry) =>
        entry.slug !== article.slug &&
        (entry.category === article.category || entry.industry === article.industry)
    )
    .slice(0, 3);

  const visibleMeta = getVisibleMeta(article);
  const publicCategory = getPublicCategory(article.category);
  const isProfile = article.category === 'Factory Profile';
  const isReport = article.category === 'The Factories of The World Report';

  return (
    <div className="container">
      <header className={`article-header article-header-clean ${isProfile ? 'profile-header' : ''}`}>
        <div className="article-breadcrumb">
          <Link href="/">Home</Link>
          <span>/</span>
          <Link href="/archive">Archive</Link>
        </div>

        <div className="article-category">{publicCategory}</div>
        <h1 className="article-headline">{article.title}</h1>
        {article.excerpt ? <p className="article-intro">{article.excerpt}</p> : null}

        {isProfile && (
          <div className="profile-intro-card">
            <div className="profile-intro-label">Factory Profile</div>
            <div className="profile-intro-grid">
              <div className="profile-intro-item">
                <span className="meta-label">Subject</span>
                <span className="meta-value">{article.subject || 'Profile Subject'}</span>
              </div>
              <div className="profile-intro-item">
                <span className="meta-label">Location</span>
                <span className="meta-value">{article.location}</span>
              </div>
              <div className="profile-intro-item">
                <span className="meta-label">Industry</span>
                <span className="meta-value">{article.industry}</span>
              </div>
            </div>
          </div>
        )}

        {!isProfile && visibleMeta.length > 0 && (
          <div className="article-meta-row clean-meta-row">
            {visibleMeta.map((item) => (
              <div className="meta-item" key={item.label}>
                <span className="meta-label">{item.label}</span>
                <span className="meta-value">{item.value}</span>
              </div>
            ))}
          </div>
        )}
      </header>

      <div className={`article-body article-body-polished ${isProfile ? 'article-body-profile' : ''}`}>
        <article
          className={`article-content article-content-polished ${isProfile ? 'article-content-profile' : ''}`}
          dangerouslySetInnerHTML={{ __html: markdownToHtml(article.content) }}
        />

        <aside className="sidebar-sticky">
          <div className="sidebar-block">
            <div className="sidebar-title">{isProfile ? 'Profile Details' : 'Article Details'}</div>
            <div className="sidebar-data">
              <div className="sidebar-datum">
                <span className="meta-label">Type</span>
                <span className="meta-value">{publicCategory}</span>
              </div>
              {article.subject ? (
                <div className="sidebar-datum">
                  <span className="meta-label">Subject</span>
                  <span className="meta-value">{article.subject}</span>
                </div>
              ) : null}
              {article.location ? (
                <div className="sidebar-datum">
                  <span className="meta-label">Location</span>
                  <span className="meta-value">{article.location}</span>
                </div>
              ) : null}
              {isReport ? (
                <div className="sidebar-datum">
                  <span className="meta-label">Lead Researcher</span>
                  <span className="meta-value">Halima Abdul (Sadia)</span>
                </div>
              ) : null}
            </div>
          </div>

          {related.length > 0 && (
            <div className="sidebar-block">
              <div className="sidebar-title">Related Entries</div>
              <ul className="sidebar-toc">
                {related.map((entry) => (
                  <li key={entry.slug}>
                    <Link href={`/archive/${entry.slug}`}>{entry.title}</Link>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </aside>
      </div>
    </div>
  );
}
