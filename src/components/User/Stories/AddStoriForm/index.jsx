import React, { useContext, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Modal } from "antd";
import { Button, IconButton } from "@mui/material";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { useFormik } from "formik";
import {Context} from '../../../../main'
import { observer } from "mobx-react-lite";

const AddStories = () => {
  const {store} = useContext(Context)
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

  const formik = useFormik({
    initialValues: {
      storyFile: null,
      storyDescr: ''
    },
    // validationSchema:
    onSubmit: async (values, actions) => {
      console.log(values);
      const formData = new FormData();
      formData.append('file', values.storyFile)
      formData.append('text', values.storyDescr)
      const res = await store.createStory(formData)

      console.log(res);
    }
  })

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
        <form onSubmit={formik.handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column",}}>
            <textarea id='storyDescr' name='storyDescr' value={formik.values.storyDescr} onChange={formik.handleChange} style={{borderRadius:'8px', maxWidth:'100%', minHeight:'52px', padding:'8px'}} cols="30" rows="10" placeholder="What is on your mind?" />

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
              onChange={(e)=>formik.setFieldValue('storyFile', e.currentTarget.files[0])}
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

export default observer(AddStories);