import Wrapper from "./styles";

import Conversation from "../../components/Childern/Conversation";

import axios from "axios";
import drf from "../../api/drf";

import { useParams, useNavigate } from "react-router-dom";
import { useRecoilState } from "recoil";
import { Chats } from "../../atom";



function CreateAnswer() {
  const childrenID = parseInt(useParams().childrenID)
  const [chats, setChats] = useRecoilState(Chats);
  const navigate = useNavigate();

// 답변 추가하기
  function plusNewAnswer() {
    axios({
      url: drf.answer.answers(),
        method: "post",
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
        data: {
          childrenID: childrenID,
          content: chats,
          cratedAt: new Date(),
          questionID: 1,
        }
    }).then((res) => {
      goMain()
    }).catch((err) => {
      console.log(err)
    })
  }

  function goMain() {
    setChats([])
    navigate('/main')
  }


  return (
    <div style={{ height: "90vh" }}>
      <Wrapper>
        <div className="grid">
          <div className="side">
            <div className="isActive step">
              <p>Step 1</p>
              <span>대화 등록하기</span>
            </div>
          </div>
          <div className="content">
            <div><Conversation /></div>
            <div className="buttonWrap">
              <button onClick={plusNewAnswer}>완료</button>
            </div>
          <button onClick={() => goMain()}>나가기</button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
export default CreateAnswer;
