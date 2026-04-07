# Hive Library Update — v4

You are helping update the `@hazelcast/ui` design system from v3 to v4.

## Library context

- **Package:** `@hazelcast/ui` at `/Users/mykolafant/Desktop/projects/hive`
- **Components:** `src/components/` — each component has its own `.tsx` + `.module.scss` (being replaced with `.module.css`)
- **Legacy components:** `src/components/old/` — preserved v3 versions, exported via `@hazelcast/ui/old`
- **Public API:** everything exported from `src/index.ts`
- **Legacy API:** everything exported from `src/old/index.ts` (subpath `@hazelcast/ui/old`)
- **Stories:** `__stories__/<Component>.stories.tsx`
- **Tests:** `__tests__/<Component>.test.tsx`
- **Styles:** global tokens/constants in `styles/`

## Backward-compat model

v4 is designed for **gradual client migration**. When a component changes in a breaking way:

- The **old version** is preserved in `src/components/old/` and exported from `@hazelcast/ui/old`
- The **new version** lives in `src/components/` and is exported from `@hazelcast/ui` (the main entry)
- Clients can temporarily import from `@hazelcast/ui/old` to stay unblocked, then migrate at their own pace
- Old components are **deprecated** (not deleted). They will be removed in v5.

This means there are **no hard removal deadlines** in v4 — only deprecations.

## v4 rules

### SCSS → CSS

- All `*.module.scss` files must be migrated to `*.module.css`
- Replace `@use`/`@forward` with standard CSS custom properties
- Move shared design tokens to CSS variables in `styles/` (not SCSS variables/mixins)
- Update all `import styles from './Foo.module.scss'` → `import styles from './Foo.module.css'`
- Update `stylelint.config.mjs` and build config if needed after migration

### Updating an existing component (breaking change)

1. Read the current component file (`src/components/<Name>.tsx`) and its SCSS module
2. Copy the **current (old) version** to `src/components/old/<Name>.tsx` — do not modify it
3. Also copy its SCSS module to `src/components/old/<Name>.module.scss` — do not modify it
4. Add the old component to `src/old/index.ts` (create this file if it doesn't exist yet — see structure below)
5. Now update `src/components/<Name>.tsx` with the new v4 changes
6. Migrate `src/components/<Name>.module.scss` → `src/components/<Name>.module.css` with the new styles
7. Update the story in `__stories__/` to reflect the new API
8. Update the test in `__tests__/` — keep tests passing
9. Log the change in `docs/migration-v4.md`

### Updating an existing component (non-breaking change)

Same as above **but skip steps 2–4** (no need to archive). Still log the change.

### Adding a new component

1. Create `src/components/<Name>.tsx`
2. Create `src/components/<Name>.module.css` (CSS, not SCSS)
3. Export from `src/index.ts`
4. Create `__stories__/<Name>.stories.tsx`
5. Create `__tests__/<Name>.test.tsx` with at minimum a render + accessibility test
6. Log the addition in `docs/migration-v4.md` under **New components**

### "Removing" a component

Do **not** remove components in v4. Instead:

1. Move to `src/components/old/<Name>.tsx` and export from `src/old/index.ts`
2. Remove from `src/index.ts`
3. Log under **Deprecated (use `/old`)** in `docs/migration-v4.md`

## src/old/index.ts structure

This file must export all archived old components. Create it on first use:

```ts
// Legacy v3 components — deprecated, will be removed in v5
// Import via: import { Tooltip } from '@hazelcast/ui/old'
export { Tooltip } from './components/old/Tooltip'
// ... one export per archived component
```

## package.json subpath export

The `package.json` must expose the `/old` subpath. Ensure this `exports` field exists (add if missing):

```json
"exports": {
  ".": "./lib/index.js",
  "./old": "./lib/old/index.js"
}
```

Also ensure `tsconfig.build.json` compiles `src/old/index.ts` into `lib/old/index.js`.

## Logging breaking changes (critical)

After **every** change that affects the public API or visual output, update `docs/migration-v4.md`.
Use the format defined in that file. Be specific — include before/after code examples and the `/old` fallback import.

Categories:

- **Updated component** — breaking prop/style/behavior change; old version available at `@hazelcast/ui/old`
- **Deprecated component** — removed from main export; available at `@hazelcast/ui/old` until v5
- **New component** — added to the library
- **CSS change** — class names or CSS variables changed

## Checklist per breaking change

- [ ] Old component copied to `src/components/old/`
- [ ] Old component added to `src/old/index.ts`
- [ ] New component updated in `src/components/`
- [ ] SCSS → CSS migrated for the new component
- [ ] Story updated
- [ ] Tests updated and passing
- [ ] `docs/migration-v4.md` updated
- [ ] `package.json` exports field includes `./old` entry
- [ ] `src/index.ts` unchanged (or updated if exports changed)

## Running checks

```bash
npm test                          # all tests
npm test -- --testPathPattern=Foo # single component
npm run lint                      # ESLint + Stylelint
npm run dev                       # Storybook to verify visually
```
