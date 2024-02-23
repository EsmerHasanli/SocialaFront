import React, { useContext, useState } from "react";
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

const WatchStories = ({ storiesVisible, setStoriesVisible, setUserStoryItems, story, storyItems,setStoryItems, watchedStories, setWatchedStories }) => {
  const {store} = useContext(Context)
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedStoryId, setSelectedStoryId] = useState(null);

  async function handleSlideChange(swiper) {
    console.log(swiper)
    const slideIndex = swiper.realIndex
    const storyItemId = storyItems[slideIndex].id
    if (!store.user.watchedStoryItemsIds.find(id => id == storyItemId)) {
      const storyCurrentSlides = JSON.parse(localStorage.getItem("storyPag"))
      const currentItem = storyCurrentSlides.find(obj => obj.id == story.id);
      console.log(currentItem)
      
      if (currentItem?.index < slideIndex) {
        currentItem.index++;
        console.log("index uvelichen")
        localStorage.setItem("storyPag", JSON.stringify(storyCurrentSlides))
      }
      const oldUser = store.user;
      await store.watchStory(storyItemId)
      oldUser.watchedStoryItemsIds.push(storyItemId)
      store.setUser(oldUser);
      console.log(oldUser)

  }
    }
  
    async function handleDeleteStory() {
      
        const res = await store.deleteStory(selectedStoryId);
        if (res.status == 204) {
          const filteredItems = storyItems.filter(s => s.id != selectedStoryId);
        
          setMenuOpen(false);
          setSelectedStoryId(null)
          if (!filteredItems.length) setStoriesVisible(false)
          setStoryItems(filteredItems)
          setUserStoryItems(filteredItems)
        }
    }

  return (
    <>
      {storiesVisible && (
        <div id="stories-wrapper">
          <IconButton
            onClick={() => {
              setStoryItems([])
              setStoriesVisible(false)

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
            initialSlide={((JSON.parse(localStorage.getItem("storyPag")))?.find(obj => obj.id == story.id))?.index}
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
              storyItems && storyItems.map(storyItem => (
                storyItem.type == 'Image' ?
                <SwiperSlide
                  key={storyItem.key}
                  className="swiper-slide"
                  style={{
                    backgroundImage:
                      `url(${storyItem.sourceUrl})`,
                  }}
                >
                  <div className="header">
                    <div>
                      <Avatar className="avatar" src={story?.ownerImageUrl} />
                      <p>{story?.ownerUserName}</p>
                    </div>
                    {story.ownerUserName == store.user.userName &&
                    <div className="menu">
                      <IconButton className="menu-button" onClick={() => {
                        setMenuOpen(!menuOpen)
                        setSelectedStoryId(storyItem.id)
                      }}>
                        <MoreHorizIcon style={{ color: "antiquewhite" }} />
                      </IconButton>
                      {
                        menuOpen && selectedStoryId == storyItem.id && 
                        <ul>
                          <li onClick={handleDeleteStory}>Delete</li>
                        </ul>
                      }
                    </div>
                    }

                  </div>

                  <div className="footer">
                    <p>{storyItem?.text}</p>
                    {
                      story.ownerUserName == store.user.userName && 
                        <WatchModal storyItem={storyItem}/>
                    }
                  </div>
                </SwiperSlide> :
                  <SwiperSlide
                  key={storyItem.key}
                  className="swiper-slide"
                >
                  <div className="header">
                    <div>
                      <Avatar className="avatar" src={story?.ownerImageUrl} />
                      <p>{story?.ownerUserName}</p>
                    </div>
                    {story.ownerUserName == store.user.userName &&
                    <>
                    <div className="menu">
                      <IconButton className="menu-button" onClick={() => {
                        setMenuOpen(!menuOpen)
                        setSelectedStoryId(storyItem.id)
                      }}>
                        <MoreHorizIcon style={{ color: "antiquewhite" }} />
                      </IconButton>
                      {
                        menuOpen && storyItem.id == selectedStoryId &&
                        <ul>
                          <li onClick={handleDeleteStory}>Delete</li>
                        </ul>
                      }
                    </div>
                    </>
                    }
                  </div>
                  <video controls>
                    <source src={storyItem.sourceUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                  <div className="footer">
                    <p>{storyItem?.text}</p>
                    {
                      story.ownerUserName == store.user.userName && 
                      <WatchModal storyItem={storyItem}/>
                    }
                  </div>
                </SwiperSlide> 
              ))
            }
          </Swiper>
        </div>
      )}
    </>
  );
};

export default observer(WatchStories);