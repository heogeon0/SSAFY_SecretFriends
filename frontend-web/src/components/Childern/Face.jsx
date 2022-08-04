import Wrapper from "./styles/Form";
import styled from "styled-components";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import FaceItem from "./FaceItem";
import { FaceInfo } from "../../atom";
import { useRecoilValue } from "recoil";

import { storage } from "../../api/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";

const Grid = styled.div`
  height: 100%;
  padding: 10px;
  display: grid;
  grid-gap: 10px;
  grid-template-columns: repeat(5, 1fr);
  grid-template-rows: repeat(2, 1fr);
`;

function Face() {
  const [isUploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const faces = useRecoilValue(FaceInfo);
  const [photoURL, setPhotosURL] = useState([]);
  const handleImageUpload = async (fileList) => {
    try {
      setUploading(true);
      const urls = await Promise.all(
        faces?.map((face) => {
          const storageRef = ref(storage, `images/${face.name}`);
          const task = uploadBytesResumable(storageRef, face);
          task.on("state_changed", (snapshot) => {
            setProgress(
              Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              )
            );
          });
          return getDownloadURL(storageRef);
        })
      );
      setPhotosURL(urls);
      alert("업로드 완료");
    } catch (err) {
      console.log(err);
    }
    setProgress(0);
    setUploading(false);
  };

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
