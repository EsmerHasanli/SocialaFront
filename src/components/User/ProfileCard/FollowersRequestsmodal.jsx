import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../main";
import { Modal } from "antd";
import { Avatar, IconButton, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Link } from "react-router-dom";
import { FollowContext } from "../../../context";

const FollowersRequestsmodal = () => {
  const { store } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [followersRequests, setFollowersRequests] = useState(store.user.followers.filter(f => !f.isConfirmed));
  const {fetchedUser, setFetchedUser} = useContext(FollowContext)
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async (obj) => {
    const findedUser = followersRequests?.find(x => x.userName === obj.userName)
    if (findedUser) {
      await store.confirmFollower(obj.id)
      const newArr = followersRequests?.filter(x => x.userName !== obj.userName)
      setFollowersRequests(newArr)
      let count = fetchedUser?.followersCount + 1
      setFetchedUser(prev => ({...prev,followersCount:count }))
    }

  }

  const handleDeny = async (userName) => {
    await store.deleteFollower(userName)
    const newArr = followersRequests?.filter(x => x.userName !== userName)
    setFollowersRequests(newArr)
  }

  return (
    <>
      <li onClick={showModal}>
        Follower Requests{" "}
        <span>
          {
            followersRequests?.length
          }
        </span>
      </li>

      <Modal
        title="Follower Requests"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
        style={{ overflow: "hidden" }}
      >
        <ul style={{ maxHeight: "400px", overflowY: "auto" }}>
          {followersRequests &&
            followersRequests.map((followersRequest) =>
            !followersRequest.isConfirmed ? (
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
                  to={`/users/${followersRequest.userName}`}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "8px",
                      color: '#4B5563'
                    }}
                  >
                    <Avatar src={followersRequest?.imageUrl} />
                    <p>{followersRequest?.userName}</p>
                  </Link>
                  <div style={{display:'flex', gap:'10px'}}>
                    <Button variant="contained" onClick={() => handleConfirm(followersRequest)}>
                      Confirm
                    </Button>
                    <IconButton onClick={() => handleDeny(followersRequest?.userName)}>
                        <CloseIcon/>
                    </IconButton>
                  </div>
                </li>
              ) : null
            )}
        </ul>
      </Modal>
    </>
  );
};

export default observer(FollowersRequestsmodal);