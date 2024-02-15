import React, { useContext, useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { Context } from "../../../main";

const Form = ({connection, currentChatId}) => {
  const [value,setValue] = useState("")
  const {store} = useContext(Context);
  async function sendMessage(e) {
    e.preventDefault();
    if (value.length) {
      const payload = {
        chatId:currentChatId,
        sender:store.user.userName,
        text:value
      }
      connection.sendMessageById(payload);
    }
  }
  return (
    <div className="message-input">
      <div className="icons">
        <AddCircleOutlineOutlinedIcon />
        <EmojiEmotionsOutlinedIcon />
      </div>
      <form className="input-wrapper">
        <div className="send-message-wrapper">
          <input placeholder="Write your message" type="text" value={value} onChange={(e) => setValue(e.target.value)} />
          <IconButton onClick={(e)=>sendMessage(e)}>
            <SendIcon/>
          </IconButton>
        </div>
      </form>
    </div>
  );
};

export default Form;