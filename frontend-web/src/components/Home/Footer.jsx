import styled from "styled-components";

const Box = styled.div`
  position: relative;
  bottom: 0px;
  padding: 1rem 2rem 1rem;
  width: 100%;
  /* height: 110px; */
`

const FooterText = styled.div`
`

function Footer () {
  return (
    // <div>
      <Box>
        <FooterText>
          <a style={{textDecoration: 'none'}} href="https://jira.ssafy.com/secure/RapidBoard.jspa?rapidView=12725&projectKey=S07P12D208&selectedIssue=S07P12D208-92&quickFilter=26527">Jira</a>
          <span> | </span>
          <a style={{textDecoration: 'none'}} href="https://lab.ssafy.com/s07-webmobile3-sub2/S07P12D208">Gitlab</a>
          </FooterText>
        <FooterText>제작: 허건녕 김민정 박신혜 오도석 최연지</FooterText>
        <FooterText>이메일: ssafy@naver.com</FooterText>
        <FooterText>Copyright 2022. D208. All Rights Reserved.</FooterText>
      </Box>
    // </div>
  )
}

export default Footer;