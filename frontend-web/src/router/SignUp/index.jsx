import Wrapper from "./styles";

import SignUpForm from "../../components/Member/SignUpForm";
import styled from "styled-components";

const Box = styled.div`
  height: 700px;
  width: 600px;
`

function SignUp() {
  return (
    <Box>
      <Wrapper>
        <div className="title">
          <h3>회원가입</h3>
        </div>
        <SignUpForm />
      </Wrapper>
    </Box>
  );
}
export default SignUp;
