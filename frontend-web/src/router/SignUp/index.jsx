import Wrapper from "./styles";
import { useState } from "react";

import SignUpForm from "../../components/Member/SignUpForm";
import styled from "styled-components";

const Box = styled.div`
  height: 700px;
  width: 600px;
`

function SignUp() {
  const [name, setName] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const isUpdate = false;
  const [memberId, setMemberId] = useState(null);

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
          memberId={memberId}
        />
      </Wrapper>
    </Box>
  );
}
export default SignUp;
