import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../main";
import { Modal } from "antd";
import { Avatar, IconButton, Button } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { Link, json } from "react-router-dom";

const FollowersRequestsmodal = () => {
  const { store } = useContext(Context);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [followersRequests, setFollowersRequests] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleConfirm = async (obj) => {
    const findedUser = followersRequests?.find(x => x.userName === obj.userName)
    findedUser.isConfirmed = true;
    await store.confirmFollower(obj.id)

    const newArr = followersRequests?.filter(x => x.userName !== obj.userName)
    setFollowersRequests(newArr)

  }

  const handleDeny = async (userName) => {
    await store.deleteFollower(userName)
    const newArr = followersRequests?.filter(x => x.userName !== userName)
    setFollowersRequests(newArr)
  }

  useEffect(() => {
    async function fetchData() {
        const allFollowers = store.user?.followers;
        const requests = allFollowers?.filter((x) => !x.isConfirmed);
        setFollowersRequests(requests);
    }
    fetchData()
  },[])

  return (
    <>
      <li onClick={showModal}>
        Follower Requests{" "}
        <span>
          {/* {
            store.user?.followers?.filter((uf) => uf.isConfirmed == false)
              .length
          } */}
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
                    <Button variant="contained" onClick={() => handleConfirm(followersRequest?.userName)}>
                      Confirm
                    </Button>
                    <IconButton onClick={() => handleDeny(followersRequest)}>
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
