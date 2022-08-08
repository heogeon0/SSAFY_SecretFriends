import {atom} from 'recoil';

export const isLogin = atom({
  key : 'isLogin',
  default : ''
})


export const basicChats = atom({
  key : 'basicChats',
  default : [],
})