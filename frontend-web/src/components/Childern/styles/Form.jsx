import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  /* font-family: ${(props) => props.theme.formFont}; */
  font-family: ${(props) => props.theme.pretendard};
  height: 100%;
  margin-bottom: 10px;
  padding: 10px;
  div {
    margin: 0;
  }
  label {
    text-align: left;
    line-height: 25px;
  }
  input {
    padding: 10px;
    background-color: ${(props) => props.theme.grayColor};
    height: 2.5rem;
    font-family: ${(props) => props.theme.namingFont};
    border: ${(props) => props.theme.grayColor} 1px solid;
    border-radius: 5px;
    margin-bottom: 1rem;
    @media ${props => props.theme.mobile} {
      height: 1.6rem;
    };
  }
`;

export default Wrapper;
