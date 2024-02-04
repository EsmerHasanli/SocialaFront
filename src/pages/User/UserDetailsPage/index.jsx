import React, { useContext } from "react";
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


const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  }));

  
const UserDetailsPage = () => {
  const { store } = useContext(Context);


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
            <ProfileCard/>

            <Grid container spacing={4}>

              <Grid item xs={8}>
                <AddPost />
                <UserPostCard/>
              </Grid>

              <Grid item xs={4}>
                mdmdfdfdf
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </section>
    </>
  );
};

export default UserDetailsPage;
