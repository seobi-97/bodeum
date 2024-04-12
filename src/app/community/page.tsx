"use client";

import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import Skeleton from "../../components/skeleton";
import styles from "../../styles/community.module.scss";
import useCommunity from "@/hooks/useCommunity";
import { GetCommunity } from "@/types/community";
import communitySelector from "@/recoil/selector/communitySelector";

function community() {
  const { isLoading, data } = useCommunity();
  console.log(data);
  const BOARD = useRecoilValue(communitySelector);
  console.log(BOARD);
  const [board, setBoard] = useState([]);
  useEffect(() => {
    if (BOARD) {
      setBoard(BOARD);
      console.log(BOARD);
    }
  }, [BOARD]); // 의존성 배열에 BOARD.data 추가
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <div className={styles.header}>
          <img src="/images/blackPrev.svg" alt="prev" />
          <h1>Bodeum 게시판</h1>
          <div>
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
              {board.map((val: GetCommunity) => {
                return (
                  <div key={val.chatId} className={styles.box}>
                    <img src="/images/userIcon.svg" alt="" />
                    <div>{val.nickname}</div>
                    <div>{val.dateTime}</div>
                    <div>{val.comment}</div>
                    <div>{val.answer}</div>
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
