import { Close } from '@mui/icons-material';
import React, { useState } from 'react';

const PreviewWrapper = ({previews, setPreviews}) => {
    const [activeMedia, setActiveMedia] = useState(previews[0])
    return (
        <div className='preview-wrapper'>
            <header>
                <Close/>
            </header>
            <main>
                <img className='main-img' src={activeMedia.sourceUrl} />
            </main>
            <footer>
                <div className='img-pag-wrapper'>
                    {previews.map(preview =>
                        <img onClick={() => setActiveMedia(preview)} src={preview.sourceUrl} className='footer-img'/>
                    )}
                </div>
            </footer>
        </div>
    );
}

export default PreviewWrapper;
