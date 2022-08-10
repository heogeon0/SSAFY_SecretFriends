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
      description: 
        ' "나의 비밀친구" 프로젝트는 SSAFY에서 시작한 프로젝트로, 장기 입원으로 지친 소아 환우들을 위한 IoT 기기 개발을 목표로 시작되었다. \
        \n소아병동에 입원한 아이들의 평균 나이는 3.6세로, 이 시기에 경험한 것들이 성장에 큰 영향을 미친다. 따라서 소아 병동에서 오래 입원한 아이들에게 언제든지 찾아가 대화할 수 있는 친구와 놀거리를 제공함으로써 정서적 안정을 주고자 하였다.\
        \n프로젝트의 핵심은 세 가지로 나눌 수 있는데, 먼저 아이가 직접 캐릭터를 선택할 수 있는 맞춤형이 있다.\
        \n다음은 소통으로, 웹과 IoT 기기를 통해 부모님 혹은 보호자가 아이에게 이야기를 전달할 수 있다. \
        \n마지막 키워드는 즐거움이다. 아이가 캐릭터와 상호작용을 하고 그 외에도 제공되는 다양한 활동을 통해 지친 병원 생활에 활력소가 될 수 있기를 기대한다.',
      imgs: ['img/main.png', 'img/main.png', 'img/main.png'],
    },
    { 
      imgSrc: '/img/carousel/computer.jpg', 
      altImg: '기술 설명', 
      title: '기술 소개', 
      description: 
        ' 본 프로젝트의 주된 기능은 얼굴인식, TTS, 3D 렌더링 기능이다.\
        \n먼저, 얼굴인식은 OpenCV 라이브러리를 활용해 구현하였다. 아이의 얼굴 사진을 웹에서 저장하고 그를 바탕으로 IoT 기기에서 로그인을 하는 과정에 사용된다.\
        \nTTS는 Text To Speech의 약자로, 문자를 음성으로 변환해주는 기능이다. 여기에는 Naver CLOVA Voice API를 활용했고 아이의 보호자가 웹에 등록한 질문 혹은 대화들을 IoT 기기에서 음성으로 출력해준다.\
        \n3D 렌더링 기능에는 Three.js를 활용했다. 2D 캐릭터보다 아이에게 더 친근하게 다가갈 수 있고 실물감이 느껴지도록 하기 위해 3D 캐릭터를 선택하고 렌더링하였다.\
        \n최종 기술 스택은 Front: React, Back: SpringBoot, IoT: 라즈베리파이를 사용했고,\
        \n그 외에도 Three.js, OpenCV, Naver CLOVA, MySQL, AWS, Firebase, Jenkins 등을 활용했다.',
      imgs: ['img/technical.png', 'img/technical.png', 'img/technical.png'],
    },
    { 
      imgSrc: '/img/carousel/children3.jpg', 
      altImg: '기대 효과', 
      title: '기대 효과', 
      description: 
        ' 이 프로젝트를 통해 얻을 수 있는 기대효과는 \
        \n1. 아이에게 전하고 싶었던 말을 웹과 IoT 기기롤 통해 전달할 수 있어 아이의 속마음을 알 수 있을 뿐만 아니라 새로운 소통의 창구가 될 것이라 기대된다.\
        \n2. 현재 단계에서는 캐릭터가 하나이며 얼굴인식과 카메라 필터, 3D 렌더링 기능 등이 구현되었지만 이것 외에 동화 읽어주기, Teachable Machine을 활용한 교육 프로그램 제공 등 언제든지 다양한 기능을 추가할 수 있기 때문에 확장성이 매우 높다.\
        \n3. 병원에서 활동이 제한된 아이들에게 언제든지 찾아가서 놀고 대화하며 시간을 보낼 수 있는 곳이 생긴다는 것에서 아이들에게 매일매일이 이벤트같은 날이 되지 않을까를 기대한다.\
        \n프로젝트를 진행하면서 아이들이 즐겁게 놀 수 있는 컨텐츠가 무엇이 있을지를 계속해서 고민했고 마침내 프로젝트를 완성할 수 있었다.\
        \n팀원들과 함께 노력한 마음이 전해졌으면 하는 바람을 담아 프로젝트를 마무리하고자 한다.',
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