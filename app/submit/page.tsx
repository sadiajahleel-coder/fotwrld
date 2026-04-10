export default function SubmitPage() {
  return (
    <div className="container page-shell prose-page">
      <div className="eyebrow">Submissions & Collaboration</div>
      <h1 className="page-title">Propose a case study.</h1>
      <p className="page-subtitle">Drop in your real form provider later. This page is already routed and styled.</p>
      <div className="submit-grid">
        <div>
          <h3>Who we document</h3>
          <ul className="criteria-list">
            <li>You have a defined, documentable production process.</li>
            <li>You are willing to allow extended documentation.</li>
            <li>Your work represents a distinct approach to your discipline.</li>
            <li>You are not seeking marketing content.</li>
          </ul>
        </div>
        <form className="submit-form">
          <input placeholder="Your Name" />
          <input placeholder="Email Address" />
          <input placeholder="Location" />
          <input placeholder="Discipline / Industry" />
          <textarea placeholder="Describe your process or project" rows={6} />
          <button type="button">Submit Proposal →</button>
        </form>
      </div>
    </div>
  );
}
