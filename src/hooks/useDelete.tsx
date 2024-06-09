import { useQuery } from "@tanstack/react-query";
import apis from "@/apis/api";

async function deleteBoard(id: number) {
  try {
    const res = await apis.delete(id);
    return res;
  } catch (e) {
    throw new Error("커뮤니티 정보를 불러오지 못했습니다.");
  }
}
function useDelete(id: number) {
  const { isLoading, data, isFetching, refetch } = useQuery({
    queryKey: ["deleteBoard"],
    queryFn: () => deleteBoard(id),
    enabled: false,
  });
  return { isLoading, data, isFetching, refetch };
}

export default useDelete;
