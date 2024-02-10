import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "antd";
import { Button, IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";

const AddStories = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="add-story-form">
      <div className="add-story-btn" onClick={showModal}>
        <div className="icon-border">
          <AddIcon />
        </div>
      </div>

      <Modal
        footer={false}
        title="Basic Modal"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <form>
          <div style={{ display: "flex", flexDirection: "column",}}>
            <textarea style={{borderRadius:'8px', maxWidth:'100%', minHeight:'52px', padding:'8px'}} cols="30" rows="10">
              What is on your mind?
            </textarea>

            <IconButton style={{ backgroundColor: "rgb(226,232,240)", width:'35px', height:'35px', marginTop: "10px", }}>
              <label htmlFor="stori">
                <AttachFileIcon style={{ rotate: "45deg" }} />
              </label>
            </IconButton>
            <input
              style={{ display: "none" }}
              id="stori"
              name="stori"
              type="file"
            />
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "10px",
            }}
          >
            <Button
              style={{ textTransform: "capitalize" }}
              variant="outlined"
              type="reset"
            >
              Cancel
            </Button>
            <Button
              style={{ textTransform: "capitalize" }}
              variant="contained"
              type="submit"
            >
              Create
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default AddStories;
