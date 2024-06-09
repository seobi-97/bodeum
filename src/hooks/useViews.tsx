import { useQuery } from "@tanstack/react-query";
import apis from "@/apis/api";

async function getViews(id: number) {
  try {
    const res = await apis.getViews(id);
    return res;
  } catch (e) {
    throw new Error("조회수 정보를 불러오지 못했습니다.");
  }
}
export function useGetViews(id: number) {
  const { isLoading, data, isFetching, refetch } = useQuery({
    queryKey: ["getViews"],
    queryFn: () => getViews(id),
    enabled: false,
  });
  return { isLoading, GetView: data, isFetching, GetRefetch: refetch };
}

async function postViews(id: number) {
  try {
    const res = await apis.postViews(id);
    return res;
  } catch (e) {
    throw new Error("조회수 증가에 실패했습니다.");
  }
}
export function usePostViews(id: number) {
  const { isLoading, data, isFetching, refetch } = useQuery({
    queryKey: ["postViews"],
    queryFn: () => postViews(id),
    enabled: false,
  });
  return { isLoading, data, isFetching, PostRefetch: refetch };
}
