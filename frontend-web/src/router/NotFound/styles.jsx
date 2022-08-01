import styled from "styled-components";


export const Wrapper = styled.div`
  /* position: relative; */
  background-color: white;
  width: 100%;
  height: 600px;
  z-index: 0;
  text-align: center;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  .title {
    font-size: 120px;
    font-weight: bold;
    padding: 1rem;
    color: red;
  }

  .error {
    font-size: 60px;
    font-weight: bold;
    color: red;
  }

  .content {
    font-size: 20px;
    padding: 1rem;
  }
`