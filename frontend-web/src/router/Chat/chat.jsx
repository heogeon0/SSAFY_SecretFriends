import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import MyChats from "../../components/chats/MyChats";

function Chat() {
  const [id, setId] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    setId(e.target[0].value);
  };
  return (
    <>
      <form onSubmit={onSubmit}>
        <input type="text" />
      </form>
      {id ? <MyChats name={id} /> : null}
    </>
  );
}

export default Chat;
