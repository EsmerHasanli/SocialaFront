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
 
  useEffect(() => {
    async function fetchAllStoriesDatas() {
      const allStories = await store.getStories();
      setStories(allStories);
    }
    async function getMyHistoryItems() {
      const items = await store.getCurrentUserItems();
      console.log(items);
      if (items?.length) {
          setUserStoryItems(items);
          const myStory = {
            id: store.user.storyId,
            ownerUserName: store.user.userName,
            ownerImageUrl: store.user.imageUrl,
            lastStoryPostedAt: store.user.lastStoryPostedAt,
            lastStoryItemId:items[items.length-1].id
          };
          setCurrentUserStory(myStory);
      }
    }
    fetchAllStoriesDatas();
    getMyHistoryItems();
  }, []);

  const handleWatchStori = async (storyy) => {
    setStoriesVisible(true);
    setStory(storyy);
    const res = await store.getStoryItems(storyy.id);
    setStoryItems(res);
    if (!store.user.watchedStoryItemsIds.find(id => id ==  res[0].id)) {
      let storyCurrentSlides = JSON.parse(localStorage.getItem("storyPag"))
      if (!storyCurrentSlides) {
        storyCurrentSlides = []
      }
      const currentItem = storyCurrentSlides.find(obj => obj.id == storyy.id);
      console.log(currentItem)
      if (currentItem) {
        storyCurrentSlides = storyCurrentSlides.filter(obj => obj.id != storyy.id);
      }
      storyCurrentSlides.push({id:storyy.id, index:0})
      localStorage.setItem("storyPag", JSON.stringify(storyCurrentSlides))
      await store.watchStory(res[0].id)
      const oldUser = store.user;
      oldUser.watchedStoryItemsIds.push(res[0].id)
      store.setUser(oldUser);
    }
   
  };
  async function showMyHistoryItems() {
    setStoriesVisible(true);
    const oldUser = store.user;
    if (!oldUser.watchedStoryItemsIds.find(id => id == userStoryItems[0].id)) {
      let storyCurrentSlides = JSON.parse(localStorage.getItem("storyPag"))
      if (!storyCurrentSlides) {
        storyCurrentSlides = []
      }
      const currentItem = storyCurrentSlides.find(obj => obj.id == currentUserStory.id);
      console.log(currentItem)
      if (currentItem) {
        storyCurrentSlides = storyCurrentSlides.filter(obj => obj.id != currentUserStory.id);
      }
      storyCurrentSlides.push({id:currentUserStory.id, index:0})
      localStorage.setItem("storyPag", JSON.stringify(storyCurrentSlides))
      await store.watchStory(userStoryItems[0].id)
      oldUser.watchedStoryItemsIds.push(userStoryItems[0].id)
      store.setUser(oldUser);
    }
    setStory(currentUserStory)
    setStoryItems(userStoryItems);
  }

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
          {userStoryItems.length>0 && (
            <SwiperSlide  style={{cursor:'pointer'}} className="swiper-slide" onClick={showMyHistoryItems}>
              <div className="story">
                <div
                  className="avatar-border"
                  style={
                    store.user?.watchedStoryItemsIds?.find(id => id == currentUserStory.lastStoryItemId)
                      ? { borderColor: "rgb(203,213,225)" }
                      : { borderColor: "rgb(255,15,103)" }
                  }
                >
                  <Avatar className="avatar" src={store.user.imageUrl} />
                </div>
                <p>You: {store.user.userName}</p>
              </div>
            </SwiperSlide>
          )}

          {stories &&
            stories.map((story) => (
              <SwiperSlide
                key={story.id}
                className="swiper-slide"
                onClick={() => handleWatchStori(story)}
              >
                <div className="story">
                  <div
                    className="avatar-border"
                    style={
                      store.user.watchedStoryItemsIds.find(id => id == story.lastStoryItemId)
                        ? { borderColor: "rgb(203,213,225)" }
                        : { borderColor: "rgb(255,15,103)" }
                    }
                  >
                    <Avatar className="avatar" src={story?.ownerImageUrl} />
                  </div>
                  <p>{story.ownerUserName}</p>
                </div>
              </SwiperSlide>
            ))}
        </Swiper>
      </div>

      <WatchStories
        storiesVisible={storiesVisible}
        setStoriesVisible={setStoriesVisible}
        story={story}
        storyItems={storyItems}
        setStoryItems={setStoryItems}
        setUserStoryItems={setUserStoryItems}
      />
    </>
  );
};

export default observer(Stories);