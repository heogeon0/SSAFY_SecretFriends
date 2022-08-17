// const HOST = 'mybuddy/' // server
const HOST = "https://i7d208.p.ssafy.io/mybuddy/"; // local

const MEMBER = "member/";
const CHARACTER = "character";
const CHILDREN = "children/";
const MYCHARACTER = "mycharacter/";
const QUESTION = "question/";
const ANSWER = "answer/";

export default {
  member: {
    signup: () => HOST + MEMBER + "signup/", // 회원가입(POST), 회원전체목록(GET)
    login: () => HOST + MEMBER + "login/", // 로그인(POST)
    updateMember: () => HOST + MEMBER, // 회원 정보 업데이트(PUT)
    member: () => HOST + MEMBER + "info/", // 회원 정보 조회 (GET)
    deleteMember: (memberID) => HOST + MEMBER + memberID, // 삭제(DELETE)
  },
  character: {
    characters: () => HOST + CHARACTER, // 모든 캐릭터 조회(GET)
    character: (ID) => HOST + CHARACTER + "/" + ID, // 아이의 캐릭터 조회(GET)
  },
  children: {
    childrens: () => HOST + CHILDREN, // 아이 등록(POST), 업데이트(PUT)
    children: (childrenID) => HOST + CHILDREN + childrenID, // 아이정보 조회(GET), 삭제(DELETE)
    myChildren: (memberID) => HOST + CHILDREN + "list/" + memberID, // 회원의 아이정보 조회(GET)
  },
  mycharacter: {
    createCharacter: () => HOST + MYCHARACTER, // 선택한 캐릭터정보 등록(POST)
    // 캐릭터정보 삭제(DELETE), 조회(GET), 수정(PUT)
    updateCharacter: (childrenID) => HOST + MYCHARACTER + childrenID,
  },
  question: {
    questions: () => HOST + QUESTION, // 질문 전체 조회(GET), 질문 등록(POST)
    question: (questionID) => HOST + QUESTION + questionID, // 특정 질문 조회(GET), 삭제(DELETE), 수정(PUT)
  },
  answer: {
    answers: () => HOST + ANSWER, // 답변 등록(POST)
    updateAnswer: (answerID) => HOST + ANSWER + answerID, // 답변 수정(PUT), 삭제(DELETE)
    childrenAnswers: (childrenID) => HOST + ANSWER + childrenID, // 아이별 답변 전체조회(GET)
    chidlrenAnswer: (childrenID, questionID) =>
      HOST + ANSWER + childrenID + "/" + questionID, // 아이별 질문별 답변 조회(GET)
  },
};
