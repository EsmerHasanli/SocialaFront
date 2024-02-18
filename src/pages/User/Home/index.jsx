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

const UserHomePage = () => {
  const [feedPosts, setFeedPosts] = React.useState([])
  const {store} = React.useContext(Context)
  const [skip, setSkip] = React.useState(0);
  async function getFeedPostsAsync() {
    const posts = await store.getFeedPostsAsync(skip)
    
    setSkip(skip+10);
    setFeedPosts(posts);
  }
  React.useEffect(() => {
    getFeedPostsAsync()
  },[])

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
              feedPosts?.length > 10 && 
              <div className="show-more-btn-wrapper">
                <button><span>show more</span></button>
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
