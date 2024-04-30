import axios from "axios";
import { ChatShareData } from "@/types/chat";
import { UpdateUserData } from "@/types/user";

export const api = axios.create({
  baseURL: "http://3.34.172.192:8080",
  headers: {
    "Content-Type": "application/json;charset=UTF-8",
    Accept: "application/json,",
  },
});

api.interceptors.request.use(config => {
  return config;
});

const apis = {
  // 카카오 로그인
  // 토큰값 전달
  kakaoAuth: (token: string | null) =>
    api.get(`/oauth/callback/kakao/`, { params: { code: token } }),

  // 캐릭터 정보 가져오기
  characters: () => api.get("/characters"),

  // Chatgpt 답변 가져오기
  // id값이 캐릭터. 1: 토비, 2: 마이로, 3:루미나, 4:블리
  chat: (id: number, text: string) =>
    api.get(`/chat/${id}`, { params: { question: text } }),

  // 선택한 답변 공유
  chatShareApi: (id: number, shareData: ChatShareData) =>
    api.post(`/chat/share/${id}`, shareData),

  // 커뮤니티 내용 가져오기
  community: () => api.get("/chat/community"),

  // 커뮤니티 콘텐츠 삭제
  delete: (id: number) => api.delete(`/chat/${id}`),

  // 회원탈퇴
  secession: (id: number) => api.delete(`/delete/${id}`),

  // 유저 정보 조회
  getUserData: (id: number) => api.get(`/${id}`),

  // 회원정보 수정
  // nickName: 유저 닉네임, favoriteFluffyName: 선호하는 캐릭터
  update: (id: number, userData: UpdateUserData) =>
    api.put(`/update/${id}`, userData),
};

export default apis;
