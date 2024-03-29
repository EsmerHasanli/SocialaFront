import { observer } from "mobx-react-lite";
import React, { useContext, useEffect, useState } from "react";
import {Context} from '../../../main'
import { useFormik } from "formik";
import Swal from "sweetalert2";
import { FollowContext } from "../../../context";
import { Checkbox } from "@mui/material";
import SettingsInfoValidationSchema from "../../../validations/SettingsInfoValidationSchema";

const UserInfoForm = ({photo, setPreviewUrl}) => {
  const {store} = useContext(Context)
  const [canSendVerifyRequest, setCanSendVerifyRequest] = useState(store.user.canSendVerifyRequest)
  const [initialValues, setInitialValues] = useState({})
  const {setUserAvatar} = useContext(FollowContext)
  useEffect(() => {
    async function fetchData() {
      const res = await store.getDescription();
      if (res.bio == null) res.bio = ""
      setInitialValues(res);
    }
    fetchData();
  },[])
  const formik = useFormik({
    initialValues: initialValues,
    enableReinitialize:true,
    validationSchema:SettingsInfoValidationSchema ,
    onSubmit: async (values, actions) => {
      // if(initialValues == values){
      //   Swal.fire({
      //     icon: "error",
      //     title: "Oops...",
      //     text: "Yoou did not have changes!",
      //   });
      // } else{
        const editedData = new FormData()
        if (photo) editedData.append("photo", photo)
        editedData.append('name', values.name)
        editedData.append('surname', values.surname)
        editedData.append('bio', values.bio)
        editedData.append("email", values.email)
        editedData.append('gender', values.gender)
        editedData.append('isPrivate', values.isPrivate)
        
        const url = await store.editDescription(editedData)
        if (url){
          setPreviewUrl(null)
          setUserAvatar(url)
        }
        const oldUser = store.user
        oldUser.name = values.name;
        oldUser.surname = values.surname
        store.setUser(oldUser)
      // }
    },
  })

  async function sendVerifyRequest() {
    const res = await store.sendVerifyRequest()
    if (res.status == 204) setCanSendVerifyRequest(false)
  }

  return (
    <>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-wrapper">
            <div>
              <label style={{marginBottom:'34px'}} htmlFor="name">Name</label>
              <label style={{marginBottom:'34px'}} htmlFor="surname">Surname</label>
              <label style={{marginBottom:'34px'}} htmlFor="email">Email</label>
              <label style={{marginBottom:'34px'}} htmlFor="bio">Bio</label>
              <label style={{marginBottom:'34px'}} htmlFor="gender">Gender</label>
              <label htmlFor="isPrivate">Private Account</label>
            </div>

            <div>
              <input style={{marginBottom:'26px'}} id="name" name="name" type="text" placeholder={store.user.name} value={formik.values.name} onChange={formik.handleChange} />
              {formik.touched.name && formik.errors.name ? <div className="error">{formik.errors.name}</div> : null}
              <input style={{marginBottom:'26px'}} id="surname" name="surname" type="text" placeholder={store.user.surname} value={formik.values.surname} onChange={formik.handleChange} />
              {formik.touched.surname && formik.errors.surname ? <div className="error">{formik.errors.surname}</div> : null}
              <input style={{marginBottom:'26px'}} id="email" name="email" type="email"  placeholder={store.user.email} value={formik.values.email} onChange={formik.handleChange} />
              {formik.touched.email && formik.errors.email ? <div className="error">{formik.errors.email}</div> : null}
              <textarea style={{marginBottom:'26px'}} id="bio" name="bio" placeholder={store.user.bio} value={formik.values.bio} onChange={formik.handleChange} />
              {formik.touched.bio && formik.errors.bio ? <div className="error">{formik.errors.bio}</div> : null}
              <select style={{marginBottom:'26px'}} name="gender" id="gender" defaultValue={store.user.gender} value={formik.values.gender} onChange={formik.handleChange} >
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="None">None</option>
              </select>
              <input type='checkbox' id='isPrivate' checked={formik.values.isPrivate} value={formik.values.isPrivate} name='isPrivate' onChange={formik.handleChange} />
            </div>
          </div>

          <div className="button-wrapper">
            <button className="white" type="reset">
              cancel
            </button>
            <button className="blue" type="submit">
              save
            </button>
          </div>
        </form>
      </div>
        {canSendVerifyRequest &&
        <div className="btn-wrapper">
          <button onClick={sendVerifyRequest}>Send verify request</button>
        </div>
        }
    </>
  );
};

export default observer(UserInfoForm);