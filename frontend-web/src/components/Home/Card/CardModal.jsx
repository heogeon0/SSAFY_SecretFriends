import styled from "styled-components";
import Slider from "react-slick";

import "slick-carousel/slick/slick.css"; 
import "slick-carousel/slick/slick-theme.css";


const ContentBox = styled.div`
  display: flex;
  /* flex-direction: column; */
`

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.507);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`

const ModalBody = styled.div`
  position: absolute;
  width: 70vw;
  min-width: 200px;
  height: 45vw;
  padding: 20px;
  background-color: rgb(255, 255, 255);
  border-radius: 5px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
`

const ModalCloseBtn = styled.button`
  position: absolute;
  bottom: 2vw;
  right: 2vw;
  border: none;
  color: black;
  background-color: #ececec;
  border-radius: 2vw;
  font-size: 1.5vw;
  padding: 0 1vw;
  :hover {
    cursor: pointer;
  }
`

const RowFlex = styled.div`
  display: flex;
  flex-direction: column;
  padding: 1.5vw;
`

const Title = styled.div`
  font-size: 3vw;
  font-weight: bold;
  margin: 1vw 1vw;
`
const ImgBox = styled.img`
  width: 27vw;
  height: 37.5vw;
  object-fit: cover;
  border-radius: 5px;
  margin: 2vw 0 2vw 3vw;
`

const CardText = styled.div`
  font-size: min(1.6vw, 1rem);
  line-height: 1.6vw;
  height: 30vw;
  margin: 0.3vw;
  padding: 0.5vw;
  overflow-y: scroll;
`


function CardModal (props) {
  const title = props.item.title;
  const imgSrc = props.item.imgSrc;
  const description = props.item.description;

  function closeModal () {
    props.closeModal();
  }

  return (
    <Modal onClick={closeModal}>
      <ModalBody onClick={(event) => event.stopPropagation()}>
        <ContentBox>
          <ImgBox src={imgSrc}></ImgBox>
          <RowFlex>
            <Title>{title}</Title>
            <CardText style={{whiteSpace: "pre-wrap", textAlign: "left"}}>{description}</CardText>
          </RowFlex>
        </ContentBox>
        <ModalCloseBtn onClick={closeModal}>닫기</ModalCloseBtn>
      </ModalBody>
    </Modal>
  )
}

export default CardModal;