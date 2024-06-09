import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "characters",
  storage: sessionStorage,
});

const charactersState = atom({
  key: "characters",
  default: [
    { id: 9, name: "", description: "" },
    { id: 10, name: "", description: "" },
    { id: 11, name: "", description: "" },
    { id: 12, name: "", description: "" },
  ],
  effects_UNSTABLE: [persistAtom],
});

export default charactersState;
