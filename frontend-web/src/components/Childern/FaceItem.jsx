import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useSetRecoilState } from "recoil";
import { FaceInfo } from "../../atom";

const ImgDiv = styled.label`
  background-image: url(${(props) => props.img || "/img/plus.png"});
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  background-color: ${(props) => props.theme.yellowCollor};
  cursor: pointer;
`;

function FaceItem() {
  const { register, watch } = useForm();
  const [ImagePreview, setImagePreview] = useState("");
  const setImage = useSetRecoilState(FaceInfo);
  const image = watch("image");
  useEffect(() => {
    if (image && image.length > 0) {
      const file = image[0];
      setImagePreview(URL.createObjectURL(file));
      setImage((val) => [...val, image[0]]);
    }
  }, [image]);
  return (
    <ImgDiv img={ImagePreview}>
      <input
        style={{ display: "none" }}
        id="image"
        {...register("image")}
        type="file"
      />
    </ImgDiv>
  );
}

export default FaceItem;
