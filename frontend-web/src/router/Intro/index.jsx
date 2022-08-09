import styled from "styled-components";

import IntroCarousel from "../../components/Home/Carousel/IntroCarousel";
import CardList from "../../components/Home/Card/CardList";

import { useEffect } from "react";
import { Link } from 'react-router-dom';
import { useRecoilState } from "recoil";
import { Token } from "../../atom";


const IntroBox = styled.div`
  background-image: url("img/background/pastel1.jpg");
  padding: 1rem;
  `

const IntroContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.div`
  font-size: 70px;
  font-family: ${props => props.theme.titleFont};
  color: white;
  text-align: center;
  text-shadow: 2px 2px 2px gray;
  padding: 4rem 0 0 0;
`

const Button = styled.button`
  margin: 1rem;
  padding: 5px 16px;
  font-weight: bold;
  font-size: large;
  background-color: #e7e6e6;
  border: none;
  border-radius: 20px;
  :hover {
    cursor: pointer;
    background-color: black;
    color: white;
  }
`

const ScrollBtn = styled.div`
  :hover {
    cursor: pointer;
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
    right: '30px',
    width: '40px',
    height: '40px',
    borderRadius: '50%',
    color: '#e7e6e6',
  }

  const pageBottom = {
    position: 'fixed',
    bottom: '40px',
    right: '30px',
    width: '40px',
    height: '20px',
    borderRadius: '50%',
    color: '#e7e6e6',
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
        <hr style={{borderTop: 'dotted', width: '500px', color: 'white', boxShadow: 'gray'}} />
        <IntroCarousel/>
      </IntroBox>
      <IntroContainer>
        <div style={{marginTop: "2rem", textAlign: "center" }}>
          <p>2022년 8월, 병원에 있는 아이들을 위한 특별한 서비스가 시작됩니다.</p>
          <br />
          <p>우리 아이에게 소중한 추억을 만들어주세요.</p>
        </div>
        <>
          { token 
            ? <Link to="/main"><Button>시작하기</Button></Link>
            : <Link to="/login"><Button>시작하기</Button></Link>
          }
        </>
        <CardList />
      </IntroContainer>
      <hr style={{width: '95%'}} />
      <div>
        <ScrollBtn>
          <i onClick={moveToTop} className="fa-solid fa-circle-chevron-up fa-2xl" style={ pageTop }></i>
        </ScrollBtn>
        <ScrollBtn>
          <i onClick={moveToBottom} className="fa-solid fa-circle-chevron-down fa-2xl" style={ pageBottom }></i>
        </ScrollBtn>
        {/* { Math.floor((window.scrollY / (document.body.clientHeight - window.innerHeight)) * 100) > 20 
        ? <ScrollBtn>
            <i onClick={moveToTop} className="fa-solid fa-circle-chevron-up fa-2xl" style={ pageTop }></i>
          </ScrollBtn>
        : <ScrollBtn>
            <i onClick={moveToBottom} className="fa-solid fa-circle-chevron-down fa-2xl" style={ pageBottom }></i>
          </ScrollBtn>
        } */}
      </div>
    </div>
  )
}

export default Intro;