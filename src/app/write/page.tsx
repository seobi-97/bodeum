"use client";

import React, { useState, useEffect } from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import styles from "../../styles/write.module.scss";
import chatShareSelector from "@/recoil/selector/chatShareSelector";
import userSelector from "@/recoil/selector/userSelector";
import useChatShare from "@/hooks/useChatShare";
import characterSelector from "@/recoil/selector/characterSelector";
import useGetTime from "@/hooks/useGetTime";
import ModalExit from "@/components/ModalExit";
import Header from "@/components/header";
import Toast from "@/components/toast";

interface JSONDATA {
  id: number;
  title: string;
  text: string;
}
function write() {
  const CHATSHARE = useRecoilValue(chatShareSelector);
  const [active, setActive] = useState(false);
  const [content, setContent] = useState<JSONDATA>();
  const [text, setText] = useState<string>("");
  const [nickname, setNickname] = useState<string>("");
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const USER = useRecoilValue(userSelector);
  const USERID = useRecoilValue(userSelector).userId;
  const CHARACTERNAME = useRecoilValue(characterSelector).name;

  const [showToast, setShowToast] = useState<boolean>(false);
  const router = useRouter();

  // 글쓰기
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  // 게시하기
  const { isLoading, data, isFetching, refetch } = useChatShare(USERID, {
    fluffyName: CHARACTERNAME,
    dateTime: useGetTime(),
    question: content ? content.title : "test",
    answer: content ? content.text : "test",
    comment: text,
  });
  // x 아이콘 클릭 시 모달 open
  const ExitClick = () => {
    setModalOpen(!modalOpen);
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
    if (USER) {
      setNickname(USER.nickName);
    }
  }, [USER]);
  useEffect(() => {
    setContent(CHATSHARE);
  }, [CHATSHARE]);

  useEffect(() => {
    if (data !== undefined && active) {
      console.log(data);
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        console.log("1초지남");
        router.push("/community");
      }, 3000);
    }
  }, [data]);

  useEffect(() => {
    if (data !== undefined && active) {
      console.log(data);
      setShowToast(true);
      const timeout = setTimeout(() => {
        setShowToast(false);
        router.push("/community");
      }, 1000);
      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [data]);

  const prevButton = () => {
    router.push("/chatShare");
  };

  const sendBoard = () => {
    if (text !== "") {
      setText("");
      setActive(true);
      refetch();
    } else setModalOpen(true);
  };
  if (isLoading) console.log("로딩중");
  else if (isFetching) console.log("패칭중");
  return (
    <div className={styles.background}>
      {showToast && <Toast text="포스팅이 완료됐습니다." />}
      <div className={styles.backdrop}>
        <div className={styles.finish} role="none" onClick={ExitClick}>
          <img src="/images/x.svg" alt="x" />
        </div>
        {modalOpen && (
          <div className={styles.modalBackground}>
            {text === "" ? (
              <ModalExit
                setModalOpen={setModalOpen}
                text={["작성한 내용이 없습니다."]}
                button1="돌아가기"
                button2="뒤로가기"
              />
            ) : (
              <ModalExit
                setModalOpen={setModalOpen}
                text={["페이지를 이동하면 작성하던 내용이 사라집니다."]}
                button1="돌아가기"
                button2="뒤로가기"
              />
            )}
          </div>
        )}
        <Header community={false} modal={false} />
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.leftTop}>
              <img src="/images/userIcon.svg" alt="" />
              <div>
                <p>{nickname}</p>
              </div>
            </div>
            <div className={styles.leftBottom}>
              <div>
                <input
                  type="text"
                  value={text}
                  onChange={onChange}
                  placeholder="플러피에 대한 생각을 공유해주세요."
                />
              </div>
            </div>
          </div>
          <div className={styles.right}>
            <div className={styles.title}>{content?.title}</div>
            <div className={styles.content}>{content?.text}</div>
          </div>
        </div>
        <div className={styles.buttonWrap}>
          <button className={styles.button1} type="button" onClick={prevButton}>
            돌아가기
          </button>
          <button className={styles.button2} type="button" onClick={sendBoard}>
            게시하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default write;
