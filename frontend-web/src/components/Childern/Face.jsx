import Wrapper from "./styles/Form";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import FaceItem from "./FaceItem";
import { FaceInfo } from "../../atom";
import { useRecoilValue } from "recoil";

const Grid = styled.div`
  height: 100%;
  padding: 10px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

function Face() {
  const faces = useRecoilValue(FaceInfo);
  console.log(faces);
  return (
    <Wrapper>
      <h2>아이 얼굴 등록하기</h2>
      <p>아이 얼굴을 등록해주세요</p>
      <Grid>
        <FaceItem />
        <FaceItem />
        <FaceItem />
        <FaceItem />
        <FaceItem />
        <FaceItem />
        <FaceItem />
        <FaceItem />
        <FaceItem />
        <FaceItem />
      </Grid>
    </Wrapper>
  );
}

export default Face;
