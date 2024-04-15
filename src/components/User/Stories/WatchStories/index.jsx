import React, { useContext, useEffect, useRef, useState } from "react";
import "./index.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { EffectCoverflow, Navigation } from "swiper/modules";
import { Avatar, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Context } from "../../../../main";
import { observer } from "mobx-react-lite";
import WatchModal from "./WatchModal";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import WatchItem from "./WatchItem";
import StoryItem from "./StoryItem";

const WatchStories = ({videoRef, storiesVisible, setStoriesVisible, setUserStoryItems, story, setStory, stories, setStories, storyItems,setStoryItems, watchedStories, setWatchedStories }) => {
  const {store} = useContext(Context)
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedStoryId, setSelectedStoryId] = useState(null);
  const [watchers, setWatchers] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    if (storyItems.length) {
      setStoriesVisible(true)
    }
  }, [storyItems])
  async function handleSlideChange(swiper) {
      const slideIndex = swiper.realIndex
      if (storyItems[slideIndex]?.type == "Video") {
        videoRef.current.play();
      }
      else if (videoRef?.current) {
        videoRef.current.pause();
      }
      if (!storyItems[slideIndex].isWatched) {
        await store.watchStory(storyItems[slideIndex].id)
        if (slideIndex == storyItems.length - 1 && !story.isChecked) {

          setStories(prev => prev.map(item => {
            if (item.id == story.id) {
              return { ...item, isChecked: true };
            }
            return item;
          }))
        }
      }
    }
  
    async function handleDeleteStory() {
      
        const res = await store.deleteStory(selectedStoryId);
      
        if (res.status == 204) {
          const filteredItems = storyItems.filter(s => s.id != selectedStoryId);
          
          setMenuOpen(false);
          setSelectedStoryId(null)
          if (!filteredItems.length) {
            setStoriesVisible(false)
            const updatedStories = stories.filter(item => item.id !== story.id);
            setStories(updatedStories)
            
          }
          setStoryItems(filteredItems)
          setUserStoryItems(filteredItems)
        }
    }

    async function getWatchers(id) {
      const res = await store.getWatchers(id);
      setWatchers(res)
      showModal()
    }

  return (
    <>
      {storiesVisible && (
        <div id="stories-wrapper">
          <IconButton
            onClick={() => {
              setStoryItems([])
              setStoriesVisible(false)
              handleCancel();
            }}
            style={{
              float: "right",
              width: "30px",
              height: "30px",
              backgroundColor: "antiquewhite",
            }}
          >
            <CloseIcon style={{ color: "rgba(0,0,0,0.7)" }}/>
          </IconButton>
          <Swiper
            effect={"coverflow"}
            onSlideChange={handleSlideChange}
            grabCursor={true}
            initialSlide={storyItems.findIndex(si => !si.isWatched) == -1 ? storyItems.length - 1 : storyItems.findIndex(si => !si.isWatched)}
            centeredSlides={true}
            slidesPerView={"auto"}
            coverflowEffect={{
              rotate: 50,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: true,
            }}
            navigation={true}
            modules={[EffectCoverflow, Navigation]}
            className="stori-swiper"
          >
            {
              storyItems && storyItems.map(storyItem => 
               <SwiperSlide
                style={storyItem.type == "Image" ?
                {backgroundImage:`url(${storyItem.sourceUrl})`}
                : {backgroundColor: 'black'}
                }>
                  <StoryItem 
                  storyItem={storyItem}
                  storyItems={storyItems}
                  setStories={setStories}
                  story={story}
                  setStoriesVisible={setStoriesVisible}
                  setStoryItems={setStoryItems}
                  setUserStoryItems={setUserStoryItems}
                  videoRef={videoRef} />
               </SwiperSlide>
                  
              )
            }
          </Swiper>
        </div>
      )}
    </>
  );
};

export default observer(WatchStories);