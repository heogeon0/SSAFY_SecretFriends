import axios from 'axios';
import drf from '../api/drf';
import { Navigate } from 'react-router-dom';


// export function signup (member) {
//   axios ({
//     url: drf.member.signup(),
//     method: 'post',
//     data: member,
//   })
//     .then(res => {
//       console.log(res)
//       return (
//         <Navigate to="/login"></Navigate>
//       )
//     })
//     .catch(err => {
//       if (err.response.data === "email error") {
//         alert("이메일이 중복됩니다.")
//       }
//       console.log(err)
//     })
// }


export function member () {
  axios.defaults.withCredentials = true;
  axios.get("http://localhost:9999/mybuddy/member/info/", {
    headers:
    {
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