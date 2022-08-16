import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import styled from "styled-components";
import { useSetRecoilState, useRecoilState } from "recoil";
import { MemberID } from "../../atom";

const Wrapper = styled.div`
  width: 95%;
  height: 95%;
  border-radius: 25px;
  background-color: ${(props) => props.theme.whiteColor};

  .gridBox {
    height: 100%;
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 6fr 1fr;
  }
  /* .grid__top {
    overflow-y: scroll;
  } */
`;

// const socket = io.connect("http://localhost:4000");
function MyChats({ name, socket, setOpenChat }) {
  // useEffect(() => {
  //   socket.on("connect", function () {
  //     console.log("소켓이 바뀝니다" + name);
  //     name = JSON.parse(name);
  //     socket.emit("newUser", name);
  //   });
  // }, []);

  const [chat, setChat] = useState([]);
  const [readyChat, setReadyChat] = useState({});
  const [message, setMessage] = useState("");
  const [memberID, setMemberId] = useRecoilState(MemberID);

  const sendMessageHandler = () => {
    // 수정해야할 부분
    console.log(message);
    const messageToken = {
      // memberId 를 다른 키로
      memberID: 8,
      message: message,
    };
    console.log(messageToken);
    socket.emit("chat message", messageToken);
    console.log(message);
    setMessage("");
  };

  useEffect(() => {
    socket.on("newUser", (msg) => {
      console.log(msg?.message);
      console.log(readyChat);
      console.log(readyChat?.message);
      if (msg?.message !== readyChat?.message) {
        setReadyChat(msg);
      }
    });
    socket.on("chat message", (msg) => {
      console.log(msg?.message);
      console.log(readyChat?.message);
      if (msg?.message !== readyChat?.message) {
        setReadyChat(msg);
      }
    });
    socket.on("disconnected", (msg) => {
      console.log(msg?.message);
      console.log(readyChat?.message);
      if (msg?.message !== readyChat?.message) {
        setReadyChat(msg);
      }
    });
  }, []);

  useEffect(() => {
    console.log(readyChat);
    setChat((val) => [...val, readyChat]);
  }, [readyChat]);

  return (
    <Wrapper>
      <button onClick={() => setOpenChat((val) => !val)}>X</button>
      <div className="gridBox">
        <div className="grid__top">
          <ul>
            {chat.map((data, idx) => {
              return <li key={idx}>{data.message}</li>;
            })}
          </ul>
        </div>
        <div>
          <input value={message} onChange={(e) => setMessage(e.target.value)} />
          <button onClick={sendMessageHandler}>Send Message</button>
        </div>
      </div>
    </Wrapper>
  );
}

export default MyChats;
