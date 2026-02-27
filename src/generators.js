// Generator functions for each tool's config format

function techStack(c) {
  const parts = [c.language]
  if (c.framework !== 'None') parts.push(c.framework)
  return parts.join(' + ')
}

function testSection(c) {
  if (!c.testTools.length || c.testTools.includes('None')) return ''
  return `\n## Testing\n- Framework: ${c.testTools.join(', ')}\n- Run tests: \`${c.commands.test}\`\n- Write tests for all new features and bug fixes\n- Aim for meaningful coverage, not 100% coverage\n`
}

function conventionsSection(c) {
  if (!c.conventions) return ''
  return `\n## Coding Conventions\n${c.conventions.split('\n').map(l => l.trim() ? `- ${l.trim()}` : '').filter(Boolean).join('\n')}\n`
}

function commandsSection(c) {
  return Object.entries(c.commands)
    .filter(([, v]) => v)
    .map(([k, v]) => `- **${k}**: \`${v}\``)
    .join('\n')
}

export function generateAgentsMd(c) {
  return `# AGENTS.md

## Project Overview
${c.description || `A ${c.projectType} ${techStack(c)} project.`}

## Tech Stack
- **Language:** ${c.language}
- **Framework:** ${c.framework !== 'None' ? c.framework : 'None'}
- **Package Manager:** ${c.packageManager}
- **CI/CD:** ${c.cicd !== 'None' ? c.cicd : 'None'}
- **Project Type:** ${c.projectType === 'greenfield' ? 'Greenfield' : c.projectType === 'monorepo' ? 'Monorepo' : 'Existing codebase'}
- **Team Size:** ${c.teamSize === 'solo' ? 'Solo developer' : c.teamSize === 'small' ? 'Small team (2-5)' : 'Large team (6+)'}

## Commands
${commandsSection(c)}
${testSection(c)}${conventionsSection(c)}
## Workflow
- Create small, focused commits with descriptive messages
- ${c.teamSize !== 'solo' ? 'Open PRs for review — no direct pushes to main' : 'Commit to main for quick iterations, branch for experiments'}
- ${c.projectType === 'monorepo' ? 'Respect package boundaries — changes should be scoped to their package' : 'Keep the codebase clean — refactor as you go'}

## Safety
- Never commit secrets, API keys, or credentials
- Don't run destructive commands without confirmation
- When in doubt, ask
`
}

export function generateClaudeMd(c) {
  return `# CLAUDE.md

## Project
${c.description || `${techStack(c)} project.`}

## Commands
${commandsSection(c)}

## Stack
${techStack(c)}${c.cicd !== 'None' ? ` · ${c.cicd}` : ''} · ${c.packageManager}
${testSection(c)}${conventionsSection(c)}
## Guidelines
- Prefer simple, readable solutions over clever ones
- ${c.teamSize !== 'solo' ? 'Follow existing patterns in the codebase' : 'Maintain consistency as the codebase grows'}
- Commit messages: imperative mood, concise, descriptive
- No secrets in code — use environment variables
`
}

export function generateCursorRules(c) {
  // Cursor uses .cursor/rules/*.mdc format
  return `---
description: Project rules for ${techStack(c)}
globs:
alwaysApply: true
---

# Project Context

${c.description || `A ${c.projectType} ${techStack(c)} project.`}

## Tech Stack
- ${c.language}${c.framework !== 'None' ? `\n- ${c.framework}` : ''}
- ${c.packageManager}

## Commands
${commandsSection(c)}

## Rules
${c.conventions ? c.conventions.split('\n').map(l => l.trim() ? `- ${l.trim()}` : '').filter(Boolean).join('\n') : `- Follow ${c.language} best practices
- Write clean, readable code
- Use meaningful variable and function names`}
- Prefer simple solutions over complex ones
- ${c.testTools.length && !c.testTools.includes('None') ? `Write tests using ${c.testTools.join('/')}` : 'Include tests for new functionality'}
- Never expose secrets or API keys in code
`
}

