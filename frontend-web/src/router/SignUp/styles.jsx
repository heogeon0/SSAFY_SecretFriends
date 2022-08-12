import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  top: 50%;
  left: 50%;
  padding: 20px;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: 90vw;
  max-width: 450px;
  max-height: calc(900px / 1.68);
  background-color: ${(props) => props.theme.whiteColor};
  border-radius: 5px;
  box-shadow: 5px 5px 15px 0.5px #dcdde1;
`;

export default Wrapper;
