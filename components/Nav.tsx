import Link from 'next/link';

export function Nav() {
  return (
    <nav className="site-nav">
      <div className="container nav-inner">
        <Link href="/" className="nav-logo">
          FOT<span>WRLD</span>
        </Link>
        <div className="nav-links">
          <Link href="/archive">Archive</Link>
          <Link href="/">Industries</Link>
          <Link href="/about">About</Link>
          <Link href="/submit" className="nav-cta">
            Submit
          </Link>
        </div>
      </div>
    </nav>
  );
}
