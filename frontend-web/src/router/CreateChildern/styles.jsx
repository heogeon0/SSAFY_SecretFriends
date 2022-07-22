import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95vw;
  height: 95vw;
  max-width: 700px;
  max-height: 500px;
  box-shadow: 5px 5px 15px 0.5px #dcdde1;
  .grid {
    width: 100%;
    height: 100%;
    background-color: ${(props) => props.theme.whiteColor};
  }
`;

export default Wrapper;
