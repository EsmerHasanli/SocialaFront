import React, { useContext, useEffect, useRef, useState } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Avatar, IconButton } from "@mui/material";
import DoneAllIcon from '@mui/icons-material/DoneAll';
import { format, differenceInDays } from 'date-fns';
import DeleteIcon from '@mui/icons-material/Delete';
import { Pause, PlayArrow } from "@mui/icons-material";

const Message = ({connection, message, chat }) => {
  const { store } = useContext(Context);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentAudioDurationSeconds, setCurrentAudioDurationSeconds] = useState(0)
  const [currentAudioDurationMinutes, setCurrentAudioDurationMinutes] = useState(0)
  const [currentTime, setCurrentTime] = useState(0)
  const audioRef = React.createRef();

  const togglePlay = () => {
    const audio = audioRef.current;
    if (isPlaying) {
      audio.pause();
      
    } else {
      audio.play();

    }
    setIsPlaying(!isPlaying);
  };
  const formatDate = () => {
    const currentDate = new Date();
    if (message.createdAt[message.createdAt.length - 1] == 'Z') {
      message.createdAt = message.createdAt.slice(0, -1)
    }
    const inputDate = new Date(message.createdAt);
    const timezoneOffsetInMinutes = currentDate.getTimezoneOffset();
    const timezoneOffsetInHours = timezoneOffsetInMinutes / 60;
    const utcOffset = -timezoneOffsetInHours;
    inputDate.setHours(inputDate.getHours() + utcOffset);
  
    const timeDifference = differenceInDays(currentDate, inputDate);
    if (timeDifference < 1) {
        const formattedTime = format(inputDate, 'HH:mm');
        return formattedTime;
      } 
      else if (timeDifference < 7) {
        const formattedDayOfWeek = format(inputDate, 'EEE');
        return formattedDayOfWeek;
      } else {
        const formattedDate = format(inputDate, 'dd.MM.yyyy');
        return formattedDate;
      }
  };
  useEffect(() => {
    if (audioRef?.current) {
      // Функция для обновления текущего времени аудио при срабатывании события timeupdate
      const updateTime = () => {
        const currentTime = audioRef?.current?.currentTime;
        setCurrentTime(currentTime)
        const minutes = Math.floor(currentTime / 60);
        const seconds = Math.floor(currentTime % 60);
        setCurrentAudioDurationMinutes(minutes);
        setCurrentAudioDurationSeconds(seconds);
      };
  
      // Добавление обработчика события timeupdate к элементу audio
      audioRef?.current?.addEventListener('timeupdate', updateTime);
  
      // Удаление обработчика события при размонтировании компонента
      return () => {
        audioRef?.current?.removeEventListener('timeupdate', updateTime);
      };
    }
  }, [audioRef]);
      

  function deleteMessage(id) {
    connection.deleteMessage(id);
  }

  const handleSeek = (event) => {
    const audio = audioRef.current;
    audio.currentTime = event.target.value;
    setCurrentTime(event.target.value);
  };
  return (
    <>
      {message.sender == store.user.userName ? (
        <div className="sended">
          <IconButton className="delete-message-btn" onClick={() => deleteMessage(message.id)}><DeleteIcon style={{fontSize:'16px', color:'rgb(239,68,68)'}} /></IconButton>
          <div className="message"  style={message.type == 0 ? {alignItems:"flex-end"} : {alignItems:"center"}}>
              {message?.text?.length && message.type == 0 ?
                <p>{message?.text}</p>
                :
                <div className="audio-wrapper">
                  <IconButton onClick={togglePlay} style={{color:"white", marginRight:"5px"}}>
                    {isPlaying ?
                    <Pause/>
                    :
                    <PlayArrow/>
                    }
                  </IconButton>
                  <input
                    type="range"
                    min={0}
                    max={message?.seconds + (message?.minutes * 60)}
                    value={currentTime}
                    onChange={handleSeek}
                  />
                  <div className="duration-div">{
                    !message?.minutes >=0 && message?.seconds >= 0

                      ? !isPlaying
                        ? `${message.minutes}:${message.seconds < 10 ? `0${message.seconds}` : message.seconds}`
                        :`${currentAudioDurationMinutes}:${currentAudioDurationSeconds < 10 ? 
                          `0${currentAudioDurationSeconds}`
                           : currentAudioDurationSeconds}`
                      : null
                         
                  }</div>
                  <audio controls ref={audioRef} onEnded={() => {
                    setIsPlaying(false)
                    setCurrentAudioDurationMinutes(0)
                    setCurrentAudioDurationSeconds(0)
                  }}>
                    <source src={message.audioUrl} type="audio/mp3"></source>
                    Your browser does not support the audio element.
                  </audio>
                </div>
              }
            <span style={message.type == 0 ? {position:"initial"} : {position:"absolute"}}>{formatDate(message?.createdAt)}</span>
          </div>
          <div className="avatar">
            <Avatar src={store.user?.imageUrl} className="photo" style={{zIndex:'1'}} />
          </div>
        </div>
      ) : (
        <div className="recieved">
          <div className="avatar">
            <Avatar className="photo" src={chat.chatPartnerImageUrl} style={{zIndex:'1'}} />
          </div>
          <div className="message" style={message.type == 0 ? {alignItems:"flex-end"} : {alignItems:"center"}}>
              {message?.text?.length && message.type == 0 ?
                <p>{message?.text}</p>
                :
                <div className="audio-wrapper">
                  <IconButton onClick={togglePlay} style={{color:"black",marginRight:"5px"}}>
                    {isPlaying ?
                    <Pause/>
                    :
                    <PlayArrow/>
                    }
                  </IconButton>
                  <input
                    type="range"
                    min={0}
                    max={message?.seconds + (message?.minutes * 60)}
                    value={currentTime}
                    onChange={handleSeek}
                  />
                  <div className="duration-div">{
                    !message?.minutes >=0 && message?.seconds >= 0

                      ? !isPlaying
                        ? `${message.minutes}:${message.seconds < 10 ? `0${message.seconds}` : message.seconds}`
                        :`${currentAudioDurationMinutes}:${currentAudioDurationSeconds < 10 ? 
                          `0${currentAudioDurationSeconds}`
                           : currentAudioDurationSeconds}`
                      : null
                         
                  }</div>
                  <audio controls ref={audioRef} onEnded={() => setIsPlaying(false)}>
                    <source src={message.audioUrl} type="audio/mp3"></source>
                    Your browser does not support the audio element.
                  </audio>
                </div>
              }
            <span style={message.type == 0 ? {position:"initial"} : {position:"absolute"}}>{formatDate(message?.createdAt)}</span>
          </div>
        </div>
      )}
    </>
  );
};

export default observer(Message);