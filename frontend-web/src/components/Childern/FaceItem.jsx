import styled from "styled-components";

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useSetRecoilState } from "recoil";
import { FaceInfo } from "../../atom";


const GridBox = styled.div`
  display: grid;
  padding: 1vw;
  grid-template-rows: 1fr;
  grid-template-columns: 2fr 1fr;
`

const FlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
`
const ImgDiv = styled.label`
  width: 80%;
  height: 80%;
  background-image: url(${(props) => props.img || "/img/plus.png"});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: ${(props) => props.theme.yellowCollor};
  cursor: pointer;
  @media ${props => props.theme.mobile} {
    height: 70%;
    max-height: 200px;
  }
`;

const Example = styled.div`
  border: 1px solid black;
  width: 100%;
  height: 150px;
  background-image: url("img/example.jpg");
  background-position: center;
  background-size: cover;
  @media ${props => props.theme.mobile} {
    width: 100%;
    height: 100px;
  }
`


function FaceItem() {
  const { register, watch } = useForm();
  const [ImagePreview, setImagePreview] = useState("");
  const setImage = useSetRecoilState(FaceInfo);
  const image = watch("image");
  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setImagePreview(URL.createObjectURL(file));
      setImage(image[0]);
    }
  }, [image]);
  return (
    <GridBox>
      <ImgDiv img={ImagePreview}>
        <input
          style={{ display: "none" }}
          id="image"
          {...register("image")}
          type="file"
        />
      </ImgDiv>
      <FlexBox>
        <Example></Example>
        <div style={{margin: "0.8rem 0 0.5rem 0", fontSize: "min(3vw, 1rem)"}}>[예시]</div>
        <div style={{fontSize: "min(2vw, 1rem)"}}>정확한 얼굴 인식을 위해 정면 사진을 권장합니다.</div>
      </FlexBox>
    </GridBox>
  );
}

export default FaceItem;
