import { selector } from "recoil";
import chatShareState from "../atom/chatShare";

const chatShareSelector = selector({
  key: "chatShareSelector",
  get: ({ get }) => {
    return get(chatShareState);
  },
});

export default chatShareSelector;
