import styled from "styled-components";
import { getStorage, ref, deleteObject, upload } from "firebase/storage";

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.055);
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalBody = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: flex-end;
  width: 60%;
  max-width: 650px;
  padding: 5vw 1rem;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 12px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  @media ${props => props.theme.mobile} {
    width: 50%;
    max-height: 250px;
    padding: 2rem 1rem;
  }
`

const Box = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const ModalBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  color: rgba(0, 0, 0, 0.7);
  background-color: transparent;
  font-size: min(2vw, 16px);
  :hover {
    cursor: pointer;
  }
`

const ModalImg = styled.img`
  position: relative;
  max-height: 90%;
  max-width: 90%;
  box-shadow: 3px 3px 3px gray;
`

const Title = styled.div`
  margin-bottom: 2vw;
  font-size: min(3vw, 2rem);
  font-family: ${props => props.theme.namingFont};
  @media ${props => props.theme.mobile} {
    font-size: min(2vw, 1rem);
  }
`
const Icon = styled.i`
  font-size: min(4vw, 2rem);
  margin: 0 1vw 0 0.5vw;
  :hover {
    cursor: pointer;
  }
`


function ImageModal (props) {
  const imgURL = props.imgURL;
  function closeModal () {
    props.closeModal();
  }

  function storeImg() {
    const xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
      const blob = xhr.response;
      const a = document.createElement('a');
      a.href = window.URL.createObjectURL(blob);
      a.download = "photo"; // Name the file anything you'd like.
      a.style.display = 'none';
      document.body.appendChild(a);
      a.click();
    };
    xhr.open('GET', imgURL);
    xhr.send();
  }


  return (
    <Modal onClick={closeModal}>
      <ModalBody onClick={(event) => event.stopPropagation()}>
        <Box>
          <Title>사진을 저장해 보세요</Title>
          <ModalImg src={imgURL} alt="childrenImage" />
        </Box>
        <Icon onClick={() => {storeImg()}} className="fa-solid fa-download"></Icon>
        <ModalBtn onClick={closeModal}>닫기</ModalBtn>
      </ModalBody>
    </Modal>
  )
}

export default ImageModal;