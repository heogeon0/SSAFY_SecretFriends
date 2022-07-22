import IntroCarousel from "../../components/Home/IntroCarousel";
import MediaCard from "../../components/Home/CardList";
import { Link } from 'react-router-dom';

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
  :hover {
    cursor: pointer;
  }
`

function Intro () {
  return (
    <div>
      <Title>나의 비밀 친구</Title>
      <IntroContainer>
        <div>우리 아이의 추억을 만들어보세요.</div>
        <Link to="/login"><Button>Login</Button></Link>
        <IntroCarousel />
        <MediaCard />
      </IntroContainer>
    </div>
  )
}

export default Intro;