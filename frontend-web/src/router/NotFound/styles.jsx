import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  padding: 15px;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: calc(80vw / 1.5);
  max-width: 600px;
  max-height: calc(600px / 1.68);
  background-color: ${(props) => props.theme.whiteColor};
  border-radius: 5px;
  box-shadow: 5px 5px 15px 0.5px #dcdde1;
  .title {
    font-family: ${(props) => props.theme.namingFont};
    text-align: center;
  }
`;

export default Wrapper;
