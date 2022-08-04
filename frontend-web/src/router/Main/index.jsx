import { useEffect, useState } from "react";
import { Wrapper } from "./styles";

import { useRecoilState } from "recoil";
import { ChildrenID, MemberID, CurrentSlide, ChildrenList } from "../../atom";

import axios from "axios";
import drf from "../../api/drf";
import { Link } from 'react-router-dom';
import MainCarousel from "../../components/Main/MainCarousel";


function Main() {
  const [memberID, setmemberID] = useRecoilState(MemberID);
  const [childrenID, setChildrenID] = useRecoilState(ChildrenID);
  const [currentSlide, setCurrentSlide] = useRecoilState(CurrentSlide);
  const [childrens, setChildrens] = useRecoilState(ChildrenList);

  const [children, setChildren] = useState([]);
  // const [childrenNumber, setChildrenNumber] = useState(0);

  useEffect(() => {
    axios({
      url: drf.member.member(),
      method: "get",
      headers: {Authorization: 'Bearer ' + localStorage.getItem("token"),},
    }).then((res) => {
      setmemberID(res.data.memberID)
      setChildrenID(res.data.childrens[currentSlide]?.childrenID)
      setChildren(res.data.childrens)
      setChildrens([...res.data.childrens, {childrenId: 0}])
      // setChildrenNumber(res.data.childrens.length)
    })
  }, [])

  const answers = childrens ? childrens[currentSlide]?.answers : null;
  console.log(childrens[currentSlide])

  function deleteChildren(childrenID) {
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

  function updateAnswer(answerID, questionID) {
    axios({
      url: drf.answer.updateAnswer(answerID),
      method: "put",
      headers: {Authorization: 'Bearer ' + localStorage.getItem("token"),},
    })
  }

  function deleteAnswer(answerID, questionID) {
    axios({
      url: drf.answer.updateAnswer(answerID),
      method: "delete",
      headers: {Authorization: 'Bearer ' + localStorage.getItem("token"),},
    }).then((res) => {
      console.log(res)
      window.location.reload()  // 새로고침 필요
    })
    .catch((err) => {console.log(err)})
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
            { childrenID 
              ? <button>추가하기</button>
              : null
            }
            <p>\아이에게 해주고싶은말</p>
            <div className="body_conversation">
              { answers ? answers.map((answer) => {
                return (
                  <div key={answer.answerID}>
                    <span key={answer.answerID}>{answer.content}</span>
                    <button onClick={() => updateAnswer(answer.answerID, answer.questionID)}>수정</button>
                    <button onClick={() => deleteAnswer(answer.answerID, answer.questionID)}>삭제</button>
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
