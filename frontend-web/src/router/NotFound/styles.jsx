import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  top: 50%;
  left: 50%;
  padding: 15px;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: calc(80vw / 1.5);
  max-width: 600px;
  max-height: calc(600px / 1.68);
  background-color: ${(props) => props.theme.whiteColor};
  border-radius: 5px;
  box-shadow: 5px 5px 15px 0.5px #dcdde1;
  .title1 {
    font-size: min(5vw, 3rem);
    font-weight: bold;
    font-family: ${props => props.theme.standardFont};
  }
  .title2 {
    font-size: min(5vw, 3rem);
    font-weight: bold;
    font-family: ${props => props.theme.standardFont};
  }
  .content {
    font-size: min(2vw, 1.2rem);
    margin: 0.5vw;
    @media ${props => props.theme.mobile} {
      font-size: 0.4vw;
      margin: 0.4vw;
    }
  }
  .home_btn {
    font-size: min(2vw, 1rem);
    font-family: ${props => props.theme.pretendard};
    margin: 3vw 0 0 0;
    border-radius: 10vw;
    border: none;
    padding: 0.5vw 1vw;
    background-color: ${props => props.theme.grayColor};
    :hover {
      cursor: pointer;
    }
  }
`;

export default Wrapper;
