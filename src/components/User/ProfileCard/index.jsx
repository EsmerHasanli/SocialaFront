import React, { useContext, useEffect, useState } from 'react'
import { Avatar, IconButton, Divider, Button } from '@mui/material'
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import AddIcon from '@mui/icons-material/Add';
import './index.scss'
import { Context } from "../../../main";
import { observer } from 'mobx-react-lite';
import { FollowContext } from '../../../context';

const ProfileCard = () => {
    const { store } = useContext(Context);
    const {fetchedUser, setFetchedUser} = useContext(FollowContext)
    const {followStatus, setFollowStatus} = useContext(FollowContext)

    async function handleFollowBtn() {
        const isPrivate = await store.checkAccountPrivate(fetchedUser.userName);
        let count;
        if (followStatus == "follow") 
        {
            await store.followUser(fetchedUser.userName);
            if (isPrivate) {
                setFollowBtn("cancel request")
                store.user.followRequestsCount++;
            }
            else {
                count = fetchedUser.followersCount + 1;
                setFollowBtn("unfollow") 
                setFetchedUser(prev => ({...prev,followersCount:count}))
                store.user.followsCount++;
            }
        }
        else 
        {
            await store.unfollowUser(fetchedUser.username);
            if (!isPrivate) {
                count = fetchedUser.followersCount - 1
                setFetchedUser(prev => ({...prev,followersCount:count }))
            }
            setFollowBtn("follow");
        }
      }
  return (
    <div id='profile-card'>
        <div style={{backgroundImage:`url(${fetchedUser?.backgroundImage ? fetchedUser?.backgroundImage : 'https://cdn.vox-cdn.com/thumbor/bxeeQCchXrYIdTYVMXhT2jHylFs=/0x0:3841x2400/800x500/filters:focal(1921x1200:1922x1201)/cdn.vox-cdn.com/uploads/chorus_asset/file/22661983/img32.jpg'})`}} className='background-wrapper'>
            <Avatar className='avatar' src={fetchedUser?.imageUrl}/>
            <IconButton className='photo'>
                <PhotoCameraIcon />
            </IconButton>
        </div>
        <h1>{fetchedUser?.name}{" "}{fetchedUser?.surname}</h1>
        <div className="decr">
            <p>{fetchedUser?.bio}</p>
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
                        Follows <span>{fetchedUser?.followsCount}</span>
                    </li>
                    <li>
                        Followers <span>{fetchedUser?.followersCount}</span>
                    </li>
                    <li>
                        Follow Requests <span>{fetchedUser.followsCount}</span>
                    </li>
                    <li>
                        Follower Requests <span>{fetchedUser.followersCount}</span>
                    </li>
                </ul>
                {
                fetchedUser?.userName == store.user.userName ?
                    <ul className='feautures'>
                        <li>
                            <span><AddIcon style={{fontSize:'14px',}} /> </span><p>Add Your Story</p>
                        </li>
                    </ul>
                    :
                    <ul className='feautures'>
                        <li style={{padding:'10px 15px'}}>
                            <p>Follow</p>
                        </li>
                </ul>
                }
            </div>
        </nav>
    </div>
  )
}

export default observer(ProfileCard)