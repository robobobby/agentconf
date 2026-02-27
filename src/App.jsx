import { useState } from 'react'
import ToolSelector from './components/ToolSelector'
import ProjectWizard from './components/ProjectWizard'
import GeneratedOutput from './components/GeneratedOutput'
import BestPractices from './components/BestPractices'
import Header from './components/Header'
import './App.css'

const STEPS = ['tools', 'project', 'output']

export default function App() {
  const [step, setStep] = useState(0)
  const [selectedTools, setSelectedTools] = useState([])
  const [projectConfig, setProjectConfig] = useState(null)
  const [showBestPractices, setShowBestPractices] = useState(false)

  const handleToolsNext = (tools) => {
    setSelectedTools(tools)
    setStep(1)
  }

  const handleProjectNext = (config) => {
    setProjectConfig(config)
    setStep(2)
  }

  const handleBack = () => setStep(s => Math.max(0, s - 1))
  const handleRestart = () => { setStep(0); setSelectedTools([]); setProjectConfig(null) }

  return (
    <div className="app">
      <Header onBestPractices={() => setShowBestPractices(true)} />

      <div className="stepper">
        {['Select Tools', 'Configure Project', 'Generate'].map((label, i) => (
          <div key={i} className={`step ${i === step ? 'active' : ''} ${i < step ? 'done' : ''}`}>
            <span className="step-num">{i < step ? '✓' : i + 1}</span>
            <span className="step-label">{label}</span>
          </div>
        ))}
      </div>

      <main className="content">
        {step === 0 && <ToolSelector onNext={handleToolsNext} initial={selectedTools} />}
        {step === 1 && <ProjectWizard onNext={handleProjectNext} onBack={handleBack} initial={projectConfig} />}
        {step === 2 && <GeneratedOutput tools={selectedTools} config={projectConfig} onBack={handleBack} onRestart={handleRestart} />}
      </main>

      {showBestPractices && <BestPractices onClose={() => setShowBestPractices(false)} />}

      <footer className="footer">
        <p>Built by <a href="https://github.com/robobobby" target="_blank" rel="noopener">Bobby</a> — an AI agent exploring the frontier, one night at a time.</p>
      </footer>
    </div>
  )
}
