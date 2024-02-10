import React, { useContext, useEffect, useState } from "react";
import { FormGroup, FormControlLabel, Checkbox } from "@mui/material";
import { Context } from "../../../main";
import { useFormik } from "formik";
import { FollowContext } from "../../../context";

const Notifications = ({photo, setPreviewUrl}) => {
  const {store} = useContext(Context)
  const [values, setValues] = useState({})
  const {setUserAvatar} = useContext(FollowContext)
  useEffect(() => {
    async function fetchData() {
      const res = await store.getNotifySettings();
      console.log(res)
      setValues(res);
    }
    fetchData();
  },[])
  const formik = useFormik({
    initialValues: values,
    enableReinitialize:true,
    // validationSchema: 
    onSubmit: async (values, actions) => {
      console.log(values)
      const editedData = new FormData()
      if (photo) editedData.append("photo", photo)
      editedData.append('photoLikeNotify', values.photoLikeNotify)
      editedData.append('postLikeNotify', values.postLikeNotify)
      editedData.append('followerNotify', values.followerNotify)
      if (photo) editedData.append("photo", photo);
      console.log(values)
      const url = await store.putNotificationSettings(editedData);
      console.log(url)
      if (url){
        setPreviewUrl(null)
        setUserAvatar(url)
      }
    },
    
    
  })
  return (
    <section>
      <div>
        <div className="wrapper">
          <div className="left">Notify me when:</div>

          <form onSubmit={formik.handleSubmit} className="right">
            <FormGroup >
              {/* <FormControlLabel
                control={<Checkbox  />}
                label="Someone send me message"
              /> */}
              <FormControlLabel
                control={<input type="checkbox" checked={formik.values.photoLikeNotify} value={formik.values.photoLikeNotify} id="photoLikeNotify" name="photoLikeNotify" onChange={formik.handleChange} style={{marginRight:'10px'}}   />}
                label="Someone liked my photo"
              />
              <FormControlLabel
                control={<input type="checkbox"  checked={formik.values.followerNotify} value={formik.values.followerNotify}  id="followerNotify" name="followerNotify" onChange={formik.handleChange} style={{marginRight:'10px'}} />}
                label="Someone followed me"
              />
              <FormControlLabel
                control={<input type="checkbox" checked={formik.values.postLikeNotify}  value={formik.values.postLikeNotify} onChange={formik.handleChange} id="postLikeNotify" name="postLikeNotify"  style={{marginRight:'10px'}} />}
                label="Someone liked my posts"
              />
              {/* <FormControlLabel
                control={<Checkbox defaultChecked />}
                label="Someone sent me follow requset"
              /> */}
              <div className="button-wrapper">
                <button className="light">cancel</button>
                <button type="submit" className="blue">save</button>
              </div>
            </FormGroup>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Notifications;