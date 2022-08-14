import React, { useEffect, useState } from "react";
import io from "socket.io-client";

function MyChats({ name }) {
  console.log(name);
  const socket = io.connect("http://localhost:4000");
  useEffect(() => {
    socket.on("connect", function () {
      console.log(name);
      name = JSON.parse(name);
      socket.emit("newUser", name);
    });
  }, []);

  const [chat, setChat] = useState([]);
  const [message, setMessage] = useState("");

  const sendMessageHandler = () => {
    socket.emit("chat message", { message: message });
    setMessage("");
  };

  useEffect(() => {
    socket.on("newUser", (msg) => {
      setChat([...chat, msg]);
    });
    socket.on("chat message", (msg) => {
      setChat([...chat, msg]);
    });
    socket.on("disconnected", (msg) => {
      setChat([...chat, msg]);
    });
  }, [chat]);

  return (
    <div className="App">
      <div>
        <h1>Messages</h1>
        <ul>
          {chat.map((data, idx) => {
            return <li key={idx}>{data.message}</li>;
          })}
        </ul>
      </div>

      <div>
        <h1>Chat Box</h1>
        <input value={message} onChange={(e) => setMessage(e.target.value)} />
        <button onClick={sendMessageHandler}>Send Message</button>
      </div>
    </div>
  );
}

export default MyChats;
