import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { useRecoilState, useRecoilValue } from "recoil";
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
      .parent__chat {
        font-family: ${props => props.theme.pretendard};
        font-size: 16px;
        text-align: right;
        display: inline-block;

        margin: 5px;
        padding: 5px 8px;
        border-radius: 5px;
        box-shadow: 3px 3px 3px #dbdbdb;
        background-color: #f7f3c1;
        @media ${props => props.theme.mobile} {
          font-size: min(1.3vw, 1rem);
        }
      }
      .child__chat {
        font-size: 16px;
        display: inline-block;
        font-family: ${props => props.theme.pretendard};

        margin: 5px;
        padding: 5px 8px;
        border-radius: 5px;
        box-shadow: 3px 3px 3px #dbdbdb;
        background-color: #c3f7c1;
        @media ${props => props.theme.mobile} {
          font-size: min(1.3vw, 1rem);
        }
      }
      .talk__time {
        font-size: 4px;
        margin-bottom: 5px;
        color: gray;
      }
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
  .closeBtn {
    position: absolute;
    right: 15px;
    border: none;
    background-color:transparent;
    font-size: 16px;
    color: #0000005f;
    font-weight: bold;
    :hover {
      cursor: pointer;
    }
  }
`;

const SendImg = styled.img`
  :hover {
    cursor: pointer;
  }
`


function MyChats({ name, socket, setOpenChat, setAlarm }) {
  const [chat, setChat] = useState([]);
  const [readyChat, setReadyChat] = useState({});
  const [message, setMessage] = useState("");
  const memberID = useRecoilValue(MemberID);
  const [test, setTest] = useState([
    {type: 0, content: "1", day: getDate(new Date()), time: getTime(new Date())}, 
    {type:1, content: "2", day: getDate(new Date()), time: getTime(new Date())}, 
    {type: 0, content: "3", day: getDate(new Date()), time: getTime(new Date())}, 
    {type: 1, content: "안녕하세요", day: getDate(new Date()), time: getTime(new Date())}
  ]);

  const sendMessageHandler = (e) => {
    e.preventDefault();
    // 수정해야할 부분
    const messageToken = {
      // memberId 를 다른 키로
      memberID: memberID,
      message: message,
    };
    // test용
    setTest((val) => [...val, {type: 0, content: message, day: getDate(new Date()), time: getTime(new Date())}])
    console.log(test)
    socket.emit("chat message", messageToken);
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
      // 아이 소켓 접속여부 확인
      setAlarm("#f37e91");
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
      setAlarm("white")
    });
  }, []);

  useEffect(() => {
    console.log(readyChat);
    setChat((val) => [...val, readyChat]);
  }, [readyChat]);


  function getDate (day) {
    var year = day.getFullYear();
    var month = ('0' + (day.getMonth() + 1)).slice(-2);
    var day = ('0' + day.getDate()).slice(-2);
    
    var dateString = year + '-' + month  + '-' + day;
    return dateString;
  }
  function getTime (day) {
    var hours = ('0' + day.getHours()).slice(-2); 
    var minutes = ('0' + day.getMinutes()).slice(-2);
    var seconds = ('0' + day.getSeconds()).slice(-2); 

    if (hours >= 12) {
      var timeString = '오후 ' + hours + ':' + minutes;
    }
    else {
      var timeString = '오전 ' + hours + ':' + minutes;
    }
    // var timeString = hours + ':' + minutes  + ':' + seconds;
    return timeString;
  }


  return (
    <Wrapper>
      <img src="img/logo/gray_mixed.jpg" style={{position: "absolute", height: "8%", borderRadius: "25px"}} alt="" />
      <i onClick={() => setOpenChat((val) => !val)} className="fa-solid fa-xmark closeBtn"></i>
      <div className="gridBox">
        <div className="grid__top">
          <div>
            {test.map((data, idx) => {
              return (
                <div key={idx}>
                  {data.type === 0
                  ? <div style={{display: "flex", justifyContent: "flex-end", alignItems: "flex-end"}}>
                      <span className="talk__time">{data.time}</span>
                      <span className="parent__chat">{data.content}</span>
                    </div>
                  : <div style={{display: "flex", alignItems: "flex-end"}}>
                      <span className="child__chat">{data.content}</span>
                      <span className="talk__time">{data.time}</span>
                    </div>
                  }
                </div>
              )
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
