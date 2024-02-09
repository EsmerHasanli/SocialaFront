import React, { useContext } from "react";
import FacebookOutlinedIcon from "@mui/icons-material/FacebookOutlined";
import InstagramIcon from "@mui/icons-material/Instagram";
import GitHubIcon from "@mui/icons-material/GitHub";
import { useFormik } from "formik";
import { Context } from "../../../main";
import { observer } from "mobx-react-lite";
import Swal from "sweetalert2";

const SocialLinks = () => {
  const {store} = useContext(Context)

  const formik = useFormik({
    initialValues: {
      facebookLink:  store.user?.facebookLink,
      instagramLink: store.user?.instagramLink,
      githubLink: store.user?.githubLink,
    },
    // validationSchema: 
    onSubmit: async (values, actions) => {
      Swal.fire("Your info updated succesfully!");
      console.log(values);

      const editedData = new FormData()
      editedData.append('facebookLink', values.facebookLink)
      editedData.append('instagramLink', values.instagramLink)
      editedData.append('githubLink', values.githubLink)

      const res = await store.editSocialLinks(editedData)
      // console.log(res);
      await store.checkAuth()
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

            <input type="text" placeholder={store.user?.facebookLink} id='facebookLink' name='facebookLink' value={formik.facebookLink} onChange={formik.handleChange} />
          </li>

          <li>
            <div style={{backgroundColor:'rgb(253,242,248)', color:'rgb(219,39,119)'}}>
              <InstagramIcon />
            </div>

            <input type="text" placeholder={store.user?.instagramLink} id='instagramLink' name='instagramLink' value={formik.instagramLink} onChange={formik.handleChange} />
          </li>

          <li>
            <div style={{backgroundColor:'rgb(248,250,252)', color:'rgb(0, 0, 0)'}}>
              <GitHubIcon />
            </div>

            <input type="text" placeholder={store.user?.githubLink} id='githubLink' name='githubLink' value={formik.githubLink} onChange={formik.handleChange} />
          </li>
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
