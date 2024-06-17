"use client";

import Image from "next/image";
import { AiOutlineArrowDown } from "react-icons/ai";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import userSelector from "@/recoil/selector/userSelector";
import styles from "./page.module.scss";
import Spacing from "../components/atom/Spacing";
import { ICharacterProps } from "../types/main";
import Footer from "../components/main/Footer";
import useGetCharacter from "@/hooks/useGetCharacter";
import charactersSelector from "@/recoil/selector/charactersSelector";
import characterState from "@/recoil/atom/characterAtom";
import { useDeleteChat, useDeleteChatShare } from "@/hooks/useDeleteStorage";
import CHARACTER from "@/data/Character";

export default function MainPage() {
  const [isLogin, setLogin] = useState(false);
  const [characters, setCharacters] = useState([]);
  const isClient = typeof window === "object";
  const [mobile, setMobile] = useState(false);

  const setCharacter = useSetRecoilState(characterState);
  const router = useRouter();
  // 캐릭터 정보 요청
  const { data } = useGetCharacter();
  console.log("캐릭터 정보", data);
  // recoil store에서 정보 가져오기
  const LOGINSTATUS = useRecoilValue(userSelector).isLogin;
  const CHARACTERSSTATUS = useRecoilValue(charactersSelector);

  useEffect(() => {
    setCharacters(CHARACTERSSTATUS);
    // recoil에 저장된 값에 따라 isLogin(로그인 상태값) 변경
    if (LOGINSTATUS) setLogin(true);
    else setLogin(false);
  }, [LOGINSTATUS, CHARACTERSSTATUS]);
  useEffect(() => {
    useDeleteChat();
    useDeleteChatShare();
  }, []);
  const getSize = () => {
    return { width: isClient ? window.innerWidth : undefined };
  };
  const [windowSize, setWindowSize] = useState(getSize);
  const handelResize = () => {
    setWindowSize(getSize());
  };
  useEffect(() => {
    if (windowSize.width !== undefined && windowSize.width < 1000) {
      setMobile(true);
    } else {
      setMobile(false);
    }
    window.addEventListener("resize", handelResize);
    return () => {
      window.removeEventListener("resize", handelResize);
    };
  }, [windowSize]);
  const LoginKakaoFn = () => {
    window.location.href =
      "https://kauth.kakao.com/oauth/authorize?client_id=e1ca1242637d6f7e5d769861cbf80017&redirect_uri=https://bodeum.vercel.app/success&response_type=code";
  };
  const MyPage = () => {
    router.push("/mypage");
  };
  const Community = () => {
    router.push("/community");
  };
  const clickCharacter = (id: number, name: string) => {
    console.log(id);
    setCharacter({ id, name });
    router.push("/guide");
  };
  return (
    <main className={styles.main}>
      <Spacing height="100px" />
      <section className={styles.topSection}>
        <video
          className={styles.videoFileDesktop}
          width="1350"
          height="772"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/main_video_desktop.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <video
          className={styles.videoFileMobile}
          width="347"
          height="605"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/videos/main_video_mobile.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div id={styles.scroll}>
          <span>Scroll Down</span>
          <Spacing height="0px" />
          <AiOutlineArrowDown />
        </div>
      </section>

      <Spacing height="100px" />

      <section className={styles.bottomSection}>
        <div className={styles.bgImgContainer}>
          <div className={styles.leftBox}>
            <Image
              src="/images/main_logo.svg"
              alt="메인 로고"
              width="350"
              height="89"
              id={styles.logo}
            />
            <div className={styles.desc}>
              원하는 플러피를 선택하고 대화를 시작해보세요
            </div>
            <Spacing height="10px" />
            <div className={styles.nav}>
              {isLogin ? (
                <>
                  <button
                    className={styles.defaultBtn}
                    onClick={() => {
                      MyPage();
                    }}
                    type="button"
                  >
                    마이페이지
                  </button>
                  <button
                    className={styles.defaultBtn}
                    onClick={() => {
                      Community();
                    }}
                    type="button"
                  >
                    커뮤니티
                  </button>
                </>
              ) : (
                <>
                  <button
                    className={styles.kakaoBtn}
                    onClick={() => {
                      LoginKakaoFn();
                    }}
                    type="button"
                  >
                    <Image
                      src="/images/ic_kakao.svg"
                      alt="카카오 로그인"
                      width="20"
                      height="20"
                    />
                    <span>{!mobile ? "카카오로 시작하기" : "로그인"}</span>
                  </button>
                  <button
                    className={styles.defaultBtn}
                    onClick={() => {
                      Community();
                    }}
                    type="button"
                  >
                    <span>커뮤니티</span>
                  </button>
                </>
              )}
            </div>
          </div>
          <div className={styles.rightBox}>
            {characters.map((item: ICharacterProps, idx: number) => {
              return (
                <div
                  role="button"
                  tabIndex={0}
                  className={styles.characterCard}
                  key={item.id}
                  onClick={() => clickCharacter(item.id, item.name)}
                  onKeyDown={() => clickCharacter(item.id, item.name)}
                >
                  <span className={styles.name}>{item.name}</span>
                  <Image
                    src={CHARACTER[idx].src}
                    alt={item.name}
                    width="150"
                    height="150"
                  />
                  <p className={styles.info}>{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
      <Spacing height="100px" />
      <Footer />
    </main>
  );
}
