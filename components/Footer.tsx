import Link from 'next/link';

export function Footer() {
  return (
    <footer className="site-footer">
      <div className="container footer-top">
        <div>
          <div className="footer-logo">FOTWRLD</div>
          <div className="footer-tagline">Documenting the systems behind how things are made.</div>
        </div>
        <div>
          <div className="footer-col-title">Navigate</div>
          <div className="footer-links">
            <Link href="/">Home</Link>
            <Link href="/archive">Archive</Link>
            <Link href="/about">About</Link>
            <Link href="/submit">Submit</Link>
          </div>
        </div>
        <div>
          <div className="footer-col-title">Industries</div>
          <div className="footer-links">
            <span>Jewelry</span>
            <span>Metalwork</span>
            <span>Textile</span>
          </div>
        </div>
        <div>
          <div className="footer-col-title">Connect</div>
          <div className="footer-links">
            <span>Instagram</span>
            <span>Newsletter</span>
            <span>Press</span>
          </div>
        </div>
      </div>
      <div className="container footer-bottom">© 2025 FOTWRLD — Factories of the World.</div>
    </footer>
  );
}
