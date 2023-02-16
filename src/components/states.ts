import { atom } from "recoil";
import { v1 } from "uuid";

interface User {
  nickname: string;
  email: string;
}

const themeState = atom({
  key: `themeState/${v1()}`,
  default: "light",
});

const userState = atom<User | null>({
  key: `userState/${v1()}`,
  default: null,
});

export { themeState, userState };
