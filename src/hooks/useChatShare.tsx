import { useQuery } from "@tanstack/react-query";
import apis from "@/apis/api";
import { ChatShareData } from "@/types/chat";

async function chatShare(id: number, shareData: ChatShareData) {
  try {
    const res = await apis.chatShareApi(id, shareData);
    return res;
  } catch (e) {
    throw new Error("공유하기에 실패했습니다. 다시 시도해주세요.");
  }
}
function useChatShare(id: number, shareData: ChatShareData) {
  const { isLoading, data, isFetching, refetch } = useQuery({
    queryKey: ["chatShare"],
    queryFn: () => chatShare(id, shareData),
    enabled: false,
  });
  return { isLoading, data, isFetching, refetch };
}

export default useChatShare;
