import { createGlobalStyle } from "styled-components";
import reset from "styled-reset";

const GlobalStyle = createGlobalStyle`
  ${reset}

  body {
    background-color: #F6EABD;
  }

  * {
    box-sizing: border-box;
  }

  h1 {
    font-size: 50px;
  }

  h2 {
    font-size: 40px;
  }

  h3 {
    font-size: 30px;
  }

  p {
    font-size: 20px;
  }
`;
export default GlobalStyle;
