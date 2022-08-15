// const HOST = 'http://192.168.0.7:8000/'
const HOST = "http://localhost:8000/";

export default {
  tts: (text) => HOST + `tts?word=${text}`,
  camera: () => HOST + "camera",
  login: () => HOST + "login",
  arduino: () => HOST + "arduino",
  stt: () => HOST + "stt",
};
