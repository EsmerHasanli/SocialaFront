import { observer } from "mobx-react-lite";
import * as React from "react";
import { Helmet } from "react-helmet";
import "./index.scss";

import Grid from "@mui/material/Grid";
import SideBar from "../../../components/User/SideBar";
import FooterMobile from "../../../components/User/FooterMobile";
import Stories from "../../../components/User/Stories";
import { Context } from "../../../main";
import PostCard from "../../../components/User/Posts/PostCard";
import { Box, LinearProgress } from "@mui/material";

const UserHomePage = () => {
  const [feedPosts, setFeedPosts] = React.useState([])
  const {store} = React.useContext(Context)
  const [skip, setSkip] = React.useState(0);
  const [isEnded, setIsEnded] = React.useState(true);
  const [loader, setLoader] = React.useState(false);

  async function getFeedPostsAsync(e) {
    e?.preventDefault()
    //  setLoader(true)
    const posts = await store.getFeedPostsAsync(skip)
    if(posts.length < 10){
      setIsEnded(true);
    }
    else setIsEnded(false)
    setSkip(skip+10);
    setFeedPosts([...feedPosts, ...posts]);
    // setLoader(false)
  }
  React.useEffect(() => {
    getFeedPostsAsync()
    return () => document.body.style.overflow = "auto";
      
    
  },[])
  if (loader) {
    return (
      <Box sx={{ width: "100%" }}>
        <LinearProgress />
      </Box>
    );
  }

  return (
    <>
      <Helmet>
        <title>Socialite</title>
      </Helmet>
      <section id="socilite-home-page">
        <Grid container spacing={2}>
          <Grid item lg={2}>
            <SideBar />
          </Grid>
          <Grid item lg={10} xs={12}>
            <Stories />
            <div id="home-page-posts-wrapper">
              {feedPosts?.map(post => 
                  <PostCard key={post.id} post={post}/>
                  )}
            </div>
            {
              !isEnded && 
              <div className="show-more-btn-wrapper">
                <button onClick={(e) => getFeedPostsAsync(e)} class="button">
                  <span class="button-content">show more</span>
                </button>
              </div>
            }
          </Grid>
        </Grid>
        <FooterMobile />
      </section>
    </>
  );
};

export default observer(UserHomePage);