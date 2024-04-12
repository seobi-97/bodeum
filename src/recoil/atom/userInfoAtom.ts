import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

// 기본 설정
// localStorage에 저장되며, key 이름은 recoil-persist
const { persistAtom } = recoilPersist();

const userState = atom({
  key: "loginState",
  default: {
    isLogin: false,
    token: "",
    userId: "",
  },
  effects_UNSTABLE: [persistAtom],
});

export default userState;
