import React from "react";
import { useRecoilValue } from "recoil";
import styles from "../styles/link.module.scss";
import userSelector from "@/recoil/selector/userSelector";
import useDelete from "@/hooks/useDelete";

interface Type {
  handleOpen: (chatId: string) => void;
  chatId: number;
  userId: number;
  handleToast: () => void;
}
function Link({ handleOpen, chatId, userId, handleToast }: Type) {
  const id = useRecoilValue(userSelector).userId;
  // const baseUrl = "http://localhost:3000";
  const baseUrl = "https://bodeum.vercel.app";
  const { refetch } = useDelete(chatId);
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      handleToast();
    } catch (e) {
      console.log(e);
    }
  };
  const deleteButton = () => {
    refetch();
    // window.location.replace("/community");
    window.location.reload();
  };
  return (
    <div className={styles.box}>
      {id === userId ? (
        <>
          <div role="none" className={styles.delete} onClick={deleteButton}>
            삭제하기
          </div>
          <div className={styles.line} />
        </>
      ) : null}
      <div
        className={styles.copy}
        onClick={() =>
          handleCopyClipBoard(`${baseUrl}/communityShare?id=${chatId}`)
        }
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
