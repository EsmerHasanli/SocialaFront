import React from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
const Form = () => {
  return (
    <div className="message-input">
      <div className="icons-left">
        <AddCircleOutlineOutlinedIcon />
        <EmojiEmotionsOutlinedIcon />
      </div>
      <form className="input-wrapper">
        <input placeholder="Write your message" type="text" />
      </form>
      <div className="icons-right">
        <FavoriteBorderOutlinedIcon />
      </div>
    </div>
  );
};

export default Form;
