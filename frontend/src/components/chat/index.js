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
      user_name : state.login.user_name,

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
        user_id: state.user_id,
        chat_content:message,
        user_name : state.user_name,
        date : Date().slice(0,24).split(2021 ).reverse().join(" ")
        
      },
    };

    socket.emit("send_message", messageContent); //raise event
    setMessageList([...messageList, messageContent.content]);
    console.log(messageList);
    axios.post(
      `${process.env.REACT_APP_BACKEND_SERVER}chat/${roomId}`,
      {chat_content:message , user_name:state.user_name },
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
          return (<>
            <div className="chat-info1">
            <p className="chat-name" key={i}>
              {val.user_name} 
            </p>
            <p className="chat-content" key={i}>{val.chat_content}</p>
            <p className="chat-date" key={i} >{val.date}</p>
            </div>
            </>
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
