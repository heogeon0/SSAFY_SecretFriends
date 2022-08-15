import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import MyChats from "../../components/chats/MyChats";

const Circle = styled.div`
  position: fixed;
  bottom: 125px;
  right: 15px;
  width: 50px;
  height: 50px;
  border-radius: 25px;
  background-color: black;
  :hover {
    cursor: pointer;
  }
  /* transform: translate(-100%, -100%); */
`;

const ChatBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  background-image: url("/img/background/pink.jpg");
  background-position: center;
  background-size: cover;
  bottom: 15px;

  right: 15px;
  width: 300px;
  height: 550px;
  border-radius: 25px;

  /* transform: translate(-100%, -100%); */
`;

function Chat({ socket, id }) {
  const [openChat, setOpenChat] = useState(false);
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
          <MyChats id={id} socket={socket} setOpenChat={setOpenChat} />
        </ChatBox>
      ) : (
        <Circle
          onClick={() => {
            setOpenChat((val) => !val);
          }}
        ></Circle>
      )}
    </>
  );
}

export default Chat;
