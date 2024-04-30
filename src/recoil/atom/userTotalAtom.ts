import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "userTotal",
  storage: sessionStorage,
});

const userTotalState = atom({
  key: "userTotal",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default userTotalState;
