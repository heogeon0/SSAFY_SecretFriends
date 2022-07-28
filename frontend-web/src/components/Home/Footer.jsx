import styled from "styled-components";

const Box = styled.div`
  position: fixed;
  bottom: 15px;
  width: 100%;
`

const FooterText = styled.div`
  text-align: center;
`

function Footer () {
  return (
    // <div>
      <Box>
        <FooterText>SSAFY 7th Class2 of Gumi | Design By D208</FooterText>
        <FooterText>주소: 경상북도 구미시 임수동 94</FooterText>
      </Box>
    // </div>
  )
}

export default Footer;