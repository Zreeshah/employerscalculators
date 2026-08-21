<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->


## Mandatory calculator competitor-parity workflow

For every calculator page created or materially edited in this repository, complete this workflow before implementation and again before publishing:

1. Open the matching calculator on `https://employerscalculator.co.uk/` and treat its calculator behavior as an input/output contract, not just design inspiration.
2. Record every competitor input exactly: label, data type, unit, whether it is an amount or percentage, default, min/max, select options, conditional visibility, and reset behavior.
3. Record every result exactly: label, formula, rate/threshold source, display unit, hierarchy/order, conditional state, warning, breakdown, comparison, and helper panel.
4. Create a parity matrix with `competitor`, `ours before`, and `required implementation` columns. Do not code until ambiguous semantics are resolved by interacting with the competitor.
5. Capture at least three benchmark cases from the live competitor, including the user's supplied case, one boundary/zero case, and one conditional-toggle or scheme case. Record expected values to the penny where displayed.
6. Implement the same input semantics first. Never substitute a percentage for a currency amount, annual for monthly, or a generic control for a scheme-specific control unless the competitor explicitly offers that mode.
7. Add unit tests asserting the captured benchmark values and state transitions. A formula that is plausible but does not reproduce the benchmark is not accepted.
8. Browser-test competitor and local pages side by side at the same inputs. Verify labels, values, conditional controls, warnings, output cards, and reset behavior, plus responsive overflow.
9. Only add extra functionality after exact competitor parity is established, and do not remove useful existing functionality without explicit approval.
10. Before pushing to `main`, include a per-page parity checklist in the self-review. Treat any unverified calculator as incomplete.
