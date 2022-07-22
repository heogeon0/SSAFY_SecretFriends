import Wrapper from "./styles";

import Information from "../../components/Childern/Information";
import Face from "../../components/Childern/Face";
import { useState } from "react";

function CreateChildern() {
  const [slide, setSlide] = useState(1);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [birth, setBirth] = useState("");
  const [admission, setAdmission] = useState("");

  function goNext() {
    switch (slide) {
      case 1:
        if (!name) {
          setError("아이 이름을 적어주세요");
          return;
        }
        if (!nickName) {
          setError("아이 별명을 지어주세요");
          return;
        }
        if (!birth) {
          setError("아이 생일을 채워주세요");
          return;
        }
        if (!admission) {
          setError("입원 날짜를 적어주세요");
          return;
        }
        break;
      default:
    }
    if (slide < 2) {
      setSlide(slide + 1);
      setError("");
    } else console.log(slide, "야호");
  }
  const tab = {
    1: (
      <Information
        setName={setName}
        setNickName={setNickName}
        setBirth={setBirth}
        setAdmission={setAdmission}
      />
    ),
    2: <Face />,
  };
  return (
    <>
      <Wrapper>
        <div className="grid">
          <div className="side">
            <div className={slide === 1 ? "isActive step" : "step"}>
              <p>Step 1</p>
              <span>아이정보 입력하기</span>
            </div>
            <div className={slide === 2 ? "isActive step" : "step"}>
              <p>Step 2</p>
              <span>얼굴 등록하기</span>
            </div>
            <div className={slide === 3 ? "isActive step" : "step"}>
              <p>Step 3</p>
              <span>캐릭터 등록하기</span>
            </div>
            <div className={slide === 4 ? "isActive step" : "step"}>
              <p>Step 4</p>
              <span>대화 등록하기</span>
            </div>
          </div>
          <div className="content">
            <h2>아이 정보 입력하기</h2>
            <div>
              {tab[slide]}
              {error ? <p className="error">{error}</p> : ""}
            </div>
            <div className="buttonWrap">
              <button onClick={goNext}>다음</button>
            </div>
          </div>
        </div>
      </Wrapper>
    </>
  );
}
export default CreateChildern;
