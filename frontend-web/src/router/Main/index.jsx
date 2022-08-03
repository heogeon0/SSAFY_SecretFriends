import { useEffect } from "react";
import MainCarousel from "../../components/Main/MainCarousel";
import { Wrapper } from "./styles";

import { useRecoilState } from "recoil";
import { MemberID } from "../../atom";

import axios from "axios";
import drf from "../../api/drf";
import { Link } from 'react-router-dom';


function Main() {
  const [memberID, setmemberID] = useRecoilState(MemberID);

  useEffect(() => {axios.defaults.withCredentials = true;
    axios.get("http://localhost:9999/mybuddy/member/info/", {
      headers:
      {
        Authorization: 'Bearer ' + localStorage.getItem("token"),
      },
    })
    .then(res => {
      setmemberID(res.data.memberID)
      console.log(memberID)
    })
    .catch(err => {
      console.log(err)
    })
  })

  return (
    <Wrapper>
      <div>
        <Link style={{textDecoration: 'none', margin: '0 1rem 0 0'}} to="/updateMember">회원정보 수정</Link>
        <Link style={{textDecoration: 'none', margin: '0 1rem 0 0'}} to="/createChildren">아이정보 등록</Link>
        <Link style={{textDecoration: 'none'}} to="/signout">회원 탈퇴</Link>
      </div>
      <div className="head">
        <MainCarousel />
      </div>
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
            {/* map 돌릴 예정 */}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Main;
