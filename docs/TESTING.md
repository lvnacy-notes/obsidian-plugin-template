# Testing

This project applies the [LVNACY Testing Philosophy](./LVNACY_Testing_Philosophy.md). Where this file is silent, that document decides.

## Load-bearing behaviors

| Behavior | Status |
| --- | --- |
| Persisted settings are normalized: missing, malformed, legacy and unknown fields never reach the plugin | Covered by `src/settings/normalizeSettings.test.ts` |
| Stopping the runtime saves the settings and releases everything it started | Covered by `src/runtime.test.ts` (settings save); extend as the runtime starts listeners and timers |

Add a row for each behavior that is silent-and-wrong, destructive, fatal to the host, cumulative, or outside our control.

## Project-specific trust boundaries

None yet.

## Deviations from the philosophy

None.

## Layout

Unit tests are co-located (`thing.ts`, `thing.test.ts`). Integration tests go directly in `test/`.

## Permanent exclusions

- Host application and dependency internals.
- CSS and visual output.
- Trivial wrappers.

## Known gaps

| Gap | Reason |
| --- | --- |
| | |

## Open implementation items

None.
