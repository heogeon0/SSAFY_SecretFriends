import React, { useRef, useState, useEffect } from "react";
import './Diary.css'

const colors = [
  "red",
  "green",
  "yellow",
  "black",
  "blue"
]

function Diary() {
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
    img.src = "./sketchbook.png"
    img.onload = function() {
          context.drawImage(img, 0, 0, canvas.width, canvas.height);
    };

    // context.scale(2, 2);
    context.linecap = "round";
    context.strokeStyle = "black";
    // context.strokeStyle = selectedColor;
    context.lineWidth = 2.5;
    contextRef.current = context;
  }, []);


  const startDrawing = ({ nativeEvent }) => {
    const {offsetX, offsetY} = nativeEvent;
    contextRef.current.beginPath();
    contextRef.current.moveTo(offsetX, offsetY);  
    contextRef.current.lineTo(offsetX, offsetY);
    contextRef.current.stroke();  
    setIsDrawing(true);
    // nativeEvent.preventDefault();
  };

  const finishDrawing = () => {
    contextRef.current.closePath();
    setIsDrawing(false);
  };

  const drawing = ({ nativeEvent }) => {
    if(!isDrawing){
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


  return(
    <div>
      <canvas className="canvas-container"
          onMouseDown={startDrawing}
          onMouseUp={finishDrawing}
          onMouseMove={drawing}
          onMouseLeave={finishDrawing}
          ref={canvasRef}>

      </canvas>

      <div className="control">
        <button className="color-btn" data-color="black" onClick={(e)=>{changeColor("black", e)}}></button>
        <button className="color-btn" data-color="red" onClick={(e)=>{changeColor("#ff3b30", e)}}></button>
        <button className="color-btn" data-color="orange" onClick={(e)=>{changeColor("#ff9500", e)}}></button>
        <button className="color-btn" data-color="yellow" onClick={(e)=>{changeColor("#ffcc00", e)}}></button>
        <button className="color-btn" data-color="green" onClick={(e)=>{changeColor("#4cd963", e)}}></button>
        <button className="color-btn" data-color="sky" onClick={(e)=>{changeColor("#5ac8fa", e)}}></button>
        <button className="color-btn" data-color="blue" onClick={(e)=>{changeColor("#0579ff", e)}}></button>
        <button className="color-btn" data-color="violet" onClick={(e)=>{changeColor("#5856d6", e)}}></button>
      </div>
    </div>


    

  );
}

export default Diary;
