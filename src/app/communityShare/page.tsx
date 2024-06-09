"use client";

import React, { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { useSearchParams, useRouter } from "next/navigation";
import useCommunity from "@/hooks/useCommunity";
import communitySelector from "@/recoil/selector/communitySelector";
import styles from "../../styles/community.module.scss";
import Header from "@/components/header";
import BoardDetail from "@/components/board";
import boardDetailState from "@/recoil/atom/boardDetailAtom";
import Loading from "@/components/loading";
import { useGetViews, usePostViews } from "@/hooks/useViews";
import { GetCommunity } from "@/types/community";

function communityShare() {
  const { isLoading, data } = useCommunity();
  console.log("커뮤니티 데이터: ", data);
  const router = useRouter();
  const params = useSearchParams().get("id");

  const BOARD = useRecoilValue(communitySelector);
  const setBoardDetail = useSetRecoilState(boardDetailState);
  const BOARDID = useRecoilValue(boardDetailState);

  const [views, setViews] = useState(0);
  const [boardId, setId] = useState(params);
  const [imageURL, setImageURL] = useState("");
  const { GetView, GetRefetch } = useGetViews(BOARDID);
  const { PostRefetch } = usePostViews(BOARDID);
  const getViews = async () => {
    await GetRefetch();
  };
  const postViews = async () => {
    await PostRefetch();
  };
  useEffect(() => {
    setBoardDetail(params);
    setId(params);
  });
  useEffect(() => {
    if (boardId) {
      const image = BOARD.filter(
        (val: GetCommunity) => val.chatId === parseInt(boardId, 10),
      );
      setImageURL(image[0].imageURL);
    }
  }, [boardId]);
  useEffect(() => {
    getViews();
    postViews();
  }, []);
  useEffect(() => {
    if (GetView) {
      console.log(GetView.data.views);
      setViews(GetView.data.views);
    }
  }, [GetView]);

  const closePopup = () => {
    router.push("/community");
  };
  if (isLoading) <Loading />;
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <Header community modal={false} />
        {BOARD && params ? (
          <div className={styles.communityShareContainer}>
            <BoardDetail
              views={views}
              imageURL={imageURL}
              closePopup={closePopup}
              params={params}
              dots={false}
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default communityShare;
