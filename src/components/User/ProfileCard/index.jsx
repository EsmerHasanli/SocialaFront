import React, { useContext, useEffect, useState } from 'react'
import { Avatar, IconButton, Divider } from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AddIcon from '@mui/icons-material/Add';

import './index.scss'
import { Context } from "../../../main";
import { observer } from 'mobx-react-lite';

const ProfileCard = ({fetchedUser}) => {
    const { store } = useContext(Context);
console.log('fetchedUSer', fetchedUser);
console.log('username', store.user.userName);
  return (
    <div id='profile-card'>
        <div style={{backgroundImage:`url(${fetchedUser?.backgroundImage ? fetchedUser?.backgroundImage : 'https://cdn.vox-cdn.com/thumbor/bxeeQCchXrYIdTYVMXhT2jHylFs=/0x0:3841x2400/800x500/filters:focal(1921x1200:1922x1201)/cdn.vox-cdn.com/uploads/chorus_asset/file/22661983/img32.jpg'})`}} className='background-wrapper'>
            <Avatar className='avatar' src={fetchedUser?.imageUrl ? fetchedUser?.imageUrl : null}/>
            <IconButton className='photo'>
                <PhotoCameraIcon />
            </IconButton>
        </div>
        <h1>{fetchedUser?.name}{" "}{fetchedUser?.surname}</h1>
        <div className="decr">
            <p>Family , Food , Fashion , Fourever</p>
            {
                fetchedUser?.userName == store.user.userName &&
                <button>Edit</button>
            }
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
                {
                fetchedUser?.userName == store.user.userName &&
                    <ul className='feautures'>
                        <li>
                            <span><AddIcon style={{fontSize:'14px',}} /> </span><p>Add Your Story</p>
                        </li>
                    </ul>
                }
            </div>
        </nav>
    </div>
  )
}

export default observer(ProfileCard)