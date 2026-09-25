import { useMemo, useState } from "react";
import { AsyncState } from "../components/AsyncState";
import { useCounties } from "../hooks/useCounties";
import styles from "./PlacesPage.module.css";

const STATES = [
  "AL",
  "AK",
  "AZ",
  "AR",
  "CA",
  "CO",
  "CT",
  "DE",
  "DC",
  "FL",
  "GA",
  "HI",
  "ID",
  "IL",
  "IN",
  "IA",
  "KS",
  "KY",
  "LA",
  "ME",
  "MD",
  "MA",
  "MI",
  "MN",
  "MS",
  "MO",
  "MT",
  "NE",
  "NV",
  "NH",
  "NJ",
  "NM",
  "NY",
  "NC",
  "ND",
  "OH",
  "OK",
  "OR",
  "PA",
  "RI",
  "SC",
  "SD",
  "TN",
  "TX",
  "UT",
  "VT",
  "VA",
  "WA",
  "WV",
  "WI",
  "WY",
];

export function PlacesPage() {
  const [state, setState] = useState("");
  const [county, setCounty] = useState("");
  const [submittedCounty, setSubmittedCounty] = useState("");
  const query = useMemo(
    () => ({ state, county: submittedCounty }),
    [state, submittedCounty],
  );
  const counties = useCounties(query);
  const peak = Math.max(
    ...(counties.data?.map((item) => item.value) ?? [1]),
    1,
  );

  return (
    <section>
      <header className={styles.intro}>
        <h1>County estimates</h1>
        <p>
          Age-adjusted prevalence of diagnosed diabetes among adults, from CDC
          PLACES. These are estimates for a county, not a count of patients and
          not a diagnosis.
        </p>
      </header>
      <form
        className={styles.filters}
        onSubmit={(event) => {
          event.preventDefault();
          setSubmittedCounty(county);
        }}
      >
        <label>
          State
          <select
            value={state}
            onChange={(event) => {
              setState(event.target.value);
              setSubmittedCounty(county);
            }}
          >
            <option value="">All states</option>
            {STATES.map((abbr) => (
              <option key={abbr} value={abbr}>
                {abbr}
              </option>
            ))}
          </select>
        </label>
        <label>
          County name
          <input
            value={county}
            onChange={(event) => setCounty(event.target.value)}
            placeholder="Optional"
          />
        </label>
        <button type="submit">Apply</button>
      </form>

      {counties.isPending ? (
        <AsyncState title="Loading estimates">
          Fetching the latest county ranking.
        </AsyncState>
      ) : null}
      {counties.isError ? (
        <AsyncState
          title="The ranking did not load"
          action={
            <button type="button" onClick={() => void counties.refetch()}>
              Try again
            </button>
          }
        >
          {counties.error instanceof Error
            ? counties.error.message
            : "Something went wrong while reading CDC PLACES."}
        </AsyncState>
      ) : null}
      {counties.isSuccess && counties.data.length === 0 ? (
        <AsyncState title="No counties match">
          Try another state, or clear the county name. Some counties are omitted
          when the estimate is missing.
        </AsyncState>
      ) : null}
      {counties.isSuccess && counties.data.length > 0 ? (
        <>
          <p className={styles.note}>
            Showing {counties.data.length} counties
            {counties.data[0]?.year ? ` for ${counties.data[0].year}` : ""},
            highest estimate first. Source: CDC PLACES.
          </p>
          <ol className={styles.chart}>
            {counties.data.map((item) => (
              <li key={`${item.state}-${item.county}`}>
                <span className={styles.label}>
                  {item.county}, {item.state}
                </span>
                <span className={styles.track} aria-hidden="true">
                  <span style={{ width: `${(item.value / peak) * 100}%` }} />
                </span>
                <span className={styles.value}>{item.value.toFixed(1)}%</span>
              </li>
            ))}
          </ol>
        </>
      ) : null}
    </section>
  );
}
