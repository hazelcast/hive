# Migration guide: v3 → v4

`@hazelcast/ui` v4 introduces breaking changes with a **gradual migration path**.

Changed components are preserved in `@hazelcast/ui/old` so clients can upgrade at their own pace. The `/old` subpath will be removed in v5.

---

## Install

```bash
npm install @hazelcast/ui@4
```

---

## Gradual migration

For any component with a breaking change you're not ready to migrate yet, redirect the import to `/old`:

```ts
// Temporary — migrate before v5
import { Tooltip } from '@hazelcast/ui/old'
```

To find all legacy imports still pending migration:

```bash
grep -r "@hazelcast/ui/old" src --include="*.tsx" --include="*.ts"
```

---

## Summary of breaking changes

<!-- Updated as v4 is built. -->

| Category | Component | Change                                            | `/old` fallback |
| -------- | --------- | ------------------------------------------------- | --------------- |
| Updated  | `Tooltip` | Radix UI base; new props; no render-prop children | ✅              |

---

## Updated components

Components that changed in a breaking way. Old version available at `@hazelcast/ui/old`.

<!-- Template:
### `<ComponentName>`

<Short description of what changed and why.>

**Old import (temporary fallback):**
```ts
import { ComponentName } from '@hazelcast/ui/old'
```

**Prop changes:**
| Prop | v3 | v4 |
|---|---|---|
| `oldProp` | `string` | removed — use `newProp` |

**Before:**
```tsx
<ComponentName oldProp="value" />
```

**After:**
```tsx
<ComponentName newProp="value" />
```
-->

### `Tooltip`

Rebuilt on [Radix UI Tooltip](https://www.radix-ui.com/primitives/docs/components/tooltip). The `placement` / `autoPlacement` prop names are replaced with Radix-aligned equivalents, and the render-prop `children` pattern is replaced with a plain element.

**Old import (temporary fallback):**

```ts
import { Tooltip } from '@hazelcast/ui/old'
```

**Prop changes:**

| Prop (v3)                         | Prop (v4)                                       | Notes                                           |
| --------------------------------- | ----------------------------------------------- | ----------------------------------------------- |
| `children: (ref) => ReactElement` | `children: ReactElement`                        | No more render prop — pass the trigger directly |
| `placement?: Placement`           | `side?: 'top' \| 'right' \| 'bottom' \| 'left'` | 12-value floating-ui type → 4-value Radix side  |
| _(part of `placement`)_           | `align?: 'start' \| 'center' \| 'end'`          | Alignment is now a separate prop                |
| `autoPlacement?: boolean`         | `avoidCollisions?: boolean`                     | Matches Radix naming; default `true`            |
| `offset?: number`                 | `sideOffset?: number`                           | Matches Radix naming                            |
| `visible?: boolean`               | `open?: boolean`                                | Matches Radix naming                            |
| `padding?: number`                | _(removed)_                                     | Was used for arrow padding; no longer needed    |

**Before:**

```tsx
import { Tooltip } from '@hazelcast/ui'

;<Tooltip content="Save" placement="top-start" autoPlacement offset={8} visible={show}>
  {(ref) => <button ref={ref}>Save</button>}
</Tooltip>
```

**After:**

```tsx
import { Tooltip } from '@hazelcast/ui'

;<Tooltip content="Save" side="top" align="start" avoidCollisions sideOffset={8} open={show}>
  <button>Save</button>
</Tooltip>
```

---

## Deprecated components

Removed from the main `@hazelcast/ui` entry but available at `@hazelcast/ui/old` until v5.

<!-- Template:
### `<ComponentName>`

<Why it was removed / what to use instead.>

**Temporary fallback:**
```ts
import { ComponentName } from '@hazelcast/ui/old'
```

**Recommended replacement:**
```tsx
import { Replacement } from '@hazelcast/ui'
<Replacement ... />
```
-->

_No deprecated components yet._

---

## New components

<!-- Template:
### `<ComponentName>`

<One-line description.>

```tsx
import { ComponentName } from '@hazelcast/ui'
<ComponentName prop="value" />
```
-->

_No new components yet._

---

## Breaking: CSS changes

v4 drops SCSS in favor of pure CSS with custom properties.

### Remove library SCSS imports

```scss
/* v3 — remove these */
@use '@hazelcast/ui/styles/constants' as c;
```

Import the CSS variables file instead (once, at your app root):

```css
@import '@hazelcast/ui/styles/variables.css';
```

### CSS variables reference

| SCSS variable (v3)                              | CSS custom property (v4)       |
| ----------------------------------------------- | ------------------------------ |
| `c.$colorPrimary`                               | `--hive-color-primary`         |
| `c.$colorNeutralWhite`                          | `--hive-color-neutral-white`   |
| `c.$colorNeutralLight`                          | `--hive-color-neutral-light`   |
| `c.$colorNeutralLighter`                        | `--hive-color-neutral-lighter` |
| `c.$colorText`                                  | `--hive-color-text`            |
| `c.$colorTextSecondary` / `c.$colorTextSubdued` | `--hive-color-text-subdued`    |
| `c.$colorBrandText`                             | `--hive-color-brand-text`      |
| `c.$colorBrandAccent`                           | `--hive-color-brand-accent`    |
| `c.$colorSuccess`                               | `--hive-color-success`         |
| `c.$colorWarning`                               | `--hive-color-warning`         |
| `c.$colorError`                                 | `--hive-color-error`           |
| `c.$grid`                                       | `--hive-grid`                  |
| `c.$borderRadius`                               | `--hive-border-radius`         |
| `c.$borderWidth`                                | `--hive-border-width`          |
| `c.$tooltipMaxWidth`                            | `--hive-tooltip-max-width`     |
| `c.$fontFamilyText`                             | `--hive-font-family-text`      |
| `c.$fontSizeBodySmall`                          | `--hive-font-size-body-small`  |
| `c.$fontSizeBodyNormal`                         | `--hive-font-size-body-normal` |

Full list: see `styles/variables.css` in the hive repo.

### Class name changes

| Component | Old class | New class |
| --------- | --------- | --------- |
| —         | —         | —         |

---

## Checklist for client migration

- [ ] Update `@hazelcast/ui` to v4
- [ ] For each updated/deprecated component: migrate or add `/old` import + TODO comment
- [ ] Remove all `@use '@hazelcast/ui/styles/...'` SCSS imports
- [ ] Update CSS variable overrides (SCSS vars → CSS custom properties)
- [ ] Run the full test suite
- [ ] Visual QA
- [ ] Track remaining `/old` imports: `grep -r "@hazelcast/ui/old" src`
