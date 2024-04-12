import { selector } from "recoil";
import communityState from "../atom/communityAtom";

const communitySelector = selector({
  key: "communitySelector",
  get: ({ get }) => {
    return get(communityState);
  },
});

export default communitySelector;
