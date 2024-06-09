import { useQuery } from "@tanstack/react-query";
import apis from "@/apis/api";

function useResign(id: number) {
  const { isLoading, data, refetch } = useQuery({
    queryKey: ["resign"],
    queryFn: async () => {
      const response = await apis.secession(id);
      return response;
    },
    enabled: false,
  });
  return { isLoading, data, refetch };
}

export default useResign;
