import type { ReactNode } from "react";
import styles from "./AsyncState.module.css";

type AsyncStateProps = {
  title: string;
  children: ReactNode;
  action?: ReactNode;
};

export function AsyncState({ title, children, action }: AsyncStateProps) {
  return (
    <div className={styles.panel}>
      <h2>{title}</h2>
      <p>{children}</p>
      {action}
    </div>
  );
}
