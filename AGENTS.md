<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Project Workflow Rules & Git Branching Policy

## 🔀 Git Merge Rule (Dev to Main Milestone Policy)
1. **Active Development**: All feature additions, bug fixes, UI improvements, and daily tasks MUST be committed and pushed to the `dev` branch (`git push origin dev`).
2. **10-Commit Merge Threshold**: Merging changes from `dev` into `main` (`git checkout main && git merge dev && git push origin main`) MUST ONLY occur after accumulating **10 commits on the `dev` branch** since the last merge milestone!
3. **Branch Purpose**:
   - `dev`: Primary active working branch for daily development and incremental features.
   - `main`: Stable production release branch, updated every 10 commits on `dev`.
