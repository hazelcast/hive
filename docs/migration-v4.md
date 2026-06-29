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

| Category | Component                                                   | Change                                                                                                                                                                                                                          | `/old` fallback |
| -------- | ----------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------- |
| Updated  | `SimpleTable`                                               | Radix UI-inspired structure; `.Td` → `.Cell`, `.Th` → `.ColumnHeaderCell`; new `.RowHeaderCell`; new `variant`, `align`, `justify` props; SCSS → CSS                                                                            | ✅              |
| Updated  | `Tooltip`                                                   | Radix UI base; new props; no render-prop children                                                                                                                                                                               | ✅              |
| Updated  | `Badge`                                                     | `size` prop removed; borders + 8px radius added                                                                                                                                                                                 | ❌              |
| Updated  | `Button`                                                    | HIVE 4.0 rebrand; `color` × `variant` axes (variant: contained/outlined/ghost/link, color: primary/secondary/warning/danger); `tooltipColor` removed; `size` reintroduced (`small`/`regular`); `capitalize` removed; SCSS → CSS | ✅              |
| Updated  | `IconButton`                                                | HIVE 4.0 rebrand; `kind` → `variant`; `size` is `sm`/`md`/`lg`; `padding` removed; SCSS → CSS                                                                                                                                   | ✅              |
| New      | `ButtonGroup`                                               | Group of joined `Button`s sharing border-radius and shadow                                                                                                                                                                      | n/a             |
| Updated  | `Toggle`                                                    | HIVE 4.0 pill switch; SCSS → CSS; no ON/OFF label                                                                                                                                                                               | ✅              |
| Updated  | `TextField`                                                 | HIVE 4.0 rebrand; 36px height; 8px radius; `--hive-*` tokens; SCSS → CSS                                                                                                                                                        | ✅              |
| Updated  | `TextArea`                                                  | HIVE 4.0 rebrand; 8px radius; white surface; neutral border, brand focus ring, error border; `--hive-*` tokens; SCSS → CSS                                                                                                      | ✅              |
| Updated  | `NumberField`                                               | HIVE 4.0 rebrand; inherits v4 `TextField` input; single Regular size (`size` prop removed); stepper buttons re-tokenised to `--hive-*`; SCSS → CSS                                                                              | ✅              |
| Updated  | `Checkbox`                                                  | HIVE 4.0 rebrand; primary-v4 fill when checked; 4px radius box; focus halo; `--hive-*` tokens; SCSS → CSS                                                                                                                       | ✅              |
| Updated  | `Tabs`                                                      | HIVE 4.0 visual redesign; line-tab style with active underline and hover color treatment; no API changes; SCSS → CSS                                                                                                            | ✅              |
| Updated  | `Modal`                                                     | HIVE 4.0 redesign; new `intent`, `eyebrow`, `description`, `helperLink` props; tinted header gradient and framed icon tile; Cancel now precedes primary actions in DOM order; SCSS → CSS                                        | ✅              |
| Updated  | `SelectField` / `MultiSelectField` / `CheckableSelectField` | HIVE 4.0 rebrand; 36px height; 8px radius; new menu surface + hover/selected states; `--hive-*` tokens; SCSS → CSS                                                                                                              | ✅              |
| Updated  | `AutocompleteField`                                         | HIVE 4.0 rebrand; 36px height; 8px radius; new menu surface + hover/selected states; `--hive-*` tokens; SCSS → CSS                                                                                                              | ✅              |
| Updated  | `PasswordField`                                             | HIVE 4.0 rebrand via v4 `TextField`; locked to a single compact size (`size` prop removed); reveal eye button gains a circular hover/focus ring matching `NumberField`                                                          | ✅              |
| Updated  | `InteractiveListFormik`                                     | HIVE 4.0 redesign for tokenized list-entry input with integrated add button, refreshed item chips, and docs/stories overhaul; API unchanged; SCSS → CSS                                                                         | ✅              |

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

