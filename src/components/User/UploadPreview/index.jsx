import { AddToPhotosOutlined } from '@mui/icons-material';
import React, { useContext, useEffect, useState } from 'react';
import "./index.scss"
import { FollowContext } from '../../../context';
const UploadPreview = () => {

    const {isPreviewOpen, setIsPreviewOpen} = useContext(FollowContext);
    const {previewMedia, setPreviewMedia} = useContext(FollowContext);

    async function selectFiles(e) {
        const files = e.target.files
        let previews = []
        for (let i = 0; i < files.length; i++) {
          const file = files[i];
      
          if (file.type.startsWith('image/') || file.type.startsWith('video/')) {
            previews.push({sourceUrl: URL.createObjectURL(file), text:null})
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Oops',
              text: `You can choose only photo or video!.`,
              confirmButtonText: 'Ок'
            });
            previews = []
            break;
          }
          if (previews.length) setPreviewMedia(previews)
          setIsPreviewOpen(true);
        }
      }


    return (
        <>
            <label htmlFor="file-input" >
                <AddToPhotosOutlined style={{cursor:"pointer"}} />
                <input  type="file" id="file-input" style={{display:"none"}} onChange={selectFiles} multiple/>
            </label>
           
        </>
    );
}

export default UploadPreview;
