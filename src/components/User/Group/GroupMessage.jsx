import React, { useContext } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Avatar, IconButton } from "@mui/material";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { format, differenceInDays } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';

const GroupMessage = ({connection,groupMembers, message, group}) => {
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
    console.log(utcOffset)
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
    connection.deleteGroupMessage(id);
  }

  return (
    <>
      {message.sender == store.user.userName ? (
        <div className="sended">
          <IconButton className="delete-message-btn" onClick={() => deleteMessage(message.id)}><DeleteIcon style={{fontSize:'16px', color:'rgb(239,68,68)'}} /></IconButton>
          <div className="message">
            <p>{message?.text}</p>
            <span>{formatDate(message?.createdAt)}</span>
          </div>
          <div className="avatar">
            <Avatar src={message?.imageUrl} className="photo" style={{zIndex:'1'}} />
          </div>
        </div>
      ) : (
        <div className="recieved">
           <div className="avatar">
            <Avatar className="photo" src={message?.imageUrl} style={{zIndex:'1'}} />
          </div>
          <div className="message">
            <p>{message.text}</p>
            <span>{formatDate(message?.createdAt)}</span>
          </div>
          {groupMembers?.find(m => m.userName == store.user.userName && m.groupRole == "Owner" || m.groupRole == "Admin") &&
          <IconButton className="delete-message-btn" onClick={() => deleteMessage(message.id)}>
            <DeleteIcon style={{fontSize:'16px', color:'rgb(239,68,68)'}} />
          </IconButton>}
        </div>
      )}
    </>
  );
};

export default observer(GroupMessage);