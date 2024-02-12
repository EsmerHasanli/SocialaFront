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
  const [storyItems, setStoryItems] = useState([]);
  const [userStoryItems, setUserStoryItems] = useState([]);
  const [watchedStories, setWatchedStories] = useState(
    JSON.parse(localStorage.getItem("watchedStories")) || []
  );
  useEffect(() => {
    async function fetchAllStoriesDatas() {
      const allStories = await store.getStories();
      setStories(allStories);
    }
    async function getMyHistoryItems() {
      const items = await store.getCurrentUserItems();
      console.log(items);
      setUserStoryItems(items);
    }
    fetchAllStoriesDatas();
    getMyHistoryItems();
  }, []);

  const handleWatchStori = async (storyy) => {
    setStoriesVisible(true);
    setStory(storyy);
    const res = await store.getStoryItems(storyy.id);
    setStoryItems(res);
    const itemFromLocal = watchedStories.find(
      (watchedStory) => watchedStory.id == storyy.id
    );
    if (!itemFromLocal) {
      const newArr = watchedStories;
      const newObj = {
        id: storyy.id,
        lastWatchedStoryCreateTime: res[0].createdAt,
        lastWatchedStoryIndex: 0,
      };
      setWatchedStories([...watchedStories, { ...newObj }]);
      newArr.push(newObj);
      localStorage.setItem("watchedStories", JSON.stringify(newArr));
    }
  };
  function showMyHistoryItems() {
    setStoriesVisible(true);
    const myStory = {
      id: store.user.storyId,
      ownerUserName: store.user.userName,
      ownerImageUrl: store.user.imageUrl,
      lastStoryPostedAt: store.user.lastStoryPostedAt,
    };
    setStory(myStory);
    setStoryItems(userStoryItems);
    const itemFromLocal = watchedStories.find(
      (watchedStory) => watchedStory.id == myStory.id
    );
    if (!itemFromLocal) {
      const newArr = watchedStories;
      const newObj = {
        id: store.user.storyId,
        lastWatchedStoryCreateTime: userStoryItems[0].createdAt,
        lastWatchedStoryIndex: 0,
      };
      setWatchedStories([...watchedStories, { ...newObj }]);
      newArr.push(newObj);
      localStorage.setItem("watchedStories", JSON.stringify(newArr));
    }
  }

  return (
    <>
      <div className="stories-icons-wrapper">
        <Swiper className="mySwiper" spaceBetween={10}>
          <SwiperSlide className="swiper-slide">
            <AddStories />
          </SwiperSlide>
          {userStoryItems && (
            <SwiperSlide className="swiper-slide" onClick={showMyHistoryItems}>
              <div className="story">
                <div
                  className="avatar-border"
                  style={
                    watchedStories.find(
                      (watchedStory) =>
                        watchedStory.id == store.user.storyId &&
                        watchedStory.lastWatchedStoryCreateTime ==
                          userStoryItems[userStoryItems.length - 1]?.createdAt
                    )
                      ? null
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
                      watchedStories.find(
                        (watchedStory) =>
                          watchedStory.id == story.id &&
                          watchedStory.lastWatchedStoryCreateTime ==
                            story.lastStoryPostedAt
                      )
                        ? null
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
        watchedStories={watchedStories}
        setWatchedStories={setWatchedStories}
      />
    </>
  );
};

export default observer(Stories);
