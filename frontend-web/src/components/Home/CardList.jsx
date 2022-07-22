import MediaCard from "./IntroCard";
import styled from "styled-components";

const CardContainer = styled.div`
  display: flex;
  margin: 2rem;
`

function CardList () {
  const contents = [
    { 
      imgSrc: '/img/main.PNG', 
      altImg: '프로젝트 소개', 
      title: '나의 비밀친구란', 
      description: '"나의 비밀친구" 프로젝트는 SSAFY에서 시작한 프로젝트로..'},
    { 
      imgSrc: '/img/technical.PNG', 
      altImg: '기술 설명', 
      title: '기술 소개', 
      description: '프로젝트에 쓰인 기술로는 AI, 얼굴인식, ...'
    },
    { 
      imgSrc: '/img/effects.PNG', 
      altImg: '기대 효과', 
      title: '기대 효과', 
      description: '이 프로젝트를 통해 얻을 수 있는 기대효과는 a, b, c, d...'
    },
  ]
  return (
    <div>
      <CardContainer>
        { contents.map((item, idx) => {
          return (<MediaCard key={idx} item={item}/>)
        })}
      </CardContainer>
    </div>
  )
}

export default CardList;