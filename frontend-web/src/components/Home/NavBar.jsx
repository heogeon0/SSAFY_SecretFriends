import React from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";

const HeaderBox = styled.div`
  position: relative;
  top: 0px;
  width: 100%;
  padding: 1rem 2rem 1rem;
  background-color: white;
`

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
`

const HeaderText = styled.div`
  margin: 0 1rem 0;
`

function NavBar () {
  return (
    <HeaderBox>
      <FlexBox>
        <HeaderText><Link style={{textDecoration: 'none'}} to="/">SSAFY</Link></HeaderText>
        <FlexBox>
          <HeaderText><Link style={{textDecoration: 'none'}} to="/login">로그인</Link></HeaderText>
          <HeaderText><Link style={{textDecoration: 'none'}} to="/signup">회원가입</Link></HeaderText>
          <HeaderText><Link style={{textDecoration: 'none'}} to="/createChildren">아이정보 등록</Link></HeaderText>
        </FlexBox>
      </FlexBox>
    </HeaderBox>
  )
}

export default NavBar;