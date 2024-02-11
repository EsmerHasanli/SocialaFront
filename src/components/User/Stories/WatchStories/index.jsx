import React, { useContext, useEffect } from "react";
import "./index.scss";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

// import required modules
import { EffectCoverflow, Navigation } from "swiper/modules";
import { Avatar, IconButton } from "@mui/material";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import CloseIcon from "@mui/icons-material/Close";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { Context } from "../../../../main";
import { observer } from "mobx-react-lite";

const WatchStories = ({ storiesVisible, setStoriesVisible, story, storyItems }) => {
  console.log('story', story);
  const {store} = useContext(Context)
  return (
    <>
      {storiesVisible && (
        <div id="stories-wrapper">
          <IconButton
            onClick={() => setStoriesVisible(false)}
            style={{
              float: "right",
              width: "30px",
              height: "30px",
              backgroundColor: "antiquewhite",
            }}
          >
            <CloseIcon style={{ color: "rgba(0,0,0,0.7)" }} />
          </IconButton>
          <Swiper
            effect={"coverflow"}
            grabCursor={true}
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
                    {
                      story.ownerUserName == store.user.userName &&
                      <IconButton>
                        <MoreHorizIcon style={{ color: "antiquewhite" }} />
                      </IconButton>
                    }
                  </div>

                  <div className="footer">
                    <p>{storyItem?.text}</p>
                    {
                      story.ownerUserName == store.user.userName && 
                        <button className="watch-wrapper">
                          <RemoveRedEyeIcon />
                          <span>222</span>
                        </button>
                    }
                  </div>
                </SwiperSlide> :
                  <SwiperSlide
                  className="swiper-slide"
                >
                  <div className="header">
                    <div>
                      <Avatar className="avatar" src={story?.ownerImageUrl} />
                      <p>{story?.ownerUserName}</p>
                    </div>
                    {
                      story.ownerUserName == store.user.userName &&
                      <IconButton>
                        <MoreHorizIcon style={{ color: "antiquewhite" }} />
                      </IconButton>
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
                        <button className="watch-wrapper">
                          <RemoveRedEyeIcon />
                          <span>222</span>
                        </button>
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
