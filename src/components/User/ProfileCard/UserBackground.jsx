import React, { useContext } from "react";
import { Context } from "../../../main";
import { FollowContext } from "../../../context";
import { useFormik } from "formik";
import { ConsoleLogger } from "@microsoft/signalr/dist/esm/Utils";

const UserBackground = () => {
  const { store } = useContext(Context);
  const { fetchedUser, setFetchedUser } = useContext(FollowContext);

  const formik = useFormik({
    initialValues: {
        photo: null
    },
    // validationSchema
    onSubmit: async (values, actions) => {
      const formData = new FormData();
      formData.append("photo", values.photo);

      const res = await store.editBackground(formData)
      setFetchedUser({...fetchedUser, backgroundImage: res })
    },
  });

  const handleBackgroundChange = (e) => {
    const file = e.currentTarget.files[0];
    formik.setFieldValue("photo", file);
    formik.handleSubmit();
  };

  return (
    <form className="bg-form" onSubmit={formik.handleSubmit}>
        <input onChange={handleBackgroundChange} type="file" id='bg' name='bg' accept="image/*"  />
        <label className="edit-btn" htmlFor="bg" style={{ float: "right" }}>Edit</label>
    </form>
  )
  
};

export default UserBackground;
