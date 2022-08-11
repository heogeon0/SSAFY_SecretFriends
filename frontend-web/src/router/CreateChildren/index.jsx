import Wrapper from "./styles";

import Information from "../../components/Childern/Information";
import Face from "../../components/Childern/Face";
import Character from "../../components/Childern/Chracter";
import Conversation from "../../components/Childern/Conversation";

import axios from "axios";
import drf from "../../api/drf";
import { storage } from "../../api/firebase";
import { ref, uploadBytes } from "firebase/storage";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useRecoilState } from "recoil";
import { Chats, FaceInfo } from "../../atom";


import styled from "styled-components";

const Bg = styled.div`
  background-image: url("img/background/green.jpg");
  background-size: cover;
`
const FlexBox = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

function CreateChildren() {
  const [slide, setSlide] = useState(1);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [birth, setBirth] = useState("");
  const [admission, setAdmission] = useState("");
  const [characterID, setCharacterID] = useState(1);
  const [characterName, setCharacterName] = useState("");
  const [isUploading, setUploading] = useState(false);  // 업로드 상태
  // const [photoURL, setPhotosURL] = useState([]);  // 업로드 완료된 사진 링크들
  const [memberID, setMemberID] = useState();
  
  const [chats, setChats] = useRecoilState(Chats);
  const face = useRecoilValue(FaceInfo);

// 렌더링 시, 토큰을 바탕으로 로그인한 멤버 정보를 가져온다
  useEffect(() => {
    axios({
      url: drf.member.member(),
      method: "get",
      headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
    })
      .then(res => {
        setMemberID(res.data.memberID)
      })
      .catch(err => console.log(err))
  })

  // separation of date of birth
  const birthDay = parseInt(birth.slice(8, 10))
  const birthMonth = parseInt(birth.slice(5, 7))
  const birthYear = parseInt(birth.slice(0, 4))


  // for step2: face-image registration

  const handleImageUpload = async (childrenID) => {
    try {
      setUploading(true);
      const storageRef = ref(storage, `images/${childrenID}`);
      await uploadBytes(storageRef, face)
      alert("업로드 완료");
    } catch (err) {
      console.log(err);
    }
    setUploading(false);
  };
  

// after pressing the complete button, three axios will operate sequentially
  const navigate = useNavigate();
  // first axios. for create children(birthday, etc.)
  async function createChildren () {
    try {
      const res = await axios({
        url: drf.children.childrens(),
        method: "post",
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
        data: {
          memberID: memberID,
          hospitalizationDay: admission,
          birthDay: birthDay,
          birthMonth: birthMonth,
          birthYear: birthYear,
          name: name,
          nickname: nickName,
        }
      })
      async function next() {
        await handleImageUpload(res.data.childrenID)
        await createChildrenCharacter(res.data.childrenID)
        await createAnswer(res.data.childrenID)
        await goMain()
      }
      next()
    }
    catch (err) {
      console.log(err)
    }
  }

  // second axios. for create character of children(nickname)
  async function createChildrenCharacter (props) {
    try {
      const res = await axios({
        url: drf.mycharacter.createCharacter(),
        method: "post",
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
        data: {
          characterID: characterID,
          childrenID: props,
          nickname: characterName,
        }
      })
    }
    catch(err) {
      console.log(err)
    }
  }
  // third axios. for create answer (optional)
  async function createAnswer (props) {
    try {
      const res = await axios({
        url: drf.answer.answers(),
        method: "post",
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
        data: {
          childrenID: props,
          content: chats,
          createdAt: new Date(),
          questionID: 1,
        }
      })
    }
    catch(e) {
      console.log(e)
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
        if (!face) {
          setError("아이 사진을 등록해주세요");
          return;
        } 
        // else {
        //   handleImageUpload();
        // }
        break;
      case 3:
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
    if (slide < 4) {
      setSlide(slide + 1);
      setError("");
    } else {
      // next to step4 is the 'done' button.
      // when the 'done' button is clicked, axios requests for child information registration will be executed
      createChildren()
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
    2: <Face />,
    3: <Character characterName={characterName} setCharacterName={setCharacterName} />,
    4: <Conversation />,
  };

  return (
    <Bg style={{ height: "90vh" }}>
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
              <button onClick={() => goMain()}>나가기</button>
              <FlexBox>
                {slide > 1 ? <button onClick={goPre}>이전</button> : null}
                <button onClick={goNext} style={{marginLeft: "6px"}}>{slide === 4 ? "완료" : "다음"}</button>
              </FlexBox>
            </div>
          </div>
        </div>
      </Wrapper>
    </Bg>
  );
}
export default CreateChildren;
