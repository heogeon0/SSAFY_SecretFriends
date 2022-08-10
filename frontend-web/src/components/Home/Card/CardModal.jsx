import "../styles/CardModal.css"
import styled from "styled-components";
// import ModalCarousel from "./ModalCarousel";
import ModalCarousel from "../Carousel/ModalCarousel";


const ContentBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  @media ${props => props.theme.mobile} {
    flex-direction: column;
  }
`
const CardText = styled.div`
  font-size: min(1.8vw, 1rem);
  width: 50vw;
  height: 10vh;
  overflow-y: scroll;
  background-color: ${(props) => props.theme.grayColor};
  padding: 1vh;
  margin: 1vh;
  font-weight: lighter;
  @media ${props => props.theme.mobile} {
    font-size: 2.1vw;
    margin: 2vw 2vw;
  }
`

function CardModal (props) {
  const description = props.description;
  const imgs = props.imgs;
  function closeModal () {
    props.closeModal();
  }

  return (
    <div className="Modal" onClick={closeModal}>
      <div className="modalBody" onClick={(event) => event.stopPropagation()}>
        <ContentBox>
          <ModalCarousel imgs={imgs}></ModalCarousel>
          <CardText style={{whiteSpace: "pre-wrap", textAlign: "left"}}>{description}</CardText>
        </ContentBox>
        <button id="modalCloseBtn" onClick={closeModal}>닫기</button>
      </div>
    </div>
  )
}

export default CardModal;