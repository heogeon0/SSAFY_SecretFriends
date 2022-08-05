import "./styles/Modal.css"

import styled from "styled-components";
import { useEffect, useState } from "react";
import axios from "axios";
import drf from "../../api/drf";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState, useSetRecoilState } from "recoil";

const ContentBox = styled.div`
  /* display: flex; */
`

function AnswerModal (props) {
  const answer = props.answer;
  console.log(answer)
  const [chat, setChat] = useState(props.answer.content);
  const [answerID, setAnswerID] = useState(answer.answerID);
  const navigate = useNavigate();

  function closeModal () {
    props.closeModal();
  }

  function ChangeChat(event) {
    setChat(event.target.value.trim());
  }

  function onSubmit(event) {
    event.preventDefault();
    console.log(chat)
    axios({
      url: drf.answer.updateAnswer(answer.answerID),
        method: "put",
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
        data: {
          answerID: answerID,
          content: chat,
          questionID: 1,
        }
      }).then((res) => {
        navigate('/main')
        window.location.reload(); // 새로고침
        console.log(res)
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