import { useQuery } from "@tanstack/react-query";
import apis from "@/apis/api";
import { UpdateUserData } from "@/types/user";

async function editUser(id: number, userData: UpdateUserData) {
  try {
    const res = await apis.update(id, userData);
    return res;
  } catch (e) {
    throw new Error("유저 정보 수정에 실패했습니다. 다시 시도해주세요.");
  }
}

function useEdit(id: number, userData: UpdateUserData) {
  const { isLoading, data, isFetching, refetch } = useQuery({
    queryKey: ["EditUser"],
    queryFn: () => editUser(id, userData),
    enabled: false,
  });
  return { isLoading, data2: data, isFetching, refetch };
}

export default useEdit;
