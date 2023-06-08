import { atom } from "recoil";
import { v1 } from "uuid";

const themeState = atom({
  key: `themeState/${v1()}`,
  default: "light",
});

const pageState = atom({
  key: `pageState/${v1()}`,
  default: 1,
});

export { themeState, pageState };
