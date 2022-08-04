import { useState } from "react";
import styled from "styled-components";
import ESlider from "./ESlider";
import { useRecoilState } from "recoil";
import { ChildrenID } from "../../atom";
import Example from "./Example";

const Container = styled.div`
  position: relative;
  margin: auto;
  width: 70%;
  max-width: 800px;
  height: 80%;
`;

function Carousel({children, answers, setAnswers}) {
  console.log(children)
  const [childrenID, setChildrenID] = useRecoilState(ChildrenID);
  
  console.log(childrenID)
  console.log(answers)

  const slider = [
    { id: 0, bg: "https://picsum.photos/200/300" },
    { id: 1, bg: "../../img/plus.png" },
  ];
  const [currentSlide, setCurrentSlide] = useState(0);
  const total = slider.length;
  console.log(total);
  function goNext() {
    if (currentSlide + 1 < total) setCurrentSlide((val) => val + 1);
  }
  function goPrev() {
    if (currentSlide > 0) setCurrentSlide((val) => val - 1);
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
        {children.map((child) => {
          return (
            <div>
              <Example key={child.childrenID} child={child} answers={answers} setAnswers={setAnswers}></Example>
            </div>
            // <div style={{ border: "solid black 1px" }} key={child.childrenID}>child</div>
            // <ESlider key={child.childrenID} check={check(idx)} child={child} />
            // return <ESlider key={child.chidlrenID} childrenID={child.childrenID} check={check(idx)} bg="https://picsum.photos/200/300" />;
          )
        })}
      </Container>
    </>
  );
}

export default Carousel;
