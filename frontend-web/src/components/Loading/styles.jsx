import styled from "styled-components";

export const Background = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
  background: #ffffffb7;
  z-index: 999;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  .icon {
    z-index: 1000;
  }
`

export const LoadingText = styled.div`
  text-align: center;
  font-weight: bold;
`