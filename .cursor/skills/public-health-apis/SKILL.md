---
name: public-health-apis
description: Chooses and integrates public health APIs for the Diabetes Data Explorer, including ClinicalTrials.gov and CDC PLACES. Use when adding a health data source, checking CORS or API keys, or mapping an endpoint to a screen.
---

# Public health APIs

Record these eight points before wiring a source. Confirm the docs are still live.

1. Name and official docs
2. What the data is, and what it is not
3. The frontend skill a recruiter would see
4. Endpoint plus one example query
5. Response shape and integration difficulty
6. CORS, auth, rate limit, attribution
7. One screen this source can carry alone
8. Risks

v1 keeps two sources. Both are free, need no key for a public demo, and send `Access-Control-Allow-Origin: *`.

## ClinicalTrials.gov

Docs: https://clinicaltrials.gov/data-api/api

Studies registered on ClinicalTrials.gov. Not treatment advice and not proof that a therapy works.

A recruiter sees search, filters, sorting, pagination, and a nested detail page.

```
GET https://clinicaltrials.gov/api/v2/studies?query.cond=diabetes&pageSize=20&sort=LastUpdatePostDate:desc
GET https://clinicaltrials.gov/api/v2/studies/{nctId}
```

The list is paginated with `nextPageToken`. Each study nests `protocolSection` (identification, status, description, conditions). Normalize that into a flat study type before render. Moderate difficulty.

CORS is open. No API key. Be polite with page size. Attribute ClinicalTrials.gov and link the study page. Terms: https://clinicaltrials.gov/about-site/terms-conditions

UI: a filterable study catalog and a detail route.

Risks: registry data lags, eligibility text is easy to misread as a recommendation, and results are not a balanced evidence review.

## CDC PLACES

Docs: https://dev.socrata.com/foundry/data.cdc.gov/swc5-untb
Dataset: https://data.cdc.gov/500-Cities-Places/PLACES-Local-Data-for-Better-Health-County-Data-202/swc5-untb

Model-based estimates of diagnosed diabetes among adults, by US county. Not patient records and not an individual diagnosis.

A recruiter sees sorting, a geographic cut, and a bar chart built from inconsistent rows (`data_value` can be missing).

```
GET https://data.cdc.gov/resource/swc5-untb.json?measureid=DIABETES&data_value_type=Age-adjusted%20prevalence&$where=data_value%20IS%20NOT%20NULL&$order=data_value%20DESC&$limit=10
```

SoQL returns a flat JSON array. Some counties omit `data_value`. Drop those rows. Easy integration if the query stays narrow.

CORS is open. An app token is optional and recommended only if traffic grows. Light demo traffic fits the anonymous tier. Attribute CDC PLACES. Terms: https://data.cdc.gov/terms

UI: a ranked county chart with state and year filters.

Risks: US counties only, estimates (not counts of patients), small counties swing, and the release year is not "today".

## Left out of v1

WHO GHO (https://www.who.int/data/gho/info/gho-odata-api) is public OData, but the host does not send CORS headers. GitHub Pages cannot call it. A same-origin proxy would.
