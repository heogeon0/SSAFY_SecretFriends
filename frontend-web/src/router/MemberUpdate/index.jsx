import Wrapper from "./styles";

import styled from "styled-components";
import MemberUpdateForm from "../../components/Member/MemberUpdateFrom";
import SignupForm from "../../components/Member/SignUpForm";
import { useEffect, useState } from "react";
import axios from "axios";
import drf from "../../api/drf";


const Box = styled.div`
  height: 700px;
  width: 600px;
`

function MemberUpdate() {
  const [currentUser, setCurrentUser] = useState();
  // const [data, setData] = useState();

  useEffect( () => {
    axios(
      {
        url: drf.member.member(),
        method: 'get',
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
      })
      .then(res => {
        setCurrentUser(res)
        // setData('')
        // console.log(res)
      })
      .catch(err => {
        console.log(err)
      })
    }, [])
  

  const data = 
    {
      name: currentUser ? currentUser.data.name : '',
      phoneNumber: currentUser ? currentUser.data.phoneNumber : '',
      email: currentUser ? currentUser.data.email : '',
      password: '8자리 이상으로 적어주세요',
      isUpdate: true,
      // password: currentUser.data.password,
    }

  return (
    <Box>
      <Wrapper>
        <div className="title">
          <h3>회원정보 수정</h3>
        </div>
        <SignupForm data={data} />
      </Wrapper>
    </Box>
  );
}
export default MemberUpdate;
