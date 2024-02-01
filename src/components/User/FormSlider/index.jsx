import React from 'react'

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination } from "swiper/modules";

const FormSlider = () => {
  return (
    <Swiper
    autoplay={{ delay: 50000, disableOnInteraction: false }} 
    pagination={true}
    modules={[Pagination]}
    className="mySwiper"
  >
    <SwiperSlide>
      <img
        src="https://demo.foxthemes.net/socialite-v3.0/assets/images/post/img-3.jpg"
        alt="register-form-image-1"
        className="image-slide"
      />
    </SwiperSlide>
    <SwiperSlide>
      <img
        src="https://demo.foxthemes.net/socialite-v3.0/assets/images/post/img-2.jpg"
        alt="register-form-image-2"
        className="image-slide"
      />
    </SwiperSlide>
  </Swiper>
  )
}

export default FormSlider