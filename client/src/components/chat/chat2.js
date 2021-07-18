import React, { useState, useEffect , useRef } from "react";
import io from "socket.io-client";
import axios from "axios";
import { useSelector } from "react-redux";
import {AiOutlineSend} from 'react-icons/ai'
import Picker from 'emoji-picker-react';
import {FaUserCircle} from "react-icons/fa"
import {HiEmojiHappy} from "react-icons/hi"
import "./chat.css";

let socket;
const CONNECTION_PORT = process.env.REACT_APP_BACKEND_SERVER;

socket = io(CONNECTION_PORT);

function Chat2({ roomId }) {
  const messageEl = useRef(null);
  const [message, setMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
  const [chosenEmoji, setChosenEmoji] = useState(null);
  const [pick_emoji, setPick_emoji] = useState(false)
  const state = useSelector((state) => {
    return {
      token: state.login.token,
      user_id: state.login.user_id,
      user_name : state.login.user_name,

    };
  });

  useEffect(() => {
    if (messageEl.current) {
      messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight, behavior: 'smooth' });
      });
    }
  }, [messageEl.current])




  useEffect(() => {
   
      socket = io(CONNECTION_PORT);
    socket.emit("join_userList", roomId);
    axios
      .get(`/chat/userChat/${roomId}`)
      .then((result) => {
		setMessageList(result.data)
      }).catch((err)=>{
		console.log(err);
	})
  setTimeout(()=>{
    var element = document.getElementById("addddaaass");
    element.scroll({ top: element.scrollHeight, behavior: 'smooth' });
  }
    ,50)
  


   
  }, [roomId]);

  socket.on("receive_message_req", (data) => {
    console.log("data",data);
    setMessageList([...messageList, data]);
       messageEl.current.addEventListener('DOMNodeInserted', event => {
        const { currentTarget: target } = event;
        target.scroll({ top: target.scrollHeight});
      });
  });

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

    socket.emit("send_message_req", messageContent); //raise event
    setMessageList([...messageList, messageContent.content]);
    axios.post(
      `/chat/userChat/${roomId}`,
      {chat_content:message , user_name:state.user_name },
      {
        headers: {
          authorization: "Bearer " + state.token,
        },
      }
    ).then(result=>{
        console.log("result",result.data);
      document.getElementById("textArea-chat").value = "";
      setMessage("")
    	}).catch((err)=>{
		console.log(err);
	})
  };

  ////////////////
  const onEmojiClick = (event, emojiObject) => {
    setChosenEmoji(emojiObject);

    document.getElementById("textArea-chat").value =message +  emojiObject.emoji ;
    setMessage(message +  emojiObject.emoji)
  };

  /////////////////


  



  return (
    <>
      <div className="containar-all-chat-2" id="containar-all-chat-2"   >
        <div className="chat-content-all" id="addddaaass" ref={messageEl}  >
        {messageList.map((val, i) => {
          if (val.user_id === state.user_id ){
            return   (<>
              <div className="chat-info2">
              <FaUserCircle id="FaUserCircle" size={30} />
              <sup className="nameFaUserCircle" key={i}>
                {val.user_name} 
              </sup>
              <p className="chat-content" key={i}>{val.chat_content}</p>
              <span className="time-right2" key={i} >{val.date}</span>
              </div>
              </>
            );
          }else {
          return (<>
            <div className="chat-info1">
            <FaUserCircle id="FaUserCircle" size={30} />
            <sup className="nameFaUserCircle" key={i}>
              {val.user_name} 
            </sup>
            <p className="chat-content" key={i}>{val.chat_content}</p>
            <span className="time-right" key={i} >{val.date}</span>
            </div>
            </>
          );
        }})
        }
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
        <HiEmojiHappy  size={32} cursor="pointer"  onClick={()=>{
          if (pick_emoji){setPick_emoji(false)}else{setPick_emoji(true)}
        }} />
        < AiOutlineSend color="green" cursor="pointer" size={32} onClick={sendMessage}  />
        {pick_emoji ? <Picker pickerStyle={{ width: '90%' }} onEmojiClick={onEmojiClick} /> :''}
      </div>
      </div>
        
        
    </>
  );
}

export default Chat2;