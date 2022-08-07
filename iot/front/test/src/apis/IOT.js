
const HOST = 'http://192.168.0.7:8000/'

export default {
  tts : (text) => HOST + `tts?word=${text}`
}