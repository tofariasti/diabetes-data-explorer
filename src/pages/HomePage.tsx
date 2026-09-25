import { Link } from "react-router-dom";
import styles from "./HomePage.module.css";

export function HomePage() {
  return (
    <article className={styles.page}>
      <p className={styles.lead}>
        A small window onto public diabetes data: county estimates from the CDC,
        and studies listed on ClinicalTrials.gov.
      </p>
      <div className={styles.grid}>
        <Link to="/places" className={styles.card}>
          <h1>Where estimates are higher</h1>
          <p>
            PLACES publishes model-based estimates of diagnosed diabetes among
            adults in US counties. The ranking is a population picture, not a
            diagnosis for anyone who lives there.
          </p>
          <span className={styles.cta}>Open the county ranking</span>
        </Link>
        <Link to="/studies" className={styles.card}>
          <h2>What researchers are studying</h2>
          <p>
            The registry lists studies by condition, status, and phase. A
            listing means a study was registered. It does not mean a treatment
            works or that you should join it.
          </p>
          <span className={styles.cta}>Browse diabetes studies</span>
        </Link>
      </div>
    </article>
  );
}
