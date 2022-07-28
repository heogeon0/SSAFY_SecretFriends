import Wrapper from "./styles";
import styled from "styled-components";

import LoginForm from "../../components/Member/LoginForm";

const Box = styled.div`
  height: 700px;
  width: 600px;
`

function Login() {
  return (
    <Box>
      <Wrapper>
        <div className="title">
          <h3>로그인</h3>
        </div>
        <LoginForm />
      </Wrapper>
    </Box>
  );
}
export default Login;
