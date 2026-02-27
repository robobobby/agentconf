import { useState, useMemo } from 'react'
import { GENERATORS } from '../generators'

function CopyButton({ text }) {
  const [copied, setCopied] = useState(false)
  const handleCopy = () => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }
  return (
    <button className={`copy-btn ${copied ? 'copied' : ''}`} onClick={handleCopy}>
      {copied ? '✓ Copied' : 'Copy'}
    </button>
  )
}

function DownloadAllButton({ files }) {
  const handleDownload = () => {
    files.forEach(({ filename, content }) => {
      const blob = new Blob([content], { type: 'text/plain' })
      const url = URL.createObjectURL(blob)
      const a = document.createElement('a')
      a.href = url
      // Flatten path for download filename
      a.download = filename.replace(/\//g, '_').replace(/^\./, '')
      a.click()
      URL.revokeObjectURL(url)
    })
  }
  return (
    <button className="btn btn-primary" onClick={handleDownload}>
      ⬇ Download All ({files.length} files)
    </button>
  )
}

export default function GeneratedOutput({ tools, config, onBack, onRestart }) {
  // Deduplicate: codex uses same file as agents
  const effectiveTools = [...new Set(tools)]
  // If both codex and agents selected, only show agents once
  const toolsToShow = effectiveTools.filter(t => {
    if (t === 'codex' && effectiveTools.includes('agents')) return false
    return true
  })

  const files = useMemo(() =>
    toolsToShow
      .filter(t => GENERATORS[t])
      .map(t => ({
        id: t,
        ...GENERATORS[t],
        content: GENERATORS[t].fn(config),
      })),
    [toolsToShow, config]
  )

  const [activeTab, setActiveTab] = useState(files[0]?.id || '')

  const activeFile = files.find(f => f.id === activeTab) || files[0]

  return (
    <div>
      <h2 style={{ marginBottom: '0.5rem' }}>Your config files</h2>
      <p style={{ color: 'var(--text-dim)', marginBottom: '1.5rem', fontSize: '0.95rem' }}>
        {files.length} file{files.length > 1 ? 's' : ''} generated. Copy or download each one.
      </p>

      <div className="output-tabs">
        {files.map(f => (
          <button
            key={f.id}
            className={`output-tab ${activeTab === f.id ? 'active' : ''}`}
            onClick={() => setActiveTab(f.id)}
          >
            {f.label}
          </button>
        ))}
      </div>

      {activeFile && (
        <div>
          <div style={{ fontSize: '0.85rem', color: 'var(--text-dim)', marginBottom: '0.5rem', fontFamily: 'var(--mono)' }}>
            📁 {activeFile.filename}
          </div>
          <div className="code-block">
            <CopyButton text={activeFile.content} />
            {activeFile.content}
          </div>
        </div>
      )}

      <div className="btn-row">
        <button className="btn btn-secondary" onClick={onBack}>← Back</button>
        <button className="btn btn-secondary" onClick={onRestart}>Start Over</button>
        <DownloadAllButton files={files} />
      </div>
    </div>
  )
}
