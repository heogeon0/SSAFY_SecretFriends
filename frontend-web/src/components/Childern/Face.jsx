import Wrapper from "./styles/Form";
import styled from "styled-components";

import FaceItem from "./FaceItem";


const Grid = styled.div`
  height: 100%;
  display: grid;
  grid-gap: 10px;
`;

function Face() {

  return (
    <Wrapper>
      <Grid>
        <FaceItem />
      </Grid>
    </Wrapper>
  );
}

export default Face;
