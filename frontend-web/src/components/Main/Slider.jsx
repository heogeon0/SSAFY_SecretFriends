import styled from "styled-components";

import { storage } from "../../api/firebase";
import { ref, getDownloadURL } from "firebase/storage";
import { useEffect, useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { CurrentSlide, ChildrenList, AnswerList } from "../../atom";
import { useNavigate } from "react-router-dom";


const NowSlider = styled.div`
  width: ${(props) => (props.check === "now" ? "30%" : "25%")};
  padding-top: ${(props) => (props.check === "now" ? "30%" : "25%")};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all ease-in-out 0.5s;
  position: absolute;
  top: 50%;

  left: ${(props) =>
    (props.check === "now" && "50%") ||
    (props.check === "next" && "80%") ||
    (props.check === "prev" && "20%")};

  background-image: url(${(props) => props.bg});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
  :hover {
    cursor: pointer;
  }
`;

function Slider({ check, child, idx }) {
  const [url, setURL] = useState();
  const childrenList = useRecoilValue(ChildrenList);
  const setCurrentSlide = useSetRecoilState(CurrentSlide);
  const setAnswerList = useSetRecoilState(AnswerList);
  const backgroundImg = child && !child.childrenID ? "../../img/plus.png" : url;
  const navigate = useNavigate();
  // '+' 컴포넌트의 경우, 한 번 누르면 carousel 이동 / 두 번 누르면 create children 페이지로 이동
  const [isPlus, setIsPlus] = useState(false);

  useEffect(() => {
    const storageRef = ref(storage, `images/${child.childrenID}`);
      getDownloadURL(storageRef).then((url) => {
        setURL(url)
      })
  }, [])

  // 아이얼굴 클릭하면 해당하는 곳으로 이동
  function moveTo(idx) {
    setCurrentSlide(idx)
    setAnswerList(childrenList[idx].answers)
    setIsPlus(!isPlus)

    if (childrenList[idx].childrenID === 0 && isPlus) {
      navigate('/CreateChildren')
    }
  }

  return (
    <>
      {check !== "hidden" ? (
        <NowSlider onClick={() => {moveTo(idx)}} bg={backgroundImg} check={check}></NowSlider>
      ) : null}
    </>
  );
}

export default Slider;
