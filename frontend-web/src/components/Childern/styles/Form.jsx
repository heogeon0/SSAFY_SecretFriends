import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  font-family: ${(props) => props.theme.namingFont};
  height: 240px;
  margin-bottom: 10px;
  padding: 10px;
  div {
    margin: 0;
  }
  label {
    text-align: right;
    line-height: 25px;
  }
  input {
    background-color: ${(props) => props.theme.yellowColor};
    height: 25px;
    font-family: ${(props) => props.theme.namingFont};
    background: linear-gradient(
      ${(props) => props.theme.yellowColor},
      ${(props) => props.theme.grayColor}
    );
    border: ${(props) => props.theme.yellowColor} 1px solid;
  }
`;

export default Wrapper;
