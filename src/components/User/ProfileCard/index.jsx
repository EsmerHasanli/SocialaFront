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
    const {currentUserFollows, setCurrentUserFollows} = useContext(FollowContext);

    async function handleFollow() {
        let count;
        const followItem = currentUserFollows.find(fi => fi.userName == fetchedUser.userName)
        if (!followItem) 
        {
            const newFollowItem = await store.followUser(fetchedUser.userName);
            if (newFollowItem.isConfirmed) {
                count = fetchedUser.followersCount + 1
                setFetchedUser(prev => ({...prev,followersCount:count }))
            }
            setCurrentUserFollows([...currentUserFollows, {...newFollowItem}])
        }
        else 
        {
            const currentFollow = currentUserFollows.find(f => f.userName == fetchedUser.userName);
            if (currentFollow) {
                await store.unfollowUser(fetchedUser.userName);
            }
            const filteredArr = currentUserFollows.filter(f => f.userName != fetchedUser.userName)
            if (currentFollow.isConfirmed) {
                count = fetchedUser.followersCount - 1
                setFetchedUser(prev => ({...prev,followersCount:count }))
            }
            setCurrentUserFollows([...filteredArr]);
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
                    {store.user.userName == fetchedUser.userName &&
                    <>
                        <li>
                            Follow Requests <span>{currentUserFollows.filter(uf => uf.isConfirmed == false).length}</span>
                        </li>
                        <li>
                            Follower Requests <span>{store.user.followers.filter(uf => uf.isConfirmed == false).length}</span>
                        </li>
                    </>
                   }
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
                        <li onClick={handleFollow} style={{padding:'10px 15px'}}>
                            <p>{currentUserFollows.find(f => f.userName == fetchedUser.userName) 
                                ? currentUserFollows.find(f => f.userName == fetchedUser.userName && f.isConfirmed)
                                    ? "unfollow" 
                                    : "cancel request" 
                                : 'follow'}</p>
                        </li>
                </ul>
                }
            </div>
        </nav>
    </div>
  )
}

export default observer(ProfileCard)