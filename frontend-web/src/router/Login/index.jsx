import Wrapper from "./styles";

import LoginForm from "../../components/Member/LoginForm";
import AccountErrorList from "../../components/Member/AccountErrorList";

function Login() {
  return (
    <>
      <Wrapper>
        <div className="title">
          <h3>로그인</h3>
        </div>
        <AccountErrorList />
        <LoginForm />
      </Wrapper>
    </>
  );
}
export default Login;
