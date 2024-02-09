import React, { useContext, useEffect, useState } from "react";
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

const UserDetailsPage = () => {
  const { store } = useContext(Context);
  const { username } = useParams();
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const { fetchedUser, setFetchedUser } = useContext(FollowContext);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const fetchedUserData = await store.getByUsername(username);
      if (fetchedUserData.status == 200) {
        const findedUser = fetchedUserData.data;
        if (findedUser.userName == store.user.userName || !findedUser.isPrivate)
          setVisible(true);
        else if (
          store.user.follows.find(
            (f) => f.userName == findedUser.userName && f.isConfirmed
          )
        )
          setVisible(true);
        setFetchedUser(fetchedUserData.data);
      } else {
        navigate("/not-found");
      }
    };
    if (username) {
      fetchUser();
    }
  }, [username]);

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
          <Grid className="profile-wrapper" item lg={10} xs={12}>
            <ProfileCard />

            <Grid container spacing={4}>
              <Grid item lg={8}  xs={12}>
                {visible ? (
                  <>
                    {store.user.userName == fetchedUser.userName && (
                      <AddPost posts={posts} setPosts={setPosts} />
                    )}

                    <Posts
                      posts={posts}
                      setPosts={setPosts}
                      fetchedUser={fetchedUser}
                    />
                  </>
                ) : (
                  <div className="locked-account-bg">
                    <img
                      src="https://static.thenounproject.com/png/2259534-200.png"
                      alt=""
                    />
                    <h2>This account is private</h2>
                  </div>
                )}
              </Grid>

              <Grid item lg={4} xs={12}>
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

export default UserDetailsPage;