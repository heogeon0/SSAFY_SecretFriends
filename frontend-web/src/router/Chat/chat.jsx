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
  background-color: ${(props) => props.alarm};
  background-image: url("img/chat.png");
  :hover {
    cursor: pointer;
  }
  z-index: 9999;
`;

const RedCircle = styled.div`
  position: fixed;
  bottom: 45px;
  right: 65px;
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background-color: red;
  z-index: 9999;
`
const WhiteCircle = styled.div`
  position: fixed;
  bottom: 50.52px;
  right: 70.52px;
  width: 4px;
  height: 4px;
  border-radius: 50%;
  background-color: white;
  z-index: 9999;
`

function Chat({ socket, id }) {
  const [openChat, setOpenChat] = useState(false);
  // 아이가 소켓에 들어왔는지 여부 확인
  // 들어왔으면: #f37e91 아니면: white
  const [alarm, setAlarm] = useState("white");
  const [isActive, setIsActive] = useState(false);

  const name = { memberID: 8 };

  useEffect(() => {
    socket.on("newUser", (msg) => {
      setAlarm("#f37e91");
      setIsActive(true)
    });
    socket.on("disconnected", (msg) => {
      setAlarm("white");
      setIsActive(false)
    });
  }, []);

  return (
    <Wrapper>
      {openChat ? (
        <div className="chat-box">
          <MyChats
            id={id}
            socket={socket}
            setOpenChat={setOpenChat}
            setAlarm={setAlarm}
            setIsActive={setIsActive}
          />
        </div>
      ) : (
        <div>
          <Circle
            src="img/chat.png"
            alarm={alarm}
            onClick={() => {
              setOpenChat((val) => !val);
            }}
          ></Circle>
          { isActive 
          ? <>
              <RedCircle></RedCircle>
              <WhiteCircle></WhiteCircle>
            </> 
          : null}
        </div>
      )}
    </Wrapper>
  );
}

export default Chat;
