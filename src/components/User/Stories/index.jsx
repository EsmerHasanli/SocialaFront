import React, { useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "./index.scss";

import "swiper/css";
import "swiper/css/navigation";
import { Avatar } from "@mui/material";

import AddStories from "./AddStoriForm";
import WatchStories from "./WatchStories";

const Stories = () => {
    const [storiesVisible, setStoriesVisible] = useState(false)
  return (
    <>
        <div className="stories-icons-wrapper">
        <Swiper className="mySwiper" spaceBetween={10}>
        <SwiperSlide className="swiper-slide">
            <AddStories/>
        </SwiperSlide>

            <SwiperSlide className="swiper-slide" onClick={()=>setStoriesVisible(true)}>
            <div className="story">
                <div className="avatar-border" style={{borderColor: 'rgb(255,15,103)'}}>
                    <Avatar className="avatar" src='https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-2.jpg' />
                </div>
                <p>username</p>
            </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide" onClick={()=>setStoriesVisible(true)}>
            <div className="story">
                <div className="avatar-border" style={{borderColor: 'rgb(255,15,103)'}}>
                    <Avatar className="avatar" src='https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-2.jpg' />
                </div>
                <p>username</p>
            </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide" onClick={()=>setStoriesVisible(true)}>
            <div className="story">
                <div className="avatar-border" style={{borderColor: 'rgb(255,15,103)'}}>
                    <Avatar className="avatar" src='https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-2.jpg' />
                </div>
                <p>username</p>
            </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide" onClick={()=>setStoriesVisible(true)}>
            <div className="story">
                <div className="avatar-border" style={{borderColor: 'rgb(255,15,103)'}}>
                    <Avatar className="avatar" src='https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-2.jpg' />
                </div>
                <p>username</p>
            </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide" onClick={()=>setStoriesVisible(true)}>
            <div className="story">
                <div className="avatar-border" style={{borderColor: 'rgb(255,15,103)'}}>
                    <Avatar className="avatar" src='https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-2.jpg' />
                </div>
                <p>username</p>
            </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide" onClick={()=>setStoriesVisible(true)}>
            <div className="story">
                <div className="avatar-border" style={{borderColor: 'rgb(255,15,103)'}}>
                    <Avatar className="avatar" src='https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-2.jpg' />
                </div>
                <p>username</p>
            </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide" onClick={()=>setStoriesVisible(true)}>
            <div className="story">
                <div className="avatar-border" style={{borderColor:'rgb(227,227,227)'}}>
                    <Avatar className="avatar" src='https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-2.jpg' />
                </div>
                <p>username</p>
            </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide" onClick={()=>setStoriesVisible(true)}>
            <div className="story">
                <div className="avatar-border" style={{borderColor:'rgb(227,227,227)'}}>
                    <Avatar className="avatar" src='https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-2.jpg' />
                </div>
                <p>username</p>
            </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide" onClick={()=>setStoriesVisible(true)}>
            <div className="story">
                <div className="avatar-border" style={{borderColor:'rgb(227,227,227)'}}>
                    <Avatar className="avatar" src='https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-2.jpg' />
                </div>
                <p>username</p>
            </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide" onClick={()=>setStoriesVisible(true)}>
            <div className="story">
                <div className="avatar-border" style={{borderColor:'rgb(227,227,227)'}}>
                    <Avatar className="avatar" src='https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-2.jpg' />
                </div>
                <p>username</p>
            </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide" onClick={()=>setStoriesVisible(true)}>
            <div className="story">
                <div className="avatar-border" style={{borderColor:'rgb(227,227,227)'}}>
                    <Avatar className="avatar" src='https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-2.jpg' />
                </div>
                <p>username</p>
            </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide" onClick={()=>setStoriesVisible(true)}>
            <div className="story">
                <div className="avatar-border" style={{borderColor:'rgb(227,227,227)'}}>
                    <Avatar className="avatar" src='https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-2.jpg' />
                </div>
                <p>username</p>
            </div>
            </SwiperSlide>
            <SwiperSlide className="swiper-slide" onClick={()=>setStoriesVisible(true)}>
            <div className="story">
                <div className="avatar-border" style={{borderColor:'rgb(227,227,227)'}}>
                    <Avatar className="avatar" src='https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-2.jpg' />
                </div>
                <p>username</p>
            </div>
            </SwiperSlide>
        </Swiper>
        </div>
        
        <WatchStories storiesVisible={storiesVisible} setStoriesVisible={setStoriesVisible}/>
    </>
  );
};

export default Stories;
