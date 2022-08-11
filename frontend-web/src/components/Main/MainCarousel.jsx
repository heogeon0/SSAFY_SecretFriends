import styled from "styled-components";
import Slider from "./Slider";

import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import { CurrentSlide, ChildrenList, AnswerList } from "../../atom";


const Container = styled.div`
  position: relative;
  margin: auto;
  width: 70%;
  max-width: 800px;
  height: 80%;
`;

function MainCarousel() {
  const [currentSlide, setCurrentSlide] = useRecoilState(CurrentSlide);
  const childrenList = useRecoilValue(ChildrenList);
  const setAnswerList = useSetRecoilState(AnswerList);

  
  // "front", "back" button for carousel
  const total = childrenList.length;
  function goNext() {
    if (currentSlide + 1 < total) {
      setAnswerList(childrenList[currentSlide+1].answers)
      setCurrentSlide((val) => val + 1);
    }
  }
  function goPrev() {
    if (currentSlide > 0) {
      setAnswerList(childrenList[currentSlide-1].answers)
      setCurrentSlide((val) => val - 1);
    }
  }
  function check(id) {
    if (id + 1 === currentSlide) {
      return "prev";
    } else if (id - 1 === currentSlide) {
      return "next";
    } else if (id === currentSlide) {
      return "now";
    } else {
      return "hidden";
    }
  }

  return (
    <>
      {childrenList.length !== 1
      ? <>
          <button onClick={goPrev}>앞</button>
          <button onClick={goNext}>뒤</button>
        </>
      : null
      }
      
      <Container>
        {childrenList.map((child, idx) => {
          return <Slider key={`아이번호${child.childrenID}`} check={check(idx)} child={child} idx={idx} />;
        })}
      </Container>
    </>
  );
}

export default MainCarousel;
