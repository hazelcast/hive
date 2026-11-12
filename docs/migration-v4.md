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
| New      | `SideNavigation`                                            | Composable modern desktop navigation and mobile drawer; `AppSidebar` remains available                                                                                                                                          | n/a             |
| New      | `TopNavigation`                                             | Composable v4 header; existing `AppHeader` remains unchanged                                                                                                                                                                    | n/a             |
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
| Updated  | `Toast`                                                     | Rebuilt on Radix UI Toast; new `variant` prop (`success/error/warn/info`), replaces `type` (`success/info/warning/critical`); `id`, `open`, `onOpenChange`, `duration` props replace react-toastify coupling; SCSS → CSS        | ✅              |
| Updated  | `Alert`                                                     | HIVE 4.0 restyle; tinted surface, matching border and coloured icon/title reusing the Toast colour system; full-width banner; API unchanged; SCSS → CSS                                                                         | ✅              |
| Updated  | `Notification`                                              | HIVE 4.0 restyle; tinted surface, matching border and coloured icon/text reusing the Toast colour system; 8px radius; API unchanged; SCSS → CSS                                                                                 | ✅              |

---

## Updated components

Components that changed in a breaking way. Old version available at `@hazelcast/ui/old`.

### Side navigation integration

`SideNavigation` is an opt-in modern shell; the existing `AppSidebar` remains available. For a Cloud navigation that defaults to collapsed, use `initialOpen={false}` and choose an application-specific `storageKey`. Persisted values override `initialOpen`, including a stored `false`. The default key is `SideBarMenu`; reuse it only when its existing preference should carry over. Favorites and section states use the shared legacy keys by default, even with a custom `storageKey`. Set `namespaceStorage` to isolate them by key; existing values are not migrated automatically. Migrating or clearing an old key is the consumer's choice.

For a footer that should disappear in the collapsed rail, set `hideFooterWhenCollapsed`. For external desktop or mobile controls, give `SideNavigation` a stable `id` and use it for the control's `aria-controls`, with `aria-expanded` reflecting the controlled state. For a mobile drawer below a header, use `mobileDialogClassName` to set its top offset with the same CSS token-based height as the header. The drawer remains modal, so the header is not interactive while it is open. See the SideNavigation Storybook documentation for router adapters and examples.

### `TopNavigation` (optional migration from `AppHeader`)

`AppHeader` and its deep import remain unchanged. `TopNavigation` is a separate, opt-in layout exported from `@hazelcast/ui`. It does not implement cluster selection, navigation, authentication, account menus or product routes; supply existing consumer components in its slots.

```tsx
import { TopNavigation } from '@hazelcast/ui'

;<TopNavigation
  layout="grouped"
  logo={
    <HomeLink>
      <FullLogo />
    </HomeLink>
  }
  mobileLogo={
    <HomeLink>
      <CompactLogo />
    </HomeLink>
  }
  name="Cloud"
  mobile={isMobile}
  mobileMenu={{ label: menuOpen ? 'Close menu' : 'Open menu', expanded: menuOpen, controls: 'sidebar', onClick: toggleMenu }}
  navigation={<ClusterSelector />}
  actions={<AccountActions />}
/>
```

`logo` is required; `mobileLogo`, `name`, `navigation`, `children`, `actions`, `mobile`, `mobileMenu`, `className`, `navigationClassName`, `actionsClassName`, and `data-test` are optional. `children` follows `navigation` in the leading group. The optional menu trigger is controlled by the consumer and appears only in mobile mode. Its `label` and `onClick` are required; `expanded` and `controls` describe the consumer-owned sidebar. A separate mobile logo is optional: without one the supplied logo remains visible in both layouts.

`layout` defaults to `spaced`; `grouped` uses a tighter brand group and additional desktop navigation spacing. `mobile` defaults to `false`; applications choose their own breakpoint and update the prop when their layout changes. Product controls must supply their own responsive sizing and accessible interactions. At narrow widths, a header with many fixed-size actions can leave little room for the navigation slot; consumers should provide an appropriate compact or overflow treatment. Menus and their focus management remain the application's responsibility.

For existing MC integrations, move the linked branded image to `logo`/`mobileLogo`, the product and instance names to `name`, the cluster selector to `navigation`, the cluster-connections link to `children`, and documentation/support/account controls to `actions`. Preserve the existing permission checks, cluster navigation and menu logic in the consumer. Cloud can supply its linked logos, cluster dropdown or Home link, mobile sidebar handler and account/actions in the same slots. These are integration instructions, not changes to either application.

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

