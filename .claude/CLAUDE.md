<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [HIVE v4 Redesign — Claude Quick-Start](#hive-v4-redesign--claude-quick-start)
  - [What we're doing](#what-were-doing)
  - [Key decisions](#key-decisions)
  - [Already migrated](#already-migrated)
  - [How to migrate a component — step by step](#how-to-migrate-a-component--step-by-step)
    - [1. Read before touching](#1-read-before-touching)
    - [2. Create the new folder](#2-create-the-new-folder)
    - [3. Replace SCSS with Tailwind](#3-replace-scss-with-tailwind)
    - [4. Keep the public API compatible where possible](#4-keep-the-public-api-compatible-where-possible)
    - [5. Update the barrel export](#5-update-the-barrel-export)
    - [6. Rewrite the story](#6-rewrite-the-story)
    - [7. Rewrite / update tests](#7-rewrite--update-tests)
    - [8. Type-check](#8-type-check)
  - [Tooltip — reference patterns](#tooltip--reference-patterns)
    - [SimpleTooltip (use for most cases)](#simpletooltip-use-for-most-cases)
    - [Compound API (for nested / advanced cases)](#compound-api-for-nested--advanced-cases)
    - [Placement type](#placement-type)
    - [JSX spread anti-pattern — always avoid](#jsx-spread-anti-pattern--always-avoid)
  - [Button — reference patterns](#button--reference-patterns)
  - [Running things](#running-things)
  - [Migration guide](#migration-guide)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# HIVE v4 Redesign — Claude Quick-Start

## What we're doing

Reworking `@hazelcast/ui` (v3 → v4): SCSS + floating-ui + custom primitives → **Tailwind CSS + Radix UI + shadcn** defaults.

Two consumer apps (same parent folder as this repo):

- `hazelcast-cloud-frontend` (CloudUI)
- `management-center` (MC)

Usage stats per component: `.claude/audits/audit-report-hazelcast-cloud-frontend.md`

---

## Key decisions

| Topic              | Decision                                                                    |
| ------------------ | --------------------------------------------------------------------------- |
| Styling            | Tailwind CSS utility classes; no SCSS modules                               |
| Primitives         | Radix UI (NOT Base UI)                                                      |
| shadcn             | Use default shadcn styling as baseline; customise via CSS vars later        |
| CSS vars           | Configured manually by Mykola — do NOT auto-generate or reset               |
| Build              | tsup                                                                        |
| File structure     | One component per file, file name = component name                          |
| Related components | Keep together in a folder (`Button/Button.tsx`, `Button/IconButton.tsx`, …) |
| Migration guide    | Update `MIGRATION_GUIDE.md` whenever a public API changes                   |
| CSS lint           | Removed — do not add back `stylelint`, `doiuse`, `postcss-reporter`         |

---

## Already migrated

| Component | Notes                                                                             |
| --------- | --------------------------------------------------------------------------------- |
| `Button`  | `src/components/Button/` — uses `class-variance-authority`                        |
| `Tooltip` | `src/components/Tooltip/` — Radix UI; exports `SimpleTooltip` convenience wrapper |

---

## How to migrate a component — step by step

### 1. Read before touching

Read the existing component file(s), its story (`__stories__/ComponentName.stories.tsx`) and tests (`__tests__/components/ComponentName.test.tsx`). Understand the current API fully before changing anything.

### 2. Create the new folder

```
src/components/ComponentName/
  ComponentName.tsx      ← main component
  index.ts               ← re-exports everything public
```

Sub-components (e.g. `IconButton`) go as sibling files in the same folder.

### 3. Replace SCSS with Tailwind

- Delete `.module.scss` imports; do not import SCSS in new code.
- Use `cn()` from `../../lib/utils` to compose class names.
- Use shadcn CSS variables (`bg-primary`, `text-primary-foreground`, `border`, `ring`, …) for colours.
- Use Radix UI for any interactive primitive (tooltip, dialog, popover, select, …).

### 4. Keep the public API compatible where possible

If you must break the API, add a section to `MIGRATION_GUIDE.md` with:

- What changed and why
- Before/after code examples
- A numbered checklist item for Claude Code to use when migrating consumer apps

### 5. Update the barrel export

Add new exports to `src/index.ts`. Remove old ones that no longer exist.

### 6. Rewrite the story

- File: `__stories__/ComponentName.stories.tsx`
- Use the new API only.
- Add `argTypes: { children: { control: false } }` for ReactElement props (prevents Storybook control crashes).
- Add `argTypes: { open: { control: false } }` for optional boolean `open` props (prevents Storybook defaulting to `false` and force-closing overlays).

### 7. Rewrite / update tests

- File: `__tests__/components/ComponentName.test.tsx`
- Use `renderAndCheckA11Y` from `../../jest.helpers`.
- Assert on text content and `data-*` attributes — not CSS class names.
- Do NOT import `.module.scss` files in tests.

### 8. Type-check

```bash
npx tsc --noEmit
```

---

## Tooltip — reference patterns

### SimpleTooltip (use for most cases)

```tsx
import { SimpleTooltip } from '../Tooltip'

;<SimpleTooltip content="Hello" placement="top" id={tooltipId}>
  <button>Hover me</button>
</SimpleTooltip>
```

- `content` falsy → renders child directly, no portal overhead.
- `open` prop forces show/hide. Pass `open={undefined}` (not `false`) to keep uncontrolled.

### Compound API (for nested / advanced cases)

```tsx
import { TooltipProvider, Tooltip, TooltipTrigger, TooltipContent } from '../Tooltip'

;<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <button>Hover me</button>
    </TooltipTrigger>
    <TooltipContent placement="top">Hello</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### Placement type

```ts
import type { TooltipPlacement } from '../Tooltip'
// 'top' | 'top-start' | 'top-end' | 'bottom' | 'bottom-start' | 'bottom-end'
// 'left' | 'left-start' | 'left-end' | 'right' | 'right-start' | 'right-end'
```

### JSX spread anti-pattern — always avoid

```tsx
// BAD — passes `false` as React.createElement config → "Cannot use 'in' operator" runtime error
<Tooltip {...(typeof open === 'boolean' && { open })} />

// GOOD
<Tooltip open={typeof open === 'boolean' ? open : undefined} />
```

---

## Button — reference patterns

```tsx
import { Button } from '../Button'
```

- No `size` prop (single size).
- `active` prop sets `data-active` attribute (was a CSS class).
- `outline` / `outlineClassName` accepted but no-op (deprecated).
- `onMouseEnter` / `onMouseLeave` are not in Button's prop types — wrap in a `<div>` if needed.

---

## Running things

```bash
npm run storybook    # dev at localhost:6006
npm run lint         # ESLint / TypeScript only (CSS lint was removed)
npm run test         # Jest
npx tsc --noEmit     # type-check without building
```

---

## Migration guide

Full breaking-change reference with before/after examples and a Claude Code checklist:
→ `MIGRATION_GUIDE.md` (repo root)
