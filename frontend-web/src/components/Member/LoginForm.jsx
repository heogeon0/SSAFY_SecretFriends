import styled from "styled-components";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";

const ERROR = styled.div`
  grid-column: 1 / 3;
  text-align: center;
  font-family: ${(props) => props.theme.standardFont};
  color: #c23616;
`;

const ButtonWrap = styled.div``;

const Form = styled.form`
  width: 95%;
  max-width: 500px;
  flex-direction: column;
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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  function onSubmit(data) {
    console.log(data);
  }

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        height: "80%",
      }}
    >
      <ERROR>{errors?.email?.message || errors?.password?.message}</ERROR>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="email">E-Mail : </label>
          <input
            {...register("email", {
              required: "E-mail을 입력해주세요",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "E-mail 양식을 확인해 주세요",
              },
            })}
            type="text"
          />
        </div>
        <div>
          <label htmlFor="password">Password : </label>
          <input
            {...register("password", {
              required: "비밀번호를 입력해주세요",
            })}
            type="password"
          />
        </div>
        <ButtonWrap>
          <button>로그인</button>
          <Link to="/signup">
            <button>회원가입</button>
          </Link>
        </ButtonWrap>
      </Form>
    </div>
  );
}

export default LoginForm;
