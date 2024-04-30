"use client";

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import characterSelector from "@/recoil/selector/characterSelector";
import styles from "../../styles/chat.module.scss";

function guide() {
  const CHARACTERSTATUS = useRecoilValue(characterSelector);
  const [mobile, setMobile] = useState(false);
  const [number, setNumber] = useState<number>(0);
  const router = useRouter();

  const [imgNum, setImgNum] = useState(9);
  const [charName, setCharName] = useState("");

  const isClient = typeof window === "object";
  const getSize = () => {
    return { width: isClient ? window.innerWidth : undefined };
  };
  const [windowSize, setWindowSize] = useState(getSize);

  const handleCount = () => {
    if (number !== 2) {
      setNumber(number + 1);
    } else {
      router.push("/chat");
    }
  };
  const handelResize = () => {
    setWindowSize(getSize());
  };

  // innerWidth 감지
  useEffect(() => {
    // windowSize.width가 undefined일수도 있기 때문에 조건문에 추가
    if (windowSize.width !== undefined && windowSize.width < 1000) {
      setMobile(true);
    } else {
      setMobile(false);
    }
    window.addEventListener("resize", handelResize);
    return () => window.removeEventListener("resize", handelResize);
  });
  // 캐릭터 id, 이름 변경
  useEffect(() => {
    setImgNum(CHARACTERSTATUS.id);
    setCharName(CHARACTERSTATUS.name);
  }, [CHARACTERSTATUS]);
  return (
    <div role="none" onClick={handleCount} className={styles.main}>
      <div className={styles.black}>
        <div className={styles.container}>
          <div className={styles.box}>
            {number === 0 ? (
              <>
                <div className={styles.message}>
                  <p>
                    {mobile
                      ? "캐릭터 이름을 확인할 수 있어요"
                      : "마음에 드는 답변을 저장할 수 있어요"}
                  </p>
                </div>
                <div className={styles.spring}>
                  <img src="/images/spring.svg" alt="spring" />
                </div>
                <div className={styles.scrap}>
                  <img src="/images/scrap.svg" alt="scrap" />
                </div>
              </>
            ) : null}
            {number === 1 ? (
              <>
                <div className={styles.top}>
                  <img src="/images/arrow.svg" alt="arrow" />
                  <button type="button">펼치기</button>
                </div>
                <div className={styles.spring2}>
                  <img src="/images/spring2.svg" alt="spring2" />
                </div>
                <div className={styles.message2}>
                  <p>
                    {mobile
                      ? "대화 내용을 확인할 수 있어요"
                      : "이전 대화 내용을 볼 수 있어요"}
                  </p>
                </div>
              </>
            ) : null}
            <div className={styles.text}>
              <p>
                안녕 나는 {charName}야. 만나서 반가워. 무슨 고민이 있어서 왔니?
              </p>
            </div>
            {number === 2 ? (
              <>
                <div className={styles.top} />
                <div className={styles.input}>
                  <input type="text" placeholder="내용을 입력해주세요" />
                  {/* <input name="text" value={text} onChange={onInputChange} /> */}
                  <div>
                    <img
                      className={styles.send}
                      src="/images/send.svg"
                      alt="send"
                    />
                  </div>
                </div>
                <div className={styles.spring3}>
                  <img src="/images/spring3.svg" alt="spring3" />
                </div>
                <div className={styles.message3}>
                  <p>
                    {mobile
                      ? "대화를 입력해보세요"
                      : "위아래로 스크롤 해 내용을 볼 수 있어요"}
                  </p>
                </div>
              </>
            ) : null}
          </div>
        </div>
      </div>
      <div className={styles.background}>
        <div className={styles.backdrop}>
          <div className={styles.container}>
            <div className={styles.box}>
              <div className={styles.character}>
                <img src={`/images/character${imgNum}.svg`} alt="character" />
              </div>
              <div className={styles.scrap}>
                <img src="/images/scrap.svg" alt="scrap" />
              </div>
              <div className={styles.name}>
                <p>{charName}</p>
              </div>
              <div className={styles.top2}>
                <img src="/images/arrow.svg" alt="arrow" />
                <button type="button">펼치기</button>
              </div>
              <div className={styles.text}>
                <p>
                  안녕 나는 {charName}야. 만나서 반가워. 무슨 고민이 있어서
                  왔니?
                </p>
              </div>

              <div className={styles.input}>
                <input type="text" placeholder="내용을 입력해주세요" />
                {/* <input name="text" value={text} onChange={onInputChange} /> */}
                <div role="none">
                  <img
                    className={styles.send}
                    src="/images/send.svg"
                    alt="send"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default guide;
