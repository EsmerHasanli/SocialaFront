import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Button, Modal } from "antd";
import { Avatar } from "@mui/material";
import { Link, useParams } from "react-router-dom";

const FollowsModal = ({ fetchedUser }) => {
  const { username } = useParams()

  const { store } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [follows, setFollows] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleUnfollow = async (userName) => {
    await store.unfollowUser(userName);
    const updatedFollows = follows.filter(
      (follow) => follow.userName !== userName
    );
    setFollows(updatedFollows);
  };

  useEffect(() => {
    async function fetchData() {
      const res = await store.getFollows(username);
      setFollows(res);
      console.log(res);
    }
    fetchData();
  }, [username]);

  return (
    <>
      <li onClick={showModal}>
        Follows 
        {/* <span>{fetchedUser?.followsCount}</span> */}
        <span>{follows?.length}</span>
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
                  {
                    username == store.user.userName && 
                  <div>
                    <Button onClick={() => handleUnfollow(follow?.userName)}>
                      unfollow
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

export default observer(FollowsModal);
