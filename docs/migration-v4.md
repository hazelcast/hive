# Migration guide: v3 → v4

`@hazelcast/ui` v4 introduces breaking changes with a **gradual migration path**.

---

## Gradual migration

For any component with a breaking change you're not ready to migrate yet, redirect the import to `/old`:

```ts
import { Tooltip } from '@hazelcast/ui/old'
```

To find all legacy imports still pending migration:

```bash
grep -r "@hazelcast/ui/old" src --include="*.tsx" --include="*.ts"
```

---

## Summary of breaking changes

<!-- Updated as v4 is built. -->

| Category | Component     | Change                                                                                                                                                                                                                          | `/old` fallback |
| -------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| Updated  | `Tooltip`     | Radix UI base; new props; no render-prop children                                                                                                                                                                               | ✅              |
| Updated  | `Badge`       | `size` prop removed; borders + 8px radius added                                                                                                                                                                                 | ❌              |
| Updated  | `Button`      | HIVE 4.0 rebrand; `color` × `variant` axes (variant: contained/outlined/ghost/link, color: primary/secondary/warning/danger); `tooltipColor` removed; `size` reintroduced (`small`/`regular`); `capitalize` removed; SCSS → CSS | ✅              |
| Updated  | `IconButton`  | HIVE 4.0 rebrand; `kind` → `variant`; `size` is `sm`/`md`/`lg`; `padding` removed; SCSS → CSS                                                                                                                                   | ✅              |
| New      | `ButtonGroup` | Group of joined `Button`s sharing border-radius and shadow                                                                                                                                                                      | n/a             |
| Updated  | `Toggle`      | HIVE 4.0 pill switch; SCSS → CSS; no ON/OFF label                                                                                                                                                                               | ✅              |

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

### `Badge`

The `size` prop and `BadgeSize` type have been removed. Only the small size remains. Badges now have a `1px` semantic border and `8px` border-radius (previously borderless pill shape).

**Prop changes:**

| Prop                         | v3                           | v4                                          |
| ---------------------------- | ---------------------------- | ------------------------------------------- |
| `size?: 'small' \| 'normal'` | optional, default `'normal'` | removed — always small                      |
| `icon?: BadgeIconDescriptor` | n/a                          | new — overrides the default type-based icon |

**Type changes:**

`BadgeSize` type is no longer exported.

**Before:**

```tsx
import { Badge, BadgeSize } from '@hazelcast/ui'
<Badge type="success" size="normal" content="Active" />
<Badge type="warning" size="small" content="Pending" />
```

**After:**

```tsx
import { Badge } from '@hazelcast/ui'
<Badge type="success" content="Active" />
<Badge type="warning" content="Pending" />

// Custom icon
import { Star } from 'react-feather'
<Badge type="info" icon={{ icon: Star, ariaLabel: 'Star icon' }} content="Featured" />
```

---

### `Button`

Button has been rebranded to HIVE 4.0. The styling axis is now **two orthogonal props**: `variant` controls the visual treatment, `color` controls the semantic intent. Sizes are reintroduced (`small`/`regular`). `capitalize` is removed — labels render as written. `tooltipColor` is removed — the tooltip color is fixed by design tokens.

**Old import (temporary fallback):**

```ts
import { Button } from '@hazelcast/ui/old'
```

**Prop changes:**

| Prop                                                                                                      | v3                              | v4                                               |
| --------------------------------------------------------------------------------------------------------- | ------------------------------- | ------------------------------------------------ |
| `color?: 'primary' \| 'secondary' \| 'warning' \| 'brand' \| 'authPrimary' \| 'authSecondary' \| 'light'` | optional, default `'primary'`   | replaced — see new values below                  |
| `variant?: 'contained' \| 'outlined' \| 'text'`                                                           | optional, default `'contained'` | replaced — see new values below                  |
| `variant?: 'contained' \| 'outlined' \| 'ghost' \| 'link'`                                                | n/a                             | new — visual treatment, default `'contained'`    |
| `color?: 'primary' \| 'secondary' \| 'warning' \| 'danger'`                                               | n/a                             | new — semantic intent, default `'primary'`       |
| `size?: 'small' \| 'regular'`                                                                             | n/a                             | new — default `'regular'`                        |
| `tooltipColor?: 'dark' \| 'secondary'`                                                                    | optional                        | removed — tooltip color follows the design token |
| `capitalize?: boolean`                                                                                    | optional, default `true`        | removed — labels render as-is                    |

**v3 → v4 mapping:**

| v3                                                      | v4                                              |
| ------------------------------------------------------- | ----------------------------------------------- |
| `variant="contained"` (default) + `color="primary"`     | `variant="contained" color="primary"` (default) |
| `variant="contained"` + `color="secondary"`             | `variant="contained" color="secondary"`         |
| `variant="contained"` + `color="warning"`               | `variant="contained" color="warning"`           |
| `variant="contained"` + `color="light"` / dangerous red | `variant="contained" color="danger"`            |
| `variant="outlined"`                                    | `variant="outlined" color="secondary"`          |
| `variant="text"` / `color="light"`                      | `variant="ghost" color="secondary"`             |
| anchor-styled button                                    | `variant="link"` (color is ignored)             |

