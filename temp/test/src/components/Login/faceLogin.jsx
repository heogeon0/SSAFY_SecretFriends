import { useRecoilState } from "recoil";
import { childrenId } from "../../atoms";
import { Navigate, useNavigate } from "react-router-dom";

import axios from "axios";
import webapi from "../../apis/webapi";
import iot from "../../apis/iot";

import { useEffect, useRef } from "react";

function FaceLogin() {
  const [id, setId] = useRecoilState(childrenId);
  const videoRef = useRef(null);
  const navigate = useNavigate();
  useEffect(() => {
    const constraints = {
      video: true,
    };
    const startVideo = async () => {
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      if (videoRef && videoRef.current && !videoRef.current.srcObject) {
        videoRef.current.srcObject = stream;
      }
    };
    const onModal = () => {
      console.log(iot.login());
      startVideo();
      axios.get(iot.login()).then(({ data }) => {
        console.log(data.id);
        setId(data.id);
        navigate("/mains");
      });
    };
    onModal();
  }, []);

  return (
    <>
      <div>로그인화면</div>
      <video autoPlay ref={videoRef}></video>
    </>
  );
}

export default FaceLogin;
