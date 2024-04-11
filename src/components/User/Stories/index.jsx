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
  const { store } = useContext(Context);
  const [storiesVisible, setStoriesVisible] = useState(false);
  const [stories, setStories] = useState([]);
  const [story, setStory] = useState([]);
  const [currentUserStory, setCurrentUserStory] = useState({});
  const [storyItems, setStoryItems] = useState([]);
  const [userStoryItems, setUserStoryItems] = useState([]);
  const videoRef = useRef(null);
  useEffect(() => {
    async function fetchAllStoriesDatas() {
      const allStories = await store.getStories();
      setStories(allStories);
    }
    fetchAllStoriesDatas();
  }, []);

  const handleWatchStori = async (storyy) => {
    setStory(storyy);
    let itemsFromDb;
    if (storyy.ownerUserName == store.user.userName) itemsFromDb = await store.getCurrentUserItems(storyy.id);
    else itemsFromDb = await store.getStoryItems(storyy.id);
    setStoryItems(itemsFromDb);
    if (!itemsFromDb[0].isWatched) {
      await store.watchStory(itemsFromDb[0].id)
      if (0 == itemsFromDb.length - 1 && !storyy.isChecked) {

        setStories(prev => prev.map(item => {
          if (item.id == storyy.id) {
            return { ...item, isChecked: true };
          }
          return item;
        }))
      }
    }
   
  };


  useEffect(() => {
    if (storiesVisible) document.body.style.overflow = "hidden";
    else document.body.style.overflow = "auto";
  }, [storiesVisible])

  return (
    <>
      <div className="stories-icons-wrapper">
        <Swiper className="mySwiper" spaceBetween={10}>
          <SwiperSlide style={{cursor:'pointer'}} className="swiper-slide">
            <AddStories />
          </SwiperSlide>

          {stories &&
            stories.map((story) => (
              <SwiperSlide
                key={story.id}
                className="swiper-slide"
                onClick={() => handleWatchStori(story)}
              >
                <div className="story" style={{cursor:"pointer"}}>
                  <div
                    className="avatar-border"
                    style={
                      story.isChecked
                        ? { borderColor: "rgb(203,213,225)" }
                        : { borderColor: "rgb(255,15,103)" }
                    }
                  >
                    <Avatar className="avatar" src={story?.ownerImageUrl} />
                  </div>
                  <p>{store.user.userName == story.ownerUserName && 'You: '}{story.ownerUserName}</p>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <WatchStories
        videoRef={videoRef}
        storiesVisible={storiesVisible}
        setStoriesVisible={setStoriesVisible}
        story={story}
        setStory={setStory}
        stories={stories}
        setStories={setStories}
        storyItems={storyItems}
        setStoryItems={setStoryItems}
        setUserStoryItems={setUserStoryItems}
      />
    </>
  );
};

export default observer(Stories);