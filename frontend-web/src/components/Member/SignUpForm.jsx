import styled from "styled-components";

import { useForm } from "react-hook-form";
import axios from "axios";
import drf from "../../api/drf";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const ERROR = styled.div`
  grid-column: 1 / 3;
  text-align: center;
  font-family: ${(props) => props.theme.standardFont};
  color: #c23616;
`;

const ButtonWrap = styled.div``;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  width: 98%;
  height: 100%;
  max-width: 500px;
  margin-bottom: 5%; // 버튼 추가시 수정 필요
  font-family: ${(props) => props.theme.namingFont};
  div {
    display: grid;
    grid-template-columns: minmax(100px, 1fr) 10fr;
    margin: 10px;
    gap: 10px;
    label {
      text-align: left;
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

function SignupForm({
  name, setName, phoneNumber, setPhoneNumber, isUpdate, memberID,
}) {
  // console.log(data.name)
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  function ChangeName(event) {
    setName(event.target.value)
    console.log(event.target.value)
  }

  function ChangePhoneNumber(event) {
    setPhoneNumber(event.target.value)
  }

  function onSubmit({name, phoneNumber, password, email}) {
    const newData = { name, phoneNumber, password, email }
    const updateData = { name, phoneNumber, memberID }
    // case1: 회원가입 form
    if (!isUpdate) {
      axios ({
          url: drf.member.signup(),
          method: 'post',
          data: newData,
        })
          .then(res => {
            console.log(res)
            navigate('/login')
          })
          .catch(err => {
            if (err.response.data === "email error") {
              alert("이메일이 중복됩니다.")
            }
            console.log(err)
          })
    // case2: 회원정보 수정 form
    } else {
      axios ({
        url: drf.member.updateMember(),
        method: 'put',
        data: updateData,
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
      })
        .then(res => {
          alert('회원정보가 수정되었습니다.')
          console.log(res)
          console.log(updateData)
          console.log("update 되었습니다")
          navigate('/main')
        })
        .catch(err => console.log(err))
    }
  }

  const check = watch().password;
  return (
    <div>
      <ERROR>
        {errors?.name?.message ||
          errors?.phoneNumber?.message ||
          errors?.email?.message ||
          errors?.password?.message ||
          errors?.passwordConfirm?.message}
      </ERROR>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <label htmlFor="name">이름 : </label>
          <input
            {...register("name", {
              required: "이름을 입력해주세요!",
            })}
            type="text"
            value={name}
            onChange={ChangeName}
          />
        </div>
        <div>
          <label htmlFor="phoneNumber" placeholder="숫자만 입력해주세요">
            휴대전화 :
          </label>
          <input
            {...register("phoneNumber", {
              required: "전화번호를 입력해주세요",
              pattern: {
                value: /[0-9]/,
                message: "숫자만 입력해주세요",
              },
            })}
            type="text"
            value={phoneNumber}
            onChange={ChangePhoneNumber}
          />
        </div>
        <>{ isUpdate ? null : 
          <>
            <div>
              <label htmlFor="email">E-Mail : </label>
              <input
                {...register("email", {
                  required: "E-Mail을 입력해주세요",
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
              <label htmlFor="password">비밀번호 : </label>
              <input
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                  minLength: {
                    value: 8,
                    message: "비밀번호를 8자리 이상으로 해주세요",
                  },
                })}
                type="password"
                placeholder="8자리 이상으로 적어주세요"
                // placeholder={password}
              />
            </div>
            <div>
              <label htmlFor="passwordCheck">비밀번호 확인 : </label>
              <input
                {...register("passwordConfirm", {
                  validate: (value) =>
                    value === check ? true : "비밀번호가 틀립니다",
                })}
                type="password"
                placeholder="한번 더 적어주세요"
              />
            </div>
          </>
        }</>
        <ButtonWrap>
          <div>{ isUpdate ? <button>수정하기</button> : <button>회원가입</button> }</div>
          {/* <button>회원가입</button> */}
        </ButtonWrap>
      </Form>
    </div>
  );
}

export default SignupForm;
