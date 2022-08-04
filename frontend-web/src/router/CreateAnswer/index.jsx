import Wrapper from "./styles";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Conversation from "../../components/Childern/Conversation";
import { useRecoilValue, useRecoilState } from "recoil";
import { Chats } from "../../atom";

import axios from "axios";
import drf from "../../api/drf";
import { useNavigate } from "react-router-dom";


function CreateAnswer() {
  const [childrenID, setChildrenID] = useState();
  const params = parseInt(useParams(childrenID).childrenID)
  console.log(params)
  const [slide, setSlide] = useState(1);
  const [error, setError] = useState("");
  const [chats, setChats] = useRecoilState(Chats);

  // useEffect(() => {
  //   axios({
  //     url: drf.member.member(),
  //     method: "get",
  //     headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
  //   })
  //     .then(res => {
  //       setMemberID(res.data.memberID)
  //     })
  //     .catch(err => console.log(err))
  // })

  const navigate = useNavigate();

  async function createAnswer () {
    try {
      const res = await axios({
        url: drf.answer.answers(),
        method: "post",
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
        data: {
          childrenID: params,
          content: chats,
          cratedAt: new Date(),
          questionID: 1,
        }
      })
      goMain()
      console.log(res)
    }
    catch(e) {
      console.log(e)
    }
  }
  // after three axios done, it goes to "main" page
  async function goMain () {
    try {
      setChats([])
      navigate('/main')
    }
    catch(err) {
      console.log(err)
    }
  }

  function goOut() {
    navigate('/main')
  }


// child information registration
// function to move to the mext in the child registration form
// movement restrictions placed
  function goNext() {
    createAnswer()
  }

  // function to move to the previous in the child registration form
  // no constrains
  function goPre() {
    if (slide > 1) {
      setSlide((val) => val - 1);
    }
  }

  // component call according to step (step1-4)
  const tab = {
    1: <Conversation />,
  };

  return (
    <div style={{ height: "90vh" }}>
      <Wrapper>
        <div className="grid">
          <div className="side">
            <div className={slide === 1 ? "isActive step" : "step"}>
              <p>Step 1</p>
              <span>대화 등록하기</span>
            </div>
          </div>
          <div className="content">
            <div>{tab[slide]}</div>
            {error ? <p className="error">{error}</p> : ""}
            <div className="buttonWrap">
              <button onClick={goPre}>이전</button>
              <button onClick={goNext}>{slide === 1 ? "완료" : "다음"}</button>
            </div>
          <button onClick={() => goOut()}>나가기</button>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
export default CreateAnswer;
