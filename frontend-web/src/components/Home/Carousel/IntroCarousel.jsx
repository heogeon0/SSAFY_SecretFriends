import Slider from "react-slick";
import styled from "styled-components";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const CarouselBox = styled.div`
  padding: 2rem;
`
const ItemBox = styled.div`
  height: 500px;
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
// const Button = styled.button`
//   font-weight: bold;
//   font-size: large;
//   border: none;
//   width: 120px;
//   background-color: "#e0e0e00";
//   border-radius: 20px;
//   padding: 10px;
//   margin: 3rem 0 0 0;
//   :hover {
//     cursor: pointer;
//     background-color: black;
//     color: white;
//   }
// `

const Content = styled.p`
  margin: 10px 0 0 0;
`

const ScrollBtn = styled.div`
  :hover {
    cursor: pointer;
  }
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

  const pageTop = {
    position: 'fixed',
    bottom: '60px',
    right: '30px',
    width: '40px',
    height: '40px',
    /* border: 1px solid #eee; */
    borderRadius: '50%',
    color: 'gray',
  }

  const pageBottom = {
    position: 'fixed',
    bottom: '40px',
    right: '30px',
    width: '40px',
    height: '20px',
    borderRadius: '50%',
    color: 'gray',
  }

  function moveToTop () {
    document.body.scrollIntoView({behavior: 'smooth'});
  } 

  function moveToBottom () {
    document.body.scrollIntoView({behavior: 'smooth', block: 'end'})
  }

  return (
    <div>
      {/* carousel */}
      <CarouselBox>
        <Slider {...settings}>
          <ItemBox>
            <div style={{display: 'flex', margin: "0 1rem"}} height="500px">
              <ImgBox src="img/main.png" alt="" />
              <TextBox height="300px">
                <h2 style={{margin: "10px 0"}}>맞춤형</h2>
                <h3 style={{ margin: "10px 0 20px 0" }}>My Special Friend</h3>
                <Content>아이가 원하는 캐릭터를 선택할 수 있습니다.</Content>
                <Content>다양한 캐릭터를 둘러보세요</Content>
                <Content>이 중에 아이가 원하는 게 있나요?</Content>
                <Content>아이에게 특별한 친구를 만들어주세요</Content>
              </TextBox>
            </div>
          </ItemBox>
          <ItemBox>
            <div style={{display: 'flex', margin: "0 1rem"}} height="500px">
              <ImgBox src="img/technical.png" alt="" />
              <TextBox height="300px">
                <h2 style={{margin: "10px 0"}}>소통</h2>
                <h3 style={{ margin: "10px 0 20px 0" }}>Our Secret Story</h3>
                <Content>아이에게 해주고 싶은 말이 있을 거에요.</Content>
                <Content>아무도 모르게 전해주고 싶지 않나요?</Content>
                <Content>크리스마스의 산타클로스처럼</Content>
                <Content>아이와의 비밀 이야기를 시작해보세요.</Content>
              </TextBox>
            </div>
          </ItemBox>
          <ItemBox>
            <div style={{display: 'flex', margin: "0 1rem"}} height="500px">
              <ImgBox src="img/effects.png" style={{width: '300px'}} alt="" />
              <TextBox height="300px">
                <h2 style={{margin: "10px 0"}}>즐거움</h2>
                <h3 style={{ margin: "10px 0 20px 0" }}>Eventy Day</h3>
                <Content>병원 생활에 지쳐있는 아이들에게</Content>
                <Content>즐거움을 선물해보세요.</Content>
                <Content>캐릭터와의 대화부터 다양한 배경의 사진촬영까지.</Content>
                <Content>매일매일이 이벤트같은 나날이 되길.</Content>
              </TextBox>
            </div>
          </ItemBox>
        </Slider>
      </CarouselBox>
      {/* Top, Bottom Scroll button */}
      <div>
        <ScrollBtn>
          <i onClick={moveToTop} className="fa-solid fa-circle-chevron-up fa-2xl" style={ pageTop }></i>
        </ScrollBtn>
        <ScrollBtn>
          <i onClick={moveToBottom} className="fa-solid fa-circle-chevron-down fa-2xl" style={ pageBottom }></i>
        </ScrollBtn>
      </div>
    </div>
  );
}

export default IntroCarousel;