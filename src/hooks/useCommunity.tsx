import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import apis from "@/apis/api";
import communityState from "@/recoil/atom/communityAtom";

async function board() {
  try {
    const res = await apis.community();
    return res;
  } catch (e) {
    throw new Error("커뮤니티 정보를 불러오지 못했습니다.");
  }
}

function useCommunity() {
  const setBoard = useSetRecoilState(communityState);
  const { isLoading, error, data } = useQuery({
    queryKey: ["getBoard"],
    queryFn: () => board(),
  });
  useEffect(() => {
    if (data !== undefined) {
      setBoard(data.data);
    }
  }, [data]);
  return { isLoading, error, data };
}

export default useCommunity;
