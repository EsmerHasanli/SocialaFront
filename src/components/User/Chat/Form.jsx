import React, { useContext, useMemo, useState } from "react";
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import { IconButton, Modal, Button } from "@mui/material";
import SendIcon from '@mui/icons-material/Send';
import { Context } from "../../../main";
import { useFormik } from "formik";
import { observer } from "mobx-react-lite";
import AttachFileIcon from "@mui/icons-material/AttachFile";


const Form = ({connection, currentChatId, userName, typingStatus, setTypingStatus}) => {
  const [value,setValue] = useState("")
  const {store} = useContext(Context);
  const [uploadDiv, setUplaodDiv] = useState(false)
  const [isTyping, setIsTyping] = useState(false);
  const [timeOut, setTimeOut] = useState(null);

  const [previewUrl, setPreviewUrl] = useState(null)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };
  const formik = useFormik({
    initialValues: {
      text: '',
      files: []
    },
    // validationSchema:
    onSubmit: async (values, actions) => {
      if (values.text.length) {
        const payload = {
          chatId:currentChatId,
          sender:store.user.userName,
          text:values.text,
          media:values.files
        }
        const mediaArr = []
        if (values.files.length) {
          Array.from(values.files).forEach(file => {
              const reader = new FileReader();
              reader.onload = (e) => {
                const fileData = new Uint8Array(e.target.result);
                mediaArr.push(fileData)
              };
              reader.readAsArrayBuffer(file);
            })
            
        }
        connection.sendMessageById(payload);
      }
      actions.resetForm();
    }
  })
  const handleChangeInput = (e) => {
    if (!isTyping) {
      connection.changeTypingStatus(userName, true)
    }

    setIsTyping(true);
  };

  const handleBlurInput = () => {
    if (isTyping) {
      connection.changeTypingStatus(userName,false)
      setIsTyping(false);

    }
  };


 
  const handleOk = () => {
    setIsModalOpen(false);
  };
  

 
  return (
    <>
       <Modal
        title="Media"
        open={isModalOpen}
        onCancel={handleCancel}
        onOk={handleOk}
        footer={false}
        style={{ overflow: "hidden" }}
      >
        <form onSubmit={formik.handleSubmit}>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <input
              id="text"
              name="text"
              value={formik.values.text}
              onChange={formik.handleChange}
              style={{
                borderRadius: "8px",
                maxWidth: "100%",
                minHeight: "52px",
                padding: "8px",
              }}
              cols="30"
              rows="10"
              placeholder="Text here..."
            />

            <IconButton
              style={{
                backgroundColor: "rgb(226,232,240)",
                width: "35px",
                height: "35px",
                marginTop: "10px",
              }}
            >
              <label htmlFor="media">
                <AttachFileIcon style={{ rotate: "45deg" }} />
              </label>
            </IconButton>
            <input
              style={{ display: "none" }}
              id="media"
              name="media"
              type="file"
              onChange={(e) =>
                formik.setFieldValue("files", e.currentTarget.files)
              }
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
      <div className="message-input">
        <div className="icons">
          <AddCircleOutlineOutlinedIcon style={{cursor:"pointer"}} onClick={showModal} />
          <EmojiEmotionsOutlinedIcon />
        </div>
        <form onSubmit={formik.handleSubmit} className="input-wrapper">
          <div className="send-message-wrapper">
            <input placeholder="Write your message" type="text" id='text' name='text' value={formik.values.text} onBlur={handleBlurInput} onChange={(e) => {
              handleChangeInput(e);
              formik.handleChange(e)}
              } autocomplete="off" />
            <IconButton type='submit'>
              <SendIcon/>
            </IconButton>
          </div>
        </form>
      </div>
      {previewUrl && 
        <div className="upload-div">

        </div>
      }
    </>
  );
};

export default observer(Form);