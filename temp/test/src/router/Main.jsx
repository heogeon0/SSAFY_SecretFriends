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
// function Box() {
//   const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
//   return (
//     <mesh
//       onClick={() => {
//         api.velocity.set(0, 2, 0);
//       }}
//       ref={ref}
//       position={[0, 0, 0]}
//     >
//       <boxBufferGeometry attach="geometry" />
//       <meshLambertMaterial attach="material" color="black" />
//     </mesh>
//   );
// }

function Main() {
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  const childernId = useRecoilValue(childrenId);
  const setChats = useSetRecoilState(basicChats);
  const degred = (degrees) => degrees * (Math.PI / 180);

  // memberId 넣어야함
  useEffect(() => {
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
