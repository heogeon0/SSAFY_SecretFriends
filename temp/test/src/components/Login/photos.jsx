import styled from "styled-components";
// import { infiniteImg } from "../animation";

const Wrapper = styled.div`
  position: absolute;
  margin: 0px 15px;
  height: 100vh;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  width: 30%;
  background-color: blue;
`;
const PhotoList = styled.div`
  position: relative;
  bottom: 30%;
  width: 350px;
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 450px;
  grid-auto-rows: 450px;
  grid-auto-flow: row;
  grid-gap: 20px;
`;

const Photo = styled.div`
  width: 100%;
  height: 100%;
  background-color: red;
`;
function Photos() {
  return (
    <Wrapper>
      <PhotoList>
        <Photo></Photo>
        <Photo></Photo>
        <Photo></Photo>
        <Photo></Photo>
      </PhotoList>
    </Wrapper>
  );
}

export default Photos;