Button has been rebranded to HIVE 4.0. The styling axis is now **two orthogonal props**: `variant` controls the visual treatment, `color` controls the semantic intent. `size` is removed. `capitalize` is removed. `tooltipColor` is removed.

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
| `size?: 'small' \| 'regular'`                                                                             | n/a                             | removed                                          |
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

`IconButton` has been rebranded to match the new `Button`. The `kind` prop is replaced by `variant` + `color`. `size` is removed. `padding` is removed. `iconSize` is removed.

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
| `size?: 'small' \| 'regular'`                                   | n/a                               | removed                                   |
| `iconSize?: IconSize`                                           | optional                          | removed — derived internally              |
| `padding?: 'small' \| 'normal'`                                 | optional                          | removed — fully driven by `size`          |

**Before:**

```tsx
<IconButton kind="primary" size="medium" padding="normal" icon={X} ariaLabel="Close" />
```

**After:**

```tsx
<IconButton variant="contained" color="primary" icon={X} ariaLabel="Close" />
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

### `TextField`

Visual redesign to the HIVE 4.0 input: compact size (`30px`), `8px` border-radius (was `4px`), `4px 12px` padding, `Inter Medium 14px` label, `Inter Regular 14px` input text, neutral border on default, brand outline on focus, error border on invalid. All values now come from `--hive-*` design tokens. Styles have been migrated from SCSS (`TextField.module.scss`) to CSS modules (`TextField.module.css`).

`size` is removed from the new `TextField` API.

**Old import (temporary fallback):**

```ts
import { TextField, TextFieldFormik } from '@hazelcast/ui/old'
```

**Prop changes:**

| Prop   | v3                         | v4      |
| ------ | -------------------------- | ------- |
| `size` | `small \| medium \| large` | removed |
| _rest_ | same public API            | same    |

**Visual / token changes:**

| Aspect           | v3                                                           | v4                                                          |
| ---------------- | ------------------------------------------------------------ | ----------------------------------------------------------- |
| Container height | `40px` (`c.$inputHeight`)                                    | `30px` (`calc(var(--hive-grid) * 7.5)`)                     |
| Border radius    | `4px` (`c.$borderRadius`)                                    | `8px` (`var(--hive-border-radius)`)                         |
| Padding          | `c.$grid * 2` vertical / `c.$grid * 3` horizontal            | `4px 12px`                                                  |
| Border (default) | `c.$colorNeutralLight`                                       | `var(--hive-color-border-v4)`                               |
| Border (focus)   | `c.$colorPrimary` outline glow                               | `var(--hive-color-primary-v4)` 2px outline                  |
| Border (error)   | `c.$colorError`                                              | `var(--hive-color-error-v4)`                                |
| Label            | `c.$colorTextSecondary`                                      | `var(--hive-color-text-v4)`, `Inter Medium 14px`            |
| Placeholder      | `c.$colorTextSecondary`                                      | `var(--hive-color-text-secondary-v4)`, `Inter Regular 14px` |
| Helper text      | `12px`                                                       | `12px` (`var(--hive-font-size-body-smaller)`)               |
| Stylesheet       | `TextField.module.scss` with SCSS `@use`, mixins, `c.$grid…` | `TextField.module.css` using `--hive-*` CSS variables       |

**Before:**

```tsx
import { TextField } from '@hazelcast/ui'
;<TextField name="cluster" label="Cluster name" value={value} onChange={onChange} />
// Renders a 40px-tall input with 4px radius.
```

**After:**

```tsx
import { TextField } from '@hazelcast/ui'
;<TextField name="cluster" label="Cluster name" value={value} onChange={onChange} />
// Renders a 30px-tall compact input with 8px radius and HIVE 4.0 colors.
```

`NumberField`, `PasswordField`, `AutocompleteField`, `TimeField`, and `SelectField` all consume `TextField`-style classes; their visuals follow automatically.

---

### `TextArea`

Visual redesign to the HIVE 4.0 multi-line input: `8px` border-radius (was `4px`), white surface (`--hive-color-neutral-white-v4`), neutral border on default (`--hive-color-border-v4`), brand focus ring (`--hive-color-primary-v4` border + `3px` halo), error border on invalid (`--hive-color-error-v4`), and `8px 12px` padding. Disabled state uses `opacity: 0.5`. The field remains vertically resizable by default (`resizable={false}` to lock). All values now come from `--hive-*` design tokens. Styles have been migrated from SCSS (`TextArea.module.scss`) to CSS modules (`TextArea.module.css`).

`size` is removed from the new `TextArea` API.

**Old import (temporary fallback):**

```ts
import { TextArea, TextAreaFormik } from '@hazelcast/ui/old'
```

**Prop changes:**

| Prop   | v3                | v4      |
| ------ | ----------------- | ------- |
| `size` | `small \| medium` | removed |
| _rest_ | same public API   | same    |

**Visual / token changes:**

| Aspect           | v3                                                          | v4                                                       |
| ---------------- | ----------------------------------------------------------- | -------------------------------------------------------- |
| Border radius    | `4px` (`c.$borderRadius`)                                   | `8px` (`var(--hive-border-radius)`)                      |
| Surface          | `c.$colorOverlayBackground`                                 | `var(--hive-color-neutral-white-v4)`                     |
| Border (default) | `c.$colorNeutralLight`                                      | `var(--hive-color-border-v4)`                            |
| Border (hover)   | `c.$colorPrimary`                                           | `var(--hive-color-text-v4)`                              |
| Border (focus)   | outline mixin glow                                          | `var(--hive-color-primary-v4)` border + `3px` brand halo |
| Border (error)   | `c.$colorError`                                             | `var(--hive-color-error-v4)`                             |
| Placeholder      | `c.$colorTextSecondary`                                     | `var(--hive-color-text-secondary-v4)`                    |
| Stylesheet       | `TextArea.module.scss` with SCSS `@use`, mixins, `c.$grid…` | `TextArea.module.css` using `--hive-*` CSS variables     |

---

### `NumberField`

Visual alignment to HIVE 4.0. `NumberField` is built on `TextField`, so its input surface (single “Regular” size, 8px radius, neutral border, brand focus ring, error border) is inherited from the v4 `TextField` automatically. The component-specific styles — the increment / decrement stepper buttons and their positioning — have been migrated from SCSS (`NumberField.module.scss`) to CSS modules (`NumberField.module.css`) and re-expressed with `--hive-*` design tokens.

v4 fields use a single size, so the `size` prop has been removed from the public API; the field always renders at the Regular size.

**Old import (temporary fallback):**

```ts
import { NumberField, NumberFieldFormik } from '@hazelcast/ui/old'
```

**Prop changes:**

| Prop   | v3                         | v4                                                   |
| ------ | -------------------------- | ---------------------------------------------------- |
| `size` | `small \| medium \| large` | **removed** — always renders the single Regular size |
| _rest_ | same public API            | same — visual-only                                   |

**Visual / token changes:**

| Aspect              | v3                                                           | v4                                                              |
| ------------------- | ------------------------------------------------------------ | --------------------------------------------------------------- |
| Input surface       | v3 `TextField` styles                                        | inherited from v4 `TextField` (single Regular size, 8px radius) |
| Stepper icon color  | `c.$colorPrimary`                                            | `var(--hive-color-primary-v4)`                                  |
| Stepper glyph line  | `black`                                                      | `var(--hive-color-text-v4)`                                     |
| Spacing / positions | SCSS `c.$grid`, `c.$iconSizeSmall`, `c.$iconSizeSmallMedium` | `calc(var(--hive-grid) * n)`                                    |
| Stylesheet          | `NumberField.module.scss` with SCSS `@use`, `$grid…`         | `NumberField.module.css` using `--hive-*` CSS variables         |

---

### `Checkbox`

Visual redesign to the HIVE 4.0 checkbox: 16×16 box with `4px` radius, `--hive-color-primary-v4` fill when checked, white check icon, `--hive-color-border-v4` outline when unchecked, subtle drop shadow, and a `3px` brand-colored focus halo. Disabled state is communicated via `opacity: 0.5`. Indeterminate (mixed) state remains supported. Styles have been migrated from SCSS (`Checkbox.module.scss`) to CSS modules (`Checkbox.module.css`).

The public prop contract is unchanged; only visuals have changed.

**Old import (temporary fallback):**

```ts
import { Checkbox, CheckboxFormik } from '@hazelcast/ui/old'
```

**Prop changes:**

| Prop  | v3              | v4                                 |
| ----- | --------------- | ---------------------------------- |
| _all_ | same public API | same — visual-only breaking change |

**Visual / token changes:**

| Aspect          | v3                                                       | v4                                                                 |
| --------------- | -------------------------------------------------------- | ------------------------------------------------------------------ |
| Box size        | `iconSizeSmall + 2 × borderWidth`                        | `16px`                                                             |
| Box radius      | `c.$grid` (4px)                                          | `4px` (`calc(var(--hive-grid) * 1)`)                               |
| Box (unchecked) | white bg, `c.$colorNeutralLight` border                  | white bg, `var(--hive-color-border-v4)` border, subtle drop shadow |
| Box (checked)   | `c.$colorSuccess` bg + border                            | `var(--hive-color-primary-v4)` bg + border                         |
| Box (indeterm.) | `c.$colorPrimaryLight`                                   | `var(--hive-color-primary-v4)` (same as checked)                   |
| Box (hover)     | `c.$colorPrimary` border                                 | `var(--hive-color-primary-v4)` border                              |
| Box (focus)     | `outlineFormField` mixin                                 | `3px` halo (`oklch(from primary-v4 l c h / 0.5)`)                  |
| Box (disabled)  | `c.$colorNeutralLight` border, `c.$colorNeutral` checked | `opacity: 0.5` on the whole row                                    |
| Box (error)     | `c.$colorError` border                                   | `var(--hive-color-error-v4)` border                                |
| Label           | `bodySmall` typography mixin                             | `Inter Regular 14/20`, `var(--hive-color-text-v4)`                 |
| Label gap       | `c.$grid * 1.25`                                         | `8px` (`calc(var(--hive-grid) * 2)`)                               |
| Stylesheet      | `Checkbox.module.scss`                                   | `Checkbox.module.css` using `--hive-*` CSS variables               |

**Before:**

```tsx
import { Checkbox } from '@hazelcast/ui'
;<Checkbox name="tos" label="Accept terms" checked={value} onChange={onChange} />
// Renders a green-checked v3 checkbox.
```

**After:**

```tsx
import { Checkbox } from '@hazelcast/ui'
;<Checkbox name="tos" label="Accept terms" checked={value} onChange={onChange} />
// Renders a primary-teal HIVE 4.0 checkbox with focus halo.
```

---

### `Tabs`

Visual redesign to HIVE 4.0 line-tabs with active underline and hover color treatment. The typography and interaction model remain unchanged. Styles have been migrated from SCSS to CSS modules.

The public prop contract is unchanged; only visuals and internal styling have changed.

**Old import (temporary fallback):**

```ts
import { Tab, TabList, TabPanel, TabContext, TabContextProvider, TabContextProviderControlled } from '@hazelcast/ui/old'
```

**Prop changes:**

| Prop  | v3              | v4                                 |
| ----- | --------------- | ---------------------------------- |
| _all_ | same public API | same — visual-only breaking change |

**Visual / DOM changes:**

| Aspect            | v3                                            | v4                                                            |
| ----------------- | --------------------------------------------- | ------------------------------------------------------------- |
| Container height  | `40px` (`c.$grid * 10`)                       | `36px`                                                        |
| Container radius  | none (flex row)                               | `14px` (pill shape)                                           |
| Container bg      | transparent                                   | `#eaebec` (neutral gray)                                      |
| Tab height        | `40px` (`c.$grid * 10`)                       | `29px`                                                        |
| Tab padding       | `1px 20px` (`c.$grid × c.$grid * 5`)          | `5px 9px`                                                     |
| Tab radius        | none (underline style)                        | `14px` (pill shape)                                           |
| Selected state    | blue underline (`borderBottom` + `boxShadow`) | white background (`#fff`)                                     |
| Unselected border | `1px solid` neutral light bottom              | removed (transparent)                                         |
| Stylesheet        | `Tab.module.scss` + `TabList.module.scss`     | `Tab.module.scss` + `TabList.module.scss` using CSS variables |

