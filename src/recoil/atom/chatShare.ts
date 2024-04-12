import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "chatShare",
  storage: sessionStorage,
});

const chatShareState = atom({
  key: "chatShare",
  default: [],
  effects_UNSTABLE: [persistAtom],
});

export default chatShareState;
