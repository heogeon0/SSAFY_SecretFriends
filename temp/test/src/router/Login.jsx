import { RecoilBridge, useRecoilState } from "recoil";
import { childrenId } from "../atoms";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { Transition } from "react-transition-group";

import { useRecoilBridgeAcrossReactRoots_UNSTABLE } from "recoil";
import Character from "../components/ThreeModel/models/Character";

import Photos from "../components/Login/photos";
import FaceLogin from "../components/Login/faceLogin";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100vw;
  height: 100vh;
  /* background-image: linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%); */
`;

function Login() {
  const [ready, setReady] = useState(false);
  const navigate = useNavigate();
  const GoMain = () => {
    navigate("/mains");
  };

  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();

  return (
    <>
      <Wrapper>
        <video autoPlay loop width={"100%"} height={"100%"}>
          <source src="/green.mp4" type="video/mp4" />
        </video>

        {/* <Photos ready={ready} /> */}
        <Canvas
          camera={{ fov: 100, position: [0, 0.5, 3] }}
          style={{
            position: "absolute",
            transform: "translate(-50%, -50%)",

            top: "50%",
            left: "50%",
          }}
        >
          <RecoilBridge>
            <spotLight position={[0, 10, 20]} angle={1} />

            <Character
              position={[6.0, -3, 0]}
              goMain={GoMain}
              rotation={[0, -0.35, 1]}
              ready={ready}
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
