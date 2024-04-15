import React, { memo, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { IconButton } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { Context } from "../../../main";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import EmojiKeyboard from "./EmojiKeyboard";
import { FollowContext } from "../../../context";
import { sendMessage } from "@microsoft/signalr/dist/esm/Utils";
import { AddToPhotosOutlined, ArrowUpward, MicRounded, VoiceChat, VoiceChatOutlined } from "@mui/icons-material";
import { setMinutes, setSeconds } from "date-fns";
import Message from "./Message";
import Swal from "sweetalert2";
import UploadPreview from "../UploadPreview";


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
  const [recordTimeSeconds, setRecordTimeSeconds] = useState(0); 
  const [recordTimeMinutes, setRecordTimeMinutes] = useState(0); 
  const [volumeLevel, setVolumeLevel] = useState([]);

 
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
    
    let timer;
    async function sendAudio() {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        const formData = new FormData()
        formData.append("audio", audioBlob)
        formData.append("chatId", currentChatId)
        formData.append("minutes", recordTimeMinutes)
        formData.append("seconds", recordTimeSeconds)
        formData.append("sender", store.user.userName)
        setAudioChunks([])
        setRecordTimeMinutes(0)
        setRecordTimeSeconds(0)
        await store.sendAudio(formData);
      }
      if (!recording && audioChunks.length) {
        sendAudio()
      }
      if (recording) {
        timer = setInterval(() => {
          setRecordTimeSeconds(prevTime => {
            if (prevTime + 1 < 60){
          
                return prevTime + 1;
            } 
            else {
              setRecordTimeMinutes(prev => prev +1)
              return 0
            }
          }); 
          }, 1000); // Обновляем время каждую секунду
        }
      else if (!recording && audioChunks.length) {
      clearInterval(timer); // Очищаем таймер при остановке записи
      // Сбрасываем время записи
      }
      return () => clearInterval(timer);
  }, [recording, audioChunks, mediaRecorder])


  useEffect(() => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const analyser = audioCtx.createAnalyser();
    const bufferLength = analyser.frequencyBinCount;
    const dataArray = new Uint8Array(bufferLength);
    if (mediaRecorder) {
      const source = audioCtx.createMediaStreamSource(mediaRecorder.stream);
      source.connect(analyser);
    }
    let timer;
    if (recording) {
      timer = setInterval(() => {
        analyser.getByteFrequencyData(dataArray);
        const average = dataArray.reduce((acc, value) => acc + value, 0) / bufferLength;
        setVolumeLevel(prev => [...prev, (average / 255).toFixed(2)]);
        const wrapperWidth = document.querySelector(".volume-progress-wrapper").clientWidth
        const progressDivWidth = document.querySelector(".progress-div").clientWidth
        if (progressDivWidth >= wrapperWidth) setVolumeLevel([])
        }, 200); // Обновляем время каждую секунду
      }
      else if (!recording && audioChunks.length) {
        clearInterval(timer); // Очищаем таймер при остановке записи
        // Сбрасываем время записи
        }
        return () => clearInterval(timer);
  }, [mediaRecorder, recording])



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
      setVolumeLevel([])
  };


  return (
    <>
      <div className="message-input">
        <div className="icons">
          <EmojiKeyboard showEmojiKeyboard={showEmojiKeyboard} setShowEmojiKeyboard={setShowEmojiKeyboard} setText={setText} />
          <UploadPreview/>
        </div>
        <form onSubmit={sendMessage} className="input-wrapper" encType="multipart/form-data">
          <div className="send-message-wrapper">
            {recording && 
              <div className="recording-time-wrapper">
                <MicRounded style={{color:"#199DEC"}} />
                <span>{recordTimeMinutes}:{recordTimeSeconds<10 ? `0${recordTimeSeconds}` : recordTimeSeconds}</span>
              </div>
              }
              <div className="volume-progress-wrapper" style={recording ? {display:"flex"} : {display:"none"}}>
                <div className="progress-div">
                  {recording && volumeLevel.map(volume => 
                      <div className="progress" style={{height:`${volume * 120}px`}}></div>
                  )}
                </div>
             </div>
            <input style={recording ? {display:"none"} : {display:"initial"}} placeholder={recording ? "" : "Write your message"} disabled={recording ? true : false} value={text} onBlur={handleBlurInput} onChange={(e) => {
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
                  <MicRounded style={{color:"#199DEC"}}/>
              </IconButton>
            }
          </div>
        </form>
      </div>
    </>
  );
;}

export default observer(Form);