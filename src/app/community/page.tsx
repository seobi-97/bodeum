"use client";

import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import Skeleton from "../../components/skeleton";
import styles from "../../styles/community.module.scss";
import useCommunity from "@/hooks/useCommunity";
import { GetCommunity } from "@/types/community";
import communitySelector from "@/recoil/selector/communitySelector";
import useGetTime from "@/hooks/useGetTime";
import useDiff from "@/hooks/useDiff";
import LinkComponents from "@/components/Link";
import BoardDetail from "@/components/board";
import boardDetailState from "@/recoil/atom/boardDetailAtom";
import Header from "@/components/header";
import Toast from "@/components/toast";
import boardDetailSelector from "@/recoil/selector/boardDetailSelector";
import { useGetViews, usePostViews } from "@/hooks/useViews";

function Community() {
  const { isLoading, data } = useCommunity();
  const BOARD = useRecoilValue(communitySelector);
  const [board, setBoard] = useState([]);
  const [time, setTime] = useState<string>();
  const [open, setOpen] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [toast, setToast] = useState<boolean>(false);
  const [imageURL, setImageURL] = useState("");
  const setBoardDetail = useSetRecoilState(boardDetailState);

  const boardID = useRecoilValue(boardDetailSelector);
  const [boardId, setId] = useState(boardID);
  const [views, setViews] = useState(0);

  const { GetView, GetRefetch } = useGetViews(boardId);
  const { PostRefetch } = usePostViews(boardId);

  const [mobile, setMobile] = useState(false);
  console.log(mobile);
  const isClient = typeof window === "object";
  const getSize = () => {
    return { width: isClient ? window.innerWidth : undefined };
  };
  const [windowSize, setWindowSize] = useState(getSize);
  const handelResize = () => {
    setWindowSize(getSize());
  };

  useEffect(() => {
    if (windowSize.width !== undefined && windowSize.width < 1000) {
      setMobile(true);
    } else {
      setMobile(false);
    }
    window.addEventListener("resize", handelResize);
    return () => window.removeEventListener("resize", handelResize);
  });

  useEffect(() => {
    setTime(useGetTime());
  });

  useEffect(() => {
    if (BOARD) {
      setBoard(BOARD);
    }
  }, [BOARD, data]);

  useEffect(() => {
    if (boardID) {
      setId(boardID);
      const image = BOARD.filter(
        (val: GetCommunity) => val.chatId === parseInt(boardID, 10),
      );
      if (image.length > 0) setImageURL(image[0].imageURL);
    }
  }, [boardID]);

  const handleToast = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 1000);
  };

  const handleOpen = (chatId: string) => {
    setOpen(open === chatId ? null : chatId);
  };

  const openPopup = async (id: number) => {
    setModalOpen(true);
    setId(id);
    setBoardDetail(id);

    // 조회수 증가 및 갱신된 조회수 가져오기
    await PostRefetch();
    await GetRefetch();
  };

  useEffect(() => {
    if (GetView && GetView.data) {
      setViews(GetView.data.views);
    }
  }, [GetView]);

  const closePopup = () => {
    setModalOpen(false);
    setBoardDetail("");
  };

  return (
    <div className={styles.background}>
      {toast && <Toast text="링크를 클립보드에 복사했습니다." />}
      {modalOpen && GetView ? (
        <BoardDetail
          params={boardID}
          imageURL={imageURL}
          views={views}
          closePopup={closePopup}
          dots
        />
      ) : null}
      <div className={styles.container}>
        <Header community modal={false} />
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
                      role="none"
                      key={val.chatId}
                      className={styles.box}
                      id={`board_${val.chatId}`}
                    >
                      <div className={styles.top}>
                        <img
                          src={val.imageURL || "/images/userIcon.svg"}
                          className={styles.boardImage}
                          alt="userIcon"
                        />
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
                      <div
                        className={styles.answerBox}
                        onClick={() => openPopup(val.chatId)}
                        role="none"
                      >
                        <p>{val.answer}</p>
                      </div>
                      {open === String(val.chatId) && (
                        <LinkComponents
                          handleOpen={handleOpen}
                          chatId={val.chatId}
                          userId={val.userId}
                          handleToast={handleToast}
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

export default Community;
