import { atom } from "recoil";

export const childrenId = atom({
  key: "childrenId",
  default: {},
});

export const basicChats = atom({
  key: "basicChats",
  default: [],
});

//actions

export const death = atom({
  key: "death",
  default: false,
});
export const no = atom({
  key: "no",
  default: false,
});
export const yes = atom({
  key: "yes",
  default: false,
});
export const wave = atom({
  key: "wave",
  default: false,
});
