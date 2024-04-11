import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { Context } from "../../../main";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import EmojiKeyboard from "./EmojiKeyboard";
import { FollowContext } from "../../../context";
import { sendMessage } from "@microsoft/signalr/dist/esm/Utils";
import { ArrowUpward, MicRounded, VoiceChat, VoiceChatOutlined } from "@mui/icons-material";


let send;
const Form = ({connection, userName}) => {
  const {store} = useContext(Context);
  const [isTyping, setIsTyping] = useState(false);
  const {currentChatId, setCurrenthatId} = useContext(FollowContext)

  const [showEmojiKeyboard, setShowEmojiKeyboard] = useState(false);
  const [text, setText] = useState('');
  const [mediaRecorder, setMediaRecorder] = useState(null);
  const [audioChunks, setAudioChunks] = useState([]);
  const [recording, setRecording] = useState(false);
 
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
  useEffect(() => {
    async function sendAudio() {
        console.log(audioChunks)
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const formData = new FormData()
        formData.append("audio", audioBlob)
        formData.append("chatId", currentChatId)
        await store.sendAudio(formData);
      }
      if (!recording && audioChunks.length) {
        sendAudio()
      }
  }, [recording, audioChunks])
  const startRecordingAudio = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const recorder = new MediaRecorder(stream);

        recorder.addEventListener('dataavailable', event => {
            setAudioChunks([...audioChunks, event.data]);
        });

        recorder.start();
        setRecording(true);
        setMediaRecorder(recorder);
    };

    const stopRecording = () => {
      mediaRecorder.stop();
      setRecording(false);
  };
  return (
    <>
      <div className="message-input">
        <div className="icons">
          <EmojiKeyboard showEmojiKeyboard={showEmojiKeyboard} setShowEmojiKeyboard={setShowEmojiKeyboard} setText={setText} />
        </div>
        <form onSubmit={sendMessage} className="input-wrapper" encType="multipart/form-data">
          <div className="send-message-wrapper">
            <input placeholder="Write your message" value={text} onBlur={handleBlurInput} onChange={(e) => {
              handleChangeInput(e);
            }
              } autoComplete="off" />
            {text.length
              ?
                <IconButton type='submit'>
                  <SendIcon/>
                </IconButton>
              : 
              recording ?
              <IconButton onClick={stopRecording}>
                <ArrowUpward/>
              </IconButton>
              :
              <IconButton onClick={startRecordingAudio}>
                  <MicRounded/>
              </IconButton>
            }
          </div>
        </form>
      </div>
    </>
  );
;}

export default observer(Form);