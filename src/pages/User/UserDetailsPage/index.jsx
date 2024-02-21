import React, { useContext, useEffect, useMemo, useState } from "react";
import { Context } from "../../../main";
import { Helmet } from "react-helmet";
import "./index.scss";

import Grid from "@mui/material/Grid";

import SideBar from "../../../components/User/SideBar";
import ProfileCard from "../../../components/User/ProfileCard";
import AddPost from "../../../components/User/AddPost";
import UserInfoCard from "../../../components/User/UserInfoCard";
import { useNavigate, useParams } from "react-router-dom";
import FooterMobile from "../../../components/User/FooterMobile";
import Posts from "../../../components/User/Posts";
import { FollowContext } from "../../../context";
import { observer } from "mobx-react-lite";
import { Box, LinearProgress } from "@mui/material";

const UserDetailsPage = () => {
  const { store } = useContext(Context);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const { fetchedUser, setFetchedUser } = useContext(FollowContext);
  const [visible, setVisible] = useState(false);
  const [loader, setLoader] = useState(true);
  const { username } = useParams();

  async function fetchDetailUser()  {
    const res = await store.getByUsername(username);
    if (res.status == 200) {
      const findedUser = res.data;
      setFetchedUser(findedUser);
      setLoader(false)
    } 
    else {
      navigate("/not-found");
    }
  };
  useEffect(() => {
    if (username) {
      fetchDetailUser()
    }}
  , [username])
 
    if (loader)  return (
      <Box sx={{ width: '100%' }}>
        <LinearProgress/>
      </Box>
    );

  return (
    <>
      <Helmet>
        <title>Socialite</title>
      </Helmet>
      <section id="user-profile">
        <Grid container spacing={2}>
          <Grid item lg={2}>
            <SideBar />
          </Grid>
          <Grid className="profile-wrapper" item lg={10} xs={12} md={12} sx={12}>
            <ProfileCard />

            <Grid id='content-wrapper' container spacing={4}>
              <Grid item lg={8}  xs={12} md={12} sx={12}>
                {fetchedUser.userName == store.user.userName || !fetchedUser.isPrivate
                || store.user.follows.find((f) => f.userName == fetchedUser.userName && f.isConfirmed)
                 ? 
                  <>
                  {fetchedUser.userName == store.user.userName && <AddPost posts={posts} setPosts={setPosts} />}
                    
                    <Posts
                      posts={posts}
                      setPosts={setPosts}
                      fetchedUser={fetchedUser}
                    />
                  </>    
                 : 
                  <div className="locked-account-bg">
                    <img
                      src="https://static.thenounproject.com/png/2259534-200.png"
                      alt=""
                    />
                    <h2>This account is private</h2>
                  </div>
                }
              </Grid>

              <Grid item lg={4} xs={12} sx={12}>
                <UserInfoCard />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <FooterMobile />
      </section>
    </>
  );
};

export default observer(UserDetailsPage);