import styled from "styled-components";
import { Link } from "react-router-dom";
import AccountErrorList from "./AccountErrorList";

const ButtonWrap = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 95%;
  max-width: 500px;
  margin-bottom: 5%; // 버튼 추가시 수정 필요
  font-family: ${(props) => props.theme.namingFont};
  div {
    display: grid;
    grid-template-columns: minmax(100px, 1fr) 10fr;
    margin: 10px;
    gap: 10px;
    label {
      text-align: right;
      line-height: 30px;
    }
    input {
      background-color: ${(props) => props.theme.yellowColor};
      height: 30px;
      background: linear-gradient(
        ${(props) => props.theme.yellowColor},
        ${(props) => props.theme.grayColor}
      );
      border: ${(props) => props.theme.yellowColor} 1px solid;
    }
  }
  ${ButtonWrap} {
    position: relative;
    display: flex;
    justify-content: flex-end;
    width: 95%;
    button {
      font-family: ${(props) => props.theme.namingFont};
      width: 80px;
      height: 25px;

      :hover {
        cursor: pointer;
      }
    }
  }
`;

function LoginForm() {
  return (
    <>
      <AccountErrorList />
      <Form>
        <div>
          <label htmlFor="email">E-Mail : </label>
          <input id="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">비밀번호 : </label>
          <input id="password" type="password" />
        </div>
        <div>
          <label htmlFor="passwordCheck">비밀번호 확인 : </label>
          <input id="passwordCheck" type="password" />
        </div>
        <div>
          <label htmlFor="name">이름 : </label>
          <input id="name" type="text" />
        </div>
        <div>
          <label htmlFor="phone" placeholder="숫자만 입력해주세요">
            휴대전화 :{" "}
          </label>
          <input id="phone" type="text" />
        </div>
        <ButtonWrap>
          <Link to="/signup">
            <button>회원가입</button>
          </Link>
        </ButtonWrap>
      </Form>
    </>
  );
}

export default LoginForm;
