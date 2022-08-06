import Wrapper from "./styles";

import Information from "../../components/Childern/Information";
import { useEffect, useState } from "react";
import Character from "../../components/Childern/Chracter";
import { Chats, FaceInfo } from "../../atom";
import { useRecoilValue, useRecoilState } from "recoil";

import { storage } from "../../api/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import drf from "../../api/drf";
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
  const [isUploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [photoURL, setPhotosURL] = useState([]);
  const [chats, setChats] = useRecoilState(Chats);
  const faces = useRecoilValue(FaceInfo);
  const [memberID, setMemberID] = useState();
  const [childrenID, setChildrenID] = useState();

  const params = parseInt(useParams(childrenID).childrenID)
  
  useEffect(() => {
    axios({
      url: drf.children.children(params),
      method: "get",
      headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
    })
      .then(res => {
        setName(res.data.name)
        setNickName(res.data.nickname)
        setMemberID(res.data.memberID)
        // 생년월일, 입원일자는 입력 불가
      })
      .catch(err => console.log(err))

      axios({
        url: drf.mycharacter.updateCharacter(params),
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


// after pressing the complete button, three axios will operate sequentially
  const navigate = useNavigate();
  // first axios. for create children(birthday, etc.)
  async function updateChildren () {
    try {
      const res = await axios({
        url: drf.children.childrens(),
        method: "put",
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
        data: {
          childrenID: params,
          memberID: memberID,
          hospitalizationDay: admission,
          birthDay: birthDay,
          birthMonth: birthMonth,
          birthYear: birthYear,
          name: name.trim(),
          nickname: nickName.trim(),
        }
      })
      async function next() {
        await updateChildrenCharacter()
        await goMain()
      }
      next()
    }
    catch (err) {
      console.log(err)
    }
  }
  // second axios. for create character of children(nickname)
  async function updateChildrenCharacter () {
    try {
      const res = await axios({
        url: drf.mycharacter.updateCharacter(params),
        method: "put",
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
        data: {
          characterID: characterID,
          childrenID: params,
          nickname: characterName.trim(),
        }
      })
      // console.log(res)
    }
    catch(err) {
      console.log(err)
    }
  }

  // after three axios done, it goes to "main" page
  async function goMain () {
    try {
      setChats([])
      navigate('/main')
    }
    catch(err) {
      console.log(err)
    }
  }


// child information registration
// function to move to the mext in the child registration form
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
      // next to step4 is the 'done' button.
      // when the 'done' button is clicked, axios requests for child information registration will be executed
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

  // component call according to step (step1-4)
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
