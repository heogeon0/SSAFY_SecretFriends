import styled from "styled-components";
import Card from "./CardItem";

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 2rem;
  max-width: 1000px;
  @media  ${props => props.theme.mobile} {
    flex-direction: column;
    grid-template-columns: 1fr;
  }
`

function CardList () {
  const contents = [
    { 
      imgSrc: '/img/main.PNG', 
      altImg: '프로젝트 소개', 
      title: '"나의 비밀친구"란', 
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
          return (
            <Card key={idx} item={item}></Card>
          )
        })}
      </CardContainer>
      
    </div>
  )
}

export default CardList;