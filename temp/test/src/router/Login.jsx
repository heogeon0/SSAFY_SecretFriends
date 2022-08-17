import { RecoilBridge, useRecoilState } from "recoil";
import { childrenId } from "../atoms";
import { Navigate, useNavigate } from "react-router-dom";
import { Suspense, useEffect, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Transition } from "react-transition-group";

import { useRecoilBridgeAcrossReactRoots_UNSTABLE } from "recoil";
import Character from "../components/ThreeModel/models/Character";
import Bee from "../components/ThreeModel/models/Bee";

import Photos from "../components/Login/photos";
import FaceLogin from "../components/Login/faceLogin";
import styled from "styled-components";

import Grass from "../components/ThreeModel/factors/grass";
import Plane from "../components/ThreeModel/factors/plane";
import Home from "../components/ThreeModel/factors/home";
import { Cloud, Sky } from "@react-three/drei";

const Wrapper = styled.div`
  display: flex;
  align-items: flex-end;
  justify-content: center;

  width: 100vw;
  height: 100vh;
  /* background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%); */
`;

function Login() {
  const [ready, setReady] = useState(false);
  const [goNext, setGoNext] = useState(false);
  const navigate = useNavigate();

  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  function Rig() {
    const camera = useThree((state) => state.camera);
    return useFrame((state) => {
      camera.position.z = -Math.sin(state.clock.elapsedTime) * 20;

      if (camera.position.z < -19) {
        navigate("/mains");
      }
    });
  }
  return (
    <>
      <Wrapper>
        {/* <video autoPlay loop width={"100%"} height={"100%"}>
          <source src="/green.mp4" type="video/mp4" />
        </video> */}
        {/* <h1>나의 단짝 친구</h1> */}
        {/* <Photos ready={ready} /> */}

        <Canvas
          camera={{ position: [0, 0, 19.88], fov: 75 }}
          style={{
            position: "absolute",
            transform: "translate(-50%, -50%)",

            top: "50%",
            left: "50%",
          }}
        >
          <RecoilBridge>
            <ambientLight intensity={0.8} />
            <pointLight intensity={2} position={[0, 0, 1]} />
            <Suspense fallback={null}>
              <Cloud position={[-4, -2, -25]} speed={0.52} opacity={1} />
              <Cloud position={[4, 2, -15]} speed={0.2} opacity={0.5} />
              <Cloud position={[-4, 2, -10]} speed={0.52} opacity={1} />
              <Cloud position={[4, -2, -5]} speed={1} opacity={0.35} />
              <Cloud position={[4, 2, 0]} speed={0.42} opacity={0.55} />
            </Suspense>
            <Sky
              azimuth={0.1}
              turbidity={10}
              rayleigh={0.5}
              inclination={0.6}
              distance={1000}
            />
            {goNext ? <Rig /> : null}
            <spotLight position={[-4, 0, 20]} angle={1} />
            <Character
              position={[-7, -5, 12]}
              rotation={[0, 0, -0.8]}
              ready={ready}
              setGoNext={setGoNext}
              setReady={setReady}
              state={"stateLogin"}
            />
          </RecoilBridge>
        </Canvas>
      </Wrapper>
    </>
  );
}

export default Login;
