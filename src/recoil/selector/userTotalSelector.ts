import { selector } from "recoil";
import userTotalState from "../atom/userTotalAtom";

const userTotalSelector = selector({
  key: "userTotalSelector",
  get: ({ get }) => {
    return get(userTotalState);
  },
});

export default userTotalSelector;
