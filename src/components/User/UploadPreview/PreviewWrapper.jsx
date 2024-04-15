import { Clear, Close, PlayArrow, Telegram } from '@mui/icons-material';
import React, { useContext, useEffect, useRef, useState } from 'react';
import './index.scss'
import { IconButton } from '@mui/material';
import { Input } from 'antd';
import { Swiper, SwiperSlide } from "swiper/react";
import { FollowContext } from '../../../context';
import { Context } from '../../../main';
import Swal from 'sweetalert2';
import { observer } from 'mobx-react-lite';

const PreviewWrapper = ({previews, setPreviews, setIsPreviewOpen}) => {
    const [activeMedia, setActiveMedia] = useState(previews[0])
    const [inpValue, setInpValue] = useState("");
    const {currentChatId} = useContext(FollowContext);
    const [isPlaying, setIsPlaying] = useState(false)
    const  videoRef = useRef(null)
    const {store} = useContext(Context);

    function changeSlide(preview) {
        setPreviews(prev => {
          return prev.map(item => {
            if (item.sourceUrl === activeMedia.sourceUrl) {
                return {
                ...item,
                text:inpValue
                }
            }
            return item;
          })
        })
        setIsPlaying(false)
        setActiveMedia(preview)
        setInpValue(preview.text || "");
    }
    
    async function sendMedia() {
        if (previews.length > 4) {
            Swal.fire({
                icon:"error",
                title:"Oops",
                text:"You cant send more than 4 media :("
            })
        }
        else {
            let arrToMap = previews;
            if (inpValue.length && !activeMedia.text) {
                const item = arrToMap.find(pr => pr.sourceUrl == activeMedia.sourceUrl)
                item.text = inpValue;
            }
            const newArr = arrToMap.map(preview => {
                return {
                    file:preview.file,
                    text:preview.text
                }
            })
            const formData = new FormData();
            formData.append("chatId", currentChatId);
            for (let i = 0; i < newArr.length; i++) {
                // Добавляем файл
                formData.append("mediaFiles", newArr[i].file);
                // Добавляем текст как обычное поле
                formData.append("mediaTexts", newArr[i].text || "");
            }
            const status = await store.sendMediaToChat(formData)
            if (status == 200) {
                setPreviews([])
                setIsPreviewOpen(false);
            }
        }
        
    }
    function deletePreview(preview) {
        if (previews.length > 1) {
            const updatedPreviews = previews.filter(pr => pr.sourceUrl !== preview.sourceUrl);
            const idx = previews.findIndex(item => item.sourceUrl === preview.sourceUrl);
            if (idx === 0) {
              setActiveMedia(prev => previews[idx + 1]);
            } else {
              setActiveMedia(prev => previews[idx - 1]);
            }
          
            setPreviews(updatedPreviews);
          }
        else {
            setPreviews([])
            setIsPreviewOpen(false)
        }
    }
    return (
        <div className='preview-wrapper'>
            <header>
                <IconButton onClick={() => {
                    setPreviews([])
                    setIsPreviewOpen(false)
                }}>
                    <Close/>
                </IconButton>
            </header>
            <main>
                <div className="img-wrap" style={{position:"relative"}}>
                    {activeMedia.file.type.includes("video/") ?
                    <>
                        {!isPlaying && <PlayArrow onClick={() => {
                             if (isPlaying) {
                                videoRef.current.pause();
                            }
                            else videoRef.current.play();
                            setIsPlaying(!isPlaying)
                        }} style={{position:"absolute", cursor:"pointer", top:"44%",left:"44%",width:"50px",height:"50px", zIndex:"999", color:"#fff"}}/>}
                        <video  style={{cursor:"pointer", position:"relative"}} ref={videoRef} className={'main-img'} onClick={(e) => {
                            if (isPlaying) {
                                videoRef.current.pause();
                            }
                            else videoRef.current.play();
                            setIsPlaying(!isPlaying)
                            
                        }}>
                            <source src={activeMedia.sourceUrl} type="video/mp4"></source>
                            Your browser does not support the video tag.
                        </video>
                    </>
                        :
                    <img className='main-img' src={activeMedia.sourceUrl} />
                    }
                </div>
            </main>
            <Input placeholder='Text your message' value={inpValue} onChange={(e) => setInpValue(e.target.value)}/>
            <footer>
                <Swiper   
                    swipeHandler=".swiper"
                    className="swiper mySwiper">
                {previews?.map(preview =>
                    <SwiperSlide  style={{width:'110px'}} className='swiper-slide'>
                        <div className='delete-div' onClick={() => changeSlide(preview)}>
                        </div>
                            <Clear className="delete-icon" onClick={() => {
                                deletePreview(preview)
                                }}/>
                        {preview.file.type.includes("video/") ?
                        <video className={activeMedia.sourceUrl==preview.sourceUrl ? 'footer-img active' : 'footer-img'}>
                            <source src={preview.sourceUrl} type="video/mp4"></source>
                            Your browser does not support the video tag.
                        </video>
                        :
                        <img  src={preview.sourceUrl} 
                            className={activeMedia.sourceUrl==preview.sourceUrl ? 'footer-img active' : 'footer-img'}/>
                        }
                    </SwiperSlide> 
                )}
                </Swiper>
                <IconButton className='send-btn' onClick={sendMedia} style={{cursor:"pointer"}}>
                    <div className='count-div'>{previews.length}</div>
                    <Telegram  className='send-icon'/>
                </IconButton>
            </footer>
        </div>
    );
}

export default observer(PreviewWrapper);
