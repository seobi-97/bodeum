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

function community() {
  const { isLoading, data } = useCommunity();
  console.log(data);
  const BOARD = useRecoilValue(communitySelector);
  console.log(BOARD);
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
  // 조회수 조회
  const { GetView, GetRefetch } = useGetViews(boardId);
  console.log(views, GetView);
  // 조회수 증가
  const { PostRefetch } = usePostViews(boardId);
  const [mobile, setMobile] = useState(false);
  const isClient = typeof window === "object";
  const getSize = () => {
    return { width: isClient ? window.innerWidth : undefined };
  };
  const [windowSize, setWindowSize] = useState(getSize);
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

  useEffect(() => {
    setTime(useGetTime());
  });
  useEffect(() => {
    if (BOARD) {
      setBoard(BOARD);
      console.log(BOARD);
    }
  }, [BOARD]); // 의존성 배열에 BOARD.data 추가
  useEffect(() => {
    if (boardID) {
      setId(boardID);
      const image = BOARD.filter(
        (val: GetCommunity) => val.chatId === parseInt(boardID, 10),
      );
      console.log("Board", BOARD, boardID);
      console.log("image", image);
      setImageURL(image[0].imageURL);
    }
  }, [boardID]);
  useEffect(() => {
    if (GetView) {
      console.log(GetView.data.views);
      setViews(GetView.data.views);
    }
  }, [GetView]);

  const handleToast = () => {
    setToast(true);
    setTimeout(() => {
      setToast(false);
    }, 1000);
  };
  const handleOpen = (chatId: string) => {
    setOpen(open === chatId ? null : chatId);
  };
  const openPopup = (id: number) => {
    console.log("id", id);
    setModalOpen(true);
    setId(id);
    setBoardDetail(id);
    PostRefetch();
    GetRefetch();
  };
  const closePopup = () => {
    setModalOpen(false);
    setBoardDetail("");
  };
  useEffect(() => {
    GetRefetch();
  }, [boardId]);
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
        {mobile ? (
          <Header community modal={false} />
        ) : (
          <Header community modal={false} />
        )}
        {/* <div className={styles.search}>
          <input placeholder="검색어를 입력하세요." />
        </div> */}
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

export default community;
