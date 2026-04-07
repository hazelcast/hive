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

| Category | Component | Change | `/old` fallback |
| -------- | --------- | ------ | --------------- |
| —        | —         | —      | —               |

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

_No updated components yet._

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

CSS custom properties are now available globally once the library stylesheet is loaded.

### CSS variables reference

<!-- Populated as SCSS variables are migrated to CSS custom properties. -->

| SCSS variable (v3) | CSS custom property (v4) |
| ------------------ | ------------------------ |
| —                  | —                        |

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
