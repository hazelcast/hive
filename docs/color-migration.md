# HIVE Design System - Color Migration Guide

## Hazelcast Management Center Redesign

---

## Overview

This document maps every HIVE design system color token to its new value for the Hazelcast Management Center redesign. Token **names stay the same** - only the **values change**.

- **Format:** HEX for solid colors, RGBA for transparency
- **Dark mode** is the primary UI (management dashboard)
- **Light mode** is secondary (BYOC pages, supporting pages)

---

## 1. PRIMARY

> Main brand actions: buttons, links, focus rings, active states

| HIVE Token          | Role                                            | New Value                |
| :------------------ | :---------------------------------------------- | :----------------------- |
| `colorPrimary`      | All primary buttons, active states, focus rings | `#00d4aa`                |
| `colorPrimaryLight` | Primary hover, light tint backgrounds           | `rgba(0, 212, 170, 0.2)` |
| `colorPrimaryDark`  | Primary pressed/active state                    | `#00b392`                |

---

## 2. NEUTRALS

> Backgrounds, text, borders, cards

| HIVE Token                   | Role                             | Dark Mode | Light Mode |
| :--------------------------- | :------------------------------- | :-------- | :--------- |
| `colorNeutralWhite`          | Text on dark backgrounds         | `#fafafa` | `#fafafa`  |
| `colorNeutralLighter`        | Page background                  | `#1e1e2e` | `#fafafa`  |
| `colorNeutralLight`          | Card background                  | `#2a2d3a` | `#f8f8f9`  |
| `colorNeutral`               | Muted/secondary text             | `#9ca3af` | `#808080`  |
| `colorNeutralGray`           | Borders, dividers, input borders | `#3c4043` | `#e3e3e3`  |
| `colorNeutralDarkGrayAurora` | Popover/dropdown background      | `#2a2d3a` | `#f6f6f7`  |

---

## 3. SUCCESS

| HIVE Token            | Dark Mode                 | Light Mode               |
| :-------------------- | :------------------------ | :----------------------- |
| `colorSuccess`        | `#00d4aa`                 | `#16a34a`                |
| `colorSuccessLight`   | `rgba(0, 212, 170, 0.15)` | `rgba(22, 163, 74, 0.1)` |
| `colorSuccessDark`    | `#00b392`                 | `#15803d`                |
| `colorSuccessDarkest` | `#009e7e`                 | `#166534`                |

---

## 4. INFO

| HIVE Token         | Dark Mode                   | Light Mode               |
| :----------------- | :-------------------------- | :----------------------- |
| `colorInfo`        | `#6bcfef`                   | `#2563eb`                |
| `colorInfoLight`   | `rgba(107, 207, 239, 0.15)` | `rgba(37, 99, 235, 0.1)` |
| `colorInfoDark`    | `#4ab8d8`                   | `#1d4ed8`                |
| `colorInfoDarkest` | `#2a9dc0`                   | `#1e40af`                |

---

## 5. WARNING

| HIVE Token            | Dark Mode                  | Light Mode               |
| :-------------------- | :------------------------- | :----------------------- |
| `colorWarning`        | `#ffd93d`                  | `#d97706`                |
| `colorWarningLight`   | `rgba(255, 217, 61, 0.15)` | `rgba(217, 119, 6, 0.1)` |
| `colorWarningDark`    | `#e6c235`                  | `#b45309`                |
| `colorWarningDarkest` | `#cca82e`                  | `#92400e`                |

---

## 6. ERROR

| HIVE Token        | Dark Mode                 | Light Mode               |
| :---------------- | :------------------------ | :----------------------- |
| `colorError`      | `#ff5f56`                 | `#dc2626`                |
| `colorErrorLight` | `rgba(255, 95, 86, 0.15)` | `rgba(220, 38, 38, 0.1)` |
| `colorErrorDark`  | `#e54940`                 | `#b91c1c`                |

---

## 7. TEAL (Sidebar & Brand Accent)

| HIVE Token           | Role                                   | Value                     |
| :------------------- | :------------------------------------- | :------------------------ |
| `colorTeal`          | Sidebar active highlight, brand accent | `#00d4aa`                 |
| `colorTealSecondary` | Sidebar active background tint         | `rgba(0, 212, 170, 0.25)` |
| `colorTealDarkest`   | Deep teal for dark pressed states      | `#008f72`                 |

---

## 8. BRAND

| HIVE Token            | Value     | Used For                       |
| :-------------------- | :-------- | :----------------------------- |
| `colorBrandPrimary`   | `#00d4aa` | Same as colorPrimary           |
| `colorBrandSecondary` | `#c29ffa` | Chart accent (purple/lavender) |
| `colorBrandGreen`     | `#00d4aa` | Same as primary teal           |
| `colorBrandMustard`   | `#ffd93d` | Same as warning / chart yellow |
| `colorBrandBlue`      | `#6bcfef` | Same as info / chart blue      |

---

## 9. OVERLAY & SHADOW

| HIVE Token               | Dark Mode                 | Light Mode               |
| :----------------------- | :------------------------ | :----------------------- |
| `colorOverlayBackground` | `rgba(30, 30, 46, 0.8)`   | `rgba(0, 0, 0, 0.5)`     |
| `colorAccentBlueShadow`  | `rgba(0, 212, 170, 0.15)` | `rgba(0, 212, 170, 0.1)` |
| `colorShadow`            | `rgba(0, 0, 0, 0.3)`      | `rgba(0, 0, 0, 0.08)`    |
| `colorShadowDark`        | `rgba(0, 0, 0, 0.5)`      | `rgba(0, 0, 0, 0.15)`    |

---

## 10. DEPRECATED / UNCHANGED

| HIVE Token       | Status                                                  |
| :--------------- | :------------------------------------------------------ |
| `colorBrown`     | Not used in prototype - keep for backward compatibility |
| `colorBrownDark` | Not used in prototype - keep for backward compatibility |

---

## Quick Reference: Chart Palette

| Chart Slot | Dark Mode | Light Mode | Color Name        |
| :--------- | :-------- | :--------- | :---------------- |
| Chart 1    | `#00d4aa` | `#00d4aa`  | Teal              |
| Chart 2    | `#ffd93d` | `#d97706`  | Yellow / Amber    |
| Chart 3    | `#6bcfef` | `#2563eb`  | Sky Blue          |
| Chart 4    | `#ff6b6b` | `#dc2626`  | Coral / Red       |
| Chart 5    | `#c29ffa` | `#7b4fc4`  | Lavender / Purple |

---

## Implementation Steps

1. Open your HIVE tokens file
2. Replace **values only** - keep all token **names** exactly as they are
3. Every component that references HIVE tokens will reskin automatically
4. Test dark mode first (primary UI), then light mode

---

_Generated from Hazelcast Management Center Figma Prototype_
_Date: April 2026_
