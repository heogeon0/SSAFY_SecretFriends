import styled from "styled-components";

import ChatList from "./ChatList";

import axios from "axios";
import drf from "../../api/drf";

import { useEffect } from "react";
import { useSetRecoilState } from "recoil";
import { Chats } from "../../atom";


const Input = styled.input`
  display: block;
  padding: 10px;
  width: 100%;
  height: 100%;
  background-color: ${(props) => props.theme.grayColor};
  height: 2.5rem;
  font-family: ${(props) => props.theme.namingFont};
  border: ${(props) => props.theme.grayColor} 1px solid;
  border-radius: 5px;
  margin-bottom: 1rem;
  @media ${props => props.theme.mobile} {
    height: 1.6rem;
  };
`;

const Title = styled.div`
  font-family: ${(props) => props.theme.questionFont};
  font-size: min(3vw, 2rem);
  font-weight: bold;
  margin: 1rem 0 0.8rem;
`

const Button = styled.button`
  padding: 0.3rem 0.8rem;
  float: right;
  margin-left: 6px;
  font-family: ${(props) => props.theme.pretendard};
  background-color: #cde6d9;
  border: none;
  border-radius: 4vw;
  :hover {
    cursor: pointer;
  }
`

const Grid = styled.div`
  display: grid;
  grid-template-rows: 1fr 3fr;
  grid-template-columns: 1fr;
  grid-gap: 30px;
  @media ${props => props.theme.mobile} {
    grid-template-rows: 50px 3fr;
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
  const setChats = useSetRecoilState(Chats);
  
  function onSubmit(event) {
    event.preventDefault();
    const chat = event.target[0].value;
    setChats((old) => [...old, chat])
    event.target[0].value = "";
  }

  useEffect(() => {
    axios ({
      url: drf.question.questions(),
      method: 'get',
    })
    .then((res) => {
    })
    .catch((err) => {
    })
  })
  
  return (
    <>
      <Title>아이에게 하고싶은 말을 작성해주세요.</Title>
      <Grid>
        <div>
          <form onSubmit={onSubmit}>
            <Input type="text" />
            <Button>등록하기</Button>
          </form>
        </div>
        <div className="content">
          <ChatList />
        </div>
      </Grid>
    </>
  );
}

export default Conversation;
