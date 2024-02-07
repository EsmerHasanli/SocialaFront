import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../main";
import { Helmet } from "react-helmet";
import './index.scss'

import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

import SideBar from "../../../components/User/SideBar";
import ProfileCard from "../../../components/User/ProfileCard";
import AddPost from "../../../components/User/AddPost";
import UserPostCard from "../../../components/User/Posts";
import UserInfoCard from "../../../components/User/UserInfoCard";
import UsersFriendsCard from "../../../components/User/UsersFriends"
import { useNavigate, useParams } from "react-router-dom";
import FooterMobile from "../../../components/User/FooterMobile";
import Posts from "../../../components/User/Posts";


const UserDetailsPage = () => {
  const { store } = useContext(Context);
  const {username} = useParams();
  const navigate = useNavigate()
  const [posts, setPosts] = useState([])
  const [fetchedUser, setFetchedUser] = useState()
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUserData = await store.getByUsername(username);
      if(fetchedUserData.status == 200){
        const findedUser = fetchedUserData.data;
        if (findedUser.userName == store.user.userName || !findedUser.isPrivate) setVisible(true);
        else if (store.user.follows.find(f => f.userName == findedUser.userName && f.isConfirmed)) setVisible(true);
        setFetchedUser(fetchedUserData.data);
      }else{
        navigate('/not-found')
      }
    }
    if(username){
      fetchUser();
    }    
  }, [username])

  return (
    <>
      <Helmet>
        <title>Socialite</title>
      </Helmet>
      <section id="user-profile">
        <Grid container spacing={2}>
          <Grid item xs={2}>
            <SideBar/>
          </Grid>
          <Grid className="profile-wrapper" item xs={10}>
            <ProfileCard fetchedUser={fetchedUser} />

            <Grid container spacing={4}>

              <Grid item xs={8}>
              {
                  visible
                  ?
                  <>
                    {store.user.userName == fetchedUser.userName &&
                    <AddPost posts={posts} setPosts={setPosts} />}
                    
                    <Posts posts={posts} setPosts={setPosts} fetchedUser={fetchedUser}/>
                  </>
                  :
                  <div className="locked-account-bg">
                    <img src="https://static.thenounproject.com/png/2259534-200.png" alt="" />
                    <h2>This account is private</h2>
                  </div>
                }
              </Grid>

              <Grid item xs={4}>
                <UserInfoCard/>
                <UsersFriendsCard/>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <FooterMobile/>
      </section>
    </>
  );
};

export default UserDetailsPage;