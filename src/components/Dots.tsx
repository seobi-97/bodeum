import React from "react";
import styles from "../styles/loading.module.scss";

function Dots() {
  return (
    <div className={styles.dots}>
      <div className={styles.droplet} />
      <div className={styles.droplet} />
      <div className={styles.droplet} />
    </div>
  );
}

export default Dots;
