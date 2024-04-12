"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { useRecoilValue } from "recoil";
import { useEffect } from "react";
import useOAuth from "@/hooks/useOAuth";
import userSelector from "@/recoil/selector/userSelector";
import Loading from "@/components/loading";

function Success() {
  const params = useSearchParams();
  const router = useRouter();
  const limitParam: string | null = params.get("code");
  const { isLoading, error } = useOAuth(limitParam);
  // selector 사용해서 userState 값 읽기
  const data = useRecoilValue(userSelector);
  console.log(data);
  if (isLoading) console.log("로그인 정보 가져오는중");
  if (error) console.log(error.message);
  // 요청 성공 시 홈화면으로 이동
  useEffect(() => {
    if (data?.isLogin) {
      console.log("로그인 성공! 홈 화면 이동");
      router.push("/");
    }
  }, [data]);
  return <Loading />;
}

export default Success;
