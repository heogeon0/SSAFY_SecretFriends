import Wrapper from "./styles/Form";
import styled from "styled-components";

const DateInput = styled.input`

`

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
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
      <FlexBox>
        <label htmlFor="name">아이 이름</label>
        <input id="name" type="text" onChange={ChangeName} value={name} />
      </FlexBox>
      <FlexBox>
        <label htmlFor="name">아이 별명</label>
        <input id="name" type="text" onChange={ChangeNick} value={nickName} />
      </FlexBox>
      <FlexBox>
        <label htmlFor="birth">생년월일</label>
        <DateInput id="birth" type="date" onChange={ChangeBirth} value={birth} />
      </FlexBox>
      <FlexBox>
        <label htmlFor="admission">입원일자</label>
        <DateInput
          id="admission"
          type="date"
          onChange={ChangeAdmission}
          value={admission}
        />
      </FlexBox>
    </Wrapper>
  );
}

export default Information;
