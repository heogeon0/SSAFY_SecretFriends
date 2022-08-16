import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import { useSetRecoilState, useRecoilState } from "recoil";
import { MemberID } from "../../atom";

const Wrapper = styled.div`
  width: 90%;
  height: 95%;
  border-radius: 25px;

  .gridBox {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 6fr 1fr;

    .grid__top {
      margin: 25px 5px 5px;
      background-color: rgba(255, 255, 255, 0.342);
      border-radius: 5px;
      padding: 1vw;
      overflow-y: scroll;
    }
    .grid__input {
      width: 100%;
      height: 30px;
      margin: 5px 0 5px 5px;
      padding: 5px;
      background-color: rgba(255, 255, 255, 0.719);
      border: none;
      border-radius: 5px;

      font-family: ${props => props.theme.pretendard};
      word-break: break-all;
      white-space: pre-line;
      @media ${props => props.theme.mobile} {
        height: 25px;
      }
    }
  }
`;

const CloseBtn = styled.i`
  position: absolute;
  right: 15px;
  border: none;
  background-color:transparent;
  font-size: 16px;
  color: #04200496;
  font-weight: bold;
  :hover {
    cursor: pointer;
  }
`

const SendImg = styled.img`
  :hover {
    cursor: pointer;
  }
`

// 채팅 box
const ChildContent = styled.div`
  float: left;
  font-size: min(1.5vw, 1rem);
  font-family: ${props => props.theme.pretendard};
  
  margin: 5px;
  padding: 5px 8px;
  width: 70%;
  border-radius: 5px;
  box-shadow: 3px 3px 3px #dbdbdb;
  background-color: #c3f7c1;
  @media ${props => props.theme.mobile} {
    font-size: min(1.3vw, 1rem);
  }
`

const ParentContent = styled.div`
  float: right;
  font-family: ${props => props.theme.pretendard};
  font-size: min(1.5vw, 1rem);
  text-align: right;
  
  margin: 5px;
  padding: 5px 8px;
  width: 70%;
  border-radius: 5px;
  box-shadow: 3px 3px 3px #dbdbdb;
  background-color: #f7f3c1;
  @media ${props => props.theme.mobile} {
    font-size: min(1.3vw, 1rem);
  }
`

// const socket = io.connect("http://localhost:4000");
function MyChats({ name, socket, setOpenChat, setAlarm }) {
  // useEffect(() => {
  //   socket.on("connect", function () {
  //     console.log("소켓이 바뀝니다" + name);
  //     name = JSON.parse(name);
  //     socket.emit("newUser", name);
  //   });
  // }, []);

  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");
  const [memberID, setMemberId] = useRecoilState(MemberID);
  const [test, setTest] = useState([{type: 0, content: "1"}, {type:1, content: "2"}, {type: 0, content: "3"}]);

  const sendMessageHandler = (e) => {
    e.preventDefault();
    // 수정해야할 부분
    const messageToken = {
      // memberId 를 다른 키로
      memberID: 8,
      message: message,
    };
    setTest((val) => [...val, message])
    socket.emit("chat message", messageToken);
    setMessage("");
  };

  useEffect(() => {
    socket.on("newUser", (msg) => {
      setChat([...chat, msg]);
      setAlarm("#f37e91")
    });
    socket.on("chat message", (msg) => {
      console.log(msg);
      setChat([...chat, msg]);
      console.log(chat);
    });
    socket.on("disconnected", (msg) => {
      setChat([...chat, msg]);
      setAlarm("white")
    });
  }, [chat]);

  return (
    <Wrapper>
      <CloseBtn onClick={() => setOpenChat((val) => !val)} className="fa-solid fa-xmark"></CloseBtn>
      <CloseBtn onClick={() => setOpenChat((val) => !val)} className="fa-solid fa-xmark"></CloseBtn>
      <div className="gridBox">
        <div className="grid__top">
          <div>
            {test.map((data, idx) => {
              return (<div key={idx}>
                {data.type === 1 ? <ParentContent>{data.content}</ParentContent> : <ChildContent>{data.content}</ChildContent>}
              </div>)
            })}
          </div>
        </div>
        <form style={{height: "100%", position: "relative"}} onSubmit={sendMessageHandler}>
          <hr />
          <div style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
            <input className="grid__input" value={message} onChange={(e) => setMessage(e.target.value)} type="text" />
            <SendImg style={{height: "25px"}} src="img/send.png" onClick={sendMessageHandler} alt="" />
          </div>
        </form>
      </div>
    </Wrapper>
  );
}

export default MyChats;
