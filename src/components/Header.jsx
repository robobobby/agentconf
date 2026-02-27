export default function Header({ onBestPractices }) {
  return (
    <header className="header">
      <h1>AgentConf</h1>
      <p>Generate context files for every AI coding tool — from one config.</p>
      <div className="header-actions">
        <button className="btn-link" onClick={onBestPractices}>
          📖 Best Practices
        </button>
      </div>
    </header>
  )
}
