import { atom } from "recoil";

export const childrenId = atom({
  key: "childrenId",
  default: "",
});

export const basicChats = atom({
  key: "basicChats",
  default: [],
});
