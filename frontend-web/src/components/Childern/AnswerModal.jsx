import "./styles/Modal.css"

import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import drf from "../../api/drf";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";
import { AnswerList } from "../../atom";

const ContentBox = styled.div`
  /* display: flex; */
`

function AnswerModal (props) {
  const answer = props.answer;
  const [chat, setChat] = useState(props.answer.content);
  const [answerID, setAnswerID] = useState(answer.answerID);
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
    <div className="Modal" onClick={closeModal}>
      <div className="modalBody" onClick={(event) => event.stopPropagation()}>
        <ContentBox>
          <h3>메시지 수정하기</h3>
          <br />
          <form>
            <input type="text" value={chat} onChange={ChangeChat} />
            <button onClick={onSubmit}>수정하기</button>
          </form>
        </ContentBox>
        <button id="modalCloseBtn" onClick={closeModal}>닫기</button>
      </div>
    </div>
  )
}

export default AnswerModal;