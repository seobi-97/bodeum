"use client";

import React, { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import { useRouter } from "next/navigation";
import styles from "../../styles/resign.module.scss";
import userSelector from "@/recoil/selector/userSelector";
import useResign from "@/hooks/useResign";
import userTotalSelector from "@/recoil/selector/userTotalSelector";
import { useDeleteAll } from "@/hooks/useDeleteStorage";
import Header from "@/components/header";
import ModalExit from "@/components/ModalExit";
import Toast from "@/components/toast";

function Resign() {
  const [check, setCheck] = useState(false);
  const USER = useRecoilValue(userSelector);
  const USERDATA = useRecoilValue(userTotalSelector);
  console.log(USER);
  const { data, refetch } = useResign(USER.userId);
  const router = useRouter();
  const [nickname, setNickname] = useState<string>("");
  const [email, setEmail] = useState([]);

  const [showToast, setShowToast] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const checked = () => {
    setCheck(!check);
  };
  const editButton = () => {
    router.push("/edit");
  };
  const resignButton = () => {
    if (check) {
      refetch();
    } else {
      setModalOpen(true);
    }
  };
  useEffect(() => {
    if (USER) {
      setNickname(USER.nickName);
    }
  }, [USER]);
  useEffect(() => {
    if (USERDATA) {
      setEmail(USERDATA.email);
    }
  }, [USERDATA]);
  useEffect(() => {
    if (data !== undefined) {
      setShowToast(true);
      setTimeout(() => {
        setShowToast(false);
        useDeleteAll();
        window.location.replace("/");
      }, 3000);
    }
  }, [data]);
  useEffect(() => {
    if (data !== undefined) {
      setShowToast(true);
      const timeout = setTimeout(() => {
        setShowToast(false);
        useDeleteAll();
        window.location.replace("/");
      }, 3000);
      return () => clearTimeout(timeout);
    }
    return () => {};
  }, [data]);
  return (
    <div className={styles.background}>
      {showToast && <Toast text="탈퇴가 완료됐습니다." />}
      <div className={styles.container}>
        {modalOpen && (
          <div className={styles.modalBackground}>
            <ModalExit
              setModalOpen={setModalOpen}
              text={["안내사항 체크를 해주세요."]}
              button1="돌아가기"
              button2=""
            />
          </div>
        )}
        <Header community={false} modal={false} />
        <div className={styles.contentBody}>
          <div className={styles.title}>
            <h1>회원탈퇴</h1>
          </div>
          <div className={styles.subtitle}>
            <p>회원 탈퇴 후 보듬 서비스의 모든 이용이 중단됩니다.</p>
          </div>
          <div className={styles.first}>
            <div>
              <span>이메일 </span>
              <span>*</span>
              <div className={styles.whiteBox}>{email}</div>
            </div>
            <div>
              <span>이름 </span>
              <span>*</span>
              <div className={styles.whiteBox}>{nickname}</div>
            </div>
          </div>
          <div className={styles.second}>
            {check ? (
              <img
                className={styles.agree}
                id="agree"
                role="none"
                src="/images/onCheck.svg"
                onClick={checked}
                alt="checl"
              />
            ) : (
              <img
                className={styles.agree}
                id="agree"
                role="none"
                src="/images/offCheck.svg"
                onClick={checked}
                alt="checl"
              />
            )}
            <span className={styles.colorRed}>(필수)&nbsp;</span>
            <span>안내사항을 모두 확인하였으며, 이에 동의합니다.</span>
          </div>
          <div className={styles.third}>
            <p>1. 탈퇴 후 회원정보는 모두 삭제됩니다.</p>
            <p>2. 탈퇴 후 플러피와 대화한 모든 기록은 복구가 불가능합니다.</p>
            <p>3. 탈퇴 후 커뮤니티에 공유했던 글은 복구가 불가능합니다.</p>
          </div>
        </div>
        <div className={styles.buttonWrap}>
          <button
            className={styles.button1}
            type="button"
            onClick={resignButton}
          >
            탈퇴하기
          </button>
          <button className={styles.button2} type="button" onClick={editButton}>
            취소하기
          </button>
        </div>
      </div>
    </div>
  );
}

export default Resign;
