import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Button, Modal } from "antd";
import { Avatar } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { FollowContext } from "../../../context";
import Swal from "sweetalert2";

const FollowersModal = () => {
  const {fetchedUser, setFetchedUser} = useContext(FollowContext)
  const { store } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [followers, setFollowers] = useState([])

  const {currentUserFollows, setCurrentUserFollows} = useContext(FollowContext)
  const showModal = () => {
    if(currentUserFollows.find(f => f.userName == fetchedUser.userName)  || fetchedUser.userName == store.user.userName) setIsModalOpen(true);
    else {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "This account is private, follow first!"
      });
    }
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  
  async function handleUnfollow() {
    const followItem = currentUserFollows?.find(fi => fi.userName == fetchedUser?.userName && fi.isConfirmed)
    if (followItem) 
    {
        await store.unfollowUser(fetchedUser?.userName);
        const filteredArr = currentUserFollows?.filter(f => f.userName != fetchedUser?.userName)
        const count = fetchedUser?.followersCount - 1
        setFetchedUser(prev => ({...prev,followersCount:count }))
        setCurrentUserFollows([...filteredArr]);
        const updatedFollowers = followers.filter((follower) => follower.userName !== store.user.userName);
        setFollowers(updatedFollowers);
    }
}

  const handleRemoveFollower = async (userName) => {
    await store.deleteFollower(userName);
    const count = fetchedUser?.followersCount - 1
    const filteredArr = currentUserFollows?.filter(f => f.userName != fetchedUser?.userName)
    setFetchedUser(prev => ({...prev,followersCount:count }))
    setCurrentUserFollows([...filteredArr]);
    const updatedFollowers = followers.filter((follower) => follower.userName !== userName);
    setFollowers(updatedFollowers);
  };
  async function fetchData() {
    const res = await store.getFollowers(fetchedUser.userName);
    setFollowers(res);
  }

  useEffect(() => {
      if (isModalOpen) {
        fetchData();
      }
  }, [isModalOpen]);

  return (
    <>
      <li onClick={showModal}>
        Followers 
        <span>{fetchedUser.followersCount}</span>
      </li>

      <Modal
        title="Follower"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
        style={{ overflow: "hidden" }}
      >
        <ul style={{ maxHeight: "400px", overflowY: "auto" }}>
          {followers &&
            followers.map((follower) =>
            follower.isConfirmed ? (
                <li
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    marginTop: "8px",
                  }}
                >
                  <Link
                  onClick={handleCancel}
                  to={`/users/${follower.userName}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: '#4B5563'
                    }}
                  >
                    <Avatar src={follower?.imageUrl} />
                    <p>{follower?.userName}</p>
                  </Link>
                  {
                    fetchedUser.userName == store.user.userName && 
                    <div>
                      <Button onClick={() => handleRemoveFollower(follower.userName)}>
                        remove
                      </Button>
                    </div>
                  }
                  {follower.userName == store.user.userName && <div>
                      <Button onClick={() => handleUnfollow()}>
                        unfollow
                      </Button>
                    </div>}
                </li>
              ) : null
            )}
        </ul>
      </Modal>
    </>
  );
};

export default observer(FollowersModal);