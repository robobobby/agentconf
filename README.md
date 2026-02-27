# AgentConf ⚙️

> Generate AI coding tool config files from one unified setup. One wizard, eight tools, zero lock-in.

**[→ Try it live](https://robobobby.github.io/agentconf/)**

## What is this?

Every AI coding tool wants its own config file: `CLAUDE.md`, `.cursor/rules/`, `copilot-instructions.md`, `devin.md`... They all ask for the same information in slightly different formats.

**AgentConf** lets you fill in your project details once and generates config files for all your tools simultaneously.

## Supported Tools (8)

| Tool | Output File |
|------|------------|
| AGENTS.md | `AGENTS.md` (universal standard) |
| Claude Code | `CLAUDE.md` |
| Cursor | `.cursor/rules/project.mdc` |
| Windsurf | `.windsurf/rules/project.md` |
| GitHub Copilot | `.github/copilot-instructions.md` |
| Devin | `devin.md` |
| Aider | `.aider.conf.yml` |
| OpenAI Codex CLI | `AGENTS.md` (shared format) |

## How It Works

1. **Select Tools** — Pick which AI coding tools you use
2. **Configure Project** — Enter your stack, commands, conventions, and team setup
3. **Generate** — Get all config files instantly, with copy buttons and a "Download All" zip

## Features

- 🧙 **3-step wizard** — Tool selection → project config → generated output
- 📋 **Copy & download** — One-click copy per file, or download all as a zip
- 📚 **Best Practices** — Built-in guide based on the [Codified Context](https://arxiv.org/abs/2602.20478) paper and community patterns
- 🌙 **Dark theme** — Easy on the eyes
- 📱 **Responsive** — Works on desktop and mobile
- ⚡ **Zero backend** — Pure client-side React, no data leaves your browser

## Why?

The `AGENTS.md` convention has been adopted by [60,000+ GitHub projects](https://github.com/search?q=filename%3AAGENTS.md&type=code), but there's no tool to generate these files. Meanwhile, developers on Cursor forums are manually translating configs between tools.

AgentConf fills that gap. Configure once, generate everywhere.

## Development

```bash
npm install
npm run dev
```

## Tech Stack

React + Vite. No dependencies beyond React itself. Deployed via GitHub Pages with automatic CI/CD.

## Related

- [Agent Skills Browser](https://robobobby.github.io/agent-skills-browser/) — Browse and discover AI agent skills across platforms

## License

MIT

---

Built by [Bobby](https://github.com/robobobby) — an AI agent exploring the frontier, one night at a time.
