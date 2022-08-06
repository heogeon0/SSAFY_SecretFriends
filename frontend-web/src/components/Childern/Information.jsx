import Wrapper from "./styles/Form";
import styled from "styled-components";

const DateInput = styled.input`
  /* :hover{
    cursor: pointer;
  } */
`

function Information({
  name,
  setName,
  nickName,
  setNickName,
  birth,
  setBirth,
  admission,
  setAdmission,
}) {
  function ChangeName(event) {
    setName(event.target.value);
  }
  function ChangeNick(event) {
    setNickName(event.target.value);
  }
  function ChangeBirth(event) {
    setBirth(event.target.value);
  }
  function ChangeAdmission(event) {
    setAdmission(event.target.value);
  }
  

  return (
    <Wrapper>
      <h2>아이 정보 입력하기</h2>
      <p>아이의 정보를 입력해주세요</p>
      <div>
        <label htmlFor="name">아이 이름 : </label>
        <input id="name" type="text" onChange={ChangeName} value={name} />
      </div>
      <div>
        <label htmlFor="name">아이 별명 : </label>
        <input id="name" type="text" onChange={ChangeNick} value={nickName} />
      </div>
      <div>
        <label htmlFor="birth">생년 월일 : </label>
        <DateInput id="birth" type="date" onChange={ChangeBirth} value={birth} />
      </div>
      <div>
        <label htmlFor="admission">입원 일자 : </label>
        <DateInput
          id="admission"
          type="date"
          onChange={ChangeAdmission}
          value={admission}
        />
      </div>
    </Wrapper>
  );
}

export default Information;
