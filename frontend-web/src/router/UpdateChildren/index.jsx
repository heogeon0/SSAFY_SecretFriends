import Wrapper from "./styles";

import Information from "../../components/Childern/Information";
import Character from "../../components/Childern/Chracter";

import axios from "axios";
import drf from "../../api/drf";

import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";


function UpdateChildren() {
  const [slide, setSlide] = useState(1);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [birth, setBirth] = useState("");
  const [admission, setAdmission] = useState("");
  const [characterID, setCharacterID] = useState(1);
  const [characterName, setCharacterName] = useState("");
  const [memberID, setMemberID] = useState();

  // child's ID by getting the parameter from the url
  const childrenID = parseInt(useParams().childrenID)

  // 페이지가 렌더링될 때 아이에 대한 정보를 가져온다
  // 첫 번째 axios: answers, 생년월일, 아이ID, 입원일, 부모ID, 아이 이름, 아이닉네임
  // 두 번째 axios: 캐랙터ID, 아이ID, 아이 캐릭터ID, 캐릭터닉네임
  useEffect(() => {
    axios({
      url: drf.children.children(childrenID),
      method: "get",
      headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
    })
      .then(res => {
        setName(res.data.name)
        setNickName(res.data.nickname)
        setMemberID(res.data.memberID)
      })
      .catch(err => console.log(err))

      axios({
        url: drf.mycharacter.updateCharacter(childrenID),
        method: "get",
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
      }).then((res) => {
        setCharacterID(res.data.characterID)
        setCharacterName(res.data.nickname)
      })
  }, [])

  
  // separation of date of birth
  const birthDay = parseInt(birth.slice(8, 10))
  const birthMonth = parseInt(birth.slice(5, 7))
  const birthYear = parseInt(birth.slice(0, 4))

  const navigate = useNavigate();

  function updateChildren () {
    updateInfo()
    updateCharacter()
    goMain()
  }

  function updateInfo() {
    axios({
      url: drf.children.childrens(),
        method: "put",
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
        data: {
        childrenID: childrenID,
        memberID: memberID,
        hospitalizationDay: admission,
        birthDay: birthDay,
        birthMonth: birthMonth,
        birthYear: birthYear,
        name: name.trim(),
        nickname: nickName.trim(),
      }
    }).then((res) => {
    }).catch((err) => {
      console.log(err)
    })
  }

  function updateCharacter() {
    axios({
      url: drf.mycharacter.updateCharacter(childrenID),
      method: "put",
      headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
      data: {
        characterID: characterID,
        childrenID: childrenID,
        nickname: characterName.trim(),
      }
    }).then((res) => {
    }).catch((err) => {
      console.log(err)
    })
  }

  function goMain () {
    navigate('/main')
  }


// child information registration
// function to move to the next in the child registration form
// movement restrictions placed
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
        if (!characterID) {
          setError("캐릭터를 선택해주세요");
          return;
        }
        if (!characterName) {
          setError("캐릭터의 별명을 알려주세요");
          return;
        }
      default:
    }
    if (slide < 2) {
      setSlide(slide + 1);
      setError("");
    } else {
      // when the 'done' button is clicked, axios requests for child information update will be executed
      updateChildren()
    };
  }

  // function to move to the previous in the child registration form
  // no constrains
  function goPre() {
    if (slide > 1) {
      setSlide((val) => val - 1);
    }
  }

  // component call according to step (step1-2)
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
    2: <Character characterName={characterName} setCharacterName={setCharacterName} />,
  };

  function goOut() {
    navigate('/main')
  }

  return (
    <div style={{ height: "90vh" }}>
      <Wrapper>
        <div className="grid">
          <div className="side">
            <div className={slide === 1 ? "isActive step" : "step"}>
              <p>Step 1</p>
              <span>아이정보 수정하기</span>
            </div>
            <div className="line"></div>
            <div className={slide === 2 ? "isActive step" : "step"}>
              <p>Step 2</p>
              <span>캐릭터 수정하기</span>
            </div>
          </div>
          <div className="content">
            <div>{tab[slide]}</div>
            {error ? <p className="error">{error}</p> : ""}
            <div className="buttonWrap">
              <button onClick={goPre}>이전</button>
              <button onClick={goNext}>{slide === 2 ? "완료" : "다음"}</button>
            </div>
          </div>
        </div>
        <button onClick={()=>goOut()}>나가기</button>
      </Wrapper>
    </div>
  );
}
export default UpdateChildren;
