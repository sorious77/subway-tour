import { atom } from "recoil";

const themeState = atom({
  key: "themeState",
  default: "light",
});

const userState = atom({
  key: "userState",
  default: null,
});

export { themeState, userState };
