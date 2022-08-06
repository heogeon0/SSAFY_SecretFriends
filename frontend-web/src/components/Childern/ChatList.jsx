import { useRecoilState } from "recoil";
import { Chats } from "../../atom";

function ChatList() {
  const [chats, setChats] = useRecoilState(Chats);

  function deleteChat(index) {
    const newChatList = [];
    chats.forEach((chat, idx) => {
      if (idx !== index) {
        newChatList.push(chat)
      }
    })
    setChats(newChatList)
  }

  return (
    <>
      <ul style={{ height: "100px" }}>
        {chats?.map((chat, idx) => {
          return <li key={idx}>
            {chat}
            <button onClick={() => deleteChat(idx)}>삭제</button>
          </li>;
        })}
      </ul>
      <div></div>
    </>
  );
}

export default ChatList;
