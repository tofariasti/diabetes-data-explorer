import { fetchJson } from "./http";
import { normalizeStudy, normalizeStudyPayload } from "./normalize";
import { DataRequestError, type StudyPage, type StudySummary } from "./types";

const STUDIES_URL = "https://clinicaltrials.gov/api/v2/studies";

export type StudyQuery = {
  condition: string;
  status: string;
  sort: string;
  pageToken: string | null;
};

export async function fetchStudies(query: StudyQuery): Promise<StudyPage> {
  const url = new URL(STUDIES_URL);
  url.searchParams.set("query.cond", query.condition.trim() || "diabetes");
  url.searchParams.set("pageSize", "10");
  url.searchParams.set("sort", query.sort);
  if (query.status) {
    url.searchParams.set("filter.overallStatus", query.status);
  }
  if (query.pageToken) {
    url.searchParams.set("pageToken", query.pageToken);
  }

  const payload = await fetchJson(url.toString());
  const record =
    typeof payload === "object" && payload !== null
      ? (payload as { studies?: unknown; nextPageToken?: unknown })
      : null;
  const studies = Array.isArray(record?.studies) ? record.studies : [];

  return {
    studies: studies
      .map((study) => normalizeStudy(study))
      .filter((study): study is StudySummary => study !== null),
    nextPageToken:
      typeof record?.nextPageToken === "string" ? record.nextPageToken : null,
  };
}

export async function fetchStudy(nctId: string): Promise<StudySummary> {
  const payload = await fetchJson(
    `${STUDIES_URL}/${encodeURIComponent(nctId)}`,
  );
  const study = normalizeStudyPayload(payload);
  if (!study) {
    throw new DataRequestError(
      "This study did not include a title we can show.",
    );
  }
  return study;
}
