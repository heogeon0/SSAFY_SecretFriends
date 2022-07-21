import Wrapper from "./styles";

import SignUp from "../../components/Member/SignUp";
import AccountErrorList from "../../components/Member/AccountErrorList";

function Login() {
  return (
    <>
      <Wrapper>
        <div className="title">
          <h3>로그인</h3>
        </div>
        <AccountErrorList />
        <SignUp />
      </Wrapper>
    </>
  );
}
export default Login;
