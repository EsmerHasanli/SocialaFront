import { Close } from '@mui/icons-material';
import React, { useState } from 'react';
import './index.scss'
import { IconButton } from '@mui/material';
import { Input } from 'antd';

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from 'swiper/modules';

const PreviewWrapper = ({previews, setPreviews}) => {
    const [activeMedia, setActiveMedia] = useState(previews[0])
    return (
        <div className='preview-wrapper'>
            <header>
                <IconButton>
                    <Close/>
                </IconButton>
            </header>
            <main>
                <div className="img-wrap">
                    <img className='main-img' src={activeMedia.sourceUrl} />
                </div>
            </main>
            <Input/>
            <footer>
                <Swiper navigation={true} modules={[Navigation]} className="swiper mySwiper">
                    {previews.map(preview =>
                        <SwiperSlide style={{width:'110px'}} className='swiper-slide'>
                            <img onClick={() => setActiveMedia(preview)} src={preview.sourceUrl} className='footer-img'/>
                        </SwiperSlide>     
                    )}
                </Swiper>
            </footer>
        </div>
    );
}

export default PreviewWrapper;
