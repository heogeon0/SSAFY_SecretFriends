import Wrapper from "./styles";

function CreateChildern() {
  return (
    <>
      <Wrapper>
        <div className="grid">
          <div className="side">
            <div className="step">
              <p>Step 1</p>
              <span>아이정보 입력하기</span>
            </div>
            <div className="step">
              <p>Step 2</p>
              <span>얼굴 등록하기</span>
            </div>
            <div className="step">
              <p>Step 3</p>
              <span>캐릭터 등록하기</span>
            </div>
            <div className="step">
              <p>Step 4</p>
              <span>대화 등록하기</span>
            </div>
          </div>
          <div className="content">
            <h2>아이 정보 입력하기</h2>
          </div>
        </div>
      </Wrapper>
    </>
  );
}

export default CreateChildern;
