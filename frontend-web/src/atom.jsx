import { atom } from "recoil";

export const FaceInfo = atom({
  key: "FaceInfo",
  default: [],
});

export const Chats = atom({
  key: "Chats",
  default: [],
});

export const Token = atom({
  key: "Token",
  default: localStorage.getItem('token') || '',
})

export const MemberID = atom({
  key: "MemberID",
  default: "",
})

export const CurrentID = atom({
  key: "CurrentID",
  default: null,
})

export const CurrentChild = atom({
  key: "CurrentChild",
  deafult: "",
})

export const CurrentSlide = atom({
  key: "CurrentSilde",
  default: 0,
})

export const ChildrenList = atom({
  key: "ChildrenList",
  default: []
})

export const AnswerList = atom({
  key: "AnswerList",
  default: [],
})