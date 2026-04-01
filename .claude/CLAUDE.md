<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- DON'T EDIT THIS SECTION, INSTEAD RE-RUN doctoc TO UPDATE -->

**Table of Contents** _generated with [DocToc](https://github.com/thlorenz/doctoc)_

- [HIVE v4 Redesign — Project Context](#hive-v4-redesign--project-context)
  - [What we're doing](#what-were-doing)
  - [Key decisions made](#key-decisions-made)
  - [Migration steps:](#migration-steps)
  - [Usage Statistics](#usage-statistics)

<!-- END doctoc generated TOC please keep comment here to allow auto update -->

# HIVE v4 Redesign — Project Context

## What we're doing

Reworking the HIVE UI library (v3 → v4) based on shadcn + Radix UI + TailwindCSS.
Two client apps: CloudUI (hazelcast-cloud-frontend) and MC (management-center).
Both can be found in the same folder as this library.

## Key decisions made

- Stick to the default shadcn styling (which will be later customized with Tailwind) but keep old variation if that makes sense.
- All SCSS files should be converted to Tailwind CSS + Native CSS.
- Primitives: Radix UI (not Base UI)
- Should export a CSS with Tailwind build but also export the Tailwind config to use it in the client apps.
- Build tool: tsup
- If you change the interface of a component, write a migration guide, so I can update the client apps.
- Keep related components together. For example, if we have a `Button` component, we can also have `IconButton`, `LinkButton`, etc. in the same folder.
- Stick to the rule one component per file.
- Name the file the same way the component is named.

## Migration steps:

- add Tailwind CSS
- add shadcn
- integrate with Storybook
- configure shadcn variables (manually! ask Mykola!)
- migrate components one by one

## Usage Statistics

In ./.claude/audits you can find the lib usage statistics.
