import Wrapper from "./styles";

import SignOutForm from "../../components/Member/SignOutForm";
import styled from "styled-components";

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
  top: -5vw;
  right: 0%;
`

function SignOut() {
  return (
    <Box>
      <Wrapper>
        <Title>DELETE ACCOUNT</Title>
        <SignOutForm />
      </Wrapper>
    </Box>
  );
}
export default SignOut;