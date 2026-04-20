# HIVE Design System — OKLCH Color Migration

All tokens from `/styles/globals.css` converted to OKLCH format.
Values that were already OKLCH are kept as-is. HEX/rgba values have been converted.

---

## Light Mode (`:root`)

| Token | Current Value | OKLCH |
|:---|:---|:---|
| `--background` | `#fafafa` | `oklch(0.98 0 0)` |
| `--foreground` | `oklch(0.35 0.002 0)` | `oklch(0.35 0.002 0)` |
| `--card` | `#fafafa` | `oklch(0.98 0 0)` |
| `--card-foreground` | `oklch(0.35 0.002 0)` | `oklch(0.35 0.002 0)` |
| `--popover` | `oklch(0.98 0.001 0)` | `oklch(0.98 0.001 0)` |
| `--popover-foreground` | `oklch(0.35 0.002 0)` | `oklch(0.35 0.002 0)` |
| `--primary` | `oklch(0.95 0.002 220)` | `oklch(0.95 0.002 220)` |
| `--primary-foreground` | `oklch(0.35 0.002 0)` | `oklch(0.35 0.002 0)` |
| `--secondary` | `oklch(0.97 0.001 250)` | `oklch(0.97 0.001 250)` |
| `--secondary-foreground` | `oklch(0.35 0.002 0)` | `oklch(0.35 0.002 0)` |
| `--muted` | `#f8f8f9` | `oklch(0.98 0.001 260)` |
| `--muted-foreground` | `oklch(0.55 0.002 0)` | `oklch(0.55 0.002 0)` |
| `--accent` | `#f6f6f7` | `oklch(0.97 0.001 260)` |
| `--accent-foreground` | `oklch(0.35 0.002 0)` | `oklch(0.35 0.002 0)` |
| `--destructive` | `oklch(0.95 0.002 10)` | `oklch(0.95 0.002 10)` |
| `--destructive-foreground` | `oklch(0.35 0.002 0)` | `oklch(0.35 0.002 0)` |
| `--border` | `oklch(0.9 0.001 0)` | `oklch(0.9 0.001 0)` |
| `--input` | `transparent` | `transparent` |
| `--input-background` | `oklch(0.98 0.001 250)` | `oklch(0.98 0.001 250)` |
| `--switch-background` | `oklch(0.94 0.002 250)` | `oklch(0.94 0.002 250)` |
| `--ring` | `oklch(0.9 0.002 220)` | `oklch(0.9 0.002 220)` |
| `--chart-1` | `oklch(0.55 0.15 220)` | `oklch(0.55 0.15 220)` |
| `--chart-2` | `oklch(0.65 0.18 160)` | `oklch(0.65 0.18 160)` |
| `--chart-3` | `oklch(0.60 0.16 85)` | `oklch(0.60 0.16 85)` |
| `--chart-4` | `oklch(0.58 0.20 280)` | `oklch(0.58 0.20 280)` |
| `--chart-5` | `oklch(0.62 0.14 25)` | `oklch(0.62 0.14 25)` |
| `--sidebar` | `oklch(0.98 0.001 250)` | `oklch(0.98 0.001 250)` |
| `--sidebar-foreground` | `oklch(0.35 0.002 0)` | `oklch(0.35 0.002 0)` |
| `--sidebar-primary` | `#00d4aa` | `oklch(0.79 0.17 170)` |
| `--sidebar-primary-foreground` | `#fafafa` | `oklch(0.98 0 0)` |
| `--sidebar-accent` | `rgba(0, 212, 170, 0.2)` | `oklch(0.79 0.17 170 / 0.2)` |
| `--sidebar-accent-foreground` | `oklch(0.35 0.002 0)` | `oklch(0.35 0.002 0)` |
| `--sidebar-border` | `oklch(0.92 0.001 250)` | `oklch(0.92 0.001 250)` |
| `--sidebar-ring` | `oklch(0.9 0.002 220)` | `oklch(0.9 0.002 220)` |
| `--sidebar-section-1` | `oklch(0.96 0.001 250)` | `oklch(0.96 0.001 250)` |
| `--sidebar-section-2` | `oklch(0.95 0.001 250)` | `oklch(0.95 0.001 250)` |
| `--sidebar-section-3` | `oklch(0.94 0.001 250)` | `oklch(0.94 0.001 250)` |
| `--sidebar-section-4` | `oklch(0.93 0.001 250)` | `oklch(0.93 0.001 250)` |
| `--sidebar-section-5` | `oklch(0.92 0.001 250)` | `oklch(0.92 0.001 250)` |
| `--sidebar-section-6` | `oklch(0.91 0.001 250)` | `oklch(0.91 0.001 250)` |
| `--sidebar-section-7` | `oklch(0.90 0.001 250)` | `oklch(0.90 0.001 250)` |

