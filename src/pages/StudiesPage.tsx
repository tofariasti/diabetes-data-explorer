import { useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { AsyncState } from "../components/AsyncState";
import { useStudies } from "../hooks/useStudies";
import styles from "./StudiesPage.module.css";

const SORTS = [
  { value: "LastUpdatePostDate:desc", label: "Recently updated" },
  { value: "EnrollmentCount:desc", label: "Largest enrollment" },
];

const STATUSES = [
  { value: "", label: "Any status" },
  { value: "RECRUITING", label: "Recruiting" },
  { value: "ACTIVE_NOT_RECRUITING", label: "Active, not recruiting" },
  { value: "COMPLETED", label: "Completed" },
];

export function StudiesPage() {
  const [params, setParams] = useSearchParams();
  const condition = params.get("q") ?? "diabetes";
  const status = params.get("status") ?? "";
  const sort = params.get("sort") ?? SORTS[0].value;
  const [draft, setDraft] = useState(condition);
  const [tokens, setTokens] = useState<Array<string | null>>([null]);
  const pageToken = tokens[tokens.length - 1] ?? null;
  const studies = useStudies({ condition, status, sort, pageToken });

  function updateFilters(next: { q?: string; status?: string; sort?: string }) {
    const query = new URLSearchParams(params);
    if (next.q !== undefined) query.set("q", next.q);
    if (next.status !== undefined) {
      if (next.status) query.set("status", next.status);
      else query.delete("status");
    }
    if (next.sort !== undefined) query.set("sort", next.sort);
    setParams(query);
    setTokens([null]);
  }

  return (
    <section>
      <header className={styles.intro}>
        <h1>Diabetes studies</h1>
        <p>
          Listings from ClinicalTrials.gov. A record describes a registered
          study. It is not a recommendation to enroll and it does not prove that
          an intervention works.
        </p>
      </header>
      <form
        className={styles.filters}
        onSubmit={(event) => {
          event.preventDefault();
          updateFilters({ q: draft.trim() || "diabetes" });
        }}
      >
        <label>
          Condition
          <input
            value={draft}
            onChange={(event) => setDraft(event.target.value)}
          />
        </label>
        <label>
          Status
          <select
            value={status}
            onChange={(event) => updateFilters({ status: event.target.value })}
          >
            {STATUSES.map((item) => (
              <option key={item.value || "any"} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <label>
          Sort
          <select
            value={sort}
            onChange={(event) => updateFilters({ sort: event.target.value })}
          >
            {SORTS.map((item) => (
              <option key={item.value} value={item.value}>
                {item.label}
              </option>
            ))}
          </select>
        </label>
        <button type="submit">Search</button>
      </form>

      {studies.isPending ? (
        <AsyncState title="Loading studies">
          Asking the registry for matching records.
        </AsyncState>
      ) : null}
      {studies.isError ? (
        <AsyncState
          title="The study list did not load"
          action={
            <button type="button" onClick={() => void studies.refetch()}>
              Try again
            </button>
          }
        >
          {studies.error instanceof Error
            ? studies.error.message
            : "Something went wrong while reading ClinicalTrials.gov."}
        </AsyncState>
      ) : null}
      {studies.isSuccess && studies.data.studies.length === 0 ? (
        <AsyncState title="No studies match">
          Try a broader condition, such as diabetes, or clear the status filter.
        </AsyncState>
      ) : null}
      {studies.isSuccess && studies.data.studies.length > 0 ? (
        <>
          <ul className={styles.list}>
            {studies.data.studies.map((study) => (
              <li key={study.nctId}>
                <Link to={`/studies/${study.nctId}`}>{study.title}</Link>
                <p>
                  <span>{study.status}</span>
                  {study.phases.length > 0 ? (
                    <span>{study.phases.join(", ")}</span>
                  ) : null}
                  <span>{study.nctId}</span>
                </p>
              </li>
            ))}
          </ul>
          <div className={styles.pager}>
            <button
              type="button"
              disabled={tokens.length === 1}
              onClick={() => setTokens((current) => current.slice(0, -1))}
            >
              Previous
            </button>
            <button
              type="button"
              disabled={!studies.data.nextPageToken}
              onClick={() => {
                const next = studies.data?.nextPageToken;
                if (!next) return;
                setTokens((current) => [...current, next]);
              }}
            >
              Next
            </button>
          </div>
        </>
      ) : null}
    </section>
  );
}
