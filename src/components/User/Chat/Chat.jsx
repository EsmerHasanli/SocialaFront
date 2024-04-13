import { Avatar, IconButton } from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import { observer } from "mobx-react-lite";
import Message from "./Message";
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import UserInfoBar from "./UserInfoBar";
import { Link } from "react-router-dom";
import { FollowContext } from "../../../context";

const Chat = ({currentChat, setCurrentChat, typingUsers, chatMessages, connection}) => {
  const {onlineUsers, setOnlineUsers} = useContext(FollowContext)

  const [skip, setSkip] = useState(0); 
  const [messsagesGetted, setMessagesGetted] = useState(false)
  const {currentChatId, setCurrentChatId} = useContext(FollowContext)
  const [loader, setLoader] = useState(true);
  const chatContainerRef = useRef(null);
  
  const prevScrollRef = useRef(0);
  useEffect(() => {
      if (messsagesGetted) {
        setMessagesGetted(false);
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight - prevScrollRef.current
      }
      else {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight
      }
    chatContainerRef.current.addEventListener('scroll', getMessages);
  
    return () => {
      chatContainerRef.current?.removeEventListener('scroll', getMessages);
    };
  }, [chatMessages])
  
  function getMessages() {
    if (chatContainerRef.current.scrollTop == 0) {
      prevScrollRef.current = chatContainerRef.current.scrollHeight
      setSkip(skip + 20)
      setMessagesGetted(true)
      connection.getChatMessages(currentChat.id, skip + 20)

    }
  }

  return (
    <div className="wrapper" ref={chatContainerRef}>
      <div className="header">
        <div className="left">
        <IconButton onClick={()=>{
          if (currentChatId) connection.disconnectFromChat(currentChatId)
          setCurrentChatId(null)
          setCurrentChat(null)
        }}>
          <KeyboardArrowLeftIcon/>
        </IconButton>
          <div className="avatar">
            <Avatar
              className="photo"
              src={currentChat?.chatPartnerImageUrl}
            />
            {onlineUsers.find(u => u == currentChat.chatPartnerUserName) &&
            <div className="isOnline"></div>
            }
          </div>

          <div className="info">
            <h5 style={{color: 'rgb(37,47,63)'}}>{currentChat?.chatPartnerUserName}</h5>
            {onlineUsers.find(u => u == currentChat.chatPartnerUserName) ?
              typingUsers.includes(currentChat.chatPartnerUserName) ? <p style={{color:'rgb(75,85,99)', fontSize:'14px'}}>typing...</p>
                           :<p style={{color:'rgb(34, 197, 94)'}}>Online</p>
            :null
              }
          </div>
        </div>

        <div className="right">
          <UserInfoBar currentChat={currentChat} />
        </div>
      </div>
      <div className="messages">
        <div className="chat">
          {chatMessages?.slice().reverse().map((message) => 
            <Message key={message.id} connection={connection} message={message} chat={currentChat}/>
          )}
        </div>
      </div>

    </div>
  );
};

export default observer(Chat);