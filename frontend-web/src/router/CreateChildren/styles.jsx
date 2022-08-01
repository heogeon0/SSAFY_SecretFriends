import styled from "styled-components";

const Wrapper = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 95vw;
  height: 95vw;
  max-width: 700px;
  max-height: 500px;
  .grid {
    display: grid;
    width: 100%;
    height: 100%;
    grid-template-columns: minmax(100px, 1fr) 8fr;
    grid-template-rows: 1fr;
    grid-gap: 20px;
    .side {
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      padding: 25px 20px;
      background-color: ${(props) => props.theme.whiteColor};
      border-radius: 20px;
      box-shadow: 5px 5px 15px 0.5px #dcdde1;
      .line {
        border: 1px #dcdde1 solid;
      }
      .step {
        font-family: ${(props) => props.theme.standardFont};
        color: #dcdde1;
        transition: color 0.3s linear, background-color 0.3s linear;
        p {
          font-size: 15px;
          font-weight: 700;
          margin-bottom: 5px;
          text-transform: uppercase;
        }
        span {
          font-size: 10px;
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
      grid-template-rows: 5fr 20px 1fr;
      height: 100%;
      padding: 20px 15px;
      background-color: ${(props) => props.theme.whiteColor};
      box-shadow: 5px 5px 15px 0.5px #dcdde1;
      border-radius: 20px;
      h2 {
        font-size: 35px;
        font-family: ${(props) => props.theme.namingFont};
        padding-bottom: 10px;
        border-bottom: 3px #dcdde1 solid;
      }
      p {
        font-family: ${(props) => props.theme.namingFont};
        font-size: 15px;
        color: #dcdde1;
      }
      .buttonWrap {
        border-top: 3px #dcdde1 solid;
        button {
          padding: auto;
        }
      }
      .error {
        color: #e84118;
        font-size: 12px;
        padding-left: 15px;
        margin-bottom: 10px;
      }
    }
  }
`;

export default Wrapper;
