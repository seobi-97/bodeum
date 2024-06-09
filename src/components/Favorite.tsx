import React from "react";
import styles from "../styles/edit.module.scss";

interface EditProps {
  active: number;
  selectChar: (num: number) => void;
}
function Favorite({ active, selectChar }: EditProps) {
  return (
    <div className={styles.charBox}>
      <div
        role="none"
        onClick={() => selectChar(0)}
        className={active === 0 ? styles.active : ""}
      >
        <p>토비</p>
      </div>
      <div
        role="none"
        onClick={() => selectChar(1)}
        className={active === 1 ? styles.active : ""}
      >
        <p>마이로</p>
      </div>
      <div
        role="none"
        onClick={() => selectChar(2)}
        className={active === 2 ? styles.active : ""}
      >
        <p>루미나</p>
      </div>
      <div
        role="none"
        onClick={() => selectChar(3)}
        className={active === 3 ? styles.active : ""}
      >
        <p>블리</p>
      </div>
    </div>
  );
}

export default Favorite;
