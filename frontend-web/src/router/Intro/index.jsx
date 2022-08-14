import styled from "styled-components";

import IntroCarousel from "../../components/Home/Carousel/IntroCarousel";
import CardList from "../../components/Home/Card/CardList";

import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { Token } from "../../atom";


const Container = styled.div`
  padding: 0 3vw;
`

const IntroBox = styled.div`
  background-image: url("img/background/pink.jpg");
  background-size: cover;
  padding: 1vw 1vw 3vw 1vw;
  `

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Introduction = styled.div`
  font-size: 1.8vw;
  margin: 0 0 0.5vh 0;
`

const Title = styled.div`
  font-size: 5vw;
  font-family: ${props => props.theme.titleFont};
  color: white;
  text-align: center;
  text-shadow: 2px 2px 2px gray;
  padding: 5vw 0 0 0;
`

const ScrollBtn = styled.div`
  :hover {
    cursor: pointer;
  }
`

const StyledLink = styled(Link)`
  margin: 1vw 1.5vw 2vw;
  padding: 0.8vw 1vw;
  border: solid 1px #c4c4c4;
  border-radius: 4vw;
  font-weight: bold;
  font-size: 1.8vw;
  text-decoration: none;
  color: black;
  background-color: #f0f0f0;
  :hover {
    color: white;
    background: black;
  }
`


function Intro () {
  const [token, setToken] = useRecoilState(Token);

  useEffect(() => {
    setToken(localStorage.getItem("token"))
  }, [])

  const pageTop = {
    position: 'fixed',
    bottom: '60px',
    right: '20px',
    width: '20px',
    height: '40px',
    borderRadius: '50%',
    color: '#e7e6e6',
    zIndex: '1',
  }

  const pageBottom = {
    position: 'fixed',
    bottom: '40px',
    right: '20px',
    width: '20px',
    height: '20px',
    borderRadius: '50%',
    color: '#e7e6e6',
    zIndex: '1',
  }

  function moveToTop () {
    document.body.scrollIntoView({behavior: 'smooth'});
  } 

  function moveToBottom () {
    document.body.scrollIntoView({behavior: 'smooth', block: 'end'})
  }



  return (
    <div>
      <IntroBox>
        <Title>"나의 비밀 친구"</Title>
        <hr style={{borderTop: 'dotted', width: '35vw', color: 'white', boxShadow: 'gray'}} />
        <IntroCarousel/>
      </IntroBox>
      
        <IntroContainer>
          <div style={{marginTop: "3vw", textAlign: "center" }}>
            <Introduction>2022년 8월, 병원에 있는 아이들을 위한 특별한 서비스가 시작됩니다.</Introduction>
            <Introduction>우리 아이에게 소중한 추억을 만들어주세요.</Introduction>
          </div>
          <>
            { token 
              ? <StyledLink to="/main">시작하기</StyledLink>
              : <StyledLink to="/login">시작하기</StyledLink>
            }
          </>
        <Container>
          <CardList />
        </Container>
        </IntroContainer>
        <div>
          <ScrollBtn>
            <i onClick={moveToTop} className="fa-solid fa-circle-chevron-up fa-2xl" style={ pageTop }></i>
          </ScrollBtn>
          <ScrollBtn>
            <i onClick={moveToBottom} className="fa-solid fa-circle-chevron-down fa-2xl" style={ pageBottom }></i>
          </ScrollBtn>
        </div>
      <hr style={{width: '95%'}} />
    </div>
  )
}

export default Intro;