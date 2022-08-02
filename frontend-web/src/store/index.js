import axios from 'axios';
import drf from '../api/drf';
// import { useNavigate } from 'react-router-dom'
// import { Token } from "../atom";
// import { useRecoilValue } from 'recoil';


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

// export const login = async (data) => {
//   return await axios
//   .post(
//     drf.member.login(),
//     {
//       email: data.email,
//       password: data.password,
//     },
//     // { withCredentials: true } --> 없애도 되는건지?
//     )
//     .then((res) => {
//       const accessToken = res.data.token;
//       console.log(accessToken)
//       axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
//       localStorage.setItem("token", accessToken)
//     })
//     .catch((err) => {
//       alert('잘못된 정보입니다.')
//       console.log(err)
//     })
// }

export function member () {
  // const token = useRecoilValue(Token);
  // console.log(token)
  axios.defaults.withCredentials = true;
  axios.get("http://localhost:9999/mybuddy/member/info/", {
    headers:
    {
      // 'content-type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem("token"),

    },
  })
  .then(res => {
    console.log(res)
  })
  .catch(err => {
      console.log(err)
    })
}