**Note:** the v4 `color` is a small, semantic palette (`primary`, `secondary`, `warning`, `danger`). The v3 brand/auth colors are no longer first-class on Button — for those use cases, use `className` and the brand tokens directly.

**Before:**

```tsx
<Button size="medium">Save</Button>
<Button color="secondary" variant="contained">Delete</Button>
<Button color="light" variant="text">Cancel</Button>
<Button capitalize={false}>raw label</Button>
<Button tooltipColor="secondary" tooltip="Hi">Hover me</Button>
```

**After:**

```tsx
<Button>Save</Button>
<Button color="danger">Delete</Button>
<Button variant="ghost" color="secondary">Cancel</Button>
<Button>raw label</Button>
<Button tooltip="Hi">Hover me</Button>
```

---

### `IconButton`

`IconButton` has been rebranded to match the new `Button`. The `kind` prop is replaced by Button's `variant` + `color` props (`variant: 'contained' | 'outlined' | 'ghost' | 'link'`, `color: 'primary' | 'secondary' | 'warning' | 'danger'`); `size` accepts `'small' | 'regular'`; the `padding` prop is removed (sizing is fully driven by `size`). The `iconSize` prop is removed and now derived from `size`.

**Old import (temporary fallback):**

```ts
import { IconButton } from '@hazelcast/ui/old'
```

**Prop changes:**

| Prop                                                            | v3                                | v4                                        |
| --------------------------------------------------------------- | --------------------------------- | ----------------------------------------- |
| `kind?: 'primary' \| 'transparent'`                             | optional, default `'transparent'` | removed — replaced by `variant` + `color` |
| `variant?: 'contained' \| 'outlined' \| 'ghost' \| 'link'`      | n/a                               | new — default `'contained'`               |
| `color?: 'primary' \| 'secondary' \| 'warning' \| 'danger'`     | n/a                               | new — default `'primary'`                 |
| `size?: 'normal' \| 'small' \| 'medium' \| 'large' \| 'xlarge'` | optional                          | replaced — see `size` below               |
| `size?: 'small' \| 'regular'`                                   | n/a                               | new — default `'regular'`                 |
| `iconSize?: IconSize`                                           | optional                          | removed — derived from `size`             |
| `padding?: 'small' \| 'normal'`                                 | optional                          | removed — fully driven by `size`          |

**Before:**

```tsx
<IconButton kind="primary" size="medium" padding="normal" icon={X} ariaLabel="Close" />
```

**After:**

```tsx
<IconButton variant="contained" color="primary" size="regular" icon={X} ariaLabel="Close" />
```

---

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

### `Toggle`

Visual redesign to the HIVE 4.0 pill switch: `32×18px` track, `16px` white thumb with shadow, brand color on state, neutral color off state, all driven by HIVE 4.0 design tokens. The inline `ON` / `OFF` text label has been removed — the track state is communicated purely visually. Styles have also been migrated from SCSS to CSS modules.

The public prop contract is unchanged; only visuals and the internal DOM of the track have changed.

**Old import (temporary fallback):**

```ts
import { Toggle, ToggleFormik } from '@hazelcast/ui/old'
```

**Prop changes:**

| Prop  | v3              | v4                                 |
| ----- | --------------- | ---------------------------------- |
| _all_ | same public API | same — visual-only breaking change |

**Visual / DOM changes:**

| Aspect           | v3                                               | v4                                        |
| ---------------- | ------------------------------------------------ | ----------------------------------------- |
| Track size       | `60×24` (`c.$grid * 15 × 6`)                     | `32×18.4`                                 |
| Colors           | `colorSuccess` on / `colorNeutral` off           | `#00d4aa` on / `#b5b8ba` off              |
| State text       | `ON` / `OFF` rendered inside the track           | Removed — visual only                     |
| Stylesheet       | `Toggle.module.scss` with SCSS `@use` and mixins | `Toggle.module.css` using CSS variables   |
| `data-test` hook | `${dataTest}-state` wraps the `ON` / `OFF` text  | `${dataTest}-state` is the track `<span>` |

**Before:**

```tsx
import { Toggle } from '@hazelcast/ui'
;<Toggle name="notifications" checked label="Enable notifications" onChange={onChange} />
// Renders a 60×24 track with the word "ON" inside.
```

**After:**

```tsx
import { Toggle } from '@hazelcast/ui'
;<Toggle name="notifications" checked label="Enable notifications" onChange={onChange} />
// Renders a 32×18 pill with a sliding thumb. No inline text.
```

If you relied on the `ON` / `OFF` text node (e.g. in tests with `getByText('ON')`), switch to asserting `checked` on the input or the `aria-checked` state.

---

## Deprecated components

Removed from the main `@hazelcast/ui` entry but available at `@hazelcast/ui/old`.

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

### `ButtonGroup`

Groups several `Button`s into a single visually-joined control. Buttons share border-radius and shadow, and adjacent borders collapse so the group reads as one element.

```tsx
import { Button, ButtonGroup } from '@hazelcast/ui'
;<ButtonGroup>
  <Button variant="outline">Day</Button>
  <Button variant="outline">Week</Button>
  <Button variant="outline">Month</Button>
</ButtonGroup>
```

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
