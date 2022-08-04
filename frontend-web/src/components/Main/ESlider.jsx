import styled from "styled-components";
import { useRecoilState } from "recoil";
import { ChildrenID } from "../../atom";
import { useEffect } from "react";

const NowSlider = styled.div`
  width: ${(props) => (props.check === "now" ? "30%" : "25%")};
  padding-top: ${(props) => (props.check === "now" ? "30%" : "25%")};
  border-radius: 50%;
  transform: translate(-50%, -50%);
  transition: all ease-in-out 0.5s;
  position: absolute;
  top: 50%;

  left: ${(props) =>
    (props.check === "now" && "50%") ||
    (props.check === "next" && "80%") ||
    (props.check === "prev" && "20%")};

  background-image: url(${(props) => props.bg});
  background-position: center center;
  background-repeat: no-repeat;
  background-size: cover;
`;

function ESlider({ child, check }) {
  console.log(child)
  const [childrenID, setChildrenID] = useRecoilState(ChildrenID);

  return (
    <>
    <div>{child}</div>
        {/* <div>{child}</div> */}
      {check !== "hidden" ? (
        <NowSlider bg="https://picsum.photos/200/300" check={check}></NowSlider>
      ) : null}
    </>
  );
}

export default ESlider;
