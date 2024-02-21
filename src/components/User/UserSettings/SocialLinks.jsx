import React, { useContext, useEffect, useState } from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useFormik } from "formik";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import { FollowContext } from "../../../context";
import LinksValidationSchema from "../../../validations/LinksValidationSchema";

const SocialLinks = ({photo, setPreviewUrl}) => {
  const {store} = useContext(Context)
  const {setUserAvatar} = useContext(FollowContext)
  const [initialValues, setInitialValues] = useState({})

  useEffect(() => {
    async function fetchData() {
      const res = await store.getSocialLinks();
      console.log(res)
      if (res.facebookLink == null) res.facebookLink = ""
      if (res.instagramLink == null) res.instagramLink = ""
      if (res.githubLink == null) res.githubLink = ""
      setInitialValues(res);
    }
    fetchData();
  },[])
  

  const formik = useFormik({
    initialValues:  initialValues,
    enableReinitialize:true,
    validationSchema: LinksValidationSchema,
    onSubmit: async (values, actions) => {
        const editedData = new FormData()
        if (photo) editedData.append("photo", photo);
        editedData.append('facebookLink', values.facebookLink)
        editedData.append('instagramLink', values.instagramLink)
        editedData.append('githubLink', values.githubLink)
  
        const url = await store.editSocialLinks(editedData)
        if (url){
          setPreviewUrl(null)
          setUserAvatar(url)
        }
    }
  })
  return (
    <div>
      <h3>Social Links</h3>
      <p>
        We may still send you important notifications about your account and
        content outside of you preferred notivications settings
      </p>

      <form onSubmit={formik.handleSubmit}>
        <ul>
          <li>
            <div style={{backgroundColor:'rgb(239,246,255)', color:'rgb(37,99,235)'}}>
              <FacebookOutlinedIcon />
            </div>

            <input type="text" placeholder={store.user?.facebookLink} id='facebookLink' name='facebookLink' value={formik.values.facebookLink} onChange={formik.handleChange} />
          </li>
          {formik.touched.facebookLink && formik.errors.facebookLink ? <div className="error">{formik.errors.facebookLink}</div> : null}

          <li>
            <div style={{backgroundColor:'rgb(253,242,248)', color:'rgb(219,39,119)'}}>
              <InstagramIcon />
            </div>

            <input type="text" placeholder={store.user?.instagramLink} id='instagramLink' name='instagramLink' value={formik.values.instagramLink} onChange={formik.handleChange} />
          </li>
          {formik.touched.instagramLink && formik.errors.instagramLink ? <div className="error">{formik.errors.instagramLink}</div> : null}

          <li>
            <div style={{backgroundColor:'rgb(248,250,252)', color:'rgb(0, 0, 0)'}}>
              <GitHubIcon />
            </div>

            <input type="text" placeholder={store.user?.githubLink} id='githubLink' name='githubLink' value={formik.values.githubLink} onChange={formik.handleChange} />
          </li>
          {formik.touched.githubLink && formik.errors.githubLink ? <div className="error">{formik.errors.githubLink}</div> : null}
        </ul>

        <div className="btn-wrapper">
          <button type='reset' className="white">cancel</button>
          <button type='submit' className="blue">save</button>
        </div>
      </form>
    </div>
  );
};

export default observer(SocialLinks);