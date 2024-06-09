import React from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import styles from "../styles/header.module.scss";
import userSelector from "@/recoil/selector/userSelector";

interface DATA {
  community: boolean;
  modal: boolean;
}
function Header({ community, modal }: DATA) {
  const router = useRouter();
  const LOGINSTATUS = useRecoilValue(userSelector).isLogin;
  console.log(LOGINSTATUS);
  const prevButton = () => {
    router.back();
  };
  const userButton = () => {
    // 회원가입 하지 않은 경우
    if (!LOGINSTATUS)
      window.location.href =
        "https://kauth.kakao.com/oauth/authorize?client_id=e1ca1242637d6f7e5d769861cbf80017&redirect_uri=https://bodeum.vercel.app/success&response_type=code";
    else router.push("/mypage");
  };
  const homeButton = () => {
    if (!modal) window.location.replace("/");
  };
  return (
    <div className={styles.header}>
      {community === true ? (
        <>
          <img
            className={styles.prev}
            src="/images/blackPrev.svg"
            alt="prev"
            role="none"
            onClick={prevButton}
          />
          <div className={styles.title} onClick={homeButton} role="none">
            Bodeum
          </div>
          <img
            className={styles.user}
            src="/images/blackUser.svg"
            alt="user"
            role="none"
            onClick={userButton}
          />
        </>
      ) : (
        <div className={styles.title} onClick={homeButton} role="none">
          Bodeum
        </div>
      )}
    </div>
  );
}

export default Header;
