import styled from "styled-components";

const Wrapper = styled.div`
  .intro-box {
    background-image: url("img/background/pink.jpg");
    background-size: cover;
    padding: 1vw 1vw 3vw 1vw;
    .title {
      font-size: 5vw;
      font-family: ${props => props.theme.titleFont};
      color: white;
      text-align: center;
      text-shadow: 2px 2px 2px gray;
      padding: 5vw 0 0 0;
    }
  }
  .intro-container {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .introduction {
      font-size: 2vw;
      font-family: ${props => props.theme.pretendard};
      margin: 0 0 0.5vh 0;
    }
  }
  .scroll-btn {
    :hover {
    cursor: pointer;
  }}
`

export default Wrapper;