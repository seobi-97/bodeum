import { useQuery } from "@tanstack/react-query";
import apis from "@/apis/api";

async function chat(id: number, text: string) {
  try {
    const res = await apis.chat(id, text);
    return res;
  } catch (e) {
    throw new Error("채팅 전송에 실패했습니다.");
  }
}

function useChat(id: number, text: string) {
  const { isLoading, data, isFetching, refetch } = useQuery({
    queryKey: ["Chat"],
    queryFn: () => chat(id, text),
    enabled: false,
  });
  return { isLoading, data, isFetching, refetch };
}

export default useChat;
