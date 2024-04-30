import { useQuery } from "@tanstack/react-query";
import { useSetRecoilState } from "recoil";
import { useEffect } from "react";
import apis from "@/apis/api";
import userTotalState from "@/recoil/atom/userTotalAtom";

async function getUser(id: number) {
  try {
    const res = await apis.getUserData(id);
    return res;
  } catch (e) {
    throw new Error("유저정보 조회에 실패했습니다. 다시 시도해주세요.");
  }
}
function useTotal(id: number) {
  const setData = useSetRecoilState(userTotalState);
  const { isLoading, data, isFetching, refetch } = useQuery({
    queryKey: ["userTotal"],
    queryFn: () => getUser(id),
  });
  useEffect(() => {
    if (data !== undefined) {
      setData(data.data);
    }
  }, [data]);
  return { isLoading, data, isFetching, refetch };
}

export default useTotal;
