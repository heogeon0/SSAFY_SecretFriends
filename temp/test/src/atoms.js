import { atom } from "recoil";

export const childrenId = atom({
  key: "childrenId",
  default: 7,
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
