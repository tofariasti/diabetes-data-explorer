import { fetchJson } from "./http";
import { normalizeCounty } from "./normalize";
import type { CountyEstimate } from "./types";

const PLACES_URL = "https://data.cdc.gov/resource/swc5-untb.json";

export type PlaceQuery = {
  state: string;
  county: string;
};

export async function fetchCounties(
  query: PlaceQuery,
): Promise<CountyEstimate[]> {
  const filters = ["data_value IS NOT NULL"];
  if (query.state) {
    filters.push(`stateabbr='${query.state}'`);
  }
  const county = query.county.trim().replaceAll("'", "");
  if (county) {
    filters.push(`upper(locationname)='${county.toUpperCase()}'`);
  }

  const url = new URL(PLACES_URL);
  url.searchParams.set("measureid", "DIABETES");
  url.searchParams.set("data_value_type", "Age-adjusted prevalence");
  url.searchParams.set("$select", "stateabbr,locationname,data_value,year");
  url.searchParams.set("$where", filters.join(" AND "));
  url.searchParams.set("$order", "data_value DESC");
  url.searchParams.set("$limit", "12");

  const payload = await fetchJson(url.toString());
  if (!Array.isArray(payload)) return [];

  return payload
    .map((row) => normalizeCounty(row))
    .filter((row): row is CountyEstimate => row !== null);
}
