import Link from 'next/link';
import { getAllArticles } from '@/lib/content';

export default function ArchivePage() {
  const articles = getAllArticles();

  return (
    <div className="container page-shell">
      <div className="archive-header">
        <div className="eyebrow">Research Archive — Vol. 01</div>
        <h1 className="page-title">The Complete Archive.</h1>
        <p className="page-subtitle">Each entry is a complete record of one maker, one process, one place.</p>
      </div>

      <div className="archive-table">
        <div className="archive-head row">
          <span>#</span>
          <span>Subject / Title</span>
          <span>Industry</span>
          <span>Method</span>
          <span>Location</span>
          <span></span>
        </div>
        {articles.map((article, index) => (
          <Link href={`/archive/${article.slug}`} className="archive-row row" key={article.slug}>
            <span>{String(index + 1).padStart(3, '0')}</span>
            <span>{article.title}<small>{article.subject}</small></span>
            <span>{article.industry}</span>
            <span>{article.method}</span>
            <span>{article.location}</span>
            <span>Read →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
