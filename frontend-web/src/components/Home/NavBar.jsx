import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from "styled-components";
import { useNavigate, Navigate } from "react-router-dom";

import axios from 'axios';
import drf from '../../api/drf';
import { member } from '../../store';


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
  const isLoggedIn = !!localStorage.getItem("token");
  const navigate = useNavigate();

  // when logout, token is need to be removed.
  function removeToken() {
    localStorage.removeItem("token")
    navigate("/")
    // return (
    //   <Navigate to="/" />
    // )
  }

  return (
    <HeaderBox>
      <FlexBox>
        <HeaderText><Link style={{textDecoration: 'none'}} to="/">SSAFY</Link></HeaderText>
        <div>
          { isLoggedIn ? 
          <FlexBox>
            <HeaderText>
              <a href="" 
                onClick={() => removeToken()}
                style={{textDecoration: 'none'}}
              >로그아웃</a>
            </HeaderText>
            <HeaderText><Link style={{textDecoration: 'none'}} to="/createChildren">아이정보 등록</Link></HeaderText>
            <HeaderText><Link style={{textDecoration: 'none'}} to="/main">MY PAGE</Link></HeaderText>
          </FlexBox>
          : 
          <FlexBox>
            <HeaderText><Link style={{textDecoration: 'none'}} to="/login">로그인</Link></HeaderText>
            <HeaderText><Link style={{textDecoration: 'none'}} to="/signup">회원가입</Link></HeaderText>
          </FlexBox>
          }
        </div>
      </FlexBox>
    </HeaderBox>
  )
}

export default NavBar;