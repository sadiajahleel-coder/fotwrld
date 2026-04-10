import Link from 'next/link';
import { getAllArticles, getArticlesByCategory } from '@/lib/content';

export default function ArchivePage() {
  const reports = getArticlesByCategory('The Factories of The World Report');
  const profiles = getArticlesByCategory('Factory Profile');
  const essays = getArticlesByCategory('System Essay');
  const allArticles = getAllArticles();
  const otherEntries = allArticles.filter(
    (article) =>
      article.category !== 'The Factories of The World Report' &&
      article.category !== 'Factory Profile' &&
      article.category !== 'System Essay'
  );

  return (
    <div className="container">
      <header className="archive-header">
        <div className="archive-kicker">FOTWRLD Archive</div>
        <h1 className="archive-headline">A structured archive of production intelligence.</h1>
        <p className="archive-sub">
          Browse research reports, factory profiles, and essays documenting Africa&apos;s production economy.
        </p>
      </header>

      <section className="section">
        <div className="section-header">
          <span className="section-title">Research Reports</span>
        </div>
        <div className="floor-list">
          {reports.map((article, index) => (
            <Link href={`/archive/${article.slug}`} className="floor-item" key={article.slug}>
              <span className="floor-index">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <div className="floor-title">{article.title}</div>
                <small>{article.excerpt}</small>
              </div>
              <div className="floor-tags">
                <span className="tag">Report</span>
              </div>
              <div className="floor-meta">{article.published}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <span className="section-title">Factory Profiles</span>
        </div>
        <div className="floor-list">
          {profiles.map((article, index) => (
            <Link href={`/archive/${article.slug}`} className="floor-item" key={article.slug}>
              <span className="floor-index">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <div className="floor-title">{article.title}</div>
                <small>{article.subject || article.excerpt}</small>
              </div>
              <div className="floor-tags">
                <span className="tag">Profile</span>
              </div>
              <div className="floor-meta">{article.published}</div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="section-header">
          <span className="section-title">System Essays</span>
        </div>
        <div className="floor-list">
          {essays.map((article, index) => (
            <Link href={`/archive/${article.slug}`} className="floor-item" key={article.slug}>
              <span className="floor-index">{String(index + 1).padStart(2, '0')}</span>
              <div>
                <div className="floor-title">{article.title}</div>
                <small>{article.excerpt}</small>
              </div>
              <div className="floor-tags">
                <span className="tag">Essay</span>
              </div>
              <div className="floor-meta">{article.published}</div>
            </Link>
          ))}
        </div>
      </section>

      {otherEntries.length > 0 && (
        <section className="section">
          <div className="section-header">
            <span className="section-title">Other Entries</span>
          </div>
          <div className="floor-list">
            {otherEntries.map((article, index) => (
              <Link href={`/archive/${article.slug}`} className="floor-item" key={article.slug}>
                <span className="floor-index">{String(index + 1).padStart(2, '0')}</span>
                <div>
                  <div className="floor-title">{article.title}</div>
                  <small>{article.excerpt}</small>
                </div>
                <div className="floor-tags">
                  <span className="tag">{article.publicLabel}</span>
                </div>
                <div className="floor-meta">{article.published}</div>
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
