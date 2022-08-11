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
  padding: 0.6rem 1.5rem;
  font-family: ${props => props.theme.formFont};
  font-size: 1.1rem;
  font-weight: bold;
  background-color: ${props => props.theme.whiteColor};
  top: -2.1rem;
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
