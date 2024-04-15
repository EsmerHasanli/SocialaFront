import React, { useContext, useEffect, useRef, useState } from "react";
import "./index.scss";

import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

import { Avatar, IconButton } from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { observer } from "mobx-react-lite";
import WatchModal from "./WatchModal";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import { Link } from "react-router-dom";
import { Context } from "../../../../main";

const StoryItem = ({videoRef, storyItem, story, storyItems, setStoryItems, setStories, setUserStoryItems, setStoriesVisible}) => {
    
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [watchers, setWatchers] = useState([])
    const [selectedStoryId, setSelectedStoryId] = useState(null);
    const [menuOpen, setMenuOpen] = useState(false);
    const {store} = useContext(Context)


    async function getWatchers(id) {
        showModal()
        const res = await store.getWatchers(id);
        setWatchers(res)
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
    const showModal = () => {
        setIsModalOpen(true);
      };
    const handleOk = () => {
      setIsModalOpen(false);
    };
    const handleCancel = () => {
      setIsModalOpen(false);
    };
    return (
        
        <>
          <div className="header">
            <Link to={`/users/${story?.ownerUserName}`}>
              <Avatar className="avatar" src={story?.ownerImageUrl} />
              <p>{story?.ownerUserName}</p>
            </Link>
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
          {storyItem.type == "Video" && <video
            ref={videoRef}
            controls={false}
            loop
            controlslist="nodownload"
            autoPlay={storyItems[0]?.type == "Video" ? true : false}
            style={{width:'100%', height:'100%',}}
            onClick={(e) => e.stopPropagation()}
          >
            <source src={storyItem.sourceUrl} aut type="video/mp4" />
            Your browser does not support the video tag.
          </video>}
          

          <div className="footer">
            <p>{storyItem?.text}</p>
            {
              story.ownerUserName == store.user.userName && 
                <button className="watch-wrapper" onClick={(e) => getWatchers(storyItem.id)}>
                  <RemoveRedEyeIcon />
                  <span>{storyItem?.watchCount}</span>
                </button>
            }
          </div>
          <WatchModal isModalOpen={isModalOpen} handleCancel={handleCancel} handleOk={handleOk} watchers={watchers} />
        </>       

     
        
            
    );
}

export default StoryItem;
