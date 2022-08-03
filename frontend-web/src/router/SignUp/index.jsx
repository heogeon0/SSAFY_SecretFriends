import Wrapper from "./styles";

import SignUpForm from "../../components/Member/SignUpForm";
import styled from "styled-components";

const Box = styled.div`
  height: 700px;
  width: 600px;
`

function SignUp() {
  const data = {
    name: '',
    phoneNumber: '',
    email: '',
    password: '8자리 이상으로 적어주세요',
    isUpdate: false,
    memberId: null,
  }
  return (
    <Box>
      <Wrapper>
        <div className="title">
          <h3>회원가입</h3>
        </div>
        <SignUpForm data={data} />
      </Wrapper>
    </Box>
  );
}
export default SignUp;
