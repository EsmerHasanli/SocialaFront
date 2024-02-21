import { observer } from "mobx-react-lite";
import * as React from "react";
import { Helmet } from "react-helmet";
import "./index.scss";

import Grid from "@mui/material/Grid";
import SideBar from "../../../components/User/SideBar";
import FooterMobile from "../../../components/User/FooterMobile";
import PostCard from "../../../components/User/Posts/PostCard";

const Archieve = () => {
  const [storiesVisible, setStoriesVissible] = React.useState(false)
  const [postsVisible, setPostsVisible] = React.useState(false)

  return (
    <>
      <Helmet>
        <title>Sociala | Archive</title>
      </Helmet>
      <section id="archive">
      <Grid container spacing={2}>
          <Grid item lg={2}>
            <SideBar />
          </Grid>
          <Grid className="wrapper" style={{padding:'50px 85px'}} item lg={10} xs={12}>
            <div className="header-wrapper">
              <div className="header">
                <div onClick={()=>{
                  setStoriesVissible(false)
                  setPostsVisible(true)
                }} className="title-wrapper">
                  <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT28viy5ztwW2YUehSgz8jYhyzVTBKbjAXLRgQWzqIbqfsaX0qzluSKdRJXh7xXWDrJykQ&usqp=CAU" alt="" />
                  <h2>Posts</h2>
                </div>
                <div onClick={()=>{
                  setStoriesVissible(true)
                  setPostsVisible(false)
                }} className="title-wrapper">
                  <img src="https://cdn.iconscout.com/icon/free/png-256/free-instagram-story-4941674-4109074.png" alt="" />
                  <h2>Stories</h2>
                </div>
              </div>
            </div>
            <div className="content-wrapper">
                {
                  storiesVisible && 
                  <>
                    <p>Only you can see your archived stories unless you choose to share them.</p>
                    <div className="card-wrapper">
                      <div className="card" style={{backgroundImage:'url(https://images.pexels.com/photos/18254529/pexels-photo-18254529/free-photo-of-portrait-of-brunette-woman-in-black-and-white.jpeg?auto=compress&cs=tinysrgb&w=600&lazy=load)' }}>
                        <div className="date">
                          <b>17</b> <span>Feb 2023</span>
                        </div>
                      </div>
                    </div>
                  </>
                }
                {
                  postsVisible && 
                  <>
                    <p>Only you can see your archived posts unless you choose to share them.</p>
                    {/* <PostCard /> */}
                  </>
                }
            </div>
          </Grid>
        </Grid>
        <FooterMobile />
      </section>
    </>
  );
};

export default observer(Archieve);
