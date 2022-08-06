import styled from "styled-components";

import CardModal from "./CardModal";
import { useState } from "react";

const CardBox = styled.div`
  width: 1fr;
  /* border: solid black 1px; */
  border-radius: 5px;
  margin: 1rem;
  box-shadow: 2px 2px 2px gray;
  overflow: hidden;
`

const CardTitle = styled.div`
  /* 상, 우, 하, 좌 */
  margin: 1rem 0.5rem 0 0.5rem;
  font-size: 24px;
  font-weight: bold;
`

const CardImg = styled.img`
  width: 100%;
`

const CardText = styled.div`
  display: -webkit-box;
  -webkit-box-orient: vertical;
  word-wrap: break-word;
  text-overflow: ellipsis;
  overflow: hidden;
  -webkit-line-clamp: 2;
  margin: 0.5rem 1rem 1rem 1rem;
  font-weight: lighter;
  text-overflow: ellipsis;
`

const Button = styled.button`
  font-weight: bold;
  font-size: large;
  border: none;
  background-color: "#e0e0e00";
  border-radius: 10px;
  margin: 0 0.5rem 1rem 0.5rem;
  :hover {
    cursor: pointer;
    background-color: black;
    color: white;
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