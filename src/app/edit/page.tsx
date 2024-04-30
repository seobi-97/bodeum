"use client";

import { useCallback, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import userSelector from "@/recoil/selector/userSelector";
import styles from "../../styles/edit.module.scss";
import useTotal from "@/hooks/useTotal";
import userTotalSelector from "@/recoil/selector/userTotalSelector";
import Favorite from "@/components/Favorite";

function Edit() {
  const [files, setFiles] = useState<File | null>();
  const USER = useRecoilValue(userSelector);
  const { data } = useTotal(USER.userId);
  console.log(data);
  const USERDATA = useRecoilValue(userTotalSelector);

  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState([]);
  const [fluffy, setFluffy] = useState<string | null>("");
  const [editActive, setEditActive] = useState<boolean>(false);
  const [charNum, setCharNum] = useState<number>(-1);
  const [text, setText] = useState<string>("");

  const [uploadImgUrl, setUploadImgUrl] = useState<string>("");
  const router = useRouter();
  useEffect(() => {
    const fileRead = new FileReader();
    if (files) {
      fileRead.readAsDataURL(files);
      fileRead.onloadend = () => {
        setUploadImgUrl(String(fileRead.result));
      };
    }
  }, [files]);
  useEffect(() => {
    if (USER) {
      setNickname(USER.nickName);
    }
  }, [USER]);
  useEffect(() => {
    if (USERDATA) {
      setEmail(USERDATA.email);
      setFluffy(USERDATA.favoriteFluffyName);
    }
  }, [USERDATA]);
  // 모든 스토리지 정보 삭제
  const Logout = () => {
    window.localStorage.removeItem("loginState");
    window.sessionStorage.removeItem("chat");
    window.sessionStorage.removeItem("chatShare");
    window.sessionStorage.removeItem("character");
    router.push("/");
  };
  const onUploadImage = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      if (!e.target.files) {
        return 0;
      }
      setFiles(e.target.files[0]);

      return e.target.files[0].name;
    },
    [],
  );
  // 글쓰기
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const editButton = () => {
    setEditActive(true);
  };
  const selectChar = (num: number) => {
    setCharNum(num);
  };
  const prevButton = () => {
    router.push("/");
  };
  const homeButton = () => {
    router.push("/");
  };
  const resignButton = () => {
    router.push("/resign");
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
        <div className={styles.content}>
          <div className={styles.user}>
            <div className={styles.imgBox} role="none">
              {uploadImgUrl !== "" ? (
                <img className={styles.preView} src={uploadImgUrl} alt="img" />
              ) : null}
              <label htmlFor="file">
                <input
                  type="file"
                  id="file"
                  accept="image/*"
                  onChange={onUploadImage}
                />
              </label>
            </div>
            <p>{nickname}</p>
          </div>
          <div className={styles.userBox}>
            <div>
              <span>이메일 </span>
              <span>*</span>
              <div className={styles.whiteBox}>{email}</div>
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
                <div className={styles.whiteBox}>{fluffy || ""}</div>
              )}
            </div>
          </div>
          <div className={styles.buttonWrap}>
            <button
              className={styles.button1}
              type="button"
              onClick={editButton}
            >
              수정하기
            </button>
            <button className={styles.button2} type="button" onClick={Logout}>
              로그아웃
            </button>
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
