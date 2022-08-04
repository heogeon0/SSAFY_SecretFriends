import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars } from "@react-three/drei";
import { useBox, Physics } from "@react-three/cannon";


import React, { useEffect, useRef, useState } from "react";
import Model from "./Character";
import axios from 'axios'

// function Box() {
//   const [ref, api] = useBox(() => ({ mass: 1, position: [0, 2, 0] }));
//   return (
//     <mesh
//       onClick={() => {
//         api.velocity.set(0, 2, 0);
//       }}
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


function MyCanvas () {
  function please() {
    // const JSON = await (await fetch('http://192.168.0.6:8000/product')).json()
    axios.get('http://192.168.100.225:8000/pleasepython').then(res => {
      console.log(res.data)
    })
  }


  return (
    <div className="App">
      <button onClick={please}>안녕</button>
      <Canvas
        camera={{ fov: 80, position: [0, 1, 10] }}
        style={{ width: "100vw", height: "100vh" }}
      >
        {/* fov : 카메라 확대 정도 */}
        {/* <Stars /> */}
        {/* 궤도 추가 */}
        {/* <OrbitControls /> */}
        {/* 조명추가 */}
        <ambientLight intensity={0.3} />
        <spotLight position={[5, 5, 5]} angle={1} />
        <Physics>
          {/* <Box /> */}
          <Model position={[0, -2, 0]} />
        </Physics>
      </Canvas>
    </div>
  );
}

export default MyCanvas;