**Before:**

```tsx
import { TabContextProvider, TabList, Tab, TabPanel } from '@hazelcast/ui'
;<TabContextProvider>
  <TabList ariaLabel="Tabs demo">
    <Tab value={0}>General</Tab>
    <Tab value={1}>Security</Tab>
    <Tab value={2}>Notifications</Tab>
  </TabList>
  <TabPanel value={0}>Content for General</TabPanel>
  <TabPanel value={1}>Content for Security</TabPanel>
  <TabPanel value={2}>Content for Notifications</TabPanel>
</TabContextProvider>
// Renders as a row of underlined tabs with blue underline for selected.
```

**After:**

```tsx
import { TabContextProvider, TabList, Tab, TabPanel } from '@hazelcast/ui'
;<TabContextProvider>
  <TabList ariaLabel="Tabs demo">
    <Tab value={0}>General</Tab>
    <Tab value={1}>Security</Tab>
    <Tab value={2}>Notifications</Tab>
  </TabList>
  <TabPanel value={0}>Content for General</TabPanel>
  <TabPanel value={1}>Content for Security</TabPanel>
  <TabPanel value={2}>Content for Notifications</TabPanel>
</TabContextProvider>
// Renders as a line-tab row with active underline.
```

---

### `SelectField` / `MultiSelectField` / `CheckableSelectField`

