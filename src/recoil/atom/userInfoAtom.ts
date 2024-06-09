import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// 기본 설정
// sessionStorage 저장되며, key 이름은 userInfo

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;
const { persistAtom } = recoilPersist({
  key: "userInfo",
  storage: sessionStorage,
});

const userState = atom({
  key: "loginState",
  default: {
    isLogin: false,
    token: "",
    userId: "",
    nickName: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export default userState;
