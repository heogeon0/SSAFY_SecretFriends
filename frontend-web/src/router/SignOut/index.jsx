import Wrapper from "./styles";

import SignOutForm from "../../components/Member/SignOutForm";
import styled from "styled-components";

const Box = styled.div`
  background-image: url("img/background/pink.jpg");
  background-size: cover;
  height: 800px;
`


function SignOut() {
  return (
    <Box>
      <Wrapper>
        <div className="title">DELETE ACCOUNT</div>
        <SignOutForm />
      </Wrapper>
    </Box>
  );
}
export default SignOut;