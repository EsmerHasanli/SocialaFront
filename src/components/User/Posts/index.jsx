import "./index.scss";
import { Avatar } from "@mui/material";
import React, {useContext, useEffect, useState } from "react";
import { Card, Skeleton } from "antd";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
const { Meta } = Card;
import PostCard from "./PostCard";



const Posts = ({posts, setPosts, fetchedUser}) => {
  const {store} = useContext(Context);
 
  useEffect(() => {
    async function fetchPosts() {
      const res = await store.getPosts(fetchedUser.userName);
      setPosts(res);
    }
    fetchPosts();
  }, []);

  return (
    <div id="user-posts-wrapper">
      {
        posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post) => 
         <PostCard key={post.id}  post={post} fetchedUser={fetchedUser} />
        )}

      {store.isLoading && (
        <Card style={{ width: "100%", marginTop: 16, border: "none" }}>
          <Skeleton  avatar active>
            <Meta
              avatar={
                <Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=2" />
              }
              title="Card title"
              description="This is the description"
            />
          </Skeleton>
        </Card>
      )}
    </div>
  );
};

export default observer(Posts);