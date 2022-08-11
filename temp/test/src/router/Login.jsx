import { RecoilBridge, useRecoilState } from "recoil";
import { childrenId } from "../atoms";
import { Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Canvas } from "@react-three/fiber";

import { useRecoilBridgeAcrossReactRoots_UNSTABLE } from "recoil";
import Character from "../components/ThreeModel/models/Character";

import Photos from "../components/Login/photos";
import FaceLogin from "../components/Login/faceLogin";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
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
        <Canvas
          style={{
            width: "100vw",
            height: "100vh",
            backgroundImage:
              "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
          }}
          camera={{ fov: 100, position: [0, 0.5, 3] }}
        >
          <RecoilBridge>
            <spotLight position={[0, 10, 20]} angle={1} />

            <Character
              position={[3, -2, 0]}
              goMain={GoMain}
              rotation={[0, -0.35, 1]}
              ready={ready}
              setReady={setReady}
              state={"stateLogin"}
            />
          </RecoilBridge>
        </Canvas>
        <Photos />
      </Wrapper>
    </>
  );
}

export default Login;
