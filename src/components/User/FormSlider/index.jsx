import React from "react";

import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";

import { Pagination, Autoplay } from "swiper/modules";

// Swiper.use([Pagination, Autoplay]);

const FormSlider = () => {
  return (
    <div className="sliderWrapper">
      <Swiper pagination={true} modules={[Pagination, Autoplay]} className="mySwiper">
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
    </div>
  );
};

export default FormSlider;
