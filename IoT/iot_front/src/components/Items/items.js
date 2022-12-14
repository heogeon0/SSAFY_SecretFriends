import styled from "styled-components";
import { jumpHover } from "../animation";

export const Button = styled.div`
  @font-face {
    font-family: "yg-jalnan";
    src: url("https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_four@1.2/JalnanOTF00.woff")
      format("woff");
    font-weight: normal;
    font-style: normal;
  }

  display: flex;
  justify-content: center;
  font-family: "yg-jalnan";
  align-items: center;
  font-size: ${(props) => props.fontSize || "50%"};
  position: absolute;
  bottom: ${(props) => props.bottom || "50%"};
  left: ${(props) => props.left || "50%"};
  border-radius: 20px;
  width: ${(props) => props.width || "35%"};
  height: ${(props) => props.height || "130px"};
  animation: ${(props) =>
    props.isMic || "${jumpHover} 0.3s infinite linear alternate"};

  box-shadow: 10px 10px 10px 0px #7f8fa6;

  background-color: ${(props) => props.isMic || "white"};
  transition-duration: 3s;
  transition: all 0.3s ease-out;
  :hover {
    cursor: pointer;
  }
  .flex_container {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .img {
    width: 50px;
    height: 50px;
    background-position: center center;
    background-size: cover;
  }
`;
