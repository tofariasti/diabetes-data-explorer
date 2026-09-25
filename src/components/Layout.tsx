import { NavLink, Outlet } from "react-router-dom";
import styles from "./Layout.module.css";

const links = [
  { to: "/", label: "Overview", end: true },
  { to: "/places", label: "Counties", end: false },
  { to: "/studies", label: "Studies", end: false },
];

export function Layout() {
  return (
    <div className={styles.shell}>
      <a className={styles.skip} href="#content">
        Skip to content
      </a>
      <header className={styles.header}>
        <div>
          <p className={styles.kicker}>Public health data</p>
          <p className={styles.brand}>Diabetes Data Explorer</p>
        </div>
        <nav aria-label="Primary">
          <ul className={styles.nav}>
            {links.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.end}
                  className={({ isActive }) =>
                    isActive ? styles.active : undefined
                  }
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </header>
      <main id="content" className={styles.main}>
        <Outlet />
      </main>
      <footer className={styles.footer}>
        <p>
          This explorer shows public estimates and study listings. It does not
          diagnose, treat, or recommend care.
        </p>
      </footer>
    </div>
  );
}
