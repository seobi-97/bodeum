import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import apis from "@/apis/api";
import charactersState from "@/recoil/atom/charactersAtom";

async function getCharacters() {
  try {
    const res = await apis.characters();
    // const res = {
    //   data: [
    //     {
    //       id: 9,
    //       name: "토비",
    //       description:
    //         "따뜻한 마음을 지닌 활발한 토비\n당신에게 즐거운 웃음과 감동을 전해 비춰드릴게요",
    //     },
    //     {
    //       id: 10,
    //       name: "마이로",
    //       description:
    //         "이성적이면서 현실적인 판단을 당신에게 전달해드릴 똑똑한 조언자 마이로에요",
    //     },
    //     {
    //       id: 11,
    //       name: "루미나",
    //       description:
    //         "감성적이고 창의적인 루미나\n당신이 예상치 못한 답변으로 감동을 전달해드릴게요",
    //     },
    //     {
    //       id: 12,
    //       name: "블리",
    //       description:
    //         "누구에게나 사랑을 전달하며 온 세상을 따뜻하게 만드는 블리\n당신에게 희망을 드릴게요",
    //     },
    //   ],
    // };
    return res;
  } catch (e) {
    throw new Error("캐릭터 정보를 불러오지 못했습니다.");
  }
}

function useGetCharacter() {
  const setCharacters = useSetRecoilState(charactersState);
  const { isLoading, error, data } = useQuery({
    queryKey: ["getCharacters"],
    queryFn: () => getCharacters(),
  });
  useEffect(() => {
    console.log(data);
    if (data !== undefined) setCharacters(data.data);
  });
  return { isLoading, error, data };
}

export default useGetCharacter;