export function generateWindsurfRules(c) {
  return `# Windsurf Rules

## Project
${c.description || `${techStack(c)} project.`}

## Stack
- Language: ${c.language}
${c.framework !== 'None' ? `- Framework: ${c.framework}` : ''}- Package Manager: ${c.packageManager}
${c.cicd !== 'None' ? `- CI/CD: ${c.cicd}` : ''}
## Commands
${commandsSection(c)}

## Conventions
${c.conventions ? c.conventions.split('\n').map(l => l.trim() ? `- ${l.trim()}` : '').filter(Boolean).join('\n') : `- Follow ${c.language} idiomatic patterns
- Keep functions small and focused
- Use descriptive naming`}
${testSection(c)}
## Important
- Do not commit secrets or credentials
- Ask before running destructive operations
`
}

export function generateCopilotInstructions(c) {
  return `# GitHub Copilot Instructions

## Project Context
${c.description || `This is a ${c.projectType} project using ${techStack(c)}.`}

## Technology
- **Primary language:** ${c.language}
${c.framework !== 'None' ? `- **Framework:** ${c.framework}` : ''}- **Package manager:** ${c.packageManager}

## Preferences
${c.conventions ? c.conventions.split('\n').map(l => l.trim() ? `- ${l.trim()}` : '').filter(Boolean).join('\n') : `- Write idiomatic ${c.language} code
- Prefer clarity over brevity
- Use meaningful names for variables and functions`}
${c.testTools.length && !c.testTools.includes('None') ? `\n## Testing\n- Use ${c.testTools.join(', ')} for testing\n- Write tests alongside new features` : ''}

## Security
- Never suggest hardcoded secrets or API keys
- Use environment variables for configuration
`
}

export function generateDevinMd(c) {
  return `# devin.md

## About This Project
${c.description || `A ${c.projectType} ${techStack(c)} project.`}

## Setup
\`\`\`bash
${c.commands.install}
\`\`\`

## Development
\`\`\`bash
${c.commands.dev}
\`\`\`
${c.commands.test ? `\n## Testing\n\`\`\`bash\n${c.commands.test}\n\`\`\`\n${c.testTools.length && !c.testTools.includes('None') ? `Uses: ${c.testTools.join(', ')}` : ''}` : ''}

## Build
\`\`\`bash
${c.commands.build}
\`\`\`

## Key Information
- **Stack:** ${techStack(c)}
- **Package Manager:** ${c.packageManager}
${c.cicd !== 'None' ? `- **CI/CD:** ${c.cicd}` : ''}
${conventionsSection(c)}
## Guidelines
- Make small, incremental changes
- Test before committing
- Never commit secrets
`
}

export function generateAiderConf(c) {
  const lines = [
    `# .aider.conf.yml`,
    `# Aider configuration for ${techStack(c)} project`,
    ``,
  ]

  // Map common test commands
  if (c.commands.test) {
    lines.push(`auto-test: true`)
    lines.push(`test-cmd: ${c.commands.test}`)
  }
  if (c.commands.install) {
    lines.push(`lint-cmd: ${c.commands.install.replace('install', 'run lint')}`)
  }

  lines.push(``)
  lines.push(`# Model preferences`)
  lines.push(`# model: claude-sonnet-4-20250514`)
  lines.push(``)
  lines.push(`# Auto-commit changes`)
  lines.push(`auto-commits: true`)
  lines.push(``)
  lines.push(`# Coding conventions (add to .aider.conventions.md for detailed rules)`)

  return lines.join('\n')
}

export function generateCodexMd(c) {
  // OpenAI Codex CLI reads AGENTS.md — same format
  return generateAgentsMd(c)
}

export const GENERATORS = {
  agents: { fn: generateAgentsMd, filename: 'AGENTS.md', label: 'AGENTS.md' },
  claude: { fn: generateClaudeMd, filename: 'CLAUDE.md', label: 'CLAUDE.md' },
  cursor: { fn: generateCursorRules, filename: '.cursor/rules/project.mdc', label: 'Cursor Rules' },
  windsurf: { fn: generateWindsurfRules, filename: '.windsurf/rules/project.md', label: 'Windsurf Rules' },
  copilot: { fn: generateCopilotInstructions, filename: '.github/copilot-instructions.md', label: 'Copilot Instructions' },
  devin: { fn: generateDevinMd, filename: 'devin.md', label: 'devin.md' },
  aider: { fn: generateAiderConf, filename: '.aider.conf.yml', label: 'Aider Config' },
  codex: { fn: generateCodexMd, filename: 'AGENTS.md', label: 'Codex (AGENTS.md)' },
}
