import IntroCarousel from "../../components/Home/Carousel/IntroCarousel";
import CardList from "../../components/Home/Card/CardList";
import { Link } from 'react-router-dom';
import { useRecoilValue } from "recoil";
import { Token } from "../../atom";

import styled from "styled-components";

const IntroContainer = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const Title = styled.div`
  font-size: 70px;
  font-family: ${props => props.theme.titleFont};
  text-align: center;
  text-shadow: 2px 2px 2px gray;
  background-color: ${props => props.theme.yellowColor};
  padding: 2rem;
`

const Button = styled.button`
  margin: 1rem;
  padding: 5px;
  :hover {
    cursor: pointer;
    background-color: black;
    color: white;
  }
  font-weight: bold;
  font-size: large;
  /* border: none; */
  background-color: ${props => props.theme.yellowColor};
  border-radius: 20px;
`

function Intro () {
  return (
    <div>
      <Title>나의 비밀 친구</Title>
      <IntroCarousel/>
      <IntroContainer>
        <div style={{marginTop: "2rem", textAlign: "center" }}>
          <p>2022년 8월, 병원에 있는 아이들을 위한 특별한 서비스가 시작됩니다.</p>
          <br />
          <p>우리 아이에게 소중한 추억을 만들어주세요</p>
        </div>
        <Link to="/login"><Button>시작하기</Button></Link>
        <CardList />
      </IntroContainer>
    </div>

  )
}

export default Intro;