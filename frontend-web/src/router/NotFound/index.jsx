import Wrapper from "./styles";
import styled from "styled-components";

import { useNavigate } from "react-router-dom";

const Box = styled.div`
  background-image: url("img/background/pink.jpg");
  background-size: cover;
  height: 700px;
`

const Title1 = styled.div`
  font-size: min(5vw, 3rem);
  font-weight: bold;
  font-family: ${props => props.theme.standardFont};
`
const Title2 = styled.div`
  font-size: min(5vw, 3rem);
  font-weight: bold;
  font-family: ${props => props.theme.standardFont};
`
const Content = styled.div`
  font-size: min(2vw, 1.2rem);
  margin: 0.5vw;
  @media ${props => props.theme.mobile} {
    font-size: 0.4vw;
    margin: 0.4vw;
  }
`
const Button = styled.button`
  font-size: min(2vw, 1rem);
  margin: 3vw 0 0 0;
  border-radius: 10vw;
  border: none;
  padding: 0.5vw 1vw;
  background-color: ${props => props.theme.grayColor};
  :hover {
    cursor: pointer;
  }
`


function NotFound404 () {
  const navigate = useNavigate();
  function goHome() {
    navigate('/');
  }
  return (
    <Box>
      <Wrapper>
        <>
          <Title1>404</Title1>
          <Title2>Not Found</Title2>
          <hr style={{width: "90%", height: "1px", backgroundColor: "gray", margin: "1rem"}} />
          <Content>요청한 페이지를 찾을 수 없습니다.</Content>
          <Content>입력한 주소가 정확한지 다시 한 번 확인해주세요.</Content>
          <Button onClick={() => goHome()}>홈으로 가기</Button>
        </>
      </Wrapper>
    </Box>
    
  )
}

export default NotFound404;