import React, { useEffect } from "react";
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

const WatchStories = ({ storiesVisible, setStoriesVisible }) => {
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
              backgroundColor: "white",
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
            <SwiperSlide
              className="swiper-slide"
              style={{
                backgroundImage:
                  'url("https://swiperjs.com/demos/images/nature-1.jpg")',
              }}
            >
              <div className="header">
                <div>
                  <Avatar className="avatar" />
                  <p>username</p>
                </div>

                <IconButton>
                  <MoreHorizIcon style={{ color: "antiquewhite" }} />
                </IconButton>
              </div>

              <div className="footer">
                <p>Lorem ipsum dolor sit.</p>

                <button className="watch-wrapper">
                  <RemoveRedEyeIcon />
                  <span>222</span>
                </button>
              </div>
            </SwiperSlide>

            <SwiperSlide
              className="swiper-slide"
              style={{
                backgroundImage:
                  'url("https://swiperjs.com/demos/images/nature-2.jpg")',
              }}
            >
              <div className="header">
                <div>
                  <Avatar className="avatar" />
                  <p>username</p>
                </div>
              </div>

              <div className="footer">
                <p>Lorem ipsum dolor sit.</p>
              </div>
            </SwiperSlide>

            <SwiperSlide
              className="swiper-slide"
              style={{
                backgroundImage:
                  'url("https://swiperjs.com/demos/images/nature-3.jpg")',
              }}
            >
              <div className="header">
                <div>
                  <Avatar className="avatar" />
                  <p>username</p>
                </div>
              </div>

              <div className="footer">
                <p>Lorem ipsum dolor sit.</p>
              </div>
            </SwiperSlide>

            <SwiperSlide
              className="swiper-slide"
              style={{
                backgroundImage:
                  'url("https://swiperjs.com/demos/images/nature-4.jpg")',
              }}
            >
              <div className="header">
                <div>
                  <Avatar className="avatar" />
                  <p>username</p>
                </div>
              </div>

              <div className="footer">
                <p>Lorem ipsum dolor sit.</p>
              </div>
            </SwiperSlide>

            <SwiperSlide
              className="swiper-slide"
              style={{
                backgroundImage:
                  'url("https://swiperjs.com/demos/images/nature-5.jpg")',
              }}
            >
              <div className="header">
                <div>
                  <Avatar className="avatar" />
                  <p>username</p>
                </div>
              </div>

              <div className="footer">
                <p>Lorem ipsum dolor sit.</p>
              </div>
            </SwiperSlide>

            <SwiperSlide
              className="swiper-slide"
              style={{
                backgroundImage:
                  'url("https://swiperjs.com/demos/images/nature-6.jpg")',
              }}
            >
              <div className="header">
                <div>
                  <Avatar className="avatar" />
                  <p>username</p>
                </div>
              </div>

              <div className="footer">
                <p>Lorem ipsum dolor sit.</p>
              </div>
            </SwiperSlide>

            <SwiperSlide
              className="swiper-slide"
              style={{
                backgroundImage:
                  'url("https://swiperjs.com/demos/images/nature-7.jpg")',
              }}
            >
              <div className="header">
                <div>
                  <Avatar className="avatar" />
                  <p>username</p>
                </div>
              </div>

              <div className="footer">
                <p>Lorem ipsum dolor sit.</p>
              </div>
            </SwiperSlide>

            <SwiperSlide
              className="swiper-slide"
              style={{
                backgroundImage:
                  'url("https://swiperjs.com/demos/images/nature-8.jpg")',
              }}
            >
              <div className="header">
                <div>
                  <Avatar className="avatar" />
                  <p>username</p>
                </div>
              </div>

              <div className="footer">
                <p>Lorem ipsum dolor sit.</p>
              </div>
            </SwiperSlide>

            <SwiperSlide
              className="swiper-slide"
              style={{
                backgroundImage:
                  'url("https://swiperjs.com/demos/images/nature-9.jpg")',
              }}
            >
            </SwiperSlide>
          </Swiper>
        </div>
      )}
    </>
  );
};

export default WatchStories;
