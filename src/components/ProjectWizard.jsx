import { useState } from 'react'

const LANGUAGES = ['TypeScript', 'Python', 'Go', 'Rust', 'Java', 'C#', 'Ruby', 'PHP', 'Other']
const FRAMEWORKS = {
  TypeScript: ['React', 'Next.js', 'Vue', 'Svelte', 'Express', 'Fastify', 'Nest.js', 'Hono', 'None'],
  Python: ['Django', 'FastAPI', 'Flask', 'Streamlit', 'None'],
  Go: ['Gin', 'Echo', 'Fiber', 'None'],
  Rust: ['Actix', 'Axum', 'Rocket', 'None'],
  Java: ['Spring Boot', 'Quarkus', 'None'],
  'C#': ['.NET', 'Blazor', 'None'],
  Ruby: ['Rails', 'Sinatra', 'None'],
  PHP: ['Laravel', 'Symfony', 'None'],
  Other: ['None'],
}
const TEST_TOOLS = ['Jest', 'Vitest', 'pytest', 'Go test', 'Mocha', 'Playwright', 'Cypress', 'None']
const CICD = ['GitHub Actions', 'GitLab CI', 'CircleCI', 'Vercel', 'Netlify', 'None']
const PKG_MANAGERS = ['npm', 'pnpm', 'yarn', 'bun', 'pip/uv', 'cargo', 'go mod', 'Other']

export default function ProjectWizard({ onNext, onBack, initial }) {
  const [config, setConfig] = useState(initial || {
    language: 'TypeScript',
    framework: 'React',
    projectType: 'greenfield',
    teamSize: 'solo',
    testTools: [],
    cicd: 'GitHub Actions',
    packageManager: 'npm',
    conventions: '',
    commands: { install: 'npm install', dev: 'npm run dev', test: 'npm test', build: 'npm run build' },
    description: '',
  })

  const update = (key, val) => setConfig(prev => ({ ...prev, [key]: val }))
  const updateCmd = (key, val) => setConfig(prev => ({
    ...prev,
    commands: { ...prev.commands, [key]: val }
  }))

  const toggleTest = (tool) => {
    setConfig(prev => ({
      ...prev,
      testTools: prev.testTools.includes(tool)
        ? prev.testTools.filter(t => t !== tool)
        : [...prev.testTools, tool]
    }))
  }

  return (
    <div>
      <h2 style={{ marginBottom: '1.5rem' }}>Configure your project</h2>

      <div className="form-group">
        <label>Project description</label>
        <div className="hint">Brief description of what you're building (used in generated files)</div>
        <textarea
          rows={2}
          value={config.description}
          onChange={e => update('description', e.target.value)}
          placeholder="e.g., SaaS dashboard for real-time analytics"
        />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        <div className="form-group">
          <label>Language</label>
          <select value={config.language} onChange={e => {
            update('language', e.target.value)
            update('framework', FRAMEWORKS[e.target.value]?.[0] || 'None')
          }}>
            {LANGUAGES.map(l => <option key={l}>{l}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Framework</label>
          <select value={config.framework} onChange={e => update('framework', e.target.value)}>
            {(FRAMEWORKS[config.language] || ['None']).map(f => <option key={f}>{f}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Project type</label>
          <select value={config.projectType} onChange={e => update('projectType', e.target.value)}>
            <option value="greenfield">Greenfield (new)</option>
            <option value="existing">Existing codebase</option>
            <option value="monorepo">Monorepo</option>
          </select>
        </div>

        <div className="form-group">
          <label>Team size</label>
          <select value={config.teamSize} onChange={e => update('teamSize', e.target.value)}>
            <option value="solo">Solo developer</option>
            <option value="small">Small team (2-5)</option>
            <option value="large">Large team (6+)</option>
          </select>
        </div>

        <div className="form-group">
          <label>CI/CD</label>
          <select value={config.cicd} onChange={e => update('cicd', e.target.value)}>
            {CICD.map(c => <option key={c}>{c}</option>)}
          </select>
        </div>

        <div className="form-group">
          <label>Package manager</label>
          <select value={config.packageManager} onChange={e => update('packageManager', e.target.value)}>
            {PKG_MANAGERS.map(p => <option key={p}>{p}</option>)}
          </select>
        </div>
      </div>

      <div className="form-group">
        <label>Testing tools</label>
        <div className="chip-group">
          {TEST_TOOLS.map(t => (
            <span
              key={t}
              className={`chip ${config.testTools.includes(t) ? 'active' : ''}`}
              onClick={() => toggleTest(t)}
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      <div className="form-group">
        <label>Coding conventions</label>
        <div className="hint">Style preferences, linting rules, patterns to follow</div>
        <textarea
          rows={3}
          value={config.conventions}
          onChange={e => update('conventions', e.target.value)}
          placeholder="e.g., Use functional components, prefer const over let, no semicolons, single quotes"
        />
      </div>

      <h3 style={{ marginTop: '1.5rem', marginBottom: '1rem', fontSize: '1rem' }}>Key commands</h3>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
        {Object.entries(config.commands).map(([key, val]) => (
          <div className="form-group" key={key}>
            <label style={{ textTransform: 'capitalize' }}>{key}</label>
            <input
              value={val}
              onChange={e => updateCmd(key, e.target.value)}
              placeholder={`${key} command`}
            />
          </div>
        ))}
      </div>

      <div className="btn-row">
        <button className="btn btn-secondary" onClick={onBack}>← Back</button>
        <button className="btn btn-primary" onClick={() => onNext(config)}>Generate →</button>
      </div>
    </div>
  )
}
