<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [@hazelcast/ui — v3 → v4 Migration Guide](#hazelcastui--v3-%E2%86%92-v4-migration-guide)
  - [Button](#button)
    - [1. `size` prop removed](#1-size-prop-removed)
    - [2. `outline` and `outlineClassName` props are no-ops (deprecated)](#2-outline-and-outlineclassname-props-are-no-ops-deprecated)
    - [3. Visual / styling changes (non-breaking API, but visually different)](#3-visual--styling-changes-non-breaking-api-but-visually-different)
    - [4. `active` prop — behaviour change](#4-active-prop--behaviour-change)
  - [Tooltip](#tooltip)
    - [1. Render-prop children API removed](#1-render-prop-children-api-removed)
    - [2. `color` prop removed](#2-color-prop-removed)
    - [3. Props moved / renamed](#3-props-moved--renamed)
    - [4. `TooltipProps` type removed](#4-tooltipprops-type-removed)
    - [5. New exports](#5-new-exports)
    - [6. `tooltipColor` prop removed from `Button` and `IconButton`](#6-tooltipcolor-prop-removed-from-button-and-iconbutton)
    - [7. `helperTextTooltipWordBreak` prop removed from `FieldHeader`](#7-helpertexttooltipwordbreak-prop-removed-from-fieldheader)
  - [Checklist for Claude Code](#checklist-for-claude-code)
    - [Tooltip](#tooltip-1)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# @hazelcast/ui — v3 → v4 Migration Guide

This guide documents breaking and deprecated API changes introduced in v4.
It is written for use with Claude Code: each section includes exact search
patterns and replacement instructions so Claude can automate the migration.

---

## Button

### 1. `size` prop removed

The `size` prop has been removed. The button now has a single fixed size
(equivalent to the old `small`). Any usage of `size` must be deleted.

**Find:**

```
size="small"
size="medium"
size={'small'}
size={'medium'}
```

**Fix:** delete the prop entirely.

```tsx
// before
<Button size="small" ...>...</Button>
<Button size="medium" ...>...</Button>

// after
<Button ...>...</Button>
```

**TypeScript import:** `ButtonSize` type no longer exists. Remove any import of it.

```ts
// before
import { Button, ButtonSize } from '@hazelcast/ui'

// after
import { Button } from '@hazelcast/ui'
```

---

### 2. `outline` and `outlineClassName` props are no-ops (deprecated)

Focus is now handled by the CSS ring (`focus-visible:ring-2`). The `outline`
and `outlineClassName` props are still accepted by TypeScript to avoid hard
compile errors, but they have no visual effect and will be removed in a future
version.

**Find:**

```
outline=
outlineClassName=
```

**Fix:** delete the props. No replacement is needed.

```tsx
// before
<Button outline="inset" outlineClassName={styles.myOutline} ...>...</Button>

// after
<Button ...>...</Button>
```

**TypeScript import:** `ButtonOutlineType` is deprecated. Remove any import of it.

```ts
// before
import { ButtonOutlineType } from '@hazelcast/ui'

// after
// (delete the import, no replacement)
```

---

### 3. Visual / styling changes (non-breaking API, but visually different)

These require no code changes but affect appearance and any tests that
snapshot or assert CSS class names.

| Aspect                | v3                       | v4                                                           |
| --------------------- | ------------------------ | ------------------------------------------------------------ |
| Styling system        | SCSS modules             | Tailwind CSS utility classes                                 |
| Button height (small) | `30px` (`1.875rem`)      | `36px` (`2.25rem` / `h-9`)                                   |
| Horizontal padding    | `20px` (`1.25rem`)       | `12px` (`0.75rem` / `px-3`)                                  |
| Focus indicator       | Custom `<span>` outline  | CSS ring (`outline-ring` / `ring-2`)                         |
| Active state          | `.active` CSS class      | `data-active` HTML attribute                                 |
| Colors                | Hazelcast SCSS variables | shadcn CSS variables (placeholder values — to be configured) |

**CSS class name overrides will break.** If any consumer overrides internal
button classes via SCSS (e.g. targeting `.Button___body` or `.Button___iconLeft`),
those class names no longer exist. Use the `bodyClassName`, `iconLeftClassName`,
or `iconRightClassName` props instead, and pass Tailwind or plain CSS classes.

**Snapshot tests will fail** due to changed class names. Re-generate snapshots
after migration.

---

### 4. `active` prop — behaviour change

The `active` prop still exists and works, but the implementation changed.
Previously it added a CSS class; now it sets `data-active` on the DOM element.

If any consumer test asserts on `.active` class name:

```ts
// before (test)
expect(button).toHaveClass('active')

// after (test)
expect(button).toHaveAttribute('data-active')
```

---

---

## Tooltip

The Tooltip has been completely rewritten from a custom floating-ui implementation to
Radix UI's `@radix-ui/react-tooltip`. The API changed from a render-prop pattern to
a **compound component** pattern (similar to shadcn).

### 1. Render-prop children API removed

The old `children: (ref) => ReactElement` render-prop pattern is gone.

**Quickest migration path — use `SimpleTooltip`** (mirrors the old single-element API):

```tsx
// before
import { Tooltip } from '@hazelcast/ui'
;<Tooltip id="my-tooltip" content="Hello" placement="top">
  {(ref) => <button ref={ref}>Hover me</button>}
</Tooltip>
```

```tsx
// after — SimpleTooltip (drop-in for most cases)
import { SimpleTooltip } from '@hazelcast/ui'
;<SimpleTooltip content="Hello" placement="top" id="my-tooltip">
  <button>Hover me</button>
</SimpleTooltip>
```

`SimpleTooltip` handles `TooltipProvider`, `Tooltip`, `TooltipTrigger`, and `TooltipContent` internally.
When `content` is falsy it renders the child directly with no portal overhead.

**Full compound API** — use when you need nested tooltips or advanced control:

```tsx
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from '@hazelcast/ui'
;<TooltipProvider>
  <Tooltip>
    <TooltipTrigger asChild>
      <button>Hover me</button>
    </TooltipTrigger>
    <TooltipContent placement="top">Hello</TooltipContent>
  </Tooltip>
</TooltipProvider>
```

### 2. `color` prop removed

The `color` ('dark' | 'secondary') prop has been removed entirely. There is no
replacement — use `className` on `<TooltipContent>` to apply custom Tailwind classes
if you need a different appearance.

**Find:**

```
color="dark"
color="secondary"
color={'dark'}
color={'secondary'}
```

**Fix:** delete the prop.

### 3. Props moved / renamed

| Old prop (on `<Tooltip>`)  | New location                       | Notes                                  |
| -------------------------- | ---------------------------------- | -------------------------------------- |
| `content`                  | children of `<TooltipContent>`     | Now JSX children, not a prop           |
| `placement`                | `placement` on `<TooltipContent>`  | Same string values                     |
| `visible`                  | `open` on `<Tooltip>`              | Pass `true`/`false` to force show/hide |
| `id`                       | `id` on `<TooltipContent>`         | Moved to content element               |
| `arrow`                    | `arrow` on `<TooltipContent>`      | Defaults to `true`                     |
| `offset`                   | `sideOffset` on `<TooltipContent>` | Defaults to `4`                        |
| `wordBreak`                | _(removed)_                        | Use `className` instead                |
| `zIndex`                   | _(removed)_                        | Use CSS / Tailwind instead             |
| `padding`                  | _(removed)_                        | No replacement                         |
| `autoPlacement`            | _(removed)_                        | Radix handles placement automatically  |
| `className` on `<Tooltip>` | `className` on `<TooltipContent>`  | Pass it to the content element         |

### 4. `TooltipProps` type removed

The old `TooltipProps` export no longer exists. Use specific types instead:

```ts
// before
import { TooltipProps } from '@hazelcast/ui'
type MyProp = TooltipProps['placement']

// after
import { TooltipPlacement } from '@hazelcast/ui'
type MyProp = TooltipPlacement
```

### 5. New exports

```ts
import {
  SimpleTooltip, // Convenience wrapper — use for most cases
  SimpleTooltipProps, // Props type for SimpleTooltip
  Tooltip, // Radix Root (open, onOpenChange, defaultOpen, etc.)
  TooltipTrigger, // Wraps the trigger element (use asChild)
  TooltipContent, // The tooltip bubble (placement, arrow, sideOffset, id, className)
  TooltipProvider, // Required wrapper — one per tooltip or once at app root
  TooltipPlacement, // Type: 'top' | 'top-start' | ... (12 values)
  TooltipContentProps, // Props type for TooltipContent
} from '@hazelcast/ui'
```

### 6. `tooltipColor` prop removed from `Button` and `IconButton`

`tooltipColor` (which took `TooltipProps['color']`) has been removed along with the `color` prop.
Use `className` on `TooltipContent` via the compound API if a custom colour is needed.

**Find:**

```
tooltipColor=
```

**Fix:** delete the prop.

### 7. `helperTextTooltipWordBreak` prop removed from `FieldHeader`

`FieldHeader` no longer accepts `helperTextTooltipWordBreak` (it was forwarded to the old
`Tooltip`'s `wordBreak` prop which no longer exists). Delete all usages.

**Find:**

```
helperTextTooltipWordBreak=
```

**Fix:** delete the prop. Use `helperTextTooltipClassName` with a Tailwind class if custom
word-break behaviour is needed.

---

## Checklist for Claude Code

When migrating a file that imports from `@hazelcast/ui`:

1. Search for `size="small"` or `size="medium"` on `<Button` — delete the prop.
2. Search for `outline=` on `<Button` — delete the prop.
3. Search for `outlineClassName=` on `<Button` — delete the prop.
4. Search for `import.*ButtonSize.*from '@hazelcast/ui'` — remove `ButtonSize` from the import.
5. Search for `import.*ButtonOutlineType.*from '@hazelcast/ui'` — remove `ButtonOutlineType` from the import.
6. Search for `ButtonSize` type annotations — delete them (no replacement).
7. Search for `ButtonOutlineType` type annotations — delete them (no replacement).
8. Re-run TypeScript — remaining errors will point to any missed usages.
9. Re-generate any snapshot tests that include Button output.

### Tooltip

10. Search for `children={(ref) =>` inside `<Tooltip` — replace with `<SimpleTooltip content={...} placement={...}>child</SimpleTooltip>` for simple cases, or the full compound API for advanced usage.
11. Search for `import.*Tooltip.*from '@hazelcast/ui'` — replace with `SimpleTooltip` (and `TooltipPlacement` if needed); remove `TooltipProps`.
12. Search for `TooltipProps\['placement'\]` or `TooltipProps\['color'\]` — replace with `TooltipPlacement`; remove color references entirely.
13. Search for `color=` on `<Tooltip` — delete the prop (no replacement).
14. Search for `visible=` on `<Tooltip` — rename to `open` on `<SimpleTooltip>` or `<Tooltip>`.
15. Search for `tooltipColor=` on `<Button>` or `<IconButton>` — delete the prop.
16. Search for `helperTextTooltipWordBreak=` on `<FieldHeader>` — delete the prop.
17. Re-generate any snapshot tests that include Tooltip output.
