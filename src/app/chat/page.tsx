"use client";

import React, { useEffect, useState, useRef } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useRouter } from "next/navigation";
import characterSelector from "@/recoil/selector/characterSelector";
import styles from "../../styles/chat.module.scss";
import ModalExit from "../../components/ModalExit";
import MODAL from "../../constants/Modal";
import useChat from "@/hooks/useChat";
import chatState from "@/recoil/atom/chat";
import chatSelector from "@/recoil/selector/chatSelector";
import Dots from "@/components/Dots";
import { useDeleteChat } from "@/hooks/useDeleteStorage";

interface JSONDATA {
  id: number;
  text: string;
}

function Chat() {
  const router = useRouter();
  const [text, setText] = useState<string>("");
  const [mobile, setMobile] = useState(false);
  const [message, setMessages] = useState<JSONDATA[]>([]);
  const [open, setOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [imgNum, setImgNum] = useState(9);
  const [charName, setCharName] = useState("");
  const isClient = typeof window === "object";
  const msgBoxRef = useRef(null);
  const getSize = () => {
    return { width: isClient ? window.innerWidth : undefined };
  };
  const [windowSize, setWindowSize] = useState(getSize);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const CHARACTERSTATUS = useRecoilValue(characterSelector);
  const CHAT = useRecoilValue(chatSelector);
  const setChat = useSetRecoilState(chatState);

  const defaultMessage = `안녕 나는 ${charName}야. 만나서 반가워. 무슨 고민이 있어서 왔니?`;
  const { isLoading, data, isFetching, refetch } = useChat(
    CHARACTERSTATUS.id,
    text,
  );

  const ExitClick = () => {
    setModalOpen(!modalOpen);
  };

  const handleOpen = () => {
    console.log("open");
    setOpen(!open);
  };

  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };

  const handelResize = () => {
    setWindowSize(getSize());
  };

  const handlePopState = () => {
    setModalOpen(true);
  };

  useEffect(() => {
    useDeleteChat();
  }, []);
  // useEffect(() => {
  //   scrollToBottom();
  // }, [message]);

  useEffect(() => {
    window.history.pushState(null, "", window.location.href);
    window.addEventListener("popstate", handlePopState);
    return () => {
      window.removeEventListener("popstate", handlePopState);
    };
  }, []);

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

  useEffect(() => {
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
  }, [CHARACTERSTATUS, CHAT, setChat]);

  useEffect(() => {
    if (data && data.data?.answer) {
      setChat((prevChat: JSONDATA[]) => [
        ...prevChat,
        { id: 1, text: data.data.answer },
      ]);
    }
  }, [data, setChat]);

  useEffect(() => {
    setMessages(CHAT);
  }, [CHAT]);

  const sendMsg = () => {
    setChat((prevChat: JSONDATA[]) => [...prevChat, { id: 0, text }]);
    setText("");
    refetch(); // API 요청을 여기서 수행
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
    }
  };

  const activeEnter = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && text !== "") {
      sendMsg();
    }
  };

  const homeClick = () => {
    router.push("/");
  };

  const adjustTextareaHeight = () => {
    if (textareaRef.current) {
      textareaRef.current.style.height = "auto";
      textareaRef.current.style.height = `${
        textareaRef.current.scrollHeight - 20
      }px`;
    }
  };

  useEffect(() => {
    adjustTextareaHeight();
  }, [text]);

  if (isLoading) console.log("로딩중");
  return (
    <div className={styles.main}>
      <div className={styles.finish} role="none" onClick={ExitClick}>
        <img src="/images/x.svg" alt="x" />
      </div>
      {modalOpen && (
        <div className={styles.modalBackground}>
          {CHAT.length === 1 ? (
            <ModalExit
              setModalOpen={setModalOpen}
              text={MODAL.NOCHAT.TEXT}
              button1={MODAL.NOCHAT.BUTTON1}
              button2={MODAL.NOCHAT.BUTTON2}
            />
          ) : (
            <ModalExit
              setModalOpen={setModalOpen}
              text={MODAL.CHAT_EXIT.TEXT}
              button1={MODAL.CHAT_EXIT.BUTTON1}
              button2={MODAL.CHAT_EXIT.BUTTON2}
            />
          )}
        </div>
      )}
      <div className={styles.background}>
        <div className={styles.backdrop}>
          {open ? (
            <div className={styles.container2}>
              <div className={styles.box2}>
                <div className={styles.top} role="none" onClick={handleOpen}>
                  <img src="/images/arrow.svg" alt="arrow" />
                  <p>접기</p>
                </div>
                <div className={styles.msgBox} ref={msgBoxRef}>
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
                  <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={onChange}
                    onKeyUp={activeEnter}
                    onInput={adjustTextareaHeight}
                    placeholder="내용을 입력해주세요"
                    className={styles.textarea}
                  />
                  <div role="none" onClick={sendMsg}>
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
                <div className={styles.prev} onClick={homeClick} role="none">
                  <img src="/images/blackPrev.svg" alt="prev" />
                </div>
                <div className={styles.character}>
                  <img src={`/images/character${imgNum}.svg`} alt="character" />
                </div>
                <div className={styles.scrap}>
                  <img src="/images/scrap.svg" alt="scrap" />
                </div>
                <div className={styles.name}>
                  <p>{charName}</p>
                </div>
                <div className={styles.top} role="none" onClick={handleOpen}>
                  <img src="/images/arrow.svg" alt="arrow" />
                  <p>펼치기</p>
                </div>
                {mobile ? (
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
                    {isLoading || isFetching ? (
                      <div className={styles.msgType2}>
                        <Dots />
                      </div>
                    ) : null}
                  </div>
                ) : (
                  <div className={styles.text}>
                    {isLoading || isFetching ? (
                      <div className={styles.textDots}>
                        <Dots />
                      </div>
                    ) : (
                      <p>
                        {message.length === 0
                          ? defaultMessage
                          : message.findLast(element => element.id === 1)?.text}
                      </p>
                    )}
                  </div>
                )}
                <div className={styles.input}>
                  <textarea
                    ref={textareaRef}
                    value={text}
                    onChange={onChange}
                    onKeyUp={activeEnter}
                    onInput={adjustTextareaHeight}
                    placeholder="내용을 입력해주세요"
                    className={styles.textarea}
                  />
                  <div role="none" className={styles.sendBox}>
                    <img
                      onClick={sendMsg}
                      className={styles.send}
                      src="/images/send.svg"
                      alt="send"
                      role="none"
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

export default Chat;
