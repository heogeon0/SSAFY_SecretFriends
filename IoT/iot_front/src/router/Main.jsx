import { Canvas } from "@react-three/fiber";
import { OrbitControls, Stars, Cloud, Sky } from "@react-three/drei";
import { useBox, Physics } from "@react-three/cannon";

import React, { useEffect, useRef, useState } from "react";
import {
  useRecoilBridgeAcrossReactRoots_UNSTABLE,
  useRecoilValue,
  useSetRecoilState,
} from "recoil";
import { useRecoilState } from "recoil";
import { childrenId, childrenName, nameSelector } from "../atoms";

import iot from "../apis/iot";
import webapi from "../apis/webapi";
import axios from "axios";

import { Button } from "../components/Items/items";
import Character from "../components/ThreeModel/models/Character";

import Chats from "../components/Chats/Chats";

import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";

// 소켓연결

const socket = io.connect("https://i7d208.p.ssafy.io:4000");
console.log(socket);
function Main() {
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  const [id, setId] = useRecoilState(childrenId);
  const name = useRecoilValue(nameSelector);
  const [info, setInfo] = useRecoilState(childrenName);

  const [chats, setChats] = useState([]);
  const navigate = useNavigate();

  const takePhoto = () => {
    axios.get(iot.camera(id)).then((res) => {
      console.log(res);
    });
  };
  const count = info.count;
  const LogOut = () => {
    axios.get(iot.tts("잘가! 다음에 또 보자!"));
    window.location.reload();
    // setId("");
    // setInfo({});
    // navigate("/");
  };

  const helloChats = [
    "좋은아침이야",
    `${name}아 점심은 먹었어? 밥을 많이먹는게 중요하다고 들었어!`,
    `왜 안자고있어? 일찍 자야 키가 쑥쑥 큰다구! `,
    `내 주위에 있는 별과 하트를 눌러봐! 내친구들이 너에게 해주고 싶은 말이 있어! 아래의 버튼을 통해 내 친구와 대화하거나 사진도 찍을 수 있어!`,
  ];

  const setBasicChats = (name) => {
    return [
      {
        answerID: 99991,
        content: `오늘 치료도 화이팅!! 내가 응원할게`,
        isUsed: false,
        questionID: 0,
      },
      {
        answerID: 99992,
        content: `${name}이가 좋아하는 색이 있어? 나는 파란색을 좋아해! 마음이 편안해지는 느낌이야`,
        isUsed: false,
        questionID: 0,
      },
      {
        answerID: 99993,
        content: `나는 우주에서 온 공팔이야아! 밤하늘의 별을 보면 내가 온 고향이 보이는건 비밀이야!`,
        isUsed: false,
        questionID: 0,
      },
      {
        answerID: 99994,
        content: `야채랑 과일을 많이 먹으면 더 튼튼해져!!`,
        isUsed: false,
        questionID: 0,
      },
      {
        answerID: 99995,
        content: `요즘 ${name}이가 좋아하는 만화는 뭐야?`,
        isUsed: false,
        questionID: 0,
      },
      {
        answerID: 99996,
        content: `나는 ${name}가 세상에서 제일 좋아! `,
        isUsed: false,
        questionID: 0,
      },
      {
        answerID: 99997,
        content: `어제보다 더  튼튼해보인다    앞으로도 열심히 치료 받자!!`,
        isUsed: false,
        questionID: 0,
      },

      {
        answerID: 99998,
        content: `용감한 ${name} !!!!  내가 본 사람중에 ${name}이가 제일 멋져`,
        isUsed: false,
        questionID: 0,
      },
      {
        answerID: 99999,
        content: `지금 조금 힘들지라도 흔들리지 않고 나아가자 `,
        isUsed: false,
        questionID: 0,
      },
    ];
  };
  useEffect(() => {
    socket.on(
      "connect",
      function () {
        console.log("소켓이 바뀝니다" + id);
        socket.emit("newUser", id);
      },
      []
    );
  }, []);
  useEffect(() => {
    // 첫인사

    if (!name) {
      navigate("/");
    }
    console.log(name);
    const now = new Date().getHours();
    let chat = "";
    if (count == 0) {
      chat = helloChats[3];
    } else if (now <= 9) {
      chat = helloChats[0];
    } else if (now < 16) {
      chat = helloChats[1];
    } else {
      chat = helloChats[2];
    }

    axios.get(iot.tts(chat)).then((res) => console.log(res));

    // 컴포넌트 대화말

    const basicChats = setBasicChats(name);

    axios.get(webapi.answers.answer(id)).then((res) => {
      const newChats = [];
      for (let i = 0; i < res.data.length; i++) {
        if (!res.data[i].isUsed) {
          newChats.push(res.data[i]);
        }
        if (newChats.length > 3) break;
      }
      console.log(basicChats);
      let randomNum = Math.floor(Math.random() * basicChats.length);
      for (let j = 0; j < basicChats.length; j++) {
        if (randomNum + j >= basicChats.length) {
          randomNum = -j;
        }

        const content = basicChats.slice(j + randomNum, j + randomNum + 1);
        console.log(content);
        newChats.push(content[0]);
        if (newChats.length + chats.length >= 7) {
          break;
        }
      }
      console.log(newChats);
      setChats(newChats);
    });

    // sosket 연결
  }, []);

  return (
    <div style={{ width: "100vw", height: "100vh" }}>
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
        <Sky
          azimuth={0.1}
          turbidity={10}
          rayleigh={0.5}
          inclination={0.6}
          distance={1000}
        />
        <RecoilBridge>
          {/* fov : 카메라 확대 정도 */}
          <Stars />
          {/* 궤도 추가 */}
          {/* 조명추가 */}
          <spotLight position={[0, 10, 20]} angle={1} />
          <Physics>
            <Character position={[0, -2, 0]} state={"stateMain"} />
            <Chats chats={chats} setChats={setChats} />
          </Physics>
        </RecoilBridge>
      </Canvas>
      <Button
        fontSize={"30px"}
        bottom={"5%"}
        left={"10%"}
        onClick={() => navigate("/chat")}
      >
        <div className="flex_container">
          <div
            className="img"
            style={{ backgroundImage: "url('/icon/voice.png" }}
          ></div>
          <div className="content">친구와 함께 대화하기</div>
        </div>
      </Button>
      <Button
        fontSize={"30px"}
        bottom={"5%"}
        left={"55%"}
        onClick={() => takePhoto()}
      >
        <div className="flex_container">
          <div
            className="img"
            style={{ backgroundImage: "url('/icon/photo.png" }}
          ></div>
          <div className="content">친구와 함께 사진찍기</div>
        </div>
      </Button>
      <Button
        bottom={"18%"}
        left={"75%"}
        width={"15%"}
        height={"60px"}
        onClick={LogOut}
        fontSize={"30px"}
      >
        종료
      </Button>
    </div>
  );
}

export default Main;
