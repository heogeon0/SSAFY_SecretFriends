import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useBox, Physics } from "@react-three/cannon";


import React, { useEffect, useRef, useState } from "react";
import { useRecoilBridgeAcrossReactRoots_UNSTABLE } from "recoil";
import { useSetRecoilState} from "recoil";
import { basicChats } from "../atoms";
import iot from '../apis/iot'
import webapi from "../apis/webapi";
import axios from 'axios'

import Character from "../components/ThreeModel/models/Character";


import Cloud from "../components/ThreeModel/factors/cloud";
import Plane from "../components/ThreeModel/factors/plane";
import Chats from "../components/Chats/Chats";

// function Box() {
// const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
//   return (
//     <mesh
// onClick={() => {
//   api.velocity.set(0, 2, 0);
// }}
//       ref={ref}
//       position={[0, 2, 0]}
//     >
//       <boxBufferGeometry attach="geometry" />
//       <meshLambertMaterial attach="material" color="black" />
//     </mesh>
//   );
// }

// function Plane() {
//   const [ref] = useBox(() => ({ rotation: [-Math.PI / 2, 0, 0] }));
//   return (
//     <mesh ref={ref} position={[0, 10, 0]} rotation={[-Math.PI / 2, 0, 0]}>
//       <planeBufferGeometry attach="geometry" args={[100, 100]} />
//       <meshLambertMaterial attach="material" color="hotpink" />
//     </mesh>
//   );
// }


// Pyodide
// const runScript = async (code) => {
//   const pyodide = await window.loadPyodide({
//     indexURL : "https://cdn.jsdelivr.net/pyodide/v0.20.0/full/"
//   });

//   return await pyodide.runPythonAsync(code)
// }

// const MyCanvas = () => {
//   const [output, setOutput] = useState("(loading...)");

//   useEffect(() => {
//     const run = async () => {
//       const scriptText = await (await fetch(script)).text();
//       const out = await runScript(scriptText);
//       setOutput(out);
//     }
//     run();

//   }, []);

const dump = [
  {
    id : 1,
    content : '이거',
    isUsed : false,
  },
  {
    id : 2,
    content : '연지님',
    isUsed : false,
  },
  {
    id : 3,
    content : '돈',
    isUsed : false,
  },
  {
    id : 4,
    content : '아껴',
    isUsed : false,
  },
  {
    id : 5,
    content : '쓰는중',
    isUsed : false,
  },
  {
    id : 6,
    content : '진짜',
    isUsed : false,
  },
  {
    id : 7,
    content : 'ㅎ',
    isUsed : false,
  },
  {
    id : 8,
    content : '이거',
    isUsed : false,
  },
  {
    id : 9,
    content : '이거',
    isUsed : false,
  },
  {
    id : 10,
    content : '이거',
    isUsed : false,
  },
]


function MyCanvas () {
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  const setChats = useSetRecoilState(basicChats)
  useEffect(() => {
    axios.get(webapi.answers.answer(7)).then(res => {
      setChats(res.data)
    })
  },[])
  function tts(event) {
  // console.log(event.target.innerText)
  // const JSON = await (await fetch('http://192.168.0.6:8000/product')).json()
  // console.log(iot.tts(event.target.innerText))
  axios.get(iot.tts(event.target.innerText)).then(res => {
  console.log(res.data)
  })
  }

  // const plane = () => {
  //   const result = [];
  //   for (let x=-10; x<10; x++){
  //     for (let z=0; z<5; z++){
  //      result.push(<Cube_Grass_Single key={`x:${x},y:${z}`} position={[x, -3, z]} />)
  //     }
  //   }
  //   return result
  // }

  return (
    <div>
      <button onClick={(e) => tts(e)}>안녕245팀</button>
      <Canvas
        camera={{ fov: 85, position: [0, 2, 10] }}
        style={{ width: "100vw", height: "100vh" }}
        >
        <RecoilBridge>
        {/* fov : 카메라 확대 정도 */}
        <Stars />
        {/* 궤도 추가 */}
        {/* <OrbitControls /> */}
        {/* 조명추가 */}
        <ambientLight intensity={0.3} />
        <spotLight position={[5, 5, 5]} angle={1} />
        <Physics>
          {/* <Box /> */}
          <Character position={[0, -4, 2]} angle={100} />
          <Plane />
          <Cloud />
          <Chats />
        </Physics>
         </RecoilBridge>
      </Canvas>
    </div>

  );
}

export default MyCanvas;
