import styled from "styled-components";
import Wrapper from "./styles/Form";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { Chats } from "../../atom";
import ChatList from "./ChatList";

const Input = styled.input`
  display: block;
  width: 100%;
  height: 100%;
`;

const Grid = styled.div`
  display: grid;
  grid-template-rows: 1fr 4fr;
  grid-template-columns: 1fr;
  grid-gap: 30px;
  margin-top: 1000px;
  margin-bottom: 10px;
  height: 97%;
  .title {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

  .content {
    overflow-y: scroll;
    background-color: ${(props) => props.theme.yellowColor};
    height: 25px;
    font-family: ${(props) => props.theme.namingFont};
    background: linear-gradient(
      ${(props) => props.theme.yellowColor},
      ${(props) => props.theme.grayColor}
    );
    border: ${(props) => props.theme.yellowColor} 1px solid;
  }
`;

function Conversation() {
  const NewChat = useRecoilValue(Chats);
  const setChat = useSetRecoilState(Chats);
  function onSubmit(event) {
    console.log(NewChat);
    event.preventDefault();
    console.log();
    const chat = event.target[0].value;
    setChat((oldValue) => [...oldValue, { chat, id: Date.now() }]);
    event.target[0].value = "";
  }
  return (
    <Wrapper>
      <h2>아이에게 하고싶은 말을 적어주세요</h2>
      <Grid>
        <div className="title">
          <p>응원의 말 들을 적어주세요</p>
          <form onSubmit={onSubmit}>
            <Input type="text" />
          </form>
        </div>
        <div className="content">
          <ChatList />
        </div>
      </Grid>
    </Wrapper>
  );
}

export default Conversation;
