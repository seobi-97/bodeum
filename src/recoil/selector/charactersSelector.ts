import { selector } from "recoil";
import charactersState from "../atom/charactersAtom";

const charactersSelector = selector({
  key: "charactersSelector",
  get: ({ get }) => {
    return get(charactersState);
  },
});

export default charactersSelector;
