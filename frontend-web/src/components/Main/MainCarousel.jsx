import { Link } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  width: 100%;
  height: 100%;
  background-color: tomato;
  overflow: hidden;
`;

const Button = styled.div`
  all: unset;
  padding: 1em 2em;
  margin: 2em 2em;
  color: black;
`;

function MainCarousel() {
  return (
    <div>
      <Container>
        <button>
          <Link to={"/createChildren"}>아이정보 추가하기</Link>
        </button>
      </Container>
    </div>
  );
}

export default MainCarousel;