Visual redesign of the entire `react-select`-based stack to the HIVE 4.0 input + menu surface: `36px` control height (was `40px`), `8px` border-radius (was `4px`), brand-color focus halo, neutral-on-hover and gray-on-selected option rows, and a soft elevation shadow on the menu. All values come from `--hive-*` design tokens. Styles have been migrated from SCSS modules to CSS modules.

The public prop contract is unchanged; only visuals have changed. The same applies to the `*FieldFormik` wrappers.

**Old import (temporary fallback):**

```ts
import {
  SelectField,
  SelectFieldFormik,
  MultiSelectField,
  MultiSelectFieldFormik,
  CheckableSelectField,
  CheckableSelectFieldFormik,
} from '@hazelcast/ui/old'
```

**Visual / token changes:**

| Aspect            | v3                                                   | v4                                               |
| ----------------- | ---------------------------------------------------- | ------------------------------------------------ |
| Control height    | `40px`                                               | `36px` (`calc(var(--hive-grid) * 9)`)            |
| Border radius     | `4px`                                                | `8px` (`var(--hive-border-radius)`)              |
| Border (default)  | `c.$colorNeutralLight`                               | `var(--hive-color-border-v4)`                    |
| Border (hover)    | `c.$colorPrimary`                                    | `var(--hive-color-text-v4)`                      |
| Border (focus)    | `c.$colorPrimary` outline glow                       | `var(--hive-color-primary-v4)` + 3px halo        |
| Menu shadow       | `c.$selectMenuShadowSize` SCSS variable              | `0 4px 12px oklch(0 0 0 / 0.08)` soft elevation  |
| Option (hover)    | `c.$colorNeutral`                                    | `var(--hive-color-surface-hover-v4)`             |
| Option (selected) | `c.$colorPrimary` text                               | `var(--hive-color-surface-active-v4)` filled row |
| Stylesheet        | `*.module.scss` with SCSS `@use`, mixins, `c.$grid…` | `*.module.css` using `--hive-*` CSS variables    |

