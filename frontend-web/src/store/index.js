import axios from 'axios';
import drf from '../api/drf';

export function signup (member) {
  axios ({
    url: drf.member.signup(),
    method: 'post',
    data: member,
  })
    .then(res => {
      console.log(res)
    })
    .catch(err => {
      console.log(err)
    })
}