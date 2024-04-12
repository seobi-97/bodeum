"use client";

import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import characterSelector from "@/recoil/selector/characterSelector";
import styles from "../../styles/chat.module.scss";
import ModalExit from "../../components/ModalExit";
import MODAL from "../../constants/Modal";
import useChat from "@/hooks/useChat";
import chatState from "@/recoil/atom/chat";
import chatSelector from "@/recoil/selector/chatSelector";
import Dots from "@/components/Dots";

interface JSONDATA {
  id: number;
  text: string;
}
function chat() {
  const [text, setText] = useState<string>("");
  const [message, setMessages] = useState<JSONDATA[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [imgNum, setImgNum] = useState(9);
  const [charName, setCharName] = useState("");

  // 선택한 캐릭터의 정보(id)
  const CHARACTERSTATUS = useRecoilValue(characterSelector);
  const CHAT = useRecoilValue(chatSelector);

  // 현재 recoil에 저장된 채팅 내용
  const setChat = useSetRecoilState(chatState);

  // 화면 진입 시, 인트로 대화
  const defaultMessage = `안녕 나는 ${charName}야. 만나서 반가워. 무슨 고민이 있어서 왔니?`;
  // api 통신
  const { isLoading, data, isFetching, refetch } = useChat(
    CHARACTERSTATUS.id,
    text,
  );
  // x 아이콘 클릭 시 모달 open
  const ExitClick = () => {
    setModalOpen(!modalOpen);
  };

  // 채팅창 펼치기
  const handleOpen = () => {
    console.log("open");
    setOpen(!open);
  };
  // 채팅 글쓰기
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  useEffect(() => {
    // recoil값을 그대로 쓰면, 해당 값이 서버와 클라이언트가 다르다는 오류가 발생한다.
    // 따라서 useState, useEffect로 핸들링 해준다.
    if (CHARACTERSTATUS) {
      setImgNum(CHARACTERSTATUS.id);
      setCharName(CHARACTERSTATUS.name);
      if (CHAT.length === 0) {
        setChat([
          {
            id: 1,
            text: `안녕 나는 ${CHARACTERSTATUS.name}야. 만나서 반가워. 무슨 고민이 있어서 왔니?`,
          },
        ]);
      }
    }
    // Chat gpt 답변이 있으면
    if (data !== undefined) {
      console.log(data);
      setChat([...CHAT, { id: 1, text: data.data?.answer }]);
    }
    // 첫 화면에서 charName을 가져오고 -> recoil에 defaultMessage 저장
    // 해당 메세지를 띄우고, 답변을 받으면 다시 업데이트
  }, [data, CHARACTERSTATUS]);
  useEffect(() => {
    setMessages(CHAT);
  }, [CHAT]);

  const sendMsg = () => {
    setChat([...CHAT, { id: 0, text }]);
    setText("");
    refetch();
  };
  const activeEnter = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && text !== "") {
      sendMsg();
    }
  };
  if (isLoading) console.log("로딩중");
  return (
    <div>
      <div className={styles.finish} role="none" onClick={ExitClick}>
        <img src="/images/x.svg" alt="x" />
      </div>
      {modalOpen && (
        <div className={styles.modalBackground}>
          <ModalExit
            setModalOpen={setModalOpen}
            text={MODAL.CHAT_EXIT.TEXT}
            button1={MODAL.CHAT_EXIT.BUTTON1}
            button2={MODAL.CHAT_EXIT.BUTTON2}
          />
        </div>
      )}
      <div className={styles.background}>
        <div className={styles.backdrop}>
          {open ? (
            <div className={styles.container2}>
              <div className={styles.box2}>
                <div
                  className={styles.top}
                  role="none"
                  onClick={() => {
                    handleOpen();
                  }}
                >
                  <img src="/images/arrow.svg" alt="arrow" />
                  <p>접기</p>
                </div>
                <div className={styles.msgBox}>
                  {message?.map((msg: JSONDATA, idx: number) => (
                    <div key={idx}>
                      {msg.id === 1 ? (
                        <div className={styles.msgType0}>
                          <span>{msg.text}</span>
                        </div>
                      ) : (
                        <div className={styles.msgType1}>
                          <span>{msg.text}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <div className={styles.input}>
                  <input
                    type="text"
                    value={text}
                    onChange={onChange}
                    onKeyUp={activeEnter}
                    placeholder="내용을 입력해주세요"
                  />
                  {/* <input name="text" value={text} onChange={onInputChange} /> */}
                  <div
                    role="none"
                    onClick={() => {
                      sendMsg();
                    }}
                  >
                    <img
                      className={styles.send}
                      src="/images/send.svg"
                      alt="send"
                    />
                  </div>
                </div>
              </div>
            </div>
          ) : (
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
                <div
                  className={styles.top}
                  role="none"
                  onClick={() => {
                    handleOpen();
                  }}
                >
                  <img src="/images/arrow.svg" alt="arrow" />
                  <p>펼치기</p>
                </div>
                <div className={styles.text}>
                  {isLoading || isFetching ? (
                    <Dots />
                  ) : (
                    <p>
                      {message.length === 0
                        ? defaultMessage
                        : message.findLast(element => element.id === 1)?.text}
                    </p>
                  )}
                </div>
                <div className={styles.input}>
                  <input
                    type="text"
                    value={text}
                    onChange={onChange}
                    onKeyUp={activeEnter}
                    placeholder="내용을 입력해주세요"
                  />
                  {/* <input name="text" value={text} onChange={onInputChange} /> */}
                  <div
                    role="none"
                    onClick={() => {
                      sendMsg();
                    }}
                  >
                    <img
                      className={styles.send}
                      src="/images/send.svg"
                      alt="send"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default chat;
