import React, { useEffect, useState } from "react";
import io from "socket.io-client";
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

const ChatBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-image: url("/img/background/green.jpg");
  background-position: center;
  background-size: cover;
  bottom: 20px;
  box-shadow: 0px 0px 15px #0000001f;

  right: 60px;
  width: 300px;
  height: 550px;
  border-radius: 25px;
  @media ${props => props.theme.mobile} {
    width: 200px;
    height: 360px;
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
  });
  return (
    <>
      {openChat ? (
        <ChatBox>
          <MyChats 
            id={id} socket={socket} setOpenChat={setOpenChat} 
            setAlarm={setAlarm}
          />
        </ChatBox>
      ) : (
        <Circle src="img/chat.png" alarm={alarm}
          onClick={() => {
            setOpenChat((val) => !val);
          }}
        ></Circle>
      )}
    </>
  );
}

export default Chat;
