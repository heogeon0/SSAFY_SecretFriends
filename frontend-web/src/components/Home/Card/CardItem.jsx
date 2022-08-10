import styled from "styled-components";

import CardModal from "./CardModal";
import { useState } from "react";


const CardBox = styled.div`
  /* width: 100%; */
  height: 39vw;
  margin: 1vw 2vw;
  border-radius: 5px;
  box-shadow: 2px 2px 2px gray;
  overflow: hidden;
  /* max-height: 550px; */

  @media ${props => props.theme.mobile} {
    width: 83vw;
    margin: 1vw 1vw 10vw 1vw;
    height: 100vw;
  }
`

const CardImg = styled.img`
  width: 100%;
  height: 26vw;
  @media ${props => props.theme.mobile} {
    height: 80vw;
  }
`

const CardTitle = styled.div`
  /* 상, 우, 하, 좌 */
  margin: 1vw 0 1.2vw;
  font-size: 2vw;
  font-weight: bold;
  text-align: center;
  @media ${props => props.theme.mobile} {
    margin: 1vw 0 2vw;
    font-size: 3.2vw;
  }
`

const CardText = styled.div`
  display: -webkit-box;
  font-size: 1.4vw;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 3;
  margin: 1.1vw 1.5vw;
  font-weight: lighter;
  text-overflow: ellipsis;
  @media ${props => props.theme.mobile} {
    font-size: 2.1vw;
    margin: 2vw 2vw;
  }
`

const Button = styled.button`
  margin: 0 1vw 1vw 1vw;
  float: right;
  border: none;
  background-color: white;
  :hover {
    cursor: pointer;
    text-decoration: underline;
  }
  font-size: 1.6vw;
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
          <Button clasdsName="blueBtn" onClick={() => setClose(!close)}>더보기</Button>
          { close && (
            <CardModal closeModal={() => setClose(!close)} description={item.description} imgs={item.imgs}/>
          )}
        </div>
      </CardBox>
    </div>
  )
}

export default Card;