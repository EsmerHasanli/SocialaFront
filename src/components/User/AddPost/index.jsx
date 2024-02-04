import React, { useContext, useState } from "react";
import "./index.scss";

import VideocamOutlinedIcon from "@mui/icons-material/VideocamOutlined";
import CollectionsIcon from "@mui/icons-material/Collections";
import VideocamIcon from "@mui/icons-material/Videocam";
import FmdGoodIcon from "@mui/icons-material/FmdGood";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";

import { IconButton } from "@mui/material";

import { Divider, Modal } from "antd";
import { Context } from "../../../main";
import { useFormik } from "formik";

const AddPost = () => {
  const { store } = useContext(Context);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const formik = useFormik({
    initialValues: {
      description: "",
      image: null,
      video: null
    },
    // validattionSchema: ,
    onSubmit: async (values, actions) => {
      console.log('values', values);

      const media = {
        items: [values.image, values.video]
      }

      const formData = new FormData();
      formData.append("description", values.description);
      formData.append("items", media);
      // if (values.image) {
      //   formData.append("items", values.image);
      // }
      // if (values.video) {
      //   formData.append("items", values.video);
      // }
      console.log(formData);
      actions.resetForm()

    },
    // onSubmit: async (values, actions) => {
    //   console.log('values', values);
    
    //   const media = {
    //     items: [values.image, values.video].filter(Boolean) // Filter out null or undefined values
    //   }
    
    //   const formData = new FormData();
    //   formData.append("description", values.description);
    
    //   // Loop through each media item and append to FormData
    //   media.items.forEach((item, index) => {
    //     formData.append(`items[${index}]`, item);
    //   });
    
    //   console.log(formData);
    //   actions.resetForm();
    // },
  });
  return (
    <section id="add-post">
      <button onClick={showModal} className="status">
        What Do You Have On Mind ?
      </button>

      <IconButton className="photo">
        <CollectionsIcon />
      </IconButton>

      <IconButton className="video">
        <VideocamOutlinedIcon />
      </IconButton>

      <Modal
        style={{ textAlign: "center" }}
        title="Create Status"
        open={isModalOpen}
        footer={null}
      >
        <Divider />
        <form onSubmit={formik.handleSubmit}>
          <textarea
            id="description"
            name="description"
            style={{
              width: "100%",
              height: "130px",
              border: "none",
              padding: "10px",
              fontSize: "20px",
              fontWeight: "400px",
            }}
            placeholder="What Do You Have On Mind ?"
            onChange={formik.handleChange}
            value={formik.values.description}
          />
          <ul style={{ margin: "10px", display: "flex", gap: "15px" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "25px",
                padding: "4px 8px",
                gap: "8px",
                border: "1px solid rgb(224,242,254)",
                backgroundColor: "rgb(240,249,255)",
                color: "rgb(55,158,211)",
              }}
            >
              <CollectionsIcon />
              <label htmlFor="image">Image</label>
              <input
                multiple
                id="image"
                name="image"
                type="file"
                style={{ display: "none" }}
                onChange={(event) => {
                  formik.setFieldValue("image", event.currentTarget.files[0]);
                }}
              />
            </div>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "25px",
                padding: "4px 8px",
                gap: "8px",
                border: "1px solid rgb(204,251,241)",
                backgroundColor: "rgb(240,253,250)",
                color: "rgb(13,148,136)",
              }}
            >
              <VideocamIcon />
              <label htmlFor="video">Video</label>
              <input
                multiple
                id="video"
                name="video"
                type="file"
                style={{ display: "none" }}
                onChange={(event) => {
                  formik.setFieldValue("video", event.currentTarget.files[0]);
                }}
              />
            </div>
            <li
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "25px",
                padding: "4px 8px",
                gap: "8px",
                border: "1px solid rgb(255,237,213)",
                backgroundColor: "rgb(255,228,230)",
                color: "rgb(234,88,12)",
              }}
            >
              <EmojiEmotionsIcon />
              <span>Feeling</span>
            </li>
            <li
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                borderRadius: "25px",
                padding: "4px 8px",
                gap: "8px",
                border: "1px solid rgb(255,228,230)",
                backgroundColor: "rgb(255,228,230)",
                color: "rgb(220,38,38)",
              }}
            >
              <FmdGoodIcon />
              <span>Check In</span>
            </li>
          </ul>
          <button type="submit" style={{ margin: "10px" }}>
            Create
          </button>
        </form>
      </Modal>
    </section>
  );
};
export default AddPost;
