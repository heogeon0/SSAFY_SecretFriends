import Wrapper from "./styles";
import styled from "styled-components";

import LoginForm from "../../components/Member/LoginForm";

const Box = styled.div`
  background-image: url("img/background/pink.jpg");
  background-size: cover;
  height: 80vh;
`


function Login() {
  return (
    <Box>
      <Wrapper>
        <div className="title">LOGIN</div>
        <LoginForm />
      </Wrapper>
    </Box>
  );
}
export default Login;
