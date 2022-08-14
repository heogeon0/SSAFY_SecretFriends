import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useBox, Physics } from "@react-three/cannon";

import React, { useEffect, useRef, useState } from "react";
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilValue,
} from "recoil";
import { useSetRecoilState } from "recoil";
import { childrenId } from "../atoms";

import iot from "../apis/iot";
import webapi from "../apis/webapi";
import axios from "axios";

import { Button } from "../components/Items/items";
import Character from "../components/ThreeModel/models/Character";

import Cloud from "../components/ThreeModel/factors/cloud";
import Plane from "../components/ThreeModel/factors/plane";
import Chats from "../components/Chats/Chats";
import Grass from "../components/ThreeModel/factors/grass";
import Photozone from "../components/ThreeModel/factors/Photo/photozone";
import { useNavigate } from "react-router-dom";

function Main() {
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  const name = useRecoilValue(childrenId);
  const [chats, setChats] = useState([]);
  const navigate = useNavigate();
  const takePhoto = () => {
    axios.get(iot.camera()).then((res) => {
      console.log(res);
    });
  };

  const helloChats = [
    "좋은아침이야",
    `${name}야 점심은 먹었어? 밥을 많이먹는게 중요하다고 들었어!`,
    `왜 안자고있어? 일찍 자야 키가 쑥쑥 큰다구! `,
    `내 주위에 있는 별과 하트를 눌러보면 재밌는 일이 생길거야!`,
  ];

  const setBasicChats = (name) => {
    return [
      {
        answerID: 99999,
        content: `오늘 치료도 화이팅!! 내가 응원할게`,
        isUsed: false,
        questionID: 0,
      },
      {
        answerID: 99998,
        content: `${name}이가 좋아하는 색이 있어? 나는 파란색을 좋아해! 마음이 편안해지는 느낌이야`,
        isUsed: false,
        questionID: 0,
      },
      {
        answerID: 99997,
        content: `나는 우주에서 온 ${name}야! 밤하늘의 별을 보면 내가 온 고향이 보이는건 비밀이야!`,
        isUsed: false,
        questionID: 0,
      },
      {
        answerID: 99996,
        content: `야채랑 과일을 많이 먹으면 더 튼튼해져!!`,
        isUsed: false,
        questionID: 0,
      },
      {
        answerID: 99995,
        content: `요즘 ${name}이가 좋아하는 만화는 뭐야?`,
        isUsed: false,
        questionID: 0,
      },
      {
        answerID: 99994,
        content: `나는 ${name}가 세상에서 제일 좋아! `,
        isUsed: false,
        questionID: 0,
      },
      {
        answerID: 99993,
        content: `어제보다 더  튼튼보인다    앞으로도 열심히 치료 받자!!`,
        isUsed: false,
        questionID: 0,
      },

      {
        answerID: 99992,
        content: `용감한 ${name}   내가 본 사람중에 ${name}가 제일 멋져`,
        isUsed: false,
        questionID: 0,
      },
    ];
  };

  useEffect(() => {
    // 첫인사

    // if (!childernId) {
    //   navigate("/");
    // }
    console.log(name);
    const now = new Date().getHours();
    let chat = "";
    // if (count == 0) {
    //   chat = helloChats[3];
    // }
    if (now <= 9) {
      chat = helloChats[0];
    } else if (now < 16) {
      chat = helloChats[1];
    } else {
      chat = helloChats[2];
    }

    axios.get(iot.tts(chat));

    // 컴포넌트 대화말

    const basicChats = setBasicChats(name);

    axios.get(webapi.answers.answer(7)).then((res) => {
      const newChats = [];
      for (let i = 0; i < res.data.length; i++) {
        if (!res.data[i].isUsed) {
          newChats.push(res.data[i]);
        }
        if (newChats.length > 3) break;
      }
      console.log(basicChats);
      for (let j = 0; j < basicChats.length; j++) {
        const randomNum = Math.floor(Math.random() * basicChats.length);
        const content = basicChats.slice(randomNum, randomNum + 1);

        newChats.push(content[0]);
        if (newChats.length + chats.length >= 7) {
          break;
        }
      }
      console.log(newChats);
      setChats(newChats);
    });
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
      <Canvas
        camera={{ fov: 100, position: [0, 0.5, 3] }}
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
          position: "relative",
          // backgroundImage: "url('/bgimg.png')",
          // backgroundPosition : 'center',
          // backgroundSize : 'cover'
        }}
      >
        <RecoilBridge>
          {/* fov : 카메라 확대 정도 */}
          <Stars />
          {/* 궤도 추가 */}
          {/* 조명추가 */}
          <spotLight position={[0, 10, 20]} angle={1} />
          <Physics>
            <Character position={[0, -2, 0]} />
            <Chats chats={chats} setChats={setChats} />
          </Physics>
        </RecoilBridge>
      </Canvas>
      <Button bottom={"5%"} left={"10%"} onClick={() => navigate("/diary")}>
        오늘의 그림일기를 그려주세요!
      </Button>
      <Button bottom={"5%"} left={"55%"} onClick={() => takePhoto()}>
        친구와 함께 사진찍어요!
      </Button>
      <Button bottom={"11%"} left={"75%"} width={"15%"}>
        종료
      </Button>
    </div>
  );
}

export default Main;
