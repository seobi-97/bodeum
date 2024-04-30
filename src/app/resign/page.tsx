"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import styles from "../../styles/resign.module.scss";

function Resign() {
  const [check, setCheck] = useState(false);
  const router = useRouter();
  const prevButton = () => {
    router.push("/");
  };
  const homeButton = () => {
    router.push("/");
  };
  const checked = () => {
    setCheck(!check);
  };
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img
            src="/images/blackPrev.svg"
            alt="prev"
            onClick={prevButton}
            role="none"
          />
          <h1>Bodeum 게시판</h1>
          <div className={styles.homeIcon} onClick={homeButton} role="none">
            <img src="/images/bodeumIcon.svg" alt="bodeumIcon" />
          </div>
        </div>
        <div className={styles.contentBody}>
          <div className={styles.title}>
            <h1>회원탈퇴</h1>
          </div>
          <div className={styles.subtitle}>
            <p>회원 탈퇴 후 보듬 서비스의 모든 이용이 중단됩니다.</p>
          </div>
          <div className={styles.first}>
            <div>
              <span>이메일 </span>
              <span>*</span>
            </div>
            <div>
              <span>이름 </span>
              <span>*</span>
            </div>
          </div>
          <div className={styles.second}>
            <label htmlFor="agree">
              <input
                className={styles.agree}
                id="agree"
                type="checkbox"
                onClick={checked}
              />
              <span>안내사항을 모두 확인하였으며, 이에 동의합니다.</span>
            </label>
          </div>
          <div className={styles.third}>
            <p>1. 탈퇴 후 회원정보는 모두 삭제됩니다.</p>
            <p>2. 탈퇴 후 플러피와 대화한 모든 기록은 복구가 불가능합니다.</p>
            <p>3. 탈퇴 후 커뮤니티에 공유했던 글은 복구가 불가능합니다.</p>
          </div>
        </div>
        <div className={styles.buttonWrap}>
          <button className={styles.button1} type="button">
            탈퇴하기
          </button>
          <button className={styles.button2} type="button">
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Resign;
