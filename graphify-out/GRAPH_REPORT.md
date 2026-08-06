# Graph Report - .  (2026-08-06)

## Corpus Check
- Corpus is ~18,940 words - fits in a single context window. You may not need a graph.

## Summary
- 146 nodes · 160 edges · 29 communities (9 shown, 20 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Community Hubs (Navigation)
- CRM Admin Panel & AI Settings
- Notion AI Workspace & PRD Flow
- Auth & Security Policy
- Platform & Deployment
- Database & API Schema
- Community 5
- Community 6
- Community 7
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13
- Community 14
- Community 15
- Community 16
- Community 17
- Community 18
- Community 19
- Community 20
- Community 21
- Community 22
- Community 23
- Community 24
- Community 25
- Community 26
- Community 27
- Community 28

## God Nodes (most connected - your core abstractions)
1. `compilerOptions` - 16 edges
2. `usePrdStore` - 15 edges
3. `include` - 7 edges
4. `scripts` - 5 edges
5. `Footer()` - 4 edges
6. `Navbar()` - 4 edges
7. `lib` - 4 edges
8. `RateCalculatorSection()` - 3 edges
9. `CaptchaGate()` - 3 edges
10. `ChatAndPreview()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `ConfirmationPage()` --calls--> `usePrdStore`  [EXTRACTED]
  src/app/confirmation/page.tsx → src/store/usePrdStore.ts
- `PrdBuilderPage()` --calls--> `usePrdStore`  [EXTRACTED]
  src/app/prd-builder/page.tsx → src/store/usePrdStore.ts
- `RateCalculatorSection()` --calls--> `usePrdStore`  [EXTRACTED]
  src/components/landing/RateCalculatorSection.tsx → src/store/usePrdStore.ts
- `CaptchaGate()` --calls--> `usePrdStore`  [EXTRACTED]
  src/components/prd-builder/CaptchaGate.tsx → src/store/usePrdStore.ts
- `ChatAndPreview()` --calls--> `usePrdStore`  [EXTRACTED]
  src/components/prd-builder/ChatAndPreview.tsx → src/store/usePrdStore.ts

## Import Cycles
- None detected.

## Communities (29 total, 20 thin omitted)

### Community 0 - "CRM Admin Panel & AI Settings"
Cohesion: 0.10
Nodes (21): animejs, canvas-confetti, framer-motion, lucide-react, next, dependencies, animejs, canvas-confetti (+13 more)

### Community 1 - "Notion AI Workspace & PRD Flow"
Cohesion: 0.10
Nodes (21): eslint, eslint-config-next, devDependencies, eslint, eslint-config-next, tailwindcss, @tailwindcss/postcss, @types/animejs (+13 more)

### Community 2 - "Auth & Security Policy"
Cohesion: 0.11
Nodes (19): dom, dom.iterable, esnext, compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules (+11 more)

### Community 3 - "Platform & Deployment"
Cohesion: 0.18
Nodes (8): ConfirmationPage(), metadata, ConsultingSection(), HeroSection(), ProcessSection(), RateCalculatorSection(), Footer(), Navbar()

### Community 4 - "Database & API Schema"
Cohesion: 0.26
Nodes (11): PrdBuilderPage(), CaptchaGate(), ChatAndPreview(), QuestionnaireWizard(), SubmissionModal(), ChatMessage, initialQuestionnaire, PrdStore (+3 more)

### Community 5 - "Community 5"
Cohesion: 0.20
Nodes (9): **/*.mts, .next/dev/types/**/*.ts, next-env.d.ts, .next/types/**/*.ts, node_modules, **/*.ts, **/*.tsx, exclude (+1 more)

### Community 6 - "Community 6"
Cohesion: 0.22
Nodes (8): name, private, scripts, build, dev, lint, start, version

### Community 7 - "Community 7"
Cohesion: 0.40
Nodes (3): geistMono, geistSans, metadata

### Community 8 - "Community 8"
Cohesion: 0.50
Nodes (4): CRM Management Project, Landing Page (Public), AI PRD Builder (Notion AI Chat Style), Notion PRD Document Reader View

## Knowledge Gaps
- **80 isolated node(s):** `eslintConfig`, `nextConfig`, `name`, `version`, `private` (+75 more)
  These have ≤1 connection - possible missing edges or undocumented components.
- **20 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `dependencies` connect `CRM Admin Panel & AI Settings` to `Community 6`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Why does `devDependencies` connect `Notion AI Workspace & PRD Flow` to `Community 6`?**
  _High betweenness centrality (0.075) - this node is a cross-community bridge._
- **Why does `compilerOptions` connect `Auth & Security Policy` to `Community 5`?**
  _High betweenness centrality (0.031) - this node is a cross-community bridge._
- **What connects `eslintConfig`, `nextConfig`, `name` to the rest of the system?**
  _80 weakly-connected nodes found - possible documentation gaps or missing edges._
- **Should `CRM Admin Panel & AI Settings` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `Notion AI Workspace & PRD Flow` be split into smaller, more focused modules?**
  _Cohesion score 0.09523809523809523 - nodes in this community are weakly interconnected._
- **Should `Auth & Security Policy` be split into smaller, more focused modules?**
  _Cohesion score 0.10526315789473684 - nodes in this community are weakly interconnected._