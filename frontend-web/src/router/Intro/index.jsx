import styled from "styled-components";

import IntroCarousel from "../../components/Home/Carousel/IntroCarousel";
import CardList from "../../components/Home/Card/CardList";
import Wrapper from "./styles";

import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { Token } from "../../atom";


const StyledLink = styled(Link)`
  margin: 1vw 1.5vw 2vw;
  padding: 0.8vw 1vw;
  border: solid 1px #c4c4c4;
  border-radius: 4vw;
  font-family: ${props => props.theme.pretendard};
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
    <Wrapper>
      <div className="intro-box">
        <div className="title">"나의 단짝 친구"</div>
        <hr style={{borderTop: 'dotted', width: '35vw', color: 'white', boxShadow: 'gray'}} />
        <IntroCarousel/>
      </div>
      
        <div className="intro-container">
          <div style={{marginTop: "3vw", textAlign: "center" }}>
            <div className="introduction">2022년 8월, 병원에 있는 아이들을 위한 특별한 서비스가 시작됩니다.</div>
            <div className="introduction">우리 아이에게 소중한 추억을 만들어주세요.</div>
          </div>
          <>
            { token 
              ? <StyledLink to="/main">시작하기</StyledLink>
              : <StyledLink to="/login">시작하기</StyledLink>
            }
          </>
          <div style={{padding: "0 3vw"}}>
            <CardList />
          </div>
        </div>
        <div>
          <div className="scroll-btn">
            <i onClick={moveToTop} className="fa-solid fa-circle-chevron-up fa-2xl" style={ pageTop }></i>
          </div>
          <div className="scroll-btn">
            <i onClick={moveToBottom} className="fa-solid fa-circle-chevron-down fa-2xl" style={ pageBottom }></i>
          </div>
        </div>
      <hr style={{width: '95%', margin: "auto"}} />
    </Wrapper>
  )
}

export default Intro;