import Wrapper from "./styles";
import styled from "styled-components";

import LoginForm from "../../components/Member/LoginForm";

const Box = styled.div`
  background-image: url("img/background/pink.jpg");
  background-size: cover;
  height: 80vh;
`

const Title = styled.span`
  position: absolute;
  padding: 2vw 4vw;
  font-family: ${props => props.theme.formFont};
  font-size: min(4vw, 1.5rem);
  font-weight: bold;
  background-color: ${props => props.theme.whiteColor};
  border-radius: 5px;
  top: -5vw;
  left: 0%;
`

function Login() {
  return (
    <Box>
      <Wrapper>
        <Title>LOGIN</Title>
        <LoginForm />
      </Wrapper>
    </Box>
  );
}
export default Login;
