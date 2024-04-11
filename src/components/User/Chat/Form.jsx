import React, { memo, useCallback, useContext, useMemo, useState } from "react";
import { IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { Context } from "../../../main";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import EmojiKeyboard from "./EmojiKeyboard";
import { FollowContext } from "../../../context";
import { sendMessage } from "@microsoft/signalr/dist/esm/Utils";


let send;
const Form = ({connection, userName}) => {
  const {store} = useContext(Context);
  const [isTyping, setIsTyping] = useState(false);
  const {currentChatId, setCurrenthatId} = useContext(FollowContext)

  const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
  const [text, setText] = useState('');

 
     async function sendMessage(e) {
      e.preventDefault();
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
    }
  
  const handleChangeInput = (e) => {
    setText(e.target.value)
    clearTimeout(send);
    if (!isTyping) connection.addTypingUser(userName, store.user.userName)
    
    send = setTimeout(() => {
      connection.deleteTypingUser(userName,store.user.userName)
      setIsTyping(false);
    },1000)
    setIsTyping(true);
  };

  const handleBlurInput = () => {
    if (isTyping) {
      connection.deleteTypingUser(userName,store.user.userName)
      setIsTyping(false);

    }
  };
  
  return (
    <>
      <div className="message-input">
        <div className="icons">
          <EmojiKeyboard showEmojiKeyboard={showEmojiKeyboard} setShowEmojiKeyboard={setShowEmojiKeyboard} setText={setText} />
        </div>
        <form onSubmit={sendMessage} className="input-wrapper">
          <div className="send-message-wrapper">
            <input placeholder="Write your message" value={text} onBlur={handleBlurInput} onChange={(e) => {
              handleChangeInput(e);
            }
              } autoComplete="off" />
            <IconButton type='submit'>
              <SendIcon/>
            </IconButton>
          </div>
        </form>
      </div>
    </>
  );
;}

export default observer(Form);