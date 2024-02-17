import React, { useContext } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Avatar } from "@mui/material";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { format, differenceInDays } from 'date-fns';

const Message = ({ message, chat }) => {
  console.log('message', message);
  const { store } = useContext(Context);

  const formatDate = (dateString) => {
    const currentDate = new Date();
    const inputDate = new Date(dateString);
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

  return (
    <>
      {message.sender == store.user.userName ? (
        <div className="sended">
          <div className="message">
            <p>{message?.text}</p>
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
            <p>{message.text}</p>
            <span>{formatDate(message?.createdAt)}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default observer(Message);
