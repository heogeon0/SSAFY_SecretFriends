import { useRecoilValue } from "recoil";
import { Chats } from "../../atom";

function ChatList() {
  const chats = useRecoilValue(Chats);
  return (
    <>
      <ul style={{ height: "100px" }}>
        {chats?.map((chat, idx) => {
          return <li key={idx}>{chat}</li>;
        })}
      </ul>
      <div></div>
    </>
  );
}

export default ChatList;
