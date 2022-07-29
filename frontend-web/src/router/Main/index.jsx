import MainCarousel from "../../components/Main/MainCarousel";
import { Wrapper } from "./styles";

function Main() {
  return (
    <Wrapper>
      <MainCarousel />

      <div className="body">
        <div className="body_grid">
          <p>\아이와 \공팔이가 함께한 사진들</p>
          <div className="body_picture"></div>
        </div>
        <div className="body_grid">
          <p>\아이에게 해주고싶은말</p>
          <div className="body_conversation"></div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Main;
