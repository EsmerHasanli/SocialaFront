import React, { useContext, useState } from "react";
import { IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { Context } from "../../../main";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import EmojiKeyboard from "./EmojiKeyboard";
import FileUploadModal from "./FileUploadModal";


const Form = ({connection, currentChatId, userName, typingStatus, setTypingStatus}) => {
  const {store} = useContext(Context);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
  const [text, setText] = useState('');

  const formik = useFormik({
    initialValues: {
      text: text,
      files: []
    },
    onSubmit: async (values, actions) => {
      if (text.length) {
        const payload = {
          chatId:currentChatId,
          sender:store.user.userName,
          text:text,
          media:values.files
        }
        const mediaArr = []
        if (values.files.length) {
          Array.from(values.files).forEach(file => {
              const reader = new FileReader();
              reader.onload = (e) => {
                const fileData = new Uint8Array(e.target.result);
                mediaArr.push(fileData)
              };
              reader.readAsArrayBuffer(file);
            })           
        }
        connection.sendMessageById(payload);
      }
      actions.resetForm();
    }
  })

  const handleChangeInput = (e) => {
    if (!isTyping) {
      connection.changeTypingStatus(userName, true)
    }
    setIsTyping(true);
  };

  const handleBlurInput = () => {
    if (isTyping) {
      connection.changeTypingStatus(userName,false)
      setIsTyping(false);

    }
  };
  
  return (
    <>
      <div className="message-input">
        <div className="icons">
          <FileUploadModal formik={formik} />
          <EmojiKeyboard showEmojiKeyboard={showEmojiKeyboard} setShowEmojiKeyboard={setShowEmojiKeyboard} setText={setText} />
        </div>
        <form onSubmit={formik.handleSubmit} className="input-wrapper">
          <div className="send-message-wrapper">
            <input placeholder="Write your message" type="text" id='text' name='text' value={text} onBlur={handleBlurInput} onChange={(e) => {
              handleChangeInput(e);
              setText(e.target.value);
            }
              } autocomplete="off" />
            <IconButton type='submit'>
              <SendIcon/>
            </IconButton>
          </div>
        </form>
      </div>
    </>
  );
};

export default observer(Form);