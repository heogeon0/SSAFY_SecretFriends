import styled from "styled-components";

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Token } from '../../atom';


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
  // if token exists, it means 'loggedIn"
  const [token, setToken] = useRecoilState(Token);
  const navigate = useNavigate();

  // when logout, token is need to be removed.
  function removeToken() {
    localStorage.removeItem("token")
    setToken("")
    navigate("/")
  }

  return (
    <HeaderBox>
      <FlexBox>
        <HeaderText><Link style={{textDecoration: 'none'}} to="/">SSAFY</Link></HeaderText>
        <div>
          { token ? 
          <FlexBox>
            <HeaderText>
              <a href="" 
                onClick={() => removeToken()}
                style={{textDecoration: 'none'}}
              >로그아웃</a>
            </HeaderText>
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