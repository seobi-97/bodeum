"use client";

import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import useCommunity from "@/hooks/useCommunity";
import styles from "../../styles/community.module.scss";
import userSelector from "@/recoil/selector/userSelector";
import communitySelector from "@/recoil/selector/communitySelector";
import { GetCommunity } from "@/types/community";
import Skeleton from "../../components/skeleton";
import LinkComponents from "@/components/Link";
import { CharacterData } from "@/types/characters";
import Header from "@/components/header";
import { useDeleteAll } from "@/hooks/useDeleteStorage";
import CHARACTER from "@/data/Character";
import Toast from "@/components/toast";

function MyPage() {
  const { isLoading, data } = useCommunity();
  console.log(data);
  const USER = useRecoilValue(userSelector);
  const BOARD = useRecoilValue(communitySelector);
  const router = useRouter();

  const [nickname, setNickname] = useState<string>("");
  const [userId, setUserId] = useState<number>(-1);
  const [userImage, setUserImage] = useState("");
  const [active, setActive] = useState(0);
  const [board, setBoard] = useState([]);
  const [open, setOpen] = useState<string | null>(null);

  const [total, setTotal] = useState<number[]>([0, 0, 0, 0]);
  const [sortCharacter, setSortCharacter] = useState<CharacterData[]>([]);
  const [toast, setToast] = useState<boolean>(false);
  useEffect(() => {
    if (USER) {
      setNickname(USER.nickName);
      setUserId(USER.userId);
      setUserImage(USER.imageURL);
    }
  }, [USER]);

  // board의 fluffyName으로 카운트
  const countFluffy = () => {
    const count = [0, 0, 0, 0];
    console.log(board);
    board.forEach((val: GetCommunity) => {
      if (val.fluffyName === "토비") {
        count[0] += 1;
      } else if (val.fluffyName === "마이로") {
        count[1] += 1;
      } else if (val.fluffyName === "루미나") {
        count[2] += 1;
      } else if (val.fluffyName === "블리") {
        count[3] += 1;
      }
    });

    setTotal(count);
  };
  useEffect(() => {
    if (data) {
      const filterBoard = BOARD.filter(
        (val: GetCommunity) => val.userId === userId,
      );
      console.log("filterBoard", filterBoard);
      setBoard(filterBoard);
    }
  }, [data]);
  useEffect(() => {
    countFluffy();
  }, [board]);
  // 모든 스토리지 정보 삭제
  const Logout = () => {
    useDeleteAll();
    window.location.replace("/");
  };
  const editButton = () => {
    router.push("/edit");
  };
  const handleActive = (num: number) => {
    setActive(num);
  };

  // 캐릭터 정렬
  const sortFluffy = () => {
    const combined = CHARACTER.map((item, index) => ({
      ...item,
      count: total[index],
    }));
    console.log(combined);
    combined.sort((a, b) => b.count - a.count);
    setSortCharacter(combined);
  };
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
    <div className={styles.background}>
      {toast && <Toast text="링크를 클립보드에 복사했습니다." />}
      <div className={styles.container}>
        <Header community={false} modal={false} />
        <div className={styles.logout} onClick={Logout} role="none">
          <img
            className={styles.logoutImage}
            src="/images/logout.svg"
            alt="logout"
          />
          <p>로그아웃</p>
        </div>
        <div className={styles.user}>
          <div className={styles.imgBox} onClick={editButton} role="none">
            <img className={styles.userImage} src={userImage} alt="userImage" />
            <img className={styles.gear} src="/images/gear.svg" alt="gear" />
          </div>
          <p>{nickname}</p>
        </div>
        <div className={styles.favor}>
          <ul>
            <li
              role="none"
              onClick={() => handleActive(0)}
              className={active === 0 ? styles.active : ""}
            >
              내가 쓴 글
            </li>
            <li
              role="none"
              onClick={() => {
                handleActive(1);
                sortFluffy();
              }}
              className={active === 1 ? styles.active : ""}
            >
              가장 많이 공유한 플러피
            </li>
          </ul>
          {active === 0 ? (
            <div className={styles.userBoard}>
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
                board
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
                          <img
                            src={val.imageURL || "/images/userIcon.svg"}
                            alt="userIcon"
                            className={styles.boardImage}
                          />
                          <div className={styles.topRight}>
                            <div className={styles.nickName}>
                              {val.nickname}
                            </div>
                            <div className={styles.date}>{val.dateTime}</div>
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
                            handleToast={handleToast}
                          />
                        )}
                      </div>
                    );
                  })
              )}
            </div>
          ) : (
            <div className={styles.fluffyContainer}>
              {sortCharacter.map((val, index) => {
                return (
                  <div className={styles.fluffyBox} key={index}>
                    <p>{val.name}</p>
                    <img src={val.src} alt="char" />
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default MyPage;
