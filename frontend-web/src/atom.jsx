import { atom } from "recoil";

export const FaceInfo = atom({
  key: "Face",
  default: [],
});

export const Chats = atom({
  key: "Chat",
  default: [],
});

// export const Token = atom({
//   key: "Token",
//   default: localStorage.getItem('token') || '',
// })

// export const IsLoggedIn = atom({
//   key: "IsLoggedIn",
//   // default: !!localStorage.getItem('token'),
//   default: false,
// })

export const MemberID = atom({
  key: "MemberID",
  default: "",
})

// export const ChildrenID = atom({
//   key: "ChildrenID",
//   default: null,
// })

// export const CharacterID = atom({
//   key: "CharacterID",
//   default: "",
// })

export const CurrentChild = atom({
  key: "CurrentChild",
  deafult: null,
})

export const CurrentSlide = atom({
  key: "CurrentSilde",
  default: 0,
})

export const ChildrenList = atom({
  key: "ChildrenList",
  default: []
})

// export const NowAnswer = atom({
//   key: "NowAnswer",
//   default: null,
// })

export const AnswerList = atom({
  key: "AnswerList",
  default: [],
})