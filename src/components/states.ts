import { atom } from "recoil";
import { v1 } from "uuid";

const themeState = atom({
  key: `themeState/${v1()}`,
  default: "light",
});

const userState = atom({
  key: `userState/${v1()}`,
  default: null,
});

export { themeState, userState };
