const HOST = 'http://localhost:9999/mybuddy/'

const MEMBER = 'member/'

export default {
  member: {
    signup: () => HOST + MEMBER,
    login: () => HOST + MEMBER + 'login/',
    logout: () => HOST + 'logout/',
  }
}
