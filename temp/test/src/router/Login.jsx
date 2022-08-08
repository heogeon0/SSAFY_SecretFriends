import {useRecoilState} from 'recoil'
import { isLogin } from '../atoms'
import { Navigate, useNavigate } from 'react-router-dom'

import axios from 'axios'
import webapi from '../apis/webapi'

function Login (){
  // const [isLogined, setLogined] = useRecoilState(isLogin)
  const navigate = useNavigate()
  const onClick = ((cid, event) => {
    console.log(webapi.answers.answer(cid))
  //   axios({
  //     url : webapi.answers.answer(cid)
  //   }).then(res => {
  //     console.log(res)
  //   })
    navigate('/main')
  })
  return (<>
  <div>로그인화면</div>
  <button onClick={(event) => onClick(1)}>로그인</button>
  </>
)}

export default Login