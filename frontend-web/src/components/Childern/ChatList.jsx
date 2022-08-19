import { useRecoilState } from "recoil";
import { Chats } from "../../atom";
import styled from "styled-components";


const FlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 4px 0;
`
const DeleteBtn = styled.button`
  border: none;
  border-radius: 5px;
  background-color: aliceblue;
  :hover {
    cursor: pointer;
  }
`


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
          return (
            <li key={idx}>
              <FlexBox>
                {chat}
                <DeleteBtn onClick={() => deleteChat(idx)}>x</DeleteBtn>
              </FlexBox>
            </li>
          )
        })}
      </ul>
    </>
  );
}

export default ChatList;
