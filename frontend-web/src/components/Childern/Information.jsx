import Wrapper from "./styles/Form";

function Information({ setName, setNickName, setBirth, setAdmission }) {
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
      <p>아이의 정보를 입력해주세요</p>
      <div>
        <label htmlFor="name">아이 이름 : </label>
        <input id="name" type="text" onChange={ChangeName} />
      </div>
      <div>
        <label htmlFor="name">아이 별명 : </label>
        <input id="name" type="text" onChange={ChangeNick} />
      </div>
      <div>
        <label htmlFor="birth">생년 월일 : </label>
        <input id="birth" type="date" onChange={ChangeBirth} />
      </div>
      <div>
        <label htmlFor="admission">입원 일자 : </label>
        <input id="admission" type="date" onChange={ChangeAdmission} />
      </div>
    </Wrapper>
  );
}

export default Information;
