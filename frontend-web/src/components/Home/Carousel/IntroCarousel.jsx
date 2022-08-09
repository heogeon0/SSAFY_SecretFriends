import styled from "styled-components";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const CarouselBox = styled.div`
  padding: 2rem;
`
const ItemBox = styled.div`
  padding: 0 1rem;
`
const ImgBox = styled.img`
  display: inline;
  height: 500px;
  width: 900px;
  border-radius: 20px;
  margin: 0 2rem 0 0;
`
const TextBox = styled.div`
  margin: 0 1rem 0 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 500px;
`

const Content = styled.p`
  margin: 10px 0 0 0;
`

function IntroCarousel () {
  const settings = {
    dots: true,
    infinite: true,
    speed: 600,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover : true,
  };

  const data = [
    {id: 0, content: "1", imgURL: "img/carousel/children.jpg"},
    {id: 1, content: "2", imgURL: "img/carousel/children2.jpg"},
    {id: 2, content: "3", imgURL: "img/carousel/sheep.jpg"},
  ]

  return (
    <div>
      <CarouselBox>
        <Slider {...settings}>
          {data.map((slide) => {
            return (
              <ItemBox key={slide.id}>{slide.content}</ItemBox>
            )
          })}
        </Slider>
      </CarouselBox>
    </div>
  );
}

export default IntroCarousel;