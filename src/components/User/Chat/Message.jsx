import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Avatar, IconButton } from "@mui/material";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { format, differenceInDays } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import { Pause, PlayArrow } from "@mui/icons-material";
import AudioMessage from "./AudioMessage";
import MediaMessage from "./MediaMessage";

const Message = ({connection, message, chat }) => {
  const { store } = useContext(Context);
  console.log(message);


 
  const formatDate = () => {
    const currentDate = new Date();
    if (message.createdAt[message.createdAt.length - 1] == 'Z') {
      message.createdAt = message.createdAt.slice(0, -1)
    }
    const inputDate = new Date(message.createdAt);
    const timezoneOffsetInMinutes = currentDate.getTimezoneOffset();
    const timezoneOffsetInHours = timezoneOffsetInMinutes / 60;
    const utcOffset = -timezoneOffsetInHours;
    inputDate.setHours(inputDate.getHours() + utcOffset);
  
    const timeDifference = differenceInDays(currentDate, inputDate);
    if (timeDifference < 1) {
        const formattedTime = format(inputDate, 'HH:mm');
        return formattedTime;
      } 
      else if (timeDifference < 7) {
        const formattedDayOfWeek = format(inputDate, 'EEE');
        return formattedDayOfWeek;
      } else {
        const formattedDate = format(inputDate, 'dd.MM.yyyy');
        return formattedDate;
      }
  };
 

  function deleteMessage(id) {
    connection.deleteMessage(id);
  }


  return (
    <>
      {message.sender == store.user.userName ? (
        <div className="sended" >
          <IconButton className="delete-message-btn" onClick={() => deleteMessage(message.id)}><DeleteIcon style={{fontSize:'16px', color:'rgb(239,68,68)'}} /></IconButton>
          {message?.text?.length && message.type == 0 ?
              <div className="message" style={{alignItems:"flex-end"}}>
                <p>{message?.text}</p>
                <span style={{position:"initial"}}>{formatDate(message?.createdAt)}</span>
              </div>
              : message.type == 1 
                  ? 
                  <div className="message" style={{alignItems:'center'}}>
                    <AudioMessage message={message}/>
                    <span >{formatDate(message?.createdAt)}</span>
                  </div>
                  : 
                  <MediaMessage message={message} />
              }
        
          <div className="avatar">
            <Avatar src={store.user?.imageUrl} className="photo" style={{zIndex:'1'}} />
          </div>
        </div>
      ) : (
        <div className="recieved">
          <div className="avatar">
            <Avatar className="photo" src={chat.chatPartnerImageUrl} style={{zIndex:'1'}} />
          </div>
          {message?.text?.length && message.type == 0 ?
              <div className="message" style={{alignItems:"flex-end"}}>
                <p>{message?.text}</p>
                <span style={{position:"initial"}}>{formatDate(message?.createdAt)}</span>
              </div>
              : message.type == 1 
                  ? 
                  <div className="message" style={{alignItems:'center'}}>
                    <AudioMessage message={message}/>
                    <span >{formatDate(message?.createdAt)}</span>
                  </div>
                  : 
                  <div className="media-message">
                    <MediaMessage message={message} />
                  </div>
              }
        </div>
      )}
    </>
  );
};

export default observer(Message);