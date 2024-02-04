import React from 'react'
import { Avatar, IconButton, Divider } from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AddIcon from '@mui/icons-material/Add';

import './index.scss'

const ProfileCard = () => {
  return (
    <div id='profile-card'>
        <div style={{backgroundImage:'url(https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/profile-cover.jpg)'}} className='background-wrapper'>
            <Avatar className='avatar' src="https://demo.foxthemes.net/socialite-v3.0/assets/images/avatars/avatar-6.jpg"/>
            <IconButton className='photo'>
                <PhotoCameraIcon />
            </IconButton>
        </div>
        <h1>Monroe Parker</h1>
        <div className="decr">
            <p>Family , Food , Fashion , Fourever</p>
            <button>Edit</button>
        </div>
        <Divider/>
        <nav>
            <div className="wrapper">
                <ul className='links'>
                    <li>
                        Timeline
                    </li>
                    <li>
                        Friends <span>220</span>
                    </li>
                    <li>
                        Photo
                    </li>
                    <li>
                        Video
                    </li>
                </ul>
                <ul className='feautures'>
                    <li>
                        <span><AddIcon style={{fontSize:'14px',}} /> </span><p>Add Your Story</p>
                    </li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default ProfileCard