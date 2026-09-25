import { Link, useParams } from "react-router-dom";
import { AsyncState } from "../components/AsyncState";
import { useStudy } from "../hooks/useStudy";
import styles from "./StudyDetailPage.module.css";

export function StudyDetailPage() {
  const { nctId = "" } = useParams();
  const study = useStudy(nctId);

  return (
    <article>
      <p className={styles.back}>
        <Link to="/studies">Back to studies</Link>
      </p>
      {study.isPending ? (
        <AsyncState title="Loading study">
          Reading this registry record.
        </AsyncState>
      ) : null}
      {study.isError ? (
        <AsyncState
          title="This study did not load"
          action={
            <button type="button" onClick={() => void study.refetch()}>
              Try again
            </button>
          }
        >
          {study.error instanceof Error
            ? study.error.message
            : "Something went wrong while reading this study."}
        </AsyncState>
      ) : null}
      {study.isSuccess ? (
        <>
          <h1>{study.data.title}</h1>
          <dl className={styles.facts}>
            <div>
              <dt>Registry ID</dt>
              <dd>{study.data.nctId}</dd>
            </div>
            <div>
              <dt>Status</dt>
              <dd>{study.data.status}</dd>
            </div>
            <div>
              <dt>Phase</dt>
              <dd>{study.data.phases.join(", ") || "Not listed"}</dd>
            </div>
            <div>
              <dt>Lead sponsor</dt>
              <dd>{study.data.sponsor || "Not listed"}</dd>
            </div>
          </dl>
          {study.data.conditions.length > 0 ? (
            <p className={styles.conditions}>
              {study.data.conditions.join(" · ")}
            </p>
          ) : null}
          <p className={styles.summary}>
            {study.data.summary || "This record has no short summary."}
          </p>
          <p className={styles.note}>
            Text from ClinicalTrials.gov. It describes a registered study and is
            not medical advice.{" "}
            <a href={`https://clinicaltrials.gov/study/${study.data.nctId}`}>
              Read the full record
            </a>
            .
          </p>
        </>
      ) : null}
    </article>
  );
}
