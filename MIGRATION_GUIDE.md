<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [@hazelcast/ui — v3 → v4 Migration Guide](#hazelcastui--v3-%E2%86%92-v4-migration-guide)
  - [Button](#button)
    - [1. `size` prop removed](#1-size-prop-removed)
    - [2. `outline` and `outlineClassName` props are no-ops (deprecated)](#2-outline-and-outlineclassname-props-are-no-ops-deprecated)
    - [3. Visual / styling changes (non-breaking API, but visually different)](#3-visual--styling-changes-non-breaking-api-but-visually-different)
    - [4. `active` prop — behaviour change](#4-active-prop--behaviour-change)
  - [Checklist for Claude Code](#checklist-for-claude-code)

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
