function useGetTime() {
  const now = new Date();

  // 년
  const year = now.getFullYear();
  // 월
  const month = (now.getMonth() + 1).toString().padStart(2, "0");
  // 일
  const day = now.getDate().toString().padStart(2, "0");
  // 시
  const hours = now.getHours().toString().padStart(2, "0");
  // 분
  const minutes = now.getMinutes().toString().padStart(2, "0");

  return `${year}.${month}.${day} ${hours}:${minutes}`;
}

export default useGetTime;
