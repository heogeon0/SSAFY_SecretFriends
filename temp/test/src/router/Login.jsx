import { RecoilBridge, useRecoilState } from "recoil";
import { childrenId } from "../atoms";
import { Navigate, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { Canvas } from "@react-three/fiber";
import { storage } from "../apis/firebase";

import { useRecoilBridgeAcrossReactRoots_UNSTABLE } from "recoil";
import Character from "../components/ThreeModel/models/Character";

import Photos from "../components/Login/photos";
import FaceLogin from "../components/Login/faceLogin";
import styled from "styled-components";
import { getDownloadURL, listAll, ref } from "firebase/storage";

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

  const [images, setImages] = useState([]);
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  const listRef = ref(storage, "/captureImages");

  function displayImage(imageRef) {
    imageRef.getDownloadURL().then((url) => {
      setImages(url);
      console.log(url);
    });
  }
  useEffect(() => {
    listAll(listRef).then((res) => {
      res.prefixes.forEach((prefixe) => {
        const itemsURL = prefixe.fullPath;
        const itemsRef = ref(storage, itemsURL);
        listAll(itemsRef).then((items) => {
          items.items.forEach((item) => {
            // console.log(item);
            getDownloadURL(ref(storage, item.fullPath)).then((url) => {
              setImages((val) => [...val, url]);
            });
          });
        });
      });
    });
  }, []);
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
              position={[6.0, -3, 0]}
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
