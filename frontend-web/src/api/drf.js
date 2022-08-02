const HOST = 'http://localhost:9999/mybuddy/'

const MEMBER = 'member/'
const CHARACTER = 'character/'
const CHILDREN = 'children/'
const MYCHARACTER = 'mycharacter/'
const QUESTION = 'question/'
const ANSWER = 'answer/'

export default {
  member: {
    signup: () => HOST + MEMBER + 'signup/',  // 회원가입(POST), 회원전체목록(GET)
    login: () => HOST + MEMBER + 'login/',  // 로그인(POST)
    updateMember: () => HOST + MEMBER,  // 회원 정보 업데이트(PUT)
    member: () => HOST + MEMBER + 'info/',  // 회원 정보 조회 (GET)
    deleteMember: memberId => HOST + MEMBER + memberId, // 삭제(DELETE)
  },
  character: {
    characters: () => HOST + CHARACTER, // 모든 캐릭터 조회(GET)
    character: ID => HOST + CHARACTER + ID, // 아이의 캐릭터 조회(GET)
  },
  children: {
    childrens: () => HOST + CHILDREN, // 아이 등록(POST), 업데이트(PUT)
    children: childrenId => HOST + CHILDREN + childrenId,  // 아이정보 조회(GET), 삭제(DELETE)
    myChildren: memberId => HOST + CHILDREN + 'list/' + memberId, // 회원의 아이정보 조회(GET)
  },
  mycharacter: {
    myCharacters: () => HOST + MYCHARACTER, // 선택한 캐릭터정보 등록(POST)
    // 캐릭터정보 삭제(DELETE), 조회(GET), 수정(PUT)
    updateCharacter: characterId => HOST + MYCHARACTER + characterId,
  },
  question: {
    questions: () => HOST + QUESTION, // 질문 전체 조회(GET), 질문 등록(POST)
    question: questionId => HOST + QUESTION + questionId, // 특정 질문 조회(GET), 삭제(DELETE), 수정(PUT)
  },
  answer: {
    answers: () => HOST + ANSWER, // 답변 등록(POST)
    updateAnswer: answerId => HOST + ANSWER + answerId, // 답변 수정(PUT), 삭제(DELETE)
    childrenAnswers: childrenId => HOST + ANSWER+ childrenId, // 아이별 답변 전체조회(GET)
    chidlrenAnswer: (childrenId, questionId) => HOST + ANSWER + childrenId + '/' + questionId,  // 아이별 질문별 답변 조회(GET)
  }
}
