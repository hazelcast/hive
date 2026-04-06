<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [@hazelcast/ui Audit Report — hazelcast-cloud-frontend](#hazelcastui-audit-report--hazelcast-cloud-frontend)
  - [Summary](#summary)
  - [Components by Usage (Descending)](#components-by-usage-descending)
  - [Component Details & Props Actually Used](#component-details--props-actually-used)
    - [`Button` — 82 usages across 57 files](#button--82-usages-across-57-files)
    - [`Link` — 50 usages across 20 files](#link--50-usages-across-20-files)
    - [`Card` — 45 usages across 44 files](#card--45-usages-across-44-files)
    - [`Alert` — 41 usages across 33 files](#alert--41-usages-across-33-files)
    - [`TextFieldFormik` — 38 usages across 19 files](#textfieldformik--38-usages-across-19-files)
    - [`NumberFieldFormik` — 38 usages across 11 files](#numberfieldformik--38-usages-across-11-files)
    - [`SelectFieldFormik` — 26 usages across 15 files](#selectfieldformik--26-usages-across-15-files)
    - [`Tooltip` — 21 usages across 21 files](#tooltip--21-usages-across-21-files)
    - [`TextField` — 10 usages across 9 files](#textfield--10-usages-across-9-files)
    - [`Loader` — 10 usages across 9 files](#loader--10-usages-across-9-files)
    - [`IconButton` — 8 usages](#iconbutton--8-usages)
  - [Type / Utility Imports (Non-JSX)](#type--utility-imports-non-jsx)
  - [Structured Data (JSON)](#structured-data-json)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# @hazelcast/ui Audit Report — hazelcast-cloud-frontend

## Summary

| Metric                             | Count |
| ---------------------------------- | ----- |
| Files with `@hazelcast/ui` imports | 185   |
| Unique names imported              | 49    |
| JSX component usages               | 451   |
| Total import statements            | 323   |

---

## Components by Usage (Descending)

| Rank | Component           | Files Importing | JSX Usages | Unique Props Used |
| ---- | ------------------- | --------------- | ---------- | ----------------- |
| 1    | `Button`            | 57              | 82         | 24                |
| 2    | `Link`              | 20              | 50         | 12                |
| 3    | `Card`              | 44              | 45         | 10                |
| 4    | `Alert`             | 33              | 41         | 7                 |
| 5    | `TextFieldFormik`   | 19              | 38         | 14                |
| 6    | `NumberFieldFormik` | 11              | 38         | 13                |
| 7    | `SelectFieldFormik` | 15              | 26         | 13                |
| 8    | `Tooltip`           | 21              | 21         | 9                 |
| 9    | `TextField`         | 9               | 10         | 15                |
| 10   | `Loader`            | 9               | 10         | 3                 |
| 11   | `IconButton`        | —               | 8          | 13                |

---

## Component Details & Props Actually Used

### `Button` — 82 usages across 57 files

```
activeId, bodyClassName, capitalize, className, color, component, disabled,
disabledTooltip, disabledTooltipVisible, href, iconLeft, iconLeftAriaLabel,
iconLeftClassName, iconRight, iconRightAriaLabel, kind, label, loading, onClick,
target, test, tooltip, type, variant
```

### `Link` — 50 usages across 20 files

```
ariaLabel, className, component, href, icon, id, kind, onClick, rel, size,
target, test
```

### `Card` — 45 usages across 44 files

```
className, contentClassName, headerClassName, headingContent, headingIcon,
iconClassName, test, title, titleClassName, variant
```

### `Alert` — 41 usages across 33 files

```
bodyClassName, className, closeToast, content, p, title, type
```

### `TextFieldFormik` — 38 usages across 19 files

```
HelpText, autoComplete, className, disabled, errorClassName, helperText,
inputClassName, inputTrailingIcon, label, labelClassName, name, placeholder,
size, type
```

### `NumberFieldFormik` — 38 usages across 11 files

```
HelpText, ariaLabel, className, errorClassName, helperText, inputClassName,
label, min, name, showAriaLabel, showIconButtons, size, step
```

### `SelectFieldFormik` — 26 usages across 15 files

```
HelpText, className, disabled, errorClassName, helperText, label, length,
menuPortalTarget, name, options, placeholder, size, test
```

### `Tooltip` — 21 usages across 21 files

```
HelpText, autoPlacement, className, content, div, offset, placement, span,
visible
```

### `TextField` — 10 usages across 9 files

```
autoComplete, className, disabled, error, errorClassName, id, inputClassName,
label, name, onChange, placeholder, size, test, type, value
```

### `Loader` — 10 usages across 9 files

```
className, size, test
```

### `IconButton` — 8 usages

```
className, disabled, disabledTooltip, disabledTooltipVisible, icon,
iconClassName, iconColor, kind, labelledby, onClick, ref, size, type
```

---

## Type / Utility Imports (Non-JSX)

These names are imported for type annotations or utility use only — not rendered as JSX:

| Name                | Files |
| ------------------- | ----- |
| `logger`            | 1     |
| `IconType`          | 1     |
| `ButtonVariant`     | 2     |
| `ButtonProps`       | 1     |
| `CardProps`         | 1     |
| `OverlayProps`      | 1     |
| `IconSize`          | 1     |
| `useOnClickOutside` | 2     |
| `HazelcastIcon`     | 2     |
| `mockOnClick`       | 3     |

---

## Structured Data (JSON)

```json
{
  "meta": {
    "repo": "hazelcast-cloud-frontend",
    "generatedAt": "2026-03-30",
    "filesScanned": 185,
    "uniqueImports": 49,
    "totalJsxUsages": 451
  },
  "components": {
    "Button": {
      "importCount": 57,
      "usageCount": 82,
      "props": [
        "activeId",
        "bodyClassName",
        "capitalize",
        "className",
        "color",
        "component",
        "disabled",
        "disabledTooltip",
        "disabledTooltipVisible",
        "href",
        "iconLeft",
        "iconLeftAriaLabel",
        "iconLeftClassName",
        "iconRight",
        "iconRightAriaLabel",
        "kind",
        "label",
        "loading",
        "onClick",
        "target",
        "test",
        "tooltip",
        "type",
        "variant"
      ]
    },
    "Link": {
      "importCount": 20,
      "usageCount": 50,
      "props": ["ariaLabel", "className", "component", "href", "icon", "id", "kind", "onClick", "rel", "size", "target", "test"]
    },
    "Card": {
      "importCount": 44,
      "usageCount": 45,
      "props": [
        "className",
        "contentClassName",
        "headerClassName",
        "headingContent",
        "headingIcon",
        "iconClassName",
        "test",
        "title",
        "titleClassName",
        "variant"
      ]
    },
    "Alert": {
      "importCount": 33,
      "usageCount": 41,
      "props": ["bodyClassName", "className", "closeToast", "content", "p", "title", "type"]
    },
    "TextFieldFormik": {
      "importCount": 19,
      "usageCount": 38,
      "props": [
        "HelpText",
        "autoComplete",
        "className",
        "disabled",
        "errorClassName",
        "helperText",
        "inputClassName",
        "inputTrailingIcon",
        "label",
        "labelClassName",
        "name",
        "placeholder",
        "size",
        "type"
      ]
    },
    "NumberFieldFormik": {
      "importCount": 11,
      "usageCount": 38,
      "props": [
        "HelpText",
        "ariaLabel",
        "className",
        "errorClassName",
        "helperText",
        "inputClassName",
        "label",
        "min",
        "name",
        "showAriaLabel",
        "showIconButtons",
        "size",
        "step"
      ]
    },
    "SelectFieldFormik": {
      "importCount": 15,
      "usageCount": 26,
      "props": [
        "HelpText",
        "className",
        "disabled",
        "errorClassName",
        "helperText",
        "label",
        "length",
        "menuPortalTarget",
        "name",
        "options",
        "placeholder",
        "size",
        "test"
      ]
    },
    "Tooltip": {
      "importCount": 21,
      "usageCount": 21,
      "props": ["HelpText", "autoPlacement", "className", "content", "div", "offset", "placement", "span", "visible"]
    },
    "TextField": {
      "importCount": 9,
      "usageCount": 10,
      "props": [
        "autoComplete",
        "className",
        "disabled",
        "error",
        "errorClassName",
        "id",
        "inputClassName",
        "label",
        "name",
        "onChange",
        "placeholder",
        "size",
        "test",
        "type",
        "value"
      ]
    },
    "Loader": {
      "importCount": 9,
      "usageCount": 10,
      "props": ["className", "size", "test"]
    },
    "IconButton": {
      "importCount": null,
      "usageCount": 8,
      "props": [
        "className",
        "disabled",
        "disabledTooltip",
        "disabledTooltipVisible",
        "icon",
        "iconClassName",
        "iconColor",
        "kind",
        "labelledby",
        "onClick",
        "ref",
        "size",
        "type"
      ]
    }
  },
  "typeAndUtilityImports": {
    "logger": { "files": 1 },
    "IconType": { "files": 1 },
    "ButtonVariant": { "files": 2 },
    "ButtonProps": { "files": 1 },
    "CardProps": { "files": 1 },
    "OverlayProps": { "files": 1 },
    "IconSize": { "files": 1 },
    "useOnClickOutside": { "files": 2 },
    "HazelcastIcon": { "files": 2 },
    "mockOnClick": { "files": 3 }
  }
}
```
