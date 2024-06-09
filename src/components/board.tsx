import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { GetCommunity } from "@/types/community";
import communityState from "@/recoil/atom/communityAtom";
import boardDetailState from "@/recoil/atom/boardDetailAtom";
import styles from "../styles/community.module.scss";
import LinkComponents from "@/components/Link";
import Toast from "./toast";

interface Props {
  params: string;
  views: number;
  imageURL: string;
  dots: boolean;
  closePopup: () => void;
}

function BoardDetail({ params, views, imageURL, dots, closePopup }: Props) {
  const BOARD = useRecoilValue(communityState);
  const BOARDID = useRecoilValue(boardDetailState);
  console.log(params);
  console.log("imageURL", imageURL);
  const BOARDDETAIL = BOARD.filter(
    (val: GetCommunity) => val.chatId === parseInt(params, 10),
  );
  console.log(BOARD, BOARDID, BOARDDETAIL);
  const [board, setBoard] = useState([
    {
      nickname: "",
      comment: "",
      dateTime: "",
      answer: "",
      fluffyName: "",
      userId: 0,
    },
  ]);

  console.log(board);
  const [open, setOpen] = useState<string | null>(null);
  const [toast, setToast] = useState<boolean>(false);
  useEffect(() => {
    setBoard(BOARDDETAIL);
  }, [BOARDID]);

  const handleOpen = (chatId: string) => {
    setOpen(open === chatId ? null : chatId);
  };
  const handleToast = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 1000);
  };
  return (
    board.length > 0 && (
      <div className={styles.modalContainer}>
        {toast && <Toast text="링크를 클립보드에 복사했습니다." />}
        <div className={styles.modalBox}>
          <div className={styles.finish} role="none" onClick={closePopup}>
            <img src="/images/x.svg" alt="x" />
          </div>
          <div className={styles.top}>
            <div className={styles.left}>
              <img
                src={imageURL || "/images/userIcon.svg"}
                className={styles.boardImage}
                alt="userIcon"
              />
              <div className={styles.nickName}>{board[0].nickname}</div>
              <div className={styles.date}>{board[0].dateTime}</div>
            </div>
            {dots === true && (
              <div
                className={styles.dots}
                onClick={() => handleOpen(String(BOARDID))}
                role="none"
              >
                <img src="/images/threeDots.svg" alt="threeDots" />
              </div>
            )}
          </div>
          <div className={styles.views}>조회수 {views}</div>
          <div className={styles.commentBox}>{board[0].comment}</div>
          <div className={styles.whiteBox}>
            <img className={styles.bg} src="/images/main_bg.png" alt="bg" />
            <p>{board[0].answer}</p>
            {board[0].fluffyName === "토비" ? (
              <img
                className={styles.character}
                src="/images/ch_tobi.png"
                alt="character"
              />
            ) : board[0].fluffyName === "마이로" ? (
              <img
                className={styles.character}
                src="/images/ch_myro.png"
                alt="character"
              />
            ) : board[0].fluffyName === "루미나" ? (
              <img
                className={styles.character}
                src="/images/ch_rumina.png"
                alt="character"
              />
            ) : board[0].fluffyName === "블리" ? (
              <img
                className={styles.character}
                src="/images/ch_bly.png"
                alt="character"
              />
            ) : null}
          </div>
          {open === String(BOARDID) && (
            <LinkComponents
              handleOpen={handleOpen}
              chatId={BOARDID}
              userId={BOARD[0].userId}
              handleToast={handleToast}
            />
          )}
        </div>
      </div>
    )
  );
}

export default BoardDetail;
