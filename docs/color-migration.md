# HIVE 3.0 → Hazelcast Prototype Color Migration

Source: [Figma HIVE 3.0](https://www.figma.com/design/uGTDLFJEVy4dCNIhlmTPRw/%F0%9F%90%9D-HIVE-3.0?node-id=1061-4605&p=f&t=7sJDCVUY4O5jNXma-0)

Replace each HIVE token value with the OKLCH values below to match this prototype.

---

## Primary

| Token | Current HEX | Light OKLCH | Dark OKLCH |
|:---|:---|:---|:---|
| `$colorPrimaryLight` | `#2d7de4` | `oklch(0.95 0.002 220)` | `oklch(0.79 0.17 170)` |
| `$colorPrimary` | `#2160c0` | `oklch(0.95 0.002 220)` | `oklch(0.79 0.17 170)` |
| `$colorPrimaryDark` | `#003b87` | `oklch(0.90 0.002 220)` | `oklch(0.79 0.17 170)` |

---

## Neutrals

| Token | Current HEX | Light OKLCH | Dark OKLCH |
|:---|:---|:---|:---|
| `$colorNeutralWhite` | `#ffffff` | `oklch(1.0 0 0)` | `oklch(0.98 0 0)` |
| `$colorNeutralGray` | `#e9f0f9` | `oklch(0.97 0.001 260)` | `oklch(0.30 0.02 275)` |
| `$colorNeutralGrayDarker` | `#ccdff5` | `oklch(0.92 0.001 250)` | `oklch(0.37 0.005 250)` |
| `$colorNeutral` | `#dbdbdb` | `oklch(0.90 0.001 0)` | `oklch(0.37 0.005 250)` |
| `$colorNeutralLight` | `#b7c1cb` | `oklch(0.55 0.002 0)` | `oklch(0.71 0.02 255)` |
| `$colorNeutralLighter` | `#fafafa` | `oklch(0.98 0 0)` | `oklch(0.24 0.02 280)` |

---

## Success

| Token | Current HEX | Light OKLCH | Dark OKLCH |
|:---|:---|:---|:---|
| `$colorSuccess` | `#85da66` | `oklch(0.65 0.18 160)` | `oklch(0.79 0.17 170)` |
| `$colorSuccessLight` | `#d5f0d1` | `oklch(0.65 0.18 160 / 0.15)` | `oklch(0.79 0.17 170 / 0.15)` |
| `$colorSuccessDark` | `#64d03c` | `oklch(0.58 0.16 160)` | `oklch(0.72 0.15 170)` |
| `$colorSuccessDarkest` | `#3b7044` | `oklch(0.48 0.12 160)` | `oklch(0.60 0.12 170)` |

---

## Info

| Token | Current HEX | Light OKLCH | Dark OKLCH |
|:---|:---|:---|:---|
| `$colorInfo` | `#76e7e7` | `oklch(0.55 0.15 220)` | `oklch(0.81 0.09 215)` |
| `$colorInfoLight` | `#d0f4f8` | `oklch(0.55 0.15 220 / 0.15)` | `oklch(0.81 0.09 215 / 0.15)` |
| `$colorInfoDark` | `#4adfdf` | `oklch(0.48 0.13 220)` | `oklch(0.74 0.08 215)` |
| `$colorInfoDarkest` | `#006585` | `oklch(0.40 0.10 225)` | `oklch(0.65 0.07 215)` |

---

## Warning

| Token | Current HEX | Light OKLCH | Dark OKLCH |
|:---|:---|:---|:---|
| `$colorWarning` | `#ffec44` | `oklch(0.60 0.16 85)` | `oklch(0.90 0.17 95)` |
| `$colorWarningLight` | `#f9f6c7` | `oklch(0.60 0.16 85 / 0.15)` | `oklch(0.90 0.17 95 / 0.15)` |
| `$colorWarningDark` | `#f6dd00` | `oklch(0.53 0.14 80)` | `oklch(0.83 0.15 95)` |
| `$colorWarningDarkest` | `#8b5d00` | `oklch(0.45 0.11 75)` | `oklch(0.72 0.13 90)` |

---

## Error

| Token | Current HEX | Light OKLCH | Dark OKLCH |
|:---|:---|:---|:---|
| `$colorError` | `#dc084b` | `oklch(0.95 0.002 10)` | `oklch(0.65 0.22 25)` |
| `$colorErrorLight` | `#efb1c9` | `oklch(0.95 0.002 10 / 0.15)` | `oklch(0.65 0.22 25 / 0.15)` |
| `$colorErrorDark` | `#8f001d` | `oklch(0.90 0.002 10)` | `oklch(0.58 0.20 25)` |

---

## Text

| Token | Current HEX | Light OKLCH | Dark OKLCH |
|:---|:---|:---|:---|
| `$colorText` | `#061827` | `oklch(0.35 0.002 0)` | `oklch(0.98 0 0)` |
| `$colorTextSecondary` | `#707482` | `oklch(0.55 0.002 0)` | `oklch(0.71 0.02 255)` |
| `$colorTextSubdued` | `#707482` | `oklch(0.55 0.002 0)` | `oklch(0.71 0.02 255)` |

---

## Overlay & Accessibility

| Token | Current HEX | Light OKLCH | Dark OKLCH |
|:---|:---|:---|:---|
| `$colorOverlayBackground` | `#f0f6ff` | `oklch(0.98 0.001 250)` | `oklch(0.30 0.02 275)` |
| `$colorAccessibilityOutline` | `#7744ff` | `oklch(0.79 0.17 170)` | `oklch(0.79 0.17 170)` |

---

## Brand (Legacy)

| Token | Current HEX | Light OKLCH | Dark OKLCH |
|:---|:---|:---|:---|
| `$colorBrand` | `#00bac6` | `oklch(0.79 0.17 170)` | `oklch(0.79 0.17 170)` |
| `$colorBrandText` | `#10a4b3` | `oklch(0.79 0.17 170)` | `oklch(0.79 0.17 170)` |
| `$colorShadow` | `#dbdbdb` | `oklch(0.90 0.001 0)` | `oklch(0.37 0.005 250)` |

---

## Menu & Auth

| Token | Current HEX | Light OKLCH | Dark OKLCH |
|:---|:---|:---|:---|
| `$colorMenuDark` | `#061827` | `oklch(0.35 0.002 0)` | `oklch(0.24 0.02 280)` |
| `$colorAuthSecondary` | `#0b2b39` | `oklch(0.30 0.02 275)` | `oklch(0.24 0.02 280)` |

---

## Brand (New Identity)

| Token | Current HEX | Light OKLCH | Dark OKLCH |
|:---|:---|:---|:---|
| `$colorBrandPrimary` | `#c6ff3a` | `oklch(0.79 0.17 170)` | `oklch(0.79 0.17 170)` |
| `$colorBrandSecondary` | `#061727` | `oklch(0.35 0.002 0)` | `oklch(0.24 0.02 280)` |
| `$colorBrandAccent` | `#122d45` | `oklch(0.30 0.02 275)` | `oklch(0.30 0.02 275)` |
| `$colorBrandOcean` | `#0080a9` | `oklch(0.55 0.15 220)` | `oklch(0.81 0.09 215)` |
| `$colorBrandRaspberry` | `#c91268` | `oklch(0.95 0.002 10)` | `oklch(0.65 0.22 25)` |
| `$colorBrandCarrot` | `#f5911e` | `oklch(0.60 0.16 85)` | `oklch(0.90 0.17 95)` |
| `$colorBrandBlueberry` | `#0019fe` | `oklch(0.55 0.15 220)` | `oklch(0.81 0.09 215)` |

---

*37 HIVE tokens. Current HEX → new Light OKLCH + Dark OKLCH. Done.*
