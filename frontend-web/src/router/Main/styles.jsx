import styled from "styled-components";

export const Wrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: minmax(350px, 1fr) 3fr;
  p {
    display: flex;
    align-items: center;
    height: 100%;
  }
  .head {
    width: 100%;
  }
  .body {
    display: grid;
    grid-template-columns: 1fr;
    grid-template-rows: 1fr 1fr;
    width: 90%;
    height: 90%;
    max-width: 1000px;
    max-height: 800px;
    background-color: ${(props) => props.theme.whiteColor};
    margin: 0 auto;
    padding: 0px 20px 20px;
    .body_grid {
      display: grid;
      grid-template-columns: 1fr;
      grid-template-rows: 1fr 3fr;
    }
    .body_picture {
      overflow-x: scroll;
      display: grid;
      grid-template-rows: 1fr;
      grid-template-columns: repeat(5, 1fr);
      grid-gap: 20px;
      width: 100%;
      height: 100%;
      padding: 20px;
      background-color: ${(props) => props.theme.grayColor};
    }
    .body_conversation {
      display: grid;
      overflow-y: scroll;
      grid-template-rows: repeat(auto-fit, minmax(40px, 1fr));
      grid-template-columns: 1fr;
      width: 100%;
      height: 100%;
      background-color: ${(props) => props.theme.grayColor};
    }
  }
`;
