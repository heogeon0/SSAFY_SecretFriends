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

const Form = styled.form`
  display : flex;
  flex-direction: column;
  font-family: ${(props) => props.theme.pretendard};
  padding: 2vw;
  margin-bottom: 1vw;
  .flex-box {
    display: flex;
    flex-direction: column;
  }
  .input {
    background-color: ${(props) => props.theme.grayColor};
    border: ${(props) => props.theme.grayColor} 1px solid;
    height: 2.5rem;
    margin-bottom: 1rem;
    padding: 10px;
    border-radius: 5px;
    @media ${props => props.theme.mobile} {
      height: 1.6rem;
    };
  }
  .label {
    text-align: left;
    line-height: 2vw;
    font-size: min(3vw, 1rem);
    margin-bottom: 5px;
    @media ${props => props.theme.mobile} {
      margin-bottom: 5px;
    }
  }

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
        alert('????????? ???????????????.')
      })
    }

  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex-box">
          <label className="label" htmlFor="email">?????????</label>
          <input className="input"
            {...register("email", {
              required: "E-mail??? ??????????????????",
              pattern: {
                value:
                  /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "E-mail ????????? ????????? ?????????",
              },
            })}
            type="text"
          />
        </div>
        <div className="flex-box">
          <label className="label" htmlFor="password">????????????</label>
          <input className="input"
            {...register("password", {
              required: "??????????????? ??????????????????",
            })}
            type="password"
          />
        </div>
        <ERROR>{errors?.email?.message || errors?.password?.message}</ERROR>
        <ButtonWrap>
          <button style={{margin: "min(0.4vw, 1rem)"}}>?????????</button>
          <div style={{fontSize: "min(3vw, 1rem)", margin: "min(0.4vw, 1rem)"}}>or</div>
          <Link style={{color: "black", fontSize: "min(3vw, 1rem)", margin: "min(0.4vw, 1rem)"}} to="/signup">????????? ????????????????</Link>
        </ButtonWrap>
      </Form>
    </>
  );
}

export default LoginForm;
