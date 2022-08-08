import { useRecoilState } from "recoil";
import { basicChats } from "../../atoms";

import axios from "axios";
import iot from "../../apis/iot";

import Star from "../ThreeModel/models/Star";
import Heart from "../ThreeModel/models/Heart";
import Heart_Outline from "../ThreeModel/models/Heart_Outline";
import React from "react";

function Chats() {
  const [chats, setChats] = useRecoilState(basicChats);

  const onClick = (id, c) => {
    console.log(id);
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
  const threeChat = () => {
    const result = chats.map((data) => {
      if (data.isUsed === false) {
        const minx = -15;
        const maxx = 15;
        const miny = -3;
        const maxy = 4;
        const minz = -5;
        const maxz = 3;

        const x = Math.floor(Math.random() * (maxx - minx) + minx);
        const y = Math.floor(Math.random() * (maxy - miny) + miny);
        const z = Math.floor(Math.random() * (maxz - minz) + minz);
        const type = Math.floor(Math.random() * 2);
        const items = [
          <Star
            key={[x, y, z]}
            position={[x, y, z]}
            onClick={() => onClick(data.answerID, data.content)}
          />,
          <Heart
            key={[z, x, y]}
            position={[x, y, z]}
            onClick={() => onClick(data.answerID, data.content)}
          />,
          // <Heart_Outline position ={[x,y,z]} onClick={()=>onClick(data.id)}/>,
        ];
        return items[type];
      } else {
        return null;
      }
    });
    // console.log(result)
    return result;
  };

  return <>{threeChat()}</>;
}

export default React.memo(Chats);
