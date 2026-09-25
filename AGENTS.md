# Diabetes Data Explorer

You are a frontend tech lead reviewing a LinkedIn portfolio project.

## Product context

Build a React + TypeScript frontend that consumes public health APIs, focused on diabetes. The audience is recruiters and frontend engineers. The project is a public-data explorer, never a tool for diagnosis, treatment, or medical advice.

The same app should be able to show:

- search, filters, sorting, and pagination
- a list page and a detail page
- a chart or map from a time series or a geographic cut
- loading, empty, and error states
- normalization of nested or inconsistent responses
- basic responsiveness and accessibility

Constraints:

- Free to use in a published personal project.
- Callable from the browser. Say whether CORS is open. If it is not, say whether a simple proxy would fix it. Do not treat a missing CORS header as an automatic rejection.
- Say whether an API key is required, recommended, or unnecessary, and whether the free tier can carry a public demo.
- No identifiable patients and no PHI. Only aggregates, indicators, studies, or public regulatory records.
- The API must still be active. Link the official docs and the attribution or terms of use.

For each API, record:

1. Name and official documentation link
2. What the data represents, in one sentence, and what it does not represent
3. Why a frontend recruiter would care
4. Concrete endpoints, with an example query
5. Response shape and how hard it is to integrate
6. CORS, authentication, rate limit, and required attribution
7. One UI feature that this API can carry on its own
8. Risks: stale data, US-only coverage, bias, clinical misreading

Choice rule: at most three APIs in v1. Prefer the source with the better visual demo and the more honest integration. If two sources tell the same story, keep the one with better docs, CORS, and response shape.

v1 sources, chosen under that rule:

- [ClinicalTrials.gov API v2](https://clinicaltrials.gov/data-api/api) for study search, filters, pagination, and detail. CORS is open. No key.
- [CDC PLACES county data, 2025 release](https://data.cdc.gov/500-Cities-Places/PLACES-Local-Data-for-Better-Health-County-Data-202/swc5-untb) for a geographic prevalence ranking. CORS is open. No key for light use.
- WHO Global Health Observatory was set aside for v1. The OData API is public, but responses do not include `Access-Control-Allow-Origin`, so the static GitHub Pages host cannot call it. A small proxy would unblock it later.

README copy and the LinkedIn draft must not sound like medical advice.

## Stack

Vite, React, and TypeScript in `strict` mode. Server state goes through TanStack Query. Styles live next to the component in CSS Modules.

## Commands

Run the project through `make`. The default target is `help`. Other targets: `install`, `dev`, `build`, `preview`, `lint`, `typecheck`, `test`, `format`.

## Where guidance lives

- `.cursor/rules/project-context.mdc` applies in every session.
- `.cursor/rules/react-typescript.mdc` applies to `*.ts` and `*.tsx`.
- `.cursor/rules/public-health-data.mdc` applies to files under `src/`.
- `.cursor/skills/public-health-apis/SKILL.md` applies when choosing or calling a public health API.
