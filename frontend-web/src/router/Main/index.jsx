import { useEffect, useState } from "react";
import { Wrapper } from "./styles";

import { useRecoilState } from "recoil";
import { MemberID, CurrentSlide, ChildrenList } from "../../atom";

import axios from "axios";
import drf from "../../api/drf";
import { Link } from 'react-router-dom';
import NoChildCarousel from "../../components/Main/NoChildCarousel";
import MainCarousel from "../../components/Main/MainCarousel";


function Main() {
  const [memberID, setmemberID] = useRecoilState(MemberID);
  const [currentSlide, setCurrentSlide] = useRecoilState(CurrentSlide);
  const [childrens, setChildrens] = useRecoilState(ChildrenList);

  const [children, setChildren] = useState([]);
  const [childrenNumber, setChildrenNumber] = useState(0);

  useEffect(() => {
    axios({
      url: drf.member.member(),
      method: "get",
      headers: {Authorization: 'Bearer ' + localStorage.getItem("token"),},
    }).then((res) => {
      console.log(res)
      setmemberID(res.data.memberID)
      setChildren(res.data.childrens)
      setChildrens((old) => [...res.data.childrens, ...old])
      setChildrenNumber(res.data.childrens.length)
    })
  }, [])

  const answers = childrens[currentSlide].answers;
  console.log(childrens)

  return (
    <Wrapper>
      <div>
        <Link style={{textDecoration: 'none', margin: '0 1rem 0 0'}} to="/updateMember">회원정보 수정</Link>
        <Link style={{textDecoration: 'none', margin: '0 1rem 0 0'}} to="/createChildren">아이정보 등록</Link>
        <Link style={{textDecoration: 'none'}} to="/signout">회원 탈퇴</Link>
      </div>
      <div className="head">
        { !childrenNumber ? <NoChildCarousel /> : <MainCarousel />}
        {/* <MainCarousel /> */}
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
            <p>\아이에게 해주고싶은말</p>
            <div className="body_conversation">
              { answers ? answers.map((answer) => {
                return (
                  <div key={answer.answerID}>{answer.content}</div>
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
