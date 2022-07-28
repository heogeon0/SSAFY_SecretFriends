import { useRecoilValue } from "recoil";
import { Chats } from "../../atom";

function ChatList() {
  const chats = useRecoilValue(Chats);
  return (
    <>
      <ul style={{ height: "100px" }}>
        {chats?.map((chat) => {
          return <li key={chat.id}>{chat.chat}</li>;
        })}
      </ul>
    </>
  );
}

export default ChatList;
