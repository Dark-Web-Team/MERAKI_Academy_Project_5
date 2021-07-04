import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";

let socket;
const CONNECTION_PORT = "http://localhost:5000";

socket = io(CONNECTION_PORT);

function Chat({ roomId, userId }) {
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const state = useSelector((state) => {
    return {
      token: state.login.token,
      user_id: state.login.user_id,
    };
  });
  useEffect(() => {
    socket = io(CONNECTION_PORT);
    socket.emit("join_room", roomId);
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}chat/${roomId}`)
      .then((result) => {
        console.log(result);
      }).catch((err)=>{
		console.log(err);
	})
  }, [CONNECTION_PORT, state.token]);

  socket.on("receive_message", (data) => {
    setMessageList([...messageList, data]);
  });

  // useEffect(() => {}, [messageList]);

  const sendMessage = () => {
    const messageContent = {
      roomId,
      content: {
        author: userId,
        message,
      },
    };

    socket.emit("send_message", messageContent); //raise event
    setMessageList([...messageList, messageContent.content]);
    axios.post(
      `${process.env.REACT_APP_BACKEND_SERVER}chat/${roomId}`,
      {chat_content:message,user_id:userId,business_id:roomId   },
      {
        headers: {
          authorization: "Bearer " + state.token,
        },
      }
    ).then(result=>{
		console.log(result);
		setMessage("");
	}).catch((err)=>{
		console.log(err);
	})
  };

  return (
    <>
      <div>
        {messageList.map((val, i) => {
          return (
            <h1 key={i}>
              {val.author} {val.message}
            </h1>
          );
        })}
      </div>
      <div>
        <input
          type="text"
          placeholder="Write your message here ..."
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={sendMessage}>Send</button>
      </div>
    </>
  );
}

export default Chat;
