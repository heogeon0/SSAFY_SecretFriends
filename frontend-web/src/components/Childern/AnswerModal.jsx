import styled from "styled-components";
// import "./styles/Modal.css"

import drf from "../../api/drf";
import axios from "axios";

import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { AnswerList } from "../../atom";

const ContentBox = styled.div`
  display: flex;
  width: 90%;
  flex-direction: column;
  justify-content: center;
`
const Title = styled.div`
  font-size: min(3.5vw, 1.2rem);
  font-weight: bold;
  /* margin-top: 1.5rem; */
  @media ${props => props.theme.mobile} {
    font-size: min(3.8vw, 1rem);
  }
`
const InputTag = styled.input`
  padding: 10px;
  width: 100%;
  background-color: ${(props) => props.theme.grayColor};
  height: 2.5rem;
  font-family: ${(props) => props.theme.namingFont};
  border: ${(props) => props.theme.grayColor} 1px solid;
  border-radius: 5px;
  margin-bottom: 1rem;
  @media ${props => props.theme.mobile} {
    height: 1.6rem;
  };
`
const Button = styled.button`
  padding: 0.3rem 0.8rem;
  float: right;
  margin-left: 6px;
  background-color: #cde6d9;
  border: none;
  border-radius: 4vw;
  :hover {
    cursor: pointer;
  }
`

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
  width: 40%;
  display: flex;
  justify-content: center;
  /* height: 35%; */
  min-width: 350px;
  min-height: 250px;
  max-width: 500px;
  max-height: 500px;
  padding: 20px;
  text-align: center;
  background-color: rgb(255, 255, 255);
  border-radius: 12px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
`
const ModalCloseBtn = styled.button`
  position: absolute;
  top: 15px;
  right: 15px;
  border: none;
  color: rgba(0, 0, 0, 0.7);
  background-color: transparent;
  font-size: 16px;
  :hover {
    cursor: pointer;
  }
`

function AnswerModal (props) {
  const answer = props.answer;
  const [chat, setChat] = useState(answer.content);
  const answerID = useState(answer.answerID)[0];
  const [answerList, setAnswerList] = useRecoilState(AnswerList);
  const navigate = useNavigate();

  function closeModal () {
    props.closeModal();
  }

  function ChangeChat(event) {
    setChat(event.target.value);
  }

  function onSubmit(event) {
    event.preventDefault();
    const newAnswerList = [];
    answerList.map((answer) => {
      if (answer.answerID === answerID) {
        const newChat = {
          answerID: answer.answerID,
          childrenID: answer.childrenID,
          content: chat,
          createdAt: answer.createdAt,
          isUsed: answer.isUsed,
          questionID: answer.questionID
        }
        newAnswerList.push(newChat);
      } else {
        newAnswerList.push(answer)
      }
    })
    axios({
      url: drf.answer.updateAnswer(answer.answerID),
        method: "put",
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
        data: {
          answerID: answerID,
          content: chat.trim(),
          questionID: 1,
        }
      }).then((res) => {
        setAnswerList(newAnswerList)
        closeModal()
        navigate('/main')
      })
      .catch((err) => {
        console.log(err)
    })
  }

  return (
    <Modal onClick={closeModal}>
      <ModalBody onClick={(event) => event.stopPropagation()}>
        <ContentBox>
          <Title>아이에게 전할 말을 적어주세요.</Title>
          <br />
          <form>
            <InputTag type="text" value={chat} onChange={ChangeChat} />
            <Button onClick={onSubmit}>수정하기</Button>
          </form>
        </ContentBox>
        <ModalCloseBtn onClick={closeModal}>닫기</ModalCloseBtn>
      </ModalBody>
    </Modal>
  )
}

export default AnswerModal;