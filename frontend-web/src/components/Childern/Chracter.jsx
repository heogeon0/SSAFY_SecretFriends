import styled from "styled-components";


const Card = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 50%;
  padding: 10px;
`;


const Title = styled.div`
  font-size: min(4vw, 2rem);
  font-weight: bold;
  margin-bottom: 2vw;
  @media ${props => props.theme.mobile} {
    font-size: min(1vw, 1rem);
  }
`
const Text = styled.div`
  margin-top: 0.5vw;
  color: black;
  font-size: min(4vw, 1rem);
  @media ${props => props.theme.mobile} {
    font-size: min(1vw, 1rem);
  }
`;

const CharacterForm = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;
  .CharacterCard {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-evenly;
    border-radius: 10px;
    margin-top: 1rem;
  }
`;

const CharacterName = styled.div`
  font-size: min(1.5vw, 2rem);
  font-weight: bold;
`

const InputTag = styled.input`
  padding: 10px;
  background-color: ${(props) => props.theme.grayColor};
  border: ${(props) => props.theme.grayColor} 1px solid;
  height: 2.5rem;
  width: 80%;
  border-radius: 5px;
  @media ${props => props.theme.mobile} {
    height: 1.6rem;
  };
`

function Character({ characterName, setCharacterName }) {
  function onChange(event) {
    setCharacterName(event.target.value);
  }
  return (
    <>
      <CharacterForm>
        <div className="CharacterCard">
          <img src="/img/characters/character1.png" width="30%" />
          <Card>
            <Title>SPACE-N08</Title>
            <Text>친구를 찾아서 우주를 떠도는 외계인</Text>
            <Text>N08의 친구가 되어주세요!</Text>
          </Card>
        </div>
        <Card>
          <label htmlFor="cname">
            <CharacterName style={{ color: "black", textAlign: "left", margin: "1vw 0 1vw 0" }}>
              캐릭터 별명을 지어주세요
            </CharacterName>
          </label>
          <InputTag type="text" value={characterName} onChange={onChange} />
        </Card>
      </CharacterForm>
    </>
  );
}

export default Character;
