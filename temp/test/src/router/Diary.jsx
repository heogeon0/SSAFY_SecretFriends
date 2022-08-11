import React, { useRef, useState, useEffect } from "react";
import "./Diary.css";
import { Canvas } from "@react-three/fiber";
import { useRecoilBridgeAcrossReactRoots_UNSTABLE } from "recoil";
import { Physics } from "@react-three/cannon";
import Character from "../components/ThreeModel/models/Character";

function Diary() {
  const RecoilBridge = useRecoilBridgeAcrossReactRoots_UNSTABLE();
  const canvasRef = useRef(null); //useRef 사용
  const contextRef = useRef(null); // 캔버스의 드로잉 컨텍스트를 참조
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    // canvas.width = window.innerWidth*2;
    // canvas.height = window.innerHeight*2;
    // canvas.style.width = `${window.innerWidth}px`;
    // canvas.style.height = `${window.innerHeight}px`;

    canvas.width = 800;
    canvas.height = 600;
    const context = canvas.getContext("2d");

    const img = new Image();
    img.src = "./sketchbook2.png";
    img.onload = function () {
      context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // context.scale(2, 2);
    context.linecap = "round";
    context.strokeStyle = "black";
    context.lineWidth = 2.5;
    contextRef.current = context;
  }, []);

  const startDrawing = ({ nativeEvent }) => {
    nativeEvent.preverntDefault();
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    setIsDrawing(true);
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const drawing = ({ nativeEvent }) => {
    if (!isDrawing) {
      return;
    }
    const { offsetX, offsetY } = nativeEvent;
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();
    // nativeEvent.preventDefault();
  };

  const changeColor = (params, e) => {
    console.log("색상 변경: ", params);
    contextRef.current.strokeStyle = params;
  };

  return (
    <div>
      <Canvas
        camera={{ fov: 100, position: [0, 0.5, 3] }}
        style={{
          width: "100vw",
          height: "100vh",
          backgroundImage: "linear-gradient(120deg, #e0c3fc 0%, #8ec5fc 100%)",
        }}
      >
        <RecoilBridge>
          {/* fov : 카메라 확대 정도 */}
          {/* 궤도 추가 */}
          {/* 조명추가 */}
          <spotLight position={[0, 10, 20]} angle={1} />
          <Physics>
            <Character position={[0, -2, 0]} />
          </Physics>
        </RecoilBridge>
      </Canvas>

      <canvas
        className="canvas-container"
        onTouchStart={startDrawing}
        onTouchEnd={finishDrawing}
        onTouchMove={drawing}
        onTouchLeave={finishDrawing}
        ref={canvasRef}
      ></canvas>

      <div className="control">
        <button
          className="color-btn"
          data-color="black"
          onClick={(e) => {
            changeColor("black", e);
          }}
        ></button>
        <button
          className="color-btn"
          data-color="red"
          onClick={(e) => {
            changeColor("#ff3b30", e);
          }}
        ></button>
        <button
          className="color-btn"
          data-color="orange"
          onClick={(e) => {
            changeColor("#ff9500", e);
          }}
        ></button>
        <button
          className="color-btn"
          data-color="yellow"
          onClick={(e) => {
            changeColor("#ffcc00", e);
          }}
        ></button>
        <button
          className="color-btn"
          data-color="green"
          onClick={(e) => {
            changeColor("#4cd963", e);
          }}
        ></button>
        <button
          className="color-btn"
          data-color="sky"
          onClick={(e) => {
            changeColor("#5ac8fa", e);
          }}
        ></button>
        <button
          className="color-btn"
          data-color="blue"
          onClick={(e) => {
            changeColor("#0579ff", e);
          }}
        ></button>
        <button
          className="color-btn"
          data-color="violet"
          onClick={(e) => {
            changeColor("#5856d6", e);
          }}
        ></button>
      </div>

      <div className="controlBtn">
        <button className="jsSave">저장</button>
      </div>
    </div>
  );
}

export default Diary;
