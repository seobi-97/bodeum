"use client";

import React, { MouseEvent, useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
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
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const setChatShare = useSetRecoilState(chatShareState);
  const divRef = useRef(null);
  const router = useRouter();

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
  for (let i = 0; i < CHAT_ME.length; i++) {
    CHAT_SHARE.push({
      id: i,
      title: CHAT_ME[i].text,
      text: CHATFluffy[i].text,
    });
    console.log(CHAT_SHARE);
  }
  console.log(CHAT_ME);
  console.log(CHATFluffy);
  useEffect(() => {
    setAllChat(CHAT_SHARE);
  }, []);

  console.log(CHAT_SHARE);
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
    setModalOpen(!modalOpen);
  };
  const onSideClick = (e: MouseEvent<HTMLDivElement>) => {
    if (divRef.current === e.target) {
      setNormal(true);
    }
  };
  // chatShare active 내용 저장(recoil)
  const setRecoilState = () => {
    setChatShare(ALL_CHAT[parseInt(isActive, 10)]);
  };
  const onSlideClick = (e: MouseEvent<HTMLDivElement>) => {
    if (e.target instanceof HTMLElement) {
      const t = e.target.id;
      setActive(t);
      setNormal(false);
      setRecoilState();
    }
  };

  const homeClick = () => {
    router.push("/");
  };

  // 특정글을 선택하면 active처리, 그 외에 것들은 nonActive(검은색 화면)
  // 글 영역 이외인 부분을 클릭 시 -> normal은 true가 되고, active와 nonActive 모두 풀림.
  return (
    <div className={styles.background}>
      <div className={styles.sliderbackdrop}>
        <div className={styles.finish} role="none" onClick={ExitClick}>
          <img src="/images/x.svg" alt="x" />
        </div>
        {modalOpen && (
          <div className={styles.modalBackground}>
            {normal ? (
              <ModalExit
                setModalOpen={setModalOpen}
                text={MODAL.SHARE_EXIT.TEXT}
                button1={MODAL.SHARE_EXIT.BUTTON1}
                button2={MODAL.SHARE_EXIT.BUTTON2}
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
        <div className={styles.title}>BODEUM</div>
        <div className={styles.header}>
          저장 버튼을 누른 대화 중 공유하고 싶은 답변을 선택해주세요.
        </div>
        {ALL_CHAT.length < 4 ? (
          <div className={styles.chatSlider2}>
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
        <div>
          <button
            className={styles.sharebutton}
            type="button"
            onClick={homeClick}
          >
            홈
          </button>
          <button
            className={styles.sharebutton}
            type="button"
            onClick={homeClick}
          >
            커뮤니티
          </button>
        </div>
      </div>
    </div>
  );
}

export default chatShare;