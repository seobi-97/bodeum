"use client";

import React, { MouseEvent, useState, useRef, useEffect } from "react";
import { useSetRecoilState, useRecoilValue } from "recoil";
import Slider from "react-slick";
import styles from "../../styles/chat.module.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import SliderContainer from "../../components/SliderContainer";
import ModalExit from "../../components/ModalExit";
import MODAL from "../../constants/Modal";

import chatState from "@/recoil/atom/chat";
import chatShareState from "@/recoil/atom/chatShare";
import userSelector from "@/recoil/selector/userSelector";

interface JSONDATA {
  id: number;
  title: string;
  text: string;
}
interface CHATDATA {
  id: number;
  text: string;
}
interface SliderProps {
  arrows: boolean;
  dots: boolean;
  isfinite: boolean;
  slidesToShow: number;
  slidesToScroll: number;
  speed: number;
  draggable: boolean;
}
function chatShare() {
  const [isActive, setActive] = useState<string>("0");
  const [normal, setNormal] = useState<boolean>(true);
  const [home, setHome] = useState<boolean>(false);
  const [community, setCommunity] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const setChatShare = useSetRecoilState(chatShareState);
  const divRef = useRef(null);
  const [mobile, setMobile] = useState(false);
  const USER = useRecoilValue(userSelector);
  // 첫번째 인사말을 제외한 대화내용
  const CHAT = useRecoilValue(chatState).slice(1);
  // 내가 한 대화
  const CHAT_ME = CHAT.filter((chat: CHATDATA) => chat.id === 0);
  // 답변
  const CHATFluffy = CHAT.filter((chat: CHATDATA) => chat.id === 1);
  const CHAT_SHARE: React.SetStateAction<JSONDATA[]> = [];
  const [ALL_CHAT, setAllChat] = useState<JSONDATA[]>([
    { id: 0, title: "", text: "" },
  ]);
  const isClient = typeof window === "object";
  const getSize = () => {
    return { width: isClient ? window.innerWidth : undefined };
  };
  const [windowSize, setWindowSize] = useState(getSize);

  for (let i = 0; i < CHAT_ME.length; i++) {
    CHAT_SHARE.push({
      id: i,
      title: CHAT_ME[i].text,
      text: CHATFluffy[i].text,
    });
  }

  const handelResize = () => {
    setWindowSize(getSize());
  };
  // 뒤로가기 버튼 클릭 시, 모달 오픈
  const handlePopState = () => {
    setModalOpen(true);
  };
  useEffect(() => {
    // history에 stack을 하나 쌓는다.
    // 그 뒤, 뒤로 가기 이벤트가 실행되면서 원하는 이벤트가 실행된다.
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", () => {
      handlePopState();
    });
    return () => {
      window.removeEventListener("popstate", () => {
        handlePopState();
      });
    };
  });
  useEffect(() => {
    if (windowSize.width !== undefined && windowSize.width < 1000) {
      setMobile(true);
    } else {
      setMobile(false);
    }
    window.addEventListener("resize", handelResize);
    return () => window.removeEventListener("resize", handelResize);
  });
  useEffect(() => {
    setAllChat(CHAT_SHARE);
  }, []);

  const settings: SliderProps = {
    arrows: true,
    dots: true,
    isfinite: false,
    slidesToShow: 4,
    slidesToScroll: 4,
    speed: 500,
    draggable: false,
  };
  // x 아이콘 클릭 시 모달 open
  const ExitClick = () => {
    if (USER.isLogin) {
      if (ALL_CHAT.length === 1) {
        setChatShare(ALL_CHAT[0]);
        setNormal(false);
      }
      setModalOpen(!modalOpen);
      setCommunity(false);
      setHome(false);
    } else {
      setModalOpen(true);
    }
  };
  const onSideClick = (e: MouseEvent<HTMLDivElement>) => {
    if (divRef.current === e.target) {
      setNormal(true);
      setChatShare([]);
    }
  };
  // chatShare active 내용 저장(recoil)
  const onSlideClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement) {
      const t = e.target.id;
      setActive(t);
      setNormal(false);
      setChatShare(ALL_CHAT[parseInt(t, 10)]);
    }
  };

  const communityClick = () => {
    setModalOpen(true);
    setHome(false);
    setCommunity(true);
  };
  const homeClick = () => {
    console.log("click");
    setModalOpen(true);
    setCommunity(false);
    setHome(true);
  };

  // 특정글을 선택하면 active처리, 그 외에 것들은 nonActive(검은색 화면)
  // 글 영역 이외인 부분을 클릭 시 -> normal은 true가 되고, active와 nonActive 모두 풀림.
  return (
    <div className={styles.main}>
      <div className={styles.background}>
        <div className={styles.sliderbackdrop}>
          {/* <div className={styles.finish} role="none" onClick={ExitClick}>
            <img src="/images/x.svg" alt="x" />
          </div> */}
          {modalOpen && (
            <div className={styles.modalBackground}>
              {home ? (
                <ModalExit
                  setModalOpen={setModalOpen}
                  text={MODAL.HOME.TEXT}
                  button1={MODAL.HOME.BUTTON1}
                  button2={MODAL.HOME.BUTTON2}
                />
              ) : community ? (
                <ModalExit
                  setModalOpen={setModalOpen}
                  text={MODAL.COMMUNITY.TEXT}
                  button1={MODAL.COMMUNITY.BUTTON1}
                  button2={MODAL.COMMUNITY.BUTTON2}
                />
              ) : normal ? (
                <ModalExit
                  setModalOpen={setModalOpen}
                  text={MODAL.NOSELECTSHARE.TEXT}
                  button1={MODAL.NOSELECTSHARE.BUTTON1}
                  button2={MODAL.NOSELECTSHARE.BUTTON2}
                />
              ) : (
                <ModalExit
                  setModalOpen={setModalOpen}
                  text={MODAL.SHARE.TEXT}
                  button1={MODAL.SHARE.BUTTON1}
                  button2={MODAL.SHARE.BUTTON2}
                />
              )}
            </div>
          )}
          <div
            role="button"
            className={styles.refGround}
            ref={divRef}
            tabIndex={0}
            onClick={onSideClick}
            onKeyDown={() => onSideClick}
          />
          <div className={styles.bodeum} role="none" onClick={homeClick}>
            <p>Bodeum</p>
          </div>

          <div className={styles.header}>
            {mobile ? (
              <>
                <p>저장 버튼을 누른 대화 중</p>
                <p>공유하고 싶은 답변 1개를 선택해주세요.</p>
              </>
            ) : (
              <p>
                저장 버튼을 누른 대화 중 공유하고 싶은 답변 1개를 선택해주세요.
              </p>
            )}
          </div>
          {ALL_CHAT.length < 4 || mobile ? (
            <div
              className={styles.chatSlider2}
              style={{ zIndex: modalOpen ? "1" : "999" }}
            >
              {ALL_CHAT.map((obj: JSONDATA) => (
                <SliderContainer
                  obj={String(obj.id)}
                  key={obj.id}
                  className={styles.card}
                  title={obj.title}
                  content={obj.text}
                  onSlideClick={onSlideClick}
                  isActive={isActive}
                  normal={normal}
                />
              ))}
            </div>
          ) : (
            <div className={styles.chatSlider}>
              <Slider {...settings}>
                {ALL_CHAT.map((obj: JSONDATA) => (
                  <SliderContainer
                    obj={String(obj.id)}
                    key={obj.id}
                    className={styles.card}
                    title={obj.title}
                    content={obj.text}
                    onSlideClick={onSlideClick}
                    isActive={isActive}
                    normal={normal}
                  />
                ))}
              </Slider>
            </div>
          )}
          <div className={styles.buttonBox}>
            <div
              className={styles.sharebutton}
              role="none"
              onClick={communityClick}
              style={{ zIndex: modalOpen ? "1" : "999" }}
            >
              커뮤니티
            </div>
            {USER?.isLogin && (
              <div
                className={styles.sharebutton}
                role="none"
                onClick={ExitClick}
                style={{ zIndex: modalOpen ? "1" : "999" }}
              >
                공유하기
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default chatShare;
