import styled from "styled-components";

import axios from "axios";
import drf from "../../api/drf";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const ERROR = styled.div`
  text-align: center;
  font-size: min(2vw, 1rem);
  font-family: ${(props) => props.theme.standardFont};
  color: #c23616;
  margin: min(0.8vw, 1rem) 0 min(2vw, 1rem) 0;
`;

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
`

const Form = styled.form`
  display : flex;
  flex-direction: column;
  font-family: ${(props) => props.theme.pretendard};
  padding: 2vw 2vw 1vw 2vw;
  margin-bottom: 1vw;
  .label {
    text-align: left;
    margin-bottom: 5px;
    @media ${props => props.theme.mobile} {
      font-size: min(3vw, 1rem);
      margin-bottom: min(0.5vw, 8px);
    };
  };
  .input {
    background-color: ${(props) => props.theme.grayColor};
    border: ${(props) => props.theme.grayColor} 1px solid;
    height: 2.5rem;
    margin-bottom: 12px;
    border-radius: 5px;
    padding: 10px;
    @media ${props => props.theme.mobile} {
      height: 1.6rem;
      margin-bottom: 10px;
    };
  };
  .button {
    .gray__btn {
      font-size: min(3vw, 1rem);
      font-family: ${(props) => props.theme.pretendard};
      border: none;
      border-radius: 1rem;
      padding: 5px 10px;
      background-color: ${(props) => props.theme.grayColor};
      :hover {
      cursor: pointer;
      }
      @media ${props => props.theme.mobile} {
        padding: 5px 8px;
      }
    };
    .yellow__btn {
      font-size: min(3vw, 1rem);
      font-family: ${(props) => props.theme.pretendard};
      border: none;
      border-radius: 1rem;
      padding: 0.3rem 1rem;
      background-color: ${(props) => props.theme.yellowColor};
      :hover {
        cursor: pointer;
      }
      @media ${props => props.theme.mobile} {
        padding: 5px 8px;
      }
    };
  };
`;


function SignupForm({
  name, setName, phoneNumber, setPhoneNumber, isUpdate, memberID,
}) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const navigate = useNavigate();

  useEffect(() => {
    if (phoneNumber.length === 10) {
      setPhoneNumber(phoneNumber.replace(/(\d{3})(\d{3})(\d{4})/, '$1-$2-$3'));
    }
    if (phoneNumber.length === 13) {
      setPhoneNumber(phoneNumber.replace(/-/g, '').replace(/(\d{3})(\d{4})(\d{4})/, '$1-$2-$3'));
    }
  }, [phoneNumber]);



  function ChangeName(event) {
    setName(event.target.value)
  }

  function ChangePhoneNumber(event) {
    const regex = /^[0-9\b -]{0,13}$/;
    if (regex.test(event.target.value)) {
      setPhoneNumber(event.target.value);
    }
    // setPhoneNumber(event.target.value)
  }

  function onSubmit({name, phoneNumber, password, email}) {
    const newData = { name: name.trim(), phoneNumber, password, email }
    const updateData = { name: name.trim(), phoneNumber, memberID }
    // case1: 회원가입 form
    if (!isUpdate) {
      axios ({
          url: drf.member.signup(),
          method: 'post',
          data: newData,
        })
          .then(res => {
            navigate('/login')
          })
          .catch(err => {
            if (err.response.data === "email error") {
              alert("이메일이 중복됩니다.")
            }
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
          alert('회원정보가 업데이트 되었습니다.')
          navigate('/main')
        })
        .catch(err => {
        })
    }
  }

  function goMain(event) {
    event.preventDefault();
    navigate('/main');
  }

  function goIntro(event) {
    event.preventDefault();
    navigate('/');
  }

  const check = watch().password;
  return (
    <div>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <FlexBox>
          <label className="label" htmlFor="name">이름</label>
          <input className="input"
            {...register("name", {
              required: "이름을 입력해주세요!",
            })}
            type="text"
            value={name}
            onChange={ChangeName}
          />
        </FlexBox>
        <FlexBox>
          <label className="label" htmlFor="phoneNumber" placeholder="숫자만 입력해주세요">휴대전화</label>
          <input className="input"
            {...register("phoneNumber", {
              required: "전화번호를 입력해주세요",
              pattern: {
                value: /^01([0|1|6|7|8|9])-?([0-9]{3,4})-?([0-9]{4})$/,
                message: "000-0000-0000 양식에 맞게 입력해주세요"
              },
            })}
            type="text"
            value={phoneNumber}
            onChange={ChangePhoneNumber}
          />
        </FlexBox>
        <>{ isUpdate ? null : 
          <>
            <FlexBox>
              <label className="label" htmlFor="email">이메일</label>
              <input className="input"
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
            </FlexBox>
            <FlexBox>
              <label className="label" htmlFor="password">비밀번호</label>
              <input className="input"
                {...register("password", {
                  required: "비밀번호를 입력해주세요",
                  minLength: {
                    value: 8,
                    message: "비밀번호를 8자리 이상으로 해주세요",
                  },
                })}
                type="password"
                placeholder="8자리 이상으로 적어주세요"
              />
            </FlexBox>
            <FlexBox>
              <label className="label" htmlFor="passwordCheck">비밀번호 확인</label>
              <input className="input"
                {...register("passwordConfirm", {
                  validate: (value) =>
                    value === check ? true : "비밀번호가 틀립니다",
                })}
                type="password"
                placeholder="한번 더 적어주세요"
              />
            </FlexBox>
          </>
        }</>
        <div style={{display: "flex", flexDirection: "column"}}>
          <ERROR>
            {errors?.name?.message ||
              errors?.phoneNumber?.message ||
              errors?.email?.message ||
              errors?.password?.message ||
              errors?.passwordConfirm?.message}
          </ERROR>
          <div style={{display: "flex", justifyContent: "space-between"}}>
            <div className="button">{ isUpdate ? <button className="gray__btn" onClick={(event) => goMain(event)}>취소</button> : <button className="gray__btn" onClick={(event) => goIntro(event)}>취소</button> }</div>
            
            <div className="button">{ isUpdate ? <button className="yellow__btn">회원정보 수정</button> : <button className="yellow__btn">회원가입</button> }</div>
          </div>
        </div>
      </Form>
    </div>
  );
}

export default SignupForm;
