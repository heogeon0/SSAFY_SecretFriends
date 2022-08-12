import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 80vw;
  height: 80vw;
  max-width: 700px;
  max-height: 500px;
  @media ${props => props.theme.mobile} {
    top: 35%;
  }
  .grid {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: minmax(160px, 1fr) 4fr;
    grid-template-rows: 1fr;
    grid-gap: 20px;
    @media ${props => props.theme.mobile} {
      grid-template-rows: minmax(80px, 1fr) 4fr;
      grid-template-columns: 1fr;
      grid-gap: 20px;
    }
    .side {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding: 25px 20px;
      background-color: ${(props) => props.theme.whiteColor};
      border-radius: 5px;
      box-shadow: 5px 5px 15px 0.5px #dcdde1;
      @media ${props => props.theme.mobile} {
        display: grid;
        grid-template-rows: 1fr;
        grid-template-columns: repeat(2, 1fr 1px);
        align-items: center;
        padding: 1vw 2vw;
        background-color: ${(props) => props.theme.whiteColor};
      }
      .line {
        border: 1px #dcdde1 solid;
        @media ${props => props.theme.mobile} {
          height: 80%;
          background-color: #dcdde1;
        }
      }
      .step {
        font-family: ${(props) => props.theme.standardFont};
        color: #dcdde1;
        transition: color 0.3s linear, background-color 0.3s linear;
        @media ${props => props.theme.mobile} {
          padding: 1rem;
        }
        p {
          font-size: min(2.5vw, 1.5rem);
          font-weight: 700;
          margin-bottom: 5px;
          text-transform: uppercase;
        }
        span {
          font-size: min(1.3vw, 15px);
          word-break: keep-all;
        }
      }
      .isActive {
        color: black;
      }
    }
    .content {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 4fr 0.3fr 0.5fr;
      height: 100%;
      padding: 20px 15px 0 15px;
      background-color: ${(props) => props.theme.whiteColor};
      box-shadow: 5px 5px 15px 0.5px #dcdde1;
      border-radius: 5px;
      h2 {
        font-size: 35px;
        font-family: ${(props) => props.theme.formFont};
        padding-bottom: 10px;
        border-bottom: 3px #dcdde1 solid;
      }
      p {
        font-family: ${(props) => props.theme.standardFont};
        font-size: 15px;
        color: #dcdde1;
      }
      .buttonWrap {
        display: flex;
        /* flex-direction: row-reverse; */
        justify-content: space-between;
        padding: 20px 10px;
        right: 1.5vw;
        button {
          padding: 0.3rem 1rem;
          background-color: #daf3af;
          border: none;
          border-radius: 4vw;
          :hover {
            cursor: pointer;
          }
        }
      }
      .error {
        color: #e84118;
        font-size: min(2vw, 1rem);
        padding-left: 15px;
        margin-bottom: 10px;
      }
    }
  }
`;

export default Wrapper;
