import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "boardDetail",
  storage: sessionStorage,
});

const boardDetailState = atom({
  key: "boardDetail",
  default: { id: "" },
  effects_UNSTABLE: [persistAtom],
});

export default boardDetailState;
