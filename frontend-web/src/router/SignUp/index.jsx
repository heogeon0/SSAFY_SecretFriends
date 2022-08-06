import Wrapper from "./styles";

import SignUpForm from "../../components/Member/SignUpForm";
import styled from "styled-components";

import { useState } from "react";

const Box = styled.div`
  height: 700px;
  width: 600px;
`

function SignUp() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const memberID = useState(null)[0];
  const isUpdate = false;

  return (
    <Box>
      <Wrapper>
        <div className="title">
          <h3>회원가입</h3>
        </div>
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
