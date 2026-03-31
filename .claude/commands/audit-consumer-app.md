---
argument-hint: <consumer-app-uri>
---

Scan for all `@hazelcast/ui` imports in $ARGUMENTS and produce an audit report:

- Every component imported, with usage count, sorted by frequency
- Which props are actually used for each component (not just the full prop list from the library)

Output: `.claude/audits/audit-report-$ARGUMENTS.md` in this project.
