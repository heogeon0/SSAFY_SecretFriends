import Wrapper from "./styles";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";

const Box = styled.div`
  background-image: url("img/background/pink.jpg");
  background-size: cover;
  height: 700px;
`


function NotFound404 () {
  const navigate = useNavigate();
  function goHome() {
    navigate('/');
  }
  return (
    <Box>
      <Wrapper>
        <div className="title1">404</div>
        <div className="title2">Not Found</div>
        <hr style={{width: "90%", height: "1px", backgroundColor: "gray", margin: "1rem"}} />
        <div className="content">요청한 페이지를 찾을 수 없습니다.</div>
        <div className="content">입력한 주소가 정확한지 다시 한 번 확인해주세요.</div>
        <button className="home_btn" onClick={() => goHome()}>홈으로 가기</button>
      </Wrapper>
    </Box>
    
  )
}

export default NotFound404;