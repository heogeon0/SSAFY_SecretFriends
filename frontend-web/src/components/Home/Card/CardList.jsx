import styled from "styled-components";
import Card from "./CardItem";

const CardContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  padding: 3vw;
  margin: 0 0 3vw 0;
  @media  ${props => props.theme.mobile} {
    flex-direction: column;
    grid-template-columns: 1fr;
  }
`

function CardList () {
  const contents = [
    { 
      imgSrc: '/img/carousel/teddybear.jpg', 
      altImg: '프로젝트 소개', 
      title: '"나의 비밀친구"란', 
      description: '"나의 비밀친구" 프로젝트는 SSAFY에서 시작한 프로젝트로.. Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat, sequi reprehenderit nostrum dolor accusamus dicta! Consequuntur repellendus odio quas cum laborum magnam porro eligendi eaque asperiores.',
      imgs: ['img/main.png', 'img/main.png', 'img/main.png'],
    },
    { 
      imgSrc: '/img/carousel/computer.jpg', 
      altImg: '기술 설명', 
      title: '기술 소개', 
      description: '프로젝트에 쓰인 기술로는 AI, 얼굴인식, ... Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat, sequi reprehenderit nostrum dolor accusamus dicta! Consequuntur repellendus odio quas cum laborum magnam porro eligendi eaque asperiores. Inventore possimus maiores voluptas.',
      imgs: ['img/technical.png', 'img/technical.png', 'img/technical.png'],
    },
    { 
      imgSrc: '/img/carousel/children3.jpg', 
      altImg: '기대 효과', 
      title: '기대 효과', 
      description: '이 프로젝트를 통해 얻을 수 있는 기대효과는 a, b, c, d... Lorem ipsum dolor sit amet consectetur, adipisicing elit. Fugiat, sequi reprehenderit nostrum dolor accusamus dicta! Consequuntur repellendus odio quas cum laborum magnam porro eligendi eaque asperiores. Inventore possimus maiores voluptas.',
      imgs: ['img/effects.png', 'img/effects.png', 'img/effects.png'],
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