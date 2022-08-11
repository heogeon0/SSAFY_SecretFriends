import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  top: 50%;
  justify-content: space-evenly;
  left: 50%;
  padding: 15px;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: calc(80vw / 1.3);
  max-width: 400px;
  max-height: calc(600px / 1.68);
  border-radius: 5px;
  background-color: ${(props) => props.theme.whiteColor};
  box-shadow: 5px 5px 15px 0.5px #dcdde1;
  .title {
    font-family: ${(props) => props.theme.namingFont};
    text-align: center;
  }
`;

export default Wrapper;
