import "./styles.css"
import styled from "styled-components";
import ModalCaoursel from "./ModalCarousel";


const ContentBox = styled.div`
  display: flex;
`

function CardModal (props) {
  function closeModal () {
    props.closeModal();
  }
  console.log(props.description)
  return (
    <div className="Modal" onClick={closeModal}>
      <div className="modalBody" onClick={(event) => event.stopPropagation()}>
        <ContentBox>
          {/* <ModalCaoursel imgs={props.imgs}></ModalCaoursel> */}
          <div style={{margin: '2rem 2rem 2rem 3rem'}}>{props.description}</div>
        </ContentBox>
        <button id="modalCloseBtn" onClick={closeModal}>닫기</button>
      </div>
    </div>
  )
}

export default CardModal;