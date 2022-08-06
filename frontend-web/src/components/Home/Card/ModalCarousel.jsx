import styled from 'styled-components';
import "react-alice-carousel/lib/alice-carousel.css";
import AliceCarousel from 'react-alice-carousel';

const Contain = styled.div`
  width:50%;
  display:flex;
  align-items:center;
  margin: 1rem auto;
`

const ItemsContain = styled.div`
  width:100%;
  height:100%;
  padding: 2rem 10px;
`

const ItemsWrap = styled.div`
  width:100%;
  height:180px;
  border-radius:20px;
  overflow:hidden;
  margin:0 20px;

  img{
    width:100%;
    height:100%;
    object-fit:cover;
  }
`

const ModalCarousel = ({imgs}) => {

  const responsive = {
    0: {
      items: 1,
    },
  };

  const images = [
    "img/main.png",
    "img/main.png",
    "img/technical.png",
    "img/technical.png",
    "img/effects.png",
    "img/effects.png"
  ];
  console.log(imgs)
  console.log(images)

  const items = images.map((image) => {
    return (
      <ItemsContain>
      <ItemsWrap>
        <img src={image} alt="" />
      </ItemsWrap>
      </ItemsContain>
    )
  })

  return (
    <Contain>
      <AliceCarousel
        autoHeight={true}
        mouseTracking
        infinite={true}
        autoPlayInterval={5000}
        animationDuration={2000}
        // disableDotsControls
        disableButtonsControls
        responsive={responsive}
        autoPlay
        items={items}
        paddingRight={40}
      />
    </Contain>
  )
  }
export default ModalCarousel;

