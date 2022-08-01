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

export const characterId = atom({
  key: "CharacterId",
  default: '',
})