import styled from "styled-components";

const ButtonWrap = styled.div``;

const Form = styled.form`
  width: 95%;
  max-width: 500px;
  margin-bottom: 5%; // 버튼 추가시 수정 필요
  font-family: ${(props) => props.theme.namingFont};
  div {
    display: grid;
    grid-template-columns: minmax(90px, 1fr) 10fr;
    margin: 10px;
    gap: 10px;
    label {
      text-align: right;
      line-height: 40px;
    }
    input {
      background-color: ${(props) => props.theme.yellowColor};
      height: 40px;
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
    margin-right: 0px;
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
      <Form>
        <div>
          <label htmlFor="email">E-Mail : </label>
          <input id="email" type="text" />
        </div>
        <div>
          <label htmlFor="password">Password : </label>
          <input id="password" type="password" />
        </div>
        <ButtonWrap>
          <button>로그인</button>
          <button>회원가입</button>
        </ButtonWrap>
      </Form>
    </>
  );
}

export default LoginForm;
