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

// 캐릭터 임시 데이터
// 이미지 경로만 하드코딩 이용
const CHARACTER = [
  {
    id: 9,
    name: "토비",
    src: "/images/ch_tobi.png",
    info: "따뜻한 마음을 지닌 활발한 토비 당신에게 즐거운 웃음과 감동을 전해 밝게 비춰드릴게요",
  },
  {
    id: 10,
    name: "마이로",
    src: "/images/ch_myro.png",
    info: "이성적이면서 현실적인 판단을 당신에게 전달해드릴 똑똑한 조언자 마이로에요",
  },
  {
    id: 11,
    name: "루미나",
    src: "/images/ch_rumina.png",
    info: "감성적이고 창의적인 루미나 당신이 예상치 못한 답변으로 감동을 전달해드릴게요",
  },
  {
    id: 12,
    name: "블리",
    src: "/images/ch_bly.png",
    info: "누구에게나 사랑을 전달하며 온 세상을 따뜻하게 만드는 블리 당신에게 희망을 드릴게요",
  },
];

function MyPage() {
  const { isLoading, data } = useCommunity();
  console.log(data);
  const BOARD = useRecoilValue(communitySelector);
  const router = useRouter();
  const USER = useRecoilValue(userSelector);
  const [nickname, setNickname] = useState<string>("");
  const [userId, setUserId] = useState<number>(-1);
  const [active, setActive] = useState(0);
  const [board, setBoard] = useState([]);
  const [open, setOpen] = useState<string | null>(null);

  const [total, setTotal] = useState<number[]>([0, 0, 0, 0]);
  const [sortCharacter, setSortCharacter] = useState<CharacterData[]>([]);
  useEffect(() => {
    if (USER) {
      setNickname(USER.nickName);
      setUserId(USER.userId);
    }
  }, [USER]);

  // board의 fluffyName으로 카운트
  const countFluffy = () => {
    const count = [0, 0, 0, 0];
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
    if (BOARD) {
      setBoard(BOARD);
      countFluffy();
    }
  }, [BOARD]);

  const prevButton = () => {
    router.push("/");
  };
  const homeButton = () => {
    router.push("/");
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
    combined.sort((a, b) => b.count - a.count);
    setSortCharacter(combined);
  };
  const handleOpen = (chatId: string) => {
    setOpen(open === chatId ? null : chatId);
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
        <div className={styles.user}>
          <div className={styles.imgBox} onClick={editButton} role="none">
            <img src="/images/gear.svg" alt="gear" />
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
                    if (userId === val.userId) {
                      return (
                        <div
                          key={val.chatId}
                          className={styles.box}
                          id={`board_${val.chatId}`}
                        >
                          <div className={styles.top}>
                            <img src="/images/userIcon.svg" alt="userIcon" />
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
                              <img
                                src="/images/threeDots.svg"
                                alt="threeDots"
                              />
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
                    }
                    return null;
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
