import React, { useContext, useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { Context } from "../../../main";
import { useFormik } from "formik";

const Form = ({connection, currentChatId, fileUploadVisible, setIsFileUploadVisible}) => {
  const [value,setValue] = useState("")
  const {store} = useContext(Context);

  const formik = useFormik({
    initialValues: {
      text: ''
    },
    // validationSchema:
    onSubmit: async (values, actions) => {
      if (values.text.length) {
        const payload = {
          chatId:currentChatId,
          sender:store.user.userName,
          text:values.text
        }
        connection.sendMessageById(payload);
      }
      actions.resetForm();
    }
  })
  // async function sendMessage(e) {
  //   e.preventDefault();
  //   if (value.length) {
  //     const payload = {
  //       chatId:currentChatId,
  //       sender:store.user.userName,
  //       text:value
  //     }
  //     connection.sendMessageById(payload);
  //   }
  // }
  return (
    <div className="message-input">
      <div className="icons">
        {/* <input style={{display:'none'}} type="file" id="files" name="files" /> */}

        <IconButton onClick={()=>setIsFileUploadVisible(true)}>
          <label style={{display:'flex'}} htmlFor="files">
            <AddCircleOutlineOutlinedIcon style={{fill:'rgb(75, 85, 99)', cursor:'pointer'}} />
          </label>
        </IconButton>

          <IconButton>
            <label style={{display:'flex'}}>
              <EmojiEmotionsOutlinedIcon style={{fill:'rgb(75, 85, 99)', cursor:'pointer'}} />
            </label>
          </IconButton>
      </div>


      <form onSubmit={formik.handleSubmit} className="input-wrapper">
        <div className="send-message-wrapper">
          <input placeholder="Write your message" type="text" id='text' name='text' value={formik.values.text} onChange={formik.handleChange} autocomplete="off" />
          <IconButton type='submit'>
            <SendIcon/>
          </IconButton>
        </div>
      </form>
    </div>
  );
};

export default Form;