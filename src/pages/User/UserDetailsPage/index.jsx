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
import UserPostCard from "../../../components/User/PostCard";
import UserInfoCard from "../../../components/User/UserInfoCard";
import UsersFriendsCard from "../../../components/User/UsersFriends"
import { useNavigate, useParams } from "react-router-dom";


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  
const UserDetailsPage = () => {
  const { store } = useContext(Context);
  const {username} = useParams();
  const navigate = useNavigate()

  const [fetchedUser, setFetchedUser] = useState()
  const [posts, setPosts] = useState()
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
    async function fetchPosts() {
      const res = await store.getPosts(fetchedUser.userName);
      setPosts(res);
      setLoading(false);
    }
  //   fetchPosts();
  // }, [fetchedUser]);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUserData = await store.getByUsername(username);
      if(fetchedUserData.status == 200){
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
                  fetchedUser && fetchedUser.userName == store.user.userName   
                  ?
                  <>
                    <AddPost posts={posts} setPosts={setPosts} fetchPosts={fetchPosts}/>
                    <UserPostCard fetchedUser={fetchedUser} posts={posts} setPosts={setPosts} loading={loading} fetchPosts={fetchPosts} />
                  </>
                  :
                  store.user.follows
                  && store.user.follows.find(x=> x.userName == fetchedUser.userName && x.isConfirmed==true)
                  ? <UserPostCard fetchedUser={fetchedUser} posts={posts} setPosts={setPosts}/>
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
      </section>
    </>
  );
};

export default UserDetailsPage;
