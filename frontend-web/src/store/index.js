import axios from 'axios';

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
    return (res)
  })
  .catch(err => {
    console.log(err)
  })
}