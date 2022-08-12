import styled from "styled-components";
import Slider from "./Slider";

import { useRecoilValue } from "recoil";
import { CurrentSlide, ChildrenList } from "../../atom";


const Container = styled.div`
  position: relative;
  margin: auto;
  width: 70%;
  max-width: 800px;
  height: 80%;
`;


function MainCarousel() {
  const currentSlide = useRecoilValue(CurrentSlide);
  const childrenList = useRecoilValue(ChildrenList);
  
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
      <Container>
        {childrenList.map((child, idx) => {
          return <Slider key={`아이번호${child.childrenID}`} check={check(idx)} child={child} idx={idx} />;
        })}
      </Container>
    </>
  );
}

export default MainCarousel;
