import Wrapper from "./styles";
import styled from "styled-components";

import SignupForm from "../../components/Member/SignUpForm";

import axios from "axios";
import drf from "../../api/drf";
import { useEffect, useState } from "react";


const Box = styled.div`
  background-image: url("img/background/pink.jpg");
  background-size: cover;
  height: 700px;
`

const Title = styled.span`
  position: absolute;
  padding: 2vw 4vw;
  font-family: ${props => props.theme.formFont};
  font-size: min(4vw, 1.5rem);
  font-weight: bold;
  border-radius: 5px;
  background-color: ${props => props.theme.whiteColor};
  top: -5vw;
  right: 0%;
`

function MemberUpdate() {
  const [currentUser, setCurrentUser] = useState();

  // if don't use the conditional statement, it errors
  const [name, setName] = useState(currentUser ? currentUser.data.name : '');
  const [phoneNumber, setPhoneNumber] = useState(currentUser ? currentUser.data.phoneNumber : '');
  const [memberID, setMemberID] = useState(currentUser ? currentUser.data.memberID : null);
  const isUpdate = true;
  
  // 페이지 렌더링 시, 로그인하면서 받은 토큰 정보를 바탕으로 회원 정보를 가져온다
  useEffect( () => {
    axios(
      {
        url: drf.member.member(),
        method: 'get',
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
      })
      .then(res => {
        setCurrentUser(res)
        setName(res.data.name)
        setPhoneNumber(res.data.phoneNumber)
        setMemberID(res.data.memberID)
      })
      .catch(err => {
        console.log(err)
      })
    }, [])

  return (
    <Box>
      <Wrapper>
        <Title>EDIT PROFILE</Title>
        <SignupForm
          name={name} setName={setName}
          phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
          isUpdate={isUpdate}
          memberID={memberID}
        />
      </Wrapper>
    </Box>
  );
}
export default MemberUpdate;
