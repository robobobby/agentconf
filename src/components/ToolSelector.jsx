import { useState } from 'react'

const TOOLS = [
  { id: 'claude', name: 'Claude Code', file: 'CLAUDE.md', icon: '🤖' },
  { id: 'agents', name: 'AGENTS.md (Universal)', file: 'AGENTS.md', icon: '📋' },
  { id: 'cursor', name: 'Cursor', file: '.cursor/rules/*.mdc', icon: '⚡' },
  { id: 'windsurf', name: 'Windsurf', file: '.windsurf/rules/*.md', icon: '🏄' },
  { id: 'copilot', name: 'GitHub Copilot', file: '.github/copilot-instructions.md', icon: '🐙' },
  { id: 'devin', name: 'Devin', file: 'devin.md', icon: '🧠' },
  { id: 'aider', name: 'Aider', file: '.aider.conf.yml', icon: '🔧' },
  { id: 'codex', name: 'OpenAI Codex CLI', file: 'AGENTS.md', icon: '💻' },
]

export default function ToolSelector({ onNext, initial }) {
  const [selected, setSelected] = useState(initial.length ? initial : ['agents'])

  const toggle = (id) => {
    setSelected(prev =>
      prev.includes(id) ? prev.filter(x => x !== id) : [...prev, id]
    )
  }

  return (
    <div>
      <h2 style={{ marginBottom: '0.5rem' }}>Which tools do you use?</h2>
      <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
        Select all AI coding tools you want to generate config files for.
      </p>
      <div className="tool-grid">
        {TOOLS.map(tool => (
          <div
            key={tool.id}
            className={`card tool-card ${selected.includes(tool.id) ? 'selected' : ''}`}
            onClick={() => toggle(tool.id)}
          >
            {selected.includes(tool.id) && <span className="tool-check">✓</span>}
            <div className="tool-name">{tool.icon} {tool.name}</div>
            <div className="tool-file">{tool.file}</div>
          </div>
        ))}
      </div>
      <div className="btn-row">
        <button
          className="btn btn-primary"
          disabled={selected.length === 0}
          onClick={() => onNext(selected)}
        >
          Continue →
        </button>
      </div>
    </div>
  )
}
