import React, { useContext } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Avatar } from "@mui/material";
import DoneAllIcon from '@mui/icons-material/DoneAll';

const Message = ({ message, chat }) => {
  const { store } = useContext(Context);
  return (
    <>
      {message.sender == store.user.userName ? (
        <div className="sended">
          <div className="message">
            <p>{message.text}</p>
            <span>12:00</span>
            <DoneAllIcon style={{fontSize:'12px'}}/>
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
            <span>12:00</span>
          </div>
        </div>
      )}
    </>
  );
};

export default observer(Message);
