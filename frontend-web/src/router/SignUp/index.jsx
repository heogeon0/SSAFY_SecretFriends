import Wrapper from "./styles";

import SignUpForm from "../../components/Member/SignUpForm";

function SignUp() {
  return (
    <>
      <Wrapper>
        <div className="title">
          <h3>회원가입</h3>
        </div>
        <SignUpForm />
      </Wrapper>
    </>
  );
}
export default SignUp;
