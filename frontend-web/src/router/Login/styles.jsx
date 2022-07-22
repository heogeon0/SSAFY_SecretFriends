import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  top: 50%;
  left: 50%;
  padding: 20px;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: calc(80vw / 1.3);
  max-width: 500px;
  max-height: calc(700px / 1.68);
  background-color: ${(props) => props.theme.whiteColor};
  border-radius: 40px;
  box-shadow: 5px 5px 15px 0.5px #dcdde1;
  .title {
    font-family: ${(props) => props.theme.namingFont};
    text-align: center;
  }
`;

export default Wrapper;
