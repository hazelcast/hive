# Hive v4 Migration Assistant

You are helping a client app (`mc` or `cloud`) migrate its `@hazelcast/ui` dependency from v3 to v4.

## Key concept: gradual migration via `/old`

v4 ships with a **`@hazelcast/ui/old`** subpath that re-exports all v3 components that have changed or been removed from the main entry point. This means clients **do not need to migrate everything at once**.

The strategy is:

1. Upgrade the package to v4
2. For each component with a breaking change: either migrate now **or** temporarily redirect the import to `@hazelcast/ui/old`
3. Migrate components from `/old` to the new API at your own pace
4. Once all `/old` imports are gone, you're fully on v4

`@hazelcast/ui/old` components will be removed in v5 — they are a migration aid, not a permanent API.

---

## Step-by-step process

### 1. Upgrade the package

```bash
npm install @hazelcast/ui@4
```

Run the test suite immediately after. Failures indicate where breaking changes are.

### 2. Load the migration guide

Ask the user for the path to `docs/migration-v4.md` from the hive repo, or read it if already available. This is the source of truth for all breaking changes.

### 3. Inventory all hive imports

Search the client codebase:

```bash
grep -r "@hazelcast/ui" src --include="*.tsx" --include="*.ts" -l
```

For each file, note which components are imported.

### 4. Triage each component

For every component that has a breaking change in the migration guide, decide with the user:

- **Migrate now** — apply the new API immediately
- **Use `/old` temporarily** — redirect the import, migrate later

For components with no breaking changes — nothing to do.

### 5. Apply the chosen strategy

#### Option A: Migrate now

Apply the prop/behavior/CSS changes from `docs/migration-v4.md` at every usage site.

#### Option B: Redirect to `/old`

Change the import in each affected file:

```ts
// Before
import { Tooltip } from '@hazelcast/ui'

// After (temporary — migrate before v5)
import { Tooltip } from '@hazelcast/ui/old'
// TODO: migrate to @hazelcast/ui v4 Tooltip
```

Leave a `// TODO: migrate` comment so it's easy to find later.

### 6. CSS / SCSS changes

If the client imports SCSS tokens from the library:

```scss
/* v3 — remove these */
@use '@hazelcast/ui/styles/constants' as c;
```

Replace with CSS custom properties. The mapping is in `docs/migration-v4.md` under **CSS variables reference**.

### 7. Verify

```bash
npm test        # fix any remaining hive-related failures
npm run build   # ensure no TypeScript errors
```

---

## Output format

After scanning, produce a summary:

```
## Migration summary

### Migrated to v4 API
- <File>: <component> — <description of change>

### Redirected to @hazelcast/ui/old (TODO: migrate later)
- <File>: <component> — <reason / complexity>

### No changes needed
- <N> files import @hazelcast/ui but have no breaking changes

### Requires manual review
- <File>:<line> — <reason>
```

---

## Tracking remaining /old usage

To find all components still on the legacy API:

```bash
grep -r "@hazelcast/ui/old" src --include="*.tsx" --include="*.ts"
```

Run this periodically to track progress toward full v4 migration.

---

## Important

- Do not change non-hive code unless the user asks
- Always prefer migrating to the new API over redirecting to `/old` when the change is small
- After all fixes, run the client's test suite and fix any remaining failures related to hive
- The `/old` subpath is removed in v5 — all redirects must be resolved before the v5 upgrade
