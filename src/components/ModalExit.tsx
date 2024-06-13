import React from "react";
import { useRouter } from "next/navigation";
import styles from "../styles/ModalChatExit.module.scss";

interface ModalChatProps {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  text: Array<string>;
  button1: string;
  button2: string;
}
function ModalExit({ setModalOpen, text, button1, button2 }: ModalChatProps) {
  const router = useRouter();
  const onSetModal = () => {
    setModalOpen(false);
  };
  const onNavigate = () => {
    if (button2 === "끝내기") {
      router.push("/chatShare");
    } else if (button2 === "홈" || button2 === "종료하기") {
      router.push("/");
    } else if (button2 === "공유하기") {
      router.push("/write");
    } else if (button2 === "뒤로가기") {
      router.push("/chatShare");
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.text}>
        {text.map((val, index) => (
          <p key={index}>{val}</p>
        ))}
      </div>
      <div className={styles.buttonWrap}>
        {button1.length !== 0 ? (
          <button className={styles.button1} type="button" onClick={onSetModal}>
            {button1}
          </button>
        ) : null}
        {button2.length !== 0 ? (
          <button className={styles.button2} type="button" onClick={onNavigate}>
            {button2}
          </button>
        ) : null}
      </div>
    </div>
  );
}

export default ModalExit;
