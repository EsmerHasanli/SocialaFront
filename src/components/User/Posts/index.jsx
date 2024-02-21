import "./index.scss";
import { Avatar } from "@mui/material";
import React, {useContext, useEffect, useState } from "react";
import { Card, Skeleton } from "antd";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
const { Meta } = Card;
import PostCard from "./PostCard";
import { FollowContext } from "../../../context";



const Posts = ({posts, setPosts}) => {
  const {store} = useContext(Context);
  const {fetchedUser, setFetchedUser} = useContext(FollowContext)
  useEffect(() => {
    async function fetchPosts() {
      const res = await store.getPosts(fetchedUser.userName);
      setPosts(res);
    }
    fetchPosts();
  }, [fetchedUser.userName]);

  return (
    <div id="user-posts-wrapper">
      {posts &&
        posts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).map((post) => 
         <PostCard key={post.id}  post={post} posts={posts} setPosts={setPosts} />
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