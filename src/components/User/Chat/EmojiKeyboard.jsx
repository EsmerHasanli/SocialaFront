import React, { useState } from "react";
import { IconButton } from "@mui/material";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import EmojiPicker from 'emoji-picker-react';

const EmojiKeyboard = ({ showEmojiKeyboard, setShowEmojiKeyboard, setText }) => {

  const handleEmojiSelect = (emoji) => {
    setText(prev=> prev+emoji.emoji)
  };
        
  return (
    <>
      {showEmojiKeyboard && <EmojiPicker onEmojiClick={handleEmojiSelect} style={{position: 'absolute', bottom:'55px'}} />}
      <IconButton onClick={() => setShowEmojiKeyboard((prev) => !prev)}>
        <EmojiEmotionsOutlinedIcon style={{ color: 'rgb(75,85,99)' }} />
      </IconButton>
    </>
  );
};

export default EmojiKeyboard;
