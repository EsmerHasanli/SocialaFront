import React, { useState } from 'react'
import { IconButton, Button } from '@mui/material'
import AddCircleOutlineOutlinedIcon from "@mui/icons-material/AddCircleOutlineOutlined";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import { Input, Modal } from 'antd';

const FileUploadModal = ({ formik }) => {
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
    <>
    <IconButton onClick={showModal}><AddCircleOutlineOutlinedIcon style={{cursor:"pointer", color: 'rgb(75,85,99)'}} /></IconButton>

    <Modal footer={false} title="Choose media" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
     <form onSubmit={formik.handleSubmit}>
         <div style={{ display: "flex", flexDirection: "column" }}>
           <Input id='text' name='text' type='text' value={formik.values.text} onChange={formik.handleChange} />
           <input style={{ display: "none" }} id="files" name="files" type="file" onChange={(e) => formik.setFieldValue("files", e.currentTarget.files[0]) }/>
           <IconButton style={{ backgroundColor: "rgb(226,232,240)", width: "35px", height: "35px", marginTop: "10px", }} >
             <label htmlFor="files">
                 <AttachFileIcon style={{ rotate: "45deg" }} />
             </label>
           </IconButton>
         </div>
         <div style={{ display: "flex", justifyContent: "center", alignItems: "center", gap: "10px", }}>
           <Button onClick={handleCancel} style={{ textTransform: "capitalize" }} variant="outlined" type="reset"> Cancel </Button>
           <Button style={{ textTransform: "capitalize" }} variant="contained" type="submit"> Create </Button>
         </div>
     </form>
    </Modal>
    </>
  )
}

export default FileUploadModal