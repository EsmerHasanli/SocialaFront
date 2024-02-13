import React, { useContext, useEffect, useState } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { Button, Modal } from "antd";
import { Avatar } from "@mui/material";
import { Link } from "react-router-dom";

const FollowsRequestsModal = ({ currentUserFollows }) => {

  const { store } = useContext(Context);
  console.log("store", store.user);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [followRequests, setFollowRequests] = useState([]);

  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  const handleCancelRequest = async (userName) => {
    await store.unfollowUser(userName);
    const filteredArr = followRequests?.filter(x => x.userName != userName);
    setFollowRequests(filteredArr);

  };

  useEffect(() => {
    async function fetchData() {
      const allFollows = store.user?.follows;
      const requests = allFollows?.filter((x) => !x.isConfirmed);
      setFollowRequests(requests);
    }
    fetchData();
  }, []);

  return (
    <>
      <li onClick={showModal}>
        Follow Requests{" "}
        <span>
          {/* {currentUserFollows?.filter((uf) => uf.isConfirmed == false).length} */}
          {followRequests?.length}
        </span>
      </li>

      <Modal
        title="Follow requests"
        open={isModalOpen}
        onCancel={handleCancel}
        footer={false}
        style={{ overflow: "hidden" }}
      >
        <ul style={{ maxHeight: "400px", overflowY: "auto" }}>
          {followRequests &&
            followRequests.map((followRequest) => (
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
                  to={`/users/${followRequest.userName}`}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "8px",
                    color: "#4B5563",
                  }}
                >
                  <Avatar src={followRequest?.imageUrl} />
                  <p>{followRequest?.userName}</p>
                </Link>
                <div>
                  <Button
                    onClick={() => handleCancelRequest(followRequest?.userName)}
                  >
                    cancel request 
                  </Button>
                </div>
              </li>
            ))}
        </ul>
      </Modal>
    </>
  );
};

export default observer(FollowsRequestsModal);