### `Toast`

Rebuilt on [Radix UI Toast](https://www.radix-ui.com/primitives/docs/components/toast). The component is no longer coupled to react-toastify. It renders a single notification with a colored left bar, a variant icon, content, and a close button. Styles have been migrated from SCSS to CSS modules using `--hive-*` design tokens.

**Old import (temporary fallback):**

```ts
import { Toast } from '@hazelcast/ui/old'
```

**Prop changes:**

| Prop                  | v3                                               | v4                                                    |
| --------------------- | ------------------------------------------------ | ----------------------------------------------------- |
| `type`                | `'success' \| 'info' \| 'warning' \| 'critical'` | **removed** — replaced by `variant`                   |
| `variant`             | —                                                | new — `'success' \| 'error' \| 'warn' \| 'info'`      |
| `id`                  | —                                                | new — unique key for deduplication and dismissal      |
| `open`                | —                                                | new — controlled open state (Radix pattern)           |
| `onOpenChange`        | —                                                | new — called with `false` when the toast is dismissed |
| `duration`            | —                                                | new — ms before auto-dismiss; `Infinity` = persistent |
| `closeToast`          | optional                                         | **removed** — use `onOpenChange`                      |
| `dismissableByEscKey` | optional, default `true`                         | **removed** — handled by Radix internally             |
| `content`             | `ReactNode`                                      | unchanged                                             |
| `className`           | optional                                         | unchanged                                             |

**Before:**

```tsx
import { Toast } from '@hazelcast/ui'
// Rendered by react-toastify — not mounted directly
;<Toast type="success" content="Saved." closeToast={close} />
```

**After:**

```tsx
import { Toast } from '@hazelcast/ui'
;<Toast id="save-toast" variant="success" content="Saved." duration={5000} open={open} onOpenChange={setOpen} />
```

Pair with `Toast.Provider` and `Toast.Viewport` from `@radix-ui/react-toast` (or use the app-level `ToastProvider` that wraps these).

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

### `Alert`

`Alert` has been restyled to HIVE 4.0. Each intent now reuses the **Toast colour system** — a tinted surface, a matching border, and a coloured icon and title — and the card spans the full width of its container. The component behaviour and public API are unchanged.

**Old import (temporary fallback):**

```ts
import { Alert } from '@hazelcast/ui/old'
```

**Prop changes:**

| Prop  | v3              | v4                                 |
| ----- | --------------- | ---------------------------------- |
| _all_ | same public API | same — visual-only breaking change |

**Before:**

```tsx
<Alert type="success" title="Success" content="Your changes have been saved successfully." closeToast={onClose} />
```

**After:**

```tsx
<Alert type="success" title="Success" content="Your changes have been saved successfully." closeToast={onClose} />
```

---

### `Notification`

`Notification` has been restyled to HIVE 4.0: a tinted surface, a matching border, coloured icon and text (reusing the **Toast colour system**), and an 8px radius. The component behaviour and public API are unchanged.

**Old import (temporary fallback):**

```ts
import { Notification } from '@hazelcast/ui/old'
```

**Prop changes:**

| Prop  | v3              | v4                                 |
| ----- | --------------- | ---------------------------------- |
| _all_ | same public API | same — visual-only breaking change |

**Before:**

```tsx
<Notification type="success" link="View" linkHref="/logs">
  Your changes have been saved successfully.
</Notification>
```

**After:**

```tsx
<Notification type="success" link="View" linkHref="/logs">
  Your changes have been saved successfully.
</Notification>
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

### `Toast` (legacy)

The original react-toastify–coupled `Toast` (type: `success | info | warning | critical`, `closeToast` prop) has been superseded by the new Radix UI-based `Toast`. The legacy component is kept at `/old` for backward compat.

**Temporary fallback:**

```ts
import { Toast } from '@hazelcast/ui/old'
```

**Recommended replacement:**

```tsx
import { Toast } from '@hazelcast/ui'
;<Toast id="my-toast" variant="success" content="Saved." duration={5000} open={open} onOpenChange={setOpen} />
```

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

### Dark mode

The `-v4` color tokens are defined with `light-dark()`. Each token has `-light-mode` and `-dark-mode` variants that can be overridden individually.

Use `useThemePreference` to drive the theme. It exposes `preference` (`light`, `dark`, or `system`), the resolved `scheme` (`light` or `dark`), and `setPreference`. System is the default for opted-in apps and follows OS changes while the app is open. Explicit choices are stored as JSON in `localStorage` (`hive-color-scheme`); existing saved Light and Dark choices remain valid.

HIVE defaults to light for backward compatibility. To opt in without a first-paint flash, include HIVE's bootstrap script in the document head before the app styles render. It reads the saved choice or falls back to the OS preference. The app should then call `useColorScheme` once near its root and connect the result to its theme toggle.

```tsx
import { getColorSchemeBootstrapScript, ThemeSwitcher, useThemePreference } from '@hazelcast/ui'

// Render in the server document <head>, before stylesheets and first paint.
const ThemeBootstrap = () => <script dangerouslySetInnerHTML={{ __html: getColorSchemeBootstrapScript() }} />

const ThemeToggle = () => {
  const { preference, setPreference } = useThemePreference()

  return <ThemeSwitcher value={preference} onChange={setPreference} />
}
```

Render `ThemeBootstrap` in the document head and call the hook once near the app root. Hook-only use opts into OS theme after mount and may flash; consumers that do not opt in remain light. Add the app's CSP nonce to the bootstrap script when required. A subtree can still be forced with `color-scheme: light` / `dark`.

`ThemeSwitcher` is controlled: it does not apply themes or access storage by itself. If the switcher is rendered below the app root, pass the root controller's preference and setter through props or the app's context. The existing `useColorScheme()` tuple API remains compatible: it returns a resolved Light/Dark value and its setter selects an explicit Light or Dark preference. Do not mount both hooks as independent theme controllers.

Requires Chrome/Edge 123+, Safari 17.5+, Firefox 120+. v3 (non-`-v4`) tokens are light-only.

## Management Center Consumer Note

The following translations apply only when migrating Management Center call sites that use its former `HiveControls` adapter. They are not Hive aliases or required mappings for other consumers; Hive's public APIs remain `Button`/`IconButton` `color` and `variant` props. Keep any necessary translation in the consuming application rather than adding MC-specific compatibility props to Hive.

For the MC values inventoried during this migration, use `variant="ghost"` instead of legacy `variant="text"`; use `color="primary"` instead of `brand` or `authPrimary`; and use `color="secondary"` instead of `authSecondary` or `light`. The former adapter rendered labels uppercase by default; preserve that only where the MC call site needs it with `style={{ textTransform: 'uppercase' }}`, or use `none` where the old call site passed `capitalize={false}`. For IconButton, the MC adapter mapped `kind="primary"` to `color="primary" variant="contained"`; its other kinds mapped to `color="secondary" variant="ghost"`. These are consumer-side visual translations, not new Hive prop names.

`Tooltip` supports element and render-function children. Use `side`, `align`, `sideOffset`, `avoidCollisions`, and `open` instead of legacy placement/visibility aliases. Disabled native triggers receive a keyboard-focusable wrapper so hover and focus tooltips work without enabling the control.

```tsx
import { Tooltip } from '@hazelcast/ui'

;<Tooltip content="Unavailable" side="right" sideOffset={8}>
  {(ref) => (
    <button ref={ref} disabled>
      Save
    </button>
  )}
</Tooltip>
```

### Imperative Toast service

Mount one `ToastContainer` in the application and import the singleton `toast` service. IDs are returned as strings; numeric IDs are normalized to strings. `autoClose: false` keeps a toast open until dismissed. Custom content may render its own close action with the supplied `closeToast` callback.

```tsx
import { ToastContainer, toast } from '@hazelcast/ui'

;<ToastContainer />

const id = toast.error('Connection failed', {
  toastId: 'connection-error',
  autoClose: false,
  onClose: () => reportToastClosed(),
})

toast.custom(({ closeToast }) => <button onClick={closeToast}>Review license</button>, {
  toastId: 'license',
  variant: 'warn',
  closeButton: false,
  closeOnClick: false,
})

toast.isActive(id)
toast.dismiss(id)
toast.dismiss()
```

Supported variants are `success`, `error`, `warn`, and `info`. `closeButton` defaults to `true`; `closeOnClick` defaults to `false`.

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
