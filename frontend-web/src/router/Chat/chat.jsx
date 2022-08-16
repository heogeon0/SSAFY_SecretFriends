import Wrapper from "./styles";

import React, { useEffect, useState } from "react";
import styled from "styled-components";
import MyChats from "../../components/chats/MyChats";

const Circle = styled.img`
  position: fixed;
  bottom: 45px;
  right: 60px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: ${props => props.alarm};
  background-image: url("img/chat.png");
  :hover {
    cursor: pointer;
  }
  z-index: 9999;
`;


function Chat({ socket, id }) {
  const [openChat, setOpenChat] = useState(false);
  // 아이가 소켓에 들어왔는지 여부 확인
  // 들어왔으면: #f37e91 아니면: white
  const [alarm, setAlarm] = useState("white");  

  const name = { memberID: 8 };
  useEffect(() => {
    socket.on("connect", function () {
      console.log("소켓이 바뀝니다" + name);
      socket.emit("newUser", name);
    });
  }, []);
  return (
    <Wrapper>
      {openChat ? (
        <div className="chat-box">
          <MyChats 
            id={id} socket={socket} setOpenChat={setOpenChat} 
            setAlarm={setAlarm}
          />
        </div>
      ) : (
        <Circle src="img/chat.png" alarm={alarm}
          onClick={() => {
            setOpenChat((val) => !val);
          }}
        ></Circle>
      )}
    </Wrapper>
  );
}

export default Chat;
