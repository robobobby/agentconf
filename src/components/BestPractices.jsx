export default function BestPractices({ onClose }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>×</button>
        <h2>Best Practices for Agent Context Files</h2>
        <p style={{ marginBottom: '1rem' }}>
          Insights from the <em>"Codified Context"</em> paper (arXiv 2602.20478, Feb 2026)
          and the <em>"Configuring Agentic AI Coding Tools"</em> study.
        </p>

        <h3>🏛️ Constitution Pattern</h3>
        <p>
          Define your project's "hot-memory constitution" — the rules every AI agent
          reads before touching your code. This is your <code>AGENTS.md</code>. Keep it
          concise (&lt;500 lines), authoritative, and always up to date.
        </p>

        <h3>📂 What to Include</h3>
        <ul>
          <li><strong>Tech stack</strong> — language, framework, key dependencies</li>
          <li><strong>Commands</strong> — install, dev, test, build, deploy</li>
          <li><strong>Conventions</strong> — code style, naming, file organization</li>
          <li><strong>Architecture</strong> — key patterns, directory structure for larger projects</li>
          <li><strong>Safety rules</strong> — what to never do (commit secrets, delete prod data)</li>
          <li><strong>Testing expectations</strong> — what to test, coverage targets</li>
        </ul>

        <h3>⚡ What NOT to Include</h3>
        <ul>
          <li>Verbose tutorials or documentation — agents read docs themselves</li>
          <li>Information that changes daily — use retrieval hooks instead</li>
          <li>Secrets or credentials — even in examples</li>
          <li>Tool-specific syntax in a universal file (keep AGENTS.md tool-agnostic)</li>
        </ul>

        <h3>🔄 Cross-Tool Strategy</h3>
        <p>
          The study found 60,000+ repos using agent context files. The emerging pattern:
        </p>
        <ul>
          <li><strong>AGENTS.md</strong> — universal source of truth (tool-agnostic)</li>
          <li><strong>Tool-specific files</strong> — adapt format/syntax for each tool</li>
          <li><strong>Keep them in sync</strong> — AgentConf generates from one config to avoid drift</li>
        </ul>

        <h3>🧠 Retrieval Hooks</h3>
        <p>
          For large codebases, don't put everything in the context file. Instead, use
          retrieval hooks: point agents to where they can <em>find</em> information
          (e.g., "Architecture decisions are in <code>docs/decisions/</code>").
        </p>

        <h3>👥 Team Scale Patterns</h3>
        <ul>
          <li><strong>Solo:</strong> Minimal file, focus on commands and conventions</li>
          <li><strong>Small team:</strong> Add PR workflow, branch strategy, code review expectations</li>
          <li><strong>Large team:</strong> Add architecture boundaries, module ownership, escalation paths</li>
        </ul>

        <h3>📈 The Key Finding</h3>
        <p>
          Projects with well-maintained agent context files saw <strong>significantly fewer
          AI-generated errors</strong> and <strong>faster iteration cycles</strong>. The investment
          in a good context file pays for itself within the first week.
        </p>
      </div>
    </div>
  )
}
