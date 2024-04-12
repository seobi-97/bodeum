import React from "react";
import styles from "../styles/skeleton.module.scss";

function skeleton() {
  return (
    <div className={styles.container}>
      <div className={styles.skeletonItem}>
        <div className={styles.top}>
          <div className={styles.circle} />
          <div className={styles.title2} />
        </div>
        <div className={styles.title} />
        <div className={styles.content} />
      </div>
    </div>
  );
}

export default skeleton;
