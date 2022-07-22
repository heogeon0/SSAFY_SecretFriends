import Slider from "react-slick";
import styled from "styled-components";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const CarouselBox = styled.div`
  padding: 3rem;
`
const ItemBox = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  /* justify-content: center;
  align-items: center; */
`

function IntroCarousel () {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    // autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: true,
    pauseOnHover : true,
  };
  return (
    <CarouselBox>
      <Slider {...settings}>
        <ItemBox>
          <div>slide 1 설명</div>
          <img src="img/main.png" height={400} alt="" />
        </ItemBox>
        <ItemBox>
          <div>slide 2 설명</div>
          <img src="img/technical.png" height={400} alt="" />
        </ItemBox>
        <ItemBox>
          <div>slide 3 설명</div>
          <img src="img/effects.png" height={400} alt="" />
        </ItemBox>
      </Slider>
    </CarouselBox>
  );
}

export default IntroCarousel;