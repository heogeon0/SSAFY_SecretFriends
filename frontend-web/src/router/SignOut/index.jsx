import Wrapper from "./styles";

import SignOutForm from "../../components/Member/SignOutForm";
import styled from "styled-components";

const Box = styled.div`
  height: 700px;
  width: 600px;
`

function SignOut() {
  return (
    <Box>
      <Wrapper>
        <div className="title">
          <h3>회원 탈퇴</h3>
        </div>
        <SignOutForm />
      </Wrapper>
    </Box>
  );
}
export default SignOut;