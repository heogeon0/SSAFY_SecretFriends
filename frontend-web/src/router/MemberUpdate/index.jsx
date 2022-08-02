import Wrapper from "./styles";
import styled from "styled-components";
import MemberUpdateForm from "../../components/Member/MemberUpdateFrom";

const Box = styled.div`
  height: 700px;
  width: 600px;
`

function MemberUpdate() {
  return (
    <Box>
      <Wrapper>
        <div className="title">
          <h3>회원정보 수정</h3>
        </div>
        <MemberUpdateForm />
      </Wrapper>
    </Box>
  );
}
export default MemberUpdate;
