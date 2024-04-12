import { atom } from "recoil";
import { recoilPersist } from "recoil-persist";

const sessionStorage =
  typeof window !== "undefined" ? window.sessionStorage : undefined;

const { persistAtom } = recoilPersist({
  key: "board",
  storage: sessionStorage,
});

const communityState = atom({
  key: "board",
  default: [
    {
      answer: "",
      chatId: 0,
      comment: "",
      dateTime: null,
      fluffyName: "",
      nickname: "",
      userId: 1,
    },
  ],
  effects_UNSTABLE: [persistAtom],
});

export default communityState;
