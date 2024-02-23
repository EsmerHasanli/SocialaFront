import React, { useContext, useState } from "react";
import { IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { Context } from "../../../main";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import EmojiKeyboard from "./EmojiKeyboard";


const Form = ({connection, currentChatId, userName, typingStatus, setTypingStatus}) => {
  const {store} = useContext(Context);
  const [isTyping, setIsTyping] = useState(false);
  const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
  const [text, setText] = useState('');

  const formik = useFormik({
    initialValues: {
      text: text,
    },
    onSubmit: async (values, actions) => {
      if (text.length) {
        const payload = {
          chatId:currentChatId,
          sender:store.user.userName,
          text:text,
        }
        connection.sendMessageById(payload);
      }
      setShowEmojiKeyboard(false)
      setText('')
      actions.resetForm();
    }
  })

  const handleChangeInput = (e) => {
    if (!isTyping) {
      connection.changeTypingStatus(userName, senderUserName, true)
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