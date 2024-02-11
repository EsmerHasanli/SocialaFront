import React, { useContext, useEffect, useRef, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "./index.scss";

import "swiper/css";
import "swiper/css/navigation";
import { Avatar } from "@mui/material";

import AddStories from "./AddStoriForm";
import WatchStories from "./WatchStories";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";

const Stories = () => {
    const {store} = useContext(Context)
  const [storiesVisible, setStoriesVisible] = useState(false)
  const [stories, setStories] = useState([])
  const [story, setStory] = useState()
  const [storyItems, setStoryItems] = useState()


  useEffect(()=>{
    async function fetchAllStoriesDatas(){
        const allStories = await store.getStories()
        setStories(allStories)
        console.log('allStories', allStories);
    }
    fetchAllStoriesDatas()
  },[])

  const handleWatchStori = async (obj) => {
    setStoriesVisible(true)
    setStory(obj)
    const res = await store.getStoryItems(obj.id)
    setStoryItems(res);
  }

  return (
    <>
        <div className="stories-icons-wrapper">
        <Swiper className="mySwiper" spaceBetween={10}>
        <SwiperSlide className="swiper-slide">
            <AddStories/>
        </SwiperSlide>
        {
            stories && stories.map(story => (
                <SwiperSlide key={story.id} className="swiper-slide" onClick={()=>handleWatchStori(story)}>
                <div className="story">
                    <div className="avatar-border" style={{borderColor: 'rgb(255,15,103)'}}>
                        <Avatar className="avatar" src={story?.ownerImageUrl} />
                    </div>
                    <p>{story.ownerUserName}</p>
                </div>
                </SwiperSlide>
            ))
        }

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
        
        <WatchStories storiesVisible={storiesVisible} setStoriesVisible={setStoriesVisible} story={story} storyItems={storyItems} />
    </>
  );
};

export default observer(Stories);
