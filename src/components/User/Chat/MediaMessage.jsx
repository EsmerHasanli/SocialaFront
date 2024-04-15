import React, { useRef, useState } from 'react';

const MediaMessage = ({message}) => {
    const videoRef = useRef(null);
    const [isPlaying, setIsPlaying] = useState(false)
    
    return (
        <div className={message.text ? "media-wrapper filled" : "media-wrapper"}>
            {message.type == "2" || message.type == "Image" ?
                <img src={message?.sourceUrl}/>
                :
                <video ref={videoRef} controls onClick={(e) => {
                    if (isPlaying) {
                        videoRef.current.pause();
                    }
                    else videoRef.current.play();
                    setIsPlaying(!isPlaying)
                    
                }}>
                    <source src={message.sourceUrl}  type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
            }
            {message?.text && <div>{message.text}</div>}
        </div>
    );
}

export default MediaMessage;
