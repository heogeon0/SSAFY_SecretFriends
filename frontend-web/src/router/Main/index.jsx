import MainCarousel from "../../components/Main/MainCarousel";
import { Wrapper } from "./styles";

function Main() {
  return (
    <Wrapper>
      <div className="head">
        <MainCarousel />
      </div>

      <div className="body">
        <div className="body_grid">
          <p>\아이와 \공팔이가 함께한 사진들</p>
          <div className="body_picture">
            {/* firebase 활용 예정 */}
          </div>
        </div>
        <div className="body_grid">
          <p>\아이에게 해주고싶은말</p>
          <div className="body_conversation">
            {/* map 돌릴 예정 */}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Main;
