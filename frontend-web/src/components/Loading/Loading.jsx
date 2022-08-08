import React from "react";
import { Background, LoadingText } from "./styles";

function Loading() {
  return (
    <Background>
      <LoadingText>잠시만 기다려 주세요.</LoadingText>
      <i className="fa-solid fa-spinner fa-spin-pulse"></i>
    </Background>
  )
}

export default Loading;