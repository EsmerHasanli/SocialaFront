import React, { useContext, useState } from "react";
import "./index.scss";

import AttachFileIcon from '@mui/icons-material/AttachFile';

import { Button } from "@mui/material";

import { Divider, Modal } from "antd";
import { Context } from "../../../main";
import { useFormik } from "formik";
import Swal from "sweetalert2";
import PostCreateValidationSchema from "../../../validations/PostCreateValidationSchema";

const AddPost = () => {
  const { store } = useContext(Context);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const formik = useFormik({
    initialValues: {
      description: "",
      files: [],
    },
    validattionSchema: PostCreateValidationSchema ,
    onSubmit: async (values, actions) => {
      if ( values.description == "" && values.files.length == 0) {
        Swal.fire({
          position: "top-end",
          icon: "warning",
          title: "You can not post empty form !",
          showConfirmButton: false,
          timer: 1500,
        });
      } else {
       
        const newData = new FormData();
        newData.append("description", values.description);
        newData.append("files", values.files);

        await store.createPost(newData);
      }
console.log(values);
      actions.resetForm();
    },
  });
  return (
    <section id="add-post">
      <button onClick={showModal} className="status">
        What Do You Have On Mind ?
      </button>

      <Modal
        style={{ textAlign: "center" }}
        title="Create Post"
        open={isModalOpen}
        onCancel={closeModal} 
        footer={null}
      >
        <Divider />
        <form onSubmit={formik.handleSubmit}>
          <textarea
            id="description"
            name="description"
            style={{
              maxWidth: "100%",
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
              <label
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: "8px",
                  cursor: "pointer"
                }}
                htmlFor="files"
              >
                <AttachFileIcon style={{transform: 'rotate(45deg)'}} />
              </label>

              <input
                multiple
                id="files"
                name="files"
                type="file"
                style={{ display: "none" }}
                onChange={(event) => {
                  formik.setFieldValue("files", event.currentTarget.files);
                }}
              />
            </div>
          </ul>
          <Button onClick={closeModal} variant="contained" style={{ margin: "10px" }}>
            Cancel
          </Button>
          <Button variant="contained" type="submit" style={{ margin: "10px" }}>
            Create
          </Button>
        </form>
      </Modal>
    </section>
  );
};
export default AddPost;
