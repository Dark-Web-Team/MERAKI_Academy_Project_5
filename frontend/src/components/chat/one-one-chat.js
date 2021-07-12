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
   <div>
       {roomList.map((val,i)=>{
         console.log("caht"+i, `     ${val.roomId}`);
           return (<> <div key={i} onClick ={()=>{
             console.log("join",val.roomId );
            setEnterRoom(val.roomId)
            console.log("enterRoom",enterRoom);
         }}   > 
           <p>{val.user1_id   }</p>
           <p>{val.user2_id   }</p>
           </div>
           </>)
       })}
   </div>
   {enterRoom !==0 ? <div>
   < Chat2 roomId ={enterRoom}  userId = {state.user_id} />
   </div> :""}
    </>
  );
}

export default PrivateChat;
