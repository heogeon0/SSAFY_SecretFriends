import styled from "styled-components";

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { Token } from '../../atom';


const Wrapper = styled.div`
  position: relative;
  top: 0px;
  width: 100%;
  padding: 0 1.5vh;
  background-color: white;
  .flex-box {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .header {
    margin: 0 1.5vw 0;
    font-size: min(1.4vw, 20px);
    font-family: ${props => props.theme.pretendard};
  }
  .logo {
    width: 5vw;
    max-width: 80px;
    height: auto;
    border-radius: 50%;
  }
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
    <Wrapper>
      <div className="flex-box">
        <Link style={{textDecoration: 'none', color: "black"}} to="/"><img className="logo" src="img/logo/pink_shadow.jpg" alt="logo" /></Link>
        <div>
          { token ? 
          <div className="flex-box">
            <div className="header">
              <a href="" 
                onClick={() => removeToken()}
                style={{textDecoration: 'none', color: "black"}}
              >로그아웃</a>
            </div>
            <div className="header"><Link style={{textDecoration: 'none', color: "black"}} to="/main">MY PAGE</Link></div>
          </div>
          : 
          <div className="flex-box">
            <div className="header"><Link style={{textDecoration: 'none', color: "black"}} to="/login">로그인</Link></div>
            <div className="header"><Link style={{textDecoration: 'none', color: "black"}} to="/signup">회원가입</Link></div>
          </div>
          }
        </div>
      </div>
    </Wrapper>
  )
}

export default NavBar;