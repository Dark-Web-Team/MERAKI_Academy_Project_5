import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";
import {AiOutlineSend} from 'react-icons/ai'
import "./chat.css";

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
		setMessageList(result.data)
      }).catch((err)=>{
		console.log(err);
	})
  }, []);

  socket.on("receive_message", (data) => {
    setMessageList([...messageList, data]);
  });

  // useEffect(() => {}, [messageList]);

  const sendMessage = () => {
    const messageContent = {
      roomId,
      content: {
        user_id: userId,
        chat_content:message,
      },
    };

    socket.emit("send_message", messageContent); //raise event
    setMessageList([...messageList, messageContent.content]);
    axios.post(
      `${process.env.REACT_APP_BACKEND_SERVER}chat/${roomId}`,
      {chat_content:message },
      {
        headers: {
          authorization: "Bearer " + state.token,
        },
      }
    ).then(result=>{
      document.getElementById("textArea-chat").value = "";
      setMessage("")
    	}).catch((err)=>{
		console.log(err);
	})
  };

  return (
    <>
      <div className="chat-conant">
        {messageList.map((val, i) => {
          return (

            <p key={i}>
              {val.user_id} {val.chat_content}
            </p>
          );
        })}
      </div>
      <div className="input-chat">
        <input
        id = "textArea-chat"
          type="text"
          placeholder="Write your message here ..."
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown = {(e)=>{
            if (e.key === 'Enter') {
              sendMessage()
              
            }
          }}
          
        />
        < AiOutlineSend color="green" size={30} onClick={sendMessage}  />
       
      </div>
    </>
  );
}

export default Chat;
