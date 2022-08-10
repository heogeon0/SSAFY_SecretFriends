import styled from "styled-components";
import Slider from "./Slider";

import { useState } from "react";

const Container = styled.div`
  position: relative;
  margin: auto;
  width: 70%;
  max-width: 800px;
  height: 80%;
`;

function ModalCarousel({imgs}) {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const total = 3;
  function goNext() {
    if (currentSlide + 1 < total) {
      setCurrentSlide((val) => val + 1);
    }
  }
  function goPrev() {
    if (currentSlide > 0) {
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
      <button onClick={goPrev}>앞</button>
      <button onClick={goNext}>뒤</button>
      <Container>
        {imgs.map((img, idx) => {
          return <Slider key={idx} check={check(idx)} img={img} idx={idx} />;
        })}
      </Container>
    </>
  );
}

export default ModalCarousel;
