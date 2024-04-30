"use client";

import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import Skeleton from "../../components/skeleton";
import styles from "../../styles/community.module.scss";
import useCommunity from "@/hooks/useCommunity";
import { GetCommunity } from "@/types/community";
import communitySelector from "@/recoil/selector/communitySelector";
import useGetTime from "@/hooks/useGetTime";
import useDiff from "@/hooks/useDiff";
import LinkComponents from "@/components/Link";
import chatState from "@/recoil/atom/chat";

function community() {
  const { isLoading, data } = useCommunity();
  console.log(data);
  const BOARD = useRecoilValue(communitySelector);
  console.log(BOARD);
  const [board, setBoard] = useState([]);
  const [time, setTime] = useState<string>();
  const [open, setOpen] = useState<string | null>(null);
  const CHAT = useRecoilValue(chatState);
  console.log(CHAT);
  const router = useRouter();
  useEffect(() => {
    setTime(useGetTime());
  });
  useEffect(() => {
    if (BOARD) {
      setBoard(BOARD);
      console.log(BOARD);
    }
  }, [BOARD]); // 의존성 배열에 BOARD.data 추가

  const handleOpen = (chatId: string) => {
    setOpen(open === chatId ? null : chatId);
  };
  const prevButton = () => {
    if (CHAT.length > 1) router.push("/chatShare");
    else router.push("/");
  };
  const homeButton = () => {
    router.push("/");
  };
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img
            src="/images/blackPrev.svg"
            alt="prev"
            onClick={prevButton}
            role="none"
          />
          <h1>Bodeum 게시판</h1>
          <div className={styles.homeIcon} onClick={homeButton} role="none">
            <img src="/images/bodeumIcon.svg" alt="bodeumIcon" />
          </div>
        </div>
        <div className={styles.search}>
          <input placeholder="검색어를 입력하세요." />
        </div>
        <div className={styles.board}>
          {isLoading ? (
            <>
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
              <Skeleton />
            </>
          ) : (
            <>
              {board
                .slice(0)
                .reverse()
                .map((val: GetCommunity) => {
                  return (
                    <div
                      key={val.chatId}
                      className={styles.box}
                      id={`board_${val.chatId}`}
                    >
                      <div className={styles.top}>
                        <img src="/images/userIcon.svg" alt="userIcon" />
                        <div className={styles.topRight}>
                          <div className={styles.nickName}>{val.nickname}</div>
                          <div className={styles.date}>
                            {time
                              ? useDiff(time, val.dateTime) < 60
                                ? `${String(useDiff(time, val.dateTime))}분전`
                                : useDiff(time, val.dateTime) < 3600
                                ? `${Math.floor(
                                    useDiff(time, val.dateTime) / 60,
                                  )}시간전`
                                : useDiff(time, val.dateTime) < 3600 * 24
                                ? `${Math.floor(
                                    useDiff(time, val.dateTime) / 60 / 24,
                                  )}일전`
                                : ""
                              : null}
                          </div>
                        </div>
                        <div
                          className={styles.dots}
                          onClick={() => handleOpen(String(val.chatId))}
                          role="none"
                        >
                          <img src="/images/threeDots.svg" alt="threeDots" />
                        </div>
                      </div>

                      <div className={styles.commentBox}>{val.comment}</div>
                      <div className={styles.answerBox}>
                        <p>{val.answer}</p>
                      </div>
                      {open === String(val.chatId) && (
                        <LinkComponents
                          handleOpen={handleOpen}
                          chatId={val.chatId}
                          userId={val.userId}
                        />
                      )}
                    </div>
                  );
                })}
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default community;
