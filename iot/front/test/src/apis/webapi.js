
const HOST = 'http://localhost:9999/mybuddy/'

const ANSWER = 'answer/iot/'

export default {
  answers : {
    answer : (childrenID) => HOST + ANSWER + childrenID
  }
}