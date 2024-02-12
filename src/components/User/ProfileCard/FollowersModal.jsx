import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Button, Modal } from "antd";
import { Avatar } from "@mui/material";

const FollowersModal = ({ fetchedUser }) => {
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
      const res = await store.getFollowers();
      setFollowers(res);
      console.log(res);
    }
    fetchData();
  }, []);

  return (
    <>
      <li onClick={showModal}>
        Followers <span>{fetchedUser?.followersCount}</span>
      </li>

      <Modal
        title="Follows"
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
                  <div
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                    }}
                  >
                    <Avatar src={follower?.imageUrl} />
                    <p>{follower?.userName}</p>
                  </div>
                  <div>
                    <Button onClick={() => handleRemoveFollower(follower?.userName)}>
                      remove
                    </Button>
                  </div>
                </li>
              ) : null
            )}
        </ul>
      </Modal>
    </>
  );
};

export default observer(FollowersModal);
