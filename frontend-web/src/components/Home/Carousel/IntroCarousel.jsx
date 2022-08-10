import styled from "styled-components";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const CarouselBox = styled.div`
  padding: 2vw 4.5vw;
`
const ItemBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 0 3vw;
`
const ImgBox = styled.img`
  display: inline;
  position: relative;
  width: 100%;
  height: 32vw;
  border-radius: 5px;
  margin: 0 0 3px 0;
  box-shadow: 3px 3px 3px #b3b3b3;
  object-fit: cover;
  filter: brightness(60%);  // 밝기 조절
`
const LeftTextBox = styled.div`
  position: absolute;
  bottom: 0px;
  margin: 3vw;
`

const RightTextBox = styled.div`
  position: fixed;
  text-align: right;
  bottom: 0px;
  left: auto;
  right: auto;
  margin: 3vw 0 3vw 46vw;
`

const Title = styled.div`
  color: white;
  font-weight: bold;
  font-size: 4vw;
`

const SubTitle = styled.div`
  color: white;
  font-weight: bold;
  font-size: 3vw;
`

const Content = styled.p`
  color: white;
  font-size: 1.8vw;
  margin: 0.5vw 0;
`

function IntroCarousel () {
  const settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    autoplay: true,
    autoplaySpeed: 6000,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    pauseOnHover : true,
  };

  const data = [
    {id: 0, imgURL: "img/carousel/children.jpg", title: "맞춤형", subtitle: "My Special Friend", description: [
      "아이가 원하는 캐릭터를 선택할 수 있습니다.", "다양한 캐릭터를 둘러보세요.", "이 중에 아이가 원하는 게 있나요?", "아이에게 특별한 친구를 만들어주세요.",
    ]},
    {id: 1, imgURL: "img/carousel/children2.jpg", title: "소통", subtitle: "Our Secret Story", description: [
      "아이에게 해주고 싶은 말이 있을 거에요.", "아무도 모르게 전해주고 싶지 않나요?", "크리스마스의 산타클로스처럼", "아이와의 비밀 이야기를 시작해보세요.",
    ]},
    {id: 2, imgURL: "img/carousel/sheep_reverse.jpg", title: "즐거움", subtitle: "Eventy Day", description: [
      "병원 생활에 지쳐있는 아이들에게", "즐거움을 선물해보세요.", "캐릭터와의 대화부터 다양한 배경의 사진촬영까지.", "매일매일이 이벤트같은 나날이 되길.",
    ]},
  ]

  return (
    <div>
      <CarouselBox>
        <Slider {...settings}>
          {data.map((slide) => {
            return (
              <ItemBox key={slide.id}>
                <ImgBox src={slide.imgURL}></ImgBox>
                { slide.id % 2 === 0 
                ? 
                <LeftTextBox>
                  <Title style={{margin: "1vw 0"}}>{slide.title}</Title>
                  <SubTitle style={{ margin: "2vw 0" }}>{slide.subtitle}</SubTitle>
                  {slide.description.map((script, idx) => {
                    return (
                      <Content key={idx}>{script}</Content>
                    )
                  })}
                </LeftTextBox>
                : 
                <RightTextBox>
                  <Title style={{margin: "1vw 0"}}>{slide.title}</Title>
                  <SubTitle style={{ margin: "2vw 0" }}>{slide.subtitle}</SubTitle>
                  {slide.description.map((script, idx) => {
                    return (
                      <Content key={idx}>{script}</Content>
                    )
                  })}
                </RightTextBox>
                }
                
              </ItemBox>
            )
          })}
        </Slider>
      </CarouselBox>
    </div>
  );
}

export default IntroCarousel;