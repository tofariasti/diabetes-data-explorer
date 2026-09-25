import type { CountyEstimate, StudySummary } from "./types";

type JsonRecord = Record<string, unknown>;

function asRecord(value: unknown): JsonRecord | null {
  if (typeof value === "object" && value !== null) {
    return value as JsonRecord;
  }
  return null;
}

function asString(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function asStringList(value: unknown): string[] {
  if (!Array.isArray(value)) return [];
  return value.filter((item): item is string => typeof item === "string");
}

function titleCaseToken(value: string): string {
  return value
    .toLowerCase()
    .split("_")
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join(" ");
}

export function formatStatus(status: string): string {
  if (!status) return "Status not listed";
  return titleCaseToken(status);
}

export function formatPhase(phase: string): string {
  const match = /^PHASE(\d+)$/i.exec(phase);
  if (match) return `Phase ${match[1]}`;
  if (!phase) return "";
  return titleCaseToken(phase);
}

export function normalizeStudy(raw: unknown): StudySummary | null {
  const record = asRecord(raw);
  const protocol = asRecord(record?.protocolSection);
  if (!protocol) return null;

  const identification = asRecord(protocol.identificationModule);
  const nctId = asString(identification?.nctId);
  const title = asString(identification?.briefTitle);
  if (!nctId || !title) return null;

  const status = asRecord(protocol.statusModule);
  const description = asRecord(protocol.descriptionModule);
  const conditions = asRecord(protocol.conditionsModule);
  const design = asRecord(protocol.designModule);
  const sponsors = asRecord(protocol.sponsorCollaboratorsModule);
  const lead = asRecord(sponsors?.leadSponsor);

  return {
    nctId,
    title,
    status: formatStatus(asString(status?.overallStatus)),
    summary: asString(description?.briefSummary),
    conditions: asStringList(conditions?.conditions),
    phases: asStringList(design?.phases).map(formatPhase).filter(Boolean),
    sponsor: asString(lead?.name),
  };
}

export function normalizeStudyPayload(raw: unknown): StudySummary | null {
  const record = asRecord(raw);
  const studies = record?.studies;
  if (Array.isArray(studies)) {
    return normalizeStudy(studies[0]);
  }
  return normalizeStudy(raw);
}

export function normalizeCounty(raw: unknown): CountyEstimate | null {
  const record = asRecord(raw);
  if (!record) return null;

  const state = asString(record.stateabbr);
  const county = asString(record.locationname);
  const year = asString(record.year);
  const numeric = Number(record.data_value);
  if (!state || !county || !Number.isFinite(numeric)) return null;

  return { state, county, value: numeric, year };
}
