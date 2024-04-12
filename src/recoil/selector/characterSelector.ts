import { selector } from "recoil";
import characterState from "../atom/characterAtom";

const characterSelector = selector({
  key: "characterSelector",
  get: ({ get }) => {
    return get(characterState);
  },
});

export default characterSelector;
