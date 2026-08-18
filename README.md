# Hazelcast Hive

![](./hive.png)

Hazelcast's React design system, built with accessibility in mind.

**Live Storybook**: https://master--5f80b6aa3ceb290022dfea61.chromatic.com/

## Installation

```
npm i @hazelcast/ui
```

Use the `@next` dist-tag for the latest canary build: `npm i @hazelcast/ui@next`.

## Usage

The package ships TypeScript compiled to `ES2018` — configure your bundler if you need to support older environments.

Styles are SCSS modules imported per-component; no global stylesheet is bundled. If you're on Next.js, it [forbids importing non-module CSS/SCSS](https://github.com/vercel/next.js/blob/master/errors/css-global.md) outside `_app.tsx`, so import any global styles you need there, e.g.:

```typescript
import '@hazelcast/ui/styles/datepicker.scss'
// or the CSS modules version
import '@hazelcast/ui/styles/datepicker.module.scss'
```

### SSR

Components use [`react-uid`](https://github.com/thearnica/react-uid) for stable IDs. Wrap your app in `UIDReset` (and `UIDFork` for code-splitting) — see the [react-uid README](https://github.com/thearnica/react-uid#code-splitting).

## Development

```
npm install
npm run dev          # Storybook on :6006
npm test             # Jest unit tests
npm run lint         # ESLint
npm run compile      # compile src/ to lib/
npm run verify-all   # lint + test + build-storybook + visual regression
```

Visual regression tests use [Loki](https://loki.js.org/) against Storybook stories. If `npm run test:visual` fails on an intended change, review the diffs under `.loki`, then run `npm run test:visual:approve` to update the reference screenshots.

See `CLAUDE.md` for project structure and code conventions.

## Releasing

Releases are triggered manually via the ["manual release" GitHub Actions workflow](.github/workflows/release.yml):

1. Run the workflow (`workflow_dispatch`) with the desired version bump type.
2. It opens a PR bumping the version and enables auto-merge.
3. Once a code owner approves and it merges, npm publish and git tagging happen automatically.
