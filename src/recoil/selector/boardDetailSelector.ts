import { selector } from "recoil";
import boardDetailState from "../atom/boardDetailAtom";

const boardDetailSelector = selector({
  key: "characterSelector",
  get: ({ get }) => {
    return get(boardDetailState);
  },
});

export default boardDetailSelector;
