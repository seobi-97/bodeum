import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "character",
  storage: sessionStorage,
});

const characterState = atom({
  key: "character",
  default: { id: 0, name: "" },
  effects_UNSTABLE: [persistAtom],
});

export default characterState;
