import Link from 'next/link';
import { getAllArticles, getFeaturedArticles } from '@/lib/content';

export default function HomePage() {
  const featured = getFeaturedArticles();
  const articles = getAllArticles();
  const hero = featured[0] ?? articles[0];

  return (
    <>
      <section className="hero">
        <div className="hero-left">
          <div className="hero-eyebrow">Vol. 01 — Jewelry & Metalwork — Est. 2024</div>
          <h1 className="hero-headline">
            Documenting the <em>systems</em> behind how things are made.
          </h1>
          <p className="hero-sub">
            FOTWRLD is a long-form research archive dedicated to global production systems — the tools,
            processes, and minds behind the objects that define our material world.
          </p>
          <div className="hero-stats">
            <div>
              <span className="stat-num">{articles.length}</span>
              <span className="stat-label">Case Studies</span>
            </div>
            <div>
              <span className="stat-num">9</span>
              <span className="stat-label">Countries</span>
            </div>
            <div>
              <span className="stat-num">3</span>
              <span className="stat-label">Industries</span>
            </div>
          </div>
        </div>
        <div className="hero-right">
          <div className="hero-featured-tag">Featured Case Study</div>
          <h2 className="hero-featured-title">{hero.title}</h2>
          <div className="hero-featured-meta">{hero.location} — {hero.industry} — {hero.method}</div>
        </div>
      </section>

      <section className="section container">
        <div className="section-header">
          <span className="section-title">Featured Entries</span>
          <Link href="/archive" className="section-link">View Full Archive</Link>
        </div>
        <div className="featured-grid">
          {featured.slice(0, 3).map((article, index) => (
            <Link href={`/archive/${article.slug}`} className={`featured-card ${index === 0 ? 'card-large' : ''}`} key={article.slug}>
              <div className="card-tag">{article.industry} · {article.location.split(',')[0]}</div>
              <div className="card-image-placeholder" />
              <h3 className="card-title">{article.title}</h3>
              <p className="card-excerpt">{article.excerpt}</p>
              <div className="card-footer">
                <span>{article.location}</span>
                <span>{article.readTime}</span>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <section className="section container">
        <div className="section-header">
          <span className="section-title">From the Factory Floor</span>
          <Link href="/archive" className="section-link">All Entries</Link>
        </div>
        <div className="floor-list">
          {articles.map((article, index) => (
            <Link href={`/archive/${article.slug}`} className="floor-item" key={article.slug}>
              <span className="floor-index">{String(index + 1).padStart(3, '0')}</span>
              <div>
                <div className="floor-title">{article.title}</div>
                <small>{article.subject}</small>
              </div>
              <div className="floor-tags">
                <span className="tag">{article.industry}</span>
                <span className="tag">{article.method}</span>
              </div>
              <div className="floor-meta">{article.location}<br />{article.published}</div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
