import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";
import {AiOutlineSend} from 'react-icons/ai'
import {Button} from "react-bootstrap";
import {FaUserCircle} from "react-icons/fa"
import "./chat.css";

let socket;
const CONNECTION_PORT = "http://localhost:5000";

socket = io(CONNECTION_PORT);

function Chat({ roomId, userId }) {
  const [enterRoom, setEnterRoom] = useState(false)
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
    if (enterRoom ){
      socket = io(CONNECTION_PORT);
    socket.emit("join_room", roomId);
    axios
      .get(`${process.env.REACT_APP_BACKEND_SERVER}chat/${roomId}`)
      .then((result) => {
		setMessageList(result.data)
      }).catch((err)=>{
		console.log(err);
	})
    }
  }, [enterRoom]);

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

  /*<div class="container">
  <sup>loay</sup>
  <img src="/w3images/bandmember.jpg" alt="Avatar" style="width:100%;">
  <p>Hello. How are you today?</p>
  <span class="time-right">11:00</span>
</div>
 */

  return (
    <>
      {enterRoom ? <div className="containar-all-chat" >
        <div className=".chat-content-all ">
        {messageList.map((val, i) => {
          return (<>
            <div className="chat-info1">
            <FaUserCircle  size={30} />
            <sup  key={i}>
              {val.user_name} 
            </sup>
            <p className="chat-content" key={i}>{val.chat_content}</p>
            <span className="time-right" key={i} >{val.date}</span>
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
      </div>:<div className="join-chat">
        <Button className="join-chat-button" onClick={(e)=>{setEnterRoom(true)}} > Join The Chat  </Button>
        </div>}
    </>
  );
}

export default Chat;
