import styled from "styled-components";
import { jumpHover } from "../animation";

export const Button = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 40px;
  position: absolute;
  bottom: ${(props) => props.bottom || "50%"};
  left: ${(props) => props.left || "50%"};
  border-radius: 20px;
  width: ${(props) => props.width || "35%"};
  height: 130px;
  background-color: #f5f6fa;
  box-shadow: 10px 10px 10px 0px #7f8fa6;

  transition-duration: 3s;
  transition: all 0.3s ease-out;
  :hover {
    cursor: pointer;
    animation: ${jumpHover} 0.3s infinite linear alternate;
    background-color: #f5f6fa;
  }
`;
