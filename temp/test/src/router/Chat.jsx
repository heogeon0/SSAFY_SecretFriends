import { Physics } from "@react-three/cannon";
import {
  CameraShake,
  Environment,
  OrbitControls,
  Sky,
  Stars,
  Sphere,
} from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import axios from "axios";
import { Suspense, useEffect, useRef, useState } from "react";
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilValue,
} from "recoil";
import { io } from "socket.io-client";
import iot from "../apis/iot";
import * as THREE from "three";

import { useNavigate } from "react-router-dom";
import { Button } from "../components/Items/items";

import Bee from "../components/ThreeModel/models/Bee";
import { childrenId } from "../atoms";

function Chat() {
  const socket = io.connect("https://i7d208.p.ssafy.io:4000");
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  const [chat, setChat] = useState("");
  const [readySTT, setReadyStt] = useState("");
  const [isMic, setIsMic] = useState("white");
  const childrenID = useRecoilValue(childrenId);
  const name = { childrenID: childrenID };
  const navigtaion = useNavigate();
  const goStt = () => {
    axios
      .get(iot.tts("지금이야! 지금 나한테 하고싶은 말을 해줘!"))
      .then((res) => {
        setIsMic("red");
        axios.get(iot.stt()).then((res) => {
          setIsMic(false);
          console.log(res.data.result);
          const messageToken = {
            ...name,
            message: res.data.result,
          };
          console.log(messageToken);
          socket.emit("chat message", messageToken);
        });
      });
  };
  useEffect(() => {
    socket.on("connect", function () {
      console.log("소켓이 바뀝니다" + name.childrenID);
      socket.emit("newUser", name);
    });

    axios
      .get(
        iot.tts("안녕!     나한테 말하고 싶으면 아래 버튼을 누르고 말하면 돼!")
      )
      .then((res) => {
        console.log(res);
      });
  }, []);
  useEffect(() => {
    // socket.on("newUser", (msg) => {
    //   setChat([...chat, msg]);
    // });
    socket.on("chat message", ({ message }) => {
      console.log(message);
      setReadyStt(message);
    });
    socket.on("disconnected", (msg) => {
      setChat([...chat, msg]);
    });
  }, []);

  useEffect(() => {
    axios.get(iot.tts(readySTT)).then((res) => console.log(res));
  }, [readySTT]);

  function Light() {
    const ref = useRef();
    useFrame((_) => (ref.current.rotation.x = _.clock.elapsedTime));
    return (
      <group ref={ref}>
        <rectAreaLight
          width={15}
          height={100}
          position={[30, 30, -10]}
          intensity={5}
          onUpdate={(self) => self.lookAt(0, 0, 0)}
        />
      </group>
    );
  }
  function Rig() {
    const [vec] = useState(() => new THREE.Vector3());
    const { camera, mouse } = useThree();
    useFrame(() => camera.position.lerp(vec.set(mouse.x * 2, 1, 60), 0.05));
    return (
      <CameraShake
        maxYaw={0.01}
        maxPitch={0.01}
        maxRoll={0.01}
        yawFrequency={0.5}
        pitchFrequency={0.5}
        rollFrequency={0.4}
      />
    );
  }

  return (
    <>
      <Canvas
        shadows
        dpr={[1, 2]}
        camera={{ position: [0, 160, 160], fov: 20 }}
        // camera={{ fov: 100, position: [0, 0.5, 3] }}
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
          position: "relative",
          // backgroundImage: "url('/bgimg.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <fog attach="fog" args={["black", 60, 100]} />
        <RecoilBridge>
          {/* fov : 카메라 확대 정도 */}
          {/* <Stars /> */}
          {/* 궤도 추가 */}
          {/* 조명추가 */}
          {/* <spotLight position={[0, 10, 20]} angle={1} /> */}
          {/* <Sky azimuth={1} inclination={0.6} distance={1000} /> */}
          {/* <ambientLight /> */}
          <pointLight position={[10, 10, 10]} />

          <Suspense fallback={null}>
            <ambientLight intensity={0.5} />
            <spotLight position={[50, 50, -30]} castShadow />
            <pointLight position={[0, -5, 5]} intensity={0.5} />
            <directionalLight
              position={[0, -5, 0]}
              color="blue"
              intensity={2}
            />
            <Light />
            <Rig />
            <Sky />

            <Bee position={[0, -1, -1]} state={"stateMain"} />
          </Suspense>
          <OrbitControls makeDefault />
        </RecoilBridge>
      </Canvas>

      <Button
        bottom={"15%"}
        left={"42%"}
        width={"15%"}
        height={"60px"}
        onClick={goStt}
        isMic={isMic}
      >
        <div
          className="img"
          style={{ backgroundImage: "url('/icon/voice.png')" }}
        ></div>
      </Button>
      <Button
        onClick={() => navigtaion("/mains")}
        bottom={"5%"}
        left={"35%"}
        width={"30%"}
        height={"5%"}
        fontSize={"30px"}
      >
        나가기
      </Button>
    </>
  );
}

export default Chat;
