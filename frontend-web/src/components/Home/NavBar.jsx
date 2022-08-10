import styled from "styled-components";

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Token } from '../../atom';


const HeaderBox = styled.div`
  position: relative;
  top: 0px;
  width: 100%;
  padding: 0 1.5vh;
  background-color: white;
`

const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const Logo = styled.img`
  width: 5vw;
  height: auto;
  border-radius: 50%;
`

const HeaderText = styled.div`
  margin: 0 1.5vw 0;
  font-size: 1.4vw;
  /* font-size: 1rem; */
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
        <Link style={{textDecoration: 'none', color: "black"}} to="/"><Logo src="img/logo/pink_shadow.jpg" alt="logo" /></Link>
        <div>
          { token ? 
          <FlexBox>
            <HeaderText>
              <a href="" 
                onClick={() => removeToken()}
                style={{textDecoration: 'none', color: "black"}}
              >로그아웃</a>
            </HeaderText>
            <HeaderText><Link style={{textDecoration: 'none', color: "black"}} to="/main">MY PAGE</Link></HeaderText>
          </FlexBox>
          : 
          <FlexBox>
            <HeaderText><Link style={{textDecoration: 'none', color: "black"}} to="/login">로그인</Link></HeaderText>
            <HeaderText><Link style={{textDecoration: 'none', color: "black"}} to="/signup">회원가입</Link></HeaderText>
          </FlexBox>
          }
        </div>
      </FlexBox>
    </HeaderBox>
  )
}

export default NavBar;