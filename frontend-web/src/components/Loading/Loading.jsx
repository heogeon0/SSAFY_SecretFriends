import React from "react";
import { Background, LoadingText } from "./styles";

function Loading() {
  return (
    <Background>
      {/* <LoadingText style={{fontSize: "min(5vw, 4rem)", marginBottom: "1rem", color: "#000000ac"}}>Page Loading</LoadingText>
      <LoadingText style={{fontSize: "min(3.5vw, 2rem)", marginBottom: "1.5rem", color: "#0000006e"}}>잠시만 기다려 주세요.</LoadingText> */}
      <i className="fa-solid fa-spinner fa-spin-pulse" style={{color: "gray", fontSize: "min(5vw, 3rem)"}}></i>
    </Background>
  )
}

export default Loading;