import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Button, Modal } from "antd";
import { Avatar } from "@mui/material";
import { Link, useParams } from "react-router-dom";

const FollowersModal = ({ fetchedUser }) => {
  const { username } = useParams()

  const { store } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [followers, setFollowers] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleRemoveFollower = async (userName) => {
    await store.deleteFollower(userName);
    const updatedFollowers = followers.filter(
      (follower) => follower.userName !== userName
    );
    setFollowers(updatedFollowers);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await store.getFollowers(username);
      setFollowers(res);
      console.log(res);
    }
    fetchData();
  }, [username]);

  return (
    <>
      <li onClick={showModal}>
        Followers 
        {/* <span>{fetchedUser?.followersCount}</span> */}
        <span>{followers?.length}</span>
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
                    username == store.user.userName && 
                  <div>
                    <Button onClick={() => handleRemoveFollower(follower?.userName)}>
                      remove
                    </Button>
                  </div>
                  }
                </li>
              ) : null
            )}
        </ul>
      </Modal>
    </>
  );
};

export default observer(FollowersModal);
