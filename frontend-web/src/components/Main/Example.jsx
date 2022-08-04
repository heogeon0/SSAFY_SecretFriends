import { useRecoilState } from "recoil";
import { ChildrenID } from "../../atom";

function Example({child, answers, setAnswers}) {
  const [childrenID, setChildrenID] = useRecoilState(ChildrenID);

  function showID() {
    setChildrenID(child.childrenID)
    setAnswers(child.answers)
    // console.log(child.childrenID)
  }

  return (
    <div>
      <button onClick={() => showID()}>{child.name}</button>
    </div>
  )
}

export default Example;