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

interface JSONDATA {
  id: number;
  title: string;
  text: string;
}
function write() {
  const CHATSHARE = useRecoilValue(chatShareSelector);
  const [content, setContent] = useState<JSONDATA>();
  const [text, setText] = useState<string>("");

  const USERID = useRecoilValue(userSelector).userId;
  const CHARACTERNAME = useRecoilValue(characterSelector).name;

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
  useEffect(() => {
    setContent(CHATSHARE);
    if (data !== undefined) {
      console.log(data);
      router.push("/community");
    }
  }, [CHATSHARE, data]);

  const sendBoard = () => {
    if (text !== "") {
      setText("");
      refetch();
    }
  };
  if (isLoading) console.log("로딩중");
  else if (isFetching) console.log("패칭중");
  return (
    <div className={styles.background}>
      <div className={styles.backdrop}>
        <div className={styles.finish} role="none">
          <img src="/images/x.svg" alt="x" />
        </div>
        <div className={styles.header}>
          <h1>Bodeum</h1>
        </div>
        <div className={styles.container}>
          <div className={styles.left}>
            <div className={styles.leftTop}>
              <img src="/images/userIcon.svg" alt="" />
              <div>닉네임</div>
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
          <button className={styles.button1} type="button">
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
