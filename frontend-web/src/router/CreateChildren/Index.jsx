import Wrapper from "./styles";

import Information from "../../components/Childern/Information";
import Face from "../../components/Childern/Face";
import { useEffect, useState } from "react";
import Character from "../../components/Childern/Chracter";
import Conversation from "../../components/Childern/Conversation";
import { Chats, FaceInfo } from "../../atom";
import { useRecoilValue } from "recoil";

import { storage } from "../../api/firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import axios from "axios";
import drf from "../../api/drf";

function CreateChildren() {
  const [slide, setSlide] = useState(1);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [nickName, setNickName] = useState("");
  const [birth, setBirth] = useState("");
  const [admission, setAdmission] = useState("");
  const [characterID, setCharacterId] = useState(1);
  const [characterName, setCharacterName] = useState("");
  const [isUploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [photoURL, setPhotosURL] = useState([]);
  const faces = useRecoilValue(FaceInfo);
  const [memberId, setMemberId] = useState();
  const [childrenId, setChildrenId] = useState();
  const characterId = 1;

  useEffect(() => {
    axios({
      url: drf.member.member(),
      method: "get",
      headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
    })
      .then(res => {
        // console.log(res)
        setMemberId(res.data.memberId)
      })
      .catch(err => console.log(err))
  })
  // console.log(memberId)

  // 생년월일 분리
  const birthDay = parseInt(birth.slice(8, 10))
  const birthMonth = parseInt(birth.slice(5, 7))
  const birthYear = parseInt(birth.slice(0, 4))

  console.log(process.env.REACT_APP_FB_STORAGE_BUCKET);

  const handleImageUpload = async (fileList) => {
    try {
      setUploading(true);
      const urls = await Promise.all(
        faces?.map((face) => {
          const storageRef = ref(storage, `images/${face.name}`);
          const task = uploadBytesResumable(storageRef, face);
          task.on("state_changed", (snapshot) => {
            setProgress(
              Math.round(
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100
              )
            );
          });
          return getDownloadURL(storageRef);
        })
      );
      setPhotosURL(urls);
      alert("업로드 완료");
    } catch (err) {
      console.log(err);
    }
    setProgress(0);
    setUploading(false);
  };

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
        } else {
          handleImageUpload();
        }
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
      axios({
        url: drf.children.childrens(),
        method: "post",
        headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
        data: {
          memberId: memberId,
          hospitalizationDay: admission,
          birthDay: birthDay,
          birthMonth: birthMonth,
          birthYear: birthYear,
          name: name,
          nickname: nickName,
        }
      }).then((res) => {
        console.log(res)
        setChildrenId(res.data.childrenId)
        axios({
          url: drf.mycharacter.createCharacter(),
          method: "post",
          headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
          data: {
            characterId: 1,
            childrenId: childrenId,
            nickname: nickName,
          }
        }).then((res) => {
          console.log(res)
          Chats.map((chat) => {
            return (
              axios({
                url: drf.answer.answers(),
                method: "post",
                headers: { Authorization: 'Bearer ' + localStorage.getItem("token") },
                data: {
                  childrenID: childrenId,
                  content: chat,
                  questionID: 1,
                },
              })
              .then((res) => console.log(res))
              .catch((err) => console.log(err))
            )
          }
          )
        })
        .catch((err) => console.log(err))
      }).catch((err) => console.log(err))
    };
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
export default CreateChildren;
