import React, { useContext } from 'react'
import { Divider } from '@mui/material'

import AddIcon from '@mui/icons-material/Add';
import './index.scss'
import { Context } from "../../../main";
import { observer } from 'mobx-react-lite';
import { FollowContext } from '../../../context';
import UserBio from './UserBio';
import UserAvatar from './UserAvatar';
import UserBackground from './UserBackground';
import LikeAvatar from './LikeAvatar';
import FollowsModal from './FollowsModal';
import FollowersModal from './FollowersModal';
import FollowsRequestsModal from './FollowsRequestsModal';
import FollowersRequestsmodal from './FollowersRequestsmodal';

const ProfileCard = () => {
    const { store } = useContext(Context);
    const {fetchedUser, setFetchedUser} = useContext(FollowContext)
    const {currentUserFollows, setCurrentUserFollows} = useContext(FollowContext);

    async function handleFollow() {
        let count;
        console.log(currentUserFollows);
        const followItem = currentUserFollows?.find(fi => fi.userName == fetchedUser?.userName)
        if (!followItem) 
        {
            const newFollowItem = await store.followUser(fetchedUser?.userName);
            if (newFollowItem.isConfirmed) {
                count = fetchedUser?.followersCount + 1
                setFetchedUser(prev => ({...prev,followersCount:count }))
            }
            setCurrentUserFollows([...currentUserFollows, {...newFollowItem}])
        }
        else 
        {
            const currentFollow = currentUserFollows?.find(f => f.userName == fetchedUser?.userName);
            if (currentFollow) {
                await store.unfollowUser(fetchedUser?.userName);
            }
            const filteredArr = currentUserFollows?.filter(f => f.userName != fetchedUser?.userName)
            if (currentFollow.isConfirmed) {
                count = fetchedUser?.followersCount - 1
                setFetchedUser(prev => ({...prev,followersCount:count }))
            }
            setCurrentUserFollows([...filteredArr]);
        }
    }
  return (
    <div id='profile-card'>
       <div className='background-wrapper' style={{backgroundImage:`url(${fetchedUser?.backgroundImage?.length ? fetchedUser?.backgroundImage : `https://removal.ai/wp-content/uploads/2021/05/image14-1.png`})`}}>
            {
                store.user.userName == fetchedUser?.userName  &&
                <UserBackground/>
            }
            {
                store.user.userName == fetchedUser?.userName 
                ? <UserAvatar />
                : <LikeAvatar />
            }
        </div>
        <h1>{fetchedUser?.name}{" "}{fetchedUser?.surname}</h1>
        <div className='icon-wrapper'>
            {
                fetchedUser.roles.includes('Admin') &&
                <img src="https://cdn-icons-png.flaticon.com/512/9322/9322133.png" alt="admin" />
            }
            {
                fetchedUser.roles.includes('Moderator') && 
                <img src="https://cdn-icons-png.freepik.com/512/6830/6830335.png" alt="moderator" /> //filled
                // <img src="https://cdn-icons-png.freepik.com/512/6830/6830382.png" alt="" /> //outlined
            }
            {
                fetchedUser.roles.includes('Verified') &&
                <img src="https://cdn-icons-png.flaticon.com/512/7589/7589312.png" alt="verified account" /> //filled
                // <img src="https://cdn-icons-png.freepik.com/512/8274/8274959.png" alt="" /> //filled
                // <img src="https://cdn-icons-png.flaticon.com/512/5480/5480161.png" alt="" /> //outlined
            }
            {/* {
                fetchedUser.roles.includes('Member') &&
                <img src="https://t4.ftcdn.net/jpg/04/83/90/95/360_F_483909569_OI4LKNeFgHwvvVju60fejLd9gj43dIcd.png" alt="member" /> //filled
                // <img src="https://cdn-icons-png.freepik.com/512/3795/3795330.png" alt="" /> //outlined
                // <img src="https://png.pngtree.com/png-clipart/20191122/original/pngtree-user-vector-icon-with-white-background-png-image_5168884.jpg" alt="" /> //outlined
            } */}
        </div>
        <UserBio/>
        <Divider/>
        <nav>
            <div className="wrapper">
                <ul className='links'>
                    <FollowsModal fetchedUser={fetchedUser} />
                    <FollowersModal fetchedUser={fetchedUser} />
                    {store.user.userName == fetchedUser?.userName &&
                    <>
                        <FollowsRequestsModal currentUserFollows={currentUserFollows}  />
                        <FollowersRequestsmodal/>
                    </>
                   }
                </ul>
                {
                fetchedUser?.userName != store.user.userName &&
                    <ul className='feautures'>
                        <li onClick={handleFollow} style={!currentUserFollows?.find(f => f.userName == fetchedUser?.userName && f.isConfirmed) ? { backgroundColor: 'rgb(59, 130, 246)', color:'white'} :  {backgroundColor: 'white', color:'rgb(59, 130, 246)'} }>
                            <p>{currentUserFollows?.find(f => f.userName == fetchedUser?.userName) 
                                ? currentUserFollows?.find(f => f.userName == fetchedUser?.userName && f.isConfirmed)
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