import { atom, selector } from "recoil";

export const childrenId = atom({
  key: "childrenId",
  default: 0,
});

export const childrenName = atom({
  key: "childrenName",
  default: {
    birthDay: "",
    name: "",
    nickname: "",
    count: 0,
  },
});

export const memberEmail = atom({
  key: "memberEmail",
  default: "",
});

export const nameSelector = selector({
  key: "nameSelector",
  get: ({ get }) => {
    const name = get(childrenName).nickname;
    return name;
  },
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

export const socket = atom({
  key: "socket",
  default: "",
});
