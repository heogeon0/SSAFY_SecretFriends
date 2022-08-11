import Wrapper from "./styles";

import SignUpForm from "../../components/Member/SignUpForm";
import styled from "styled-components";

import { useState } from "react";

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
  top: -6vw;
  right: 0%;
`


function SignUp() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const memberID = useState(null)[0];
  const isUpdate = false;

  return (
    <Box>
      <Wrapper>
        <Title>SIGNUP</Title>
        <SignUpForm
          name={name} setName={setName}
          phoneNumber={phoneNumber} setPhoneNumber={setPhoneNumber}
          isUpdate={isUpdate}
          memberID={memberID}
        />
      </Wrapper>
    </Box>
  );
}
export default SignUp;
