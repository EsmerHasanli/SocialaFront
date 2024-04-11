import React, { useContext } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Avatar, IconButton } from "@mui/material";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { format, differenceInDays } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';

const Message = ({connection, message, chat }) => {
  const { store } = useContext(Context);
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
        <div className="sended">
          <IconButton className="delete-message-btn" onClick={() => deleteMessage(message.id)}><DeleteIcon style={{fontSize:'16px', color:'rgb(239,68,68)'}} /></IconButton>
          <div className="message">
              {message?.text?.length ?
                <p>{message?.text}</p>
                :
                <audio controls>
                  <source src={message.audioUrl} type="audio/mp3"></source>
                  Your browser does not support the audio element.
                </audio>
              }
            <span>{formatDate(message?.createdAt)}</span>
          </div>
          <div className="avatar">
            <Avatar src={store.user?.imageUrl} className="photo" style={{zIndex:'1'}} />
          </div>
        </div>
      ) : (
        <div className="recieved">
          <div className="avatar">
            <Avatar className="photo" src={chat.chatPartnerImageUrl} style={{zIndex:'1'}} />
          </div>
          <div className="message">
              {message?.text?.length ?
                <p>{message?.text}</p>
                :
                <audio controls>
                  <source src={message.audioUrl} type="audio/mp3"></source>
                  Your browser does not support the audio element.
                </audio>
              }
            <span>{formatDate(message?.createdAt)}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default observer(Message);