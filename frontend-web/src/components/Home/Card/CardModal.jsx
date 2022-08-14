import styled from "styled-components";


const ContentBox = styled.div`
  display: flex;
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
  @media ${props => props.theme.mobile} {
    padding: 10px;
  }
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
  font-family: ${props => props.theme.pretendard};
  padding: 2px 1vw;
  :hover {
    cursor: pointer;
  }
`

const RowFlex = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  height: 80%;
  padding: 10px;
  @media ${props => props.theme.mobile} {
    max-height: 140px;
  }
`

const Title = styled.div`
  font-family: ${props => props.theme.pretendard};
  font-size: 3.5vw;
  font-weight: bold;
  margin: 1vw 1vw;
`
const ImgBox = styled.img`
  max-height: 60%;
  max-width: 40%;
  object-fit: cover;
  border-radius: 5px;
  margin: 2vw 0 2vw 3vw;
  @media ${props => props.theme.mobile} {
    max-height: 120px;
  }
`

const CardText = styled.div`
  font-family: ${props => props.theme.pretendard};
  font-weight: lighter;
  font-size: min(1.6vw, 1rem);
  line-height: 2vw;
  height: 30vw;
  margin: 0.3vw;
  padding: 0.5vw;
  overflow-y: scroll;
  @media ${props => props.theme.mobile} {
    font-size: min(0.5vw, 6px);
    line-height: 2.7vw;
  }
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