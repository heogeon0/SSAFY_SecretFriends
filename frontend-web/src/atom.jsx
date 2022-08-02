import { atom } from "recoil";

export const FaceInfo = atom({
  key: "Face",
  default: [],
});

export const Chats = atom({
  key: "Chat",
  default: [],
});

export const Token = atom({
  key: "Token",
  default: localStorage.getItem('token') || '',
})

export const IsLoggedIn = atom({
  key: "IsLoggedIn",
  default: false,
})

export const MemberId = atom({
  key: "MemberId",
  default: "",
})

export const CharacterId = atom({
  key: "CharacterId",
  default: "",
})