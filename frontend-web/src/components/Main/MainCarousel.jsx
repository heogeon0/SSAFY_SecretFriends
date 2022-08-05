import styled from "styled-components";
import Slider from "./Slider";
import { useRecoilState } from "recoil";
import { CurrentSlide, ChildrenList, AnswerList, CurrentID } from "../../atom";


const Container = styled.div`
  position: relative;
  margin: auto;
  width: 70%;
  max-width: 800px;
  height: 80%;
`;

function MainCarousel() {
  const [currentSlide, setCurrentSlide] = useRecoilState(CurrentSlide);
  const [childrenList, setChildrenList] = useRecoilState(ChildrenList);
  const [answerList, setAnswerList] = useRecoilState(AnswerList);
  const [id, setID] = useRecoilState(CurrentID);

  // "front", "back" button for carousel
  const total = childrenList.length;

  function goNext() {
    if (currentSlide + 1 < total) {
      setCurrentSlide((val) => val + 1);
      setAnswerList(childrenList[currentSlide+1].answers)
      setID(childrenList[currentSlide+1].childrenID)
    }
  }
  function goPrev() {
    if (currentSlide > 0) {
      setCurrentSlide((val) => val - 1);
      setAnswerList(childrenList[currentSlide-1].answers)
      setID(childrenList[currentSlide-1].childrenID)
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
      <button onClick={goPrev}>앞</button>
      <button onClick={goNext}>뒤</button>
      <Container>
        {childrenList.map((child, idx) => {
          return <Slider key={`아이번호${child.childrenID}`} check={check(idx)} child={child} />;
        })}
      </Container>
    </>
  );
}

export default MainCarousel;
