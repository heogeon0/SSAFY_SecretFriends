import Wrapper from "./styles";

import LoginForm from "../../components/Member/LoginForm";

function Login() {
  return (
    <>
      <Wrapper>
        <div className="title">
          <h3>로그인</h3>
        </div>
        <LoginForm />
      </Wrapper>
    </>
  );
}
export default Login;
