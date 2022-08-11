import styled from "styled-components";

import axios from "axios";
import drf from "../../api/drf";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";


const ERROR = styled.div`
  text-align: center;
  font-size: min(2vw, 1rem);
  font-family: ${(props) => props.theme.standardFont};
  color: #c23616;
  margin: min(0.8vw, 1rem) 0 min(2vw, 1rem) 0;
`;

const ButtonWrap = styled.div`
  display: flex;
  flex-direction: column;
`;

const BtnFlex = styled.div`
  display: flex;
  justify-content: space-between;
`
const LabelTag = styled.label`
  text-align: left;
  line-height: 2vw;
  font-size: min(3vw, 1rem);
  /* margin-bottom: min(0.1vw, 10px); */
  @media ${props => props.theme.mobile} {
    margin-bottom: min(0.5vw, 10px);
  };
  `

const InputTag = styled.input`
  background-color: ${(props) => props.theme.grayColor};
  border: ${(props) => props.theme.grayColor} 1px solid;
  height: 2.5rem;
  /* margin-bottom: min(5vw, 0.8rem); */
  border-radius: 5px;
  @media ${props => props.theme.mobile} {
    height: 1.6rem;
    margin-bottom: 3vw;
  };
`

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
`
const GrayBtn = styled.button`
  font-size: min(3vw, 1rem);
  font-family: ${(props) => props.theme.formFont};
  padding: 0.6vw 1vw;
  line-height: 50%;
  border: none;
  background-color: ${(props) => props.theme.grayColor};
  border-radius: 2vw;
  :hover {
    cursor: pointer;
  }
  @media ${props => props.theme.mobile} {
    padding: 2vw;
    border-radius: 12px;
  }
`

const YellowBtn = styled.button`
  font-size: min(3vw, 1rem);
  font-family: ${(props) => props.theme.formFont};
  padding: 0.6vw 1vw;
  line-height: 50%;
  border: none;
  background-color: ${(props) => props.theme.yellowColor};
  border-radius: 2vw;
  :hover {
    cursor: pointer;
  }
  @media ${props => props.theme.mobile} {
    padding: 2vw;
    border-radius: 12px;
  }
`
const Form = styled.form`
  display : flex;
  flex-direction: column;
  font-family: ${(props) => props.theme.formFont};
  padding: 2vw 2vw 1vw 2vw;
  margin-bottom: 1vw;
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

  function ChangeName(event) {
    setName(event.target.value)
  }

  function ChangePhoneNumber(event) {
    setPhoneNumber(event.target.value)
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
          navigate('/main')
        })
        .catch(err => console.log(err))
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
          <LabelTag htmlFor="name">이름</LabelTag>
          <InputTag
            {...register("name", {
              required: "이름을 입력해주세요!",
            })}
            type="text"
            value={name}
            onChange={ChangeName}
          />
        </FlexBox>
        <FlexBox>
          <LabelTag htmlFor="phoneNumber" placeholder="숫자만 입력해주세요">휴대전화</LabelTag>
          <InputTag
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
              <LabelTag htmlFor="email">이메일</LabelTag>
              <InputTag
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
              <LabelTag htmlFor="password">비밀번호</LabelTag>
              <InputTag
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
              <LabelTag htmlFor="passwordCheck">비밀번호 확인</LabelTag>
              <InputTag
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
        <ButtonWrap>
          <ERROR>
            {errors?.name?.message ||
              errors?.phoneNumber?.message ||
              errors?.email?.message ||
              errors?.password?.message ||
              errors?.passwordConfirm?.message}
          </ERROR>
          <BtnFlex>
            <div>{ isUpdate ? <GrayBtn onClick={(event) => goMain(event)}>취소</GrayBtn> : <GrayBtn onClick={(event) => goIntro(event)}>취소</GrayBtn> }</div>
            
            <div>{ isUpdate ? <YellowBtn>회원정보 수정</YellowBtn> : <YellowBtn>회원가입</YellowBtn> }</div>
          </BtnFlex>
        </ButtonWrap>
      </Form>
    </div>
  );
}

export default SignupForm;
