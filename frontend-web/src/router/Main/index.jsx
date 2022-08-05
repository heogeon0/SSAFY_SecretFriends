import { useEffect, useState } from "react";
import { Wrapper } from "./styles";

import { useRecoilState } from "recoil";
import { MemberID, CurrentSlide, ChildrenList, AnswerList } from "../../atom";

import axios from "axios";
import drf from "../../api/drf";
import { Link } from 'react-router-dom';
import MainCarousel from "../../components/Main/MainCarousel";
import AnswerModal from "../../components/Childern/AnswerModal";


function Main() {
  const [memberID, setmemberID] = useRecoilState(MemberID);
  const [currentSlide, setCurrentSlide] = useRecoilState(CurrentSlide);
  const [childrens, setChildrens] = useRecoilState(ChildrenList);
  const [answerList, setAnswerList] = useRecoilState(AnswerList);

  useEffect(() => {
    axios({
      url: drf.member.member(),
      method: "get",
      headers: {Authorization: 'Bearer ' + localStorage.getItem("token"),},
    }).then((res) => {
      setmemberID(res.data.memberID)
      setAnswerList(res.data.childrens[currentSlide]?.answers)
      setChildrens([...res.data.childrens, {childrenID: 0}])
    })
  }, [])

  console.log(answerList)
  
  // const answers = childrens ? childrens[currentSlide]?.answers : null;
  const answers = answerList;
  const childrenID = childrens[currentSlide]?.childrenID;


  function deleteChildren(childrenID) {
    if (window.confirm('정말 삭제하시겠습니까?')) {
      axios({
        url: drf.children.children(childrenID),
        method: "delete",
        headers: {Authorization: 'Bearer ' + localStorage.getItem("token"),},
      }).then((res) => {
        console.log(res)
        window.location.reload()
      })
      .catch((err) => {console.log(err)})
    }
  }

  function deleteAnswer(answerID) {
    axios({
      url: drf.answer.updateAnswer(answerID),
      method: "delete",
      headers: {Authorization: 'Bearer ' + localStorage.getItem("token"),},
    }).then((res) => {
      console.log(res)
      // window.location.reload()  // 새로고침 필요
    })
    .catch((err) => {console.log(err)})
  }


  const [close, setClose] = useState(false) // 모달창 닫는 변수
  const [num, setNum] = useState();

  function updateActivate(answer, idx) {
    console.log(answer)
    setNum(idx)
    setClose(!close)
  }

  return (
    <Wrapper>
      <div>
        <Link style={{textDecoration: 'none', margin: '0 1rem 0 0'}} to="/updateMember">회원정보 수정</Link>
        <Link style={{textDecoration: 'none', margin: '0 1rem 0 0'}} to="/createChildren">아이정보 등록</Link>
        <Link style={{textDecoration: 'none'}} to="/signout">회원 탈퇴</Link>
      </div>
      <div className="head">
        <MainCarousel />
        { childrenID
          ? <button onClick={() => deleteChildren(childrenID)}>아이 삭제</button>
          : null
        }
        { childrenID ? <Link to={`/UpdateChildren/${childrenID}`}><button>아이정보 수정</button></Link> : null }
      </div>
      <>
        <div className="body">
          <div className="body_grid">
            <p>\아이와 \공팔이가 함께한 사진들</p>
            <div className="body_picture">
              {/* firebase 활용 예정 */}
            </div>
          </div>
          <div className="body_grid">
          { childrenID ? <button><Link to={`/CreateAnswer/${childrenID}`}>추가하기</Link></button> : null }
            <p>\아이에게 해주고싶은 말</p>
            <div className="body_conversation">
              { answers ? answers.map((answer, idx) => {
                return (
                  <div key={answer.answerID}>
                    <span>{answer.content}</span>
                    <span>{answer.createdAt}</span>
                    <button onClick={() => updateActivate(answer, idx)}>수정</button>
                    <button onClick={() => deleteAnswer(answer.answerID, answer.questionID)}>삭제</button>
                    { close && num===idx && (<AnswerModal answer={answer} closeModal={() => setClose(!close)} />)}
                  </div>
                )
              }) : null}
            </div>
          </div>
        </div>
      </>
    </Wrapper>
  );
}

export default Main;
