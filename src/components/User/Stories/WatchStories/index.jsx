import React, { useEffect } from "react";
import './index.scss'
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css/effect-coverflow";
import "swiper/css/navigation";

// import required modules
import { EffectCoverflow, Navigation } from "swiper/modules";


const WatchStories = ({ storiesVisible, setStoriesVisible }) => {


  return (
    <>
      {storiesVisible && (
        <div id="stories-wrapper">
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
            <SwiperSlide className="swiper-slide" style={{backgroundImage:'url("https://swiperjs.com/demos/images/nature-1.jpg")'}} >
              
            </SwiperSlide>

            <SwiperSlide className="swiper-slide" style={{backgroundImage:'url("https://swiperjs.com/demos/images/nature-2.jpg")'}} >

            </SwiperSlide>

            <SwiperSlide className="swiper-slide" style={{backgroundImage:'url("https://swiperjs.com/demos/images/nature-3.jpg")'}} >

            </SwiperSlide>

            <SwiperSlide className="swiper-slide" style={{backgroundImage:'url("https://swiperjs.com/demos/images/nature-4.jpg")'}} >

            </SwiperSlide>

            <SwiperSlide className="swiper-slide" style={{backgroundImage:'url("https://swiperjs.com/demos/images/nature-5.jpg")'}} >

            </SwiperSlide>

            <SwiperSlide className="swiper-slide" style={{backgroundImage:'url("https://swiperjs.com/demos/images/nature-6.jpg")'}} >

            </SwiperSlide>

            <SwiperSlide className="swiper-slide" style={{backgroundImage:'url("https://swiperjs.com/demos/images/nature-7.jpg")'}} >

            </SwiperSlide>

            <SwiperSlide className="swiper-slide" style={{backgroundImage:'url("https://swiperjs.com/demos/images/nature-8.jpg")'}} >

            </SwiperSlide>

            <SwiperSlide className="swiper-slide" style={{backgroundImage:'url("https://swiperjs.com/demos/images/nature-9.jpg")'}} >

            </SwiperSlide>
          </Swiper>
        </div>
      )}
    </>
  );
};

export default WatchStories;
