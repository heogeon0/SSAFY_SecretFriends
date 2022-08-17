// const HOST = 'http://localhost:9999/mybuddy/'
const HOST = "http://localhost:9999/mybuddy/";

const ANSWER = "answer/iot/";
const INFO = "children/iot/";

export default {
  answers: {
    answer: (childrenID) => HOST + ANSWER + childrenID,
    info: (childrenID) => HOST + INFO + childrenID,
  },
};
