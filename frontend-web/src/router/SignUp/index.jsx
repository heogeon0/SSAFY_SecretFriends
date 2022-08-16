import Wrapper from "./styles";

import SignUpForm from "../../components/Member/SignUpForm";
import styled from "styled-components";

import { useState } from "react";

const Box = styled.div`
  background-image: url("img/background/pink.jpg");
  background-size: cover;
  height: 800px;
`


function SignUp() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const memberID = useState(null)[0];
  const isUpdate = false;

  return (
    <Box>
      <Wrapper>
        <div className="title">SIGNUP</div>
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