---

## Dark Mode (`.dark`)

| Token | Current Value | OKLCH |
|:---|:---|:---|
| `--background` | `#1e1e2e` | `oklch(0.24 0.02 280)` |
| `--foreground` | `#fafafa` | `oklch(0.98 0 0)` |
| `--card` | `#2a2d3a` | `oklch(0.30 0.02 275)` |
| `--card-foreground` | `#fafafa` | `oklch(0.98 0 0)` |
| `--popover` | `#2a2d3a` | `oklch(0.30 0.02 275)` |
| `--popover-foreground` | `#fafafa` | `oklch(0.98 0 0)` |
| `--primary` | `#00d4aa` | `oklch(0.79 0.17 170)` |
| `--primary-foreground` | `#0a0a0a` | `oklch(0.15 0 0)` |
| `--secondary` | `#3c4043` | `oklch(0.37 0.005 250)` |
| `--secondary-foreground` | `#fafafa` | `oklch(0.98 0 0)` |
| `--muted` | `#3c4043` | `oklch(0.37 0.005 250)` |
| `--muted-foreground` | `#9ca3af` | `oklch(0.71 0.02 255)` |
| `--accent` | `#00d4aa` | `oklch(0.79 0.17 170)` |
| `--accent-foreground` | `#0a0a0a` | `oklch(0.15 0 0)` |
| `--destructive` | `#ff5f56` | `oklch(0.65 0.22 25)` |
| `--destructive-foreground` | `#fafafa` | `oklch(0.98 0 0)` |
| `--border` | `#3c4043` | `oklch(0.37 0.005 250)` |
| `--input` | `#3c4043` | `oklch(0.37 0.005 250)` |
| `--ring` | `#00d4aa` | `oklch(0.79 0.17 170)` |
| `--chart-1` | `#00d4aa` | `oklch(0.79 0.17 170)` |
| `--chart-2` | `#ffd93d` | `oklch(0.90 0.17 95)` |
| `--chart-3` | `#6bcfef` | `oklch(0.81 0.09 215)` |
| `--chart-4` | `#ff6b6b` | `oklch(0.66 0.21 22)` |
| `--chart-5` | `#c29ffa` | `oklch(0.75 0.14 300)` |
| `--sidebar` | `#1e1e2e` | `oklch(0.24 0.02 280)` |
| `--sidebar-foreground` | `#fafafa` | `oklch(0.98 0 0)` |
| `--sidebar-primary` | `#00d4aa` | `oklch(0.79 0.17 170)` |
| `--sidebar-primary-foreground` | `#fafafa` | `oklch(0.98 0 0)` |
| `--sidebar-accent` | `rgba(0, 212, 170, 0.3)` | `oklch(0.79 0.17 170 / 0.3)` |
| `--sidebar-accent-foreground` | `#fafafa` | `oklch(0.98 0 0)` |
| `--sidebar-border` | `#3c4043` | `oklch(0.37 0.005 250)` |
| `--sidebar-ring` | `#00d4aa` | `oklch(0.79 0.17 170)` |
| `--sidebar-section-1` | `rgba(42, 45, 58, 0.7)` | `oklch(0.30 0.02 275 / 0.7)` |
| `--sidebar-section-2` | `rgba(42, 45, 58, 0.3)` | `oklch(0.30 0.02 275 / 0.3)` |
| `--sidebar-section-3` | `rgba(42, 45, 58, 0.5)` | `oklch(0.30 0.02 275 / 0.5)` |
| `--sidebar-section-4` | `rgba(42, 45, 58, 0.4)` | `oklch(0.30 0.02 275 / 0.4)` |
| `--sidebar-section-5` | `rgba(42, 45, 58, 0.35)` | `oklch(0.30 0.02 275 / 0.35)` |
| `--sidebar-section-6` | `rgba(42, 45, 58, 0.45)` | `oklch(0.30 0.02 275 / 0.45)` |
| `--sidebar-section-7` | `rgba(42, 45, 58, 0.25)` | `oklch(0.30 0.02 275 / 0.25)` |

---

*Generated from `/styles/globals.css` — every token, nothing invented.*