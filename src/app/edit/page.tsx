"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import userSelector from "@/recoil/selector/userSelector";
import styles from "../../styles/edit.module.scss";
import useTotal from "@/hooks/useTotal";
import userTotalSelector from "@/recoil/selector/userTotalSelector";
import Favorite from "@/components/Favorite";
import useEdit from "@/hooks/useEdit";
import Loading from "@/components/loading";
import Header from "@/components/header";
import Toast from "@/components/toast";

function Edit() {
  const USER = useRecoilValue(userSelector);
  const { data, refetch2 } = useTotal(USER.userId);
  const [showToast, setShowToast] = useState<boolean>(false);
  console.log(data);
  const USERDATA = useRecoilValue(userTotalSelector);

  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState([]);
  const [userImage, setUserImage] = useState("");
  const [favoriteFluffyName, setFluffy] = useState<string>("");
  const [editActive, setEditActive] = useState<boolean>(false);
  const [charNum, setCharNum] = useState<number>(-1);
  const [text, setText] = useState<string>("");
  const [fluffyName, setFluffyname] = useState("");
  const { isLoading, isFetching, data2, refetch } = useEdit(USER.userId, {
    nickname: text,
    favoriteFluffyName: fluffyName,
  });

  const router = useRouter();

  useEffect(() => {
    if (USER) {
      setUserImage(USER.imageURL);
    }
  }, [USER]);
  useEffect(() => {
    if (USERDATA) {
      setEmail(USERDATA.email);
      setNickname(USERDATA.nickname);
      setFluffy(USERDATA.favoriteFluffyName);
    }
  }, [USERDATA]);
  useEffect(() => {
    if (charNum === 0) {
      setFluffyname("토비");
    } else if (charNum === 1) {
      setFluffyname("마이로");
    } else if (charNum === 2) {
      setFluffyname("루미나");
    } else if (charNum === 3) {
      setFluffyname("블리");
    }
  }, [charNum]);
  useEffect(() => {
    refetch2();
  }, []);
  useEffect(() => {
    if (data2 !== undefined) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        window.location.replace("/edit");
      }, 1000);
    }
  }, [data2]);

  useEffect(() => {
    if (data2 !== undefined) {
      setShowToast(true);
      const timeout = setTimeout(() => {
        setShowToast(false);
        window.location.replace("/edit");
      }, 1000);
      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [data2]);

  // 글쓰기
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  // 수정하기 활성화
  const editButton = () => {
    setEditActive(true);
  };
  // 수정한 내용 저장하기
  const saveButton = () => {
    refetch();
  };
  const selectChar = (num: number) => {
    setCharNum(num);
  };
  const resignButton = () => {
    router.push("/resign");
  };
  const prevButton = () => {
    router.push("/mypage");
  };
  if (isLoading || isFetching) <Loading />;
  return (
    <div className={styles.background}>
      {showToast && <Toast text="회원정보가 수정되었습니다." />}
      <div className={styles.container}>
        <Header community={false} modal={false} />
        <div className={styles.content}>
          <div className={styles.user}>
            <div className={styles.imgBox} role="none">
              <img className={styles.preView} src={userImage} alt="img" />
            </div>
            <p>{nickname}</p>
          </div>
          <div className={styles.userBox}>
            <div>
              <span>이메일 </span>
              <span>*</span>
              <div className={styles.whiteBox}>
                <img
                  className={styles.kakao}
                  src="/images/kakaocircle.svg"
                  alt="kakao"
                />
                {email}
              </div>
            </div>
            <div>
              <span>닉네임 </span>
              <span>*</span>
              <div className={styles.whiteBox}>
                {editActive ? (
                  <input
                    type="text"
                    value={text}
                    onChange={onChange}
                    placeholder={nickname}
                  />
                ) : (
                  nickname
                )}
              </div>
            </div>
            <div>
              <span>좋아하는 플러피 </span>
              <span>*</span>
              {/* 수정모드일 때 4개의 캐릭터중 선택 */}
              {editActive ? (
                <Favorite active={charNum} selectChar={selectChar} />
              ) : (
                <div className={styles.whiteBox}>
                  {favoriteFluffyName || ""}
                </div>
              )}
            </div>
          </div>
          <div className={styles.buttonWrap}>
            <button
              className={styles.button2}
              type="button"
              onClick={prevButton}
            >
              취소하기
            </button>
            {editActive ? (
              <button
                className={styles.button1}
                type="button"
                onClick={saveButton}
              >
                저장하기
              </button>
            ) : (
              <button
                className={styles.button1}
                type="button"
                onClick={editButton}
              >
                수정하기
              </button>
            )}
          </div>
          <button type="button" onClick={resignButton}>
            회원탈퇴
          </button>
        </div>
      </div>
    </div>
  );
}

export default Edit;
