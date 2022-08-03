import styled from "styled-components";
import Wrapper from "./styles/Form";

const Circle = styled.div`
  background-image: url("img/n208character.png");
  background-position: center;
  background-size: cover;
`;

const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 100%;
  height: 50%;
  padding: 10px;
`;

const Text = styled.div`
  margin-top: 10px;
  color: black;
  font-size: 13px;
`;

const CharacterForm = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .CharacterCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    width: 30%;
    height: 70%;
    border-radius: 10px;
  }
  .Circle {
    width: 60%;
    padding-bottom: 60%;
    border-radius: 60%;
  }
`;

function Character({ characterName, setCharacterName }) {
  function onChange(event) {
    setCharacterName(event.target.value.trim());
  }
  return (
    <Wrapper>
      <h2>캐릭터를 선택해주세요</h2>
      <p>아이와 대화할 캐릭터를 선택해주세요</p>
      <CharacterForm>
        <div className="CharacterCard">
          {/* <Circle className="Circle"></Circle> */}
          <img src="/img/n208character.png" width="50%" />
          <Card>
            <h4>이름 : SPACE-N08</h4>
            <Text>친구를 찾아서 우주를 떠돌던 N08(공팔)</Text>
          </Card>
        </div>
        <div>
          <label htmlFor="cname">
            <p style={{ color: "black", textAlign: "left" }}>
              캐릭터 별명을 지어주세요
            </p>
          </label>
          <input type="text" value={characterName} onChange={onChange} />
        </div>
      </CharacterForm>
    </Wrapper>
  );
}

export default Character;
