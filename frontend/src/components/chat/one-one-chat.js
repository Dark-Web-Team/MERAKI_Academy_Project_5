import React, { useState, useEffect , useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";
import Chat2 from "../chat/chat2"
import {AiOutlineSend} from 'react-icons/ai'
import {Button} from "react-bootstrap";
import {FaUserCircle} from "react-icons/fa"
import "./chat.css";

let socket;
const CONNECTION_PORT = "http://localhost:5000";

socket = io(CONNECTION_PORT);

function PrivateChat() {
    const roomId = 2
  const messageEl = useRef(null);
  const [enterRoom, setEnterRoom] = useState(0)
  const [roomList, setRoomList] = useState([]);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const state = useSelector((state) => {
    return {
      token: state.login.token,
      user_id: state.login.user_id,
      user_name : state.login.user_name,

    };
  });

  socket = io(CONNECTION_PORT);
  socket.emit("join_userList", state.user_id);


  useEffect(() => {
    axios.get(`${process.env.REACT_APP_BACKEND_SERVER}chat/userChat`,
    {
        headers: {
          authorization: "Bearer " + state.token,
        },
      }
    ).then(result=>{
        console.log("result.data",result.data);
        setRoomList(result.data)
    	}).catch((err)=>{
		console.log(err);
	})

       


  }, [state.token]);

  socket.on("receive_message_req", (data) => {
      console.log("data",data);
      setRoomList([...roomList, data]);
  });

  

  return (
    <>
    <div className="parant-to-One-chat">
   <div className="ch1-to-One-chat">
       {roomList.map((val,i)=>{
         console.log("val",val);
           return (<> <div className="chat2-user-info" key={i} onClick ={()=>{
            setEnterRoom(val.roomId)}}>
              <FaUserCircle  size={30} />
              {state.user_id !== val.user1_id ? <span id="span-onetoone">{val.user1_name   }</span> :""  }
              {state.user_id !== val.user2_id ? <span id="span-onetoone">{val.user2_name   }</span> :""  }
           </div>
           </>)
       })}
   </div>
   {enterRoom !==0 ? <div className="ch2-to-One-chat">
   < Chat2 roomId ={enterRoom}  userId = {state.user_id} />
   </div> :""}
   </div>
    </>
  );
}

export default PrivateChat;
