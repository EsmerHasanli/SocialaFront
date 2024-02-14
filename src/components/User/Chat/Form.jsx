import React from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';

const Form = () => {
  return (
    <div className="message-input">
      <div className="icons">
        <AddCircleOutlineOutlinedIcon />
        <EmojiEmotionsOutlinedIcon />
      </div>
      <form className="input-wrapper">
        <input placeholder="Write your message" type="text" />
        <IconButton>
          <SendIcon/>
        </IconButton>
      </form>
    </div>
  );
};

export default Form;
