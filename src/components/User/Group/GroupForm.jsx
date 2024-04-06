import React, { memo, useCallback, useContext, useMemo, useState } from "react";
import { IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { Context } from "../../../main";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import { FollowContext } from "../../../context";
import { sendMessage } from "@microsoft/signalr/dist/esm/Utils";
import EmojiKeyboard from "../Chat/EmojiKeyboard";


let send;
const GroupForm = ({connection}) => {
  const {store} = useContext(Context);
  const [isTyping, setIsTyping] = useState(false);
  const {currentGroupId, setCurrentGroupId} = useContext(FollowContext)

  const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
  const [text, setText] = useState('');

     async function sendMessage(e) {
      e.preventDefault();
      if (text.length) {
        const payload = {
          groupId:currentGroupId,
          sender:store.user.userName,
          imageUrl: store.user.imageUrl,
          text:text,
        }
        connection.sendMessageToGroup(payload);
      }
      setShowEmojiKeyboard(false)
      setText('')
    }
  
  const handleChangeInput = (e) => {
    setText(e.target.value)
    clearTimeout(send);
    if (!isTyping) connection.addGroupTypingUser(currentGroupId, store.user.userName)
    
    send = setTimeout(() => {
      connection.deleteGroupTypingUser(currentGroupId,store.user.userName)
      setIsTyping(false);
    },2000)
    setIsTyping(true);
  };

  const handleBlurInput = () => {
    if (isTyping) {
      connection.deleteGroupTypingUser(currentGroupId,store.user.userName)
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
              } autocomplete="off" />
            <IconButton type='submit'>
              <SendIcon/>
            </IconButton>
          </div>
        </form>
      </div>
    </>
  );
;}

export default observer(GroupForm);