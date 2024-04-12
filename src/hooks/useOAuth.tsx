import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import apis from "@/apis/api";
import userState from "@/recoil/atom/userInfoAtom";

async function kakaoAuth(limitParam: string | null) {
  try {
    const res = await apis.kakaoAuth(limitParam);
    return res;
  } catch (e) {
    throw new Error("로그인에 실패했습니다. 잠시 후 다시 시도해주세요.");
  }
}
function useOAuth(limitParam: string | null) {
  const setUser = useSetRecoilState(userState);
  const { isLoading, error, data } = useQuery({
    queryKey: ["OAuth"],
    queryFn: () => kakaoAuth(limitParam),
  });
  useEffect(() => {
    if (data !== undefined)
      setUser({
        isLogin: true,
        token: data?.data.data.token,
        userId: data?.data.data.userId,
      });
  }, [data]);
  return { isLoading, error };
}

export default useOAuth;
