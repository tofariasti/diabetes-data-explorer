import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

const links = [
  { to: "/", label: "Overview", end: true, icon: <HomeIcon /> },
  { to: "/places", label: "Counties", end: false, icon: <ChartIcon /> },
  { to: "/studies", label: "Studies", end: false, icon: <ListIcon /> },
];

function HomeIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M4 10.5 12 4l8 6.5V20a1 1 0 0 1-1 1h-5v-6H10v6H5a1 1 0 0 1-1-1z"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChartIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M5 19V10M12 19V5M19 19v-7"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function ListIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path
        d="M8 7h11M8 12h11M8 17h11M5 7h.01M5 12h.01M5 17h.01"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
      />
    </svg>
  );
}

function NavItems({ variant }: { variant: "side" | "tab" }) {
  return (
    <ul className={variant === "side" ? styles.sideNav : styles.tabNav}>
      {links.map((link) => (
        <li key={link.to}>
          <NavLink
            to={link.to}
            end={link.end}
            className={({ isActive }) => (isActive ? styles.active : undefined)}
          >
            {link.icon}
            <span>{link.label}</span>
          </NavLink>
        </li>
      ))}
    </ul>
  );
}

export function Layout() {
  return (
    <div className={styles.shell}>
      <a className={styles.skip} href="#content">
        Skip to content
      </a>
      <aside className={styles.sidebar}>
        <p className={styles.kicker}>Public health data</p>
        <p className={styles.brand}>Diabetes Data Explorer</p>
        <nav aria-label="Primary">
          <NavItems variant="side" />
        </nav>
        <p className={styles.asideNote}>
          Public estimates and study listings. Not a diagnosis, a treatment, or
          a recommendation.
        </p>
      </aside>
      <div className={styles.stage}>
        <header className={styles.topbar}>
          <p className={styles.topTitle}>Diabetes Data Explorer</p>
        </header>
        <main id="content" className={styles.main}>
          <Outlet />
        </main>
      </div>
      <nav className={styles.tabbar} aria-label="Primary">
        <NavItems variant="tab" />
      </nav>
    </div>
  );
}
