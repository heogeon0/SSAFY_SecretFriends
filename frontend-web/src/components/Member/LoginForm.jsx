import styled from "styled-components";

import axios from "axios";
import drf from "../../api/drf";

import { Link, useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import { Token } from "../../atom";


const ERROR = styled.div`
  text-align: center;
  font-size: min(2vw, 1rem);
  font-family: ${(props) => props.theme.standardFont};
  color: #c23616;
  margin-bottom: min(2vw, 1rem);
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const InputTag = styled.input`
  background-color: ${(props) => props.theme.grayColor};
  border: ${(props) => props.theme.grayColor} 1px solid;
  height: 2.5rem;
  margin-bottom: 1rem;
  padding: 10px;
  border-radius: 5px;
  @media ${props => props.theme.mobile} {
    height: 1.6rem;
  };
`

const LabelTag = styled.label`
  text-align: left;
  line-height: 2vw;
  font-size: min(3vw, 1rem);
  margin-bottom: 5px;
  @media ${props => props.theme.mobile} {
    margin-bottom: 5px;
  }
`

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
`

const Form = styled.form`
  display : flex;
  flex-direction: column;
  font-family: ${(props) => props.theme.pretendard};
  padding: 2vw;
  margin-bottom: 1vw;

  ${ButtonWrap} {
    button {
      font-size: min(3vw, 1rem);
      font-family: ${(props) => props.theme.pretendard};
      width: 22vw;
      max-width: 8.5rem;
      height: 1.8rem;
      border: none;
      background-color: ${(props) => props.theme.grayColor};
      border-radius: 1rem;
      :hover {
        cursor: pointer;
      }
      @media ${(props) => props.theme.mobile} {
        width: 25vw;
        height: 6vw;
      }
    }
  }
`;

function LoginForm() {
  const setToken = useSetRecoilState(Token);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function onSubmit(data) {
    axios.post(
      drf.member.login(),
      {
        email: data.email,
        password: data.password,
      },
      )
      .then((res) => {
        const accessToken = res.data.token;
        axios.defaults.headers.common["Authorization"] = `Bearer ${accessToken}`
        localStorage.setItem("token", accessToken)
        setToken(accessToken)
        navigate("/")
      })
      .catch((err) => {
        alert('잘못된 정보입니다.')
        console.log(err)
      })
    }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FlexBox>
          <LabelTag htmlFor="email">이메일</LabelTag>
          <InputTag
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
        </FlexBox>
        <FlexBox>
          <LabelTag htmlFor="password">비밀번호</LabelTag>
          <InputTag
            {...register("password", {
              required: "비밀번호를 입력해주세요",
            })}
            type="password"
          />
        </FlexBox>
        <ERROR>{errors?.email?.message || errors?.password?.message}</ERROR>
        <ButtonWrap>
          <button style={{margin: "min(0.4vw, 1rem)"}}>로그인</button>
          <div style={{fontSize: "min(3vw, 1rem)", margin: "min(0.4vw, 1rem)"}}>or</div>
          <Link style={{color: "black", fontSize: "min(3vw, 1rem)", margin: "min(0.4vw, 1rem)"}} to="/signup">계정이 없으신가요?</Link>
        </ButtonWrap>
      </Form>
    </>
  );
}

export default LoginForm;