---

### `AutocompleteField`

Same HIVE 4.0 redesign as `SelectField`, with the autocomplete-specific dropdown that visually attaches to the bottom of the control (no top border on the menu, top corners square on the open control).

The public prop contract is unchanged.

**Old import (temporary fallback):**

```ts
import { AutocompleteField, AutocompleteFieldFormik } from '@hazelcast/ui/old'
```

---

### `Modal`

HIVE 4.0 redesign with a richer header anatomy and intent-driven theming. The modal container is wider (`max-width: 480px`), uses the neutral-lighter v4 surface, and the header carries a soft gradient keyed to the new `intent` prop. An optional 40×40 icon tile, an `eyebrow` label, and a `description` paragraph give modals a consistent look across the product. A `helperLink` slot in the footer renders a docs link next to the actions. Styles have been migrated from SCSS to CSS modules.

**DOM order change:** the Cancel button now precedes the primary actions inside the footer so keyboard focus reaches the safer choice first. Existing consumers that asserted on `footer.children` order will need to update those tests.

**Old import (temporary fallback):**

```ts
import { Modal, setAppElement } from '@hazelcast/ui/old'
```

**Prop changes:**

| Prop          | v3        | v4                                                                    |
| ------------- | --------- | --------------------------------------------------------------------- |
| `intent`      | —         | new — `'action' \| 'confirm' \| 'info' \| 'danger' \| 'success'`      |
| `eyebrow`     | —         | new — category label above the title                                  |
| `description` | —         | new — short paragraph under the title                                 |
| `helperLink`  | —         | new — `{ label, href, ariaLabel?, target?, rel? }` footer docs link   |
| `icon`        | unchanged | unchanged — now renders inside a framed 40×40 tile coloured by intent |
| `title`       | unchanged | unchanged                                                             |
| `actions`     | unchanged | unchanged — order in footer is now `[Cancel, ...actions]`             |
| `hideActions` | unchanged | unchanged                                                             |
| `closable`    | unchanged | unchanged                                                             |

