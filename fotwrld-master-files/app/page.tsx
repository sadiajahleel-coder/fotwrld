import Link from 'next/link';
import { getAllArticles, getFeaturedArticles } from '@/lib/content';

export default function HomePage() {
  const articles = getAllArticles();
  const featured = getFeaturedArticles();
  const mainReport = articles.find((article) => article.slug === 'fotwrld-report-overview');

  return (
    <>
      <section className="hero">
        <div className="hero-left">
          <div className="hero-eyebrow">FOTWRLD Research Lab — Kaduna, Nigeria</div>
          <h1 className="hero-headline">
            Building the <em>infrastructure</em> layer for Africa&apos;s production economy.
          </h1>
          <p className="hero-sub">
            FOTWRLD documents, structures, and connects production systems across Africa —
            transforming artisans into visible, investable economic actors.
          </p>

          <div className="hero-stats">
            <div>
              <span className="stat-num">{articles.length}</span>
              <span className="stat-label">Published Entries</span>
            </div>
            <div>
              <span className="stat-num">2025–2026</span>
              <span className="stat-label">Research Period</span>
            </div>
            <div>
              <span className="stat-num">Kaduna</span>
              <span className="stat-label">Institutional Base</span>
            </div>
          </div>
        </div>

        <div className="hero-right">
          <div className="hero-featured-tag">Research Platform</div>
          <h2 className="hero-featured-title">
            Research. Documentation. Institutional Access. Production Intelligence.
          </h2>
          <div className="hero-featured-meta">
            Lead Researcher — Halima Abdul (Sadia)
            <br />
            NCMM Kaduna / ABU Zaria
          </div>
        </div>
      </section>

      <section className="section container">
        <div className="editorial-note">
          <h2 className="editorial-title">
            Production systems exist without visibility, structure, or investment pathways.
          </h2>
          <p className="editorial-text">
            FOTWRLD builds the missing infrastructure — documentation, positioning, research depth,
            and institutional connection — so African artisans and micro-factories can be understood
            as real economic systems.
          </p>
        </div>
      </section>

      {mainReport && (
        <section className="section container">
          <div className="section-header">
            <span className="section-title">The Factories of The World Report</span>
            <Link href={`/archive/${mainReport.slug}`} className="section-link">
              Read Report
            </Link>
          </div>

          <div className="featured-grid">
            <Link href={`/archive/${mainReport.slug}`} className="featured-card card-large">
              <div className="card-tag">Research Report · Nigeria</div>
              <div className="card-image-placeholder" />
              <h3 className="card-title">{mainReport.title}</h3>
              <p className="card-excerpt">{mainReport.excerpt}</p>
              <div className="card-footer">
                <span>{mainReport.location}</span>
                <span>{mainReport.readTime ?? 'Report Series'}</span>
              </div>
            </Link>

            <div className="featured-card">
              <div className="card-tag">Authority</div>
              <h3 className="card-title">A structured research publication</h3>
              <p className="card-excerpt">
                A multi-part publication documenting production systems, institutional gaps,
                and economic opportunity across Nigeria&apos;s artisanal sector.
              </p>
              <div className="card-footer">
                <span>Lead Researcher</span>
                <span>Halima Abdul (Sadia)</span>
              </div>
            </div>

            <div className="featured-card">
              <div className="card-tag">Access</div>
              <h3 className="card-title">Start with the overview</h3>
              <p className="card-excerpt">
                Use the main report page as the central reading point, then move through the
                linked sections for the full publication.
              </p>
              <div className="card-footer">
                <span>Main Entry</span>
                <span>Guided Reading</span>
              </div>
            </div>
          </div>
        </section>
      )}

      <section className="section container">
        <div className="section-header">
          <span className="section-title">Featured Entries</span>
          <Link href="/archive" className="section-link">View Archive</Link>
        </div>

        <div className="featured-grid">
          {featured.slice(0, 3).map((article, index) => (
            <Link
              href={`/archive/${article.slug}`}
              className={`featured-card ${index === 0 ? 'card-large' : ''}`}
              key={article.slug}
            >
              <div className="card-tag">
                {article.industry} · {article.location.split(',')[0]}
              </div>
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
                <small>{article.subject || article.excerpt}</small>
              </div>
              <div className="floor-tags">
                <span className="tag">{article.publicLabel}</span>
              </div>
              <div className="floor-meta">
                {article.location}
                <br />
                {article.published}
              </div>
            </Link>
          ))}
        </div>
      </section>
    </>
  );
}
