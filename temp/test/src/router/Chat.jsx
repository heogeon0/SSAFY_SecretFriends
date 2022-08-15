import { Physics } from "@react-three/cannon";
import { Stars } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import axios from "axios";
import { useEffect, useState } from "react";
import { useRecoilBridgeAcrossReactRoots_UNSTABLE } from "recoil";
import { io } from "socket.io-client";
import iot from "../apis/iot";

import { Button } from "../components/Items/items";
import Bee from "../components/ThreeModel/models/Bee";
const socket = io.connect("http://localhost:4000");

function Chat() {
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  const [chat, setChat] = useState("");
  const name = { childrenID: 5 };
  const goStt = () => {
    axios.get(iot.stt()).then((res) => {
      console.log(res.data.result);
      const messageToken = {
        ...name,
        message: res.data.result,
      };
      console.log(messageToken);
      socket.emit("chat message", messageToken);
    });
  };
  useEffect(() => {
    socket.on("connect", function () {
      console.log("소켓이 바뀝니다" + name);
      socket.emit("newUser", name);
    });

    // axios
    //   .get(
    //     iot.tts(
    //       "안녕 너랑 얘기해보고 싶어서 찾아왔어!     나한테 말하고 싶으면 아래 버튼을 누르고 말하면 돼!"
    //     )
    //   )
    //   .then((res) => {
    //     console.log(res);
    //   });
  });
  useEffect(() => {
    // socket.on("newUser", (msg) => {
    //   setChat([...chat, msg]);
    // });
    socket.on("chat message", ({ message }) => {
      setChat(message);
      console.log(message);
      axios.get(iot.tts(message)).then((res) => console.log(res));
    });
    socket.on("disconnected", (msg) => {
      setChat([...chat, msg]);
    });
  }, [chat]);

  return (
    <>
      <Canvas
        camera={{ fov: 100, position: [0, 0.5, 3] }}
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
          position: "relative",
          backgroundImage: "url('/bgimg.png')",
          backgroundPosition: "center",
          backgroundSize: "cover",
        }}
      >
        <RecoilBridge>
          {/* fov : 카메라 확대 정도 */}
          <Stars />
          {/* 궤도 추가 */}
          {/* 조명추가 */}
          <spotLight position={[0, 10, 20]} angle={1} />
          <Physics>
            <Bee position={[0, -1, 0]} state={"stateMain"} />
          </Physics>
        </RecoilBridge>
      </Canvas>

      <Button
        bottom={"12%"}
        left={"42%"}
        width={"15%"}
        height={"60px"}
        onClick={goStt}
      >
        <div
          className="img"
          style={{ backgroundImage: "url('/icon/voice.png')" }}
        ></div>
      </Button>
    </>
  );
}

export default Chat;
