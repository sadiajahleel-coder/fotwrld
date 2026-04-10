export default function AboutPage() {
  return (
    <div className="container page-shell prose-page">
      <div className="eyebrow">Our Premise</div>
      <h1 className="page-title">Every object has a system.</h1>
      <p className="page-subtitle">
        FOTWRLD is a long-form research archive documenting the production systems, craft knowledge,
        and industrial processes that give the material world its form.
      </p>
      <div className="about-grid">
        <div className="about-card">
          <h3>Mission</h3>
          <p>Long-form documentation of global production.</p>
        </div>
        <div className="about-card">
          <h3>Research</h3>
          <p>A rigorous methodology, not a blog.</p>
        </div>
        <div className="about-card">
          <h3>Position</h3>
          <p>Between journalism and institutional archive.</p>
        </div>
      </div>
    </div>
  );
}
