import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useBox, Physics } from "@react-three/cannon";

import React, { useEffect, useRef, useState } from "react";
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilValue,
} from "recoil";
import { useSetRecoilState } from "recoil";
import { basicChats, childrenId } from "../atoms";

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

function Main() {
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  const childernId = useRecoilValue(childrenId);
  const setChats = useSetRecoilState(basicChats);

  const helloChats = [
    "좋은아침이야",
    "점심은 먹었어? 난 메밀 소바를 먹을생각이야",
    "벌써 저녁이야! 하루 시간가는 줄 모르겠어",
  ];
  const instructChate = [" 별이랑 하트를 눌러봐!"];
  // memberId 넣어야함
  useEffect(() => {
    const now = new Date().getHours();
    console.log(now);
    let chat = "";
    if (now <= 9) {
      chat = helloChats[0];
    } else if (now < 16) {
      chat = helloChats[1];
    } else {
      chat = helloChats[2];
    }
    chat += instructChate[0];
    axios.get(iot.tts(chat));
    axios.get(webapi.answers.answer(childernId)).then((res) => {
      setChats(res.data);
    });
  }, []);

  return (
    <div>
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
            <Chats />
          </Physics>
        </RecoilBridge>
      </Canvas>
      <Button bottom={"5%"} left={"55%"}>
        친구와 함께 사진찍어요!
      </Button>
    </div>
  );
}

export default Main;
