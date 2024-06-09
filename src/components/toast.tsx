import React from "react";
import styles from "../styles/write.module.scss";

interface DATA {
  text: string;
}
function toast({ text }: DATA) {
  return (
    <div className={styles.postContainer}>
      <div className={styles.postBox}>{text}</div>
    </div>
  );
}

export default toast;
