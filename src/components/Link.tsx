import React from "react";
import { useRecoilValue } from "recoil";
import { usePathname } from "next/navigation";
import styles from "../styles/link.module.scss";
import userSelector from "@/recoil/selector/userSelector";

interface Type {
  handleOpen: (chatId: string) => void;
  chatId: number;
  userId: number;
}
function Link({ handleOpen, chatId, userId }: Type) {
  const id = useRecoilValue(userSelector).userId;
  const router = usePathname();
  const baseUrl = "http://localhost:3000";
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      alert("클립보드에 링크가 복사되었어요.");
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div className={styles.box}>
      {id === userId ? (
        <>
          <div>삭제하기</div>
          <div className={styles.line} />
        </>
      ) : null}
      <div
        className={styles.copy}
        onClick={() => handleCopyClipBoard(`${baseUrl}${router}`)}
        role="none"
      >
        링크복사
      </div>
      <div className={styles.line} />
      <div
        className={styles.close}
        onClick={() => handleOpen(String(chatId))}
        role="none"
      >
        취소
      </div>
    </div>
  );
}

export default Link;
