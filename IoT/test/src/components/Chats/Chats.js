import { useRecoilState, useRecoilValue } from "recoil";
import { basicChats, childrenId } from "../../atoms";

import axios from "axios";
import iot from "../../apis/iot";
import React, { useEffect } from "react";

import Star from "../ThreeModel/models/Star";
import Heart from "../ThreeModel/models/Heart";
import Heart_Outline from "../ThreeModel/models/Heart_Outline";
import Coin from "../ThreeModel/models/Coin";

function Chats({ chats, setChats, childernId }) {
  useEffect(() => {
    // const newChat = [];
    // for (let j = 0; j < basicChats.length; j++) {
    //   const randomNum = Math.floor(Math.random() * basicChats.length);
    //   const content = basicChats.slice(randomNum, randomNum + 1);
    //   const temp = { answerID: Date.now(), content: content, isUsed: false };
    //   newChat.push(temp);
    //   if (newChat.length + chats.length >= 7) {
    //     newChat.push(...chats);
    //     break;
    //   }
    // }
    // console.log(newChat);
    // setChats((val) => [...val, newChat]);
    // setChats(newChat);
  }, []);
  const starPosition = [
    { px: 1.2, py: 2.4, pz: 0, rx: 0, ry: 0, rz: 0, scale: 0.4 },
    { px: 1.2, py: 0.2, pz: 0, rx: 0, ry: 0, rz: 3, scale: 0.2 },
    { px: 1.8, py: -0.6, pz: 0, rx: 3, ry: 0, rz: 0, scale: 0.7 },
    { px: -1.7, py: 0.5, pz: 0, rx: 3, ry: 0, rz: 0, scale: 0.4 },
    { px: -1.8, py: 2.2, pz: 0, rx: 0, ry: 0, rz: 0.2, scale: 0.6 },
    { px: 1.8, py: 1, pz: 0, rx: 0, ry: 0, rz: 0.7, scale: 0.4 },
    { px: -1.6, py: -1.3, pz: 0, rx: 0, ry: 0, rz: 0.7, scale: 0.4 },
  ];

  const updateChat = (id) => {
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
    setChats(newChat);
  };
  return (
    <>
      {chats.map((chat, idx) => {
        if (!chat.isUsed) {
          if (idx < 4) {
            return (
              <Star
                key={chat.answerID}
                chat={chat}
                updateChat={updateChat}
                setPosition={starPosition[idx]}
              />
            );
          } else if (idx < 6) {
            return (
              <Heart
                key={chat.answerID}
                chat={chat}
                updateChat={updateChat}
                setPosition={starPosition[idx]}
              />
            );
          } else {
            return (
              <Coin
                key={chat.answerID}
                chat={chat}
                updateChat={updateChat}
                setPosition={starPosition[idx]}
              />
            );
          }
        }
      })}
    </>
  );
}

export default React.memo(Chats);
