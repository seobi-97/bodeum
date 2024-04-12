import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import apis from "@/apis/api";
import charactersState from "@/recoil/atom/charactersAtom";

async function getCharacters() {
  try {
    const res = await apis.characters();
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
