import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import characterSelector from "@/recoil/selector/characterSelector";
import styles from "../styles/loading.module.scss";
import Dots from "./Dots";

function loading() {
  const CHARACTERSTATUS = useRecoilValue(characterSelector);
  const [imgNum, setImgNum] = useState(9);
  useEffect(() => {
    setImgNum(CHARACTERSTATUS.id);
  });
  return (
    <div className={styles.background}>
      <div className={styles.loading}>
        <div className={styles.dotBox}>
          <Dots />
        </div>
        <img src="/images/loading.svg" alt="loading" />
      </div>
      <div className={styles.character}>
        <img
          src={
            imgNum >= 9
              ? `/images/character${imgNum}.svg`
              : "/images/character9.svg"
          }
          alt="character"
        />
      </div>
      <div className={styles.comment}>로딩중</div>
    </div>
  );
}

export default loading;
