import { atom } from "recoil";

export const FaceInfo = atom({
  key: "Face",
  default: [],
});

export const Chats = atom({
  key: "Chat",
  default: [],
});

export const memberId = atom({
  key: "MemberId",
  default: '',
})

export const characterId = atom({
  key: "CharacterId",
  default: '',
})