**Before:**

```tsx
import { Modal } from '@hazelcast/ui'
;<Modal
  isOpen={open}
  onClose={close}
  title="Delete cluster"
  icon={Trash2}
  iconAriaLabel="Delete"
  actions={[{ children: 'Delete', onClick: onDelete, color: 'danger' }]}
>
  This action cannot be undone.
</Modal>
```

**After:**

```tsx
import { Modal } from '@hazelcast/ui'
;<Modal
  isOpen={open}
  onClose={close}
  intent="danger"
  eyebrow="Danger zone"
  icon={Trash2}
  iconAriaLabel="Delete"
  title="Delete cluster"
  description="This permanently deletes the cluster and all data. Backups, IP whitelists, and saved configuration will be removed."
  actions={[{ children: 'Delete forever', onClick: onDelete, color: 'danger' }]}
  helperLink={{ label: 'Learn more in docs', href: '/docs/clusters#delete' }}
/>
```

---

### `SimpleTable`

Restyled to match the [Radix UI Table](https://www.radix-ui.com/themes/docs/components/table) component design. The sub-component names and available props have been updated to align with the Radix API. Two compound sub-components (`.Td` and `.Th`) have been renamed; a new `.RowHeaderCell` sub-component is added. The stylesheet has been migrated from SCSS to CSS modules.

**Old import (temporary fallback):**

```ts
import { SimpleTable } from '@hazelcast/ui/old'
```

**Prop changes:**

| Prop / Sub-component                                                                               | v3                   | v4                                                                     |
| -------------------------------------------------------------------------------------------------- | -------------------- | ---------------------------------------------------------------------- |
| `variant?: 'surface' \| 'ghost'`                                                                   | —                    | new — `'ghost'` (default) is borderless; `'surface'` adds a border box |
| `SimpleTable.Td`                                                                                   | data cell (`<td>`)   | **renamed** to `SimpleTable.Cell`                                      |
| `SimpleTable.Th`                                                                                   | header cell (`<th>`) | **renamed** to `SimpleTable.ColumnHeaderCell`                          |
| `SimpleTable.RowHeaderCell`                                                                        | —                    | new — `<th scope="row">` for row headers                               |
| `SimpleTable.Row` `align?: 'start' \| 'center' \| 'end' \| 'baseline'`                             | —                    | new — vertical alignment of cells within the row                       |
| `SimpleTable.Cell` / `ColumnHeaderCell` / `RowHeaderCell` `justify?: 'start' \| 'center' \| 'end'` | —                    | new — horizontal text alignment                                        |

**Visual / token changes:**

| Aspect          | v3                                                         | v4                                                                     |
| --------------- | ---------------------------------------------------------- | ---------------------------------------------------------------------- |
| Header cells    | unstyled `<th>` inside `<thead>`                           | medium-weight, secondary-color text, neutral-lighter bg, bottom border |
| Row separators  | column-based borders (`border-left`) on `<td>`             | row-based `border-top` between body rows                               |
| Surface variant | —                                                          | 1px border + 8px radius wrapping the table                             |
| Stylesheet      | `SimpleTable.module.scss` with SCSS `@use` and `c.$…` vars | `SimpleTable.module.css` using `--hive-*` CSS variables                |

**Before:**

```tsx
import { SimpleTable } from '@hazelcast/ui'
;<SimpleTable>
  <SimpleTable.Header>
    <SimpleTable.Row>
      <SimpleTable.Th>Id</SimpleTable.Th>
      <SimpleTable.Th>Name</SimpleTable.Th>
    </SimpleTable.Row>
  </SimpleTable.Header>
  <SimpleTable.Body>
    <SimpleTable.Row>
      <SimpleTable.Td>2312312</SimpleTable.Td>
      <SimpleTable.Td>Bob Adams</SimpleTable.Td>
    </SimpleTable.Row>
  </SimpleTable.Body>
</SimpleTable>
```

**After:**

```tsx
import { SimpleTable } from '@hazelcast/ui'
;<SimpleTable variant="surface">
  <SimpleTable.Header>
    <SimpleTable.Row>
      <SimpleTable.ColumnHeaderCell>Id</SimpleTable.ColumnHeaderCell>
      <SimpleTable.ColumnHeaderCell>Name</SimpleTable.ColumnHeaderCell>
    </SimpleTable.Row>
  </SimpleTable.Header>
  <SimpleTable.Body>
    <SimpleTable.Row>
      <SimpleTable.Cell>2312312</SimpleTable.Cell>
      <SimpleTable.Cell>Bob Adams</SimpleTable.Cell>
    </SimpleTable.Row>
  </SimpleTable.Body>
</SimpleTable>
```

---

### `PasswordField`

PasswordField now renders on top of the v4 `TextField`, so it inherits the HIVE 4.0 input styling (36px height, 8px radius, `--hive-*` tokens). It is locked to a **single compact size** — the `size` prop and the `TextFieldSize` passthrough have been removed. The reveal eye button gains a circular hover and focus ring, matching the stepper affordance on `NumberField`.

**Old import (temporary fallback):**

```ts
import { PasswordField } from '@hazelcast/ui/old'
```

The `/old` build keeps the `size` prop for consumers that aren't ready to drop it yet.

**Prop changes:**

| Prop                   | v3                           | v4                               |
| ---------------------- | ---------------------------- | -------------------------------- |
| `size?: TextFieldSize` | optional, default `'medium'` | removed — always compact (small) |

**Before:**

```tsx
<PasswordField name="password" label="Password" size="large" value={value} onChange={onChange} />
```

**After:**

```tsx
<PasswordField name="password" label="Password" value={value} onChange={onChange} />
```

---

### `InteractiveListFormik`

InteractiveListFormik has been visually redesigned to HIVE 4.0 styling: tokenized input surface, integrated add button, and neutral removable item chips for entered values. The component behavior and API remain the same.

**Old import (temporary fallback):**

```ts
import { InteractiveListFormik } from '@hazelcast/ui/old'
```

**Prop changes:**

| Prop  | v3              | v4                                 |
| ----- | --------------- | ---------------------------------- |
| _all_ | same public API | same — visual-only breaking change |

**Before:**

```tsx
<InteractiveListFormik name="emails" label="Email address" placeholder="name@company.com" />
```

**After:**

```tsx
<InteractiveListFormik name="emails" label="Email address" placeholder="name@company.com" />
```

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
