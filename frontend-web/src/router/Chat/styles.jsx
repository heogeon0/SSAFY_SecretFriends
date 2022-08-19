import styled from "styled-components";

const Wrapper = styled.div`
  .chat-box {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    background-image: url("/img/background/green.jpg");
    background-position: center;
    background-size: cover;
    bottom: 20px;
    box-shadow: 0px 0px 15px #0000001f;
    right: 60px;
    width: 300px;
    height: 550px;
    border-radius: 25px;
    @media ${props => props.theme.mobile} {
      width: 200px;
      height: 360px;
    }
    z-index: 9999;
  }
`

export default Wrapper;