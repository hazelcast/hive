# Hive — Hazelcast Design System

`@hazelcast/ui` — React component library and design system.

## Stack

- React 19, TypeScript, SCSS modules
- Storybook 8 for component development (`npm run dev`)
- Jest + Testing Library for unit tests (`npm test`)
- ESLint + Prettier

## Key commands

```
npm run dev       # Storybook on :6006
npm test          # Jest
npm run lint      # ESLint
npm run compile   # Build to lib/
```

## Structure

- `src/components/` — all UI components
- `src/hooks/` — shared hooks
- `src/utils/` — utilities
- `__stories__/` — Storybook stories
- `__tests__/` — Jest tests

## Code style

- Minimize comments — only add them where the logic is non-obvious. Do not add section headers, label-style comments (e.g. `// Colors`, `// Sizes`), or comments that restate what the code already says.

## Conventions

- Components export from `src/index.ts`
- Stories live in `__stories__/`, tests in `__tests__/`
- CSS modules (`.module.scss`) per component
- Lint-staged runs on commit (ESLint)
