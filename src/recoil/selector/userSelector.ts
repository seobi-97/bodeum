import { selector } from "recoil";
import userState from "../atom/userInfoAtom";

const userSelector = selector({
  key: "userSelector",
  get: ({ get }) => {
    return get(userState);
  },
});

export default userSelector;
