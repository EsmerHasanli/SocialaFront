import { Pause, PlayArrow } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import React, { useEffect, useState } from 'react';

const AudioMessage = ({message}) => {
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
          
    const handleSeek = (event) => {
        const audio = audioRef.current;
        audio.currentTime = event.target.value;
        setCurrentTime(event.target.value);
    };
    return (
        <div className="audio-wrapper">
                  <IconButton onClick={togglePlay} style={{color:"white", marginRight:"5px"}}>
                    {isPlaying ?
                    <Pause  className='play-pause-btn'/>
                    :
                    <PlayArrow className='play-pause-btn'/>
                    }
                  </IconButton>
                  <input
                    type="range"
                    min={0}
                    max={message?.audioSeconds + (message?.audioMinutes * 60)}
                    value={currentTime}
                    onChange={handleSeek}
                  />
                  <div className="duration-div">{
                    !message?.audioMinutes >=0 && message?.audioSeconds >= 0

                      ? !isPlaying
                        ? `${message.audioMinutes}:${message.audioSeconds < 10 ? `0${message.audioSeconds}` : message.audioSeconds}`
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
    );
}

export default AudioMessage;
