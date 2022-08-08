import { useRecoilState } from "recoil";
import { basicChats } from "../../atoms";

import axios from "axios";
import iot from "../../apis/iot";
import React from "react";

import Star from "../ThreeModel/models/Star";
import Heart from "../ThreeModel/models/Heart";
import Heart_Outline from "../ThreeModel/models/Heart_Outline";

function Chats() {
  const [chats, setChats] = useRecoilState(basicChats);

  const onClick = (id, c) => {
    console.log(c);
    axios.get(iot.tts(c)).then((res) => {
      console.log(res.data);
    });
    const newChat = chats.map((data) => {
      if (data.answerID === id) {
        return {
          ...data,
          isUsed: true,
        };
      } else {
        return data;
      }
    });
    console.log(newChat);
    setChats(newChat);
  };

  return (
    <>
      {chats.map((chat, idx) => {
        if (idx <= 5) {
          return <Star key={chat.answerID} chat={chat} />;
        } else {
          return <Heart key={chat.answerID} chat={chat} />;
        }
      })}
    </>
  );
}

export default React.memo(Chats);
