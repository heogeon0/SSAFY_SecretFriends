import Wrapper from "./styles";

import Information from "../../components/Childern/Information";
import Face from "../../components/Childern/Face";
import { useState } from "react";
import Character from "../../components/Childern/Chracter";
import Conversation from "../../components/Childern/Conversation";
import { FaceInfo } from "../../atom";
import { useRecoilValue } from "recoil";

function CreateChildern() {
  const [slide, setSlide] = useState(1);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [birth, setBirth] = useState("");
  const [admission, setAdmission] = useState("");
  const [characterID, setCharacterId] = useState(1);
  const [characterName, setCharacterName] = useState("");
  const faces = useRecoilValue(FaceInfo);
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
      case 2:
        if (faces.length < 10) {
          setError("아이 사진을 열장 등록해주세요");
          return;
        }
        break;
      case 3:
        if (!characterID) {
          setError("캐릭터를 선택해주세요");
          return;
        }
        break;
        if (!characterName) {
          setError("캐릭터의 별명을 알려주세요");
          return;
        }
      default:
    }
    if (slide < 4) {
      setSlide(slide + 1);
      setError("");
    } else console.log(slide, "야호");
  }

  function goPre() {
    if (slide > 1) {
      setSlide((val) => val - 1);
    }
  }
  const tab = {
    1: (
      <Information
        name={name}
        setName={setName}
        nickName={nickName}
        setNickName={setNickName}
        birth={birth}
        setBirth={setBirth}
        admission={admission}
        setAdmission={setAdmission}
      />
    ),
    2: <Face />,
    3: <Character setCharacterName={setCharacterName} />,
    4: <Conversation />,
  };
  return (
    <div style={{ height: "90vh" }}>
      <Wrapper>
        <div className="grid">
          <div className="side">
            <div className={slide === 1 ? "isActive step" : "step"}>
              <p>Step 1</p>
              <span>아이정보 입력하기</span>
            </div>
            <div className="line"></div>
            <div className={slide === 2 ? "isActive step" : "step"}>
              <p>Step 2</p>
              <span>얼굴 등록하기</span>
            </div>
            <div className="line"></div>
            <div className={slide === 3 ? "isActive step" : "step"}>
              <p>Step 3</p>
              <span>캐릭터 등록하기</span>
            </div>
            <div className="line"></div>
            <div className={slide === 4 ? "isActive step" : "step"}>
              <p>Step 4</p>
              <span>대화 등록하기</span>
            </div>
          </div>
          <div className="content">
            <div>{tab[slide]}</div>
            {error ? <p className="error">{error}</p> : ""}
            <div className="buttonWrap">
              <button onClick={goPre}>이전</button>
              <button onClick={goNext}>{slide === 4 ? "완료" : "다음"}</button>
            </div>
          </div>
        </div>
      </Wrapper>
    </div>
  );
}
export default CreateChildern;
