import { useState } from "react";
import styled from "styled-components";
import Slider from "./ESlider";

const Container = styled.div`
  position: relative;
  margin: auto;
  width: 70%;
  max-width: 800px;
  height: 80%;
`;

function NoChildCarousel() {
  const slider = [
    // { id: 0, bg: "https://picsum.photos/200/300" },
    { id: 0, bg: "../../img/plus.png" },
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
      <Container>
        {slider.map((val) => {
          return <Slider key={val.id} check={check(val.id)} bg={val.bg} />;
        })}
      </Container>
    </>
  );
}

export default NoChildCarousel;
