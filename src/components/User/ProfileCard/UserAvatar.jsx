import React, { useContext } from "react";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";

import { Avatar } from "@mui/material";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import { FollowContext } from "../../../context";
import { useFormik } from "formik";

const UserAvatar = () => {
  const { store } = useContext(Context);
  const { fetchedUser } = useContext(FollowContext);

  const formik = useFormik({
    initialValues: {
      photo: null
    },
    // validationSchema
    onSubmit: async (values, actions) => {
      const formData = new FormData();
      formData.append("photo", values.photo);

      console.log(values);
    },
  });

  const handlePhotoChange = (e) => {
    const file = e.currentTarget.files[0];
    formik.setFieldValue("photo", file);
    // После выбора файла, сразу отправляем форму
    formik.handleSubmit();
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <Avatar className="avatar" src={fetchedUser?.imageUrl} />
      {store.user.userName == fetchedUser.userName && (
        <>
          <input
            type="file"
            id="photo"
            name="photo"
            onChange={handlePhotoChange}
          />
          <label className="photo" htmlFor="photo">
            <PhotoCameraIcon />
          </label>
        </>
      )}
    </form>
  );
};

export default observer(UserAvatar);
