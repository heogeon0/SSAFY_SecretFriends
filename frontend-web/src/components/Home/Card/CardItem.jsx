import styled from "styled-components";

import CardModal from "./CardModal";
import { useState } from "react";


const CardBox = styled.div`
  /* width: 100%; */
  height: 39vw;
  margin: 1vw 2vw;
  border-radius: 5px;
  box-shadow: 2px 2px 2px #b3b3b3;
  overflow: hidden;
  @media ${props => props.theme.mobile} {
    width: 83vw;
    margin: 1vw 1vw 10vw 1vw;
    height: 102vw;
  }
`

const CardImg = styled.img`
  width: 100%;
  height: 26vw;
  object-fit: cover;
  @media ${props => props.theme.mobile} {
    height: 80vw;
  }
`

const CardTitle = styled.div`
  /* 상, 우, 하, 좌 */
  font-family: ${props => props.theme.pretendard};
  margin: 1vw 0 1.2vw;
  font-size: 2.3vw;
  font-weight: bold;
  text-align: center;
  @media ${props => props.theme.mobile} {
    margin: 1.5vw 0 1.8vw;
    font-size: 3.5vw;
  }
`

const CardText = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 3;
  font-size: 1.4vw;
  line-height: 1.5vw;
  margin: 1vw 1.5vw 0.5vw 1.5vw;
  font-weight: lighter;
  font-family: ${props => props.theme.pretendard};
  text-overflow: ellipsis;
  /* line-height: 1.6vw; */
  @media ${props => props.theme.mobile} {
    font-size: 2.1vw;
    line-height: 2.8vw;
    margin: 1.5vw 2vw;
  }
`

const Button = styled.button`
  float: right;
  font-size: 1.5vw;
  /* font-family: ${props => props.theme.formFont}; */
  font-family: ${props => props.theme.pretendard};
  font-weight: bold;
  border: none;
  color: gray;
  background-color: white;
  margin: 0.3vw 1vw 1vw 1vw;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
  
  @media ${props => props.theme.mobile} {
    font-size: 2.3vw;
    margin: 0 1vw 1vw 1vw;
  }
`

function Card ({item}) {
  const [close, setClose] = useState(false) // 모달창 닫는 변수

  return (
    <div>
      <CardBox>
        <div>
          <CardImg src={item.imgSrc} alt={item.altSrc}></CardImg>
          <CardTitle>{item.title}</CardTitle>
          <CardText>{item.description}</CardText>
          <Button onClick={() => setClose(!close)}>더보기</Button>
          { close && (
            <CardModal closeModal={() => setClose(!close)} item={item}/>
          )}
        </div>
      </CardBox>
    </div>
  )
}

export default Card;