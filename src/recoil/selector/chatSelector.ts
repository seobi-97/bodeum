import { selector } from "recoil";
import chatState from "../atom/chat";

const chatSelector = selector({
  key: "charSelector",
  get: ({ get }) => {
    return get(chatState);
  },
});

export default chatSelector;
