import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Button, Modal } from "antd";
import { Avatar } from "@mui/material";
import { Link, useParams } from "react-router-dom";
import { FollowContext } from "../../../context";
import Swal from "sweetalert2";

const FollowsModal = () => {

  const {fetchedUser, setFetchedUser} = useContext(FollowContext)
  const { store } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [follows, setFollows] = useState([]);
  const {currentUserFollows, setCurrentUserFollows} = useContext(FollowContext)

  const showModal = () => {
    if (fetchedUser.isPrivate) {
      if(currentUserFollows?.find(f => f.userName == fetchedUser.userName && f.isConfirmed)  || fetchedUser.userName == store.user.userName) setIsModalOpen(true);
      else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: "This account is private, follow first!"
        });
      }
    }
    else setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const removeFollower = async () => {
    await store.deleteFollower(fetchedUser.userName);
    const updatedFollows = follows.filter((follow) => follow.userName !== store.user.userName);
    setFollows(updatedFollows);
    const count = fetchedUser?.followsCount - 1
    setFetchedUser(prev => ({...prev,followsCount:count }))
  };

  const handleUnfollow = async (userName) => {
    const followItem = currentUserFollows?.find(fi => fi.userName == userName && fi.isConfirmed)
    if (followItem) 
    {
        await store.unfollowUser(userName);
        const filteredArr = currentUserFollows?.filter(f => f.userName != userName)
        const count = fetchedUser?.followsCount - 1
        setFetchedUser(prev => ({...prev,followsCount:count }))
        setCurrentUserFollows([...filteredArr]);
        const updatedFollows = follows.filter((follow) => follow.userName !== userName);
        setFollows(updatedFollows);
    }
  };
  async function fetchData() {
    const res = await store.getFollows(fetchedUser.userName);
    console.log(res);
    setFollows(res);
  }

  useEffect(() => {
    if (isModalOpen) {
      fetchData();
    }
  }, [isModalOpen]);

  return (
    <>
      <li onClick={showModal}>
        Follows 
        <span>{fetchedUser.followsCount}</span>
      </li>

      <Modal
        title="Follows"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
        style={{ overflow: "hidden" }}
      >
        <ul style={{ maxHeight: "400px", overflowY: "auto" }}>
          {follows &&
            follows.map((follow) =>
              follow.isConfirmed ? (
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
                    to={`/users/${follow.userName}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: '#4B5563'
                    }}
                  >
                    <Avatar src={follow?.imageUrl} />
                    <p>{follow?.userName}</p>
                  </Link>
                  <div>
                    {fetchedUser.userName == store.user.userName &&
                    <Button onClick={() => handleUnfollow(follow?.userName)}>
                      unfollow
                    </Button>}
                  </div>
                  {follow.userName == store.user.userName &&
                  <Button onClick={() => removeFollower()}>
                    remove
                </Button>}
                </li>
              ) : null
            )}
        </ul>
      </Modal>
    </>
  );
};

export default observer(FollowsModal);