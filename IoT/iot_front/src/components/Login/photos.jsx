import { useEffect, useState } from "react";
import styled from "styled-components";
import { getDownloadURL, listAll, ref } from "firebase/storage";
import { storage } from "../../apis/firebase";
import { async } from "@firebase/util";

// import { infiniteImg } from "../animation";

const Wrapper = styled.div`
  display: grid;
  grid-template-rows: repeat(8, 1fr);
  grid-template-columns: repeat(9, 1fr);
  padding-bottom: 300px;
  grid-gap: 50px;
  width: 95vw;
  height: 60vh;
  .content {
    background-position: center center;
    background-size: cover;
    border-radius: 10px;
    width: 100%;
    height: 100%;
    transition: all 1s linear 0.5s;
  }
  .left__top {
    grid-area: 1 / 1 /5 /6;
  }
  .right__top__top {
    grid-area: 1/ 6 / 3 /10;
  }
  .right__top__bottom {
    grid-area: 3 / 6 / 5 / 10;
  }

  .right__bottom {
    grid-area: 5 / 5 / 10 / 10;
  }
  .left__bottom__top {
    grid-area: 5 / 1 / 7 / 5;
  }
  .left__bottom__bottom__left {
    grid-area: 7 / 1 / 10 / 3;
  }
  .left__bottom__bottom__right {
    grid-area: 7 / 3 / 10 / 5;
  }
`;

function Photos({ ready }) {
  const [images, setImages] = useState([]);
  const [nowSlide, setNowSlide] = useState(0);
  const listRef = ref(storage, "/captureImages");
  useEffect(() => {
    listAll(listRef).then((res) => {
      res.prefixes.forEach((prefixe) => {
        const itemsURL = prefixe.fullPath;
        const itemsRef = ref(storage, itemsURL);
        listAll(itemsRef).then(async (items) => {
          await items.items.forEach((item) => {
            // console.log(item);
            getDownloadURL(ref(storage, item.fullPath)).then((url) => {
              setImages((val) => [...val, url]);
            });
          });
        });
      });
    });

    const autoplay = setInterval(function () {
      setNowSlide((val) => val + 1);
    }, 10000);
  }, []);

  const setRandomImg = () => {
    const total = images.length;
    return Math.floor(Math.random() * total);
  };
  return (
    <Wrapper>
      <div className="left__top">
        <div
          className="content"
          style={{ backgroundImage: `url(${images[setRandomImg()]})` }}
        ></div>
      </div>
      <div className="right__top__top">
        <div
          className="content"
          style={{ backgroundImage: `url(${images[setRandomImg()]})` }}
        ></div>
      </div>
      <div className="right__top__bottom">
        <div
          className="content"
          style={{ backgroundImage: `url(${images[setRandomImg()]})` }}
        ></div>
      </div>
      <div className="left__bottom__top">
        <div
          className="content"
          style={{ backgroundImage: `url(${images[setRandomImg()]})` }}
        ></div>
      </div>
      <div className="left__bottom__bottom__left">
        <div
          className="content"
          style={{ backgroundImage: `url(${images[setRandomImg()]})` }}
        ></div>
      </div>
      <div className="left__bottom__bottom__right">
        <div
          className="content"
          style={{ backgroundImage: `url(${images[setRandomImg()]})` }}
        ></div>
      </div>
      <div className="right__bottom">
        <div
          className="content"
          style={{ backgroundImage: `url(${images[setRandomImg()]})` }}
        ></div>
      </div>
    </Wrapper>
  );
}

export default Photos;
