import styled from "styled-components";

import axios from "axios";
import drf from "../../api/drf";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { Token } from "../../atom";


const ButtonWrap = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;



const Form = styled.form`
  padding: 2vw;
  font-family: ${(props) => props.theme.pretendard};

  .label {
    text-align: left;
    line-height: 2vw;
    font-size: min(3vw, 1rem);
    margin-top: min(3vw, 2rem);
    margin-bottom: min(0.5vw, 0.2rem);
    @media ${props => props.theme.mobile} {
      margin-bottom: 1.4vw;
    };
  }
  .input {
    background-color: ${(props) => props.theme.grayColor};
    border: ${(props) => props.theme.grayColor} 1px solid;
    height: 2.5rem;
    margin-bottom: min(4vw, 2.5rem);
    padding: 10px;
    border-radius: 5px;
    @media ${props => props.theme.mobile} {
      height: 1.6rem;
      margin-bottom: 1.5rem;
    };
  }

  ${ButtonWrap} {
    button {
      font-size: min(3vw, 1rem);
      font-family: ${(props) => props.theme.pretendard};
      width: 9vw;
      max-width: 5rem;
      height: 1.8rem;
      border: none;
      border-radius: 1rem;
      :hover {
        cursor: pointer;
      }
      @media ${(props) => props.theme.mobile} {
        width: 15vw;
        height: 6vw;
      }
    }
  }

  .flex-center {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .title1 {
      font-size: min(2.5vw, 1.2rem);
      margin-bottom: 0.5vw;
      @media ${props => props.theme.mobile} {
        font-size: 3.5vw;
      }
    }
    .title2 {
      font-size: min(1.8vw, 1rem);
      color: gray;
      margin: 1vw;
    }
  }
`;


const GrayBtn = styled.button`
  background-color: ${(props) => props.theme.grayColor};
`

const YellowBtn = styled.button`
  background-color: ${(props) => props.theme.yellowColor};
`


function SignOutForm() {
  const [ currentUser, setCurrentUser ] = useState();
  const setToken = useSetRecoilState(Token);
  const { register, handleSubmit, formState: { errors }, } = useForm();
  const navigate = useNavigate();

  useEffect(() => {
    axios({
      url: drf.member.member(),
      method: 'get',
      headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
    })
      .then(res => {
        setCurrentUser(res)
      })
      .catch(err => {
      })
    }, [])

  
  function onSubmit(data) {
    if (data.password === currentUser.data.password) {
      if (window.confirm("정말로 회원탈퇴 하시겠습니까?")) {
        axios ({
            url: drf.member.deleteMember(currentUser.data.memberID),
            method: "delete",
            headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
          }).then((res) => {
          })
          removeToken()
          navigate('/')
        }
    }
    else {
      alert("비밀번호가 틀렸습니다")
    }
  }

  function removeToken() {
    localStorage.removeItem("token")
    setToken("")
  }

  function goMain(event) {
    event.preventDefault();
    navigate('/main');
  }


  return (
    <>
      <Form onSubmit={handleSubmit(onSubmit)} action="">
        <div className="flex-center">
          <div className="title1">탈퇴하시려면 비밀번호를 입력해 주세요.</div>
          <div className="title2">탈퇴 시 등록된 모든 정보가 삭제됩니다.</div>
        </div>
        <hr style={{width: '90%', height: "1px", backgroundColor: "gray"}} />
        <div style={{display: "flex", flexDirection: "column"}}>
          <label className="label" htmlFor="password" style={{ marginRight: '1rem' }}>비밀번호</label>
          <input className="input" 
            {...register("password", {
              required: "비밀번호를 입력해주세요",
            })}
            type="password" />
        </div>
        <ButtonWrap>
          <GrayBtn onClick={(event) => goMain(event)}>취소</GrayBtn>
          <YellowBtn>확인</YellowBtn>
        </ButtonWrap>
      </Form>
    </>
  )
}

export default SignOutForm;